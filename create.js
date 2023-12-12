document.addEventListener("DOMContentLoaded", () => {
  const movieForm = document.getElementById("movieForm");

  const urlParams = new URLSearchParams(window.location.search);
  const movieId = urlParams.get("id");
  const movieTitle = urlParams.get("title");
  const releaseYear = urlParams.get("releaseYear");
  const genre = urlParams.get("genre");
  const image = urlParams.get("image");
  const duration = urlParams.get("duration");
  const director = urlParams.get("director");
  const description = urlParams.get("description");
  const imgUrl = urlParams.get("movieImageUrl");

  deleteButton.addEventListener("click", async () => {
    if (movieId) {
      const confirmDelete = confirm("Are you sure?");
      // function1();
      if (confirmDelete) {
        try {
          const response = await fetch(
            `http://localhost:3000/movies/${movieId}`,
            {
              method: "DELETE",
            }
          );

          if (response.ok) {
            alert("Movie deleted successfully!");
            // movieForm.reset();
            window.location.href = "/";
          } else {
            alert("Some problem");
          }
        } catch (error) {
          console.error("Some problem:", error);
        }
      }
    }
  });

  if (movieId) {
    movieForm.movieTitle.value = movieTitle;
    movieForm.releaseYear.value = releaseYear;
    movieForm.genre.value = genre;
    movieForm.movieImage.value = image;
    movieForm.duration.value = duration;
    movieForm.director.value = director;
    movieForm.description.value = description;
    movieForm.movieImageUrl.value = imgUrl;
  }

  movieForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const movieData = {
      title: movieForm.movieTitle.value,
      releaseYear: movieForm.releaseYear.value,
      genre: movieForm.genre.value,
      image: movieForm.movieImage.value,
      duration: movieForm.duration.value,
      director: movieForm.director.value,
      description: movieForm.description.value,
      movieImageUrl: movieForm.movieImageUrl.value,
    };

    try {
      let response;
      if (movieId) {
        response = await fetch(`http://localhost:3000/movies/${movieId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(movieData),
        });
      } else {
        response = await fetch("http://localhost:3000/movies", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(movieData),
        });
      }

      if (response.ok) {
        alert("Your movie saved!");
        movieForm.reset();
      } else {
        alert("eeerrrooorrr");
      }
    } catch (error) {
      console.error(error);
    }
  });
});
// function function1() {
//   const swalWithBootstrapButtons = Swal.mixin({
//     customClass: {
//       confirmButton: "btn btn-success",
//       cancelButton: "btn btn-danger",
//     },
//     buttonsStyling: true,
//   });

//   swalWithBootstrapButtons
//     .fire({
//       title: "Are you sure?",
//       text: "You won't be able to revert this!",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonText: "Yes, delete it!",
//       cancelButtonText: "No, cancel!",
//       reverseButtons: true,
//     })
//     .then((result) => {
//       if (result.isConfirmed) {
//         swalWithBootstrapButtons.fire(
//           "Deleted!",
//           "Your file has been deleted.",
//           "success"
//         );
//       } else if (
//         /* Read more about handling dismissals below */
//         result.dismiss === Swal.DismissReason.cancel
//       ) {
//         swalWithBootstrapButtons.fire(
//           "Cancelled",
//           "Your imaginary file is safe :)",
//           "error"
//         );
//       }
//     });
// }
function function2() {
  Swal.fire({
    title: "Do you want to save the changes?",
    showDenyButton: true,
    showCancelButton: true,
    confirmButtonText: "Save",
    denyButtonText: `Don't save`,
  }).then((result) => {
    /* Read more about isConfirmed, isDenied below */
    if (result.isConfirmed) {
      Swal.fire("Saved!", "", "success");
    } else if (result.isDenied) {
      Swal.fire("Changes are not saved", "", "info");
    }
  });
}
