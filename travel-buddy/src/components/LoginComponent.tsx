import {signInWithEmailAndPassword, Auth, signOut} from 'firebase/auth';
import React, {useState} from 'react';
import firebaseControl, {auth} from "../app/firebaseControl";
import firebase from 'firebase/app';
import 'firebase/firestore';
import {useNavigate} from "react-router-dom";
import FirebaseError = firebase.FirebaseError;
import HomePage from '../pages/HomePage';
import '../styles/LoginButton.css';


export default function Login(props:any) {
  //const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassowrd] = useState("");
  const [error, setError] = useState("");
  const [loginButtonPopup, setLoginButtonPopup] = useState(false);

  function login() {
    setError("");

    signInWithEmailAndPassword(auth, email, password).then(() => {
      //navigate("")
      console.log("Du er logget inn")
    }).catch((e: FirebaseError) => {
      setError(e.message)
    })
  }

  function logout() {
    signOut(auth)
      .then(() => {
        console.log('Sign out successful');
      })
      .catch((error) => {
        console.error('Error signing out', error);
      });
  }

  return (props.Trigger) ?(
      <div className='container'>
          <input type="text" placeholder="E-post" 
                 onChange={(e) => setEmail(e.target.value)}/>
                 <br></br>
                 
          <input type="password" placeholder="Passord"
                 onChange={(e) => setPassowrd(e.target.value)}/>
          <p className={"text-error"}>{error}</p>
          <button className='LoginButton' onClick={login}>Logg inn</button>
          <button className='LoginButton' onClick={logout}>Logg ut</button>
          {props.children}
      </div>
  ):"";
};
