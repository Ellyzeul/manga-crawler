# Manga Crawler

Uma biblioteca para acesso de mangás em fontes diversas.

[English](https://github.com/Ellyzeul/manga-crawler/blob/main/README.md)

## Instalação

```shell
npm i manga-crawler
```

# Funcionalidades implementadas

Funcionalidade | Mangakakalot | Manganato
-|-|-
[`search`](#search) | ✅ | ✅
[`fetchManga`](#fetchManga) | ❌ | ✅
[`fetchChapterPages`](#fetchchapterpages) | ✅ | ✅

## Uso da biblioteca

### `search`

`search(name: string, source: string)`

- `name`: Nome do mangá a ser pesquisado
- `source`: Nome da fonte de pesquisa suportada

```javascript
import MangaCrawler from "manga-crawler"

const results = await MangaCrawler.search('naruto', 'mangakakalot')
```
Tipo retornado: 
```typescript
Array<{
  name: string,       // Título do mangá
  link: string,       // Link para a página do mangá
  thumbnail: string,  // Link para a imagem da capa
  source: string,     // Fonte a qual o mangá pertence, pois nem sempre é a mesma da fonte de pesquisa
}>
```
---
### `fetchManga`

`fetchManga(mangaLink: string, source: string)`

- `mangaLink`: Link para a página do mangá
- `source`: Nome da fonte suportada

```javascript
import MangaCrawler from "manga-crawler"

const results = await MangaCrawler.fetchManga('https://chapmanganato.to/manga-ng952689', 'manganato')
```
Tipo retornado: 
```typescript
{
  summary: string,                    // Descrição do mangá
  alternative_titles: Array<string>,  // Lista de títulos alternativos
  author?: string,                    // Autor da obra
  status?: string,                    // Situação atual do mangá
  genres: Array<string>,              // Lista de gêneros
  updated_at?: string,                // Data da última atualização
  views?: number,                     // Total de visualizações
  chapters: Array<{
    name: string          // Nome do capítulo
    link: string,         // Link para o capítulo
    created_at: string,   // Data da postagem
    views: number,        // Número de leituras
  }>
}
```
---
### `fetchChapterPages`

`fetchChapterPages(chapterLink: string, source: string)`

- `chapterLink`: Link para a página do capítulo
- `source`: Nome da fonte suportada

```javascript
import MangaCrawler from "manga-crawler"

const results = await MangaCrawler.fetchChapterPages('https://chapmanganato.to/manga-uo998171/chapter-1', 'manganato')
```
Tipo retornado: 
```typescript
Array<{
  encoded_page?: string,   // Imagem da página no formato: `data:image/jpeg;base64, ${encodedPage}`
  number: number,          // Número da página
}>
```
