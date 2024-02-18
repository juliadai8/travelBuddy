"use client";
import { DocumentData } from 'firebase/firestore';
import React from 'react';
import DestinationBox from '../components/DestinationBox';
import FilterPanel from '../components/FilterPanel';
import { useEffect, useState } from 'react';
import firebaseControl from '../app/firebaseControl';
import '../styles/HomePage.css';
import DestinationModal from '@/components/DestinationModal';
// import filter from '../components/FilterDestinations';

const HomePage = () => {
    const [destinationList, setDestinationList] = useState<DocumentData[]>([]);
    const [openModal, setOpenModal] = useState<boolean>(false);
    const [destIndex, setDestIndex] = useState<number>(0);
    const [scrollMem, setScrollMem] = useState<number>(0);

    useEffect(() => {
        const firebasecontroller = new firebaseControl;

        let destinastions: DocumentData[] = [];
        firebasecontroller.getDestinastions().then((destinationsFirebase) => {
            setDestinationList(JSON.parse(JSON.stringify(destinationsFirebase)));
        });

      }, [])

    const readMore = (index: number) => {
        setDestIndex(index);
        setOpenModal(true);
        setScrollMem(window.scrollY);
        window.scrollTo(0, 0);
    }

    const cities = () => {
        return (
            <>
            {destinationList.map((destin, i) => (
                <DestinationBox city={destin.city} country={destin.country} rating={destin.rating} imgURL={destin.imgUrl} onReadMore={() => readMore(i)}/>
            ))}
            </>
        );
    }

    const closeModal = () => {
        setDestIndex(0);
        setOpenModal(false);
        window.scrollTo(0, scrollMem);
        setScrollMem(0);
    }
    const categories_dict = {
        "Activities": ["Hiking", "Skiing", "Sightseeing"], 
        "Climate": ["Tropical", "Dry", "Continental", "Polar", "Temperate"],
        "Destination type": ["City", "Beach", "Culture", "Safari", "Historical", "Active"]
    }

    return (
        <div id='container' className={openModal ? 'blur-background' : undefined}>
            {openModal && <div className="overlay"></div>}
            {openModal && 
                <DestinationModal 
                city={destinationList[destIndex].city} 
                country={destinationList[destIndex].country}
                rating={destinationList[destIndex].rating}
                tags={destinationList[destIndex].category}
                description={destinationList[destIndex].description}
                imgURL={destinationList[destIndex].imgUrl}
                onClose={() => closeModal()}/>}
        
            <FilterPanel categories={categories_dict} onFilterChange={function (selectedTags: string[]): void {
                throw new Error('Function not implemented.');
            } }/>
            {cities()}
        </div>
    );
};

export default HomePage;
