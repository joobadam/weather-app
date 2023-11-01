import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { motion as m } from "framer-motion";

const Page1 = () => {
  const cities = useSelector((state) => state.cities);

  const sortedCities = [...cities].sort((a, b) => a.localeCompare(b));

  return (
    <>
      <m.div
        initial={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        whileInView={{ opacity: 1 }}
        className="small-container"
      >
        <ul>
          {sortedCities.map((city, index) => (
            <m.li
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              key={index}
            >
              <Link to={`/city/${city}`}>
                <h3 className="hover:scale-110 hover:text-black duration-150">
                  {city}
                </h3>
              </Link>
            </m.li>
          ))}
        </ul>
        <h1 className="mt-10 font-bold text-lg">Add New City</h1>
        <button className="city-btn">
          <Link to="/add">+</Link>
        </button>
      </m.div>
    </>
  );
};

export default Page1;
