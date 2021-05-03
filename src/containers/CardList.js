import React from "react";
import Card from "../components/Card/Card";
import "./cardList.css";

const CardList = (props) => {
  const fiveDayForecast = [];
  for (let i = 0; i < props.weatherForecast.list.length; i++) {
    if (i % 8 === 0) {
      fiveDayForecast.push(props.weatherForecast.list[i]);
    }
  }
  const { coord, sunrise, sunset, country, name } = props.weatherForecast.city;
  return (
    <div className="cardList">
      {fiveDayForecast &&
        fiveDayForecast.map((forecast, i) => (
          <Card
            highTemp={forecast.main.temp_max}
            lowTemp={forecast.main.temp_min}
            humidity={forecast.main.humidity}
            geoCoords={coord}
            sunrise={new Date(sunrise * 1000)}
            sunset={new Date(sunset * 1000)}
            weatherType={forecast.weather[0].main}
            cityName={name}
            country={country}
            date={forecast.dt_txt}
            key={i}
          />
        ))}
    </div>
  );
};

export default CardList;
