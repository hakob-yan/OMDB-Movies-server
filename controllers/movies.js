const movieArr = [
  {
    Title: "The Peter Weyland Files: TED Conference, 2023",
    Year: "2012",
    imdbID: "tt5362760",
    Type: "movie",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BYWZjOGFmMmQtYjBjNC00MDFkLWE1NDQtYTg4Y2Y0NzJiNTMyXkEyXkFqcGdeQXVyMjExMDE1MzQ@._V1_SX300.jpg",
  },
  {
    Title: "Spaghetti (2023)",
    Year: "2023",
    imdbID: "tt17081088",
    Type: "movie",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BODE2Zjc1MjctNmMwMC00YjVjLWE0ZTgtZmVhNTkyZTg1M2JmXkEyXkFqcGdeQXVyNTI2MDE4NDQ@._V1_SX300.jpg",
  },
  {
    Title: "Eurovision Song Contest Liverpool 2023",
    Year: "2023",
    imdbID: "tt20243990",
    Type: "series",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BZmVlMTY4NmMtYjcxOC00NWUxLWIyMzktN2E1MDhiN2JkZWExXkEyXkFqcGdeQXVyNjE1MjkwNw@@._V1_SX300.jpg",
  },
];

module.exports = {
  recent: async (req, res) => {
    res.send(movieArr);
  },
};
