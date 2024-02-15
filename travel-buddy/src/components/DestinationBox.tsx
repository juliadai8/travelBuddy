import React from 'react';
import '../styles/DestinationBox.css';

interface DestinationInterface {
    country?: string;
    city?: string;
    rating?: string;
    imgURL?: string;
    onReadMore?: () => void;
}

// Note: The button must be alignes with the rating-stars when they are added
const DestinationBox: React.FC<DestinationInterface> = ({country, city, rating, imgURL, onReadMore}) => {

    return (
        <div className='box'>
            <img src={imgURL} alt="Error loading image" className='inner-div' />
            <div className='inner-div info-div'>
                <h1>{country}</h1>
                <h2>{city}</h2>
            </div>
            <div className='inner-div more-div'>
                <div className='rating-container'>
                    <p>{rating}</p>
                </div>
                <div className="button-container">
                    <button onClick={onReadMore}>Read More</button>
                </div>
            </div>
        </div>
    );
}

export default DestinationBox;
