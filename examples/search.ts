import MangaCrawler from "..";

(async() => {
  const results = await MangaCrawler.search('naruto', 'manganato')

  console.log(results)
})()
