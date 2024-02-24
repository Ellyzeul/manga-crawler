# Manga Crawler

A lib for programmatic access to manga on diverse sources.

[Português](https://github.com/Ellyzeul/manga-crawler/blob/main/README-pt_BR.md)

## Installation

```shell
npm i manga-crawler
```

# Features

Feature | Mangakakalot | Manganato
-|-|-
[`search`](#search) | ✅ | ❌
[`fetchManga`](#fetchManga) | ✅ | ✅
[`fetchChapterPages`](#fetchchapterpages) | ✅ | ✅

## Usage

### `search`

`search(name: string, source: string)`

- `name`: Name of the manga to search
- `source`: Name of the supported search source

```javascript
import MangaCrawler from "manga-crawler"

const results = await MangaCrawler.search('naruto', 'mangakakalot')
```
Returned type: 
```typescript
Array<{
  name: string,       // Manga title
  link: string,       // Manga page link
  thumbnail: string,  // Cover link
}>
```
---
### `fetchManga`

`fetchManga(mangaLink: string, source: string)`

- `mangaLink`: Link for the manga webpage
- `source`: Name of the supported source

```javascript
import MangaCrawler from "manga-crawler"

const results = await MangaCrawler.fetchManga('https://chapmanganato.to/manga-ng952689', 'manganato')
```
Returned type: 
```typescript
{
  summary: string,                    // Manga description
  alternative_titles: Array<string>,  // Alternative titles list
  author?: string,                    // Author of the manga
  status?: string,                    // Current manga status
  genres: Array<string>,              // Genres list of the manga
  updated_at?: string,                // Latest update date
  views?: number,                     // Total views
  chapters: Array<{
    name: string          // Chapter name
    link: string,         // Chapter link
    created_at: string,   // Post date of the chapter
    views: number,        // Total views
  }>
}
```
---
### `fetchChapterPages`

`fetchChapterPages(chapterLink: string, source: string)`

- `chapterLink`: Link for the chapter webpage
- `source`: Name of the supported source

```javascript
import MangaCrawler from "manga-crawler"

const results = await MangaCrawler.fetchChapterPages('https://chapmanganato.to/manga-uo998171/chapter-1', 'manganato')
```
Returned type: 
```typescript
Array<{
  encoded_page?: string,   // Page image like the following: `data:image/jpeg;base64, ${encodedPage}`
  number: number,          // Number of the page
}>
```
