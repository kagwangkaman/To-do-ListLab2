const instructions = [
  {
    title: "How to add a task",
    steps: [
      "Type what you need to do into the text box at the top.",
      "Press the Add Task button, or simply press Enter.",
      "The new task appears in the list as Not Done.",
    ],
  },
  {
    title: "How to mark a task as Done or Not Done",
    steps: [
      "Click the round checkbox on the left of the task.",
      "A Done task gets a green bar, a strike-through, and a Done badge.",
      "Click the checkbox again to switch it back to Not Done.",
    ],
  },
  {
    title: "How to delete a task",
    steps: [
      "Click the red trash icon on the right of the task.",
      "The task is removed from the list immediately.",
      "To remove every finished task at once, use Clear Completed.",
    ],
  },
];

const features = [
  "Add tasks dynamically with a form submit handler",
  "Mark tasks Done and Not Done with a controlled checkbox",
  "Delete a single task or clear all completed tasks",
  "Filter the list by All, Not Done, or Done",
  "Edit the text of an existing task",
  "Save tasks to localStorage so they survive a page reload",
];

export default function UserGuide() {
  return (
    <section
      className="rounded-2xl bg-slate-800 p-6 shadow-xl"
      aria-labelledby="guide-heading"
    >
      <h2 id="guide-heading" className="text-2xl font-bold mb-4">
        User Guide
      </h2>

      {instructions.map((group) => (
        <div key={group.title} className="mb-6 last:mb-0">
          <h3 className="text-lg font-semibold text-indigo-300 mb-2">
            {group.title}
          </h3>
          <ol className="list-decimal list-inside space-y-1 text-slate-300">
            {group.steps.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ol>
        </div>
      ))}

      <h3 className="text-lg font-semibold text-indigo-300 mb-2">
        Features included
      </h3>
      <ul className="space-y-1 text-slate-300">
        {features.map((feature) => (
          <li key={feature} className="flex gap-2">
            <span aria-hidden="true" className="text-emerald-400">
              &#10003;
            </span>
            <span>{feature}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
