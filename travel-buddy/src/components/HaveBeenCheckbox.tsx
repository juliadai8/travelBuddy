import React, { useEffect, useState } from 'react';
import firebaseControl from '@/app/firebaseControl';
import { User } from 'firebase/auth';
import '../styles/HaveBeenCheckbox.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'

interface HaveBeenProps {
    user: User | undefined;
    id: string;
}

const HaveBeenCheckbox: React.FC<HaveBeenProps> = ({ user, id }) => {
    const [isChecked, setIsChecked] = useState(false);

    /* const handleUserDestinations = async () => {
        try {
            const firebasecontroller = new firebaseControl();
            await firebasecontroller.setUser(user.uid, id);
            console.log("Destination added to user's list:", id);
        } catch (error) {
            console.error("Error adding destination to user's list:", error);
        }
    }; */

    useEffect(() => {
        const checkVisited = async () => {
            try {
                const firebasecontroller = new firebaseControl();
                const visited = await firebasecontroller.checkIfVisited(user?.uid, id);
                setIsChecked(visited);
            } catch (error) {
                console.error("Error checking if visited:", error);
            }
        };
            checkVisited();
    }, []);

    const handleCheckboxChange = async () => {
        try {
            const firebasecontroller = new firebaseControl();
            if (!isChecked) {
                await firebasecontroller.setUserDestination(user?.uid, id);
                console.log("User added to destination's list:", id);
            } else {
                await firebasecontroller.removeUserDestination(user?.uid, id);
                console.log("User removed from destination's list:", id);
            }
            setIsChecked(!isChecked); 
        } catch (error) {
            console.error("Error handling checkbox change:", error);
        }
    };

    return (
        <>
            <label className="visitedLabel">Visited:</label>
            {isChecked ? <FontAwesomeIcon icon={faEye} onClick={handleCheckboxChange} /> : <FontAwesomeIcon icon={faEyeSlash} onClick={handleCheckboxChange} />}  
        </>  
    );
};

export default HaveBeenCheckbox;