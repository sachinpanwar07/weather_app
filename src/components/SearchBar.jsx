import React, { useState } from "react";
import axios from "axios";
import "../styles/searchBar.css";

import searchicon from '../assets/image/searchicon.png'
function SearchBar({search}) {
  const [city, setCity] = useState("");
  const handelOnClick=()=>{
    search(city)
  }
  return (
    <div className="searchbarContainer">
      <input
        type="text"
        value={city}
        onChange={(text) => setCity(text.target.value)}
        placeholder="Enter Your City Name"
        className="searchInputContainer"
      />
      <button className="searchButton" onClick={handelOnClick}>
        <img src={searchicon} className="searchIcon" alt="Search Icon" />
      </button>
    </div>
  );
}

export default SearchBar;
