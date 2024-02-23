import manganatoFetchChapterPages from "../src/manganato/fetchChapterPages"
import type { MapSources } from "../types/MapSources"
import type { Source } from "../types/Source"
import type { FetchChapterPagesSignature } from "../types/FetchChapterPages"

export default async function fetchChapterPages(chapterLink: string, source: Source) {
  if(!mapSources[source]) throw 'Feature unimplemented...'

  return await mapSources[source](chapterLink)
}

const mapSources: MapSources<FetchChapterPagesSignature> = {
  'manganato': manganatoFetchChapterPages,
  'mangakakalot': manganatoFetchChapterPages,
}
