export async function searchMovies(filters) {
  const payload = { filters };

  const response = await fetch('/api/search', {
    method: 'POST',
    body: JSON.stringify(payload),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const body = await response.json();
  if (response.status === 200) {
    return body.movies;
  }

  const errorMsg =
    body.message || 'Failed to retrieve movies. Please try again later';
  throw new Error(errorMsg);
}
