import React from "react";
import { useAppContext } from "../context/appContext";
import Wrapper from "../assets/wrappers/BookMarksContainer";
import BookMarks from "./BookMarks";

const BookMarksContainer = () => {
  const { bookmarks } = useAppContext();
  if (bookmarks?.length === 0) {
    return (
      <Wrapper>
        <h2>No bookmarks to display...</h2>
      </Wrapper>
    );
  }
  return (
    <Wrapper>
      {bookmarks?.map((bookmark) => {
        return <BookMarks key={bookmark?._id} {...bookmark} />;
      })}
    </Wrapper>
  );
};

export default BookMarksContainer;
