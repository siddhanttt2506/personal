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

                {/* Tap to start prompt */}
                <div className="tap-prompt">
                    <p>Tap anywhere to start</p>
                </div>

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
