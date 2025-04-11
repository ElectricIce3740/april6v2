const express = require('express');
const app = express();
const port = process.env.PORT || 3000; // Use environment port for hosting, default to 3000
import { initializeApp } from "firebase/app";
import { getFirestore, doc, getDoc } from "firebase/firestore";
// hello
const firebaseConfig = {
  apiKey: "AIzaSyAqVdmPlMufkY9b8TQyzc6-lQD6eLyWyXo",
  authDomain: "april6v2store.firebaseapp.com",
  projectId: "april6v2store",
  storageBucket: "april6v2store.firebasestorage.app",
  messagingSenderId: "935346908970",
  appId: "1:935346908970:web:b165ea4e16abd19b0bb853"
};

const storeapp = initializeApp(firebaseConfig);
const db = getFirestore(storeapp);

// Wrap Firestore logic in an async function
async function fetchDocument() {
  const docRef = doc(db, "cities", "SF");
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    console.log("Document data:", docSnap.data());
    return docSnap.data(); // Return the document data
  } else {
    console.log("No such document!");
    return null;
  }
}

// Define routes
app.get('/', async (req, res) => {
  const data = await fetchDocument();
  if (data) {
    res.json(data); // Send the document data as JSON
  } else {
    res.status(404).send("No such document!");
  }
});

app.get('/api/data', (req, res) => {
  res.json({ message: 'This is some data from the backend!' });
});

// Start the server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});