import React from "react";
import { Link } from "react-router";

const Home = () => {
  return (
    <div className=" class text-xl font-bold bg-black text-white h-screen flex justify-center items-center flex-col">
      <Link to="/suneditor">Sun Editor</Link>
      <Link to={"/lake"}>Lake</Link>
    </div>
  );
};

export default Home;
