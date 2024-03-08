import { ManganatoCategory } from "../../types/ListMangas"

export const CHAPTER_LIST_SELECTOR = 'ul.row-content-chapter'
export const CHAPTER_SUMMARY_SELECTOR = 'div.panel-story-info-description'

export const MANGA_TITLE_SELECTOR = 'div.story-info-right > h1'
export const MANGA_DETAILS_TABLE_SELECTOR = 'table.variations-tableInfo'
export const MANGA_ALTERNATIVE_TITLES_SELECTOR = 'tbody > tr:nth-child(1) > td.table-value > h2'
export const MANGA_AUTHOR_SELECTOR = 'tbody > tr:nth-child(2) > td.table-value > a'
export const MANGA_STATUS_SELECTOR = 'tbody > tr:nth-child(3) > td.table-value'
export const MANGA_GENRES_SELECTOR = 'tbody > tr:nth-child(4) > td.table-value > a'
export const MANGA_EXTRA_DETAILS_DIV_SELECTOR = 'div.story-info-right-extent'
export const MANGA_UPDATED_AT_SELECTOR = 'p:nth-child(1) > span.stre-value'
export const MANGA_VIEWS_SELECTOR = 'p:nth-child(2) > span.stre-value'

export const NUMBER_UNIT: Record<string, number> = {
  'K': 1000,
  'M': 1000000
}

export const CHAPTER_PAGES_LIST = 'div.container-chapter-reader > img'


// listMangas

export const LIST_MANGA_LAST_PAGE_SELECTOR = 'div.panel-page-number > div.group-page > a:nth-child(5)'
export const LIST_MANGA_MANGAS_SELECTOR = 'div.panel-content-genres > div.content-genres-item'
export const LIST_MANGA_TITLE_SELECTOR = 'div.genres-item-info > h3 > a.genres-item-name'
export const LIST_MANGA_THUMBNAIL_SELECTOR = 'a.genres-item-img > img.img-loading'
export const LIST_MANGA_CATEGORY_CODE_FOR: Record<ManganatoCategory, string> = {
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
