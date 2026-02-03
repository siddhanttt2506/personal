import React, { useRef, useEffect, useState } from 'react';

const ScratchCard = ({ onYesClick }) => {
    const canvasRef = useRef(null);
    const [isRevealed, setIsRevealed] = useState(false);
    const [scratchPercentage, setScratchPercentage] = useState(0);
    const isDrawingRef = useRef(false);
    const lastPosRef = useRef({ x: 0, y: 0 });

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        const rect = canvas.getBoundingClientRect();

        // Set canvas size to match display size
        canvas.width = rect.width * 2;
        canvas.height = rect.height * 2;
        ctx.scale(2, 2);

        // Create golden gradient overlay
        const gradient = ctx.createLinearGradient(0, 0, rect.width, rect.height);
        gradient.addColorStop(0, '#FFD700');
        gradient.addColorStop(0.5, '#FFC107');
        gradient.addColorStop(1, '#DAA520');

        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, rect.width, rect.height);

        // Add shimmer effect
        ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
        for (let i = 0; i < 5; i++) {
            ctx.beginPath();
            ctx.ellipse(
                Math.random() * rect.width,
                Math.random() * rect.height,
                30, 15, Math.PI / 4, 0, 2 * Math.PI
            );
            ctx.fill();
        }

        // Add text
        ctx.fillStyle = '#8B4513';
        ctx.font = 'bold 16px Poppins, sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('✨ Scratch Here ✨', rect.width / 2, rect.height / 2 - 10);
        ctx.font = '12px Poppins, sans-serif';
        ctx.fillText('to reveal a surprise', rect.width / 2, rect.height / 2 + 15);

        ctx.globalCompositeOperation = 'destination-out';
    }, []);

    const getPos = (e) => {
        const canvas = canvasRef.current;
        const rect = canvas.getBoundingClientRect();

        if (e.touches) {
            return {
                x: e.touches[0].clientX - rect.left,
                y: e.touches[0].clientY - rect.top
            };
        }
        return {
            x: e.clientX - rect.left,
            y: e.clientY - rect.top
        };
    };

    const scratch = (pos) => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');

        ctx.beginPath();
        ctx.arc(pos.x, pos.y, 25, 0, 2 * Math.PI);
        ctx.fill();

        // Draw line from last position for smooth scratching
        if (lastPosRef.current.x && lastPosRef.current.y) {
            ctx.lineWidth = 50;
            ctx.lineCap = 'round';
            ctx.beginPath();
            ctx.moveTo(lastPosRef.current.x, lastPosRef.current.y);
            ctx.lineTo(pos.x, pos.y);
            ctx.stroke();
        }

        lastPosRef.current = pos;
        checkScratchPercentage();
    };

    const checkScratchPercentage = () => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const pixels = imageData.data;

        let transparentPixels = 0;
        for (let i = 3; i < pixels.length; i += 4) {
            if (pixels[i] === 0) transparentPixels++;
        }

        const percentage = (transparentPixels / (pixels.length / 4)) * 100;
        setScratchPercentage(percentage);

        if (percentage > 40 && !isRevealed) {
            setIsRevealed(true);
        }
    };

    const handleStart = (e) => {
        e.preventDefault();
        isDrawingRef.current = true;
        const pos = getPos(e);
        lastPosRef.current = pos;
        scratch(pos);
    };

    const handleMove = (e) => {
        e.preventDefault();
        if (!isDrawingRef.current) return;
        scratch(getPos(e));
    };

    const handleEnd = () => {
        isDrawingRef.current = false;
        lastPosRef.current = { x: 0, y: 0 };
    };

    return (
        <div className="scratch-page">
            <div className="scratch-header">
                <h1>Hey Beautiful 💕</h1>
                <p>I have something special for you...</p>
            </div>

            <div className="scratch-card-container">
                <div className="scratch-card-revealed">
                    <div className="revealed-heart">💝</div>
                    <div className="revealed-text">
                        Will You Be<br />My Valentine?
                    </div>
                </div>

                <div className="scratch-overlay">
                    <canvas
                        ref={canvasRef}
                        className="scratch-canvas"
                        onMouseDown={handleStart}
                        onMouseMove={handleMove}
                        onMouseUp={handleEnd}
                        onMouseLeave={handleEnd}
                        onTouchStart={handleStart}
                        onTouchMove={handleMove}
                        onTouchEnd={handleEnd}
                    />
                </div>
            </div>

            <p className="scratch-instruction">
                {isRevealed ? "Now answer me... 👇" : "Use your finger to scratch ☝️"}
            </p>

            <button
                className={`yes-button ${isRevealed ? 'visible' : ''}`}
                onClick={onYesClick}
                disabled={!isRevealed}
            >
                YES! 💕
            </button>
        </div>
    );
};

export default ScratchCard;
