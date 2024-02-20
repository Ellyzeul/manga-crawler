import { MapSources } from "../types/MapSources"
import manganatoFetchChaptersList from "../src/manganato/fetchChaptersList"
import { FetchChaptersSignature } from "../types/FetchChapters"
import { Source } from "../types/Source"

export default async function fetchChaptersList(mangaLink: string, source: Source) {
  if(!mapSources[source]) throw 'Feature unimplemented...'

  return await mapSources[source](mangaLink)
}

const mapSources: MapSources<FetchChaptersSignature> = {
  'manganato': manganatoFetchChaptersList
}
