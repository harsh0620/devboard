import React from "react";
import Wrapper from "../assets/wrappers/BookMark";
import { Link } from "react-router-dom";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { useAppContext } from "../context/appContext";
const BookMarks = ({ _id, contentBookMark, bookMarkLink }) => {
  const { setEditBookMark, deleteBookMark } = useAppContext();
  return (
    <Wrapper>
      <a className="info" href={bookMarkLink} target="_blank" rel="noreferrer">
        <Popup
          trigger={
            <div className="verticals">
              <HiOutlineDotsVertical />
            </div>
          }
          position="left center"
        >
          <div style={{ display: "flex", flexDirection: "column" }}>
            <Link
              to="/add-bookmark"
              onClick={() => setEditBookMark(_id)}
              className="btn"
              style={{ marginBottom: "5px", textAlign: "center" }}
            >
              edit
            </Link>
            <button onClick={() => deleteBookMark(_id)} className="btn">
              delete
            </button>
          </div>
        </Popup>
        <div className="main-icon">{contentBookMark.charAt(0)}</div>
        <div className="h5">{contentBookMark.slice(0, 12)}</div>
      </a>
    </Wrapper>
  );
};

export default BookMarks;
