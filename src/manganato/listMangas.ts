import { ListMangasResponse, ListMangasSignature, ManganatoCategory, ManganatoOpts } from "../../types/ListMangas";
import { MangaBasicInfo } from "../../types/Search";
import { fetchDocument } from "../utils/fetchDocument";
import memoize from "../utils/memoize";
import { LIST_MANGA_CATEGORY_CODE_FOR, LIST_MANGA_LAST_PAGE_SELECTOR, LIST_MANGA_MANGAS_SELECTOR, LIST_MANGA_THUMBNAIL_SELECTOR, LIST_MANGA_TITLE_SELECTOR } from "./constants";

const listMangas: ListMangasSignature<ManganatoOpts> = async(opts: ManganatoOpts): Promise<ListMangasResponse> => {
  const document = await fetchDocument(url(opts))

  return {
    current_page: opts.page ?? 1,
    last_page: lastPage(document),
    mangas: mangas(document, opts),
  }
}

export default listMangas

function url({ page, categories_included, categories_excluded, state, order_by, keywords }: ManganatoOpts): string {
  const params: Record<string, string | undefined> = {
    g_i: categories_included ? reduceCategories(categories_included) : undefined,
    g_e: categories_excluded ? reduceCategories(categories_excluded) : undefined,
    sts: state && state !== 'all' ? state : undefined,
    ordby: order_by && order_by !== 'latest' ? order_by : undefined,
    page: String(page ?? 1),
    keyt: keywords?.search_for,
    keyw: keywords?.term
  }
  const urlParams = new URLSearchParams()
  
  Object.keys(params).forEach(key => {
    if(!!params[key]) urlParams.append(key, params[key] as string)
  })

  return `https://manganato.com/advanced_search?s=all?${urlParams.toString()}`
}

function reduceCategories(categories: Array<ManganatoCategory>): string {
  return categories.map(category => LIST_MANGA_CATEGORY_CODE_FOR[category])
    .join('_')
    .padStart(1, '_')
    .padEnd(1, '_')
}

const lastPage = memoize<(document: Document) => number>(document => {
  const lastPageAnchor = document.querySelector<HTMLAnchorElement>(LIST_MANGA_LAST_PAGE_SELECTOR)
  if(!lastPageAnchor) throw 'Unable to find last page number...'
  const page = Number(
    lastPageAnchor
      .textContent
      ?.replaceAll(/[^0-9]/g, '')
  )
  if(isNaN(page)) throw 'Unable to parse the last page number...'

  return page
})

function mangas(document: Document, { page }: ManganatoOpts): Array<MangaBasicInfo> {
  if(page && lastPage(document) < page) return []

  return Array.from(document.querySelectorAll<HTMLDivElement>(LIST_MANGA_MANGAS_SELECTOR))
    .map(mangaDiv => ({
      name: name(mangaDiv),
      link: link(mangaDiv),
      thumbnail: thumbnail(mangaDiv),
      source: 'manganato',
    }))
}

function name(mangaDiv: HTMLDivElement): string {
  const titleAnchor = mangaDiv.querySelector<HTMLAnchorElement>(LIST_MANGA_TITLE_SELECTOR)
  if(!titleAnchor) throw 'Unable to retrieve the title for a manga...'

  return titleAnchor.textContent as string
}

function link(mangaDiv: HTMLDivElement): string {
  const titleAnchor = mangaDiv.querySelector<HTMLAnchorElement>(LIST_MANGA_TITLE_SELECTOR)
  if(!titleAnchor) throw 'Unable to retrieve the link for a manga...'

  return titleAnchor.href
}

function thumbnail(mangaDiv: HTMLDivElement): string {
  const thumbnailimg = mangaDiv.querySelector<HTMLImageElement>(LIST_MANGA_THUMBNAIL_SELECTOR)
  if(!thumbnailimg) throw `Unable to retrieve thumbnail for manga ${name(mangaDiv)}...`

  return thumbnailimg.src
}
