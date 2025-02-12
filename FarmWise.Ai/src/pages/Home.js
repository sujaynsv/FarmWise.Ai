import React from "react";

import Body from "../components/body/body";
import NewsFeed from "./NewsFeed"
import WeatherForecast from "./Weather";
const Home = () => {
  return (
    <>
      <Body />
      <NewsFeed/>
      <WeatherForecast/>
    </>
  );
};

export default Home;
