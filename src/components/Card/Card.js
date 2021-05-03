import React from "react";
import "./card.css";
import Sunny from "../../images/sunny.png";
import Rainy from "../../images/rainy.png";
import Cloudy from "../../images/cloudy.png";
// import Snowy from "../../images/snowy.png";
import { useHistory } from "react-router-dom";

const Card = (props) => {
  const {
    highTemp,
    lowTemp,
    humidity,
    geoCoords,
    sunrise,
    sunset,
    weatherType,
    cityName,
    country,
    date,
  } = props;
  let weatherImage;

  let history = useHistory();

  switch (weatherType) {
    case "Clear":
      weatherImage = Sunny;
      break;

    case "Clouds":
      weatherImage = Cloudy;
      break;

    case "Rain":
      weatherImage = Rainy;
      break;

    default:
      break;
  }

  const onCardClick = (e) => {
    const day = new Date(date).getDay();
    let dayName = "";
    switch (day) {
      case 0:
        dayName = "sunday";
        break;

      case 1:
        dayName = "monday";
        break;

      case 2:
        dayName = "tuesday";
        break;

      case 3:
        dayName = "wednesday";
        break;

      case 4:
        dayName = "thursday";
        break;

      case 5:
        dayName = "friday";
        break;

      case 6:
        dayName = "saturday";
        break;

      default:
        break;
    }
    history.push(`${cityName.toLowerCase()}/${dayName}`);
  };

  return (
    <div className="cardContainer">
      <div className="card" onClick={onCardClick}>
        <h4>
          Condition: {weatherType}
        </h4>
        <p>
          Humidity: {humidity}
        </p>
        <div className="cardTop">
          <div className="topLeft">
            <h5>
            Max: {parseFloat(highTemp - 275.13).toFixed(2)}&#x2103;
            </h5>
          </div>
          <div className="topRight">
            <h5>
            Min: {parseFloat(lowTemp - 275.13).toFixed(2)}&#x2103;
            </h5>
          </div>
        </div>
        <div className="cardBody">
          <div className="bodyLeft">
            <img src={weatherImage} alt="sunny" />
          </div>
          <div className="bodyRight">
            <div className="sunrise">{`Sunrise: ${sunrise.getHours()}:00`}</div>
            <div className="sunset">{`Sunset: ${sunset.getHours()}:00`}</div>
          </div>
        </div>
        <div className="container">
          <h4>
            <b>
              {cityName}, {country}
            </b>
          </h4>
          <p>
            {geoCoords.lat}, {geoCoords.lon}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Card;
