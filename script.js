const container = document.querySelector(".container");
const error404 = document.querySelector(".error404");
const weatherBox = document.querySelector(".weather-box");
const weatherDetails = document.querySelector(".weather-details");
const searchButton = document.querySelector(".search-button");
const inputForm = document.querySelector(".input-location");

inputForm.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    buttonClick();
  }
});

async function buttonClick() {
  const keyword = inputForm.value;
  try {
    const data = await getWeatherData(keyword);
    const dataWeather = data.weather[0];
    const dataMain = data.main;
    const dataWind = data.wind;

    container.style.height = "575px";

    addFadeIn();

    error404.classList.add("d-none");
    weatherBox.classList.remove("d-none");
    weatherDetails.classList.remove("d-none");

    showWeatherBox(dataWeather, dataMain);
    showWeatherDetails(dataMain, dataWind);
  } catch (error) {
    show404();
  }
}

function getWeatherData(keyword) {
  return fetch(`http://api.openweathermap.org/data/2.5/weather?q=${keyword}&APPID=3ef6fee37b1cba51bd5760119eab4cef`)
    .then((response) => response.json())
    .then((response) => response);
}

function showWeatherBox(data, dataSec) {
  const image = document.querySelector(".weather-box img");
  const temp = document.querySelector(".weather-box .temperature");
  const desc = document.querySelector(".weather-box .description");
  switch (data.main) {
    case "Clear":
      image.src = "img/clear.png";
      break;

    case "Rain":
      image.src = "img/rain.png";
      break;

    case "Snow":
      image.src = "img/snow.png";
      break;

    case "Clouds":
      image.src = "img/cloud.png";
      break;

    case "Haze":
      image.src = "img/mist.png";
      break;

    default:
      image.src = "";
  }
  desc.innerHTML = data.description;
  temp.innerHTML = `${convertCelcius(dataSec)}<span>&#176;C</span>`;
}

function showWeatherDetails(data, dataSec) {
  const spanHumidity = document.querySelector(".humidity span");
  const spanWind = document.querySelector(".wind span");

  spanHumidity.innerHTML = `${data.humidity}%`;
  spanWind.innerHTML = `${dataSec.speed}Km/H`;
}

function show404() {
  error404.classList.remove("d-none");
  error404.classList.remove("fadeIn");
  setTimeout(() => {
    error404.classList.add("fadeIn");
  }, 100);
  weatherBox.classList.add("d-none");
  weatherDetails.classList.add("d-none");
  container.style.height = "500px";
}

function convertCelcius(dataSec) {
  const kelvin = parseInt(dataSec.temp);
  const celcius = Math.round(kelvin - 273.15);
  return celcius;
}

function addFadeIn() {
  weatherBox.classList.remove("fadeIn");
  weatherDetails.classList.remove("fadeIn");
  setTimeout(() => {
    weatherBox.classList.add("fadeIn");
    weatherDetails.classList.add("fadeIn");
  }, 100);
}
