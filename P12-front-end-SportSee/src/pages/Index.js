/**
@file This file exports the Index component that renders the main dashboard page.
It fetches data from the API and displays it using various charts and components.
@author [monkeycs60]
@see {@link https://github.com/monkeycs60/P12-front-end-SportSee} for the repository of this project.
*/

import styled from "styled-components";
import IndexGreetings from "../components/IndexGreetings";
import { useState, useEffect } from "react";
import BarChart from "../components/charts/BarChart";
import LineChart from "../components/charts/LineChart";
import RadialChart from "../components/charts/RadialChart";
import RadarChart from "../components/charts/RadarChart";
import Nutriments from "../components/nutriments/Nutriments";
import { fetchAPI, fetchMock } from "../utils/fetchData";

/**
Index component that renders the main dashboard page.
It fetches data from the API and displays it using various charts and components.
@component
*/
const Index = () => {
  // Set to true to use mocked data instead of fetching from the API
  const useMockData = false;

  const [dataUser, setDataUser] = useState(null);
  const [dataUserActivity, setDataUserActivity] = useState(null);
  const [dataUserAverageSession, setDataUserAverageSession] = useState(null);
  const [dataUserPerformance, setDataUserPerformance] = useState(null);
  const [dataUserScore, setDataUserScore] = useState(null);

  /**
A hook that fetches data from the API when the component mounts.
@function
@async
*/
   useEffect(() => {
 async function fetchData() {
  try {
    const {
      dataFromBack,
      dataFromBackScore,
      dataFromBackActivity,
      dataFromBackAverageSession,
      dataFromBackPerformance,
    } = useMockData ? fetchMock() : await fetchAPI();

    // Set data from back
    setDataUser(dataFromBack);
    setDataUserScore(dataFromBackScore);
    setDataUserActivity(dataFromBackActivity);
    setDataUserAverageSession(dataFromBackAverageSession);
    setDataUserPerformance(dataFromBackPerformance);

  } catch (error) {
    alert("Problème lors de la connexion avec la base de données");
  }
}
  fetchData();
}, []);

  return (
    <IndexStyle>
      <IndexGreetings dataUser={dataUser} />
      <div className="all-data-container">
        <div className="chart-container">
        <BarChart className="bar-chart" dataUserActivity={dataUserActivity} />
          <div className="lower-charts">
          <LineChart dataUserAverageSession={dataUserAverageSession} />     
          <RadarChart dataUserPerformance={dataUserPerformance} />
          <RadialChart dataUserScore={dataUserScore} />
          </div>
        </div>
        <Nutriments dataUser={dataUser} />
      </div>
    </IndexStyle>
  );
};

export default Index;

const IndexStyle = styled.div`
  width: calc(100vw - 100px);
  height: calc(100vh - 70px);
  background-color: white;
  padding: 40px 80px;
  .all-data-container {
    display: flex;
    justify-content: space-between;
    background-color: white;
    height: 85%;
    gap: 40px;
  }
  .chart-container {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 20px;
    height: auto;
    width: 80%;
    background: white;
    margin-top: 30px;
  }
  .lower-charts {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 90%;
    height: 50%;
    margin: 16px;
  }
`;
