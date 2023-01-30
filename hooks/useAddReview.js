import { doc, setDoc, getDoc } from "firebase/firestore"; 
import { db } from "firebase-admin/config";

export default async function useAddReview({user, review, category, id}) {
    
    const { uid, photoURL, displayName, email} = user    
    
    const newReview = {
        userId: uid,
        review,
        photoURL,
        email,
        id: Math.floor(Math.random() * Math.floor(Math.random() * Date.now()))
    };

    const docRef = doc(db, category, String(id))
    const currentReviews = await getCurrentReviews(docRef)
    await setDoc(docRef, {reviews: [newReview, ...currentReviews ]});
}


async function getCurrentReviews(docRef){
    const docSnap =  await getDoc(docRef)
    return docSnap.exists() ? (docSnap.data()).reviews : []
}