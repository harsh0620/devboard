import moment from "moment";
import React from "react";
import Calendar from "react-github-contribution-calendar";
import { useAppContext } from "../context/appContext";

const ContributionGraph = () => {
  const { contributions } = useAppContext();
  let panelColors = ["#bcccdc", "#0e4429", "#006d32", "#26a641", "#39d353"];
  let d = new Date();
  d.setDate(d.getDate() - 365);
  return (
    <div
      style={{
        border: "1px solid black",
        margin: "1rem auto 1rem auto",
        padding: "2rem",
        width: "90%",
        textAlign: "center",
      }}
    >
      <p>
        {moment(d).format("DD-MM-YYYY")} To&nbsp;
        {moment(Date.now()).format("DD-MM-YYYY")}
      </p>
      <Calendar
        values={contributions}
        panelColors={panelColors}
        until={Date.now()}
      />
    </div>
  );
};

export default ContributionGraph;
