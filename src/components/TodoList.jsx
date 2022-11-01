import { TodoItem } from "./TodoItem";

export function TodoList({todos, toggleTodo }) {
  return (
    <ul className="list">
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} toggleTodo={toggleTodo}/>
      ))}
    </ul>
  );
}
