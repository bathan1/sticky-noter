import React, { useState } from 'react';

interface DraggableDivProps {
    content: string;
};

const DraggableDiv: React.FC<DraggableDivProps> = (props) => {
    const [isDragging, setIsDragging] = useState(false);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [initialPosition, setInitialPosition] = useState({ x: 0, y: 0 });

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

    return(
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
            onMouseDown={handleMouseDown} onMouseMove={handleMouseMove} onMouseUp={handleMouseUp}>
            {props.content}
        </div>
    )
}

export default DraggableDiv