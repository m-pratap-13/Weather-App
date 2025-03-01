import { useEffect, useState } from "react";

const WeatherApp = () => {
  const [inputData, setInputData] = useState("");
  const [location, setLocation] = useState(false);
  const [temperature, setTemperature] = useState(null);
  const [weather, setWeather] = useState(null);
  const [feelLike, setFeelLike] = useState(null);
  const [windSpeed, setWindSpeed] = useState(null);
  const [humidity, setHumidity] = useState(null);
  const [visibility, setVisibility] = useState(null);
  const [pressure, setPressure] = useState(null);
  const [minTemperature, setMinTemperature] = useState(null);
  const [maxTemperature, setMaxTemperature] = useState(null);
  const [icon, setIcon] = useState(null);

  const handleInput = (e) => {
    setInputData(e.target.value);
  };

  

  async function handleSearch() {

    setLocation(true);
    const url = `https://weather-api138.p.rapidapi.com/weather?city_name=${inputData}`;
    const options = {
      method: "GET",
      headers: {
        "x-rapidapi-key": "6074dd7c9dmshbda825162e88086p1d01ffjsna3f5306ae056",
        "x-rapidapi-host": "weather-api138.p.rapidapi.com",
      },
    };
    try {
      const response = await fetch(url, options);
      const result = await response.json();

      setTemperature(Math.round(result.main.temp - 273.15));
      setFeelLike(Math.round(result.main.feels_like - 273.15));
      setWindSpeed(Math.round((result.wind.speed * 3600) / 1000));
      setMaxTemperature(Math.round(result.main.temp_max - 273.15));
      setMinTemperature(Math.round(result.main.temp_min - 273.15));
      setWeather(result.weather[0].main);
      setHumidity(result.main.humidity);
      setVisibility(result.visibility / 1000);
      setPressure(result.main.pressure);
      setIcon(`http://openweathermap.org/img/wn/${result.weather[0].icon}@2x.png`)
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="weather-app">
      <header className="weather-header">
        <input
          onChange={handleInput}
          type="text"
          placeholder="Search for location"
          className="search-bar"
        />
        <button className="search" onClick={handleSearch}>
          Search
        </button>
      </header>
      <main className="weather-main">
        {location ? <h2>{inputData}</h2> : <h2>Inter your city...</h2>}
        <div className="current-weather">
          <div className="weather-icon">
            <span role="img" aria-label="clear">
              <img src={icon} alt="" />
            </span>
          </div>
          <div className="weather-details">
            <h2>{temperature}°C</h2>
            <p>{weather}</p>
            <p>Feels like : {feelLike}°C</p>
          </div>
        </div>
        <div className="weather-stats">
          <div className="stat">
            <span>Wind Speed : </span>
            <span>{windSpeed}km/hr</span>
          </div>
          <div className="stat">
            <span>Pressure : </span>
            <span>{pressure} hPa</span>
          </div>
          <div className="stat">
            <span>Humidity : </span>
            <span>{humidity}%</span>
          </div>
          <div className="stat">
            <span>Visibility : </span>
            <span>{visibility} km</span>
          </div>
          <div className="stat">
            <span>Min Temperature : </span>
            <span>{minTemperature}°C</span>
          </div>
          <div className="stat">
            <span>Max Temperature : </span>
            <span>{maxTemperature}°C</span>
          </div>
        </div>
      </main>
    </div>
  );
};

export default WeatherApp;
