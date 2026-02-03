import React, { useState } from 'react';
import GiftBox from './GiftBox';
import PhotoCarousel from './PhotoCarousel';
import Confetti from './Confetti';
import HeartBurst from './HeartBurst';

const CelebrationPage = () => {
    const [isOpened, setIsOpened] = useState(false);
    const [showBurst, setShowBurst] = useState(false);

    const handleOpen = () => {
        if (!isOpened) {
            setShowBurst(true);
            setTimeout(() => {
                setIsOpened(true);
                setShowBurst(false);
            }, 300);
        }
    };

    return (
        <div className="celebration-page">
            {isOpened && <Confetti />}
            {showBurst && <HeartBurst />}

            <div className="celebration-header">
                <h1>Yay! 🎉</h1>
                <p>I knew you'd say yes!</p>
            </div>

            <GiftBox isOpened={isOpened} onOpen={handleOpen} />

            {!isOpened && (
                <p className="tap-hint">Tap the gift to open it! 🎁</p>
            )}

            {isOpened && <PhotoCarousel />}

            {isOpened && (
                <div className="final-message">
                    <h2>I Love You 💕</h2>
                    <p>
                        Thank you for being my Valentine!<br />
                        You mean the world to me ❤️
                    </p>
                </div>
            )}
        </div>
    );
};

export default CelebrationPage;
