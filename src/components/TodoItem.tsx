import EditIcon from "../assets/svg/edit";
import TrashIcon from "../assets/svg/trash";
import type { Todo } from "../types/todo";

type Props = {
  task: Todo;
  editTask: (task: Todo) => void;
  deleteTask: (taskId: number) => void;
  onToggle: (taskId: number) => void;
};

export default function TodoItem({
  task,
  editTask,
  deleteTask,
  onToggle,
}: Props) {
  return (
    <div className="todo-item" onClick={() => onToggle(task.id)}>
      <p style={{ textDecoration: task.completed ? "line-through" : "" }}>
        {task.title}
      </p>

      <div className="todo-item-btn">
        <button onClick={() => editTask(task)}>
          <EditIcon />
        </button>
        <button onClick={() => deleteTask(task.id)}>
          <TrashIcon />
        </button>
      </div>
    </div>
  );
}
