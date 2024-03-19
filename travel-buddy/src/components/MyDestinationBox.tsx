import React, { useEffect, useState } from 'react';
import '../styles/MyDestinationBox.css';
import WeatherDisplay from '../components/WeatherDisplay';
import Box from "@mui/material/Box";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import { Rating } from '@mui/material';

interface DestinationInterface {
    country: string;
    city: string;
    rating: any;
    imgURL: string;
    onReadMore?: () => void;
    isLoggedIn: boolean;
    review?: string;
    myRating?: string;
    averageRating: number;
}

// Note: The button must be alignes with the rating-stars when they are added
const MyDestinationBox: React.FC<DestinationInterface> = ({country, city, rating, imgURL, onReadMore, isLoggedIn, review, myRating, averageRating}) => {

    return (
        <div>
        <div className='outer-box'>
        <div className='box'>
            <img src={imgURL} alt="Error loading image" className='inner-div' />
            <div className='inner-div info-div'>
                <h1>{city}</h1>
                <h2>{country}</h2>
            </div>
            <div className='inner-div more-div'>
                <div className='rating-container'>
                <Rating name="half-rating" defaultValue={averageRating} precision={0.25} readOnly/>
                </div>
                <div className='weather-container'>
                    <WeatherDisplay country={country} city={city} />
                </div>
                
            </div>
            
            
        </div>
        </div>
            
            <div className='review-container'>
                <h3>Your review for {city}</h3>
                <Rating name="half-rating" defaultValue={rating} precision={0.5} readOnly/>
                {review && <p>{review}</p>}
            </div>
            
        </div>
        
        
    );
}

export default MyDestinationBox;
