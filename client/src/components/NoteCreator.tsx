import React, { useState } from 'react';

interface NoteCreatorProps {
  handleAddNote: (event: React.FormEvent, content: string) => void,
}

const NoteCreator: React.FC<NoteCreatorProps> = (props) => {
  const [inputValue, setInputValue] = useState("");

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    props.handleAddNote(event, inputValue);
    setInputValue("");
  }
  
  return(
    <form onSubmit={handleSubmit} style={{
      height: "150px",
      width: "150px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      margin: "auto",
      textAlign: "center"
    }}>
      <textarea 
        placeholder='Enter note to write e.g. "hi mom"' 
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        style={{
          height: "100%",
          width: "100%"
        }} 
      />
      <button style={{
        height: "100%"
      }}>Add note</button>
    </form>
  )
}

export default NoteCreator;