import { describe, expect, test } from "@jest/globals"
import search from "../lib/search"
import { URL_REGEX } from "./constants"

describe('search module', () => {
  test('searchs on mangakakalot', async() => {
    const results = await search('naruto', 'mangakakalot')

    results.forEach(({ name, link, thumbnail }) => {
      expect(typeof name).toEqual('string')

      expect(link).toMatch(URL_REGEX)
      expect(thumbnail).toMatch(URL_REGEX)
    })
  })
})