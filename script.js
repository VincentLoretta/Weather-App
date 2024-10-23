const weatherButton = document.getElementById("getWeather");
const cityInput = document.getElementById("city");

const locationEl = document.getElementById("location");
const temperatureEl = document.getElementById("temperature");
const descriptionEl = document.getElementById("description");
const humidityEl = document.getElementById("humidity");
const weatherResult = document.getElementById("weatherResult");

const apiKey = "20bfbfd009ae71376cd117af77318b02"; // Replace with your OpenWeatherMap API key

weatherButton.addEventListener("click", getWeather);

async function getWeather() {
  const city = cityInput.value;
  if (!city) {
    alert("Please enter a city name");
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

    // Display the results
    locationEl.textContent = `Location: ${location}`;
    temperatureEl.textContent = `Temperature: ${temperature}`;
    descriptionEl.textContent = `Condition: ${description}`;
    humidityEl.textContent = humidity;

    // Show the weather result div
    weatherResult.style.display = "block";
  } catch (error) {
    console.error("Error fetching weather data:", error);
  }
}
