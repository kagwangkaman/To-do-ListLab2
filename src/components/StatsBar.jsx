function Bar({ label, value, className }) {
  return (
    <div className="text-center">
      <div className="text-2xl font-bold tabular-nums">{value}</div>
      <div className={`text-xs uppercase tracking-wide ${className}`}>{label}</div>
    </div>
  );
}

export default function StatsBar({ total, done, active, onClearCompleted }) {
  const percent = total === 0 ? 0 : Math.round((done / total) * 100);

  return (
    <div className="rounded-xl bg-slate-800/70 p-4">
      <div className="grid grid-cols-3 gap-4 mb-4">
        <Bar label="Total" value={total} className="text-slate-400" />
        <Bar label="Done" value={done} className="text-emerald-400" />
        <Bar label="Not Done" value={active} className="text-amber-400" />
      </div>

      <div
        className="h-2 w-full overflow-hidden rounded-full bg-slate-700"
        role="progressbar"
        aria-valuenow={percent}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label="Completion progress"
      >
        <div
          className="h-full rounded-full bg-emerald-500 transition-all duration-300"
          style={{ width: `${percent}%` }}
        />
      </div>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-slate-400" aria-live="polite">
          {percent === 0
            ? "No tasks yet"
            : `${percent}% complete`}
        </p>

        <div className="flex gap-2">
          <button
            type="button"
            onClick={onClearCompleted}
            disabled={done === 0}
            className="rounded-lg bg-slate-700 hover:bg-slate-600 disabled:opacity-40
              disabled:cursor-not-allowed disabled:hover:bg-slate-700 px-3 py-1.5
              text-sm font-medium text-slate-200 transition"
          >
            Clear Completed
          </button>
        </div>
      </div>
    </div>
  );
}
