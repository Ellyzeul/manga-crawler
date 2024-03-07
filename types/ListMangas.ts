import { MangaBasicInfo } from "./Search";

export type ListMangasSignature<Opts extends BasicOpts> = (opts: Opts) => Promise<ListMangasResponse>
export type ListMangasResponse = {
  current_page: number,
  last_page: number,
  mangas: Array<MangaBasicInfo>,
}

export type BasicOpts = {
  page?: number,
}

export type MangakakalotOpts = BasicOpts & {
  type?: 'latest' | 'newest' | 'topview',
  category?: MangakakalotCategory,
  state?: 'all' | 'completed' | 'ongoing'
}
export type ManganatoOpts = BasicOpts & {
  type?: 'latest' | 'newest' | 'topview' | 'az',
  category?: ManganatoCategory,
  state?: 'all' | 'completed' | 'ongoing'
}
export type MangakakalotCategory = 'all' | 'action' | 'adult' | 'adventure' | 'comedy' | 'cooking' | 'doujinshi' | 'drama' | 'ecchi' | 'erotica' | 'fantasy' | 'gender-bender' | 'harem' | 'historical' | 'horror' | 'isekai' | 'josei' | 'manhua' | 'manhwa' | 'martial-arts' | 'mature' | 'mecha' | 'medical' | 'mystery' | 'oneshot' | 'pornographic' | 'psychological' | 'romance' | 'school-life' | 'sci-fi' | 'seinen' | 'shoujo' | 'shoujo-ai' | 'shounen' | 'shounen-ai' | 'slice-of-life' | 'smut' | 'sports' | 'supernatural' | 'tragedy' | 'webtoons' | 'yaoi' | 'yuri'
export type ManganatoCategory = 'all' | 'action' | 'adult' | 'adventure' | 'comedy' | 'cooking' | 'doujinshi' | 'drama' | 'ecchi' | 'erotica' | 'fantasy' | 'gender-bender' | 'harem' | 'historical' | 'horror' | 'isekai' | 'josei' | 'manhua' | 'manhwa' | 'martial-arts' | 'mature' | 'mecha' | 'medical' | 'mystery' | 'oneshot' | 'pornographic' | 'psychological' | 'romance' | 'school-life' | 'sci-fi' | 'seinen' | 'shoujo' | 'shoujo-ai' | 'shounen' | 'shounen-ai' | 'slice-of-life' | 'smut' | 'sports' | 'supernatural' | 'tragedy' | 'webtoons' | 'yaoi' | 'yuri'
