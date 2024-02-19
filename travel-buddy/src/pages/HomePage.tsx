import React, { useEffect, useState } from 'react';
import DestinationBox from '../components/DestinationBox';
import firebaseControl from '../app/firebaseControl';
import '../styles/HomePage.css';
import { useRouter } from 'next/navigation';
import DestinationModal from '@/components/DestinationModal';
import { DocumentData } from 'firebase/firestore';

const HomePage = () => {
    const [destinationList, setDestinationList] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    const [destIndex, setDestIndex] = useState(0);
    const [scrollMem, setScrollMem] = useState(0);
    const [searchQuery, setSearchQuery] = useState('');
    const router = useRouter();

    useEffect(() => {
        const firebasecontroller = new firebaseControl();

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
        const filteredDestinations = destinationList.filter(destin => {
            const searchQueryLowerCase = searchQuery.toLowerCase();
            const cityName = destin.city.toLowerCase();
            const countryName = destin.country.toLowerCase();
            const category = Array.isArray(destin.category) ? destin.category.map(c => c.toLowerCase()) : [];
            // If searchQuery is empty, return true for all destinations
            if (!searchQueryLowerCase) {
                return true;
            }
            // If searchQuery is not empty, only return true for destinations that include the searchQuery in their category
            return cityName.includes(searchQueryLowerCase) || countryName.includes(searchQueryLowerCase) || category.some(c => c.includes(searchQueryLowerCase));
        });

        return (
            <>
            {filteredDestinations.map((destin, i) => (
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

    const handleSearchChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
        setSearchQuery(event.target.value);
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
            <input type="text" value={searchQuery} onChange={handleSearchChange} placeholder="Search destinations"/>
            {cities()}
            <button onClick={() => router.push('/NewDestination')}>Add new travel destination</button> 
        </div>
    );
};

export default HomePage;
