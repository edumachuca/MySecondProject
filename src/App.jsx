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
    const todo = newTodos.find((todo) => todo.id == id);
    todo.completed = !todo.completed;
    setTodos(newTodos);
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
        alert("create new todo");
      })
      .finally(() => (todoTaskRef.current.value = null));
  };
  const handleClearAll = () => {
    const newTodos = todos.filter((todo) => !todo.completed);
    setTodos(newTodos);
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
        <button className="button" onClick={handleClearAll}>
          Delete completed todos
        </button>
        <div className="text">
          {completed == 1 ? `${completed} title` : `${completed} titles`} left.
        </div>
        <TodoList todos={todos} toggleTodo={toggleTodo} />
      </div>
    </div>
  );
};
