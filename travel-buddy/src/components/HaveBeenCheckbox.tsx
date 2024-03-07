import React, { useEffect, useState } from 'react';
import firebaseControl from '@/app/firebaseControl';
import { User } from 'firebase/auth';

interface HaveBeenProps {
    user: User;
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
        const checkIfVisited = async () => {
            try {
                const firebasecontroller = new firebaseControl();
                const visited = await firebasecontroller.checkIfVisited(user.uid, id);
                setIsChecked(visited);
            } catch (error) {
                console.error("Error checking if visited:", error);
            }
        };

        checkIfVisited();
    }, [user.uid, id]);

    const handleCheckboxChange = async () => {
        try {
            const firebasecontroller = new firebaseControl();
            if (!isChecked) {
                // If checkbox is checked, add the destination
                await firebasecontroller.setUser(user.uid, id);
                console.log("Destination added to user's list:", id);
            } else {
                // If checkbox is unchecked, remove the destination
                // Assuming you have a method in firebaseControl to remove the document
                await firebasecontroller.removeUserDestination(user.uid, id);
                console.log("Destination removed from user's list:", id);
            }
            setIsChecked(!isChecked); // Toggle the checkbox state
        } catch (error) {
            console.error("Error handling checkbox change:", error);
        }
    };

    return (
        <div id="checkbox-container" >
        <div>
            <input
                type="checkbox"
                checked={isChecked}
                onChange={handleCheckboxChange}
            />
            <label>I've been here</label>
        </div>      
        </div>  
       

    );
};

export default HaveBeenCheckbox;