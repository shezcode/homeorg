"use client";

import { useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useHomeContext } from "@/contexts/HomeContext";

type Note = {
  id: number;
  text: string;
  timestamp: string;
  user: string;
};

export function Notes() {
  const { users } = useHomeContext();
  const [notes, setNotes] = useState<Note[]>([]);
  const [newNote, setNewNote] = useState("");

  const addNote = () => {
    if (newNote.trim() !== "") {
      const now = new Date();
      const randomUser = users[Math.floor(Math.random() * users.length)];
      setNotes([
        ...notes,
        {
          id: Date.now(),
          text: newNote,
          timestamp: now.toLocaleString(),
          user: randomUser.name,
        },
      ]);
      setNewNote("");
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-xl sm:text-2xl">Notas</CardTitle>
        <CardDescription>
          Deja un nota con informacion adicional relevante sobre las tareas del
          dia.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex flex-col space-y-2">
            <Textarea
              placeholder="Nueva nota..."
              value={newNote}
              onChange={(e) => setNewNote(e.target.value)}
              className="min-h-[100px]"
            />
            <Button onClick={addNote} className="self-end">
              Añadir nota
            </Button>
          </div>
          <div className="space-y-4">
            {notes.map((note) => (
              <div key={note.id} className="bg-secondary rounded-lg p-3">
                <p className="text-sm sm:text-base mb-2">{note.text}</p>
                <div className="flex justify-between items-center text-xs text-muted-foreground">
                  <span>{note.user}</span>
                  <span>{note.timestamp}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
