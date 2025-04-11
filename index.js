import express from 'express'
import { initializeApp } from "firebase/app";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { readFile } from 'node:fs/promises';

const firebaseConfig = {
  apiKey: "AIzaSyAqVdmPlMufkY9b8TQyzc6-lQD6eLyWyXo",
  authDomain: "april6v2store.firebaseapp.com",
  projectId: "april6v2store",
  storageBucket: "april6v2store.firebasestorage.app",
  messagingSenderId: "935346908970",
  appId: "1:935346908970:web:b165ea4e16abd19b0bb853"
};
const app = express();
const port = process.env.PORT || 1234; // Use environment port for hosting, default to 3000
const storeapp = initializeApp(firebaseConfig);
const db = getFirestore(storeapp);

async function fetchHtml(inputFilePath) {
  try {
    const filePath = new URL(inputFilePath, import.meta.url);
    const contents = await readFile(filePath, { encoding: 'utf8' });
    return contents;
    console.log(contents);
  } catch (err) {
    console.error(err.message);
  }
}

async function fetchDocument(collectionID, documentID) {
  const docRef = doc(db, collectionID, documentID);
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
  const htmlResponse = fetchHtml('./public/index.html')
  res.sendFile('./public/index.html', { root: '.' });
  // const data = await fetchDocument("testid", "docid");
  // if (data) {
  //   res.json(data); // Send the document data as JSON
  // } else {
  //   res.status(404).send("No such document!");
  // }
});

// Start the server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});