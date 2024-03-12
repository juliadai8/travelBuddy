import React, { useState, useEffect } from 'react';
import { ref, listAll, getStorage, getDownloadURL } from "firebase/storage";
import '../styles/displayAds.css';

const DisplayAds = () => {
    const [urls, setUrls] = useState<string[]>([]);

    useEffect(() => {
        const storage = getStorage();
        const listRef = ref(storage, 'files/');
        listAll(listRef)
            .then((res) => {
                const promises = res.items.map((itemRef) =>
                    getDownloadURL(itemRef).catch((error) => {
                        console.log(error);
                        return ''; // Return an empty string if there's an error
                    })
                );
                Promise.all(promises)
                    .then((urls) => setUrls(urls.filter(url => url !== ''))) // Filter out empty strings
                    .catch((error) => console.log(error));
            })
            .catch((error) => console.log(error));
    }, []);
    

    return (
        <div id='display'>
            <div className='adContainer '>
                <div className="adColumn">
                    {urls.map((url, index) => (
                        <img key={index} src={url} alt={`File ${index + 1}`} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default DisplayAds;
