import { MapSources } from "../types/MapSources"
import { SearchSignature } from "../types/Search"
import { Source } from "../types/Source"
import mangakakalotSearch from "../src/mangakakalot/search"

export default async function search(name: string, source: Source) {
  if(!mapSearch[source]) throw 'Feature unimplemented...'

  return await mapSearch[source](name)
}

const mapSearch: MapSources<SearchSignature> = {
  'mangakakalot': mangakakalotSearch,
}