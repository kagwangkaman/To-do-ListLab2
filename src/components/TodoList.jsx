import TodoItem from "./TodoItem.jsx";

const EMPTY_MESSAGES = {
  all: "No tasks yet. Add your first one above.",
  active: "Nothing left to do. Every task is complete.",
  completed: "No completed tasks yet.",
};

export default function TodoList({ tasks, filter, onToggle, onDelete, onEdit }) {
  if (tasks.length === 0) {
    return (
      <p className="rounded-xl border border-dashed border-slate-700 px-4 py-10 text-center text-slate-500">
        {EMPTY_MESSAGES[filter]}
      </p>
    );
  }

  return (
    <ul className="flex flex-col gap-2">
      {tasks.map((task) => (
        <TodoItem
          key={task.id}
          task={task}
          onToggle={onToggle}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </ul>
  );
}
