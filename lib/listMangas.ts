import { BasicOpts, ListMangasResponse, ListMangasSignature, MangakakalotOpts } from "../types/ListMangas";
import { MapSources } from "../types/MapSources";
import { Source } from "../types/Source";
import mangakakalotListMangas from '../src/mangakakalot/listMangas'

export default async function listMangas(source: 'mangakakalot', opts: MangakakalotOpts): Promise<ListMangasResponse>;
export default async function listMangas(source: Source, opts: {} & BasicOpts): Promise<ListMangasResponse> {
  if(!mapSources[source]) throw 'Feature unimplemented...'

  return await mapSources[source](opts)
}

const mapSources: MapSources<ListMangasSignature<{} & BasicOpts>> = {
  'mangakakalot': mangakakalotListMangas,
}
