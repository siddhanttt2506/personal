import React, { useState, useEffect } from 'react';

function FinaleScene({ photos, onReplay, name }) {
    const [stage, setStage] = useState(0);
    const [showMessage, setShowMessage] = useState(false);
    const [showPhotos, setShowPhotos] = useState(false);

    useEffect(() => {
        // Animate in stages
        const timer1 = setTimeout(() => setShowPhotos(true), 500);
        const timer2 = setTimeout(() => setShowMessage(true), 2000);
        const timer3 = setTimeout(() => setStage(1), 3500);

        return () => {
            clearTimeout(timer1);
            clearTimeout(timer2);
            clearTimeout(timer3);
        };
    }, []);

    return (
        <div className="scene finale-scene">
            {/* Animated background */}
            <div className="finale-gradient" />

            {/* Explosion of hearts */}
            <div className="finale-hearts-explosion">
                {[...Array(50)].map((_, i) => (
                    <div
                        key={i}
                        className="explosion-heart"
                        style={{
                            '--angle': `${Math.random() * 360}deg`,
                            '--distance': `${100 + Math.random() * 200}px`,
                            '--delay': `${Math.random() * 0.5}s`,
                            '--size': `${1 + Math.random() * 2}rem`,
                        }}
                    >
                        ♥
                    </div>
                ))}
            </div>

            {/* Photos in heart formation */}
            <div className={`finale-photos ${showPhotos ? 'visible' : ''}`}>
                {photos.map((photo, index) => {
                    // Position photos in a heart-like pattern
                    const positions = [
                        { top: '15%', left: '50%', transform: 'translate(-50%, 0) rotate(-5deg)' },
                        { top: '35%', left: '25%', transform: 'rotate(5deg)' },
                        { top: '35%', left: '65%', transform: 'rotate(-8deg)' },
                        { top: '55%', left: '35%', transform: 'rotate(3deg)' },
                        { top: '55%', left: '55%', transform: 'rotate(-3deg)' },
                    ];

                    return (
                        <div
                            key={index}
                            className="finale-photo-wrapper"
                            style={{
                                ...positions[index],
                                animationDelay: `${index * 0.2}s`,
                            }}
                        >
                            <img src={photo} alt={`Memory ${index + 1}`} className="finale-photo" />
                        </div>
                    );
                })}
            </div>

            {/* Love message */}
            <div className={`finale-message ${showMessage ? 'visible' : ''}`}>
                <div className="message-container">
                    <div className="message-hearts">
                        <span className="msg-heart left">♥</span>
                        <span className="msg-heart right">♥</span>
                    </div>
                    <h1 className="finale-title">I Love You</h1>
                    <h2 className="finale-name">{name}</h2>
                    <p className="finale-text">
                        Every moment with you is a treasure.<br />
                        You make my world complete. ♥
                    </p>

                    {stage >= 1 && (
                        <div className="finale-actions">
                            <button className="replay-button" onClick={onReplay}>
                                <span className="replay-icon">↻</span>
                                Watch Again
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {/* Continuous floating hearts */}
            <div className="finale-floating-hearts">
                {[...Array(30)].map((_, i) => (
                    <div
                        key={i}
                        className="finale-float-heart"
                        style={{
                            left: `${Math.random() * 100}%`,
                            animationDelay: `${Math.random() * 10}s`,
                            animationDuration: `${10 + Math.random() * 10}s`,
                            fontSize: `${0.5 + Math.random() * 1.5}rem`,
                            opacity: 0.3 + Math.random() * 0.4,
                        }}
                    >
                        ♥
                    </div>
                ))}
            </div>
        </div>
    );
}

export default FinaleScene;
