import MangaCrawler from ".."

(async() => {
  const results = await MangaCrawler.listMangas('manganato', {
    page: 1,
    categories_included: ['adventure'],
    categories_excluded: ['ecchi'],
    state: 'all',
    order_by: 'latest',
  })

  console.log(results)
})()