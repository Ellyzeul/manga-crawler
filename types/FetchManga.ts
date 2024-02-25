export type FetchMangaSignature = (mangaLink: string) => Promise<FetchMangaResponse>
export type FetchMangaResponse = {
  title: string,
  summary: string,
  alternative_titles: Array<string>,
  author?: string,
  status?: string,
  genres: Array<string>,
  updated_at?: string,
  views?: number,
  chapters: Array<ChapterInfo>
}
export type ChapterInfo = {
  name: string
  link: string,
  created_at: string,
  views: number,
}