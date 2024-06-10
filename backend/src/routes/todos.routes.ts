import express from "express";
import {
  getTodos,
  createTodo,
  deleteTodo,
  editTodo,
  toggleTodo,
} from "../controllers/todos.controllers.js";

const router = express.Router();

router.get("/todos", getTodos);
router.post("/todos", createTodo);
router.delete("/todos/:id", deleteTodo);
router.patch("/todos/:id", editTodo);
router.patch("/todos/:id/toggle", toggleTodo);

export default router;
