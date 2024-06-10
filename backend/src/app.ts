import express, { Express } from "express";
import dotenv from "dotenv";
import cors from "cors";
import todosRoutes from "./routes/todos.routes.js";
import connectToMongoDB from "./db/connectToMongoDB.js";

dotenv.config();

const app: Express = express();

app.use(
  cors({
    origin: "*",
  })
);
app.use(express.json());

app.use(todosRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  connectToMongoDB();
  console.log(`Server is running on port ${PORT}`);
});
