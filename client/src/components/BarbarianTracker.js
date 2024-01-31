import React, { useState, useEffect } from 'react';

const BarbarianTracker = () => {
    const [position, setPosition] = useState(0);

    const handleKeyPress = (event) => {
        if (event.key === 'b' || event.key === 'B') {
            setPosition((prevPosition) => (prevPosition + 1) % 8);
        }
    };

    useEffect(() => {
        window.addEventListener('keydown', handleKeyPress);

        return () => {
            window.removeEventListener('keydown', handleKeyPress);
        };
    }, []);

    return (
        <div className="barbarian-tracker">
            {[...Array(8)].map((_, index) => (
                <div key={index} id={`circle-${index}`} className={`circle ${position === index ? 'active' : ''}`} style={{ top: `${index * 12.5}%` }}></div>
            ))}
            <div className="ship" style={{ top: `${(position * 12.5) - 10}%`, left: position % 3 === 0 ? '-10px' : position % 3 === 1 ? '40px' : '80px' }}></div>
        </div>
    );
    
};

export default BarbarianTracker;
