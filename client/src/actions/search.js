import searchData from './mock/search.json';

export async function searchMovies(filters) {
  //   alert(JSON.stringify(filters, null, 2));

  // TODO - Make API call to get the value
  if (Math.random() < 0.2) {
    throw new Error('Failed to retrieve movies');
  }
  return new Promise((resolve) => {
    setTimeout(() => {
      return resolve(searchData.results);
    }, 2000);
  });
}
