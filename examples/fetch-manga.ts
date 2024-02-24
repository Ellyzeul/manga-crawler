import MangaCrawler from ".."

(async() => {
  const result = await MangaCrawler.fetchManga('https://chapmanganato.to/manga-ng952689', 'manganato')

  console.log(result)
})()