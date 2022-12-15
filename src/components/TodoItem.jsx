export function TodoItem({ todo, toggleTodo, onDelete }) { // Pass by props onDelete to TodoList
  const { id, title, completed } = todo;
  const handleTodoClick = () => {
    toggleTodo(id);
  };
  return (
    <li className="create-card flex">
      <div className="flex">
        <input type="checkbox" checked={completed} onChange={handleTodoClick} />
        {title}
      </div>
      <button className="buttonDelete" onClick={() => onDelete(id)}>
        Delete
      </button>
    </li>
  );
}