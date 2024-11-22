"use client";

import { TodoItem } from "./todo-item";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useHomeContext } from "@/contexts/HomeContext";
import { useState } from "react";

export function TodoList() {
  const { users, todos, addTodo, toggleTodo, deleteTodo } = useHomeContext();
  const [newTodo, setNewTodo] = useState("");

  const handleAddTodo = () => {
    if (newTodo.trim() !== "") {
      addTodo(newTodo);
      setNewTodo("");
    }
  };

  const handleToggleTodo = (id: number) => {
    const randomUser = users[Math.floor(Math.random() * users.length)];
    toggleTodo(id, randomUser);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-xl sm:text-2xl">Lista de tareas</CardTitle>
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
          <Button onClick={handleAddTodo} className="w-full sm:w-auto">
            Agregar tarea
          </Button>
        </div>
        <ul className="space-y-2">
          {todos.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onToggle={() => handleToggleTodo(todo.id)}
              onDelete={() => deleteTodo(todo.id)}
            />
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
