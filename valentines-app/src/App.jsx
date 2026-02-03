import React, { useState } from 'react';
import ScratchCard from './components/ScratchCard';
import CelebrationPage from './components/CelebrationPage';
import HeartBackground from './components/HeartBackground';

function App() {
    const [currentPage, setCurrentPage] = useState('scratch');
    const [showTransition, setShowTransition] = useState(false);

    const handleYesClick = () => {
        setShowTransition(true);
        setTimeout(() => {
            setCurrentPage('celebration');
            setShowTransition(false);
        }, 800);
    };

    return (
        <div className="app">
            <HeartBackground />
            <div className={`page-container ${showTransition ? 'transitioning' : ''}`}>
                {currentPage === 'scratch' && (
                    <ScratchCard onYesClick={handleYesClick} />
                )}
                {currentPage === 'celebration' && (
                    <CelebrationPage />
                )}
            </div>
        </div>
    );
}

export default App;
