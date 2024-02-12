import React, { FC } from 'react';
import '../styles/DestinationBox.css';

// Note: The button must be alignes with the rating-stars when they are added
const DestinationBox = () => {
    return (
        <div className='box'>
            <div className='inner-div image-container'>
            </div>
            <div className='inner-div info-div'>
                <h1>Title</h1>
                <h2>Nation</h2>
            </div>
            <div className='inner-div more-div'>
                <div className='rating-container'>
                    Here comes rating
                </div>
                <div className="button-container">
                    <button>Read More</button>
                </div>
            </div>
        </div>
    );
}

export default DestinationBox;
