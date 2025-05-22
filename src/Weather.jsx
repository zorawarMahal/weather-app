import React, { useState } from "react";
import "./Weather.css";

const api = {
  key: "eeeac7a706e8941b148adbe2035f3df3",
  base: "https://api.openweathermap.org/data/2.5/",
};

const Weather = () => {
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState({});

  const handleSearch = () => {
    fetch(`${api.base}weather?q=${query}&units=metric&appid=${api.key}`)
      .then((res) => res.json())
      .then((result) => {
        setWeather(result);
        setQuery("");
        console.log(result);
      })
      .catch((err) => err.message);
  };

  const search = (evt) => {
    if (evt.key === "Enter") {
      handleSearch();
    }
  };

  const dateBuilder = (d) => {
    let months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day}, ${date} ${month} ${year}`;
  };

  return (
    <div>
      <main>
        <div className="search-box">
          <input
            type="text"
            className="search-bar"
            placeholder="Search..."
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={search}
            value={query}
          />
          <button className="search-button" onClick={handleSearch}>
            Search
          </button>
        </div>
        {(typeof weather.main != 'undefined') ? 
        (
            <div>
          <div className="location-box">
            <div className="location">
              {weather.name}, {weather.sys && weather.sys.country}
              <div className="date">{dateBuilder(new Date())}</div>
            </div>
          </div>
          <div className="weather-box">
            {Math.round(weather.main && weather.main.temp)}°C
          </div>
        </div>
        ) :
        ('')}
      </main>
    </div>
  );
};

export default Weather;
