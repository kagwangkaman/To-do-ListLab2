import { useState } from "react";

const MAX_LENGTH = 120;

export default function TodoItem({ task, onToggle, onDelete, onEdit }) {
  const [isEditing, setIsEditing] = useState(false);
  const [draft, setDraft] = useState(task.text);

  function startEditing() {
    setDraft(task.text);
    setIsEditing(true);
  }

  function saveEdit(event) {
    event.preventDefault();
    const trimmed = draft.trim();
    if (trimmed) onEdit(task.id, trimmed);
    setIsEditing(false);
  }

  function cancelEdit() {
    setDraft(task.text);
    setIsEditing(false);
  }

  return (
    <li
      className={`status-edge break-anywhere flex items-center gap-3 rounded-xl bg-slate-800/70
        px-4 py-3 transition ${
          task.done ? "border-emerald-500/60" : "border-slate-600/60"
        }`}
    >
      <input
        id={`task-${task.id}`}
        type="checkbox"
        checked={task.done}
        onChange={() => onToggle(task.id)}
        className="h-5 w-5 shrink-0 cursor-pointer accent-emerald-500
          focus:outline-none focus-visible:ring-2 focus-visible:ring-white rounded"
      />

      {isEditing ? (
        <form onSubmit={saveEdit} className="flex-1 flex gap-2">
          <label htmlFor={`edit-${task.id}`} className="sr-only">
            Edit task
          </label>
          <input
            id={`edit-${task.id}`}
            type="text"
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            maxLength={MAX_LENGTH}
            autoFocus
            onKeyDown={(e) => {
              if (e.key === "Escape") cancelEdit();
            }}
            className="flex-1 rounded-lg bg-slate-900 border border-indigo-400 px-3 py-1.5
              text-slate-100 outline-none focus:ring-2 focus:ring-indigo-400/40"
          />
          <button
            type="submit"
            className="rounded-lg bg-indigo-500 hover:bg-indigo-400 px-3 py-1.5
              text-sm font-medium text-white transition"
          >
            Save
          </button>
          <button
            type="button"
            onClick={cancelEdit}
            className="rounded-lg bg-slate-700 hover:bg-slate-600 px-3 py-1.5
              text-sm font-medium text-slate-200 transition"
          >
            Cancel
          </button>
        </form>
      ) : (
        <>
          <label
            htmlFor={`task-${task.id}`}
            className={`flex-1 cursor-pointer select-none ${
              task.done ? "line-through text-slate-500" : "text-slate-100"
            }`}
          >
            {task.text}
          </label>

          <span
            className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-semibold ${
              task.done
                ? "bg-emerald-500/15 text-emerald-300"
                : "bg-amber-500/15 text-amber-300"
            }`}
          >
            {task.done ? "Done" : "Not Done"}
          </span>

          <button
            type="button"
            onClick={startEditing}
            aria-label={`Edit task: ${task.text}`}
            className="shrink-0 rounded-lg p-2 text-slate-400 hover:bg-slate-700
              hover:text-slate-100 transition focus:outline-none
              focus-visible:ring-2 focus-visible:ring-white"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-4 w-4"
              aria-hidden="true"
            >
              <path d="M12 20h9" />
              <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z" />
            </svg>
          </button>

          <button
            type="button"
            onClick={() => onDelete(task.id)}
            aria-label={`Delete task: ${task.text}`}
            className="shrink-0 rounded-lg p-2 text-slate-400 hover:bg-rose-500/20
              hover:text-rose-300 transition focus:outline-none
              focus-visible:ring-2 focus-visible:ring-white"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-4 w-4"
              aria-hidden="true"
            >
              <path d="M3 6h18" />
              <path d="M8 6V4a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v2" />
              <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
              <path d="M10 11v6M14 11v6" />
            </svg>
          </button>
        </>
      )}
    </li>
  );
}
