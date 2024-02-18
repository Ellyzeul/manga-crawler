export type SearchSignature = (name: string) => Promise<SearchResponse>
export type SearchResponse = Record<string, string | Array<string>>
