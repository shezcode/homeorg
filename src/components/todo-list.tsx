"use client";

import { useState } from "react";
import { TodoItem } from "./todo-item";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

type User = {
  // TODO
  // replace with actual user type from the household db
  id: number;
  name: string;
};

type Todo = {
  id: number;
  text: string;
  completed: boolean;
  completedBy?: User;
};

const users: User[] = [
  // TODO
  // replace with actual users from the household db
  { id: 1, name: "Alice" },
  { id: 2, name: "Bob" },
];

const defaultTodos: Todo[] = [
  { id: 1, text: "Do the dishes", completed: false },
  { id: 2, text: "Sweep the floor", completed: false },
  { id: 3, text: "Take out the trash", completed: false },
  { id: 4, text: "Clean kitten litter", completed: false },
];

export function TodoList() {
  const [todos, setTodos] = useState<Todo[]>(defaultTodos);
  const [newTodo, setNewTodo] = useState("");

  const addTodo = () => {
    if (newTodo.trim() !== "") {
      setTodos([...todos, { id: Date.now(), text: newTodo, completed: false }]);
      setNewTodo("");
    }
  };

  const toggleTodo = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id
          ? {
              ...todo,
              completed: !todo.completed,
              completedBy: todo.completed
                ? undefined
                : users[Math.floor(Math.random() * users.length)],
            }
          : todo
      )
    );
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-xl sm:text-2xl">Tareas</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col sm:flex-row mb-4 gap-2">
          <Input
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            placeholder="Crear nueva tarea"
            className="flex-grow"
          />
          <Button onClick={addTodo} className="w-full sm:w-auto">
            Añadir tarea
          </Button>
        </div>
        <ul className="space-y-2">
          {todos.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onToggle={() => toggleTodo(todo.id)}
              onDelete={() => deleteTodo(todo.id)}
            />
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
