import { describe, expect, test } from "@jest/globals"
import { search } from ".."
import { URL_REGEX } from "./constants"

describe('search module', () => {
  test('searchs on mangakakalot', () => {
    search('naruto', 'mangakakalot')
      .then(results => {
        Object.keys(results).map(title => [title, results[title]] as [string, Array<string>])
          .forEach(([title, urlList]) => {
            expect(typeof title).toEqual('string')
            expect(urlList).toBeInstanceOf(Array)

            urlList.forEach(link => expect(link).toMatch(URL_REGEX))
          })
      })
  })
})