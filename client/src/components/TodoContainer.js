import React from "react";
import { useAppContext } from "../context/appContext";
import { useEffect } from "react";
import Loading from "./Loading";
import WrapperCompletedTodo from "../assets/wrappers/CompletedTodo";
import WrapperToCompletedTodo from "../assets/wrappers/ToCompleteTodo";
import { FaTrash, FaCheckCircle } from "react-icons/fa";

const TodoContainer = () => {
  let { todos, isLoading, getAllTodos, editTodo, deleteTodo } = useAppContext();
  useEffect(() => {
    getAllTodos();
    // eslint-disable-next-line
  }, []);
  if (isLoading) {
    return <Loading center />;
  }
  const handleEdit = (id) => {
    editTodo(id);
  };
  return (
    <>
      <WrapperToCompletedTodo>
        <header>
          <h3>To be Completed</h3>
        </header>

        {todos?.map((todo, index) => {
          return todo.checked === false ? (
            <div key={index} className="box">
              <div className="first">
                <FaCheckCircle
                  onClick={() => handleEdit(todo._id)}
                  style={{ marginLeft: "5px", cursor: "pointer" }}
                />
                <FaTrash
                  onClick={() => deleteTodo(todo._id)}
                  style={{ marginLeft: "15px", cursor: "pointer" }}
                />
              </div>
              <div style={{ marginLeft: "15px" }}>{todo.contentTodo}</div>
            </div>
          ) : (
            <div key={index}></div>
          );
        })}
      </WrapperToCompletedTodo>
      <WrapperCompletedTodo>
        <header>
          <h3>Completed</h3>
        </header>
        {todos?.map((todo, index) => {
          return todo.checked === true ? (
            <div key={index} className="box">
              <div className="first">
                <FaTrash
                  onClick={() => deleteTodo(todo._id)}
                  style={{ marginLeft: "5px", cursor: "pointer" }}
                />
              </div>
              <div style={{ marginLeft: "15px", cursor: "pointer" }}>
                {todo.contentTodo}
              </div>
            </div>
          ) : (
            <div key={index}></div>
          );
        })}
      </WrapperCompletedTodo>
    </>
  );
};

export default TodoContainer;
