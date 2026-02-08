import React, { useState } from 'react';

function LandingPage({ onStart }) {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div className="landing-page">
            {/* Animated background gradient */}
            <div className="landing-gradient" />

            {/* Floating hearts in background */}
            <div className="floating-hearts">
                {[...Array(20)].map((_, i) => (
                    <div
                        key={i}
                        className="floating-heart"
                        style={{
                            left: `${Math.random() * 100}%`,
                            animationDelay: `${Math.random() * 10}s`,
                            fontSize: `${1 + Math.random() * 2}rem`,
                            opacity: 0.1 + Math.random() * 0.3,
                        }}
                    >
                        ♥
                    </div>
                ))}
            </div>

            {/* Main content */}
            <div className="landing-content">
                {/* Title with elegant typography */}
                <div className="landing-title-container">
                    <span className="landing-subtitle">a story written in moments</span>
                    <h1 className="landing-title">For You, Pihu</h1>
                    <div className="landing-divider">
                        <span className="divider-heart">♥</span>
                    </div>
                </div>

                {/* Play button */}
                <button
                    className={`play-button ${isHovered ? 'hovered' : ''}`}
                    onClick={onStart}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                >
                    <div className="play-button-ring" />
                    <div className="play-button-ring ring-2" />
                    <div className="play-button-ring ring-3" />
                    <div className="play-icon">
                        <svg viewBox="0 0 24 24" fill="currentColor">
                            <path d="M8 5v14l11-7z" />
                        </svg>
                    </div>
                    <span className="play-text">Play Our Story</span>
                </button>

            </div>

            {/* Bottom section */}
            <div className="landing-bottom">
                <p className="landing-hint">
                    <span className="hint-icon">🎧</span>
                    Best experienced with headphones
                </p>
                <div className="landing-signature">
                    Made with all my heart
                </div>
            </div>
        </div>
    );
}

export default LandingPage;
