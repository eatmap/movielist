import useSWR from 'swr';

async function fetcher(url) {
  const res = await fetch(url);

  if (!res.ok) {
    let errorMessage = 'Failed to retrieve data';
    try {
      const errorResponse = await res.json();
      if (errorResponse?.message) {
        errorMessage = errorResponse?.message;
      }
    } catch (e) {
      //
    }
    throw new Error(errorMessage);
  }

  return res.json();
}

export async function deleteFromWatchlist(movieId, watchlistId) {
  // TODO - Make API call to remove given movie from the watchlist
  return;
}

export async function addToWatchlist(
  movieId,
  movieTitle,
  posterPath,
  watchlistId,
) {
  // TODO - Make API call to store movie (title, poster path, id) to a given watchlist
  console.log('Adding to ' + watchlistId);
  return;
}

export function GetWatchlists() {
  const { data, error } = useSWR('/api/watchlists', fetcher);

  return {
    watchlists: data?.result || [],
    isLoading: !error && !data,
    error,
  };
}
