import React, { useEffect, useState, useRef } from 'react';

function LyricScene({ scene, photos, videoSrc, currentTime, allPhotos }) {
    const [isVisible, setIsVisible] = useState(false);
    const [showPhoto, setShowPhoto] = useState(false);
    const videoRef = useRef(null);
    const prevSceneRef = useRef(null);

    useEffect(() => {
        if (prevSceneRef.current?.start !== scene?.start) {
            // Reset states for new scene
            setIsVisible(false);
            setShowPhoto(false);

            // Smooth fade in sequence
            const timer1 = setTimeout(() => setIsVisible(true), 200);
            const timer2 = setTimeout(() => setShowPhoto(true), 1500);

            prevSceneRef.current = scene;
            return () => {
                clearTimeout(timer1);
                clearTimeout(timer2);
            };
        }
    }, [scene]);

    useEffect(() => {
        if (scene?.type === 'video' && videoRef.current) {
            videoRef.current.currentTime = 0;
            videoRef.current.play().catch(console.error);
        }
    }, [scene?.type]);

    if (!scene) return null;

    // Professional CSS-only animations
    const renderVisual = () => {
        switch (scene.animation) {
            case 'sunrise':
                return (
                    <div className="visual sunrise-visual">
                        <div className="sun-glow" />
                        <div className="sun-orb" />
                        <div className="horizon-line" />
                    </div>
                );

            case 'time-passing':
                return (
                    <div className="visual time-visual">
                        <div className="time-circles">
                            <div className="time-circle c1" />
                            <div className="time-circle c2" />
                            <div className="time-circle c3" />
                        </div>
                        <div className="flowing-lines">
                            {[...Array(5)].map((_, i) => (
                                <div key={i} className="flow-line" style={{ '--i': i }} />
                            ))}
                        </div>
                    </div>
                );

            case 'heartbeat':
                return (
                    <div className="visual heartbeat-visual">
                        <div className="heart-shape" />
                        <div className="pulse-rings">
                            <div className="pulse-ring r1" />
                            <div className="pulse-ring r2" />
                            <div className="pulse-ring r3" />
                        </div>
                    </div>
                );

            case 'home':
                return (
                    <div className="visual home-visual">
                        <div className="home-glow" />
                        <div className="warmth-particles">
                            {[...Array(20)].map((_, i) => (
                                <div key={i} className="warmth-particle" style={{ '--i': i }} />
                            ))}
                        </div>
                    </div>
                );

            case 'reach':
                return (
                    <div className="visual reach-visual">
                        <div className="reach-lines">
                            <div className="reach-line left" />
                            <div className="reach-line right" />
                        </div>
                        <div className="connection-point" />
                    </div>
                );

            case 'infinite':
                return (
                    <div className="visual infinite-visual">
                        <div className="infinity-path">
                            <div className="infinity-glow" />
                        </div>
                        <div className="infinity-particles">
                            {[...Array(15)].map((_, i) => (
                                <div key={i} className="inf-particle" style={{ '--i': i }} />
                            ))}
                        </div>
                    </div>
                );

            case 'together':
                return (
                    <div className="visual together-visual">
                        <div className="silhouette-pair">
                            <div className="silhouette s1" />
                            <div className="silhouette s2" />
                        </div>
                        <div className="connection-aura" />
                    </div>
                );

            case 'comfort':
                return (
                    <div className="visual comfort-visual">
                        <div className="soft-waves">
                            {[...Array(4)].map((_, i) => (
                                <div key={i} className="wave" style={{ '--i': i }} />
                            ))}
                        </div>
                        <div className="gentle-glow" />
                    </div>
                );

            case 'present':
                return (
                    <div className="visual present-visual">
                        <div className="now-circle">
                            <div className="now-pulse" />
                            <div className="now-core" />
                        </div>
                        <div className="present-rays">
                            {[...Array(8)].map((_, i) => (
                                <div key={i} className="present-ray" style={{ '--i': i }} />
                            ))}
                        </div>
                    </div>
                );

            case 'memories':
                return (
                    <div className="visual memories-visual">
                        <div className="memory-frames">
                            {[...Array(5)].map((_, i) => (
                                <div key={i} className="memory-frame" style={{ '--i': i }} />
                            ))}
                        </div>
                        <div className="memory-glow" />
                    </div>
                );

            case 'float':
                return (
                    <div className="visual float-visual">
                        <div className="floating-elements">
                            {[...Array(12)].map((_, i) => (
                                <div key={i} className="float-element" style={{ '--i': i }} />
                            ))}
                        </div>
                        <div className="wind-lines">
                            {[...Array(5)].map((_, i) => (
                                <div key={i} className="wind-line" style={{ '--i': i }} />
                            ))}
                        </div>
                    </div>
                );

            case 'greatest':
                return (
                    <div className="visual greatest-visual">
                        <div className="star-burst">
                            {[...Array(20)].map((_, i) => (
                                <div key={i} className="star-ray" style={{ '--i': i }} />
                            ))}
                        </div>
                        <div className="golden-core" />
                        <div className="shimmer-overlay" />
                    </div>
                );

            default:
                return (
                    <div className="visual default-visual">
                        <div className="ambient-glow" />
                    </div>
                );
        }
    };

    // INTRO scene
    if (scene.type === 'intro') {
        return (
            <div className={`scene-container intro ${isVisible ? 'visible' : ''}`}>
                <div className="intro-backdrop" />
                <div className="intro-content">
                    <h1 className="intro-title">{scene.text}</h1>
                    <div className="intro-underline" />
                </div>
            </div>
        );
    }

    // BREATHE scene (instrumental)
    if (scene.type === 'breathe') {
        return (
            <div className={`scene-container breathe ${isVisible ? 'visible' : ''}`}>
                <div className="breathe-circle">
                    <div className="breathe-inner" />
                </div>
            </div>
        );
    }

    // VIDEO scene
    if (scene.type === 'video') {
        return (
            <div className={`scene-container video ${isVisible ? 'visible' : ''}`}>
                <div className="video-wrapper">
                    <video
                        ref={videoRef}
                        src={videoSrc}
                        className="story-video"
                        muted
                        playsInline
                    />
                    <div className="video-overlay" />
                </div>
                <p className="video-caption">{scene.text}</p>
            </div>
        );
    }

    // FINALE scene
    if (scene.type === 'finale') {
        return (
            <div className={`scene-container finale ${isVisible ? 'visible' : ''}`}>
                <h2 className="finale-title">{scene.text}</h2>
                <div className="finale-gallery">
                    {allPhotos.map((photo, index) => (
                        <div
                            key={index}
                            className="finale-photo"
                            style={{ '--i': index }}
                        >
                            <img src={photo} alt="" />
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    // LYRIC scene
    return (
        <div className={`scene-container lyric ${isVisible ? 'visible' : ''}`}>
            {/* Background visual */}
            <div className="visual-layer">
                {renderVisual()}
            </div>

            {/* Lyric text */}
            <div className="lyric-layer">
                <p className="lyric-text">"{scene.text}"</p>
            </div>

            {/* Photo reveal */}
            {scene.showPhoto !== undefined && (
                <div className={`photo-layer ${showPhoto ? 'visible' : ''}`}>
                    <div className="photo-card">
                        <img src={photos[scene.showPhoto]} alt="" />
                        <div className="photo-shine" />
                    </div>
                </div>
            )}
        </div>
    );
}

export default LyricScene;
