import React, { useEffect, useState } from 'react';
import '../styles/DestinationModal.css';
import firebaseControl from '../app/firebaseControl';
import { DocumentData } from 'firebase/firestore';
import Box from "@mui/material/Box";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import { User } from 'firebase/auth';



interface DestinationInterface {
    id: string;
    country: string;
    city: string;
    rating: string;
    tags: string[];
    description: string;
    imgURL: string;
    user: User | undefined;
    onClose?: () => void;
}



// Note: The button must be alignes with the rating-stars when they are added
const DestinationModal: React.FC<DestinationInterface> = ({ id, country, city, rating, tags, description, imgURL, user, onClose }) => {
    const [reviewList, setReviewList] = useState<DocumentData[]>([]);
    const firebasecontroller = new firebaseControl();
    const [activeStar, setActiveStar] = useState(-1);
    const totalStars = 5;
    const [comment, setComment] = useState<string>("");
    const [hasReviewed, setHasReviewed] = useState<boolean>(false);

    useEffect(() => {
        firebasecontroller.getReviewsForDestination(id).then((reviews) => {
            setReviewList(JSON.parse(JSON.stringify(reviews)));
        });
    }, []);

    useEffect(() => {
        if (user) {
            if (reviewList.filter(review => review.userID === user.uid).length !== 0) {
                console.log("hei");
                setHasReviewed(true);
            }
        }
    }, [reviewList]);

    const handleCommentChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
        setComment(event.target.value);
    }

    const submitReview = () => {
        if (user && !hasReviewed) {
            firebasecontroller.addReview(id, activeStar + 1, comment, user.uid)
        }
    }

    const starRating = () => {
        
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
    

    return (
        <div id='modal-container' className='not-blur'>
            <button id='x-button' onClick={onClose} className='not-blur'>X</button>
            <img src={imgURL} alt="Error" className='not-blur' />
            <div id='info-container' className='not-blur'>
                <div id='title-container' className='not-blur'>
                    <h1 className='not-blur'>{city}, {country}</h1>
                </div>
                <div id='myrating-container' className='addPadding not-blur'>
                    My rating:
                    <div id="starRating" className='not-blur'>
                        {starRating()}
                    </div>
                    <textarea id="review-destinations" rows={1} value={comment} onChange={handleCommentChange} placeholder="Optional comment"></textarea>
                    <button id="submit-review" className="addPadding not-blur"  onClick={submitReview}>Submit</button>
                </div>
                <div id="rating-container" className='addPadding not-blur'>
                    {rating ? 'Rating: ' + rating : 'This destination does not have a rating yet'}
                </div>
                <div id='tag-container' className='addPadding not-blur'>
                    {tags.length ? 'Tags: ' + tags?.join(", ") : 'There are no tags for this destination'}
                </div>
                <div id="description-container" className='addPadding not-blur'>
                    {description ? description : 'No description for this destiantion'}
                </div>
            </div>
        </div>
    );
}

export default DestinationModal;
