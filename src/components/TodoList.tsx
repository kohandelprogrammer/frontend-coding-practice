import type { Todo } from "../types/todo";
import TodoItem from "./TodoItem";

type Props = {
  tasks: Todo[];
  editTask: (task: Todo) => void;
  deleteTask: (taskId: number) => void;
  onToggle: (taskId: number) => void;
};

export default function TodoList({
  tasks,
  editTask,
  deleteTask,
  onToggle,
}: Props) {
  return (
    <div className="todo-list">
      {tasks.map((task) => (
        <TodoItem
          key={task.id}
          task={task}
          editTask={editTask}
          deleteTask={deleteTask}
          onToggle={onToggle}
        />
      ))}
    </div>
  );
}
