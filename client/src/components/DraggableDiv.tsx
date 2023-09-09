import React, { useState, useEffect } from 'react';
import exitButtonImage from "../images/x-button.png";
import editButtonImage from "../images/edit-button.png";
import deleteButtonImage from "../images/delete-button.png";

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
    const [isHovered, setIsHovered] = useState(false);
    const [isResizing, setIsResizing] = useState(false);
    const [resizeHandle, setResizeHandle] = useState('');

    const handleMouseDown = (event: React.MouseEvent) => {
        if (!isEditing) {
            setIsDragging(true);
            setInitialPosition({
            x: event.clientX - position.x,
            y: event.clientY - position.y
        });
        }
    };

    const handleMouseMove = (event: React.MouseEvent) => {
        if (isDragging && !isEditing) {
            setPosition({
                x: event.clientX - initialPosition.x,
                y: event.clientY - initialPosition.y
            });
        }
    };

    const handleMouseUp = () => {
        setIsDragging(false);
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

    const handleExitClick = () => {
        setIsEditing(false);
        setContextMenuVisible(false);
    }

      const contextMenu = (
        <div
            className="context-menu"
            style={{
                top: 0,
                left: 0,
                display: contextMenuVisible ? 'block' : 'none'
            }}
        >
            {!isEditing && (
                <div 
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    display: "flex",
                    flexDirection: "row",
                }}
                >
                    <img 
                    src={editButtonImage} 
                    alt="Click me to edit your note" 
                    onClick={handleEditClick} 
                    style={{
                        height: '15%',
                        width: '15%'
                    }}
                    />
                    <img 
                    src={deleteButtonImage} 
                    alt="Click me to delete your note forever (a long time...)" 
                    id="deleteButton" 
                    onClick={handleDeleteClick}
                    style={{
                        height: '15%',
                        width: '15%'
                    }} 
                    />
                </div>
            )}
            {isEditing && (
                <div 
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    display: "flex",
                    flexDirection: "row",
                }}
                >
                    <img 
                    src={exitButtonImage} 
                    alt="Click me to exit (or hit escape)" 
                    onClick={handleExitClick} 
                    style={{
                        height: '25%',
                        width: '25%'
                    }}
                    />
                </div>
            )}
        </div>
    );
    

    useEffect(() => {
        const handleKeyUp = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
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


    function handleMouseOver() {
        setIsHovered(true);
        setContextMenuVisible(true);
        setPosition({ x: position.x, y: position.y });

    }

    function handleMouseOut(): void {
        setIsHovered(false);
        setContextMenuVisible(false);
    }

    const unhighlightSelection = () => {
        const selection = window.getSelection();
        if (selection) {
            selection.removeAllRanges();
        }
    };

    function handleDoubleClick(): void {
        unhighlightSelection();

        setIsEditing(true);
        setEditableContent(props.content);
    }

    return(
        <>
            <div id="textContainer"
                style={{
                display: 'flex',
                alignItems: "center",
                justifyContent: "center",
                background: 'lightyellow',
                width: '150px',
                height: '150px',
                border: '0.1px solid black',
                position: 'absolute',
                top: position.y + 'px',
                left: position.x + 'px',
                cursor: isDragging ? 'grabbing' : 'grab',
                userSelect: isEditing ? "text" : "none",
            }} 
                onMouseDown={handleMouseDown} 
                onMouseMove={handleMouseMove} 
                onMouseUp={handleMouseUp}
                onMouseOver={handleMouseOver}
                onMouseOut={handleMouseOut}
                onDoubleClick={handleDoubleClick}
            >
                <textarea
                id="noteContent" 
                value={editableContent}
                readOnly={!isEditing}
                style={{
                    width: '100%',
                    height: '85%', 
                    boxSizing: 'border-box',
                    background: 'lightyellow',
                    margin: "15% 0 0 7.5%",
                    padding: 0,
                    border: 'none',
                    outline: 'none',
                    cursor: 'default',
                }}
                onChange={handleNoteChange}
                />
                {contextMenu}
            </div>
        </>
    )
}

export default DraggableDiv