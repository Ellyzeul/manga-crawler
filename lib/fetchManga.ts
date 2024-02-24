import { MapSources } from "../types/MapSources"
import manganatoFetchManga from "../src/manganato/fetchManga"
import { FetchChaptersSignature } from "../types/FetchChapters"
import { Source } from "../types/Source"

export default async function fetchManga(mangaLink: string, source: Source) {
  if(!mapSources[source]) throw 'Feature unimplemented...'

  return await mapSources[source](mangaLink)
}

const mapSources: MapSources<FetchChaptersSignature> = {
  'mangakakalot': manganatoFetchManga,
  'manganato': manganatoFetchManga,
}
