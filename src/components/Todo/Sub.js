import React from "react";
import "./Todo.css";
import Forms from "./Forms";
import TodoList from "./TodoList";
import Title from "./Title";

function Sub() {
  return (
    <div className="container">
      <div className="app-wrapper">
        <div>
          <Title />
        </div>
        <div>
          <Forms />
        </div>
        <div>
          <TodoList />
        </div>
      </div>
    </div>
  );
}

export default Sub;