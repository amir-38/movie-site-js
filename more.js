document.addEventListener("DOMContentLoaded", () => {
  const body = document.querySelector("body");
  const editButton = document.getElementById("editButton");

  const movieId = getMovieIdFromUrl();

  fetch(`http://localhost:3000/movies/${movieId}`)
    .then((response) => response.json())
    .then((movie) => {
      const movieDetails = document.createElement("div");
      movieDetails.className = "movie-details";
      movieDetails.id = "movieDetailsContainer";
      movieDetails.innerHTML = `
      <div class="bacgraund-img">
        <img src="${movie.movieImageUrl}" alt="" />
      </div>
      <div class="info">
      <h1>Name:${movie.title}</h1>
      <h3>Release year:${movie.releaseYear}</h3>
      <h3>Director:${movie.director}</h3>
      <h3>Genres:${movie.genre}</h3>
      <p>About movie:${movie.description}</p>
      <p>IMDB link:</p>
      </div>
      `;
      body.appendChild(movieDetails);

      editButton.addEventListener("click", () => {
        const queryParams = new URLSearchParams();
        queryParams.set("id", movieId);
        queryParams.set("title", movie.title);
        queryParams.set("releaseYear", movie.releaseYear);
        queryParams.set("genre", movie.genre);
        queryParams.set("image", movie.image);
        queryParams.set("duration", movie.duration);
        queryParams.set("director", movie.director);
        queryParams.set("description", movie.description);
        queryParams.set("movieImageUrl", movie.movieImageUrl);

        const queryString = queryParams.toString();
        window.location.href = `create.html?${queryString}`;
      });
    })
    .catch((error) => {
      console.error("Ошибка при получении информации о фильме:", error);
    });
});

function getMovieIdFromUrl() {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  return urlParams.get("id");
}
