# To-Do List

A responsive to-do list web app built with **React 18**, **Vite 6**, and **Tailwind CSS 4**.

**Course:** DCIT 26: Application Development and Emerging Technologies — Laboratory 2, SY 2026-2027

## Features

- **Add tasks** with a text input and an Add Task button, or by pressing Enter
- **Mark tasks Done or Not Done** with a checkbox, with a visible status badge
- **Delete tasks** individually, or clear every completed task at once
- **Filter** the list by All, Not Done, or Done
- **Edit** the text of an existing task
- **Persistent storage** via `localStorage`, so tasks survive a page reload
- **Progress bar** with a live percentage complete
- **Responsive layout** that reflows to a single column on phones
- **Accessible**: labelled controls, visible focus rings, and a live region for the progress text

## React features demonstrated

| Feature | Where |
| ------- | ----- |
| `useState` for the task list | `src/App.jsx` |
| `useState` for the input and the active filter | `src/components/AddTaskForm.jsx`, `src/App.jsx` |
| `useCallback` for stable event handlers | `src/App.jsx` |
| `useMemo` for the filtered list | `src/App.jsx` |
| `useEffect` for persistence | `src/hooks/useLocalStorage.js` |
| Form `onSubmit` and button `onClick` events | `src/components/AddTaskForm.jsx`, `src/components/TodoItem.jsx` |
| Controlled inputs | `AddTaskForm`, `TodoItem` edit mode |
| Component composition | `Header`, `AddTaskForm`, `FilterBar`, `TodoList`, `TodoItem`, `StatsBar`, `UserGuide` |

## Getting started

```bash
npm install       # install dependencies
npm run dev       # start the dev server on http://localhost:5173
npm run build     # produce a production build in dist/
npm run preview   # preview the production build locally
```

Requires Node.js 18 or newer.

## Project structure

```
├── index.html                  # HTML entry point
├── vite.config.js              # Vite + React + Tailwind plugin config
└── src/
    ├── main.jsx                # React root mount
    ├── App.jsx                 # State, handlers, and page layout
    ├── index.css               # Tailwind entry stylesheet
    ├── hooks/
    │   └── useLocalStorage.js  # State that persists to localStorage
    └── components/
        ├── Header.jsx          # Page title
        ├── AddTaskForm.jsx     # Input + Add Task button
        ├── FilterBar.jsx       # All / Not Done / Done filters
        ├── TodoList.jsx        # List rendering and empty states
        ├── TodoItem.jsx        # One task: toggle, edit, delete
        ├── StatsBar.jsx        # Counts, progress bar, clear completed
        └── UserGuide.jsx       # How-to instructions
```

## Data model

Each task is a plain object:

```js
{ id: "1725701234567-1", text: "Submit Lab 2", done: false }
```

The `id` is generated from the current timestamp plus a counter, so two tasks
added in the same millisecond still get distinct keys.

## Deployment

Vercel, Netlify, and GitHub Pages all work with no extra configuration.

**Vercel**

1. Push this project to GitHub.
2. Go to [vercel.com/new](https://vercel.com/new) and import the repository.
3. Vercel detects Vite automatically. Accept the defaults:
   - Build command: `npm run build`
   - Output directory: `dist`
4. Deploy. The live URL looks like `https://parado-todo-list.vercel.app`.

**Netlify**

1. Push to GitHub, then go to [app.netlify.com](https://app.netlify.com).
2. Import the repository. The build settings are detected automatically.
3. Deploy.

**GitHub Pages**

1. Install the Pages plugin: `npm install -D vite-plugin-gh-pages`
2. Add the plugin to `vite.config.js` and set `base: "/<repo-name>/"`.
3. Run `npx vite build` and publish the `dist` folder from the branch.

## Testing checklist

- [x] Tasks can be added with the button and with Enter
- [x] Tasks can be marked Done
- [x] Done tasks can be changed back to Not Done
- [x] Tasks can be deleted individually
- [x] Completed tasks can be cleared in bulk
- [x] Filters show the correct subset
- [x] Tasks persist after a page reload
- [x] Layout is responsive from phone to desktop widths
- [x] Empty states render when a filter has no matches
