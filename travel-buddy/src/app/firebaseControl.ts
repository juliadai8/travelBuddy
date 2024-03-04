// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { update } from "firebase/database";
import {
  getFirestore, collection, getDocs,
  addDoc,
  doc,
  updateDoc,
  deleteDoc,
  setDoc,
} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import firebase from 'firebase/compat/app'; // Import firebase


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBWui1W0CBRAzvrMqHCOBUc3hMkmo3KkXw",
  authDomain: "tdt4140-prosjekt.firebaseapp.com",
  databaseURL: "https://tdt4140-prosjekt-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "tdt4140-prosjekt",
  storageBucket: "tdt4140-prosjekt.appspot.com",
  messagingSenderId: "807771308285",
  appId: "1:807771308285:web:43ebb655b020317c987e94"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const FieldValue = firebase.firestore.FieldValue; // Access FieldValue
export const auth = getAuth(app)

  class firebaseControl {
    static getAuth() {
      return auth;
    }

  async getDestinastions(){
    const destinationsCol = collection(db, "destinations");
    const destinationsSnapshot = await getDocs(destinationsCol);
    const destinationsList = destinationsSnapshot.docs.map(doc =>  ({
      id: doc.id,
      ...doc.data()
    }));
    return destinationsList;
  }

  async getReviewsForDestination(destinationID: string) {
    const reviewsCol = collection(db, "destinations", destinationID, "reviews");
    const reviewsSnapshot = await getDocs(reviewsCol);
    const reviewList = reviewsSnapshot.docs.map(reviewDoc => ({
        reviewID: reviewDoc.id,
        ...reviewDoc.data()
    }));
    return reviewList;
  }

  async addDestination(addCity: string, addCountry: string, addImgURL?: string, addCategory?: string[], addDescription?: string) {
    const collectionRef = collection(db, "destinations");
    try {
      const newDocRef = await addDoc(collectionRef, {
        city: addCity,
        country: addCountry,
        imgUrl: addImgURL,
        category: addCategory,
        description: addDescription || ""
      });

      const newReviewsCol = collection(newDocRef, "reviews");
      await addDoc(newReviewsCol, {});
    }
    catch (e) {
      console.error(e)
    }
  }

  async editDestination(destinationID: string, updateCity?: string, updateCountry?: string, updateImgURL?: string, updateCategories?: string[], updateDescription?: string) {
    const docRef = doc(db, "destinations", destinationID);
    try {
      await updateDoc(docRef, {
        imgUrl: updateImgURL,
        category: updateCategories,
        description: updateDescription
      });
    }
    catch(e) {
      console.error(e);
    }
  }

  async deleteDestination(destinationID: string) {
    try {
      await deleteDoc(doc(db, "destinations", destinationID))
    }
    catch(e) {
      console.log(e);
    }
  }


  async addReview(destinationID: string, rating: number, userID: string) {
    const docRef = collection(db, "destinations", destinationID, "reviews");
    try {
        const newDocRef = await addDoc(docRef, {
          rating: rating,
          userID: userID
        });
      }
      catch (e) {
        console.error(e)
      }
  }

  getAuthInstance() {
    return auth;
  }


  /* async setUser(userID: string) {
    try {
      await setDoc(doc(db, "user_destinations", userID),{})
      
    } catch (e) {
      console.error(e)
      
    }
  } */

  async setUser(userID: string) {
    try {
      await setDoc(doc(db, "user_destinations", userID), {});
      console.log("User document created successfully for", userID);
    } catch (e) {
      console.error("Error creating user document:", e);
    }
  }

  async addDestinationToUser(userID: string, destinationID: string) {
    try {
      await updateDoc(doc(db, "user_destinations", userID), {
        destinations: FieldValue.arrayUnion(destinationID) // Access arrayUnion through FieldValue
      });
      console.log("Destination added to user's list:", destinationID);
    } catch (e) {
      console.error("Error adding destination to user's list:", e);
    }
  }



};

export default firebaseControl;
