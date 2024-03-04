import React, { useEffect, useState } from 'react';
import '../styles/DestinationBox.css';
import Box from "@mui/material/Box";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";

interface DestinationInterface {
    country: string;
    city: string;
    rating: string;
    imgURL: string;
    onReadMore?: () => void;
    isLoggedIn: boolean;
}

const starRating = () => {
    const [activeStar, setActiveStar] = useState(-1);
  const totalStars = 5;
  const activeStars = 3;
  const handleClick = (index: React.SetStateAction<number>) => {
    setActiveStar(index);
  };
  return (
    <Box
      sx={{
        display: "inline-flex",
        position: "relative",
        cursor: "pointer",
        textAlign: "left",
      }}
    >
      {[...new Array(totalStars)].map((arr, index) => {
        return (
          <Box
            position="relative"
            sx={{
              cursor: "pointer",
            }}
            onClick={() => handleClick(index)}
          >
            <Box
              sx={{
                width: index <= activeStar ? "100%" : "0%",
                overflow: "hidden",
                position: "absolute",
              }}
            >
              <StarIcon />
            </Box>
            <Box>
              <StarBorderIcon />
            </Box>
          </Box>
        );
      })}
    </Box>
  );
};

// Note: The button must be alignes with the rating-stars when they are added
const DestinationBox: React.FC<DestinationInterface> = ({country, city, rating, imgURL, onReadMore, isLoggedIn}) => {

    return (
        <div className='box'>
            <img src={imgURL} alt="Error loading image" className='inner-div' />
            <div className='inner-div info-div'>
                <h1>{city}</h1>
                <h2>{country}</h2>
            </div>
            <div className='inner-div more-div'>
                <div className='rating-container'>
                    <p>{starRating()}</p>
                </div>
                <div className="button-container">
                    <button onClick={isLoggedIn ? onReadMore : () => alert('Please log in to read more')}>
                    Read More</button>
                </div>
            </div>
        </div>
    );
}

export default DestinationBox;
