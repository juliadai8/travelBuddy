import {signInWithEmailAndPassword} from 'firebase/auth';
import React, {useState} from 'react';
import {auth} from "../app/firebaseControl";
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import {useNavigate} from "react-router-dom";
import FirebaseError = firebase.FirebaseError;
import HomePage from './HomePage';
import '../styles/LoginButton.css';


export default function Login() {
  //const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassowrd] = useState("");
  const [error, setError] = useState("");
  function login() {
    setError("");
    signInWithEmailAndPassword(auth, email, password).then(() => {
      //navigate("")
      console.log("Du er logget inn")
    }).catch((e: FirebaseError) => {
      setError(e.message)
    })
  }
  return (
      <div className='container div'>
          <input type="text" placeholder="E-post" 
                 onChange={(e) => setEmail(e.target.value)}/>
          <input type="password" placeholder="Passord"
                 onChange={(e) => setPassowrd(e.target.value)}/>
          <p className={"text-error"}>{error}</p>
          <button className='button' onClick={login}>Logg inn</button>
          <button className='leftButton'>Logg ut</button>
      </div>
  );
};