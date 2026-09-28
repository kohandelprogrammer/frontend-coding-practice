import { useEffect, useState } from "react";
import "./App.css";
import { getTasks } from "./services/todoService";
import type { Todo } from "./types/todo";
import TodoList from "./components/TodoList";
import TodoForm from "./components/TodoForm";

function App() {
  const [tasks, setTasks] = useState<Todo[]>([]);
  const [selectedTask, setSelectedTask] = useState<Todo | null>(null);
  const [inputValue, setInputValue] = useState<string>("");

  useEffect(() => {
    const loadTasks = async () => {
      const results = await getTasks();
      setTasks(results.slice(0, 5));
    };

    loadTasks();
  }, []);

  const addTasks = (task: Todo) => {
    setTasks([...tasks, task]);
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

  return (
    <div className="app">
      <div>
        <h2>{selectedTask ? "Edit task" : "Create a task"}</h2>
        <TodoForm
          inputValue={inputValue}
          setInputValue={setInputValue}
          selectedTask={selectedTask}
          handleUpdateTask={handleUpdateTask}
          addTasks={addTasks}
        />
      </div>

      <TodoList
        tasks={tasks}
        onToggle={onToggle}
        deleteTask={deleteTask}
        editTask={editTask}
      />
    </div>
  );
}

export default App;
