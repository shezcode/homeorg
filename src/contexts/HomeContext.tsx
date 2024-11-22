"use client";

import React, { createContext, useState, useContext, ReactNode } from "react";

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

type TimeLog = {
  id: number;
  duration: number;
  description: string;
  timestamp: string;
  user: User;
};

type HomeContextType = {
  users: User[];
  todos: Todo[];
  timeLogs: TimeLog[];
  addTodo: (text: string) => void;
  toggleTodo: (id: number, user: User) => void;
  deleteTodo: (id: number) => void;
  addTimeLog: (duration: number, description: string, user: User) => void;
};

const HomeContext = createContext<HomeContextType | undefined>(undefined);

export const useHomeContext = () => {
  const context = useContext(HomeContext);
  if (!context) {
    throw new Error("useHomeContext must be used within a HomeProvider");
  }
  return context;
};

export const HomeProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [users] = useState<User[]>([
    { id: 1, name: "Alice" },
    { id: 2, name: "Bob" },
  ]);

  const [todos, setTodos] = useState<Todo[]>([
    { id: 1, text: "Do the dishes", completed: false },
    { id: 2, text: "Sweep the floor", completed: false },
    { id: 3, text: "Take out the trash", completed: false },
  ]);

  const [timeLogs, setTimeLogs] = useState<TimeLog[]>([]);

  const addTodo = (text: string) => {
    setTodos([...todos, { id: Date.now(), text, completed: false }]);
  };

  const toggleTodo = (id: number, user: User) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id
          ? {
              ...todo,
              completed: !todo.completed,
              completedBy: todo.completed ? undefined : user,
            }
          : todo
      )
    );
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const addTimeLog = (duration: number, description: string, user: User) => {
    setTimeLogs([
      ...timeLogs,
      {
        id: Date.now(),
        duration,
        description,
        timestamp: new Date().toLocaleString(),
        user,
      },
    ]);
  };

  return (
    <HomeContext.Provider
      value={{
        users,
        todos,
        timeLogs,
        addTodo,
        toggleTodo,
        deleteTodo,
        addTimeLog,
      }}
    >
      {children}
    </HomeContext.Provider>
  );
};
