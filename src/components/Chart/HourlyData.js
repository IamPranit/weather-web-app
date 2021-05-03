import React, { useEffect, useState } from "react";
import axios from "axios";
import { WEATHER_HOURLY_URL, APP_ID } from "../../config";
import { Line } from "react-chartjs-2";
import "./hourlyData.css";

const HourlyData = (props) => {
  const [hourlyData, setHourlyData] = useState([]);
  useEffect(() => {
    const geoCoords =
      props.weatherForecast &&
      props.weatherForecast.city &&
      props.weatherForecast.city.coord;
    const getHourlyData = async () => {
      try {
        let weather;
        if (geoCoords && props.weatherForecast.city) {
          weather = await axios.get(
            `${WEATHER_HOURLY_URL}?lat=${geoCoords.lat}&lon=${geoCoords.lon}&appid=${APP_ID}`
          );
        }

        setHourlyData(weather.data.hourly);
        console.log(hourlyData);
      } catch (err) {
        console.log(err);
      }
    };
    getHourlyData();
    console.log(hourlyData);
  }, [props.weatherForecast]);

  const timeArr =
    hourlyData &&
    hourlyData.map((elem) => {
      const date = new Date(elem.dt * 1000);
      return `${date.getHours()}:00`;
    });
  const temperatureArr =
    hourlyData &&
    hourlyData.map((elem) => {
      const temp = parseFloat(elem.temp - 273.15).toFixed(2);
      return temp;
    });
  temperatureArr.splice(10);
  timeArr.splice(10);
  console.log(temperatureArr);
  const lineChart = {
    labels: timeArr,
    datasets: [
      {
        label: "Weather",
        fill: false,
        lineTension: 0.5,
        backgroundColor: "rgba(75,192,192,1)",
        borderColor: "rgba(0,0,0,1)",
        borderWidth: 2,
        data: temperatureArr,
      },
    ],
  };

  return (
    <div className="chartContainer">
      <div className="lineChart">
        <Line
          data={lineChart}
          options={{
            title: {
              display: true,
              text: "Temperature graph for next 10 hours",
              fontSize: 20,
            },
            legend: {
              display: true,
              position: "right",
            },
          }}
        />
      </div>
    </div>
  );
};

export default HourlyData;
