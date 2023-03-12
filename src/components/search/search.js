import React, { useState, useEffect } from "react";

const Search = ({ onSearchChange }) => {
const [search] = useState(null);
const [userLocation, setUserLocation] = useState(null);

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        setUserLocation({
          value: `${position.coords.latitude} ${position.coords.longitude}`,
          label: "Current Location",
        });
        onSearchChange({
          value: `${position.coords.latitude} ${position.coords.longitude}`,
          label: "Current Location",
        });
      });
    }
  }, [onSearchChange]);


  return (
    <input
      type="text"
      value={search || (userLocation && userLocation.label)}
      readOnly
    />
  );
};

export default Search;
