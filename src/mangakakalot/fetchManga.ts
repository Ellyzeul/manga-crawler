import { ChapterInfo, FetchMangaResponse, FetchMangaSignature } from "../../types/FetchManga";
import { fetchDocument } from "../utils/fetchDocument";
import { CHAPTERS_SELECTOR, CHAPTER_CREATED_AT_SELECTOR, CHAPTER_TITLE_SELECTOR, CHAPTER_VIEWS_SELECTOR, MANGA_ALTERNATIVE_TITLES_SELECTOR, MANGA_AUTHOR_SELECTOR, MANGA_DETAILS_LIST_SELECTOR, MANGA_GENRES_SELECTOR, MANGA_STATUS_SELECTOR, MANGA_SUMMARY_SELECTOR, MANGA_TITLE_SELECTOR, MANGA_UPDATED_AT_SELECTOR, MANGA_VIEWS_SELECTOR } from "./constants";

const fetchManga: FetchMangaSignature = async(mangaLink: string): Promise<FetchMangaResponse> => {
  const document = await fetchDocument(mangaLink)
  const detailsList = document.querySelector<HTMLUListElement>(MANGA_DETAILS_LIST_SELECTOR)

  if(!detailsList) throw "Manga details list couldn't be retrieved..."

  return {
    title: title(detailsList),
    summary: summary(document),
    alternative_titles: alternativeTitles(detailsList),
    author: author(detailsList),
    status: status(detailsList),
    genres: genres(detailsList),
    updated_at: updatedAt(detailsList),
    views: mangaView(detailsList),
    chapters: chapters(document),
  }
}

export default fetchManga

function title(detailsList: HTMLUListElement): string {
  const titleHeading = detailsList.querySelector<HTMLHeadingElement>(MANGA_TITLE_SELECTOR)
  if(!titleHeading) throw 'Unable to retrieve manga title...'

  return titleHeading.textContent as string
}

function summary(document: Document): string {
  const summaryDiv = document.querySelector<HTMLDivElement>(MANGA_SUMMARY_SELECTOR)
  if(!summaryDiv) throw 'Unable to retrieve manga summary...'

  return summaryDiv
    .innerHTML
    .split('</h2>')[1]
    .replaceAll(/<br>/g, '')
    .trim()
}

function alternativeTitles(detailsList: HTMLUListElement): Array<string> {
  return detailsList.querySelector<HTMLHeadingElement>(MANGA_ALTERNATIVE_TITLES_SELECTOR)
    ?.textContent
    ?.replace('Alternative : ', '')
    .split(';')
    .map(title => title.trim())
    .filter(title => !!title) ?? []
}

function author(detailsList: HTMLUListElement): string | undefined {
  const authorAnchorList = detailsList.querySelectorAll<HTMLAnchorElement>(MANGA_AUTHOR_SELECTOR)
  if(!authorAnchorList) return undefined

  return Array.from(authorAnchorList)
    .map(authorAnchor => authorAnchor.textContent?.trim())
    .join(', ')
}

function status(detailsList: HTMLUListElement): string | undefined {
  const statusItem = detailsList.querySelector<HTMLLIElement>(MANGA_STATUS_SELECTOR)
  if(!statusItem) return undefined

  return statusItem
    .textContent
    ?.replace('Status : ', '')
    .trim()
}

function genres(detailsList: HTMLUListElement): Array<string> {
  return Array.from(detailsList.querySelectorAll<HTMLAnchorElement>(MANGA_GENRES_SELECTOR))
    .map(anchor => anchor.textContent?.trim())
    .filter(genre => !!genre) as Array<string>
}

function updatedAt(detailsList: HTMLUListElement): string | undefined {
  try {
    return new Date(detailsList.querySelector<HTMLLIElement>(MANGA_UPDATED_AT_SELECTOR)
      ?.textContent
      ?.replace('Last updated : ', '')
      .replace(/(AM|PM)/, '')
      .trim()
      .concat('+00') ?? ''
    ).toISOString()
  }
  catch {
    return undefined
  }
}

function mangaView(detailsList: HTMLUListElement): number | undefined {
  const viewRaw = detailsList.querySelector<HTMLLIElement>(MANGA_VIEWS_SELECTOR)
    ?.textContent
    ?.replace('View : ', '')
    ?.replaceAll(',', '')
    .trim()

  return viewRaw
    ? Number(viewRaw)
    : undefined
}

function chapters(document: Document): Array<ChapterInfo> {
  return Array.from(document.querySelectorAll<HTMLDivElement>(CHAPTERS_SELECTOR))
    .map(chapterDiv => ({
      name: chapterName(chapterDiv),
      link: chapterLink(chapterDiv),
      created_at: chapterCreatedAt(chapterDiv),
      views: chapterViews(chapterDiv),
    }))
}

function chapterName(chapterDiv: HTMLDivElement): string {
  const titleAnchor = chapterDiv.querySelector<HTMLAnchorElement>(CHAPTER_TITLE_SELECTOR)
  if(!titleAnchor) throw 'Unable to find title for a chapter...'

  return titleAnchor
    .textContent
    ?.trim() as string
}

function chapterLink(chapterDiv: HTMLDivElement): string {
  const titleAnchor = chapterDiv.querySelector<HTMLAnchorElement>(CHAPTER_TITLE_SELECTOR)
  if(!titleAnchor) throw `Unable to find the link for chapter: ${chapterName(chapterDiv)}`

  return titleAnchor.href
}

function chapterCreatedAt(chapterDiv: HTMLDivElement): string {
  const createdAtSpan = chapterDiv.querySelector<HTMLSpanElement>(CHAPTER_CREATED_AT_SELECTOR)
  if(!createdAtSpan) throw `Unable to find created at date for chapter ${chapterName(chapterDiv)}`
  const rawDate = createdAtSpan.textContent?.trim() as string
  
  try {
    return new Date(rawDate).toISOString()
  }
  catch {
    throw `Unable to parse the date ${rawDate} on chapter: ${chapterName(chapterDiv)}`
  }
}

function chapterViews(chapterDiv: HTMLDivElement): number {
  const viewSpan = chapterDiv.querySelector<HTMLSpanElement>(CHAPTER_VIEWS_SELECTOR)
  if(!viewSpan) throw `Unable to find view count for chapter: ${chapterName(chapterDiv)}`
  const views = Number(viewSpan
    .textContent
    ?.replaceAll(',', '')
    .trim()
  )

  if(isNaN(views)) throw `Unable to get view count for chapter: ${chapterName(chapterDiv)}`

  return views
}
