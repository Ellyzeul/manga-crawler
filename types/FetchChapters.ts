export type FetchChaptersSignature = (mangaLink: string) => Promise<FetchChaptersResponse>
export type FetchChaptersResponse = {
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