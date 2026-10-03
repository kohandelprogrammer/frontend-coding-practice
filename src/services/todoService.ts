import type { Todo } from "../types/todo";

export const getTasks = async (): Promise<Todo[]> => {
  const response = await fetch("https://jsonplaceholder.typicode.com/todos");
  if (response.ok) {
    const data = await response.json();

    return data;
  } else {
    throw new Error("failed to fetch tasks");
  }
};
