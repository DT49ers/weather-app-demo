import React, { useRef, useState } from "react";
import "./App.css";

import axios from "axios";

function App() {
  const [weatherInfo, setWeatherInfo] = useState(null);
  const inputRef = useRef(null);

  const fetchWeatherInfo = (e) => {
    e.preventDefault();

    const options = {
      method: "GET",
      url: "https://api.tomorrow.io/v4/weather/realtime",
      params: {
        location: inputRef.current.value, // Replace with your zipcode or city name
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
    </div>
  );
}

export default App;
