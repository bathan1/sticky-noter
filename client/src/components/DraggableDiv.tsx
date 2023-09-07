import React, { useState } from 'react';

const DraggableDiv: React.FC = () => {
    const [isDragging, setIsDragging] = useState(false);
    const [position, setPosition] = useState({ x: 0, y: 0 });

    const handleMouseDown = (event: React.MouseEvent) => {
        setIsDragging(true);
    };

    const handleMouseMove = (event: React.MouseEvent) => {
        if (isDragging) {
            setPosition({
                x: event.clientX,
                y: event.clientY
            });
        }
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };

    return(
        <div style={{
            width: '100px',
            height: '100px',
            background: 'lightblue',
            position: 'absolute',
            top: position.y + 'px',
            left: position.x + 'px',
            cursor: isDragging ? 'grabbing' : 'grab',
          }} onMouseDown={handleMouseDown} onMouseMove={handleMouseMove} onMouseUp={handleMouseUp}>Drag me</div>
    )
}

export default DraggableDiv