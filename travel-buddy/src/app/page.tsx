"use client";
import React from 'react';
import HomePage from '../pages/HomePage';
import firebaseControl from './firebaseControl';
import { useEffect } from 'react';
import { getDocs } from 'firebase/firestore';
import { DocumentData } from 'firebase/firestore';
import FilterMenu from '../components/FilterMenu';

export default function Home() {
    const firebasecontroller = new firebaseControl;

    /* useEffect(() => {
        //fetch destinastions and store in localstorage
        let destinastions: DocumentData[] = [];
        firebasecontroller.getDestinastions().then((destinationsFirebase) => {
            destinastions = destinationsFirebase;
            localStorage.setItem("destinations", JSON.stringify(destinastions));
        });
    }, []); */

    return(
        <>
        {/* <FilterMenu categoryTypes={{
            "Activities": ["Hiking", "Skiing", "Sightseeing"], 
            "Climate": ["Tropical", "Dry", "Continental", "Polar", "Temperate"],
            "Destination type": ["City", "Beach", "Culture", "Safari", "Historical", "Active"]
        }} onFilterChange={function (selectedCategories: { [key: string]: string[]; }): void {
                throw new Error('Function not implemented.');
            } }/> */}
        <HomePage/>
        </>
    )

}
