import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  doc,
  writeBatch
} from "firebase/firestore/lite"

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app)

// Function to initialize Firestore with data
export async function initializeFirestoreData() {
  const batch = writeBatch(db);

  // Vans data
  const vansCollectionRef = collection(db, "vans")
  const vansData = [
    { id: "1", name: "Modest Explorer", price: 60, description: "The Modest Explorer is a van designed to get you out of the house and into nature. This beauty is equipped with solar panels, a composting toilet, a water tank and kitchenette. The idea is that you can pack up your home and escape for a weekend or even longer!", imageUrl: "https://assets.scrimba.com/advanced-react/react-router/modest-explorer.png", type: "simple", hostId: "123" },
    { id: "2", name: "Beach Bum", price: 80, description: "Beach Bum is a van inspired by surfers and travelers. It was created to be a portable home away from home, but with some cool features in it you won't find in an ordinary camper.", imageUrl: "https://assets.scrimba.com/advanced-react/react-router/beach-bum.png", type: "rugged", hostId: "123" },
    { id: "3", name: "Reliable Red", price: 100, description: "Reliable Red is a van that was made for travelling. The inside is comfortable and cozy, with plenty of space to stretch out in. There's a small kitchen, so you can cook if you need to. You'll feel like home as soon as you step out of it.", imageUrl: "https://assets.scrimba.com/advanced-react/react-router/reliable-red.png", type: "luxury", hostId: "456" },
    { id: "4", name: "Dreamfinder", price: 65, description: "Dreamfinder is the perfect van to travel in and experience. With a ceiling height of 2.1m, you can stand up in this van and there is great head room. The floor is a beautiful glass-reinforced plastic (GRP) which is easy to clean and very hard wearing. A large rear window and large side windows make it really light inside and keep it well ventilated.", imageUrl: "https://assets.scrimba.com/advanced-react/react-router/dreamfinder.png", type: "simple", hostId: "789" },
    { id: "5", name: "The Cruiser", price: 120, description: "The Cruiser is a van for those who love to travel in comfort and luxury. With its many windows, spacious interior and ample storage space, the Cruiser offers a beautiful view wherever you go.", imageUrl: "https://assets.scrimba.com/advanced-react/react-router/the-cruiser.png", type: "luxury", hostId: "789" },
    { id: "6", name: "Green Wonder", price: 70, description: "With this van, you can take your travel life to the next level. The Green Wonder is a sustainable vehicle that's perfect for people who are looking for a stylish, eco-friendly mode of transport that can go anywhere.", imageUrl: "https://assets.scrimba.com/advanced-react/react-router/green-wonder.png", type: "rugged", hostId: "123" }
  ];

  // Add vans to batch
  vansData.forEach((vanData) => {
    const docRef = doc(vansCollectionRef, vanData.id);
    batch.set(docRef, vanData);
  });

  // Users data (separate collection)
  const usersCollectionRef = collection(db, "users")
  const usersData = [
    { id: "123", email: "admin@admin.com", password: "admin", name: "Bob" }
  ];

  // Add users to batch
  usersData.forEach((userData) => {
    const docRef = doc(usersCollectionRef, userData.id);
    batch.set(docRef, userData);
  });

  try {
    // Commit the batch
    await batch.commit();
    console.log("✅ Documents successfully written to Firestore!");
    console.log(`   - ${vansData.length} vans added`);
    console.log(`   - ${usersData.length} users added`);
    return { success: true, vansCount: vansData.length, usersCount: usersData.length };
  } catch (error) {
    console.error("❌ Error writing documents to Firestore:", error);
    return { success: false, error: error.message };
  }
}

// Component to trigger initialization
export default function FirebaseInitializer() {
  const [status, setStatus] = React.useState({ loading: false, message: "" });
  const handleInitialize = async () => {
    setStatus({ loading: true, message: "Initializing Firestore..." });
    const result = await initializeFirestoreData();

    if (result.success) {
      setStatus({
        loading: false,
        message: `✅ Success! Added ${result.vansCount} vans and ${result.usersCount} users to Firestore.`
      });
    } else {
      setStatus({
        loading: false,
        message: `❌ Error: ${result.error}`
      });
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "0 auto" }}>
      <h1>Firebase Firestore Initializer</h1>
      <p>Click the button below to populate your Firestore database with initial van and user data.</p>

      <button
        onClick={handleInitialize}
        disabled={status.loading}
        style={{
          padding: "12px 24px",
          fontSize: "16px",
          backgroundColor: "#FF8C38",
          color: "white",
          border: "none",
          borderRadius: "8px",
          cursor: status.loading ? "not-allowed" : "pointer",
          opacity: status.loading ? 0.6 : 1
        }}
      >
        {status.loading ? "Initializing..." : "Initialize Firestore Data"}
      </button>

      {status.message && (
        <div style={{
          marginTop: "20px",
          padding: "12px",
          backgroundColor: status.message.includes("✅") ? "#d4edda" : "#f8d7da",
          border: `1px solid ${status.message.includes("✅") ? "#c3e6cb" : "#f5c6cb"}`,
          borderRadius: "4px",
          color: status.message.includes("✅") ? "#155724" : "#721c24"
        }}>
          {status.message}
        </div>
      )}

      <div style={{ marginTop: "30px", padding: "15px", backgroundColor: "#f8f9fa", borderRadius: "8px" }}>
        <h3>Instructions:</h3>
        <ol>
          <li>Make sure your Firebase credentials are correctly set in the <code>.env</code> file</li>
          <li>Click the "Initialize Firestore Data" button above</li>
          <li>Wait for the success message</li>
          <li>Your Firestore database will now have:
            <ul>
              <li>A "vans" collection with 6 van documents</li>
              <li>A "users" collection with 1 user document</li>
            </ul>
          </li>
          <li>You can now use the app with Firebase!</li>
        </ol>
      </div>
    </div>
  );
}

// Add React import
import React from "react";