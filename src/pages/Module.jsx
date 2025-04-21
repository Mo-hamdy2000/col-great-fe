import React from "react";
import config from "../config.js";
import { useParams } from 'react-router-dom';
import { useState, useContext } from "react";
import { AuthContext } from "../Components/Auth/AuthcontextProvider";
import { useNavigate } from "react-router-dom";

function Module() {
  const ctx = useContext(AuthContext);
  const [moduleData, setModuleData] = useState({});
  const [lessonsData, setLessonsData] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();

  const showTestRedun = (id) => {
    let url;
    url = config.API_URL + "tests/" + id;
    fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `${ctx.token}`,
      }
    })
    .then(async (res) => {
      return res.json();
    })
    .then((data) => {
      navigate("/tests/" + id)
    })
    .catch((data) => {
      alert(data)
    });
  };

  const showTest = (id) => {
    let url;
    url = config.API_URL + "user_tests";
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `${ctx.token}`,
      },
      body: JSON.stringify({ test_id: id })
    })
    .then(async (res) => {
      return res.json();
    })
    .then((data) => {
      showTestRedun(id)
    })
    .catch((data) => {
      alert(data)
    });
  };


  const showLesson = (id) => {
    navigate("/lessons/" + id)
  };

  if (Object.keys(moduleData).length === 0) {
    let url;
    url = config.API_URL + "units/" + id;
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
      setModuleData(data.unit);
      setLessonsData(data.unit.lessons);
    })
    .catch((data) => {
      navigate(-1);
    });
  }
  
  function renderTestOrContent(moduleData, lessonsData) {
    if (moduleData.pre_test_id == null) {
      if (moduleData.auto_redirection != null) {
        navigate("/lessons/" + moduleData.auto_redirection)
      }

      return (<div>
                <div className="module-section"><b>{moduleData.title}</b></div><br/>
                <div className="module-subsection">
                  {lessonsData.length > 0 ? "دروس الموديول" : "لقد اجتزت الاختبار القبلي بنجاح" }
                </div><br/>
                { lessonsData.map(lesson => (
                  <div className="d-flex align-items-center pt-3">
                    <div>
                      <button className="btn btn-primary lesson-btn" onClick={() => showLesson(lesson.id) }>{lesson.title}</button>
                    </div>
                  </div>
                ))}
                {moduleData.post_test_id && (
                <div>
                  <div className="module-subsection">
                    يمكنك أداء الاختبار البعدي
                  </div><br/>
                  <div className="d-flex align-items-center pt-3">
                    <div>
                      <button className="btn btn-primary lesson-btn" onClick={() => showTest(moduleData.post_test_id) }>بدء الاختبار</button>
                    </div>
                  </div>
                </div>)}
              </div>);
    } else {
      return (<div>
                <div className="module-subsection">
                  قم بأداء الاختبار القبلي ستتاح لك ساعة من وقت البدء
                </div><br/>
                <div className="d-flex align-items-center pt-3">
                  <div>
                    <button className="btn btn-primary lesson-btn" onClick={() => showTest(moduleData.pre_test_id) }>بدء الاختبار</button>
                  </div>
                </div>
              </div>);
    }
  }

  return (
    <div className="content">
      <div className="d-flex module-container mt-sm-5 my-1">
        { renderTestOrContent(moduleData, lessonsData) }
      </div>
    </div>
  );
}

export default Module;
