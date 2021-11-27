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

export async function deleteFromWatchlist(movieId) {
  const res = await fetch(`/api/watchlists`, {
    method: 'DELETE',
    body: JSON.stringify({
      movieId,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!res.ok) {
    let errorMessage = 'Failed to delete from watchlist';
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

  return;
}

export async function addToWatchlist(movieId, movieTitle, moviePosterPath) {
  const res = await fetch(`/api/watchlists`, {
    method: 'PUT',
    body: JSON.stringify({
      movieId,
      movieTitle,
      moviePosterPath,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!res.ok) {
    let errorMessage = 'Failed to add it to watchlist';
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

  return;
}

export function InWatchList(movieId) {
  const { data, error } = useSWR(`/api/watchlists/${movieId}/exists`, fetcher);

  return {
    exists: data?.exists || false,
    isLoading: !error && !data,
    error,
  };
}
