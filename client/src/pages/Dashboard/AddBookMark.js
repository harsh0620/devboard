import React from "react";
import { FormRow, Alert } from "../../components";
import { useAppContext } from "../../context/appContext";
import Wrapper from "../../assets/wrappers/DashboardFormPage";
const AddBookMark = () => {
  const {
    isLoading,
    isBookMarkEditing,
    showAlert,
    displayAlert,
    createBookMark,
    handleChange,
    editBookMark,
    contentBookMark,
    bookMarkLink,
  } = useAppContext();

  const handleSubmit = (e) => {
    e.preventDefault();
    // while testing

    if (!contentBookMark || !bookMarkLink) {
      displayAlert();
      return;
    }
    if (isBookMarkEditing) {
      editBookMark();
      return;
    }
    createBookMark();
  };
  const handleBookMarkInput = (e) => {
    handleChange({ name: e.target.name, value: e.target.value });
  };

  return (
    <Wrapper>
      <form className="form">
        <h3>{isBookMarkEditing ? "edit bookmark" : "add bookmark"} </h3>
        {showAlert && <Alert />}

        {/* position */}
        <div className="form-center">
          <FormRow
            type="text"
            name="contentBookMark"
            value={contentBookMark}
            handleChange={handleBookMarkInput}
          />
          {/* company */}
          <FormRow
            type="text"
            name="bookMarkLink"
            value={bookMarkLink}
            handleChange={handleBookMarkInput}
          />

          <div className="btn-container">
            <button
              className="btn btn-block submit-btn"
              type="submit"
              onClick={handleSubmit}
              disabled={isLoading}
            >
              submit
            </button>
          </div>
        </div>
      </form>
    </Wrapper>
  );
};

export default AddBookMark;
