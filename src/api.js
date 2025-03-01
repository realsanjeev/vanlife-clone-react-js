import { initializeApp } from "firebase/app";
import {
    getFirestore,
    collection,
    doc,
    getDocs,
    getDoc,
    query,
    where
} from "firebase/firestore/lite"
import "./fake_server"

const firebaseConfig = {
  apiKey: "AIzaSyBw39nj5b-WfN43xR7udHqjrKBexZtX6LE",
  authDomain: "vanlife-55caf.firebaseapp.com",
  projectId: "vanlife-55caf",
  storageBucket: "vanlife-55caf.appspot.com",
  messagingSenderId: "996053517792",
  appId: "1:996053517792:web:42f6b9cb7523e753b49785",
  measurementId: "G-71094JXEKG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app)

const vansCollectionRef = collection(db, "vans")

export async function getVans() {
    const querySnapshot = await getDocs(vansCollectionRef)
    const dataArr = querySnapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id
    }))
    return dataArr
}

export async function getVan(id) {
    const docRef = doc(db, "vans", id)
    const vanSnapshot = await getDoc(docRef)
    return {
        ...vanSnapshot.data(),
        id: vanSnapshot.id
    }
}

export async function getHostVans() {
    const q = query(vansCollectionRef, where("hostId", "==", "123"))
    const querySnapshot = await getDocs(q)
    const dataArr = querySnapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id
    }))
    return dataArr
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