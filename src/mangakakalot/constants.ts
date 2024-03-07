import { MangakakalotCategory } from "../../types/ListMangas"


// fetchManga

export const MANGA_DETAILS_LIST_SELECTOR = 'div.manga-info-top'
export const MANGA_TITLE_SELECTOR = 'li:nth-child(1) > h1'
export const MANGA_SUMMARY_SELECTOR = 'div#noidungm'
export const MANGA_ALTERNATIVE_TITLES_SELECTOR = 'li:nth-child(1) > h2'
export const MANGA_AUTHOR_SELECTOR = 'li:nth-child(2) > a'
export const MANGA_STATUS_SELECTOR = 'li:nth-child(3)'
export const MANGA_GENRES_SELECTOR = 'li:nth-child(7) > a'
export const MANGA_UPDATED_AT_SELECTOR = 'li:nth-child(4)'
export const MANGA_VIEWS_SELECTOR = 'li:nth-child(6)'
export const CHAPTERS_SELECTOR = 'div.chapter-list > div.row'
export const CHAPTER_TITLE_SELECTOR = 'span:nth-child(1) > a'
export const CHAPTER_CREATED_AT_SELECTOR = 'span:nth-child(3)'
export const CHAPTER_VIEWS_SELECTOR = 'span:nth-child(2)'


// listMangas

export const LIST_MANGA_PAGINATOR_SELECTOR = 'div.panel_page_number > div.group_page > a.page_last'
export const LIST_MANGA_LIST_SELECTOR = 'div.truyen-list > div.list-truyen-item-wrap'
export const LIST_MANGA_TITLE_SELECTOR = 'h3 > a'
export const LIST_MANGA_THUMBNAIL_SELECTOR = 'a:nth-child(1) > img'
export const LIST_MANGA_CATEGORY_CODE_FOR: Record<MangakakalotCategory, string> = {
  'all': 'all',
  'action': '2',
  'adult': '3',
  'adventure': '4',
  'comedy': '6',
  'cooking': '7',
  'doujinshi': '9',
  'drama': '10',
  'ecchi': '11',
  'erotica': '48',
  'fantasy': '12',
  'gender-bender': '13',
  'harem': '14',
  'historical': '15',
  'horror': '16',
  'isekai': '45',
  'josei': '17',
  'manhua': '44',
  'manhwa': '43',
  'martial-arts': '19',
  'mature': '20',
  'mecha': '21',
  'medical': '22',
  'mystery': '24',
  'oneshot': '25',
  'pornographic': '47',
  'psychological': '26',
  'romance': '27',
  'school-life': '28',
  'sci-fi': '29',
  'seinen': '30',
  'shoujo': '31',
  'shoujo-ai': '32',
  'shounen': '33',
  'shounen-ai': '34',
  'slice-of-life': '35',
  'smut': '36',
  'sports': '37',
  'supernatural': '38',
  'tragedy': '39',
  'webtoons': '40',
  'yaoi': '41',
  'yuri': '42',
}
