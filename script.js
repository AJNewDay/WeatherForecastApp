var apiKey = "de4a23ba34d70e491d72d09ec39f7beb";
var lat;
var lon;
var city;

let input = document.getElementById("query");
let search = document.getElementById("search");
let query = document.getElementById("query");
let forecastContainer = document.getElementById("forecast-container");

if (localStorage.getItem("saveCity") === null) {
  localStorage.setItem("saveCity", JSON.stringify([0], [1], [2], [3], [4]));
}
// consider click event
async function getCoordinates(event) {
  event.preventDefault();
  let city = input.value;
  console.log(city);
  var api_url =
    "http://api.openweathermap.org/geo/1.0/direct?q=" +
    city +
    "&appid=" +
    apiKey;
  const response = await fetch(api_url);
  let data = await response.json();
  console.log("DATA", data);
  lat = data[0].lat;
  lon = data[0].lon;
  getWeather();
}

async function getWeather() {
  const api_url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}`;

  const response = await fetch(api_url);
  let data = await response.json();
  console.log(data);

  for (let index = 0; index < data.list.length; index += 8) {
    console.log("date and time", data.list[index].dt_txt);
    // use to render your daily cards here

    const iconImage = document.createElement("img");
    iconImage.src = `https://openweathermap.org/img/wn/${data.list[index].weather[0].icon}@2x.png`;

    forecastContainer.appendChild(iconImage);

    const weatherCond = document.getElementById("day1Temp");
    weatherCond.src = `https://openweathermap.org/img/wn/${data.list[index].weather[0].main.temp}`;
    forecastContainer.appendChild(weatherCond);
  }
}

// document.getElementById('conditions') = `https://openweathermap.org/img/wn/${data.list[index].weather[0].description}@2x.png`;
// // conditions.src = `https://openweathermap.org/img/wn/${data.list[index].weather[0].main}@2x.png`;

// forecastContainer.appendChild(conditions);

// localStorage.setItem("saveWeather", JSON.stringify(data));
saveInput();
query.value = "";
// storageOutput()

function saveInput() {
  city = document.getElementById("query").value;
  var outData = JSON.parse(localStorage.getItem("saveCity"));
  outData.push(city);
  localStorage.setItem("saveCity", JSON.stringify(outData));
}

function storageOutput() {
  city = localStorage.getItem("saveCity");
  console.log(city);
  document.getElementById("log").innerHTML = city;
}

storageOutput();

search.addEventListener("click", getCoordinates);
