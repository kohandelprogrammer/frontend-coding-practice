<<<<<<< HEAD
import { useEffect, useState } from "react";
import "./App.css";
import { getTasks } from "./services/todoService";
import type { FilterType, Todo } from "./types/todo";
import TodoList from "./components/TodoList";
import TodoForm from "./components/TodoForm";
import TodoFilter from "./components/TodoFilter";

function App() {
  const [tasks, setTasks] = useState<Todo[]>([]);
  const [selectedTask, setSelectedTask] = useState<Todo | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [inputValue, setInputValue] = useState<string>("");
  const [selectedFilter, setSelectedFilter] =
    useState<FilterType["value"]>("all");

  useEffect(() => {
    const loadTasks = async () => {
      setLoading(true);
      setError("");

      try {
        const results = await getTasks();
        setTasks(results.slice(0, 5));
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError("Something went wrong");
        }
      } finally {
        setLoading(false);
      }
    };

    loadTasks();
  }, []);

  const addTasks = (task: Todo) => {
    setTasks((prev) => [...prev, task]);
  };

  const handleUpdateTask = (_task: Todo) => {
    setTasks((prev) =>
      prev.map((task) => (task.id === _task.id ? _task : task)),
    );
    setSelectedTask(null);
    setInputValue("");
  };

  const editTask = (task: Todo) => {
    setSelectedTask(task);
    setInputValue(task.title);
  };

  const deleteTask = (taskId: number) => {
    if (selectedTask?.id === taskId) {
      setInputValue("");
      setSelectedTask(null);
    }
    setTasks((prev) => prev.filter((task) => task.id !== taskId));
  };

  const onToggle = (taskId: number) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === taskId
          ? {
              ...task,
              completed: !task.completed,
            }
          : task,
      ),
    );
  };

  const onFilterChange = (filterValue: FilterType["value"]) => {
    setSelectedFilter(filterValue);
  };

  const filteredTasks = tasks.filter((task: Todo) => {
    if (selectedFilter === "active") {
      return !task.completed;
    }

    if (selectedFilter === "completed") {
      return task.completed;
    }

    return true;
  });

  const activeTasksCount = tasks.filter((task) => !task.completed).length;

  if (loading) {
    return <div>loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="app">
      <div className="app-header">
        <h2>{selectedTask ? "Edit task" : "Create a task"}</h2>
        <h4>active task count : {activeTasksCount}</h4>
        <TodoFilter
          selectedFilter={selectedFilter}
          onFilterChange={onFilterChange}
        />
      </div>

      <TodoForm
        inputValue={inputValue}
        setInputValue={setInputValue}
        selectedTask={selectedTask}
        handleUpdateTask={handleUpdateTask}
        addTasks={addTasks}
      />

      <TodoList
        tasks={filteredTasks}
        onToggle={onToggle}
        deleteTask={deleteTask}
        editTask={editTask}
      />
    </div>
  );
}

export default App;
=======
import { useState } from 'react'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <section id="center">
        <div className="hero">
          <img src={heroImg} className="base" width="170" height="179" alt="" />
          <img src={reactLogo} className="framework" alt="React logo" />
          <img src={viteLogo} className="vite" alt="Vite logo" />
        </div>
        <div>
          <h1>Get started</h1>
          <p>
            Edit <code>src/App.tsx</code> and save to test <code>HMR</code>
          </p>
        </div>
        <button
          type="button"
          className="counter"
          onClick={() => setCount((count) => count + 1)}
        >
          Count is {count}
        </button>
      </section>

      <div className="ticks"></div>

      <section id="next-steps">
        <div id="docs">
          <svg className="icon" role="presentation" aria-hidden="true">
            <use href="/icons.svg#documentation-icon"></use>
          </svg>
          <h2>Documentation</h2>
          <p>Your questions, answered</p>
          <ul>
            <li>
              <a href="https://vite.dev/" target="_blank">
                <img className="logo" src={viteLogo} alt="" />
                Explore Vite
              </a>
            </li>
            <li>
              <a href="https://react.dev/" target="_blank">
                <img className="button-icon" src={reactLogo} alt="" />
                Learn more
              </a>
            </li>
          </ul>
        </div>
        <div id="social">
          <svg className="icon" role="presentation" aria-hidden="true">
            <use href="/icons.svg#social-icon"></use>
          </svg>
          <h2>Connect with us</h2>
          <p>Join the Vite community</p>
          <ul>
            <li>
              <a href="https://github.com/vitejs/vite" target="_blank">
                <svg
                  className="button-icon"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#github-icon"></use>
                </svg>
                GitHub
              </a>
            </li>
            <li>
              <a href="https://chat.vite.dev/" target="_blank">
                <svg
                  className="button-icon"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#discord-icon"></use>
                </svg>
                Discord
              </a>
            </li>
            <li>
              <a href="https://x.com/vite_js" target="_blank">
                <svg
                  className="button-icon"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#x-icon"></use>
                </svg>
                X.com
              </a>
            </li>
            <li>
              <a href="https://bsky.app/profile/vite.dev" target="_blank">
                <svg
                  className="button-icon"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#bluesky-icon"></use>
                </svg>
                Bluesky
              </a>
            </li>
          </ul>
        </div>
      </section>

      <div className="ticks"></div>
      <section id="spacer"></section>
    </>
  )
}

export default App
>>>>>>> 1021562 (feat: first commit)
