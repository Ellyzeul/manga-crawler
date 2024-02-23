import axios from "axios"
import { FetchChapterPagesResponse, FetchChapterPagesSignature } from "../../types/FetchChapterPages"
import { fetchDocument } from "../utils"
import { CHAPTER_PAGES_LIST } from "./constants"

const fetchChapterPages: FetchChapterPagesSignature = async(chapterLink: string): Promise<FetchChapterPagesResponse> => {
  const document = await fetchDocument(chapterLink)
  const response: FetchChapterPagesResponse = []
  const promises: Array<Promise<void>> = []
  const pages = Array.from(document.querySelectorAll<HTMLImageElement>(CHAPTER_PAGES_LIST))
  const { length: lim } = pages

  for(let i = 0; i < lim; i++) {
    const { src: pageLink } = pages[i]
    const pageNumber = i + 1

    promises.push(handleImageRequest(response, pageLink, pageNumber))
  }

  if(promises.length > 0) await Promise.all(promises)

  return response
}

export default fetchChapterPages

async function handleImageRequest(response: FetchChapterPagesResponse, pageLink: string, pageNumber: number): Promise<void> {
  try {
    const { data } = await axios.get(pageLink, {
      headers: {
        "Accept": 'image/avif,image/webp,*/*',
        "Content-Type": 'image/jpeg',
        "Accept-Ranges": 'bytes',
        "Referer": 'https://chapmanganato.to/',
      },
      responseType: 'arraybuffer',
    })

    const imgEncoded = Buffer.from(data, 'binary').toString('base64')

    response.push({
      number: pageNumber,
      encoded_page: `data:image/jpeg;base64, ${imgEncoded}`
    })
  }
  catch {
    response.push({ number: pageNumber })
  }
}
