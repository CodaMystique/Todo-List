import { Request, Response } from "express";
import Todo from "../models/todo.models.ts";

export async function getTodos(req: Request, res: Response): Promise<void> {
  try {
    const todos = await Todo.find().then((todos) =>
      todos.map((todo) => ({
        id: todo._id,
        text: todo.text,
        completed: todo.completed,
      }))
    );

    res.status(200).json(todos);
  } catch (err) {
    console.log("Error in getTodos controller", err.message);
    res.status(400).json({ message: "Internal server error" });
  }
}

export function createTodo(req: Request, res: Response): void {
  try {
    const { text } = req.body;

    if (!text || !text.trim()) {
      res.status(400).json({ error: "Please provide a text" });
    }

    const newTodo = new Todo({
      text,
      completed: false,
    });

    newTodo.save();

    res.status(201).json(newTodo);
  } catch (err) {
    console.log("Error in createTodo controller", err.message);
    res.status(400).json({ message: "Internal server error" });
  }
}

export async function editTodo(req: Request, res: Response): Promise<void> {
  const { id } = req.params;
  const { text } = req.body;

  if (!text || !text.trim()) {
    res.status(400).json({ error: "Please provide a text" });
  }

  try {
    const todo = await Todo.findById(id);

    if (!todo) {
      res.status(404).json({ error: "Todo not found" });
    }

    todo.text = text;
    todo.completed = false;

    res.status(200).json(todo);
  } catch (err) {
    console.log("Error in editTodo controller", err.message);
    res.status(400).json({ message: "Internal server error" });
  }
}

export async function deleteTodo(req: Request, res: Response): Promise<void> {
  const { id } = req.params;

  if (!id) {
    res.status(400).json({ error: "Please provide a id" });
  }

  try {
    await Todo.findByIdAndDelete(id);
    res.status(200).json({ message: "Todo deleted" });
  } catch (err) {
    console.log("Error in deleteTodo controller", err.message);
    res.status(400).json({ message: "Internal server error" });
  }
}

export async function toggleTodo(req: Request, res: Response): Promise<void> {
  const { id } = req.params;

  try {
    const todo = await Todo.findById(id);

    todo.completed = !todo.completed;

    todo.save();

    res.status(200).json(todo);
  } catch (err) {
    console.log("Error in toggleTodo controller", err.message);
    res.status(400).json({ message: "Internal server error" });
  }
}
