"use client";
import React, {useState} from 'react';
import HomePage from '../pages/HomePage';
import firebaseControl from './firebaseControl';
import { useEffect } from 'react';
import { getDocs } from 'firebase/firestore';
import { DocumentData } from 'firebase/firestore';
import Login from '../components/LoginComponent';

export default function Home() {
    const firebasecontroller = new firebaseControl;
    const [loginButtonPopup, setLoginButtonPopup] = useState(true);

    /* useEffect(() => {
        //fetch destinastions and store in localstorage
        let destinastions: DocumentData[] = [];
        firebasecontroller.getDestinastions().then((destinationsFirebase) => {
            destinastions = destinationsFirebase;
            localStorage.setItem("destinations", JSON.stringify(destinastions));
        });
    }, []); */

    return(
        <div>
            <Login Trigger = {loginButtonPopup} setTrigger={setLoginButtonPopup}>
            </Login>
            <HomePage/>
            
        </div>
    )

}
