import React, { useState } from "react";
import { useEffect } from "react";
import { useAppContext } from "../../context/appContext";
import {
  StatsContainer,
  Loading,
  ChartsContainer,
  ContributionGraph,
  TodoStatsContainer,
  BookMarksContainer,
} from "../../components";

const Stats = () => {
  const { showStats, isLoading, monthlyApplications } = useAppContext();
  const [quote, setQuote] = useState({
    content: "Arise, Awake and Stop Not Until the Goal is Achieved",

    author: "Swami Vivekanand",
  });
  const getQuotes = () => {
    const api = "https://api.quotable.io/random";

    fetch(api)
      .then((res) => res.json())
      .then((data) => {
        setQuote(data);
      });
  };
  useEffect(() => {
    showStats();
    getQuotes();
    // eslint-disable-next-line
  }, []);

  if (isLoading) {
    return <Loading center />;
  }

  return (
    <>
      <div style={{ textAlign: "center", marginTop: "2rem" }}>
        <h3>Motivational Quote</h3>
      </div>
      <div style={{ textAlign: "center", marginTop: "2rem" }}>
        <h4 style={{ color: "#1976d2" }}>
          {quote.content ||
            "Arise, Awake and Stop Not Until the Goal is Achieved"}
        </h4>
        <h4>{quote.author}</h4>
      </div>
      <div style={{ textAlign: "center", marginTop: "2rem" }}>
        <h3>BookMarks</h3>
      </div>
      <BookMarksContainer />
      <div style={{ textAlign: "center", marginTop: "2rem" }}>
        <h3>Todo Stats</h3>
      </div>
      <TodoStatsContainer />
      <div style={{ textAlign: "center", marginTop: "2rem" }}>
        <h3>Jobs Stats</h3>
      </div>
      <StatsContainer />
      <div style={{ textAlign: "center", marginTop: "2rem" }}>
        <h3>Activity Graph</h3>
      </div>
      <ContributionGraph />
      <div
        style={{
          margin: "1rem auto 1rem auto",
          width: "100%",
        }}
      >
        {monthlyApplications.length > 0 && <ChartsContainer />}
      </div>
    </>
  );
};

export default Stats;
