import React, { useState } from 'react';
import GiftBox from './GiftBox';
import PhotoCarousel from './PhotoCarousel';
import Confetti from './Confetti';
import HeartBurst from './HeartBurst';

const CelebrationPage = () => {
    const [phase, setPhase] = useState('gift'); // 'gift', 'explosion', 'photos'
    const [showBurst, setShowBurst] = useState(false);

    const handleOpen = () => {
        if (phase === 'gift') {
            // Start explosion
            setShowBurst(true);
            setPhase('explosion');

            // After explosion, transition to photos
            setTimeout(() => {
                setPhase('photos');
                setShowBurst(false);
            }, 1500);
        }
    };

    return (
        <div className={`celebration-page phase-${phase}`}>
            {phase === 'photos' && <Confetti />}
            {showBurst && <HeartBurst />}

            {/* GIFT PHASE */}
            {phase === 'gift' && (
                <div className="gift-phase">
                    <div className="celebration-header">
                        <h1>Yay! 🎉</h1>
                        <p>I knew you'd say yes!</p>
                    </div>

                    <GiftBox isOpened={false} onOpen={handleOpen} />

                    <p className="tap-hint">Tap the gift to open it! 🎁</p>
                </div>
            )}

            {/* EXPLOSION PHASE */}
            {phase === 'explosion' && (
                <div className="explosion-phase">
                    <div className="mega-explosion">
                        {[...Array(30)].map((_, i) => (
                            <div
                                key={i}
                                className="explosion-heart"
                                style={{
                                    '--angle': `${(i / 30) * 360}deg`,
                                    '--delay': `${Math.random() * 0.3}s`,
                                    '--distance': `${150 + Math.random() * 100}px`
                                }}
                            >
                                {['❤️', '💕', '💖', '💗', '💝', '🌹', '✨'][i % 7]}
                            </div>
                        ))}
                    </div>
                    <div className="explosion-text">
                        <span>💝</span>
                    </div>
                </div>
            )}

            {/* PHOTOS PHASE */}
            {phase === 'photos' && (
                <div className="photos-phase">
                    <div className="celebration-header small">
                        <h1>Our Memories 💕</h1>
                    </div>

                    <PhotoCarousel />

                    <div className="final-message">
                        <h2>I Love You 💕</h2>
                        <p>
                            Thank you for being my Valentine!<br />
                            You mean the world to me ❤️
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CelebrationPage;
