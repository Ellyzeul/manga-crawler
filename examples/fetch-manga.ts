import MangaCrawler from ".."

(async() => {
  const result = await MangaCrawler.fetchManga('https://mangakakalot.com/read-wv0gq158504871385', 'mangakakalot')

  console.log(result)
})()