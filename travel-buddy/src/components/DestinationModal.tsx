/* import React, { useEffect, useState } from 'react';
import '../styles/DestinationModal.css';
import firebaseControl from '../app/firebaseControl';
import { DocumentData } from 'firebase/firestore';
import { User } from 'firebase/auth';

interface DestinationInterface {
    id: string;
    country: string;
    city: string;
    rating: string;
    tags: string[];
    description: string;
    imgURL: string;
    onClose?: () => void;
    user: User;
    destinationIDs: string;
    onFilterChange: (selectedDestinations: string[]) => void;
}

const DestinationModal: React.FC<DestinationInterface> = ({
    id,
    country,
    city,
    rating,
    tags,
    description,
    imgURL,
    onClose,
    user,
    destinationIDs,
    onFilterChange,
}) => {
    const [reviewList, setReviewList] = useState<DocumentData[]>([]);
    const [selectedDestinations, setSelectedDestinations] = useState<string[]>([]);

    useEffect(() => {
        const firebasecontroller = new firebaseControl();
        firebasecontroller.getReviewsForDestination(id).then((reviews) => {
            setReviewList(JSON.parse(JSON.stringify(reviews)));
        });
    }, []);

    const handleBeenHere = async () => {
        try {
            const firebasecontroller = new firebaseControl();
            await firebasecontroller.setUser(user.uid, id);
            console.log("Destination added to user's list:", id);
        } catch (error) {
            console.error("Error adding destination to user's list:", error);
        }
    };

    const handleHaveBeen = (id: string) => {
        const isSelected = selectedDestinations.includes(id);
        const newSelectedDestinations = isSelected
            ? selectedDestinations.filter(t => t !== id)
            : [...selectedDestinations, id];
        setSelectedDestinations(newSelectedDestinations);
        onFilterChange(newSelectedDestinations);
    };

    return (
        <div id='modal-container' className='not-blur'>
            <button id='x-button' onClick={onClose} className='not-blur'>X</button>
            <img src={imgURL} alt="Error" className='not-blur'/>
            <div id='info-container' className='not-blur'>
                <div id='title-container' className='not-blur'>
                    <h1 className='not-blur'>
                    {city}, {country}
                    </h1>

                    <div id="checkbox-container" className='not-blur'>
                            <label>
                                <input
                                    type="checkbox"
                                    checked={selectedDestinations.includes(id)}
                                    onChange={() => handleHaveBeen(id)}
                                />
                               I've been here
                            </label>
                        </div>
                    </div>
                </div>

                <div id="rating-container" className='addPadding not-blur'>
                    {rating ? 'Rating: ' + rating : 'This destination does not have a rating yet'}
                </div>
                <div id='tag-container' className='addPadding not-blur'>
                    {tags.length ? 'Tags: ' + tags?.join(", ") : 'There are no tags for this destination'}
                </div>
                <div id="description-container" className='addPadding not-blur'>
                    {description ? description : 'No description for this destination'}
                </div>
            </div>


            
    );
};

export default DestinationModal; */

import React, { useEffect, useState } from 'react';
import '../styles/DestinationModal.css';
import firebaseControl from '../app/firebaseControl';
import { DocumentData } from 'firebase/firestore';
import { User } from 'firebase/auth';

interface DestinationInterface {
    id: string;
    country: string;
    city: string;
    rating: string;
    tags: string[];
    description: string;
    imgURL: string;
    onClose?: () => void;
    user: User;
    destinationIDs: string;
    onFilterChange: (selectedDestinations: string[]) => void;
}

