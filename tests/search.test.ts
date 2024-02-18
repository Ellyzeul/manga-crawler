import { describe, expect, test } from "@jest/globals"
import { search } from ".."
import { URL_REGEX } from "./constants"

describe('search module', () => {
  test('searchs on mangakakalot', () => {
    search('naruto', 'mangakakalot')
      .then(results => {
        Object.keys(results).map(title => ([title, results[title]]))
          .forEach(([title, url]) => {
            expect(typeof title).toEqual('string')

            if(Array.isArray(url)) {
              url.forEach(link => expect(link).toMatch(URL_REGEX))
              return
            }

            expect(url).toMatch(URL_REGEX)
          })
      })
  })
})