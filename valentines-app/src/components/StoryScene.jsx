import React, { useEffect, useState, useRef } from 'react';

function StoryScene({ scene, photos, videoSrc, currentTime }) {
    const [isVisible, setIsVisible] = useState(false);
    const videoRef = useRef(null);

    useEffect(() => {
        // Trigger entrance animation
        setIsVisible(false);
        const timer = setTimeout(() => setIsVisible(true), 100);
        return () => clearTimeout(timer);
    }, [scene]);

    // Handle video scene
    useEffect(() => {
        if (scene?.type === 'video' && videoRef.current) {
            videoRef.current.currentTime = 0;
            videoRef.current.play().catch(console.error);
        }
    }, [scene]);

    if (!scene) return null;

    // Intro scene
    if (scene.type === 'intro') {
        return (
            <div className={`scene intro-scene ${isVisible ? 'visible' : ''}`}>
                <div className="intro-content">
                    <div className="intro-sparkles">
                        {[...Array(30)].map((_, i) => (
                            <div
                                key={i}
                                className="sparkle"
                                style={{
                                    left: `${Math.random() * 100}%`,
                                    top: `${Math.random() * 100}%`,
                                    animationDelay: `${Math.random() * 3}s`,
                                }}
                            />
                        ))}
                    </div>
                    <h2 className="intro-title">{scene.title}</h2>
                    <div className="intro-pulse">
                        <div className="pulse-ring" />
                        <div className="pulse-heart">♥</div>
                    </div>
                </div>
            </div>
        );
    }

    // Photo scene
    if (scene.type === 'photo') {
        const photoUrl = photos[scene.photoIndex];

        return (
            <div className={`scene photo-scene ${scene.animation} ${isVisible ? 'visible' : ''}`}>
                {/* Background glow effect */}
                <div className="photo-glow" />

                {/* Photo container */}
                <div className={`photo-container ${scene.animation}`}>
                    {scene.animation === 'polaroid' ? (
                        <div className="polaroid-frame">
                            <img src={photoUrl} alt="Memory" className="scene-photo" />
                            <div className="polaroid-bottom">
                                <span className="polaroid-caption">Our Moment ♥</span>
                            </div>
                        </div>
                    ) : (
                        <div className="photo-frame">
                            <img src={photoUrl} alt="Memory" className="scene-photo" />
                            {scene.animation === 'heart-burst' && (
                                <div className="heart-burst-container">
                                    {[...Array(20)].map((_, i) => (
                                        <div
                                            key={i}
                                            className="burst-heart"
                                            style={{
                                                '--angle': `${(i * 18)}deg`,
                                                '--delay': `${i * 0.05}s`,
                                            }}
                                        >
                                            ♥
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}
                </div>

                {/* Floating particles around photo */}
                <div className="photo-particles">
                    {[...Array(15)].map((_, i) => (
                        <div
                            key={i}
                            className="photo-particle"
                            style={{
                                left: `${20 + Math.random() * 60}%`,
                                top: `${20 + Math.random() * 60}%`,
                                animationDelay: `${Math.random() * 2}s`,
                            }}
                        />
                    ))}
                </div>
            </div>
        );
    }

    // Video scene
    if (scene.type === 'video') {
        return (
            <div className={`scene video-scene ${isVisible ? 'visible' : ''}`}>
                <div className="video-frame">
                    <div className="video-vignette" />
                    <video
                        ref={videoRef}
                        src={videoSrc}
                        className="scene-video"
                        muted
                        playsInline
                        loop
                    />
                    <div className="video-caption">
                        <span className="caption-text">This moment... ♥</span>
                    </div>
                </div>

                {/* Soft hearts floating around video */}
                <div className="video-hearts">
                    {[...Array(10)].map((_, i) => (
                        <div
                            key={i}
                            className="video-heart"
                            style={{
                                left: `${10 + Math.random() * 80}%`,
                                animationDelay: `${Math.random() * 5}s`,
                            }}
                        >
                            ♥
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    return null;
}

export default StoryScene;
