import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import styled from "styled-components";
import TodoItem from "./TodoItem";

function TodoForm() {
  const url = "http://localhost:5000/api/v1/todo";
  const [todos, setTodos] = useState([]);
  const [todoName, setTodoName] = useState("");
  const [todoComment, setTodoComment] = useState("");
  const [editTodoData, setEditTodoData] = useState(null);

  useEffect(() => {
    getTodos();
  }, []);

  useEffect(() => {
    if (editTodoData) {
      setTodoName(editTodoData.name ? editTodoData.name : "");
      setTodoComment(editTodoData.name ? editTodoData.comment : "");
    }
  }, [editTodoData]);

  async function getTodos() {
    const data = await axios.get(url);
    console.log(data);
    setTodos(data.data.todo);
  }

  const editTodos = (todosData) => {
    setEditTodoData(todosData);
  };


  async function addTodos(e) {
    e.preventDefault();

    const todoData = {
      name: todoName ? todoName : undefined,
      comment: todoComment ? todoComment : undefined,
    };

    //Only post if editTodoData is not provided
    if (!editTodoData) {
      await axios.post(url, todoData);
    } else {
      //Update the data if we do have the ediTodoData
      await axios.patch(
        `http://localhost:5000/api/v1/todo/${editTodoData._id}`,
        todoData
      );
    }

    setTodoName("");
    setTodoComment("");

    getTodos();
    setEditTodoData("");
  }

  const renderTodos = () => {
    let sortedTodos = [...todos];

    sortedTodos = sortedTodos.sort((a, b) => {
      return new Date(b.createdAt) - new Date(a.createdAt);
    });

    return sortedTodos.map((todo, i) => {
      return (
        <TodoItem
          key={i}
          todo={todo}
          getTodos={getTodos}
          editTodos={editTodos}
        />
      );
    });
  };

  const insertTodos = () => {
    return (
      <div className="Texteditor">
        <form onSubmit={addTodos}>
          <div className="input-control">
            <input
              type="text"
              id="name"
              placeholder="Enter Task title..."
              value={todoName}
              onChange={(e) => setTodoName(e.target.value)}
              required
            />
          </div>
          <div className="input-control">
            <textarea
              name=""
              id="comment"
              cols="30"
              rows="5"
              placeholder="Task details..."
              value={todoComment}
              onChange={(e) => setTodoComment(e.target.value)}
            ></textarea>
          </div>
          <button className="submit-btn">Add Todo Item</button>
        </form>
      </div>
    );
  };
  return (
    <TodoFormStyled>
      {insertTodos()}
      {renderTodos()}
    </TodoFormStyled>
  );
}

const TodoFormStyled = styled.div`
  width: 90%;
  display: flex;
  align-items: center;
  flex-direction: column;
  .Texteditor {
    width: 60%;
    padding-top: 4rem;
    form {
      padding-bottom: 5rem;
      .submit-btn {
        padding: 0.5rem 1.5rem;
        outline: none;
        cursor: pointer;
        background-color: #6bbe92;
        border: none;
        border-radius: 34px;
        color: white;
        // letter-spacing: 0.01rem;
        filter: drop-shadow(0px 4px 28px rgba(0, 0, 0, 0.25));
      }
      .submit-btn:hover {
        color: #374954;
      }
    }
  }
`;

export default TodoForm;
