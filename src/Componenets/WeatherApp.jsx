import React, { useEffect } from "react";
import axios from "axios";
import {
  WiThermometer,
  WiStrongWind,
  WiRaindrop,
  WiDaySunny,
} from "react-icons/wi";
import { FaSearch, FaSun, FaCloud, FaCloudRain, FaBolt } from "react-icons/fa";

const WeatherApp = () => {
  const API_KEY = "58e77ac43c817a48edaa726c2bfba3e8";
  const city = "Kolkata"; // Change this to your city

  const LAT = "22.5726"; // Latitude for Kolkata
  const LON = "88.3639"; // Longitude for Kolkata
  const URL = `https://api.openweathermap.org/data/2.5/forecast?lat=${LAT}&lon=${LON}&appid=${API_KEY}&units=metric`;

  useEffect(() => {
    async function getWeatherForecast() {
      try {
        const response = await axios.get(URL);
        const forecastData = response.data.list;

        console.log("3-Hourly Weather Forecast for Kolkata:");
        forecastData.slice(0, 8).forEach((item) => {
          // Get next 24 hours (8 intervals)
          console.log(
            `${item.dt_txt}: ${item.main.temp}°C, ${item.weather[0].description}`
          );
        });
      } catch (error) {
        console.error("Error fetching weather data:", error.message);
      }
    }

    getWeatherForecast();
  }, []);
  const weatherData = [
    {
      day: "Today",
      icon: <FaSun className="text-yellow-500" />,
      status: "Sunny",
      temp: "36/22",
    },
    {
      day: "Tue",
      icon: <FaSun className="text-yellow-500" />,
      status: "Sunny",
      temp: "37/21",
    },
    {
      day: "Wed",
      icon: <FaSun className="text-yellow-500" />,
      status: "Sunny",
      temp: "37/21",
    },
    {
      day: "Thu",
      icon: <FaCloud className="text-gray-400" />,
      status: "Cloudy",
      temp: "37/21",
    },
    {
      day: "Fri",
      icon: <FaCloud className="text-gray-400" />,
      status: "Cloudy",
      temp: "37/21",
    },
    {
      day: "Sat",
      icon: <FaCloudRain className="text-blue-400" />,
      status: "Rainy",
      temp: "37/21",
    },
    {
      day: "Sun",
      icon: <FaBolt className="text-yellow-300" />,
      status: "Storm",
      temp: "37/21",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center p-4">
      <div className="w-full max-w-md md:max-w-2xl lg:max-w-4xl bg-gray-800 p-6 rounded-2xl shadow-lg">
        <div className="relative mb-6">
          <input
            type="text"
            placeholder="Search for cities"
            className="w-full p-4 rounded-lg bg-gray-700 text-white outline-none shadow-md"
          />
          <FaSearch className="absolute right-4 top-5 text-gray-400" />
        </div>
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Madrid</h1>
            <p className="text-gray-400">Chance of rain: 0%</p>
            <h2 className="text-6xl font-bold mt-2">31&deg;</h2>
          </div>
          <div>
            <span className="text-6xl">☀️</span>
          </div>
        </div>

        <div className="mt-6 bg-gray-700 p-4 rounded-xl">
          <h3 className="text-lg font-semibold">Today's Forecast</h3>
          <div className="grid grid-cols-6 gap-2 mt-3 text-center">
            {[
              { time: "6:00 AM", temp: "25°", icon: "🌥" },
              { time: "9:00 AM", temp: "28°", icon: "🌤" },
              { time: "12:00 PM", temp: "33°", icon: "☀️" },
              { time: "3:00 PM", temp: "34°", icon: "☀️" },
              { time: "6:00 PM", temp: "32°", icon: "☀️" },
              { time: "9:00 PM", temp: "30°", icon: "🌤" },
            ].map((item, index) => (
              <div key={index} className="flex flex-col items-center">
                <span className="text-sm text-gray-300">{item.time}</span>
                <span className="text-2xl">{item.icon}</span>
                <span className="text-lg font-semibold">{item.temp}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6 bg-gray-700 p-4 rounded-xl">
          <h3 className="text-lg font-semibold">Air Conditions</h3>
          <div className="grid grid-cols-2 gap-4 text-lg">
            <div className="flex items-center space-x-2">
              <WiThermometer className="text-3xl" />
              <div>
                <p className="text-gray-400 text-sm">Real Feel</p>
                <p className="text-2xl font-semibold">30&deg;</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <WiStrongWind className="text-3xl" />
              <div>
                <p className="text-gray-400 text-sm">Wind</p>
                <p className="text-2xl font-semibold">0.2 km/h</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <WiRaindrop className="text-3xl" />
              <div>
                <p className="text-gray-400 text-sm">Chance of Rain</p>
                <p className="text-2xl font-semibold">0%</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <WiDaySunny className="text-3xl" />
              <div>
                <p className="text-gray-400 text-sm">UV Index</p>
                <p className="text-2xl font-semibold">3</p>
              </div>
            </div>
          </div>
          {/* <button className="mt-6 w-full bg-blue-600 text-white py-2 rounded-lg text-sm font-semibold hover:bg-blue-500">
          See More
        </button> */}
        </div>
        <div className="mt-6 bg-gray-700 p-4 rounded-xl">
          <h2 className="text-lg font-semibold text-gray-300 mb-3">
            7-DAY FORECAST
          </h2>
          <div className="divide-y divide-gray-700">
            {weatherData.map((day, index) => (
              <div
                key={index}
                className="flex justify-between items-center py-3 text-sm md:text-base"
              >
                <span className="w-16 font-medium">{day.day}</span>
                <span className="text-xl">{day.icon}</span>
                <span className="flex-1 text-center font-medium">
                  {day.status}
                </span>
                <span className="font-semibold">{day.temp}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherApp;
