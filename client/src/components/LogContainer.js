import React from "react";
import { useAppContext } from "../context/appContext";
import { useEffect } from "react";
import Loading from "./Loading";
import Wrapper from "../assets/wrappers/LogContainer";
import Log from "./Log";
const LogContainer = () => {
  const { getLogs, logs, isLoading } = useAppContext();

  useEffect(() => {
    getLogs();
    // eslint-disable-next-line
  }, []);
  if (isLoading) {
    return <Loading center />;
  }

  if (logs.length === 0) {
    return (
      <Wrapper>
        <h2>No Logs to display...</h2>
      </Wrapper>
    );
  }
  return (
    <Wrapper>
      <div className="logs">
        {logs.map((log) => {
          return <Log key={log._id} {...log} />;
        })}
      </div>
    </Wrapper>
  );
};

export default LogContainer;
