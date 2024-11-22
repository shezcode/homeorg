import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

type User = {
  id: number;
  name: string;
};

type Todo = {
  id: number;
  text: string;
  completed: boolean;
  completedBy?: User;
};

type TodoItemProps = {
  todo: Todo;
  onToggle: () => void;
  onDelete: () => void;
};

export function TodoItem({ todo, onToggle, onDelete }: TodoItemProps) {
  return (
    <li className="flex flex-col sm:flex-row sm:items-center justify-between py-2 px-2 bg-secondary rounded-lg">
      <div className="flex items-center mb-2 sm:mb-0">
        <Checkbox
          id={`todo-${todo.id}`}
          checked={todo.completed}
          onCheckedChange={onToggle}
          className="mr-2"
        />
        <label
          htmlFor={`todo-${todo.id}`}
          className={`${
            todo.completed ? "line-through text-muted-foreground" : ""
          } text-sm sm:text-base`}
        >
          {todo.text}
        </label>
      </div>
      <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto">
        {todo.completed && todo.completedBy && (
          <span className="text-xs sm:text-sm text-muted-foreground mr-2">
            Completado por {todo.completedBy.name}
          </span>
        )}
        <Button
          variant="ghost"
          size="icon"
          onClick={onDelete}
          className="ml-auto sm:ml-2"
        >
          <Trash2 className="h-4 w-4" />
          <span className="sr-only">Borrar tarea</span>
        </Button>
      </div>
    </li>
  );
}
