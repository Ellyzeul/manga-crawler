# Manga Crawler

Uma biblioteca para acesso de mangás em fontes diversas.

## Uso da biblioteca

### `search`

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
}>
```
---
### `fetchChaptersList`

```javascript
import MangaCrawler from "manga-crawler"

const results = await MangaCrawler.fetchChaptersList('https://chapmanganato.to/manga-ng952689', 'manganato')
```
Tipo retornado: 
```typescript
{
  summary: string,      // Descrição do mangá
  chapters: Array<{
    name: string          // Nome do capítulo
    link: string,         // Link para o capítulo
    created_at: string,   // Data da postagem
    views: number,        // Número de leituras
  }>
}
```
---
