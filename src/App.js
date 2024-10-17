import React, { useEffect, useRef, useState } from "react";
import "./App.css";

import axios from "axios";
import moment from "moment/moment";

function App() {
  const [weatherInfo, setWeatherInfo] = useState(null);
  const inputRef = useRef(null);
  const [magicNumbers] = useState([12, 24, 36, 48, 60, 100]);
  const [totalOfMagicNumbers, setTotalOfMagicNumbers] = useState(0);

  useEffect(() => {
    fetchWeatherInfo();
  }, []); // Focus on input when component mounts

  useEffect(() => {
    const total = magicNumbers.reduce(
      (acc, magicNumber) => acc + magicNumber,
      0
    );
    setTotalOfMagicNumbers(total);
  }, [magicNumbers]); // Focus on magicNumbers when component updates

  const fetchWeatherInfo = (e) => {
    e?.preventDefault();

    const options = {
      method: "GET",
      url: "https://api.tomorrow.io/v4/weather/history/recent",
      params: {
        location: inputRef.current.value || "23229",
        units: "imperial",
        apikey: "cCntGe8w9ZA76OYa2PpQ9faaqTCLCOms",
      },
      headers: { accept: "application/json" },
    };

    axios
      .request(options)
      .then(function (response) {
        setWeatherInfo(response.data);
        console.log(response.data);
      })
      .catch(function (error) {
        alert(error.message);
      });
  };

  return (
    <div className="app">
      <div className="app__container">
        <h1>My weather app</h1>
        <form>
          <input
            ref={inputRef}
            type="text"
            placeholder="Zipcode...[23229 US]"
          />
          <button onClick={fetchWeatherInfo} type="submit">
            Show me the weather
          </button>
        </form>
        <h2>{weatherInfo?.location.name}</h2>
        <h2>
          {moment(weatherInfo?.timelines?.daily[1].time).format("LL")} Maximum
          Temp: {weatherInfo?.timelines?.daily[1].values?.temperatureMax} ºF
        </h2>
        <h3>
          {weatherInfo &&
            `Sunrise: ${moment(
              weatherInfo?.timelines?.daily[2].values?.sunriseTime
            ).format("LLL")}`}
        </h3>

        <h2>My magic numbers: {magicNumbers.join(", ")}</h2>
        <h3>Total of magic numbers: {totalOfMagicNumbers}</h3>
      </div>
    </div>
  );
}

export default App;
