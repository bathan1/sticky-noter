import React, { useState, useEffect } from 'react';
import DraggableDiv from "./components/DraggableDiv";
import NoteCreator from "./components/NoteCreator";
import { v4 as uuidv4 } from "uuid";
import './App.css';

interface Note {
  id: string;
  content: string;
};

function App() {
  const [notes, setNotes] = useState<Note[]>([]);

  const handleAddNote = (event: React.FormEvent, content: string) => {
    event.preventDefault();
    const uniqueId = uuidv4();
    const newNote = {
      id: uniqueId,
      content: content
    };

    setNotes(prevNotes => [...prevNotes, newNote]);
  };

  return (
    <div className="App">
      <NoteCreator handleAddNote={handleAddNote} />
      {notes.map((note) => (
        <DraggableDiv key={note.id} note={note} content={note.content} notes={notes} setNotes={setNotes} id={note.id}/>
      ))}
    </div>
  );
}

export default App;
