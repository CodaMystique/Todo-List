import express, { Express } from "express";
import dotenv from "dotenv";
import cors from "cors";
import todosRoutes from "./routes/todos.routes.ts";

dotenv.config();

const app: Express = express();

app.use(cors());
app.use(express.json());

app.use(todosRoutes);

export default app;
