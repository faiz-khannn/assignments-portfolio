// API key
const apiKey = "e6efefaf5e7f52079600eaafc40a128c";

// enter key support
document
  .getElementById("cityInput")
  .addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
      getWeather();
    }
  });

function getWindDirection(degrees) {
  if (!degrees && degrees !== 0) return "N/A";
  const directions = [
    "N",
    "NNE",
    "NE",
    "ENE",
    "E",
    "ESE",
    "SE",
    "SSE",
    "S",
    "SSW",
    "SW",
    "WSW",
    "W",
    "WNW",
    "NW",
    "NNW",
  ];
  return directions[Math.round(degrees / 22.5) % 16];
}

function formatTime(timestamp, timezone) {
  try {
    const date = new Date((timestamp + timezone) * 1000);
    return date.toUTCString().slice(-12, -4);
  } catch (error) {
    return "N/A";
  }
}

async function getWeather() {
  const city = document.getElementById("cityInput").value.trim();
  const weatherContainer = document.getElementById("weatherContainer");
  const errorMsg = document.getElementById("errorMsg");
  const loading = document.getElementById("loading");

  weatherContainer.style.display = "none";
  errorMsg.style.display = "none";

  if (!city) {
    showError("Please enter a city name to search!");
    return;
  }

  try {
    // loading
    loading.style.display = "block";

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
      city
    )}&appid=${apiKey}&units=metric`;

    console.log("Fetching weather for:", city);

    const response = await fetch(url);

    console.log("Response status:", response.status);

    if (!response.ok) {
      if (response.status === 404) {
        throw new Error("City not found");
      } else if (response.status === 401) {
        throw new Error("API key invalid");
      } else {
        throw new Error(`Error: ${response.status}`);
      }
    }

    const data = await response.json();
    console.log("Weather data:", data);

    // Hide-loading
    loading.style.display = "none";

    // main card
    document.getElementById(
      "cityName"
    ).textContent = `${data.name}, ${data.sys.country}`;
    document.getElementById("temperature").textContent = `${Math.round(
      data.main.temp
    )}°`;
    document.getElementById("description").textContent =
      data.weather[0].description;
    document.getElementById("feelsLike").textContent = `Feels like ${Math.round(
      data.main.feels_like
    )}°`;
    document.getElementById(
      "weatherIcon"
    ).src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`;

    // Temperature details
    document.getElementById("tempMax").textContent = `${Math.round(
      data.main.temp_max
    )}°C`;
    document.getElementById("tempMin").textContent = `${Math.round(
      data.main.temp_min
    )}°C`;
    document.getElementById("feelsLikeDetail").textContent = `${Math.round(
      data.main.feels_like
    )}°C`;

    // Wind and air quality
    document.getElementById("windSpeed").textContent = `${data.wind.speed} m/s`;
    document.getElementById("windDirection").textContent = data.wind.deg
      ? getWindDirection(data.wind.deg)
      : "N/A";
    document.getElementById("humidity").textContent = `${data.main.humidity}%`;
    document.getElementById(
      "pressure"
    ).textContent = `${data.main.pressure} hPa`;
    document.getElementById("clouds").textContent = `${data.clouds.all}%`;
    document.getElementById("visibility").textContent = data.visibility
      ? `${(data.visibility / 1000).toFixed(1)} km`
      : "N/A";

    // Sun times
    document.getElementById("sunrise").textContent = formatTime(
      data.sys.sunrise,
      data.timezone
    );
    document.getElementById("sunset").textContent = formatTime(
      data.sys.sunset,
      data.timezone
    );

    // weather container
    weatherContainer.style.display = "grid";
  } catch (error) {
    console.error("Weather fetch error:", error); // Debug log
    loading.style.display = "none";

    let errorMessage = "Unable to fetch weather data. ";
    if (error.message.includes("City not found")) {
      errorMessage = "City not found! Please check the spelling and try again.";
    } else if (error.message.includes("API key")) {
      errorMessage = "API configuration issue. Please try again later.";
    } else if (error.message.includes("Failed to fetch")) {
      errorMessage = "Network error. Please check your internet connection.";
    } else {
      errorMessage += "Please try again.";
    }

    showError(errorMessage);
  }
}

function showError(message) {
  const errorMsg = document.getElementById("errorMsg");
  errorMsg.textContent = message;
  errorMsg.style.display = "block";

  // Auto-hide after 6 seconds
  setTimeout(() => {
    errorMsg.style.display = "none";
  }, 6000);
}
