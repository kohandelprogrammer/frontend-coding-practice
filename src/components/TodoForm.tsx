import type { Todo } from "../types/todo";
import { USER_ID } from "../constant";
import { toast } from "react-toastify";

type Props = {
  selectedTask?: Todo | null;
  addTasks: (task: Todo) => void;
  handleUpdateTask: (task: Todo) => void;
  setInputValue: React.Dispatch<React.SetStateAction<string>>;
  inputValue: string;
};

export default function TodoForm({
  selectedTask,
  addTasks,
  handleUpdateTask,
  setInputValue,
  inputValue,
}: Props) {
  const addNewTask = () => {
    if (inputValue.trim()) {
      const newTask: Todo = {
        id: Math.random(),
        completed: false,
        title: inputValue.trim(),
        userId: USER_ID,
      };
      addTasks(newTask);
      setInputValue("");
    } else {
      toast("Please enter a title for task!");
    }
  };

  const updateTask = () => {
    if (!selectedTask) {
      return;
    }
    const updatedTask = {
      ...selectedTask,
      title: inputValue.trim(),
    };
    handleUpdateTask(updatedTask);
  };

  return (
    <div className="todo-form">
      <input
        value={inputValue}
        placeholder="write title"
        onChange={(e) => setInputValue(e.currentTarget.value)}
      />
      <button onClick={selectedTask ? updateTask : addNewTask}>
        {selectedTask ? "update" : "add"}
      </button>
    </div>
  );
}
