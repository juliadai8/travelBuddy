"use client";
import React from "react";
import { useState } from 'react';
import '../styles/NewDestination.css'
import firebaseControl from "@/app/firebaseControl";
import { useRouter } from "next/router";

const NewDestination = () => {
    
    const router = useRouter();

    const firebaseController = new firebaseControl;
    const [continent, setContinent] = useState('');
    const [city, setCity] = useState('');
    const [country, setCountry] = useState('');
    const [imgUrl, setImage] = useState('');
    const [mountain, checkMountain] = useState<boolean>(false);
    const [beach, checkBeach] = useState(false);
    const [cityShopping, checkCity] = useState(false);
    const [status, setStatus] = useState('')
    
    const handleSubmit = () => {
        const categoriesList: string[] = [];
        if (city !== '' && country !== '' && imgUrl !== ''){
            if(beach) {
                categoriesList.push("beach");
            }
            if(mountain) {
                categoriesList.push("mountain");
            }
            if(cityShopping) {
                categoriesList.push("city");
            }
    
            firebaseController.addDestination(
                city,
                country,
                imgUrl,
                categoriesList
            )
            router.push("/");
        }
        else {
            setStatus("Fill inn all fields")
        }
    }

    return (
        <>
            <div id='addDestination'>
            <button id='goToHome' onClick={() => router.push('/')}>Go back</button>
                <h1>New travel destination</h1>
                <h4 id='statusMessage'>{status}</h4>
                <form>
                    <label>
                        City: <input name='city' onChange={e => setCity(e.target.value)}/>
                    </label>
                    <label>
                        Country: <input name='country' onChange={e => setCountry(e.target.value)} />
                    </label>
                    <label>
                        Image url: <input name='imgURL' onChange={e => setImage(e.target.value)}/>
                    </label>
                    <h4>Apply tags</h4>
                    <select defaultValue='' onChange={e => setContinent(e.target.value)}>
                        <option value='' disabled>continent</option>
                        <option value='africa'>Africa</option>
                        <option value='asia'>Asia</option>
                        <option value='europe'>Europe</option>
                        <option value='northAmerica'>North-America</option>
                        <option value='southAmerica'>South-America</option>
                        <option value='oceania'>Oceania</option>
                    </select>
                    <label>
                        Beach: <input type='checkbox' name='beach' checked={beach} onChange={e => checkBeach(e.target.checked)}/>
                    </label>
                    <label>
                        Mountain: <input type='checkbox' name='mountain' checked={mountain} onChange={e => checkMountain(e.target.checked)}/>
                    </label>
                    <label>
                        City: <input type='checkbox' name='cityShopping' checked={cityShopping} onChange={e => checkCity(e.target.checked)}/>
                    </label>
                </form>
                <h4>Description:</h4>
                <textarea rows={12} cols={60} style={{ resize: "none" }}/>
                <button id='addButton' onClick={handleSubmit}> Add new destination </button>
            </div>
        </>
    )
}

export default NewDestination;