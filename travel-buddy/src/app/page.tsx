"use client";
import React from 'react';
import { Routes, Route } from "react-router-dom";
import HomePage from '../pages/HomePage';
import firebaseControl from './firebaseControl';
import { useEffect } from 'react';
import { getDocs } from 'firebase/firestore';
import { DocumentData } from 'firebase/firestore';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

export default function Home() {
    const firebasecontroller = new firebaseControl;

    /* useEffect(() => {
        //fetch destinastions and store in localstorage
        let destinastions: DocumentData[] = [];
        firebasecontroller.getDestinastions().then((destinationsFirebase) => {
            destinastions = destinationsFirebase;
            localStorage.setItem("destinations", JSON.stringify(destinastions));
        });
    }, []); */

    ReactDOM.render(
        <BrowserRouter>
          <HomePage />
        </BrowserRouter>,
        document.getElementById('root'),
      );

}
