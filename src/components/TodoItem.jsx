export function TodoItem({ todo, toggleTodo }) {
  const { id, title, completed } = todo;
  const handleTodoClick = () => {
    toggleTodo(id);
  };
  return (
    <li className="create-card flex">
      <input type="checkbox" checked={completed} onChange={handleTodoClick} />
      {title}
    </li>
  );
}
