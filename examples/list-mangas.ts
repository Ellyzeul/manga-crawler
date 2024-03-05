import MangaCrawler from ".."

(async() => {
  const results = await MangaCrawler.listMangas('mangakakalot', { page: 1 })

  console.log(results)
})()