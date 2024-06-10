import { useState } from "react";
import { ITodo } from "@/types";
import { MdDeleteOutline } from "react-icons/md";
import { useMutation } from "@tanstack/react-query";
import { deleteTodo, toggleTodo } from "@/utils/http";
import { queryClient } from "@/utils/http";
import Loader from "./Loader";

function Todo({
  todo,
  updateCounts,
}: {
  todo: ITodo;
  updateCounts: (completed: boolean) => void;
}) {
  const [completed, setCompleted] = useState(todo.completed);

  const { mutate: mutateDelete, isPending } = useMutation({
    mutationFn: () => deleteTodo({ id: todo.id }),
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  const { mutate: mutateToggleTodo } = useMutation({
    mutationFn: () => toggleTodo({ id: todo.id }),
    onSuccess: () => {
      setCompleted((prev) => !prev);
      updateCounts(!completed);
    },
  });

  function handleDeleteTodo(): void {
    mutateDelete();
  }

  function handleCheckboxChange(): void {
    mutateToggleTodo();
  }

  return (
    <li
      key={todo.id}
      className="bg-purple-200 h-16 rounded-lg flex justify-between items-center p-4 mb-2"
    >
      <p className="text-gray-900">{todo.text}</p>
      <div className="flex items-center">
        <input
          type="checkbox"
          onChange={handleCheckboxChange}
          checked={completed}
          className="mr-2 h-4 w-4 accent-purple-100"
        />
        <button onClick={handleDeleteTodo}>
          {isPending ? <Loader /> : <MdDeleteOutline size={20} />}
        </button>
      </div>
    </li>
  );
}

export default Todo;
