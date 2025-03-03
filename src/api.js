// Mirage JS mock server - comment this out when using real Firebase
import "./fake_server"

// Uncomment below to use Firebase instead of Mirage
// import { initializeApp } from "firebase/app";
// import {
//     getFirestore,
//     collection,
//     doc,
//     getDocs,
//     getDoc,
//     query,
//     where
// } from "firebase/firestore/lite"

// const firebaseConfig = {
//     apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
//     authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
//     projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
//     storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
//     messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
//     appId: process.env.REACT_APP_FIREBASE_APP_ID,
//     measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID
// };

// Validate that all required environment variables are present
const requiredEnvVars = [
    'REACT_APP_FIREBASE_API_KEY',
    'REACT_APP_FIREBASE_AUTH_DOMAIN',
    'REACT_APP_FIREBASE_PROJECT_ID',
    'REACT_APP_FIREBASE_STORAGE_BUCKET',
    'REACT_APP_FIREBASE_MESSAGING_SENDER_ID',
    'REACT_APP_FIREBASE_APP_ID'
];

const missingEnvVars = requiredEnvVars.filter(varName => !process.env[varName]);
if (missingEnvVars.length > 0) {
    throw new Error(
        `Missing required Firebase environment variables: ${missingEnvVars.join(', ')}. ` +
        'Please check your .env file and ensure all required variables are set.'
    );
}

// Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const db = getFirestore(app)

// const vansCollectionRef = collection(db, "vans")

// export async function getVans() {
//     const querySnapshot = await getDocs(vansCollectionRef)
//     const dataArr = querySnapshot.docs.map(doc => ({
//         ...doc.data(),
//         id: doc.id
//     }))
//     return dataArr
// }

// export async function getVan(id) {
//     const docRef = doc(db, "vans", id)
//     const vanSnapshot = await getDoc(docRef)
//     return {
//         ...vanSnapshot.data(),
//         id: vanSnapshot.id
//     }
// }

// export async function getHostVans() {
//     const q = query(vansCollectionRef, where("hostId", "==", "123"))
//     const querySnapshot = await getDocs(q)
//     const dataArr = querySnapshot.docs.map(doc => ({
//         ...doc.data(),
//         id: doc.id
//     }))
//     return dataArr
// }

// Using Mirage JS mock server
export async function getVans() {
    const res = await fetch("/api/vans")
    const data = await res.json()
    return data.vans
}

export async function getVan(id) {
    const res = await fetch(`/api/vans/${id}`)
    const data = await res.json()
    return data.vans
}

export async function getHostVans() {
    const res = await fetch("/api/host/vans")
    const data = await res.json()
    return data.vans
}

export async function loginUser(creds) {
    const res = await fetch("/api/login",
        { method: "post", body: JSON.stringify(creds) }
    )
    const data = await res.json()

    if (!res.ok) {
        // eslint-disable-next-line
        throw {
            message: data.message,
            statusText: res.statusText,
            status: res.status
        }
    }

    return data
}