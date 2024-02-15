import {signInWithEmailAndPassword} from 'firebase/auth';
import React, {useState} from 'react';
import {auth} from "../app/firebaseControl";
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import {useNavigate} from "react-router-dom";
import FirebaseError = firebase.FirebaseError;


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
      <div className={"flex h-full items-center justify-center"}>
        <div className={"flex flex-col w-[300px] gap-4"}>
          <input type="text" placeholder="E-post" className="input input-bordered w-full max-w-xs"
                 onChange={(e) => setEmail(e.target.value)}/>
          <input type="password" placeholder="Passord" className="input input-bordered w-full max-w-xs"
                 onChange={(e) => setPassowrd(e.target.value)}/>
          <p className={"text-error"}>{error}</p>
          <button className={"btn btn-primary w-full"} onClick={login}>Logg inn</button>
        </div>
      </div>
  );
};