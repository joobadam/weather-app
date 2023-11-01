import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { geoApiOptions } from "./api";
import { addCity } from "../redux/citiesSlice";
import { Link } from "react-router-dom";
import { Input } from "@material-tailwind/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { motion as m } from "framer-motion";

const Search = () => {
  const [search, setSearch] = useState("");
  const [cityName, setCityName] = useState([]);
  const [selectedCity, setSelectedCity] = useState(null);
  const [highlightedCity, setHighlightedCity] = useState(null);

  const savedCities = useSelector((state) => state.cities);
  const dispatch = useDispatch();

  const highlightSearch = (text) => {
    return text.replace(
      new RegExp(`(${search})`, "ig"),
      (_, match) => `<span class="bg-black text-white">${match}</span>`
    );
  };

  useEffect(() => {
    fetch(
      `https://wft-geo-db.p.rapidapi.com/v1/geo/cities?minPopulation=1000000&namePrefix=${search}&limit=8`,
      geoApiOptions
    )
      .then((response) => response.json())
      .then((data) => {
        if (data && data.data) {
          const filteredCities = data.data.filter(
            (city) => !savedCities.includes(city.city)
          );
          setCityName(filteredCities);
        } else {
          setCityName([]);
        }
      });
  }, [search, savedCities]);

  const handleCityClick = (city) => {
    setSelectedCity(city);
    setHighlightedCity(city);
  };

  const handleSaveCity = () => {
    dispatch(addCity(selectedCity.city));
    setSelectedCity(null);
    setSearch("");
  };

  return (
    <m.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.8 }}
      className="relative"
    >
      <Input
        color="white"
        size="lg"
        label="City name"
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        icon={<FontAwesomeIcon icon={faMagnifyingGlass} beat color="white" />}
        className="w-[300px]"
      />
      <div
        className={`absolute top-full left-0 mt-2 ${
          search.length > 0 ? "bg-black/30" : ""
        }  w-full z-10`}
      >
        {search.length > 0 && cityName.length === 0 && (
          <div className="p-2 text-white">No results</div>
        )}
        {search.length > 0 &&
          cityName.map((city, i) => (
            <div
              key={i}
              onClick={() => handleCityClick(city)}
              className={`p-2 hover:bg-black/50 text-white cursor-pointer duration-150 ${
                highlightedCity && highlightedCity.city === city.city
                  ? "bg-pink-300"
                  : ""
              }`}
              dangerouslySetInnerHTML={{ __html: highlightSearch(city.city) }}
            />
          ))}
      </div>
      {selectedCity && (
        <button onClick={handleSaveCity} className="save-btn">
          <Link to="/">Save</Link>
        </button>
      )}
    </m.div>
  );
};

export default Search;
