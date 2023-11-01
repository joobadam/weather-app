import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { format } from "date-fns";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faReply } from "@fortawesome/free-solid-svg-icons";
import { motion as m } from "framer-motion";

const Page3 = () => {
  const [info, setInfo] = useState();
  const [error, setError] = useState(null);

  const { city } = useParams();

  const apiKey = process.env.REACT_APP_WEATHER_API_KEY;

  useEffect(() => {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            "A network error occurred, or the API response was not appropriate."
          );
        }
        return response.json();
      })
      .then((data) => {
        if (data.cod === "404") {
          throw new Error(data.message);
        }
        setInfo(data);
        console.log(info);
      })
      .catch((err) => {
        setError(err.message);
        console.error("An error occurred during the query.:", err);
      });
  }, [city]);

  const localTime =
    info &&
    format(new Date((info.dt + (info.timezone - 3600)) * 1000), "HH:mm");

  const sunrise = info && format(new Date(info.sys.sunrise * 1000), "HH:mm");

  const sunset = info && format(new Date(info.sys.sunset * 1000), "HH:mm");

  return (
    <>
      <m.div
        initial={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        whileInView={{ opacity: 1 }}
        className="small-container"
      >
        {error && <p className="text-white">{error}</p>}
        <m.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="flex justify-center items-center flex-col"
        >
          <h2 className="text-3xl font-bold">{info?.name}</h2>
          <h3 className="text-xl">{localTime}</h3>
          <h3 className="text-xl">{info?.main.temp} °c</h3>
          <img
            src={`http://openweathermap.org/img/wn/${info?.weather[0].icon}@2x.png`}
            alt="weather icon"
          ></img>
          <h3 className="">{info?.weather[0].description}</h3>
          <h4 className="text-sm">sunrise: {sunrise}</h4>
          <h4 className="text-sm">sunset: {sunset}</h4>
        </m.div>
        <button className="back-btn">
          <Link to="/">
            <FontAwesomeIcon icon={faReply} color="white" />
          </Link>
        </button>
      </m.div>
    </>
  );
};

export default Page3;
