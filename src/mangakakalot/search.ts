import { MangaBasicInfo, SearchResponse, SearchSignature } from "../../types/Search";
import { fetchDocument } from "../utils";
import { SEARCH_ITEM_ANCHOR_SELECTOR, SEARCH_ITEM_IMG_SELECTOR, SEARCH_ITEM_SELECTOR, SEARCH_LAST_PAGE_SELECTOR, SEARCH_PAGINATOR_SELECTOR } from "./constants";

const search: SearchSignature = async(name: string): Promise<SearchResponse> => {
  const query = name.toLocaleLowerCase().replaceAll(/([\s\-])/g, '_')
  const document = await fetchDocument(getUrl(query))
  const results = await fetchResultsPage(query, document)
  const totalResultsPages = await getTotalResultsPages(document)
  const promises: Array<Promise<void>> = []

  for(let page = 2; page < totalResultsPages; page++) {
    promises.push((async() => {
      results.push(...(await fetchResultsPage(query, page)))
    })())
  }

  if(promises.length > 0) await Promise.all(promises)

  return results
}

export default search

const getUrl = (query: string, page?: number) => `https://mangakakalot.com/search/story/${query}${page ? `?page=${page}` : ''}`

async function getTotalResultsPages(document: Document): Promise<number> {
  const paginator = document.querySelector<HTMLDivElement>(SEARCH_PAGINATOR_SELECTOR)
  if(!paginator) return 1

  const lastPageAnchor = paginator.querySelector<HTMLAnchorElement>(SEARCH_LAST_PAGE_SELECTOR)
  if(!lastPageAnchor) throw 'Last page anchor is not accessible...'

  const total = Number(lastPageAnchor.innerHTML.match(/([0-9]+)/)?.[0])
  if(total < 1) throw 'Error on retrieving total results pages...'

  return total
}

async function fetchResultsPage(query: string, document: Document): Promise<SearchResponse>;
async function fetchResultsPage(query: string, page: number): Promise<SearchResponse>;
async function fetchResultsPage(query: string, param: Document | number): Promise<SearchResponse> {
  if(!(typeof param === 'number')) {
    const nodeList = param.querySelectorAll<HTMLDivElement>(SEARCH_ITEM_SELECTOR)
    const results: SearchResponse = []
  
    nodeList.forEach(mangaCard => results.push(getMangaBasicInfo(mangaCard)))
  
    return results
  }
  const results: SearchResponse = []
  const document = await fetchDocument(getUrl(query, param))

  document.querySelectorAll<HTMLDivElement>(SEARCH_ITEM_SELECTOR)
    .forEach(mangaCard => results.push(getMangaBasicInfo(mangaCard)))

  return results
}

function getMangaBasicInfo(mangaCard: HTMLDivElement): MangaBasicInfo {
  const { innerHTML: title, href: link } = mangaCard.querySelector<HTMLAnchorElement>(SEARCH_ITEM_ANCHOR_SELECTOR) as HTMLAnchorElement
  const { src: thumbnail } = mangaCard.querySelector<HTMLImageElement>(SEARCH_ITEM_IMG_SELECTOR) as HTMLImageElement

  return {
    name: title.trim(),
    link,
    thumbnail
  }
}
