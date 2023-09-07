import React, { useState, useEffect } from 'react';
import DraggableDiv from "./components/DraggableDiv";
import NoteCreator from "./components/NoteCreator";
import './App.css';

interface Note {
  id: number;
  content: string;
};

function App() {
  const [notes, setNotes] = useState<Note[]>([]);

  const handleAddNote = (event: React.FormEvent, content: string) => {
    event.preventDefault();
    const newNote = {
      id: Math.random(),
      content: content
    };
    setNotes([...notes, newNote]);
  };

  return (
    <div className="App">
      <NoteCreator handleAddNote={handleAddNote} />
      {notes.map((note) => (
        <DraggableDiv key={note.id} content={note.content} />
      ))}
    </div>
  );
}

export default App;
