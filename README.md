# Manga Crawler

A lib for programmatic access to manga on diverse sources.

[Português](https://github.com/Ellyzeul/manga-crawler/blob/main/README-pt_BR.md)

## Installation

```shell
npm i manga-crawler
```

## Usage

### `search`

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
### `fetchChaptersList`

```javascript
import MangaCrawler from "manga-crawler"

const results = await MangaCrawler.fetchChaptersList('https://chapmanganato.to/manga-ng952689', 'manganato')
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

```javascript
import MangaCrawler from "manga-crawler"

const results = await MangaCrawler.fetchChapterPages('https://chapmanganato.to/manga-uo998171/chapter-1', 'manganato')
```
Returned type: 
```typescript
Array<{
  encoded_page?: string,   // Page image like the following: `data:image/jpeg;base64, ${encodedPage}`
  number: number,         // Number of the page
}>
```
