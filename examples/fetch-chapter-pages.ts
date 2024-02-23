import MangaCrawler from ".."

(async() => {
  const pages = await MangaCrawler.fetchChapterPages('https://mangakakalot.com/chapter/ri924061/chapter_1', 'mangakakalot')

  console.log(pages)
})()
