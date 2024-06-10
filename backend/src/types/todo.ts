import mongoose from "mongoose";

export default interface ITodo {
  id: mongoose.Types.ObjectId;
  text: string;
  completed: boolean;
}
