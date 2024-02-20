export type FetchChaptersSignature = (mangaLink: string) => Promise<FetchChaptersResponse>
export type FetchChaptersResponse = {
  summary: string,
  chapters: Array<ChapterInfo>
}
export type ChapterInfo = {
  name: string
  link: string,
  created_at: string,
  views: number,
}