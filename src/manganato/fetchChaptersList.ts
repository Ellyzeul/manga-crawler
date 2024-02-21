import { ChapterInfo, FetchChaptersResponse } from "../../types/FetchChapters"
import { fetchDocument } from "../utils"
import { CHAPTER_LIST_SELECTOR, CHAPTER_SUMMARY_SELECTOR, MANGA_ALTERNATIVE_TITLES_SELECTOR, MANGA_AUTHOR_SELECTOR, MANGA_DETAILS_TABLE_SELECTOR, MANGA_EXTRA_DETAILS_DIV_SELECTOR, MANGA_GENRES_SELECTOR, MANGA_STATUS_SELECTOR, MANGA_UPDATED_AT_SELECTOR, MANGA_VIEWS_SELECTOR, NUMBER_UNIT } from "./constants"

const fetchChaptersList = async(mangaLink: string): Promise<FetchChaptersResponse> => {
  const document = await fetchDocument(mangaLink)
  const detailsTable = document.querySelector<HTMLTableElement>(MANGA_DETAILS_TABLE_SELECTOR)
  const extraDetailsContainer = document.querySelector<HTMLDivElement>(MANGA_EXTRA_DETAILS_DIV_SELECTOR)

  return {
    summary: getSummary(document),
    alternative_titles: getAlternativeTitles(detailsTable),
    author: getAuthor(detailsTable),
    status: getStatus(detailsTable),
    genres: getGenres(detailsTable),
    updated_at: getUpdatedAt(extraDetailsContainer),
    views: getMangaViews(extraDetailsContainer),
    chapters: getChapterDetails(document),
  }
}

export default fetchChaptersList

function getSummary(document: Document): string {
  return document
    .querySelector<HTMLDivElement>(CHAPTER_SUMMARY_SELECTOR)
    ?.innerHTML
    .split('</h3>')[1]
    .trim() as string
}

function getAlternativeTitles(detailsTable: HTMLTableElement | null): Array<string> {
  if(!detailsTable) return []
  
  return detailsTable
    .rows
    .item(0)
    ?.querySelector(MANGA_ALTERNATIVE_TITLES_SELECTOR)
    ?.innerHTML
    .split(';')
    ?.map(alt_title => alt_title.trim()) || []
}

function getAuthor(detailsTable: HTMLTableElement | null): string | undefined {
  if(!detailsTable) return undefined
  
  return detailsTable
    .querySelector(MANGA_AUTHOR_SELECTOR)
    ?.innerHTML
    .trim()
}

function getStatus(detailsTable: HTMLTableElement | null): string | undefined {
  if(!detailsTable) return undefined

  return detailsTable
    .querySelector(MANGA_STATUS_SELECTOR)
    ?.innerHTML
    .trim()
}

function getGenres(detailsTable:HTMLTableElement | null): Array<string> {
  if(!detailsTable) return []
  const anchors = Array.from(detailsTable.querySelectorAll<HTMLAnchorElement>(MANGA_GENRES_SELECTOR))

  return anchors.map(({ innerHTML }) => innerHTML.trim())
}

function getUpdatedAt(extraDetailsContainer: HTMLDivElement | null): string | undefined {
  if(!extraDetailsContainer) return undefined
  const strDate = extraDetailsContainer
    .querySelector<HTMLSpanElement>(MANGA_UPDATED_AT_SELECTOR)
    ?.innerHTML
    .replaceAll(/(-|PM|AM)/g, '')
    .trim()

  console.log(strDate)
  return strDate
    ? new Date(strDate).toISOString()
    : undefined
}

function getMangaViews(extraDetailsContainer: HTMLDivElement | null): number | undefined {
  if(!extraDetailsContainer) return undefined
  const rawNumber = extraDetailsContainer
    .querySelector<HTMLSpanElement>(MANGA_VIEWS_SELECTOR)
    ?.innerHTML
    .trim()
  
  return rawNumber
    ? handleViewNumber(rawNumber)
    : undefined
}

function getChapterDetails(document: Document): Array<ChapterInfo> {
  const chaptersList = document.querySelector<HTMLUListElement>(CHAPTER_LIST_SELECTOR)
  const response: Array<ChapterInfo> = []

  if(!chaptersList) throw `Unable to find chapters list on manganato...`

  chaptersList.querySelectorAll<HTMLLIElement>('li').forEach(chapter => {
    const anchor = chapter.querySelector<HTMLAnchorElement>('a.chapter-name')

    response.push({
      name: anchor?.innerHTML.trim() as string,
      link: anchor?.href as string,
      created_at: getCreatedAt(chapter),
      views: getChapterViews(chapter),
    })
  })

  return response
}

function getCreatedAt(chapter: HTMLLIElement): string {
  try {
    return new Date(
      chapter
        .querySelector<HTMLSpanElement>('span.chapter-time')
        ?.innerHTML
        .trim() as string
    ).toISOString()
  }
  catch(err) {
    if(err instanceof RangeError) return new Date(Date.now()).toISOString()

    throw err
  }
}

function getChapterViews(chapter: HTMLLIElement): number {
  const raw = chapter
    .querySelector<HTMLSpanElement>('span.chapter-view')
    ?.innerHTML
    .trim() as string

  return handleViewNumber(raw)
}

function handleViewNumber(raw: string): number {
  const unit = Object.keys(NUMBER_UNIT).filter(unit => raw.endsWith(unit))[0] || null

  if(!unit) return Number(raw)

  return Number(raw.replace(unit, '').trim()) * NUMBER_UNIT[unit]
}
