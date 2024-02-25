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