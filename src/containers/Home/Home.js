import React from "react";
import Search from "../../components/Search/Search";
import CardList from "../card-list/CardList";

const Home = (props) => {
  const { setSearch, onSearch, weatherForecast } = props;
  return (
    <div>
      <Search setSearch={setSearch} onSearch={onSearch} />
      <CardList weatherForecast={weatherForecast} />
    </div>
  );
};

export default Home;
