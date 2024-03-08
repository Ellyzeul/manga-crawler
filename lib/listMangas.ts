import { BasicOpts, ListMangasResponse, ListMangasSignature, MangakakalotOpts, ManganatoOpts } from "../types/ListMangas";
import { MapSources } from "../types/MapSources";
import { Source } from "../types/Source";
import mangakakalotListMangas from '../src/mangakakalot/listMangas'
import manganatoListMangas from '../src/manganato/listMangas'

export default async function listMangas(source: 'mangakakalot', opts: MangakakalotOpts): Promise<ListMangasResponse>;
export default async function listMangas(source: 'manganato', opts: ManganatoOpts): Promise<ListMangasResponse>;
export default async function listMangas(source: Source, opts: {} & BasicOpts): Promise<ListMangasResponse> {
  if(!mapSources[source]) throw 'Feature unimplemented...'

  return await mapSources[source](opts)
}

const mapSources: MapSources<ListMangasSignature<{} & BasicOpts>> = {
  'mangakakalot': mangakakalotListMangas,
  'manganato': manganatoListMangas,
}
