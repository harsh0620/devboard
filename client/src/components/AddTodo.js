import React from "react";
import { FormRow, Alert } from ".";
import { useAppContext } from "../context/appContext";
import Wrapper from "../assets/wrappers/DashboardFormPage";
const AddTodo = () => {
  const {
    isLoading,
    isEditing,
    showAlert,
    displayAlert,
    createTodo,
    contentTodo,
    handleChange,
    // editJob,
  } = useAppContext();
  const handleSubmit = (e) => {
    e.preventDefault();
    // while testing
    if (!contentTodo) {
      displayAlert();
      return;
    }
    // if (isEditing) {
    //   editJob();
    //   return;
    // }
    createTodo();
  };
  const handleTodoInput = (e) => {
    handleChange({ name: e.target.name, value: e.target.value });
  };
  return (
    <Wrapper>
      <form className="form">
        <h3>{isEditing ? "edit Todo" : "add Todo"} </h3>
        {showAlert && <Alert />}

        {/* content */}
        <div className="form-center">
          <FormRow
            type="text"
            labelText="Content"
            name="contentTodo"
            value={contentTodo}
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

export default AddTodo;
