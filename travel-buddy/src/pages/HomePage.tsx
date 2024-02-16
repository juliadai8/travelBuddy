"use client";
import { DocumentData } from 'firebase/firestore';
import React from 'react';
import DestinationBox from '../components/DestinationBox';
import { useEffect, useState } from 'react';
import firebaseControl from '../app/firebaseControl';
import '../styles/HomePage.css';
import NewDestination from '@/pages/NewDestination';
import { useRouter } from 'next/navigation';

const HomePage = () => {
    const [destinationList, setDestinationList] = useState<DocumentData[]>([]);
    const router = useRouter();

    useEffect(() => {
        const firebasecontroller = new firebaseControl();

        let destinastions: DocumentData[] = [];
        firebasecontroller.getDestinastions().then((destinationsFirebase) => {
            setDestinationList(JSON.parse(JSON.stringify(destinationsFirebase)));
        });

      }, [])


    const cities = () => {
        return (
            <>
                {destinationList.map((destination, index) => (
                    <DestinationBox
                        key={index}
                        city={destination.city}
                        country={destination.country}
                        rating={destination.rating}
                        imgURL={destination.imgUrl}
                    />
                ))
                }
            </>
        )
    }


    return (
        <div id='container'>
            {cities()}
            <button onClick={() => router.push('/NewDestination')}>Add new travel destination</button> 
        </div>
    );
};

export default HomePage;