export type SearchSignature = (name: string) => Promise<SearchResponse>
export type SearchResponse = Record<string, Array<string>>
