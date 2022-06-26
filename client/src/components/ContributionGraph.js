import React from "react";
import Calendar from "react-github-contribution-calendar";
import { useAppContext } from "../context/appContext";

const ContributionGraph = () => {
  const { contributions } = useAppContext();
  var values = {};
  const map = new Map(Object.entries(values));
  contributions.map((data) => {
    let month = data._id.month;
    if (data._id.month < 10) {
      month = `0${data._id.month}`;
    }
    map.set(`${data._id.year}-${month}-${data._id.date}`, data.count);
    return 0;
  });
  values = Object.fromEntries(map);
  var panelColors = ["#bcccdc", "#0e4429", "#006d32", "#26a641", "#39d353"];
  return (
    <div
      style={{
        border: "1px solid black",
        margin: "1rem auto 1rem auto",
        padding: "2rem",
        width: "90%",
      }}
    >
      <Calendar values={values} panelColors={panelColors} />
    </div>
  );
};

export default ContributionGraph;
