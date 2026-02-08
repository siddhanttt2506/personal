import React, { useEffect, useState } from 'react';

const HeartBackground = () => {
    const [hearts, setHearts] = useState([]);

    useEffect(() => {
        const createHeart = () => {
            const id = Date.now() + Math.random();
            const heart = {
                id,
                left: Math.random() * 100,
                animationDuration: 4 + Math.random() * 4,
                size: 14 + Math.random() * 16,
                delay: Math.random() * 2,
                emoji: ['♥', '♡', '✦', '♥', '♡', '✧'][Math.floor(Math.random() * 6)]
            };

            setHearts(prev => [...prev, heart]);

            setTimeout(() => {
                setHearts(prev => prev.filter(h => h.id !== id));
            }, (heart.animationDuration + heart.delay) * 1000);
        };

        for (let i = 0; i < 8; i++) {
            setTimeout(createHeart, i * 300);
        }

        const interval = setInterval(createHeart, 800);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="heart-background">
            {hearts.map(heart => (
                <div
                    key={heart.id}
                    className="floating-heart"
                    style={{
                        left: `${heart.left}%`,
                        fontSize: `${heart.size}px`,
                        animationDuration: `${heart.animationDuration}s`,
                        animationDelay: `${heart.delay}s`,
                    }}
                >
                    {heart.emoji}
                </div>
            ))}
        </div>
    );
};

export default HeartBackground;
