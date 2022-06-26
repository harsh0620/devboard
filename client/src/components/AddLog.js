import React from "react";
import { FormRow, Alert } from ".";
import { useAppContext } from "../context/appContext";
import Wrapper from "../assets/wrappers/DashboardFormPage";

const AddLog = () => {
  const {
    isLoading,
    isLogEditing,
    showAlert,
    displayAlert,
    createLog,
    contentLog,
    handleChange,
    editLog,
  } = useAppContext();
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!contentLog) {
      displayAlert();
      return;
    }
    if (isLogEditing) {
      editLog();
      return;
    }
    createLog();
  };
  const handleTodoInput = (e) => {
    handleChange({ name: e.target.name, value: e.target.value });
  };
  return (
    <Wrapper>
      <form className="form">
        <h3>{isLogEditing ? "edit Log" : "add Log"} </h3>
        {showAlert && <Alert />}

        {/* content */}
        <div className="form-center">
          <FormRow
            type="text"
            labelText="Content"
            name="contentLog"
            value={contentLog}
            handleChange={handleTodoInput}
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

export default AddLog;
