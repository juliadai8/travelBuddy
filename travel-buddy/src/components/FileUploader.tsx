import React, { useState } from 'react';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from '../app/firebaseControl';


interface FileUploaderInterface {
    admin: boolean;
}

const FileUploader: React.FC<FileUploaderInterface> = ({admin}) => {
    const [percent, setPercent] = useState(0);
    const [file, setFile] = useState<File | undefined>(undefined);
    const [imageUrl, setImageUrl] = useState<string | null>(null);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            setFile(event.target.files[0]);
        }
    };

    const handleUpload = () => {
        if (!file) {
            alert("Please choose a file first!");
            return;
        }
        const timestamp = new Date().getTime();
        const fileName = `${timestamp}_${file.name}`; 
        const storageRef = ref(storage, `/files/${fileName}`);
        const blob = new Blob([file]);
        const uploadTask = uploadBytesResumable(storageRef, blob);
        uploadTask.on(
            "state_changed",
            (snapshot) => {
                const percent = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
                setPercent(percent);
            },
            (err) => console.log(err),
            async () => {
                const imageUrl = await getDownloadURL(uploadTask.snapshot.ref);
                setImageUrl(imageUrl);
                window.location.reload(); 

            }
        );
    };

    return (
        <div>
           {admin && <input type="file" onChange={handleChange} accept=".png, .jpg, .gif"/>}
           {admin && <button onClick={handleUpload}>Upload ad</button>}
        </div>

    );
};

export default FileUploader;

