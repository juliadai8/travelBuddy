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
    query,
    where,
    getDoc,

} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

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
export const auth = getAuth(app)

class firebaseControl {
    static getAuth() {
        return auth;
    }

    async getDestinations() {
        const destinationsCol = collection(db, "destinations");
        const destinationsSnapshot = await getDocs(destinationsCol);
        const destinationsList = destinationsSnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
        return destinationsList;
    }

    async getDestination(id: string) {
        const destinationsDoc = doc(db, "destinations", id);
        const destinationSnapshot = await getDoc(destinationsDoc);
        const destination = destinationSnapshot.data()
        return destination;
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
                description: addDescription || "",
                RatingCount: 0,
                TotalRating: 0
            });

            const newReviewsCol = collection(newDocRef, "reviews");
            await addDoc(newReviewsCol, {});
        }
        catch (e) {
            console.error(e)
        }
    }

    async editDestination(destinationID: string, updateImgURL?: string, updateCategories?: string[], updateDescription?: string) {
        const docRef = doc(db, "destinations", destinationID);
        try {
            await updateDoc(docRef, {
                imgUrl: updateImgURL,
                category: updateCategories,
                description: updateDescription
            });
        }
        catch (e) {
            console.error(e);
        }
    }

  async deleteDestination(destinationID: string) {
    try {
      await deleteDoc(doc(db, "destinations", destinationID))
      this.deleteAllReviews(destinationID);
    }
    catch(e) {
      console.log(e);
    }
  }

    async addReview(destinationID: string, rating: number, comment: string, email: string | null, userID: string | null) {
        const docRef = collection(db, "destinations", destinationID, "reviews");
        const ratingDocRef = doc(db, "destinations", destinationID);
        const ratingDocSnapshot = await getDoc(ratingDocRef);
        const ratingData = ratingDocSnapshot.data();

        try {
            await updateDoc(ratingDocRef, {
                TotalRating: ratingData?.TotalRating + rating,
                RatingCount: ratingData?.RatingCount + 1
            });
            console.log("Hei")
            const newDocRef = await addDoc(docRef, {
                rating: rating,
                comment: comment,
                email: email,
                userID: userID
            });
        }
        catch (e) {
            console.error(e)
        }
    }

    async updateReview(destinationID: string, reviewID: string, rating: number, comment: string) {
        const docRef = doc(db, "destinations", destinationID, "reviews", reviewID);
        const oldReviewRef = doc(db, "destinations", destinationID, "reviews", reviewID);
        const oldReviewSnapshot = await getDoc(oldReviewRef);
        const oldRreviewData = oldReviewSnapshot.data();
        const ratingDocRef = doc(db, "destinations", destinationID);
        const ratingDocSnapshot = await getDoc(ratingDocRef);
        const ratingData = ratingDocSnapshot.data();
        try {
            await updateDoc(ratingDocRef, {
                TotalRating: ratingData?.TotalRating + rating - oldRreviewData?.rating
            });

            await updateDoc(docRef, {
                rating: rating,
                comment: comment
            });
        }
        catch (e) {
            console.error(e)
        }
    }

    async deleteReview(destinationID: string, reviewID: string) {
        const oldReviewRef = doc(db, "destinations", destinationID, "reviews", reviewID);
        const oldReviewSnapshot = await getDoc(oldReviewRef);
        const oldRreviewData = oldReviewSnapshot.data();
        const ratingDocRef = doc(db, "destinations", destinationID);
        const ratingDocSnapshot = await getDoc(ratingDocRef);
        const ratingData = ratingDocSnapshot.data();
        try {
            await updateDoc(ratingDocRef, {
                TotalRating: ratingData?.TotalRating - oldRreviewData?.rating,
                RatingCount: ratingData?.RatingCount - 1
            });

            await deleteDoc(doc(db, "destinations", destinationID, "reviews", reviewID));
        }
        catch (e) {
            console.error(e);
        }
    }

    getAuthInstance() {
        return auth;
    }

    async setUser(userID: string | undefined, destinationID: string) {
        const collectionRef = collection(db, "user_destinations");
        try {
            const newDocRef = await addDoc(collectionRef, {
                destinationID: destinationID,
                userID: userID
            });
        }
        catch (e) {
            console.error("Error creating user document:", e);
        }
    }


    async removeUserDestination(userID: string | undefined, destinationID: string) {
        const querySnapshot = await getDocs(
            query(
                collection(db, "user_destinations"),
                where("userID", "==", userID),
                where("destinationID", "==", destinationID)
            )
        );

        querySnapshot.forEach(async (doc) => {
            await deleteDoc(doc.ref);
        });
    }

    async checkIfVisited(userID: string | undefined, destinationID: string): Promise<boolean> {
        if(typeof userID !== "string"){
            return false;
        }

        try {
            const querySnapshot = await getDocs(
                query(
                    collection(db, "user_destinations"),
                    where("userID", "==", userID),
                    where("destinationID", "==", destinationID)
                )
            );
            return !querySnapshot.empty;
            /* const docRef = doc(db, "user_destinations", userID + "_" + destinationID); // Assuming destinationID is unique
            const docSnapshot = await getDoc(docRef);
            return docSnapshot.exists(); */
        } catch (error) {
            console.error("Error checking if destination is visited:", error);
            return false;
        }
    }

    async deleteAllReviews(destinationID: string) {
      const reviewsRef = collection(db, "destinations", destinationID, "reviews");
      try {
        const querySnapshot = await getDocs(reviewsRef);
        querySnapshot.forEach(async (doc) => {
        await deleteDoc(doc.ref);
      });
      }
      catch(e) {
        console.error(e);
      }
    }
  

    /* async getVisitedPairs(){
      const pairCol = collection(db, "user_destinations");
      const destinationsSnapshot = await getDocs(pairCol);
      const pairList = destinationsSnapshot.docs.map(doc =>  ({
        id: doc.id,
        ...doc.data()
      }));
      return pairList;
    } */

};

export default firebaseControl;

