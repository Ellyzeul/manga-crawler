import { describe, expect, test } from "@jest/globals"
import search from "../lib/search"
import { URL_REGEX } from "./constants"
import { SearchResponse } from "../types/Search"

describe('search module', () => {
  test('searchs on mangakakalot', async() => {
    const results = await search('naruto', 'mangakakalot')

    testResults(results)
  })

  test('searchs on manganato', async() => {
    const results = await search('naruto', 'manganato')

    testResults(results)
  })
})

function testResults(results: SearchResponse) {
  results.forEach(({ name, link, thumbnail, source }) => {
    expect(typeof name).toEqual('string')
    expect(link).toMatch(URL_REGEX)
    expect(thumbnail).toMatch(URL_REGEX)
    expect(typeof source).toEqual('string')
  })
}
