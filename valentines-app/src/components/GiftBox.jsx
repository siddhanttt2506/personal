import React from 'react';

const GiftBox = ({ isOpened, onOpen }) => {
    return (
        <div
            className={`gift-box-container ${isOpened ? 'opened' : ''}`}
            onClick={onOpen}
        >
            <div className="gift-box">
                <div className="gift-box-lid">
                    <div className="gift-bow">
                        <div className="bow-loop left"></div>
                        <div className="bow-loop right"></div>
                        <div className="bow-center"></div>
                    </div>
                </div>
                <div className="gift-box-body"></div>
            </div>
        </div>
    );
};

export default GiftBox;
