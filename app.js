const cityInput = document.querySelector("#search"),
  weatherDisplay = document.querySelector(".weather_display_section"),
  DisplayCity = document.querySelector(".cityName"),
  DisplayTemp = document.querySelector(".temp"),
  DisplayTempShortDesc = document.querySelector(".temp_short_desc"),
  DisplayHumidity = document.querySelector(".humidity"),
  DisplayWindSpeed = document.querySelector(".wind_speed");

const button = document.querySelector(".submit");

button.addEventListener("click", function (e) {
  getWeather(cityInput.value);
  cityInput.value = "";
  e.preventDefault();
});

function getWeather(city) {
  const latLonUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&appid={process.env.APP_ID}`;
  DisplayCity.textContent = city;

  fetch(latLonUrl).then((response) => {
    response.json().then((data) => {
      const weatherURL = `https://api.openweathermap.org/data/2.5/weather?lat=${data[0].lat}&lon=${data[0].lon}&appid={process.env.APP_ID}`;
      fetch(weatherURL).then((response) => {
        response.json().then((data) => {
          displayWeather(data);
          console.log(data);
        });
      });
    });
  });
}

function displayWeather(data) {
  weatherDisplay.classList.add("active");
  DisplayTemp.innerHTML =
    `<img id="wicon" src="http://openweathermap.org/img/w/${data.weather[0].icon}.png" alt="Weather icon">` +
    Math.round(data.main.temp - 273.15) +
    "°C";
  DisplayTempShortDesc.textContent =
    data.weather[0].description[0].toUpperCase() +
    data.weather[0].description.slice(1);

  DisplayHumidity.textContent = "Humidity: " + data.main.humidity + "%";
  DisplayWindSpeed.textContent = "Wind Speed: " + data.wind.speed + "km/h";
}
