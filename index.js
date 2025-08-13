function displayTemperature(response) {
  let temperatureElement = document.querySelector("#current-temperature");
  let temperature = Math.round(response.data.temperature.current);
  let cityElement = document.querySelector("#current-city");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#Humidity-value");
  let windElement = document.querySelector("#Wind");
  let timeElement = document.querySelector("#current-date");
  let date = new Date(response.data.time * 1000);
  let iconElement = document.querySelector("#icon");

   cityElement.innerHTML = response.data.city;
   timeElement.innerHTML = formatDate(date);
   descriptionElement.innerHTML = response.data.condition.description;
   humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
   windElement.innerHTML = `${response.data.wind.speed}km/h`;
  temperatureElement.innerHTML = temperature;
  iconElement.innerHTML = `<img src="${response.data.condition.icon_url}" class="current-temperature-icon"/>`;
}

function searchCity(city) {
  let apiKey = "a6469t9f026f33001d9f3f695ocb3042";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTemperature);
}

function handleSearchSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-input");

  searchCity(searchInput.value);
}

function formatDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
  let day = date.getDay();

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  if (hours < 10) {
    hours = `0${hours}`;
  }

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];

  let formattedDay = days[day];
  return `${formattedDay} ${hours}:${minutes}`;
}

let currentDateELement = document.querySelector("#current-date");
let currentDate = new Date();

currentDateELement.innerHTML = formatDate(currentDate);


function displayForecast() {
  let days = ["Wed", "Thu", "Fri", "Sat", "Sun"];
  let forecastHtml = "";

  days.forEach(function (day) {
  forecastHtml = forecastHtml +
  `
       <div class="weather-forecast-day">
          <div class="weather-forecast-date">${day}</div>
          <div class="weather-forecast-icon">⛅</div>
          <div class="weather-forecast-temperatures">
            <div class="weather-forecast-temperature">
              <strong>15°</strong>
            </div>
            <div class="weather-forecast-temperature"> 9°</div>
          </div>
        </div>
    `;
  });

  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = forecastHtml;
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSearchSubmit);

searchCity("Paris");
displayForecast();

