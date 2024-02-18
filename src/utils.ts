import axios from "axios"
import { JSDOM } from "jsdom"

export async function fetchDocument(url: string) {
  return new JSDOM(await axios
    .get(url, { responseType: 'text' })
    .then(res => res.data)
  ).window.document
}