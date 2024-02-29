///****** Weather

var CURRENT_LOCATION = document.getElementsByClassName("weather-content__overview")[0];
var CURRENT_TEMP = document.getElementsByClassName("weather-content__temp")[0];

const appid = "11d1085c73ce9d0473b03d3f50d555a5";

const renderWeatherData = function (forecast) {
  // render city, current weather description and temp
  var currentWeather = forecast.weather[0];
  var widgetHeader = `<h4>${currentWeather.description}</h4>`;
  CURRENT_TEMP.innerHTML = `<i class="wi ${applyIcon(currentWeather.icon)}"></i> ${Math.round(
    forecast.temp
  )} <i class="wi wi-degrees"></i>`;
  CURRENT_LOCATION.innerHTML = widgetHeader;

  var date = new Date(forecast.dt * 1000);
  var days = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];
  var name = days[date.getDay()];
  var dayBlock = document.createElement("div");
  dayBlock.className = "forecast__item";
  dayBlock.innerHTML = `<div class="forecast-item__heading">${name}</div>
      <div class="forecast-item__info"><i class="wi ${applyIcon(
        currentWeather.icon
      )}"></i> <span class="degrees">${Math.round(forecast.temp)}<i class="wi wi-degrees"></i></span></div>`;
};

// Use Fetch API to GET data from OpenWeather API
// return json
if ("geolocation" in navigator) {
  if (globalVariables.isLiveServer) {
    navigator.geolocation.getCurrentPosition((position) => {
      const coordinates = `lat=${position.coords.latitude}&lon=${position.coords.longitude}`;
      // run/render the widget data
      getWeatherData(coordinates).then((weatherData) => {
        let dailyForecast = weatherData.current;

        renderWeatherData(dailyForecast);

        $("#temperature").val(dailyForecast.temp);
        $("#pressure").val(dailyForecast.pressure);
        $("#humidity").val(dailyForecast.humidity);
        $("#main").val(dailyForecast.weather[0].main);
        $("#description").val(dailyForecast.weather[0].description);
        $("#speed").val(dailyForecast.wind_speed);
        $("#cloud").val(dailyForecast.clouds);
        if (dailyForecast.rain) {
          $("#rain").val(+dailyForecast.rain || +dailyForecast.rain["1h"] || 0);
        } else {
          $("#rain").val(0);
        }
      });
    });
  }
} else {
  alert("Your computer is unable to access location information.");
}

function getWeatherData(position) {
  var headers = new Headers();
  const URL = `https://api.openweathermap.org/data/3.0/onecall?${position}&cnt=7&units=imperial&exclude=minutely,hourly,daily,alerts&appid=${appid}`;
  return (
    fetch(URL, {
      method: "GET",
      headers: headers,

      success: function () {},
    })
      //.then(data => data.json());

      .then(function (data) {
        return data.json();
      })
  );
  //
}

// TUTORIAL READERS:
// yeah, using an external resource for the icons and applying them here using a switch block
function applyIcon(icon) {
  var selectedIcon;
  switch (icon) {
    case "01d":
      selectedIcon = "wi-day-sunny";
      break;
    case "01n":
      selectedIcon = "wi-night-clear";
      break;
    case "02d":
    case "02n":
      selectedIcon = "wi-cloudy";
      break;
    case "03d":
    case "03n":
    case "04d":
    case "04n":
      selectedIcon = "wi-night-cloudy";
      break;
    case "09d":
    case "09n":
      selectedIcon = "wi-showers";
      break;
    case "10d":
    case "10n":
      selectedIcon = "wi-rain";
      break;
    case "11d":
    case "11n":
      selectedIcon = "wi-thunderstorm";
      break;
    case "13d":
    case "13n":
      selectedIcon = "wi-snow";
      break;
    case "50d":
    case "50n":
      selectedIcon = "wi-fog";
      break;
    default:
      selectedIcon = "wi-meteor";
  }
  return selectedIcon;
}
