import MangaCrawler from "..";

(async() => {
  const results = await MangaCrawler.search('naruto', 'mangakakalot')

  console.log(results)
})()
