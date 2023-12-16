const modifyMovieArray = (arr) => {
  return arr.map((movie) => ({
    title: movie.Title,
    year: movie.Year,
    imdbID: movie.imdbID,
    type: movie.Type,
    image: movie.Poster,
  }));
};

module.exports = modifyMovieArray;
