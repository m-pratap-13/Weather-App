import React, { useEffect, useState } from "react";
import axios from "axios";
import { WiThermometer, WiStrongWind, WiHumidity } from "react-icons/wi";
import { FaSearch } from "react-icons/fa";
import { TbMathMaxMin } from "react-icons/tb";
import { TiWeatherWindy } from "react-icons/ti";
import { MdOutlineVisibility } from "react-icons/md";
import { FaSun } from "react-icons/fa";
import { GiSunset } from "react-icons/gi";

const WeatherApp = () => {
  const [data, setData] = useState({});
  const [forecastToday, setForecastToday] = useState([]);
  const [userInput, setUserInput] = useState("Kolkata");
  const [latitude, setLatitude] = useState(22.5697);
  const [longitude, setLongitude] = useState(88.3697);
  const [dailyForecast, setDailyForecast] = useState([]);
  const [inputVal, setInputVal] = useState("");

  function formatTimestamp(timestamp) {
    const date = new Date(timestamp * 1000);
    return date.toLocaleDateString("en-GB", {
      weekday: "long",
      day: "2-digit",
      month: "long",
    });
  }

  function formatDay(timestamp) {
    const date = new Date(timestamp * 1000);
    return date.toLocaleDateString("en-GB", {
      weekday: "long",
    });
  }

  const formatTime = (timestamp) => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  function handleSearch() {
    setUserInput(inputVal);
  }
  useEffect(() => {
    async function weatherData() {
      try {
        const res = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=${userInput}&appid=58e77ac43c817a48edaa726c2bfba3e8`
        );
        const data = res.data;
        setData(data);
        setLatitude(data.coord.lat);
        setLongitude(data.coord.lon);
      } catch (error) {
        console.error("Error fetching weather data:", error.message);
      }
    }
    weatherData();
  }, [userInput, latitude, longitude]);

  useEffect(() => {
    async function getWeatherForecast() {
      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=58e77ac43c817a48edaa726c2bfba3e8&units=metric`
        );
        const forecastData = response.data.list;
        setForecastToday(forecastData);
        setDailyForecast(
          forecastData.filter((reading) => reading.dt_txt.includes("12:00:00"))
        );
      } catch (error) {
        console.error("Error fetching weather data:", error.message);
      }
    }
    getWeatherForecast();
  }, [userInput, latitude, longitude]);

  return (
    <div className="min-h-screen pt-20 bg-gray-900 text-white flex items-center justify-center p-4">
      <div className="w-full max-w-md md:max-w-2xl lg:max-w-4xl bg-gray-800 p-6 rounded-2xl shadow-lg">
        <div className="relative mb-6">
          <input
            type="text"
            onChange={(e) => setInputVal(e.target.value)}
            placeholder="Search for cities"
            className="w-full p-4 rounded-lg bg-gray-700 text-white outline-none shadow-md"
          />
          <FaSearch
            className="absolute right-4 top-5 text-gray-400 hover:cursor-pointer"
            onClick={handleSearch}
          />
        </div>
        <div className="flex justify-between items-center">
          <div className="text-center">
            <h2 className="text-2xl font-semibold">
              {data.name}, {data.sys?.country}
            </h2>
            <p className="text-gray-400 text-sm">{formatTimestamp(data.dt)}</p>
            <div className="flex items-center justify-center mt-4 space-x-4">
              <span className="text-5xl font-bold">
                {Math.round(data.main?.feels_like - 273.15)}&deg;
              </span>
            </div>
            <p className="text-center text-lg mt-2">
              {data.weather?.[0].description}
            </p>
          </div>

          <div className="text-center">
            <div className="flex items-center gap-2">
              <FaSun className="text-yellow-400" />
              <p>Sunrise: {formatTime(data.sys?.sunrise)}</p>
            </div>
            <div className="flex items-center gap-2">
              <GiSunset className="" />
              <p>Sunset: {formatTime(data.sys?.sunset)}</p>
            </div>
          </div>

          <div>
            <span className="text-6xl">
              <img
                src={`http://openweathermap.org/img/wn/${data.weather?.[0].icon}@2x.png`}
                alt="Weather Icon"
              />
            </span>
          </div>
        </div>

        <div className="mt-6 bg-gray-700 p-4 rounded-xl">
          <h3 className="text-lg font-semibold">Today's Forecast</h3>
          <div className="grid grid-cols-6 gap-2 mt-3 text-center">
            {forecastToday.slice(0, 6).map((list) => {
              return (
                <div key={list.dt} className="flex flex-col items-center">
                  <span className="text-sm text-gray-300">
                    {list.dt_txt.split(" ")[1].slice(0, 5)}
                  </span>
                  <span className="text-2xl">
                    <img
                      src={`http://openweathermap.org/img/wn/${list.weather?.[0].icon}@2x.png`}
                      alt=""
                    />
                  </span>
                  <span className="text-lg font-semibold">
                    {Math.round(list.main?.temp)}&deg;
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        <div className="mt-6 bg-gray-700 p-4 rounded-xl">
          <h3 className="text-lg font-semibold">Air Conditions</h3>
          <div className="grid grid-cols-2 gap-4 text-lg">
            <div className="flex items-center space-x-2">
              <WiThermometer className="text-3xl" />
              <div>
                <p className="text-gray-400 text-sm">Real Feel</p>
                <p className="text-2xl font-semibold">
                  {Math.round(data.main?.feels_like - 273.15)}&deg;
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <WiStrongWind className="text-3xl" />
              <div>
                <p className="text-gray-400 text-sm">Wind</p>
                <p className="text-2xl font-semibold">
                  {data.wind?.speed} km/h
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <TbMathMaxMin className="text-3xl" />
              <div>
                <p className="text-gray-400 text-sm">Min/Max</p>
                <p className="text-2xl font-semibold">
                  {Math.round(data.main?.temp_min - 273.15)}&deg;/
                  {Math.round(data.main?.temp_max - 273.15)}&deg;
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <TiWeatherWindy className="text-3xl" />
              <div>
                <p className="text-gray-400 text-sm">Pressure</p>
                <p className="text-2xl font-semibold">
                  {data.main?.pressure} hPa
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <WiHumidity className="text-3xl" />
              <div>
                <p className="text-gray-400 text-sm">Humidity</p>
                <p className="text-2xl font-semibold">{data.main?.humidity}%</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <MdOutlineVisibility className="text-3xl" />
              <div>
                <p className="text-gray-400 text-sm">Visibility</p>
                <p className="text-2xl font-semibold">
                  {data.visibility / 1000} km
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-6 bg-gray-700 p-4 rounded-xl">
          <h2 className="text-lg font-semibold text-gray-300 mb-3">
            7-DAY FORECAST
          </h2>
          <div className=" divide-gray-700">
            {dailyForecast.map((dayReport) => {
              return (
                <div
                  key={formatDay(dayReport.dt)}
                  className="flex justify-between items-center text-sm md:text-base"
                >
                  <span className="w-16 flex font-medium">
                    {formatDay(dayReport.dt)}
                  </span>
                  <span className="text-xl">
                    <img
                      src={`http://openweathermap.org/img/wn/${dayReport.weather?.[0].icon}@2x.png`}
                      alt=""
                      className="w-20 h-20 md:w-25 md:h-25 scale-75"
                    />
                  </span>
                  <span className="flex-1 text-center font-medium">
                    {dayReport.weather?.[0].main}
                  </span>
                  <span className="font-semibold">
                    {Math.round(dayReport.main?.temp_min)}&deg;/
                    {Math.round(dayReport.main?.temp_max)}&deg;
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherApp;
