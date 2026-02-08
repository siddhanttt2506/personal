import React, { useState } from 'react';

function ValentineAsk({ onResponse }) {
    const [noButtonPosition, setNoButtonPosition] = useState({ x: 0, y: 0 });
    const [noHoverCount, setNoHoverCount] = useState(0);
    const [showHearts, setShowHearts] = useState(false);

    // Make the "No" button run away!
    const handleNoHover = () => {
        const newX = (Math.random() - 0.5) * 200;
        const newY = (Math.random() - 0.5) * 200;
        setNoButtonPosition({ x: newX, y: newY });
        setNoHoverCount(prev => prev + 1);
    };

    const handleYesClick = () => {
        setShowHearts(true);
        setTimeout(() => {
            onResponse('yes');
        }, 500);
    };

    const noMessages = [
        "No 🙁",
        "Are you sure?",
        "Really sure?",
        "Think again!",
        "Please? 🥺",
        "Pretty please?",
        "With a cherry on top?",
        "Just say yes!",
        "Come on...",
        "I'll be sad 😢",
    ];

    return (
        <div className="valentine-ask-scene">
            {/* Background hearts */}
            <div className="ask-bg-hearts">
                {[...Array(30)].map((_, i) => (
                    <span
                        key={i}
                        className="bg-heart"
                        style={{
                            left: `${Math.random() * 100}%`,
                            animationDelay: `${Math.random() * 10}s`,
                            animationDuration: `${10 + Math.random() * 10}s`,
                            fontSize: `${1 + Math.random() * 2}rem`,
                            opacity: 0.2 + Math.random() * 0.3,
                        }}
                    >💗</span>
                ))}
            </div>

            {/* Main content */}
            <div className="ask-content">
                {/* Decorative hearts */}
                <div className="ask-decoration">
                    <span className="deco-heart left">💕</span>
                    <span className="deco-heart right">💕</span>
                </div>

                {/* Question */}
                <div className="ask-question">
                    <h1 className="ask-title">Pihu...</h1>
                    <h2 className="ask-subtitle">Will You Be My Valentine?</h2>
                    <div className="ask-heart-container">
                        <span className="big-heart-emoji">❤️</span>
                    </div>
                </div>

                {/* Buttons */}
                <div className="ask-buttons">
                    <button
                        className="yes-button"
                        onClick={handleYesClick}
                    >
                        <span className="btn-heart">💗</span>
                        Yes, I'd love to!
                        <span className="btn-heart">💗</span>
                    </button>

                    <button
                        className="no-button"
                        style={{
                            transform: `translate(${noButtonPosition.x}px, ${noButtonPosition.y}px)`,
                        }}
                        onMouseEnter={handleNoHover}
                        onTouchStart={handleNoHover}
                    >
                        {noMessages[Math.min(noHoverCount, noMessages.length - 1)]}
                    </button>
                </div>

                {/* Playful message after hovering No */}
                {noHoverCount > 3 && (
                    <p className="playful-message">
                        {noHoverCount > 7
                            ? "Just give up and say YES! 😂💕"
                            : "The No button seems to be running away... 🤭"}
                    </p>
                )}
            </div>

            {/* Hearts explosion on Yes */}
            {showHearts && (
                <div className="yes-hearts-explosion">
                    {[...Array(50)].map((_, i) => (
                        <span
                            key={i}
                            className="explosion-heart"
                            style={{
                                '--angle': `${Math.random() * 360}deg`,
                                '--distance': `${100 + Math.random() * 300}px`,
                                '--delay': `${Math.random() * 0.3}s`,
                            }}
                        >💗</span>
                    ))}
                </div>
            )}
        </div>
    );
}

export default ValentineAsk;
