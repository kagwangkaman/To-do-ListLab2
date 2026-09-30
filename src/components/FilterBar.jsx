const FILTERS = [
  { key: "all", label: "All" },
  { key: "active", label: "Not Done" },
  { key: "completed", label: "Done" },
];

export default function FilterBar({ filter, onChange, counts }) {
  return (
    <div
      className="flex flex-wrap gap-2"
      role="group"
      aria-label="Filter tasks by status"
    >
      {FILTERS.map((f) => {
        const isActive = filter === f.key;
        return (
          <button
            key={f.key}
            type="button"
            onClick={() => onChange(f.key)}
            aria-pressed={isActive}
            className={`rounded-lg px-4 py-2 text-sm font-medium transition duration-100
              focus:outline-none focus-visible:ring-2 focus-visible:ring-white
              ${
                isActive
                  ? "bg-indigo-500 text-white"
                  : "bg-slate-800 text-slate-300 hover:bg-slate-700"
              }`}
          >
            {f.label}
            <span className="ml-2 text-xs opacity-70">{counts[f.key]}</span>
          </button>
        );
      })}
    </div>
  );
}
