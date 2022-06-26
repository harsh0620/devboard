import React from "react";
import moment from "moment";
import Wrapper from "../assets/wrappers/Log";
import { FaCalendarAlt } from "react-icons/fa";
import { HiOutlineDotsVertical } from "react-icons/hi";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import JobInfo from "./JobInfo";
import { useAppContext } from "../context/appContext";
const Log = ({ _id, contentLog, createdAt }) => {
  let date = moment(createdAt);
  date = date.format("MMM Do, YYYY");
  const { setEditLog, deleteLog } = useAppContext();
  return (
    <Wrapper>
      <div className="log">
        <JobInfo icon={<FaCalendarAlt />} text={date} />
        <Popup
          trigger={
            <div>
              <HiOutlineDotsVertical />
            </div>
          }
          position="left center"
        >
          <div style={{ display: "flex", flexDirection: "column" }}>
            <button
              onClick={() => setEditLog(_id)}
              className="btn"
              style={{ marginBottom: "5px" }}
            >
              edit
            </button>
            <button onClick={() => deleteLog(_id)} className="btn">
              delete
            </button>
          </div>
        </Popup>
      </div>

      <h5> {contentLog}</h5>
    </Wrapper>
  );
};

export default Log;
