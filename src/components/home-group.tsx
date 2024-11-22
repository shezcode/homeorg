"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useHomeContext } from "@/contexts/HomeContext";

export function HomeGroup() {
  const { users, todos, timeLogs } = useHomeContext();

  const getUserSummary = (userId: number) => {
    const completedTodos = todos.filter(
      (todo) => todo.completedBy?.id === userId
    );
    const userTimeLogs = timeLogs.filter((log) => log.user.id === userId);
    const totalTime = userTimeLogs.reduce((sum, log) => sum + log.duration, 0);

    return {
      completedTodos: completedTodos.length,
      timeLogs: userTimeLogs.length,
      totalTime: totalTime,
    };
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-xl sm:text-2xl">Hogar</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-4">
          {users.map((user) => {
            const summary = getUserSummary(user.id);
            return (
              <li key={user.id} className="bg-secondary rounded-lg p-3">
                <h3 className="font-semibold text-lg mb-2 underline">
                  {user.name}
                </h3>
                <p className="text-sm italic">
                  Tareas completadas: {summary.completedTodos}
                </p>
                <p className="text-sm">Logs totales: {summary.timeLogs}</p>
                <p className="text-sm font-bold">
                  Tiempo loggeado: {Math.floor(summary.totalTime / 3600)}h{" "}
                  {Math.floor((summary.totalTime % 3600) / 60)}m
                </p>
              </li>
            );
          })}
        </ul>
      </CardContent>
    </Card>
  );
}
