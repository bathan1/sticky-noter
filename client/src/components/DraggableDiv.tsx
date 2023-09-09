import React, { useState, useEffect } from 'react';

interface Note {
    id: string,
    content: string,
};

interface DraggableDivProps {
    content: string,
    note: Note,
    notes: Note[],
    setNotes: React.Dispatch<React.SetStateAction<Note[]>>,
    id: string,
};

const DraggableDiv: React.FC<DraggableDivProps> = (props) => {
    const [isDragging, setIsDragging] = useState(false);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [initialPosition, setInitialPosition] = useState({ x: 0, y: 0 });
    const [contextMenuVisible, setContextMenuVisible] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editableContent, setEditableContent] = useState(props.content);

    const handleMouseDown = (event: React.MouseEvent) => {
        setIsDragging(true);
        setInitialPosition({
            x: event.clientX - position.x,
            y: event.clientY - position.y
        });
    };

    const handleMouseMove = (event: React.MouseEvent) => {
        if (isDragging) {
            setPosition({
                x: event.clientX - initialPosition.x,
                y: event.clientY - initialPosition.y
            });
        }
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };

    const handleContextMenu = (event: React.MouseEvent) => {
        event.preventDefault();
        setContextMenuVisible(true);
        setPosition({ x: position.x, y: position.y });
    };

    const handleDeleteClick = () => {
        const currentNotes = props.notes;
        const indexToDelete = currentNotes.findIndex((note) => note.id === props.id);
    
        if (indexToDelete === -1) {
            return;
        }

        const newNotes = [...currentNotes.slice(0, indexToDelete), ...currentNotes.slice(indexToDelete + 1)]
        props.setNotes(newNotes);

        setIsDragging(false);
        setContextMenuVisible(false);
    };

    const handleEditClick = () => {
        setIsEditing(true);
        setEditableContent(props.content);
    }

    const handleSaveClick = () => {
        const updatedNotes = props.notes.map(note => 
          note.id === props.id ? { ...note, content: editableContent } : note
        );
      
        props.setNotes(updatedNotes);
        setIsEditing(false);
        setContextMenuVisible(false);
      }

      const contextMenu = (
        <div
            className="context-menu"
            style={{
                position: 'absolute',
                top: position.y + 'px',
                left: position.x + 'px',
                display: contextMenuVisible ? 'block' : 'none'
            }}
        >
            {!isEditing && (
                <div>
                    <button id="editButton" onClick={handleEditClick}>E</button>
                    <button id="deleteButton" onClick={handleDeleteClick}>X</button>
                </div>
            )}
        </div>
    );
    

    useEffect(() => {
        const handleKeyUp = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                setContextMenuVisible(false);
                setIsEditing(false);
            }
        };

        document.addEventListener("keyup", handleKeyUp);

        return () => {
            document.removeEventListener("keyup", handleKeyUp);
        };
    }, []);

    function replaceElement(arr: Note[], index: number, newValue: Note): Note[] {
        return arr.slice(0, index).concat(newValue, arr.slice(index + 1));
    }

    function handleNoteChange(event: React.ChangeEvent<HTMLTextAreaElement>): void {

        const newNote = { ...props.note };
        newNote.content = event.target.value;

        const index = props.notes.findIndex((note) => note.id === props.note.id);
        if (index === -1) {
            console.error("error finding the current note");
        }
        const newNotesArray = replaceElement(props.notes, index, newNote);

        props.setNotes(newNotesArray);
        setEditableContent(newNote.content);
    }

    return(
        <div style={{ height: "100px" }}>
            <div id="textContainer"
                style={{
                width: '100px',
                height: '100px',
                background: 'lightyellow',
                border: '0.1px solid black',
                position: 'absolute',
                top: position.y + 'px',
                left: position.x + 'px',
                cursor: isDragging ? 'grabbing' : 'grab',
                userSelect: isDragging ? "none" : "auto"
            }} 
                onMouseDown={handleMouseDown} 
                onMouseMove={handleMouseMove} 
                onMouseUp={handleMouseUp}
                onContextMenu={handleContextMenu}
            >
            <textarea 
                value={editableContent}
                readOnly={!isEditing}
                style={{
                    width: '100%',
                    height: '100%', 
                    boxSizing: 'border-box',
                    margin: 0,
                    padding: 0,
                    border: 'none',
                    outline: 'none'
                }}
                onChange={handleNoteChange}
            />
            </div>
            {contextMenu}
        </div>
    )
}

export default DraggableDiv