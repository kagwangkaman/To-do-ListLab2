import { useCallback, useMemo, useState } from "react";
import { useLocalStorage } from "./hooks/useLocalStorage.js";
import Header from "./components/Header.jsx";
import AddTaskForm from "./components/AddTaskForm.jsx";
import FilterBar from "./components/FilterBar.jsx";
import TodoList from "./components/TodoList.jsx";
import StatsBar from "./components/StatsBar.jsx";
import UserGuide from "./components/UserGuide.jsx";

const STORAGE_KEY = "parado-todo-tasks";

let nextId = 0;
function createId() {
  nextId += 1;
  return `${Date.now()}-${nextId}`;
}

export default function App() {
  const [tasks, setTasks] = useLocalStorage(STORAGE_KEY, []);
  const [filter, setFilter] = useState("all");

  const addTask = useCallback(
    (text) => {
      setTasks((current) => [...current, { id: createId(), text, done: false }]);
    },
    [setTasks]
  );

  const toggleTask = useCallback(
    (id) => {
      setTasks((current) =>
        current.map((t) => (t.id === id ? { ...t, done: !t.done } : t))
      );
    },
    [setTasks]
  );

  const deleteTask = useCallback(
    (id) => {
      setTasks((current) => current.filter((t) => t.id !== id));
    },
    [setTasks]
  );

  const editTask = useCallback(
    (id, text) => {
      setTasks((current) =>
        current.map((t) => (t.id === id ? { ...t, text } : t))
      );
    },
    [setTasks]
  );

  const clearCompleted = useCallback(() => {
    setTasks((current) => current.filter((t) => !t.done));
  }, [setTasks]);

  const total = tasks.length;
  const done = tasks.filter((t) => t.done).length;
  const active = total - done;

  const visibleTasks = useMemo(() => {
    if (filter === "active") return tasks.filter((t) => !t.done);
    if (filter === "completed") return tasks.filter((t) => t.done);
    return tasks;
  }, [tasks, filter]);

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 px-4 py-8">
      <div className="max-w-5xl mx-auto">
        <Header />

        <div className="grid gap-8 md:grid-cols-2 items-start">
          <div className="flex flex-col gap-4">
            <section
              className="rounded-2xl bg-slate-800 p-4 sm:p-6 shadow-xl"
              aria-label="Task list"
            >
              <AddTaskForm onAdd={addTask} />

              <div className="mt-4">
                <FilterBar
                  filter={filter}
                  onChange={setFilter}
                  counts={{ all: total, active, completed: done }}
                />
              </div>

              <div className="mt-4">
                <TodoList
                  tasks={visibleTasks}
                  filter={filter}
                  onToggle={toggleTask}
                  onDelete={deleteTask}
                  onEdit={editTask}
                />
              </div>
            </section>

            <StatsBar
              total={total}
              done={done}
              active={active}
              onClearCompleted={clearCompleted}
            />
          </div>

          <UserGuide />
        </div>

        <footer className="text-center text-slate-500 text-sm mt-10">
          <p>DCIT 26 &ndash; Laboratory 2</p>
        </footer>
      </div>
    </div>
  );
}
