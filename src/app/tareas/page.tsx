import { TodoList } from "@/components/todo-list";
import { HomeGroup } from "@/components/home-group";
import { Timer } from "@/components/timer";
import { Notes } from "@/components/notes";
import { HomeProvider } from "@/contexts/HomeContext";

export default function Home() {
  return (
    <HomeProvider>
      <main className="container mx-auto p-4 max-w-md sm:max-w-2xl md:max-w-4xl">
        <h1 className="text-2xl sm:text-3xl font-bold mb-4 text-center">
          Tareas
        </h1>
        <div className="space-y-4">
          <div className="space-y-4 md:space-y-0 md:grid md:grid-cols-2 md:gap-4">
            <TodoList />
            <HomeGroup />
          </div>
          <Timer />
          <Notes />
        </div>
      </main>
    </HomeProvider>
  );
}
