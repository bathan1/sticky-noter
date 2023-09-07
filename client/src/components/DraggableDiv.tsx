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
            style={{ position: 'absolute', top: position.y + 'px', left: position.x + 'px', display: contextMenuVisible ? 'block' : 'none' }}
        >
            {!isEditing && (<button id="editButton" onClick={handleEditClick}>E</button>)}
            {!isEditing && (<button id="deleteButton" onClick={handleDeleteClick}>X</button>)}
            {isEditing && (
                <div> 
                    <input
                        type="text"
                        value={editableContent}
                        onChange={(event) => setEditableContent(event.target.value)}
                    />
                    <button onClick={handleSaveClick}>Save</button>
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

    return(
        <div>
            <div 
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
            {props.content}
            </div>
            {contextMenu}
        </div>
    )
}

export default DraggableDiv