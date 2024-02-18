import { SearchResponse, SearchSignature } from "../../types/Search";
import { fetchDocument } from "../utils";
import { SEARCH_LAST_PAGE_SELECTOR, SEARCH_PAGINATOR_SELECTOR, SEARCH_RESULTS_SELECTOR } from "./constants";

const search: SearchSignature = async(name: string): Promise<SearchResponse> => {
  const query = name.toLocaleLowerCase().replaceAll(/([\s\-])/g, '_')
  const document = await fetchDocument(getUrl(query))
  const results = await fetchResultsPage(query, document)
  const totalResultsPages = await getTotalResultsPages(document)
  const promises: Array<Promise<void>> = []

  for(let page = 2; page < totalResultsPages; page++) {
    promises.push((async () => 
      (await fetchResultsPage(query, page)).forEach(([ title, url ]) => assignResult(results, title, url))
    )())
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
async function fetchResultsPage(query: string, page: number): Promise<Array<[string, string]>>;
async function fetchResultsPage(query: string, param: Document | number): Promise<SearchResponse | Array<[string, string]>> {
  if(!(typeof param === 'number')) {
    const nodeList = param.querySelectorAll<HTMLAnchorElement>(SEARCH_RESULTS_SELECTOR)
    const results: SearchResponse = {}
  
    nodeList.forEach(({ innerHTML, href }) => assignResult(results, innerHTML.trim(), href))
  
    return results
  }
  const results: Array<[string, string]> = []
  const document = await fetchDocument(getUrl(query, param))

  document.querySelectorAll<HTMLAnchorElement>(SEARCH_RESULTS_SELECTOR).forEach(({ innerHTML, href }) => results.push([
    innerHTML.trim(),
    href,
  ]))

  return results
}

function assignResult(results: SearchResponse, title: string, url: string) {
  if(!results[title]) {
    results[title] = url
    return
  }

  if(Array.isArray(results[title])) (results[title] as Array<string>).push(url)

  results[title] = [ results[title] as string, url ]
}
