import React, { useState } from 'react';

interface Note {
    id: string,
    content: string,
};

interface DraggableDivProps {
    content: string,
    notes: Note[],
    setNotes: React.Dispatch<React.SetStateAction<Note[]>>,
    id: string,
};

const DraggableDiv: React.FC<DraggableDivProps> = (props) => {
    const [isDragging, setIsDragging] = useState(false);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [initialPosition, setInitialPosition] = useState({ x: 0, y: 0 });
    const [contextMenuVisible, setContextMenuVisible] = useState(false);

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

    const contextMenu = (
        <div
            className="context-menu"
            style={{ position: 'absolute', top: position.y + 'px', left: position.x + 'px', display: contextMenuVisible ? 'block' : 'none' }}
        >
            <button onClick={handleDeleteClick}>X</button>
        </div>
    )

    return(
        <div>
            <div 
                style={{
                width: '100px',
                height: '100px',
                background: 'lightyellow',
                border: '2px solid black',
                position: 'absolute',
                top: position.y + 'px',
                left: position.x + 'px',
                cursor: isDragging ? 'grabbing' : 'grab',
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