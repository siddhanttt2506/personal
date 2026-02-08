import React, { useState, useRef, useEffect, useCallback } from 'react';
import './App.css';

// Import components
import LandingPage from './components/LandingPage';
import LyricScene from './components/LyricScene';
import ValentineAsk from './components/ValentineAsk';
import Celebration from './components/Celebration';

// Import assets
import photo1 from './assets/photo1.jpeg';
import photo2 from './assets/photo2.jpeg';
import photo3 from './assets/photo3.jpeg';
import photo4 from './assets/photo4.jpeg';
import photo5 from './assets/photo5.jpeg';
import storyVideo from './assets/story-video.mp4';
import song from './assets/song.mp3';

// Photo assets
const photos = [
    photo1,
    photo2,
    photo3,
    photo4,
    photo5,
];

const videoSrc = storyVideo;
const songSrc = song;

// Skip first 17 seconds of song
const SONG_START_OFFSET = 17;

// Lyrics synced to EXACT timestamps from user
// Song offset: 17s | Experience time = Song time - 17
const lyricScenes = [
    // Title card (song 17-30s = experience 0-13s)
    { start: 0, end: 13, type: 'intro', text: 'A Story For You, Pihu' },

    // Verse 1 - EXACT timestamps from user
    { start: 13, end: 17, type: 'lyric', text: 'Watch the sunrise along the coast', animation: 'sunrise' },
    { start: 17, end: 22, type: 'lyric', text: "As we're both getting old", animation: 'time-passing', showPhoto: 0 },
    { start: 22, end: 28, type: 'lyric', text: "I can't describe what I'm feeling", animation: 'heartbeat', showPhoto: 1 },
    { start: 28, end: 34, type: 'lyric', text: "All I know is we're going home", animation: 'home', showPhoto: 2 },

    // "Don't let me go" part - ambient visuals
    { start: 34, end: 41, type: 'breathe', text: '' },

    // Chorus
    { start: 41, end: 50, type: 'lyric', text: "I don't care how long it takes", animation: 'infinite' },
    { start: 50, end: 58, type: 'lyric', text: "As long as I'm with you, I've got a smile on my face", animation: 'together', showPhoto: 3 },

    // "Save your tears" - ambient visuals
    { start: 58, end: 66, type: 'breathe', text: '' },

    // "All I know is you're here with me"
    { start: 66, end: 76, type: 'lyric', text: "You're here with me", animation: 'present', showPhoto: 4 },

    // Post-chorus instrumental
    { start: 76, end: 86, type: 'breathe', text: '' },

    // VIDEO at emotional moment (only once)
    { start: 86, end: 100, type: 'video', text: 'This moment... forever ours' },

    // Quick finale with all photos, then Valentine ask at ~song 130s (exp 113s)
    { start: 100, end: 113, type: 'finale', text: 'Our Story... Our Love' },

    // Valentine ask - starts at song 130s
    { start: 113, end: 999, type: 'valentine-ask' },
];

function App() {
    const [hasStarted, setHasStarted] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [currentScene, setCurrentScene] = useState(null);
    const [showCelebration, setShowCelebration] = useState(false);
    const audioRef = useRef(null);

    // Get current scene based on experience time (not song time)
    const getCurrentScene = useCallback((time) => {
        return lyricScenes.find(scene => time >= scene.start && time < scene.end);
    }, []);

    // Handle audio time updates
    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;

        const handleTimeUpdate = () => {
            // Convert song time to experience time (subtract offset)
            const experienceTime = audio.currentTime - SONG_START_OFFSET;
            setCurrentTime(experienceTime);
            const scene = getCurrentScene(experienceTime);
            if (scene) {
                setCurrentScene(scene);
            }
        };

        const handleEnded = () => {
            setCurrentScene({ type: 'valentine-ask' });
        };

        audio.addEventListener('timeupdate', handleTimeUpdate);
        audio.addEventListener('ended', handleEnded);

        return () => {
            audio.removeEventListener('timeupdate', handleTimeUpdate);
            audio.removeEventListener('ended', handleEnded);
        };
    }, [getCurrentScene]);

    // Start the experience - skip to 17 seconds
    const handleStart = async () => {
        try {
            if (audioRef.current) {
                audioRef.current.currentTime = SONG_START_OFFSET; // Start at 17 seconds
                await audioRef.current.play();
                setHasStarted(true);
            }
        } catch (error) {
            console.error('Audio play failed:', error);
        }
    };


    // Handle Valentine response
    const handleValentineResponse = (response) => {
        if (response === 'yes') {
            setShowCelebration(true);
        }
    };

    // Skip to Valentine ask (for testing)
    const skipToEnd = () => {
        if (audioRef.current) {
            audioRef.current.currentTime = SONG_START_OFFSET + 113;
        }
    };

    return (
        <div className="app">
            {/* Cinematic ambient background */}
            <div className="cinematic-bg">
                <div className="gradient-orb orb-1" />
                <div className="gradient-orb orb-2" />
                <div className="gradient-orb orb-3" />
            </div>

            {/* Subtle particles */}
            <div className="particles-layer">
                {[...Array(40)].map((_, i) => (
                    <div
                        key={i}
                        className="subtle-particle"
                        style={{
                            left: `${Math.random() * 100}%`,
                            animationDelay: `${Math.random() * 20}s`,
                            animationDuration: `${25 + Math.random() * 15}s`,
                        }}
                    />
                ))}
            </div>

            {/* Audio element */}
            <audio ref={audioRef} src={songSrc} preload="auto" />

            {/* Landing page */}
            {!hasStarted && <LandingPage onStart={handleStart} />}

            {/* Lyric scenes */}
            {hasStarted && currentScene && !showCelebration && currentScene.type !== 'valentine-ask' && (
                <LyricScene
                    scene={currentScene}
                    photos={photos}
                    videoSrc={videoSrc}
                    currentTime={currentTime}
                    allPhotos={photos}
                />
            )}

            {/* Valentine ask */}
            {hasStarted && currentScene && currentScene.type === 'valentine-ask' && !showCelebration && (
                <ValentineAsk onResponse={handleValentineResponse} />
            )}

            {/* Celebration */}
            {showCelebration && (
                <Celebration photos={photos} name="Pihu" />
            )}

            {/* Minimal progress indicator */}
            {hasStarted && !showCelebration && (
                <div className="progress-minimal">
                    <div
                        className="progress-fill"
                        style={{ width: `${Math.min((currentTime / 175) * 100, 100)}%` }}
                    />
                </div>
            )}

            {/* Skip button */}
            {hasStarted && !showCelebration && currentScene?.type !== 'valentine-ask' && (
                <button className="skip-btn" onClick={skipToEnd}>Skip to End</button>
            )}
        </div>
    );
}

export default App;
