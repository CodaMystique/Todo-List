import AddTodo from "@/components/AddTodo";
import Todos from "@/components/Todos";

function App() {
  return (
    <div className="flex flex-col items-center w-full bg-gray-100 min-h-screen p-4">
      <AddTodo></AddTodo>
      <Todos></Todos>
    </div>
  );
}

export default App;
