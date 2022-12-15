import { useState, useRef, useEffect } from "react";
import { TodoList } from "./components/TodoList";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import "./App.css";

export const App = () => {
  const [todos, setTodos] = useState([]);
  const todoTaskRef = useRef();

  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/todos")
      .then((res) => {
        //console.log(res.data);
        setTodos(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const toggleTodo = (id) => {
    const newTodos = [...todos];
    let todo = newTodos.find((todo) => todo.id == id);
    axios
      .put(`https://jsonplaceholder.typicode.com/todos/${id}`, {
        completed: !todo.completed,
        title: todo.title,
      })
      .then((res) => {
        todo.completed = res.data.completed;
        setTodos(newTodos);
        alert("Status updated");
      })
      .catch((err) => alert(err.message));
  };

  const handleTodoAdd = () => {
    const title = todoTaskRef.current.value;
    if (title == "") return;

    axios
      .post("https://jsonplaceholder.typicode.com/todos", {
        title: title,
        completed: false,
      })
      .then((res) => {
        setTodos(
          [...todos, res.data] // adding new todo at the end of the list
        );
      })
      .catch((err) => alert(err.message))
      .finally(() => (todoTaskRef.current.value = null));
  };
  const handleDelete = (id) => {
    // We need to pass the id of the item we want to delete
    axios
      .delete(`https://jsonplaceholder.typicode.com/todos/${id}`)
      .then(() => {
        const newTodos = todos.filter((todo) => todo.id !== id);
        setTodos(newTodos);
        alert("Todo successfully deleted");
      })
      .catch((err) => alert(err.message));
  };
  const completed = todos.filter((todo) => !todo.completed).length;

  return (
    <div className="container">
      <div className="create-card">
        <input
          className="input"
          ref={todoTaskRef}
          type="text"
          placeholder="New title"
        />
        <button className="button" onClick={handleTodoAdd}>
          ➕
        </button>
      </div>
      <div className="create-card full">
        <div className="text">
          {completed == 1 ? `${completed} title` : `${completed} titles`} left.
        </div>
        <TodoList
          todos={todos}
          toggleTodo={toggleTodo}
          onDelete={handleDelete}
        />
      </div>
    </div>
  );
};
