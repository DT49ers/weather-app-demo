import React, { useEffect, useRef, useState } from "react";
import "./App.css";

import axios from "axios";
import moment from "moment/moment";

function App() {
  const [weatherInfo, setWeatherInfo] = useState(null);
  const inputRef = useRef(null);

  useEffect(() => {
    fetchWeatherInfo();
  }, []); // Focus on input when component mounts

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
        console.error(error);
      });
  };

  return (
    <div className="App">
      <h1>My weather app</h1>
      <form>
        <input ref={inputRef} type="text" placeholder="Zipcode...[23229 US]" />
        <button onClick={fetchWeatherInfo} type="submit">
          Show me the weather
        </button>
      </form>
      <h2>{weatherInfo?.location.name}</h2>
      <h3>
        {moment(weatherInfo?.timelines?.daily[1].values?.sunriseTime).format(
          "LLL"
        )}
        {/* {weatherInfo && weatherInfo?.timelines?.daily[1].values?.sunriseTime} */}
      </h3>
    </div>
  );
}

export default App;
