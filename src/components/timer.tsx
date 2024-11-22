"use client";

import { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PlayCircle, PauseCircle, RotateCcw } from "lucide-react";
import { useHomeContext } from "@/contexts/HomeContext";

export function Timer() {
  const { users, timeLogs, addTimeLog } = useHomeContext();
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [description, setDescription] = useState("");
  const [showLogPrompt, setShowLogPrompt] = useState(false);

  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    if (isRunning) {
      intervalId = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    }

    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [isRunning]);

  const toggleTimer = () => {
    if (isRunning) {
      setShowLogPrompt(true);
    }
    setIsRunning(!isRunning);
  };

  const resetTimer = () => {
    setTime(0);
    setIsRunning(false);
    setShowLogPrompt(false);
    setDescription("");
  };

  const logTime = () => {
    if (time > 0) {
      const randomUser = users[Math.floor(Math.random() * users.length)];
      addTimeLog(time, description, randomUser);
      resetTimer();
    }
  };

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;
    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-xl sm:text-2xl">Timer</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center space-y-4">
          <div className="text-4xl font-bold">{formatTime(time)}</div>
          <div className="flex space-x-2">
            <Button onClick={toggleTimer} variant="outline" size="icon">
              {isRunning ? (
                <PauseCircle className="h-6 w-6" />
              ) : (
                <PlayCircle className="h-6 w-6" />
              )}
              <span className="sr-only">{isRunning ? "Pause" : "Start"}</span>
            </Button>
            <Button onClick={resetTimer} variant="outline" size="icon">
              <RotateCcw className="h-6 w-6" />
              <span className="sr-only">Reset</span>
            </Button>
          </div>
          {showLogPrompt && (
            <div className="w-full space-y-2">
              <Input
                type="text"
                placeholder="Describe las tareas realizadas en este tiempo..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
              <Button onClick={logTime} className="w-full">
                Loggear tiempo
              </Button>
            </div>
          )}
        </div>
        {timeLogs.length > 0 && (
          <div className="mt-4">
            <h3 className="font-semibold mb-2">Time Logs:</h3>
            <ul className="space-y-2">
              {timeLogs.map((log) => (
                <li key={log.id} className="text-sm">
                  <span className="font-semibold">
                    {formatTime(log.duration)}
                  </span>{" "}
                  - <span className="font-bold">{log.description}</span> (
                  {log.user.name}, {log.timestamp})
                </li>
              ))}
            </ul>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
