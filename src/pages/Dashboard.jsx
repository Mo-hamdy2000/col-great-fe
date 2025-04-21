import React, { useEffect } from "react";
import config from "../config.js";
import { useState, useContext } from "react";
import { AuthContext } from "../Components/Auth/AuthcontextProvider";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const ctx = useContext(AuthContext);
  const [studentsList, setStudentsList] = useState(null);
  const [statistics, setStatistics] = useState(null);
  const navigate = useNavigate();


  const showUser = (id) => {
    navigate("/users/" + id)
  };

  useEffect( () => {
    let url;
    url = config.API_URL + "users";
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
      setStudentsList(data.users);
    })
    .catch((data) => {
      navigate(-1);
    });
  }, [])

  useEffect( () => {
    let url;
    url = config.API_URL + "users/statistics";
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
      setStatistics(data);
    })
    .catch((data) => {
      navigate(-1);
    });
  }, [])

  return (
    <div className="content">
      <div className="d-flex info-container mt-sm-5 my-1">
      <div className="info-header">
        الاحصائيات
      </div>
      { statistics && (
          <table className="unit-grades">
            <tr>
              <td>متوسط الاختبار التحصيلي القبلي { statistics.pre_test_score_mean + "%" }</td>
              <td>متوسط الاختبار التحصيلي البعدي { statistics.post_test_score_mean + "%" }</td>
            </tr>
          </table>
      ) }
      <div className="info-header">
        الطلاب
      </div>
      { studentsList && (
          <table className="unit-grades">
            <tr>
              <td>الاسم</td>
              <td>الاختبار التحصيلي القبلي</td>
              <td>الاختبار التحصيلي البعدي</td>
              <td></td>
            </tr>
            { studentsList.map((student) => ( 
              <tr>
                <td>{ student.name }</td>
                <td>{ student.pre_test_score + "%" }</td>
                <td>{ student.post_test_score + "%" }</td>
                <td><button className="btn btn-primary lesson-btn unit-grades-detail" onClick={() => showUser(student.id) }>اظهار الملف</button></td>
              </tr>
            )) }
          </table>
      ) }
      </div>
    </div>
  );
}

export default Dashboard;
