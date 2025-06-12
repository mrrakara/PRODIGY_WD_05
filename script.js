// ID Imports
const temp = document.getElementById("temp");
const weatherIcon = document.getElementById("weather-icon-img");
const weatherType = document.getElementById("weather-type");
const date = document.getElementById("date");
const city = document.getElementById("city");
const country = document.getElementById("country");
const time = document.getElementById("time");
const timeAmpm = document.getElementById("time-ampm");
const lat = document.getElementById("lat");
const lon = document.getElementById("lon");
const windSpeed = document.getElementById("wind-speed");
const avgTemp = document.getElementById("avg-temp");
let weatherContainer = document.getElementById("weather-container");
let inputBox = document.getElementById("search");

// API key
const apiKey = "2d9fca73beb3b98b6d9a8cacdcafd7f4";

// Build API with user location
function buildAPI(location) {
  return `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`;
}

// Update weather data
function updateUI(data) {
  // longitude
  lon.innerHTML = data.coord.lon;

  // latitude
  lat.innerHTML = data.coord.lat;

  // temperature
  temp.innerHTML = `${data.main.temp}°C`;

  // Weather type
  weatherType.innerHTML = data.weather[0].description.toUpperCase();

  // city
  city.innerHTML = `${data.name},`;

  // country
  country.innerHTML = data.sys.country;

  // Wind speed
  windSpeed.innerHTML = `${((data.wind.speed * 60 * 60) / 1000).toFixed(
    2
  )}<br>km/h`;

  // date: converting sec -> millisec
  date.innerHTML = new Date(data.dt * 1000).toDateString();

  // min - max temperature
  avgTemp.innerHTML = `${data.main.temp_min}°C <br>to<br> ${data.main.temp_max}°C`;
}

// Fetch weather data
function fetchWeather(location) {
  const api = buildAPI(location);

  fetch(api)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      let iconId = data.weather[0].id;
      updateUI(data);
      updateIcon(iconId);
    })
    .catch((err) => {
      alert("Error fetching weather data: " + err.message);
    });
}

// change weather icon
function updateIcon(id) {
  // just for clear day and night
  let hh = new Date().getHours();
  if (id >= 200 && id <= 232) {
    weatherIcon.src = "img/thunderstorm.jpeg";
  } else if (id >= 300 && id <= 321) {
    weatherIcon.src = "img/drizzle.jpeg";
  } else if (id >= 500 && id <= 531) {
    weatherIcon.src = "img/rain.jpeg";
  } else if (id >= 600 && id <= 622) {
    weatherIcon.src = "img/snow.jpeg";
  } else if (id >= 701 && id <= 781) {
    weatherIcon.src = "img/atmosphere.jpeg";
  } else if (id >= 800 && id <= 804) {
    if (hh >= 5 && hh <= 19) {
      weatherIcon.src = "img/clear day.jpeg";
    } else {
      weatherIcon.src = "img/clear night.jpeg";
    }
  } else {
    // default icon if id out of range
    weatherIcon.src = "img/atmosphere.jpeg";w
  }
}

// Handle form submission
function userInput(event) {
  event.preventDefault();
  const inputCity = document.getElementById("search").value.trim();
  if (!inputCity) {
    alert("Please enter a city name");
    return;
  }
  fetchWeather(inputCity);
}

// Set default location on page load
window.addEventListener("DOMContentLoaded", () => {
  fetchWeather("Delhi");
});

// Making Clock & Dynamically change background of the body
function clock() {
  let myDate = new Date();
  let h = myDate.getHours();
  let m = myDate.getMinutes();
  let s = myDate.getSeconds();
  let ampm = "AM";

  // set background
  document.body.style.backgroundRepeat = "no-repeat";
  document.body.style.backgroundPosition = "center";
  document.body.style.backgroundSize = "cover";

  if (h >= 5 && h < 8) {
    document.body.style.backgroundImage = "url('img/morning bg.png')";
    weatherContainer.style.backgroundImage = "url('img/morning bg.png')";
  } else if (h >= 8 && h < 17) {
    document.body.style.backgroundImage = "url('img/day bg.webp')";
    weatherContainer.style.backgroundImage = "url('img/day bg.webp')";
  } else if (h >= 17 && h < 20) {
    document.body.style.backgroundImage = "url('img/evening bg.png')";
    weatherContainer.style.backgroundImage = "url('img/evening bg.png')";
  } else {
    document.body.style.backgroundImage = "url('img/night bg.jpeg')";
    weatherContainer.style.backgroundImage = "url('img/night bg.jpeg')";
    temp.style.color = "white";
    temp.style.textShadow = "1px 1px 1px black";
    inputBox.style.color = "white";
  }

  // AM - PM
  ampm = h >= 12 ? "PM" : "AM";
  // 24hr --> 12hr
  h = h > 12 ? h - 12 : h;
  h = h === 0 ? (h = 12) : h;

  // adding 0 before 10
  h = h < 10 ? "0" + h : h;
  m = m < 10 ? "0" + m : m;
  s = s < 10 ? "0" + s : s;

  time.innerHTML = `${h}:${m}:${s}`;
  timeAmpm.innerHTML = ampm;
  setTimeout(() => {
    clock();
  }, 1000);
}

clock();
