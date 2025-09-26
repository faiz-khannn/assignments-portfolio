// Get HTML elements
var searchInput = document.getElementById("searchInput");
var searchBtn = document.getElementById("searchBtn");
var clearBtn = document.getElementById("clearBtn");
var loading = document.getElementById("loading");
var errorMessage = document.getElementById("errorMessage");
var movieContainer = document.getElementById("movieContainer");
var suggestionsDropdown = document.getElementById("suggestionsDropdown");

// OMDB API
var apiKey = "579df463";
var apiUrl = "https://www.omdbapi.com/";
var searchTimeout;

// user clicks search button
searchBtn.addEventListener("click", function () {
  searchForMovie();
  hideSuggestions();
});

// user clicks clear button
clearBtn.addEventListener("click", function () {
  clearEverything();
});

// user presses Enter key
searchInput.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    searchForMovie();
    hideSuggestions();
  }
});

// user types in search box
searchInput.addEventListener("input", function () {
  handleTyping();
});

// user clicks outside search area(hide suggestions)
document.addEventListener("click", function (e) {
  if (!e.target.closest(".search-input-wrapper")) {
    hideSuggestions();
  }
});

// when user types
function handleTyping() {
  var userInput = searchInput.value.trim();

  // Show or hide clear button
  if (userInput.length > 0) {
    clearBtn.classList.add("show");
  } else {
    clearBtn.classList.remove("show");
  }

  // Clear any previous timeout
  clearTimeout(searchTimeout);

  // Get suggestions after user stops typing
  if (userInput.length >= 1) {
    searchTimeout = setTimeout(function () {
      getSuggestionsFromAPI(userInput);
    }, 150);
  } else {
    hideSuggestions();
  }
}

// movie suggestions from API
function getSuggestionsFromAPI(movieTitle) {
  // API URL for search suggestions
  var url = apiUrl + "?apikey=" + apiKey + "&s=" + movieTitle + "&type=movie";

  // API request
  fetch(url)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      // Check if we got results
      if (data.Response === "True" && data.Search) {
        // Show first 20 suggestions
        displaySuggestions(data.Search.slice(0, 20));
      } else {
        hideSuggestions();
      }
    })
    .catch(function (error) {
      console.log("Error getting suggestions:", error);
      hideSuggestions();
    });
}

