import React from "react";
import config from "../../config";
import { useState, useContext } from "react";
import { AuthContext } from "./AuthcontextProvider";
import { useNavigate } from "react-router-dom";

function SignInForm() {
  const [state, setState] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const ctx = useContext(AuthContext);

  const handleChange = (evt) => {
    const value = evt.target.value;
    setState({
      ...state,
      [evt.target.name]: value,
    });
  };

  const handleOnSubmit = (evt) => {
    evt.preventDefault();

    const { email, password } = state;
    let data = { email: email, password: password };
    const url = config.API_URL + "sessions";
    const route = "/home";
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data),
    })
      .then(async (res) => {
        if (res.status >= 400) {
          const data = await res.json();
          throw new Error(data.message);
        }
        return res.json();
      })
      .then((data) => {
        const sessionTime = new Date(new Date().getTime() + 24 * 3600 * 1000);
        ctx.login(data.auth_token, sessionTime.toISOString(), data.data.is_admin);
        navigate(route);
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  return (
    <div className="form-container sign-in-container">
      <form onSubmit={handleOnSubmit}>
        <h1>تسجيل الدخول</h1>
        <input
          type="email"
          placeholder="البريد الالكتروني"
          name="email"
          value={state.email}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="كلمة المرور"
          value={state.password}
          onChange={handleChange}
        />
        <button>تسجيل الدخول</button>
      </form>
    </div>
  );
}

export default SignInForm;
