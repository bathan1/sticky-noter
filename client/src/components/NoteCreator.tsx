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
    <form onSubmit={handleSubmit}>
      <input 
        type="text" 
        placeholder='Enter note to write e.g. "hi mom"' 
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)} 
      />
      <button>Add note</button>
    </form>
  )
}

export default NoteCreator;