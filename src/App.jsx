import { useState, useRef, useEffect } from "react";
import { TodoList } from "./components/TodoList";
import { v4 as uuidv4 } from "uuid";
import "./App.css";

const KEY = "todoApp.todos";
const storedTodos = JSON.parse(localStorage.getItem(KEY));
export const App = () => {
  const [todos, setTodos] = useState(storedTodos);
  const todoTaskRef = useRef();

  useEffect(() => {
    console.log(todos);
    localStorage.setItem(KEY, JSON.stringify(todos));
  }, [todos]);

  const toggleTodo = (id) => {
    const newTodos = [...todos];
    const todo = newTodos.find((todo) => todo.id == id);
    todo.completed = !todo.completed;
    setTodos(newTodos);
  };

  const handleTodoAdd = () => {
    const task = todoTaskRef.current.value;
    if (task == "") return;

    setTodos((prevTodos, index) => {
      return [...prevTodos, { id: uuidv4(), task, completed: false }];
    });
    todoTaskRef.current.value = null;
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
          placeholder="New task"
        />
        <button className="button" onClick={handleTodoAdd}>
          ➕
        </button>
      </div>
      <div className="create-card full">
        <button className="button" onClick={handleClearAll}>
          Delete completed tasks
        </button>
        <div className="text">
          {completed == 1 ? `${completed} task` : `${completed} tasks`} left.
        </div>
        <TodoList todos={todos} toggleTodo={toggleTodo} />
      </div>
    </div>
  );
};
