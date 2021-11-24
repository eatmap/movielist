import useSWR from 'swr';

const fetcher = async (url) => {
  const res = await fetch(url);

  if (!res.ok) {
    let errorMessage = 'Failed to retrieve information';
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

export function GetMovieProviders(id) {
  const { data, error } = useSWR(`/api/movies/${id}/providers`, fetcher);

  return {
    providers: data?.result,
    isLoading: !error && !data,
    error: error,
  };
}

export function GetMovieTrailer(id) {
  const { data, error } = useSWR(`/api/movies/${id}/trailer`, fetcher);

  return {
    data: data?.result,
    isLoading: !error && !data,
    error: error,
  };
}
