import { QueryClient } from "@tanstack/react-query";
import { ITodo, IMessage } from "../types";

export const queryClient = new QueryClient();

export async function addTodo({ text }: { text: string }): Promise<ITodo> {
  if (!text || !text.trim()) {
    throw new Error("Text is required");
  }

  const response = await fetch("http://localhost:3000/todos", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ text }),
  });

  if (!response.ok) {
    const error = new Error("An error occurred while signing up") as {
      code?: number;
      info?: object;
    };

    error.code = response.status;
    error.info = await response.json();
    throw error;
  }

  return await response.json();
}

export async function getTodos(): Promise<ITodo[]> {
  const response = await fetch("http://localhost:3000/todos");

  if (!response.ok) {
    const error = new Error("An error occurred while signing up") as {
      code?: number;
      info?: object;
    };
    error.code = response.status;
    error.info = await response.json();
  }

  return await response.json();
}

export async function deleteTodo({ id }: { id: number }): Promise<IMessage> {
  const response = await fetch(`http://localhost:3000/todos/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    const error = new Error("An error occurred while signing up") as {
      code?: number;
      info?: object;
    };
    error.code = response.status;
    error.info = await response.json();
  }

  return await response.json();
}

export async function toggleTodo({ id }: { id: number }): Promise<ITodo> {
  const response = await fetch(`http://localhost:3000/todos/${id}/toggle`, {
    method: "PATCH",
  });

  if (!response.ok) {
    const error = new Error("An error occurred while signing up") as {
      code?: number;
      info?: object;
    };
    error.code = response.status;
    error.info = await response.json();
  }

  return await response.json();
}
