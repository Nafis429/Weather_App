let weather = {
    apikey: "779b5eeb058fd86c8eeffad704e5d2b1",
    fetchWeatherByCity: function (city) {
      fetch(
        "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + this.apikey
      )
        .then((response) => response.json())
        .then((data) => this.displayWeather(data));
    },
    fetchWeatherByLocation: function (latitude, longitude) {
      fetch(
        "https://api.openweathermap.org/data/2.5/weather?lat=" + latitude + "&lon=" + longitude + "&appid=" + this.apikey
      )
        .then((response) => response.json())
        .then((data) => this.displayWeather(data));
    },
    displayWeather: function (data) {
      const { name } = data;
      const { icon, description } = data.weather[0];
      const { temp, humidity } = data.main;
      const { speed } = data.wind;
      const tempp = temp - 273.15;
      document.querySelector(".city").innerText = "Weather in " + name;
      document.querySelector(".icon").src = "https://openweathermap.org/img/wn/" + icon + ".png";
      document.querySelector(".description").innerText = description;
      document.querySelector(".temp").innerText = tempp.toFixed(2) + "°C";
      document.querySelector(".humidity").innerText = "Humidity: " + humidity + "%";
      document.querySelector(".wind").innerText = "Wind Speed: " + speed + "km/h";
      document.body.style.backgroundImage = `url('https://source.unsplash.com/random?${name}')`;
      document.querySelector(".weather").classList.remove("loading");
    },
    searchByCity: function () {
      this.fetchWeatherByCity(document.querySelector(".search-bar").value);
    },
    searchByLocation: function () {
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(function (position) {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
          weather.fetchWeatherByLocation(latitude, longitude);
        }, function (error) {
          // Handle errors when the user denies location access or if there is an issue.
          console.error("Error getting location:", error);
        });
      } else {
        // Handle the case where the user's browser doesn't support geolocation.
        console.log("Geolocation is not supported by your browser.");
      }
    }
  };
  
  document.querySelector(".search button").addEventListener("click", function () {
    weather.searchByCity();
  });
  
  document.querySelector(".search-bar").addEventListener("keyup", function (event) {
    if (event.key == "Enter") {
      weather.searchByCity();
    }
  });
  
  document.querySelector(".get-location button").addEventListener("click", function () {
    weather.searchByLocation();
  });
  