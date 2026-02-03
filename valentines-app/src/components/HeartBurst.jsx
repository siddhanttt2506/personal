import React from 'react';

const HeartBurst = () => {
    const hearts = [];
    const count = 12;

    for (let i = 0; i < count; i++) {
        const angle = (i / count) * 2 * Math.PI;
        const distance = 80 + Math.random() * 40;
        const tx = Math.cos(angle) * distance;
        const ty = Math.sin(angle) * distance;

        hearts.push({
            id: i,
            tx,
            ty,
            emoji: ['❤️', '💕', '💖', '💗', '💝'][Math.floor(Math.random() * 5)]
        });
    }

    return (
        <div className="heart-burst">
            {hearts.map(heart => (
                <div
                    key={heart.id}
                    className="burst-heart"
                    style={{
                        '--tx': `${heart.tx}px`,
                        '--ty': `${heart.ty}px`,
                    }}
                >
                    {heart.emoji}
                </div>
            ))}
        </div>
    );
};

export default HeartBurst;
