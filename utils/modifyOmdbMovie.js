module.exports = (el, userId) => {
  return {
    title: el.Title || "",
    year: el.Year || "",
    runtime: el.Runtime || "",
    genre: el.Genre || "",
    director: el.Director || "",
    image: el.iamge || "",
    imdb_id: el.imdbID || "",
    is_favorite: true,
    is_deleted: false,
    user_id: userId,
  };
};
