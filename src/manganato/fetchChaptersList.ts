import { ChapterInfo, FetchChaptersResponse } from "../../types/FetchChapters"
import { fetchDocument } from "../utils"
import { CHAPTER_LIST_SELECTOR, CHAPTER_SUMMARY_SELECTOR, NUMBER_UNIT } from "./constants"

const fetchChaptersList = async(mangaLink: string): Promise<FetchChaptersResponse> => {
  const document = await fetchDocument(mangaLink)

  return {
    summary: getSummary(document),
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
      views: getViews(chapter),
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

function getViews(chapter: HTMLLIElement): number {
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
