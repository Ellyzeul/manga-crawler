import { describe, expect, test } from "@jest/globals"
import search from "../lib/search"
import { URL_REGEX } from "./constants"
import { MangaBasicInfo } from "../types/Search"

describe('search module', () => {
  test('searchs on mangakakalot', async() => {
    const results = await search('naruto', 'mangakakalot')

    Object.keys(results)
      .map(title => [title, results[title]] as [string, Array<MangaBasicInfo>])
      .forEach(([title, infoList]) => {
        expect(typeof title).toEqual('string')
        expect(infoList).toBeInstanceOf(Array)

        infoList.forEach(({ link, thumbnail }) => {
          expect(link).toMatch(URL_REGEX)
          expect(thumbnail).toMatch(URL_REGEX)
        })
      })
  })
})