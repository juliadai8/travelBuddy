"use client";
import { DocumentData } from 'firebase/firestore';
import React from 'react';
import DestinationBox from '../components/DestinationBox';
import { useEffect, useState } from 'react';
import firebaseControl from '../app/firebaseControl';
import '../styles/HomePage.css';
import { useRouter } from 'next/navigation';
import NewDestination from '@/pages/NewDestination';
import DestinationModal from '@/components/DestinationModal';

const HomePage = () => {
    const [destinationList, setDestinationList] = useState<DocumentData[]>([]);
    const [openModal, setOpenModal] = useState<boolean>(false);
    const [destIndex, setDestIndex] = useState<number>(0);
    const [scrollMem, setScrollMem] = useState<number>(0);
    const router = useRouter();

    useEffect(() => {
        const firebasecontroller = new firebaseControl();

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
                <DestinationBox
                    key={i}
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
            {cities()}
            <button onClick={() => router.push('/NewDestination')}>Add new travel destination</button> 
        </div>
    );
};

export default HomePage;