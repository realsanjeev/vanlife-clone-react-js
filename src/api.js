import "./server";

import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
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
const analytics = getAnalytics(app);


export async function getVans(id) {
    const url = id ? `/api/vans/${id}` : "/api/vans";
    const res = await fetch(url);
    if (!res.ok) {
        throw {
            message: "Failed to fetch vans",
            statusText: res.statusText,
            status: res.status
        }
    }
    const data = await res.json();
    return data?.vans ? data.vans : null;
}

export async function getHostVans(id) {
    const url = id ? `/api/host/vans/${id}` : "/api/host/vans";
    const res = await fetch(url);
    if (!res.ok) {
        throw {
            message: "Failed to fetch vans",
            statusText: res.statusText,
            status: res.status,
        }
    }
    const data = await res.json();
    console.log("data: ", data)
    return data?.vans ? data.vans : null;
}

export async function loginUser(creds) {
    const res = await fetch("/api/login",
        { method: "post", body: JSON.stringify(creds) }
    )
    const data = await res.json()

    if (!res.ok) {
        throw {
            message: data.message,
            statusText: res.statusText,
            status: res.status
        }
    }

    return data
}