import { ListMangasResponse, ListMangasSignature, MangakakalotOpts } from "../../types/ListMangas"
import { MangaBasicInfo } from "../../types/Search"
import { fetchDocument } from "../utils/fetchDocument"
import mapLinkToSource from "../utils/mapLinkToSource"
import memoize from "../utils/memoize"
import { LIST_MANGA_CATEGORY_CODE_FOR, LIST_MANGA_LIST_SELECTOR, LIST_MANGA_PAGINATOR_SELECTOR, LIST_MANGA_THUMBNAIL_SELECTOR, LIST_MANGA_TITLE_SELECTOR } from "./constants"

const listMangas: ListMangasSignature<MangakakalotOpts> = async(opts: MangakakalotOpts): Promise<ListMangasResponse> => {
  const document = await fetchDocument(getUrl(opts))
  return {
    current_page: opts.page ?? 1,
    last_page: lastPage(document),
    mangas: mangas(document, opts),
  }
}

export default listMangas

function getUrl({ page, category, state, type }: MangakakalotOpts): string {
  const urlParams = new URLSearchParams({
    page: page ? String(page) : '1',
    category: category ? LIST_MANGA_CATEGORY_CODE_FOR[category] : 'all',
    state: state ?? 'all',
    type: type ?? 'latest',
  })

  return `https://mangakakalot.com/manga_list?${urlParams.toString()}`
}

const lastPage = memoize<(document: Document) => number>(document => {
  const lastPageAnchor = document.querySelector<HTMLAnchorElement>(LIST_MANGA_PAGINATOR_SELECTOR)
  if(!lastPageAnchor) throw 'Last page number not found...'

  const page = Number(lastPageAnchor
    .textContent
    ?.replaceAll(/[^0-9]/g, '')
    .trim()
  )
  if(isNaN(page)) throw 'Unable to retrive last page number...'

  return page
})

function mangas(document: Document, { page }: MangakakalotOpts): Array<MangaBasicInfo> {
  if(page && lastPage(document) < page) return []

  return Array.from(document.querySelectorAll<HTMLDivElement>(LIST_MANGA_LIST_SELECTOR))
    .map(mangaDiv => {
      const mangaLink = link(mangaDiv)

      return {
        name: name(mangaDiv),
        link: mangaLink,
        thumbnail: thumbnail(mangaDiv),
        source: mapLinkToSource(mangaLink),
      }
    })
}

function name(mangaDiv: HTMLDivElement): string {
  const titleAnchor = mangaDiv.querySelector<HTMLAnchorElement>(LIST_MANGA_TITLE_SELECTOR)
  if(!titleAnchor) throw 'Unable to find title for a manga...'

  return titleAnchor
    .textContent
    ?.trim() as string
}

function link(mangaDiv: HTMLDivElement): string {
  const titleAnchor = mangaDiv.querySelector<HTMLAnchorElement>(LIST_MANGA_TITLE_SELECTOR)
  if(!titleAnchor) throw `Unable to find the link to the manga "${name(mangaDiv)}"...`

  return titleAnchor.href
}

function thumbnail(mangaDiv: HTMLDivElement): string {
  const thumbnailImg = mangaDiv.querySelector<HTMLImageElement>(LIST_MANGA_THUMBNAIL_SELECTOR)
  if(!thumbnailImg) throw `Unable to find thumbnail for the manga "${name(mangaDiv)}"...`

  return thumbnailImg.src
} 
