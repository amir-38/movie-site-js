document.addEventListener("DOMContentLoaded", () => {
  const movieContainer = document.getElementById("movieContainer");
  const searchInput = document.getElementById("searchInput");
  const searchButton = document.getElementById("searchButton");
  const paginationContainer = document.getElementById("paginationContainer");
  const pageSize = 5;
  let currentPage = 1;

  function clearMovieContainer() {
    movieContainer.innerHTML = "";
  }

  function filterMovies(searchTerm) {
    clearMovieContainer();

    fetch("http://localhost:3000/movies")
      .then((response) => response.json())
      .then((movies) => {
        const filteredMovies = movies.filter((movie) => {
          const movieTitle = movie.title.toLowerCase();
          return movieTitle.includes(searchTerm.toLowerCase());
        });

        setupPagination(filteredMovies);
        displayMoviesPage(currentPage, filteredMovies);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  searchButton.addEventListener("click", () => {
    const searchTerm = searchInput.value;
    filterMovies(searchTerm);
  });

  function displayMoviesPage(pageNumber, movies) {
    clearMovieContainer();

    const startIndex = (pageNumber - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const moviesToDisplay = movies.slice(startIndex, endIndex);

    moviesToDisplay.forEach((movie) => {
      const movieCard = createMovieCard(movie);
      movieContainer.appendChild(movieCard);
    });
  }

  function setupPagination(movies) {
    paginationContainer.innerHTML = "";

    const totalPages = Math.ceil(movies.length / pageSize);

    for (let i = 1; i <= totalPages; i++) {
      const pageNumber = i;
      const pageLink = document.createElement("button");
      pageLink.textContent = pageNumber;
      pageLink.className = "page-link";
      pageLink.addEventListener("click", () => {
        currentPage = pageNumber;
        displayMoviesPage(currentPage, movies);
      });
      paginationContainer.appendChild(pageLink);
    }
  }

  function createMovieCard(movie) {
    const card = document.createElement("div");
    card.className = "movie_card bright";

    card.innerHTML = `
      <div class="info_section">
        <div class="movie_header">
          <img class="locandina" src="${movie.image}" />
          <h1>${movie.title}</h1>
          <h4>${movie.releaseYear}, ${movie.director}</h4>
          <span class="minutes">${movie.duration} min</span>
          <p class="type">${movie.genre}</p>
        </div>
        <div class="movie_desc">
          <p class="text">${movie.description}</p>
        </div>
        <div class="movie_social">
          <ul>
            <li><a href="more.html?id=${movie.id}">More information</a></li>
          </ul>
        </div>
      </div>
      <div class="blur_back bright_back"></div>
    `;
    const brightBack = card.querySelector(".bright_back");
    brightBack.style.backgroundImage = `url(${movie.movieImageUrl})`;

    return card;
  }

  fetch("http://localhost:3000/movies")
    .then((response) => response.json())
    .then((movies) => {
      setupPagination(movies);
      displayMoviesPage(currentPage, movies);
    })
    .catch((error) => {
      console.error(error);
    });
});
