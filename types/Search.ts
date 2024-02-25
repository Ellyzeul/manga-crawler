import { Source } from "./Source"

export type SearchSignature = (name: string) => Promise<SearchResponse>
export type SearchResponse = Array<MangaBasicInfo>
export type MangaBasicInfo = {
  name: string
  link: string,
  thumbnail: string,
  source: Source
}
