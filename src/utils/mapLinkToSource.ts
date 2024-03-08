import { Source } from "../../types/Source"

export default function mapLinkToSource(link: string): Source {
  const matches = link.match(/http[s]{0,1}:\/\/([A-z]*)\..*/)
  if(!matches) throw `RegEx couldn't match for the given link: ${link}`
  const domain = matches[1]

  return linkToSourceMapping[domain]
}

const linkToSourceMapping: Record<string, Source> = {
  'mangakakalot': 'mangakakalot',
  'chapmanganato': 'manganato',
  'manganato': 'manganato',
}
