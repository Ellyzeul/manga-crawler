import axios from "axios"
import { JSDOM } from "jsdom"
import { Source } from "../types/Source"

export async function fetchDocument(url: string) {
  return new JSDOM(await axios
    .get(url, { responseType: 'text' })
    .then(res => res.data)
  ).window.document
}

export function mapLinkToSource(link: string): Source {
  const matches = link.match(/http[s]{0,1}:\/\/([A-z]*)\..*/)
  if(!matches) throw 'RegEx couldn\'t match for the given link...'
  const domain = matches[1]

  return linkToSourceMapping[domain]
}

const linkToSourceMapping: Record<string, Source> = {
  'chapmanganato': 'manganato',
  'mangakakalot': 'mangakakalot',
}
