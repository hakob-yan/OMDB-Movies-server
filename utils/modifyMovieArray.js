module.exports = {
  modifyMovieArray: (arr) => {
    return arr.map((movie) => ({
      title: movie.Title,
      year: movie.Year,
      imdbID: movie.imdbID,
      type: movie.Type,
      image: movie.Poster,
    }));
  },
  modifyFoundMovie: (movie) => {
    return {
      title: movie.Title,
      year: movie.Year,
      imdbID: movie.imdbID,
      genre: movie.Genre,
      director:movie.Director,
      image: movie.Poster,
      runtime: movie.Runtime,

    };
  },
};
