import React from "react";
import config from "../config.js";
import { useState, useContext } from "react";
import { AuthContext } from "../Components/Auth/AuthcontextProvider.js";
import { useNavigate } from "react-router-dom";

function Modules() {
  
  const ctx = useContext(AuthContext);
  const [modulesList, setModulesList] = useState([]);
  const [testData, setTestData] = useState([]);
  const navigate = useNavigate();

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
      navigate("/tests/" + id)
    })
    .catch((data) => {
      alert(data)
    });
  };

  const showModule = (id) => {
    navigate("/modules/" + id)
  };

  if (modulesList.length === 0) {
    let url;
    url = config.API_URL + "units";
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
        setModulesList(data.units);
        setTestData({ pre_test_id: data.pre_test_id, post_test_id: data.post_test_id })
      });
  }

  function renderTestOrContent(modulesList, testData) {
    if (testData.pre_test_id == null && testData.post_test_id == null) {
      return (<div className="d-flex module-container mt-sm-5 my-1">
                <div className="info-header">
                  الموديولات المتاحة
                </div>
                <br/>
                { modulesList.map(module => (
                  <div className="d-flex align-items-center pt-3">
                    <div>
                      <button className="btn btn-primary lesson-btn" onClick={ () => showModule(module.id) } >{module.title}</button>
                    </div>
                  </div>
                ))}
                {testData.post_test_id && (
                  <div>
                    <div className="module-subsection">
                      يمكنك أداء الاختبار البعدي
                    </div><br/>
                    <div className="d-flex align-items-center pt-3">
                      <div>
                        <button className="btn btn-primary lesson-btn" onClick={() => showTest(testData.post_test_id) }>بدء الاختبار</button>
                      </div>
                    </div>
                  </div>
                )}
              </div>);
    } else {
      return (<div>
                <div className="module-subsection">
                  قم بأداء الاختبار القبلي ستتاح لك ساعة من وقت البدء
                </div><br/>
                <div className="d-flex align-items-center pt-3">
                  <div>
                    <button className="btn btn-primary lesson-btn" onClick={() => showTest(testData.pre_test_id) }>بدء الاختبار</button>
                  </div>
                </div>
              </div>)
    }
  }

  return (
    <div className="content">
      <div className="d-flex module-container mt-sm-5 my-1">
        {renderTestOrContent(modulesList, testData)}
      </div>
    </div>
  );
}

export default Modules;
