import { useState } from "react";
import Search from "./components/search/search";
import CurrentWeather from "./components/current-weather/current-weather";
import Forecast from "./components/forecast/forecast";
import { WEATHER_API_URL, WEATHER_API_KEY } from "./api";
import "./App.css";
import setBodyColor from './setBodyColor'
import Particle from "./components/Particle";
//import sunrise from "./sunrise.jpg";

function App() {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState(null);

  var currentTime = new Date().getHours();
  
  if (8 <= currentTime&&currentTime < 12) {
   setBodyColor("#FF2CAA 0%", "#ffff01 100%")
  }
  else if (12 <= currentTime&&currentTime < 5) {
   setBodyColor("#89CFF0 0%", "#4169e1 100%")
  }
  else if (5 <= currentTime&&currentTime < 19) {
   setBodyColor("hsla(211, 96%, 62%, 1) 0%", "hsla(295, 94%, 76%, 1) 100%")
  }
  else {
   setBodyColor("#000000 0%", "royalblue 100%")
  }

  const handleOnSearchChange = (searchData) => {
    const [lat, lon] = searchData.value.split(" ");

    const currentWeatherFetch = fetch(
      `${WEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
    );
    const forecastFetch = fetch(
      `${WEATHER_API_URL}/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
    );

    Promise.all([currentWeatherFetch, forecastFetch])
      .then(async (response) => {
        const weatherResponse = await response[0].json();
        const forcastResponse = await response[1].json();

        setCurrentWeather({ city: searchData.label, ...weatherResponse });
        setForecast({ city: searchData.label, ...forcastResponse });
      })
      .catch(console.log);
  };

  return (
    <>
      <Particle/>
      <div className="container">
      
        <Search onSearchChange={handleOnSearchChange} />
        {currentWeather && <CurrentWeather data={currentWeather} />}
        {forecast && <Forecast data={forecast} />}
      </div>
    </>
  );
}

export default App;
