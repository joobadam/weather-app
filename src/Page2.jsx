import React from "react";
import { Link } from "react-router-dom";
import Search from "./components/Search";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faReply } from "@fortawesome/free-solid-svg-icons";
import { motion as m } from "framer-motion";

const Page2 = () => {
  return (
    <>
      <m.div
        initial={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        whileInView={{ opacity: 1 }}
        className="small-container"
      >
        <div>
          <h2 className="font-bold text-lg -translate-y-20">Select A City</h2>
        </div>
        <Search />
        <button className="back-btn">
          <Link to="/">
            <FontAwesomeIcon icon={faReply} color="white" />
          </Link>
        </button>
      </m.div>
    </>
  );
};

export default Page2;