// Display the suggestions dropdown
function displaySuggestions(movies) {
  var suggestionsHTML = "";

  // HTML for each movie suggestion
  for (var i = 0; i < movies.length; i++) {
    var movie = movies[i];

    // Create poster image
    var posterHTML = createPosterHTML(movie);

    // Build suggestion item
    suggestionsHTML +=
      '<div class="suggestion-item" onclick="selectSuggestion(\'' +
      movie.Title.replace(/'/g, "\\'") +
      "')\">";
    suggestionsHTML += posterHTML;
    suggestionsHTML += '<div class="suggestion-details">';
    suggestionsHTML +=
      '<div class="suggestion-title">' + movie.Title + "</div>";
    suggestionsHTML += '<div class="suggestion-year">' + movie.Year + "</div>";
    suggestionsHTML += "</div>";
    suggestionsHTML += "</div>";
  }

  // Show the suggestions
  suggestionsDropdown.innerHTML = suggestionsHTML;
  suggestionsDropdown.style.display = "block";
}

// Create poster HTML
function createPosterHTML(movie) {
  if (movie.Poster && movie.Poster !== "N/A") {
    return (
      '<img src="' +
      movie.Poster +
      '" alt="' +
      movie.Title +
      '" class="suggestion-poster">'
    );
  } else {
    return '<div class="suggestion-poster-placeholder">🎬</div>';
  }
}

// Hide the suggestions dropdown
function hideSuggestions() {
  suggestionsDropdown.style.display = "none";
}

// When user clicks on a suggestion
function selectSuggestion(movieTitle) {
  searchInput.value = movieTitle;
  clearBtn.classList.add("show");
  hideSuggestions();
  searchForMovie();
}

// search for a specific movie
function searchForMovie() {
  var movieTitle = searchInput.value.trim();

  // Check if user entered something
  if (movieTitle === "") {
    alert("Please enter a movie title");
    return;
  }

  // Hide previous results and show loading
  hideAllResults();
  showLoadingState();

  // API URL for detailed movie info
  var url = apiUrl + "?apikey=" + apiKey + "&t=" + movieTitle + "&plot=full";

  // MAPI request
  fetch(url)
    .then(function (response) {
      return response.json();
    })
    .then(function (movieData) {
      hideLoadingState();

      // Check if movie was found
      if (movieData.Response === "True") {
        displayMovieDetails(movieData);
      } else {
        showErrorMessage();
      }
    })
    .catch(function (error) {
      console.log("Error searching movie:", error);
      hideLoadingState();
      showErrorMessage();
    });
}

// Display the full movie details
function displayMovieDetails(movie) {
  // Create poster section
  createMoviePoster(movie);

  // Create movie information section
  createMovieInfo(movie);

  // Show the movie container
  movieContainer.style.display = "block";
  clearBtn.classList.add("show");
}

// Create the movie poster section
function createMoviePoster(movie) {
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
}

// the movie information section
function createMovieInfo(movie) {
  var detailsContainer = document.querySelector(".movie-details");
  var movieInfoHTML = "";

  // Movie title
  movieInfoHTML += "<h2>" + movie.Title + "</h2>";

  // Basic movie details
  movieInfoHTML += createBasicDetails(movie);

  // Ratings section
  if (movie.Ratings && movie.Ratings.length > 0) {
    movieInfoHTML += createRatingsSection(movie.Ratings);
  }

  // Detailed information
  movieInfoHTML += createDetailedInfo(movie);

  // Plot
  movieInfoHTML += createPlotSection(movie);

  detailsContainer.innerHTML = movieInfoHTML;
}

// Create basic movie details
function createBasicDetails(movie) {
  var html = '<div class="movie-meta">';
  html +=
    '<span class="meta-item"><span class="meta-label">Year:</span> ' +
    (movie.Year || "N/A") +
    "</span>";
  html +=
    '<span class="meta-item"><span class="meta-label">Rated:</span> ' +
    (movie.Rated || "N/A") +
    "</span>";
  html +=
    '<span class="meta-item"><span class="meta-label">Runtime:</span> ' +
    (movie.Runtime || "N/A") +
    "</span>";
  html +=
    '<span class="meta-item"><span class="meta-label">Released:</span> ' +
    (movie.Released || "N/A") +
    "</span>";
  html += "</div>";
  return html;
}

// ratings section
function createRatingsSection(ratings) {
  var html = '<div class="ratings"><h3>🏆 Ratings</h3>';

  for (var i = 0; i < ratings.length; i++) {
    var rating = ratings[i];
    var ratingInfo = getRatingInfo(rating);

    html += '<div class="rating-item">';
    html += '<span class="rating-source">' + ratingInfo.icon + "</span>";
    html += '<span class="rating-value">' + ratingInfo.value + "</span>";
    html += "</div>";
  }

  html += "</div>";
  return html;
}

// rating icon
function getRatingInfo(rating) {
  var ratingValue = rating.Value;
  var icon = "⭐"; // default icon

  if (rating.Source === "Internet Movie Database") {
    icon = "⭐";
    ratingValue = ratingValue.replace("/10", "");
  } else if (rating.Source === "Rotten Tomatoes") {
    icon = "🍅";
    ratingValue = ratingValue.replace("%", "");
  } else if (rating.Source === "Metacritic") {
    icon = "🎯";
    ratingValue = ratingValue.replace("/100", "");
  }

  return {
    icon: icon,
    value: ratingValue,
  };
}

// movie information
function createDetailedInfo(movie) {
  var html = '<div class="movie-info">';
  html +=
    '<div class="info-row"><span class="info-label">Genre:</span>' +
    '<span class="info-value">' +
    (movie.Genre || "N/A") +
    "</span></div>";
  html +=
    '<div class="info-row"><span class="info-label">Director:</span>' +
    '<span class="info-value">' +
    (movie.Director || "N/A") +
    "</span></div>";
  html +=
    '<div class="info-row"><span class="info-label">Writer:</span>' +
    '<span class="info-value">' +
    (movie.Writer || "N/A") +
    "</span></div>";
  html +=
    '<div class="info-row"><span class="info-label">Actors:</span>' +
    '<span class="info-value">' +
    (movie.Actors || "N/A") +
    "</span></div>";
  html += "</div>";
  return html;
}

// plot section
function createPlotSection(movie) {
  return (
    '<div class="plot"><strong>Plot:</strong><br>' +
    (movie.Plot || "No plot available.") +
    "</div>"
  );
}

// Clear everything and reset to initial state
function clearEverything() {
  searchInput.value = "";
  clearBtn.classList.remove("show");
  hideAllResults();
  hideSuggestions();
  searchInput.focus();
}

// Show loading state
function showLoadingState() {
  loading.style.display = "block";
  searchBtn.disabled = true;
  searchBtn.textContent = "Searching...";
}

// Hide loading state
function hideLoadingState() {
  loading.style.display = "none";
  searchBtn.disabled = false;
  searchBtn.textContent = "Search";
}

// Show error message
function showErrorMessage() {
  errorMessage.style.display = "block";
  movieContainer.style.display = "none";
}

// Hide all results
function hideAllResults() {
  errorMessage.style.display = "none";
  movieContainer.style.display = "none";
}

// Focus on search input when page loads
searchInput.focus();