import React, { useEffect } from "react";
import config from "../config.js";
import { useState, useContext } from "react";
import { AuthContext } from "../Components/Auth/AuthcontextProvider";
import { useNavigate } from "react-router-dom";
import { useParams } from 'react-router-dom';

function User() {
  const { id } = useParams();
  const ctx = useContext(AuthContext);
  const [studentData, setStudentData] = useState(null);
  const navigate = useNavigate();


  useEffect( () => {
    let url;
    url = config.API_URL + "users/" + id;
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
      setStudentData(data.user);
    })
    .catch((data) => {
      navigate(-1);
    });
  }, [])

  return (
    <div className="content">
      { studentData && <div className="d-flex info-container mt-sm-5 my-1">
        <div className="module-subsection">اسم الطالب <b>{studentData.name }</b></div>
        <br />
        <div className="module-subsection">البريد الاكتروني: {studentData.email}</div>
        <br />
        <div className="module-subsection">بيئة التعلم: {studentData.environment === 'direct_supervision' ? 'توجيه مباشر' : 'فرز روابط'}</div>
        <br />
        <div className="unit-grades">
          <div className="info-header">درجات الطالب</div>
        { studentData.results.map((test) => (
          <div>
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
                  <td>{lesson.score}%</td>
                </tr>
              )) }
            </table>
            <br />
          </div>
        )) }
        </div>
        <hr></hr>
        <div className="unit-grades">
          <div className="info-header"> أنشطة الطالب</div>
          <table>
            { studentData.user_activities.map((activity) => (
              <tr>
                <td>{activity.lesson_title} </td>
                <td><a href={activity.activity_url}>النشاط</a></td>
              </tr>
            )) }
          </table>
        </div>
      </div>}
      <div className="d-flex align-items-center pt-3">
          <div id="prev">
            <button className="btn btn-primary" onClick={() => navigate('/dashboard')}>العودة</button>
          </div>
        </div>
    </div>
  );
}

export default User;
