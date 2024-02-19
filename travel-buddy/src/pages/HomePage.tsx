"use client";
import { DocumentData } from 'firebase/firestore';
import React from 'react';
import DestinationBox from '../components/DestinationBox';
import { useEffect, useState } from 'react';
import firebaseControl from '../app/firebaseControl';
import '../styles/HomePage.css';
import { useRouter } from 'next/navigation';
import DestinationModal from '@/components/DestinationModal';
import AddDestination from '@/components/AddDestination';
import { OperationType } from 'firebase/auth';

const HomePage = () => {
    const [destinationList, setDestinationList] = useState<DocumentData[]>([]);
    const [openModal, setOpenModal] = useState<boolean>(false);
    const [destIndex, setDestIndex] = useState<number>(0);
    const [scrollMem, setScrollMem] = useState<number>(0);
    const [openAddDestination, setOpenAddDestination] = useState<boolean>(false);
    const [destinationsChanged, setDestinationsChanged] = useState<boolean>(false);

    useEffect(() => {
        const firebasecontroller = new firebaseControl();

        let destinastions: DocumentData[] = [];
        firebasecontroller.getDestinastions().then((destinationsFirebase) => {
            setDestinationList(JSON.parse(JSON.stringify(destinationsFirebase)));
            setDestinationsChanged(false);
        });

      }, [destinationsChanged])

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
                <DestinationBox
                    key={destin.getID}
                    city={destin.city}
                    country={destin.country}
                    rating={destin.rating}
                    imgURL={destin.imgUrl}
                    onReadMore={() => readMore(i)}
                />
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

    const closeAddDestination = () => {
        setOpenAddDestination(false);
        setDestinationsChanged(true);
        window.scrollTo(0, scrollMem);
    }

    return (
        <>
            <div id='container' className={openModal || openAddDestination ? 'blur-background' : undefined}>
                <button id='addDestinationButton' onClick={() => setOpenAddDestination(true)}>
                    Add new travel destination
                </button> 
                {(openModal || openAddDestination) && <div className="overlay"></div>}
                {openModal && 
                    <DestinationModal 
                    city={destinationList[destIndex].city} 
                    country={destinationList[destIndex].country}
                    rating={destinationList[destIndex].rating}
                    tags={destinationList[destIndex].category}
                    description={destinationList[destIndex].description}
                    imgURL={destinationList[destIndex].imgUrl}
                    onClose={() => closeModal()}/>}
                {cities()}
                {openAddDestination && (<AddDestination onClose={() => closeAddDestination()}/>)}
            </div>
        </>
    );
};

export default HomePage;