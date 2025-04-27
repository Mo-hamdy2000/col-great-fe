import React from "react";
import config from "../../config";
import { useNavigate } from "react-router-dom";
function SignUpForm() {
  const [state, setState] = React.useState({
    name: "",
    email: "",
    password: "",
    dateOfBirth: "",
  });

  const navigate = useNavigate();

  const handleChange = (evt) => {
    const value = evt.target.value;
    setState({
      ...state,
      [evt.target.name]: value,
    });
  };

  const handleOnSubmit = (evt) => {
    evt.preventDefault();

    const { name, email, password, dateOfBirth } = state;

    let data = { email: email, password: password, name: name, date_of_birth: dateOfBirth, device_id: 'Dummy device' };
    const url = config.API_URL + "users";

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
        alert("تم إنشاء الحساب بنجاح")
        setState({ name: "", email: "", password: "", dateOfBirth: "" })
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  return (
    <div className="form-container sign-up-container">
      <form onSubmit={handleOnSubmit}>
        <h1>إنشاء حساب</h1>
        <input
          type="text"
          name="name"
          value={state.name}
          onChange={handleChange}
          placeholder="الاسم"
        />
        <input
          type="email"
          name="email"
          value={state.email}
          onChange={handleChange}
          placeholder="البريد الاكتروني"
        />
        <input
          type="password"
          name="password"
          value={state.password}
          onChange={handleChange}
          placeholder="كلمة المرور"
        />
        <input
          type="date"
          name="dateOfBirth"
          value={state.dateOfBirth}
          onChange={handleChange}
          placeholder="تاريخ الميلاد"
        />
        <button>إنشاء حساب</button>
      </form>
    </div>
  );
}

export default SignUpForm;
