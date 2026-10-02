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
