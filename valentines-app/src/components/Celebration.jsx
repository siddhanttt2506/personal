import React, { useEffect, useState } from 'react';

function Celebration({ photos, name }) {
    const [stage, setStage] = useState(0);

    useEffect(() => {
        const timers = [
            setTimeout(() => setStage(1), 500),
            setTimeout(() => setStage(2), 1500),
            setTimeout(() => setStage(3), 2500),
        ];
        return () => timers.forEach(clearTimeout);
    }, []);

    return (
        <div className="celebration-scene">
            {/* Confetti explosion */}
            <div className="confetti-container">
                {[...Array(100)].map((_, i) => (
                    <div
                        key={i}
                        className="confetti"
                        style={{
                            left: `${Math.random() * 100}%`,
                            backgroundColor: ['#ff6b9d', '#a855f7', '#f4d03f', '#ff4757', '#5352ed'][Math.floor(Math.random() * 5)],
                            animationDelay: `${Math.random() * 3}s`,
                            animationDuration: `${3 + Math.random() * 2}s`,
                        }}
                    />
                ))}
            </div>

            {/* Hearts rain */}
            <div className="celebration-hearts">
                {[...Array(50)].map((_, i) => (
                    <span
                        key={i}
                        className="celebration-heart"
                        style={{
                            left: `${Math.random() * 100}%`,
                            animationDelay: `${Math.random() * 5}s`,
                            animationDuration: `${5 + Math.random() * 5}s`,
                            fontSize: `${1 + Math.random() * 2}rem`,
                        }}
                    >💗</span>
                ))}
            </div>

            {/* Main content */}
            <div className={`celebration-content ${stage >= 1 ? 'show' : ''}`}>
                {/* Big heart */}
                <div className="big-heart-container">
                    <span className="celebration-big-heart">❤️</span>
                </div>

                {/* Message */}
                <div className={`celebration-message ${stage >= 2 ? 'show' : ''}`}>
                    <h1 className="celebration-title">She Said Yes!</h1>
                    <h2 className="celebration-subtitle">Happy Valentines, {name}!</h2>
                    <p className="celebration-text">
                        You've made me the happiest person alive 💕
                    </p>
                </div>

                {/* Photos collage */}
                <div className={`celebration-photos ${stage >= 3 ? 'show' : ''}`}>
                    {photos.map((photo, index) => (
                        <div
                            key={index}
                            className="celebration-photo-wrapper"
                            style={{
                                animationDelay: `${index * 0.15}s`,
                                '--rotate': `${(index - 2) * 8}deg`,
                            }}
                        >
                            <img src={photo} alt={`Us ${index + 1}`} className="celebration-photo" />
                        </div>
                    ))}
                </div>

                {/* Final message */}
                <div className={`final-message ${stage >= 3 ? 'show' : ''}`}>
                    <p className="love-text">I Love You Forever 💕</p>
                </div>
            </div>

            {/* Floating emojis */}
            <div className="floating-emojis">
                {['💕', '💗', '💖', '💝', '❤️', '🥰', '😍', '💘'].map((emoji, i) => (
                    [...Array(5)].map((_, j) => (
                        <span
                            key={`${i}-${j}`}
                            className="floating-emoji"
                            style={{
                                left: `${Math.random() * 100}%`,
                                animationDelay: `${Math.random() * 10}s`,
                                animationDuration: `${8 + Math.random() * 7}s`,
                            }}
                        >{emoji}</span>
                    ))
                ))}
            </div>
        </div>
    );
}

export default Celebration;
