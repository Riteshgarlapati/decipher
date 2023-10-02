// firebaseUtils.js

import { doc, getDoc } from "firebase/firestore";
import { firestore } from "./firebase";

// Initialize Firebase (make sure you've already initialized Firebase as shown in the previous response)

// Function to fetch a document by a specific field
export async function fetchDocumentByField(collectionName, fieldName, value) {
    // Reference to the Firestore collection
    const docRef = doc(firestore, "users", value);
    try {
        const docSnap = await getDoc(docRef);
        const data = docSnap.data();
        return data;
    } catch (error) {
        console.error("Error getting document:", error);
        return null;
    }
}
