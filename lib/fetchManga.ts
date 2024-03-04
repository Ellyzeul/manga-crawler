import { MapSources } from "../types/MapSources"
import manganatoFetchManga from "../src/manganato/fetchManga"
import mangakakalotFetchManga from "../src/mangakakalot/fetchManga"
import { FetchMangaSignature } from "../types/FetchManga"
import { Source } from "../types/Source"

export default async function fetchManga(mangaLink: string, source: Source) {
  if(!mapSources[source]) throw 'Feature unimplemented...'

  return await mapSources[source](mangaLink)
}

const mapSources: MapSources<FetchMangaSignature> = {
  'mangakakalot': mangakakalotFetchManga,
  'manganato': manganatoFetchManga,
}
