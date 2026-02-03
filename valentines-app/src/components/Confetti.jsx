import React, { useEffect, useState } from 'react';

const Confetti = () => {
    const [pieces, setPieces] = useState([]);

    useEffect(() => {
        const colors = ['#FF6B95', '#E63946', '#FFD700', '#FFD6E0', '#FF69B4', '#FFC0CB'];
        const shapes = ['■', '●', '▲', '★', '💕', '❤️'];

        const createConfetti = () => {
            const newPieces = [];
            for (let i = 0; i < 50; i++) {
                newPieces.push({
                    id: i,
                    left: Math.random() * 100,
                    color: colors[Math.floor(Math.random() * colors.length)],
                    shape: shapes[Math.floor(Math.random() * shapes.length)],
                    size: 8 + Math.random() * 12,
                    delay: Math.random() * 2,
                    duration: 3 + Math.random() * 2
                });
            }
            setPieces(newPieces);
        };

        createConfetti();

        // Create more confetti periodically
        const interval = setInterval(() => {
            createConfetti();
        }, 5000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="confetti-container">
            {pieces.map(piece => (
                <div
                    key={piece.id}
                    className="confetti"
                    style={{
                        left: `${piece.left}%`,
                        color: piece.color,
                        fontSize: `${piece.size}px`,
                        animationDuration: `${piece.duration}s`,
                        animationDelay: `${piece.delay}s`,
                    }}
                >
                    {piece.shape}
                </div>
            ))}
        </div>
    );
};

export default Confetti;
