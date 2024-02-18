import mangakakalotSearch from "./src/mangakakalot/search";
import { SearchSignature } from "./types/Search";

export async function search(name: string, source: Source) {
  if(!mapSearch[source]) throw 'Feature unimplemented...'

  return await mapSearch[source](name)
}

const mapSearch: MapSources<SearchSignature> = {
  'mangakakalot': mangakakalotSearch,
}

type Source = 
    'mangakakalot'

type MapSources<Signature> = Record<string, Signature>
