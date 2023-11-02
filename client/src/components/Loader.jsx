import React from "react";
import { animation } from "../assets";

const Loader = () => (
  <div role="status" className="bg-white">
    <img className="opacity-10" src={animation} alt="loading..." />
  </div>
);

export default Loader;
