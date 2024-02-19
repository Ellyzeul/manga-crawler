export type SearchSignature = (name: string) => Promise<SearchResponse>
export type SearchResponse = Record<string, Array<MangaBasicInfo>>
export type MangaBasicInfo = {
  link: string,
  thumbnail: string,
}
