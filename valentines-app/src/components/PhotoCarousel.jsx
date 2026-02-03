import React, { useState } from 'react';

// REPLACE THESE WITH YOUR OWN PHOTOS!
// Upload photos to Imgur or any image hosting and paste URLs here
const photos = [
    {
        url: 'https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=400&h=500&fit=crop',
        caption: 'You are my sunshine ☀️'
    },
    {
        url: 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=400&h=500&fit=crop',
        caption: 'Every moment with you is magical ✨'
    },
    {
        url: 'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=400&h=500&fit=crop',
        caption: 'My favorite person 💕'
    },
    {
        url: 'https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?w=400&h=500&fit=crop',
        caption: 'Forever and always 💖'
    },
    {
        url: 'https://images.unsplash.com/photo-1501901609772-df0848060b33?w=400&h=500&fit=crop',
        caption: 'You complete me 💝'
    }
];

const PhotoCarousel = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);

    const goTo = (index) => {
        if (isAnimating || index === currentIndex) return;
        setIsAnimating(true);
        setCurrentIndex(index);
        setTimeout(() => setIsAnimating(false), 500);
    };

    const goNext = () => {
        const nextIndex = (currentIndex + 1) % photos.length;
        goTo(nextIndex);
    };

    const goPrev = () => {
        const prevIndex = (currentIndex - 1 + photos.length) % photos.length;
        goTo(prevIndex);
    };

    return (
        <div className="photo-carousel">
            <div className="photo-container">
                {photos.map((photo, index) => {
                    const offset = index - currentIndex;
                    const isActive = index === currentIndex;

                    return (
                        <div
                            key={index}
                            className="photo-card"
                            style={{
                                transform: `
                  translateX(${offset * 15}px) 
                  translateZ(${isActive ? 0 : -100}px) 
                  rotateY(${offset * 5}deg)
                  scale(${isActive ? 1 : 0.9})
                `,
                                opacity: Math.abs(offset) > 1 ? 0 : 1 - Math.abs(offset) * 0.3,
                                zIndex: isActive ? 10 : 10 - Math.abs(offset),
                                pointerEvents: isActive ? 'auto' : 'none'
                            }}
                            onClick={goNext}
                        >
                            <img src={photo.url} alt={`Memory ${index + 1}`} />
                            <div className="photo-caption">
                                <p>{photo.caption}</p>
                            </div>
                        </div>
                    );
                })}
            </div>

            <div className="carousel-arrows">
                <button className="arrow-btn" onClick={goPrev}>←</button>
                <button className="arrow-btn" onClick={goNext}>→</button>
            </div>

            <div className="carousel-nav">
                {photos.map((_, index) => (
                    <div
                        key={index}
                        className={`nav-dot ${index === currentIndex ? 'active' : ''}`}
                        onClick={() => goTo(index)}
                    />
                ))}
            </div>
        </div>
    );
};

export default PhotoCarousel;
