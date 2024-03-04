import React, { useEffect, useState } from 'react';
import '../styles/DestinationModal.css';
import firebaseControl from '../app/firebaseControl';
import { DocumentData } from 'firebase/firestore';
import { User } from 'firebase/auth';
import { Rating } from '@mui/material';



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
    const [activeStar, setActiveStar] = useState<number>(2.5);
    const [comment, setComment] = useState<string>("");
    const [hasReviewed, setHasReviewed] = useState<boolean>(false);
    const firebasecontroller = new firebaseControl();

    useEffect(() => {
        firebasecontroller.getReviewsForDestination(id).then((reviews) => {
            setReviewList(JSON.parse(JSON.stringify(reviews)));
        });
    }, []);

    useEffect(() => {
        if (user) {
            if (reviewList.filter(review => review.email === user.email).length !== 0) {
                setHasReviewed(true);
            }
        }
    }, [reviewList]);

    const handleCommentChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
        setComment(event.target.value);
    }

    const submitReview = () => {
        if (user && !hasReviewed) {
            firebasecontroller.addReview(id, activeStar, comment, user.email);
        }
        firebasecontroller.getReviewsForDestination(id).then((reviews) => {
            setReviewList(JSON.parse(JSON.stringify(reviews)));
        });
    } 

    return (
        <div id='modal-container' className='not-blur'>
            <button id='x-button' onClick={onClose} className='not-blur'>X</button>
            <img src={imgURL} alt="Error" className='not-blur' />
            <div id='info-container' className='not-blur'>
                <div id='title-container' className='not-blur'>
                    <h1 className='not-blur'>{city}, {country}</h1>
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
                {!hasReviewed && 
                    <div id='myrating-container' className='addPadding not-blur'>
                        Add review:
                        <div id="starRating" className='not-blur'>
                            <Rating name="half-rating" defaultValue={2.5} precision={0.5} onChange={(event, value) => setActiveStar(value as number)}/> 
                        </div>
                        <textarea id="review-destinations" rows={1} value={comment} onChange={handleCommentChange} placeholder="Optional comment"></textarea>
                        <button id="submit-review" className="addPadding not-blur"  onClick={submitReview}>Submit</button>
                    </div>
                }
                {reviewList.filter(review => review.comment !== "").length != 0 && 
                    <div id="reviewfeed-container" className='addPadding not-blur'>
                        <h3>Reviews</h3>
                        {reviewList.filter(review => review.comment !== "").map((review) => (
                            <div className='singlereview-container'>
                                <hr/>
                                <div style={{marginBottom: '5px'}}>{review.email}</div>
                                <Rating name="half-rating" defaultValue={review.rating} precision={0.5} readOnly/> 
                                <div>{review.comment}</div>
                            </div>
                        ))
                        }
                    </div>
                }
            </div>
        </div>
    );
}

export default DestinationModal;
