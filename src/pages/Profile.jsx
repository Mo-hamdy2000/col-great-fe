import React, { useEffect } from "react";
import config from "../config.js";
import { useState, useContext } from "react";
import { AuthContext } from "../Components/Auth/AuthcontextProvider";
import { useNavigate } from "react-router-dom";

function Profile() {
  const ctx = useContext(AuthContext);
  const [studentData, setStudentData] = useState(null);
  const navigate = useNavigate();


  useEffect( () => {
    let url;
    url = config.API_URL + "users/show_profile";
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
      setStudentData(data);
    })
    .catch((data) => {
      navigate(-1);
    });
  }, [])

  return (
    <div className="content">
      { studentData && <div className="d-flex info-container mt-sm-5 my-1">
        <div className="info-header">
          مرحبا <b>{studentData.name }</b>
        </div>
        <br />
        <div className="module-subsection">البريد الاكتروني: {studentData.email}</div>
        <br />
        <div className="module-subsection">بيئة التعلم: {studentData.environment === 'direct_supervision' ? 'توجيه مباشر' : 'فرز روابط'}</div>
        <br />
        { studentData.results.map((test) => (
          <div>
            <div className="unit-grades">
              <table>
                <tr>
                  <td>نتيجة {test.test_title}: {test.score}%</td>
                  <td>الوقت المستغرق: {test.elapsed_time} دقيقة</td>
                </tr>
              </table>
              <hr/>
            <table>
              { test.lessons_results && test.lessons_results.map((lesson) => (
                <tr className="unit-grades-detail">
                  <td>نتيجة {lesson.lesson_title}:</td>
                  <td>{lesson.score ? lesson.score + '%' : '0%'}</td>
                </tr>
              )) }
            </table>
            </div>
            <br />
          </div>
        )) }
      </div>}
    </div>
  );
}

export default Profile;
