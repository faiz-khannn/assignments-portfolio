var searchInput = document.getElementById("searchInput");
      var searchBtn = document.getElementById("searchBtn");
      var clearBtn = document.getElementById("clearBtn");
      var loading = document.getElementById("loading");
      var errorMessage = document.getElementById("errorMessage");
      var movieContainer = document.getElementById("movieContainer");
      var suggestionsDropdown = document.getElementById("suggestionsDropdown");

      var apiKey = "579df463";
      var apiUrl = "https://www.omdbapi.com/";
      var searchTimeout;

      searchBtn.addEventListener("click", function () {
        searchMovie();
        hideSuggestions();
      });

      clearBtn.addEventListener("click", function () {
        clearSearch();
      });

      searchInput.addEventListener("keypress", function (e) {
        if (e.key === "Enter") {
          searchMovie();
          hideSuggestions();
        }
      });

      searchInput.addEventListener("input", function () {
        var query = searchInput.value.trim();

        if (query.length > 0) {
          clearBtn.classList.add("show");
        } else {
          clearBtn.classList.remove("show");
        }

        clearTimeout(searchTimeout);

        if (query.length >= 1) {
          searchTimeout = setTimeout(function () {
            getSuggestions(query);
          }, 150);
        } else {
          hideSuggestions();
        }
      });

      document.addEventListener("click", function (e) {
        if (!e.target.closest(".search-input-wrapper")) {
          hideSuggestions();
        }
      });

      function getSuggestions(query) {
        var url = apiUrl + "?apikey=" + apiKey + "&s=" + query + "&type=movie";

        fetch(url)
          .then(function (response) {
            return response.json();
          })
          .then(function (data) {
            if (data.Response === "True" && data.Search) {
              showSuggestions(data.Search.slice(0, 20));
            } else {
              hideSuggestions();
            }
          })
          .catch(function (error) {
            console.log("Suggestions error:", error);
            hideSuggestions();
          });
      }

      function showSuggestions(movies) {
        var suggestionsHtml = "";

        for (var i = 0; i < movies.length; i++) {
          var movie = movies[i];
          var posterHtml = "";

          if (movie.Poster && movie.Poster !== "N/A") {
            posterHtml =
              '<img src="' +
              movie.Poster +
              '" alt="' +
              movie.Title +
              '" class="suggestion-poster">';
          } else {
            posterHtml = '<div class="suggestion-poster-placeholder">🎬</div>';
          }

          suggestionsHtml +=
            '<div class="suggestion-item" onclick="selectSuggestion(\'' +
            movie.Title.replace(/'/g, "\\'") +
            "')\">";
          suggestionsHtml += posterHtml;
          suggestionsHtml += '<div class="suggestion-details">';
          suggestionsHtml +=
            '<div class="suggestion-title">' + movie.Title + "</div>";
          suggestionsHtml +=
            '<div class="suggestion-year">' + movie.Year + "</div>";
          suggestionsHtml += "</div>";
          suggestionsHtml += "</div>";
        }

        suggestionsDropdown.innerHTML = suggestionsHtml;
        suggestionsDropdown.style.display = "block";
      }

      function hideSuggestions() {
        suggestionsDropdown.style.display = "none";
      }

      function clearSearch() {
        searchInput.value = "";
        clearBtn.classList.remove("show");
        hideResults();
        hideSuggestions();
        searchInput.focus();
      }

      function selectSuggestion(title) {
        searchInput.value = title;
        clearBtn.classList.add("show");
        hideSuggestions();
        searchMovie();
      }

      function searchMovie() {
        var movieTitle = searchInput.value.trim();

        if (movieTitle === "") {
          alert("Please enter a movie title");
          return;
        }

        hideResults();
        showLoading();

        var url =
          apiUrl + "?apikey=" + apiKey + "&t=" + movieTitle + "&plot=full";

        fetch(url)
          .then(function (response) {
            return response.json();
          })
          .then(function (data) {
            hideLoading();
            if (data.Response === "True") {
              showMovie(data);
            } else {
              showError();
            }
          })
          .catch(function (error) {
            console.log("Error:", error);
            hideLoading();
            showError();
          });
      }

      function showMovie(movie) {
        var posterContainer = document.querySelector(".movie-poster-container");
        if (movie.Poster && movie.Poster !== "N/A") {
          posterContainer.innerHTML =
            '<img src="' +
            movie.Poster +
            '" alt="' +
            movie.Title +
            ' poster" class="movie-poster">';
        } else {
          posterContainer.innerHTML =
            '<div class="poster-placeholder">📽️<br>No Poster Available</div>';
        }

        var detailsContainer = document.querySelector(".movie-details");
        var movieInfo = "<h2>" + movie.Title + "</h2>";

        movieInfo += '<div class="movie-meta">';
        movieInfo +=
          '<span class="meta-item"><span class="meta-label">Year:</span> ' +
          (movie.Year || "N/A") +
          "</span>";
        movieInfo +=
          '<span class="meta-item"><span class="meta-label">Rated:</span> ' +
          (movie.Rated || "N/A") +
          "</span>";
        movieInfo +=
          '<span class="meta-item"><span class="meta-label">Runtime:</span> ' +
          (movie.Runtime || "N/A") +
          "</span>";
        movieInfo +=
          '<span class="meta-item"><span class="meta-label">Released:</span> ' +
          (movie.Released || "N/A") +
          "</span>";
        movieInfo += "</div>";

        if (movie.Ratings && movie.Ratings.length > 0) {
          movieInfo += '<div class="ratings"><h3>🏆 Ratings</h3>';

          for (var i = 0; i < movie.Ratings.length; i++) {
            var rating = movie.Ratings[i];
            var ratingValue = rating.Value;
            var icon = "";

            if (rating.Source === "Internet Movie Database") {
              icon = "⭐";
              ratingValue = ratingValue.replace("/10", "");
            } else if (rating.Source === "Rotten Tomatoes") {
              icon = "🍅";
              ratingValue = ratingValue.replace("%", "");
            } else if (rating.Source === "Metacritic") {
              icon = "🎯";
              ratingValue = ratingValue.replace("/100", "");
            } else {
              icon = "⭐";
            }

            movieInfo += '<div class="rating-item">';
            movieInfo += '<span class="rating-source">' + icon + "</span>";
            movieInfo +=
              '<span class="rating-value">' + ratingValue + "</span>";
            movieInfo += "</div>";
          }

          movieInfo += "</div>";
        }

        movieInfo += '<div class="movie-info">';
        movieInfo +=
          '<div class="info-row"><span class="info-label">Genre:</span><span class="info-value">' +
          (movie.Genre || "N/A") +
          "</span></div>";
        movieInfo +=
          '<div class="info-row"><span class="info-label">Director:</span><span class="info-value">' +
          (movie.Director || "N/A") +
          "</span></div>";
        movieInfo +=
          '<div class="info-row"><span class="info-label">Writer:</span><span class="info-value">' +
          (movie.Writer || "N/A") +
          "</span></div>";
        movieInfo +=
          '<div class="info-row"><span class="info-label">Actors:</span><span class="info-value">' +
          (movie.Actors || "N/A") +
          "</span></div>";
        movieInfo += "</div>";

        movieInfo +=
          '<div class="plot"><strong>Plot:</strong><br>' +
          (movie.Plot || "No plot available.") +
          "</div>";

        detailsContainer.innerHTML = movieInfo;
        movieContainer.style.display = "block";

        clearBtn.classList.add("show");
      }

      function showLoading() {
        loading.style.display = "block";
        searchBtn.disabled = true;
        searchBtn.textContent = "Searching...";
      }

      function hideLoading() {
        loading.style.display = "none";
        searchBtn.disabled = false;
        searchBtn.textContent = "Search";
      }

      function showError() {
        errorMessage.style.display = "block";
        movieContainer.style.display = "none";
      }

      function hideResults() {
        errorMessage.style.display = "none";
        movieContainer.style.display = "none";
      }

      searchInput.focus();