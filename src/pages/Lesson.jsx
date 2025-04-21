import React from "react";
import config from "../config.js";
import { useParams } from 'react-router-dom';
import { useState, useContext } from "react";
import { AuthContext } from "../Components/Auth/AuthcontextProvider";
import { useNavigate } from "react-router-dom";
import firebase from 'firebase/compat/app';
import 'firebase/compat/storage';
import '../Assets/Styles/upload.css'

function Lesson() {
  const { id } = useParams();
  const ctx = useContext(AuthContext);
  const [lessonData, setLessonData] = useState({});
  const [activitiesData, setActivitiesData] = useState([]);
  const navigate = useNavigate();

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

  const submitActivityLink = (activity_url) => {
    let url;
    url = config.API_URL + "lessons/" + id + "/submit_activity";
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `${ctx.token}`,
      },
      body: JSON.stringify({ activity_url: activity_url })
    })
    .then(async (res) => {
      return res.json();
    })
    .then((data) => {
      navigate('/modules/' + data.lesson.unit_id);
    })
    .catch((data) => {
      alert("رفع ملف النشاط لم يكتمل")
    });
  }

  const handleUpload = () => {
    if (file == null) {
      alert('يجب عليك الحاق ملف النشاط لرفعه')
      return;
    }
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
            alert('تم رفع النشاط بنجاح')
            submitActivityLink(url);
          });
      }
    )
  }
  
  if (Object.keys(lessonData).length === 0) {
    let url;
    url = config.API_URL + "lessons/" + id;
    fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `${ctx.token}`,
      },
    })
    .then(async (res) => {
      return res.json();
    })
    .then((data) => {
      setLessonData(data.lesson);
      setActivitiesData(data.lesson.activities)
    })
    .catch((data) => {
      navigate(-1);
    });
  }
  
  const Resources = [
    {
      title: "عرض الشرائح",
      url: "https://drive.google.com/uc?export=download&id=1vkukjHUbIFk5NCSgeZkQ1FF0GCV4Z0an",
    },
  ];

  return (
    <div className="content">
      <div className="d-flex info-container mt-sm-5 my-1">
        <br />
        <br />
        <div className="lesson-content" dangerouslySetInnerHTML={{ __html: lessonData.content }} />
        <br />
        <br />
        { lessonData.links && (<div>
          <div className="section">المصادر</div>
          {lessonData.links.map((resource) => (
            <a href={resource.url}>{resource.title} </a>
          ))}
          </div>
        )}
        <br />
        <br />
        <div className="unit-grades">الانشطة
          {activitiesData.map((activity) => (
            <div>
              { activity.img != null ? (<div><br/><br/><img src={activity.img} alt="صورة النشاط"/><br/></div>) : "" }
              {activity.title}: {activity.text}
              <br/>
            </div>
          ))}
          <div>
            <input type="file"  onChange={handleChange} />
            <button class="btn btn-primary" onClick={handleUpload}>رفع النشاط</button>
          </div>
        </div>
        <div className="d-flex align-items-center pt-3">
          <div id="prev">
            <button className="btn btn-primary" onClick={() => navigate('/modules/' + lessonData.unit_id)}>العودة إلى الموديول</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Lesson;
