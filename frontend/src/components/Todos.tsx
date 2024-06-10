import { useQuery } from "@tanstack/react-query";
import { getTodos } from "@/utils/http";
import Error from "./Error";
import Loader from "./Loader";
import Todo from "./Todo";
import { useEffect, useState } from "react";

function List() {
  const {
    data: todos,
    isLoading,
    isError: isTodosError,
    error: todosError,
  } = useQuery({
    queryKey: ["todos"],
    queryFn: getTodos,
  });

  const [completedCount, setCompletedCount] = useState<number>(0);
  const [incompletedCount, setIncompletedCount] = useState<number>(0);

  function updateCounts(completed: boolean): void {
    if (completed) {
      setCompletedCount((prev) => prev + 1);
      setIncompletedCount((prev) => prev - 1);
    } else {
      setCompletedCount((prev) => prev - 1);
      setIncompletedCount((prev) => prev + 1);
    }
  }

  useEffect(() => {
    if (todos) {
      setCompletedCount(todos.filter((todo) => todo.completed).length);
      setIncompletedCount(todos.filter((todo) => !todo.completed).length);
    }
  }, [todos]);

  let content;

  if (isLoading) {
    content = <Loader></Loader>;
  }

  if (isTodosError) {
    const errorWithInfo = todosError as { info?: { message?: string } };
    content = <Error errorMessage={errorWithInfo.info?.message}></Error>;
  }

  if (todos) {
    content = (
      <>
        <div className="flex flex-row gap-4 justify-between items-center mb-9">
          <p className="text-white text-lg">Total - {todos.length}</p>
          <p className="text-white text-lg">Incomplete - {incompletedCount}</p>
          <p className="text-white text-lg">Complete - {completedCount}</p>
        </div>
        <div className="max-h-96 overflow-y-auto">
          <ul className="pr-4">
            {todos.map((todo) => (
              <Todo
                key={todo.id}
                todo={todo}
                updateCounts={updateCounts}
              ></Todo>
            ))}
          </ul>
        </div>
      </>
    );
  }

  return (
    <div className="w-full sm:w-3/4 md:w-2/3 lg:w-1/2 xl:w-1/3 mt-8 sm:mt-16">
      {content}
    </div>
  );
}

export default List;
