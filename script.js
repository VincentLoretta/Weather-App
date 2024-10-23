const weatherButton = document.getElementById("getWeather");
const cityInput = document.getElementById("city");

const locationEl = document.getElementById("location");
const temperatureEl = document.getElementById("temperature");
const descriptionEl = document.getElementById("description");
const humidityEl = document.getElementById("humidity");
const weatherResult = document.getElementById("weatherResult");

const apiKey = "20bfbfd009ae71376cd117af77318b02"; // Replace with your OpenWeatherMap API key

// Set default background on page load
updateBackground("default");
weatherButton.addEventListener("click", getWeather);

async function getWeather() {
  const city = cityInput.value;
  if (!city) {
    alert("Please Enter a City Name");
    return;
  }
  
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.cod === "404") {
      alert("City not found");
      return;
    }

    // Extract data from the API response
    const location = `${data.name}, ${data.sys.country}`;
    const temperature = `${Math.round(data.main.temp)}°F`;
    const description = data.weather[0].description;
    const humidity = `Humidity: ${data.main.humidity}%`;
    const weatherCondition = data.weather[0].main.toLowerCase(); // e.g., "clear", "clouds", "rain"
    
    // Update the background based on weather condition
    updateBackground(weatherCondition);

    // Display the results
    locationEl.textContent = `Location: ${location}`;
    temperatureEl.textContent = `Temperature: ${temperature}`;
    descriptionEl.textContent = `Condition: ${description}`;
    humidityEl.textContent = humidity;

    // Show the weather result div
    weatherResult.style.display = "block";
  } catch (error) {
    alert("Failed to fetch weather data. Please try again.");
    console.error("Error fetching weather data:", error);
  }
}

function updateBackground(condition) {
  const body = document.body;

  switch (condition) {
    case 'clear':
      body.style.backgroundImage = "url('images/clear-sky.jpg')";
      break;
    case 'clouds':
      body.style.backgroundImage = "url('images/cloudy-sky.jpg')";
      break;
    case 'rain':
      body.style.backgroundImage = "url('images/rainy-sky.jpg')";
      break;
    case 'snow':
      body.style.backgroundImage = "url('images/snowy-sky.jpg')";
      break;
    case 'thunderstorm':
      body.style.backgroundImage = "url('images/thunderstorm.jpg')";
      break;
    case 'fog':
        body.style.backgroundImage = "url('images/fog-sky.jpg')";
        break;
    default:
      body.style.backgroundImage = "url('images/default-sky.jpg')"; // Default image
      break;
  }

  // Optional: Add some styling for a smooth transition
  body.style.transition = "background-image 0.5s ease-in-out";
}
