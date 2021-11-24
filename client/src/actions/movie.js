import useSWR from 'swr';

const fetcher = async (url) => {
  const res = await fetch(url);

  console.log('Response OK: ', res.ok);

  if (!res.ok) {
    let errorMessage = 'Failed to retrieve movie details';
    try {
      const errorResponse = await res.json();
      console.log(errorResponse);
      if (errorResponse?.message) {
        errorMessage = errorResponse?.message;
      }
    } catch (e) {
      //
    }
    throw new Error(errorMessage);
  }

  return res.json();
};

export function GetMovieDetails(id) {
  const { data, error } = useSWR(`/api/movies/${id}/details`, fetcher);

  return {
    movie: data?.result,
    isLoading: !error && !data,
    error: error,
  };
}
