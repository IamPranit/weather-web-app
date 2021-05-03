import React from "react";
import './search.css';

const Seacrh = (props) => {
  return (
    <div className="searchBox">
      <input className="textBox" type="text" id="cityName" name="cityName" onChange={props.setSearch} placeholder="Enter your city" />
      <button className="btn" onClick={props.onSearch}>Search</button>
    </div>
  );
};

export default Seacrh;
