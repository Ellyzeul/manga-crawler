import { describe, expect, test } from "@jest/globals"
import { URL_REGEX } from "./constants"
import fetchManga from "../lib/fetchManga"

describe('fetchManga module', () => {
  test('fetches manga on manganato', async() => {
    const {
      summary,
      alternative_titles,
      author,
      status,
      genres,
      updated_at,
      views,
      chapters
    } = await fetchManga('https://chapmanganato.to/manga-gx983580', 'manganato')

    expect(typeof summary).toEqual('string')

    alternative_titles.forEach(title => expect(typeof title).toEqual('string'))

    author ? expect(typeof author).toEqual('string') : expect(typeof author).toEqual('undefined')
    status ? expect(typeof status).toEqual('string') : expect(typeof status).toEqual('undefined')

    genres.forEach(genre => expect(typeof genre).toEqual('string'))

    updated_at ? expect(typeof updated_at).toEqual('string') : expect(typeof updated_at).toEqual('undefined')
    views ? expect(typeof views).toEqual('number') : expect(typeof views).toEqual('undefined')

    chapters.forEach(({ name, link, created_at, views }) => {
      expect(typeof name).toEqual('string')
      expect(link).toMatch(URL_REGEX)
      expect(typeof created_at).toEqual('string')
      expect(typeof views).toEqual('number')
    })
  })
})