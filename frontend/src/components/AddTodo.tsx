import { addTodo } from "@/utils/http";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { GoPlus } from "react-icons/go";
import Loader from "./Loader";
import { queryClient } from "@/utils/http";

function AddTodo() {
  const [todoText, setTodoText] = useState<string>("");

  const { isPending, mutate } = useMutation({
    mutationFn: addTodo,
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  function handleTodoTextChange(e: React.ChangeEvent<HTMLInputElement>): void {
    setTodoText(e.target.value);
  }

  function handleAddTodo(): void {
    if (todoText || todoText.trim()) {
      mutate({ text: todoText });
      setTodoText("");
    }
  }

  return (
    <div className="w-full flex justify-center mt-8 sm:mt-16">
      <div className="w-full sm:w-3/4 md:w-2/3 lg:w-1/2 xl:w-1/3 flex items-center px-4">
        <input
          type="text"
          value={todoText}
          onChange={handleTodoTextChange}
          placeholder="Add a new todo"
          className="h-10 w-full bg-midnight border-none placeholder:text-gray-300 text-white rounded-lg px-3 ring-2 ring-purple-200 focus:ring-2 focus:ring-purple-200 focus:outline-none mr-3"
        />
        <button
          onClick={handleAddTodo}
          disabled={isPending}
          className="flex justify-center items-center bg-purple-100 rounded-lg h-10 w-12 hover:bg-purple-200 transition-colors duration-300"
        >
          {isPending ? <Loader /> : <GoPlus size={22} />}
        </button>
      </div>
    </div>
  );
}

export default AddTodo;
