"use client";
import React from 'react';
import { useState } from 'react';
import firebaseControl from "@/app/firebaseControl";
import '../styles/AddDestination.css'


interface AddDestinationInterface {
    onClose?: () => void;
}

const AddDestination: React.FC<AddDestinationInterface> = ({onClose}) => {

    const firebaseController = new firebaseControl;
    const [continent, setContinent] = useState('');
    const [city, setCity] = useState('');
    const [country, setCountry] = useState('');
    const [imgUrl, setImage] = useState('');
    const [description, setDescription] = useState('');
    const [mountain, checkMountain] = useState<boolean>(false);
    const [beach, checkBeach] = useState(false);
    const [cityShopping, checkCity] = useState(false);
    const [status, setStatus] = useState('')
    
    const handleSubmit = async () => {
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
    
            await firebaseController.addDestination(
                city,
                country,
                imgUrl,
                categoriesList,
                description
            )
            onClose?.();
        }
        else {
            setStatus("Fill inn all fields")
        }
    }
    
    return (
        <div id='addDestination' className='not-blur'>
            <button id='x-button' onClick={onClose} className='not-blur'>X</button>
            <div id='addDestination-inner' className='not-blur'>
                <h1 className='not-blur'>New travel destination</h1>
                <h4 id='statusMessage' className='not-blur'>{status}</h4>
                <form className='not-blur'>
                    <label className='not-blur'>
                        City:
                        <input name='city' className='not-blur' onChange={e => setCity(e.target.value)}/>
                    </label>
                    <label className='not-blur'>
                        Country:
                        <input name='country' className='not-blur' onChange={e => setCountry(e.target.value)} />
                    </label>
                    <label className='not-blur'>
                        Image url:
                        <input name='imgURL' className='not-blur' onChange={e => setImage(e.target.value)}/>
                    </label>
                    <h4 className='not-blur'>Apply tags</h4>
                    <select className='not-blur' defaultValue='' onChange={e => setContinent(e.target.value)}>
                        <option value='' disabled>continent</option>
                        <option value='africa'>Africa</option>
                        <option value='asia'>Asia</option>
                        <option value='europe'>Europe</option>
                        <option value='northAmerica'>North-America</option>
                        <option value='southAmerica'>South-America</option>
                        <option value='oceania'>Oceania</option>
                    </select>
                    <label className='not-blur'>
                        Beach:
                        <input type='checkbox' name='beach' className='not-blur' checked={beach} onChange={e => checkBeach(e.target.checked)}/>
                    </label>
                    <label className='not-blur'>
                        Mountain:
                        <input type='checkbox' name='mountain' className='not-blur' checked={mountain} onChange={e => checkMountain(e.target.checked)}/>
                    </label>
                    <label className='not-blur'>
                        City:
                        <input type='checkbox' name='cityShopping' className='not-blur' checked={cityShopping} onChange={e => checkCity(e.target.checked)}/>
                    </label>
                </form>
                <h4 className='not-blur'>Description:</h4>
                <textarea className='not-blur' rows={12} cols={60} style={{ resize: "none" }} onChange={e => setDescription(e.target.value)}/>
                <button id='addButton' className='not-blur' onClick={handleSubmit}> Add new destination </button>
            </div>
        </div>
    );
}

export default AddDestination;
