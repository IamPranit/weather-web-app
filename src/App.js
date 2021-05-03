import { useState, useEffect } from "react";
import axios from "axios";
import CardList from "./containers/card-list/CardList";
import "./App.css";
import HourlyData from "./components/Chart/HourlyData";
import { useHistory, Route, Switch } from "react-router-dom";
import Home from './containers/Home/Home'

function App() {
  const [weatherForecast, setWeatherForecast] = useState({});
  const [cityName, setCityName] = useState("mumbai");
  let history = useHistory();

  useEffect(() => {
    const weatherReport = async () => {
      try {
        const weather = await axios.get(
          `${process.env.REACT_APP_WEATHER_URL}?q=${cityName}&appid=${process.env.REACT_APP_APP_ID}`
        );
        setWeatherForecast(weather.data);
      } catch (err) {
        console.log(err);
      }
    };
    weatherReport();
  }, []);

  const setSearch = (e) => {
    setCityName(e.target.value.toLowerCase());
  };

  const onSearch = async () => {
    const weather = await axios.get(
      `${process.env.REACT_APP_WEATHER_URL}?q=${cityName}&appid=${process.env.REACT_APP_APP_ID}`
    );
    const { data } = weather;
    setWeatherForecast(data);
    history.push(`/${cityName}`);
  };

  return (
    <div className="App">
      <header className="App-header App-logo">Weather Info</header>
      <Switch>
        <Route exact path="/">
          {weatherForecast.list && (
            <Home setSearch={setSearch} onSearch={onSearch} weatherForecast={weatherForecast && weatherForecast} />
          )}
        </Route>
        <Route exact path="/:cityName">
          {weatherForecast.list && (
            <CardList weatherForecast={weatherForecast && weatherForecast} />
          )}
        </Route>
        <Route exact path="/:cityName/:day">
          <HourlyData weatherForecast={weatherForecast && weatherForecast} />
        </Route>
      </Switch>
    </div>
  );
}

export default App;