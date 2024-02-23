export type FetchChapterPagesSignature = (mangaLink: string) => Promise<FetchChapterPagesResponse>
export type FetchChapterPagesResponse = Array<ChapterPage>
export type ChapterPage = {
  number: number,
  encoded_page?: string,
}