export function getMovieReleaseYear(releaseDate) {
  if (releaseDate) {
    return releaseDate.split('-')[0];
  }
  return null;
}

export function getMovieRuntime(runtime) {
  if (runtime && runtime > 0) {
    let hours = 0;
    let minutes = runtime;
    while (minutes > 60) {
      hours += 1;
      minutes -= 60;
    }

    return `${hours} HR ${minutes} MIN`;
  }
  return null;
}
