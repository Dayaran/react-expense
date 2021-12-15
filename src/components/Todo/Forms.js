import React, { useState } from "react";
import fire from '../../config/Fire';

export default function Forms() {
  const [title, setTitle] = useState("");

  const handleChange = (e) => {
    setTitle(e.target.value);
  };
  const createTodo = (event) => {
    event.preventDefault();
    const todoRef = fire.database().ref("Todo");
    // const otherRef = firebase.database().ref("other");
    // const other = {
    //   title,
    // };
    const todo = {
      title,
      complete: false,
    };
    todoRef.push(todo);
    // otherRef.push(other);
    setTitle("");
  };

    return(
        <form onSubmit={createTodo}>
            <input
            type="text"
            placeholder="Enter your Todo.."
            className="task-input"
            value={title}
            required onChange={handleChange}
            />
            <button className="button-add" type="submit">
                Add-Task
            </button>
        </form>
    );
}