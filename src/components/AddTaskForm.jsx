import { useState } from "react";

const MAX_LENGTH = 120;

export default function AddTaskForm({ onAdd }) {
  const [text, setText] = useState("");

  const trimmed = text.trim();
  const canSubmit = trimmed.length > 0;

  function handleSubmit(event) {
    // Stop the form from reloading the page on submit.
    event.preventDefault();
    if (!canSubmit) return;

    onAdd(trimmed);
    setText("");
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
      <div className="flex-1">
        <label htmlFor="new-task" className="sr-only">
          Task description
        </label>
        <input
          id="new-task"
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="What needs to be done?"
          maxLength={MAX_LENGTH}
          autoComplete="off"
          className="w-full rounded-xl bg-slate-800 border border-slate-700 px-4 py-3
            text-slate-100 placeholder-slate-500 outline-none
            focus:border-indigo-400 focus:ring-2 focus:ring-indigo-400/40"
        />
      </div>

      <button
        type="submit"
        disabled={!canSubmit}
        className="rounded-xl bg-indigo-500 hover:bg-indigo-400 disabled:opacity-40
          disabled:cursor-not-allowed disabled:hover:bg-indigo-500 px-6 py-3
          font-semibold text-white transition duration-100 active:scale-95
          focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
      >
        Add Task
      </button>
    </form>
  );
}
