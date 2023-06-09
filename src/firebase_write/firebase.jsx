import { initializeApp } from "firebase/app";
import { getFirestore, 
    collection, 
    doc, 
    getDocs,
    writeBatch } from "firebase/firestore/lite"

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
// Initialize Firebase Authentication and get a reference to the service
// const auth = getAuth(app);
const db = getFirestore(app)

const vansCollectionRef = collection(db, "vans")
// read collection "vans"
const querySnapshot = await getDocs(vansCollectionRef)
const dataArr = querySnapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id
    }))
// end of read method
// Create a write batch
const batch = writeBatch(db);

const vansData = [
    { id: "3", name: "Reliable Red", price: 100, description: "Reliable Red is a van that was made for travelling. The inside is comfortable and cozy, with plenty of space to stretch out in. There's a small kitchen, so you can cook if you need to. You'll feel like home as soon as you step out of it.", imageUrl: "https://assets.scrimba.com/advanced-react/react-router/reliable-red.png", type: "luxury", hostId: "456" },
    { id: "4", name: "Dreamfinder", price: 65, description: "Dreamfinder is the perfect van to travel in and experience. With a ceiling height of 2.1m, you can stand up in this van and there is great head room. The floor is a beautiful glass-reinforced plastic (GRP) which is easy to clean and very hard wearing. A large rear window and large side windows make it really light inside and keep it well ventilated.", imageUrl: "https://assets.scrimba.com/advanced-react/react-router/dreamfinder.png", type: "simple", hostId: "789" },
    { id: "5", name: "The Cruiser", price: 120, description: "The Cruiser is a van for those who love to travel in comfort and luxury. With its many windows, spacious interior and ample storage space, the Cruiser offers a beautiful view wherever you go.", imageUrl: "https://assets.scrimba.com/advanced-react/react-router/the-cruiser.png", type: "luxury", hostId: "789" },
    { id: "6", name: "Green Wonder", price: 70, description: "With this van, you can take your travel life to the next level. The Green Wonder is a sustainable vehicle that's perfect for people who are looking for a stylish, eco-friendly mode of transport that can go anywhere.", imageUrl: "https://assets.scrimba.com/advanced-react/react-router/green-wonder.png", type: "rugged", hostId: "123" },
    { id: "123", email: "b@b.com", password: "p123", name: "Bob" }
  ];
  
// Iterate over the data and add set operations to the batch
vansData.forEach((data) => {
    const docRef = doc(vansCollectionRef, data.id);
    batch.set(docRef, data);
  });
  
  try {
    // Commit the batch
    await batch.commit();
    console.log("Documents successfully written to Firestore.");
  } catch (error) {
    console.error("Error writing documents to Firestore:", error);
  }

export default function FirebaseDb() {
    return (
        <div>
            <h1>Firebase Database</h1>
            <p>{JSON.stringify(dataArr)}</p>
        </div>
    )
}