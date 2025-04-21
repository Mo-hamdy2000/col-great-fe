import React, { useState } from 'react';
import firebase from 'firebase/compat/app';

import 'firebase/compat/storage';
import '../Assets/Styles/upload.css'


function Upload() {


  const firebaseConfig = {
    apiKey: "AIzaSyCNMaI1fK21BmrwVg2wyZj1VIb8JgyqFFs",
    authDomain: "ale-website.firebaseapp.com",
    projectId: "ale-website",
    storageBucket: "ale-website.appspot.com",
    messagingSenderId: "973912552071",
    appId: "1:973912552071:web:4554543bb5798594d4be22",
    measurementId: "G-WR4TRDLRYW"
  };

  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);



  const [file, setFile] = useState();

  const handleChange = (e) => {
    setFile(e.target.files[0]);
  }
  const storage = firebase.storage();

  const handleUpload = () => {
    const uploadTask = storage.ref(`files/${file.name}`).put(file);
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        // Progress function
      },
      (error) => {
        // Error function
        console.log(error);
      },
      () => {
        // Complete function
        storage
          .ref('files')
          .child(file.name)
          .getDownloadURL()
          .then((url) => {
            console.log(url);
          });
      }
    )
  }

  return (
    <div>
      <input type="file" onChange={handleChange} />
      <button class="btn btn-primary" onClick={handleUpload}>Upload</button>
    </div>
  );
}

export default Upload;