const DestinationModal: React.FC<DestinationInterface> = ({
    id,
    country,
    city,
    rating,
    tags,
    description,
    imgURL,
    onClose,
    user,
    destinationIDs,
    onFilterChange,
}) => {
    const [reviewList, setReviewList] = useState<DocumentData[]>([]);
    const [selectedDestinations, setSelectedDestinations] = useState<string[]>([]);
    const [beenHere, setBeenHere] = useState<boolean>(false);

    useEffect(() => {
        const firebasecontroller = new firebaseControl();
        firebasecontroller.getReviewsForDestination(id).then((reviews) => {
            setReviewList(JSON.parse(JSON.stringify(reviews)));
        });
    }, []);

    useEffect(() => {
        setBeenHere(destinationIDs.includes(id));
    }, [destinationIDs, id]);

    const handleBeenHere = async () => {
        try {
            const firebasecontroller = new firebaseControl();
            if (beenHere) {
                await firebasecontroller.removeUserDestination(user.uid, id); // Remove the destination from user's list
            } else {
                await firebasecontroller.setUser(user.uid, id); // Add the destination to user's list
            }
            setBeenHere(!beenHere); // Toggle the state
            console.log("Destination state updated:", !beenHere);
        } catch (error) {
            console.error("Error updating destination state:", error);
        }
    };

    const handleHaveBeen = (id: string) => {
        const isSelected = selectedDestinations.includes(id);
        const newSelectedDestinations = isSelected
            ? selectedDestinations.filter(t => t !== id)
            : [...selectedDestinations, id];
        setSelectedDestinations(newSelectedDestinations);
        onFilterChange(newSelectedDestinations);
    };

    return (
        <div id='modal-container' className='not-blur'>
            <button id='x-button' onClick={onClose} className='not-blur'>X</button>
            <img src={imgURL} alt="Error" className='not-blur'/>
            <div id='info-container' className='not-blur'>
                <div id='title-container' className='not-blur'>
                    <h1 className='not-blur'>
                    {city}, {country}
                    </h1>

                    <input
                        type="checkbox"
                        checked={beenHere}
                        onChange={handleBeenHere}
                    />
                    <label>I've been here</label>

                </div>
                <div id="rating-container" className='addPadding not-blur'>
                    {rating ? 'Rating: ' + rating : 'This destination does not have a rating yet'}
                </div>
                <div id='tag-container' className='addPadding not-blur'>
                    {tags.length ? 'Tags: ' + tags?.join(", ") : 'There are no tags for this destination'}
                </div>
                <div id="description-container" className='addPadding not-blur'>
                    {description ? description : 'No description for this destination'}
                </div>
            </div>
        </div>
    );
};

export default DestinationModal;











/* import React, { useEffect, useState } from 'react';
import '../styles/DestinationModal.css';
import firebaseControl from '../app/firebaseControl';
import { DocumentData } from 'firebase/firestore';
import { User } from 'firebase/auth';

interface DestinationInterface {
    id: string;
    country: string;
    city: string;
    rating: string;
    tags: string[];
    description: string;
    imgURL: string;
    onClose?: () => void;
    user: User;
    destinationIDs: string;
    onFilterChange: (selectedDestinations: string[]) => string;
}

// Note: The button must be alignes with the rating-stars when they are added
const DestinationModal: React.FC<DestinationInterface> = ({
    id, 
    country, 
    city, 
    rating, 
    tags, 
    description, 
    imgURL, 
    onClose, 
    user, 
    destinationIDs,
    onFilterChange}) => {
    
        const [reviewList, setReviewList] = useState<DocumentData[]>([]);

    useEffect(() => {
        const firebasecontroller = new firebaseControl();
        firebasecontroller.getReviewsForDestination(id).then((reviews) => {
            setReviewList(JSON.parse(JSON.stringify(reviews)));
        });
    }, []);

    const handleBeenHereClick = async () => {
        try {
            const firebasecontroller = new firebaseControl();
            await firebasecontroller.setUser(user.uid, id);
            console.log("Destination added to user's list:", id);
        } catch (error) {
            console.error("Error adding destination to user's list:", error);
        }
    };



    const addDestinationToListButton: React.FC<DestinationInterface> = ({destinationIDs, onFilterChange}) => {
        const [selectedDestinations, setSelectedDestinations] = useState<string[]>([]);

    const handleHaveBeen = (destinationID: string) => {
        const isSelected = selectedDestinations.includes(destinationID);
        const newSelectedTags = isSelected
            ? selectedDestinations.filter(t => t !== destinationID)
            : [...selectedDestinations, destinationID];
        setSelectedDestinations(newSelectedTags);
        onFilterChange(newSelectedTags);
    };

    return (
        <div id='modal-container' className='not-blur'>
            <button id='x-button' onClick={onClose} className='not-blur'>X</button>
            <img src={imgURL} alt="Error" className='not-blur'/>
            <div id='info-container' className='not-blur'>
                <div id='title-container' className='not-blur'>
                    <h1 className='not-blur'>
                    {city}, {country}
                    </h1>

                    
                    <div id="menu-container">
                        <h4>{destinationIDs}</h4>
                        <div id="checkbox-container">
                            {tags.map((tag, i) => (
                                <label key={i}>
                                    <input
                                        type="checkbox"
                                        value={tag}
                                        checked={selectedDestinations.includes(tag)}
                                        onChange={() => handleHaveBeen(tag)}
                                    />
                                    {tag}
                                </label>
                            ))}
                        </div>
                    </div>
                
            
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
   
}}

export default DestinationModal;
 */