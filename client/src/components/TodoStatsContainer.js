import React from "react";
import { useAppContext } from "../context/appContext";
import StatItem from "./StatItem";
import { FaEdit, FaCheckCircle } from "react-icons/fa";
import Wrapper from "../assets/wrappers/StatsContainer";

const TodoStatsContainer = () => {
  const { todoLength, todoCompletedLength } = useAppContext();
  const defaultStats = [
    {
      title: "Tasks Completed",
      count: todoCompletedLength || 0,
      icon: <FaCheckCircle />,
      color: "#006d32",
      bcg: "#d1e7dd",
    },
    {
      title: "Tasks To Do",
      count: todoLength || 0,
      icon: <FaEdit />,
      color: "#d66a6a",
      bcg: "#ffeeee",
    },
  ];
  return (
    <Wrapper>
      {defaultStats.map((item, index) => {
        return <StatItem key={index} {...item} />;
      })}
    </Wrapper>
  );
};

export default TodoStatsContainer;
