import axios from "axios";
import joi from "joi";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import LoadingScreen from "../LoadingScreen/LoadingScreen";

export default function Register() {
  // --------default  user data -----------------------------
  let [user, setUser] = useState({
    userName: "",
    Age: "",
    Email: "",
    Password: "",
  });

  //  --------- set user data ------------------------
  function userData(e) {
    let userInfo = { ...user };
    userInfo[e.target.placeholder] = e.target.value;
    setUser(userInfo);
  }

  // -------- api request -----------------------------------------
  async function sendData(e) {
    e.preventDefault();

    if (validateUser()) {
      setLoadingScreen(true);
      let response = await axios.post("https://dummyjson.com/users/add", user);

      if (response.status === 200) {
        setLoadingScreen(false);
        // document.getElementById('sucessMsg').classList.replace('d-none','d-block');
        // document.getElementById('failMsg').classList.replace('d-block','d-none');
        navigate("/login");
      }
    } else {
      setLoadingScreen(false);

      //  document.getElementById('failMsg').classList.replace('d-none','d-block');
      // document.getElementById('sucessMsg').classList.replace('d-block','d-none');
      return;
    }
  }
  // ------- user validation ---------------------------------
  let [error, setErrors] = useState([]);

  let validateUser = () => {
    let schema = joi.object({
      userName: joi.string().alphanum().min(3).required(),
      Age: joi.number().min(18).required(),
      Email: joi
        .string()
        .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
        .required(),
      Password: joi
        .string()
        .pattern(new RegExp("^[A-Za-z0-9]{5,30}$"))
        .required(),
    });

    let result = schema.validate(user, { abortEarly: false });
    if (result.error) {
      setErrors(result.error.details);
      return false;
    } else {
      setErrors([]);
      return true;
    }
  };

  // --------- set loading screen---------------------------------
  let [loadingScreen, setLoadingScreen] = useState(false);
  let navigate = useNavigate();
  // --------------------------------------------------------
  return (
    <>
      {loadingScreen ? <LoadingScreen></LoadingScreen> : ""}
      <div className="p-3">
        <h2 className="mb-1 text-center fw-bolder">Register</h2>
        <form className="formStyle" onSubmit={(e) => sendData(e)}>
          <div>
            <input
              className="inputStyle"
              type="text"
              placeholder="userName"
              onChange={(e) => userData(e)}
            />
            {error
              ? error.map((msg, index) => {
                  return (
                    <>
                      {msg.message.includes("userName") ? (
                        <p className="text-danger" key={index}>
                          {msg.message}
                        </p>
                      ) : (
                        ""
                      )}
                    </>
                  );
                })
              : ""}

            <input
              className="inputStyle"
              type="number"
              placeholder="Age"
              onChange={(e) => userData(e)}
            />
            {error
              ? error.map((msg, index) => {
                  return (
                    <>
                      {msg.message.includes("Age") ? (
                        <p className="text-danger" key={index}>
                          {msg.message}
                        </p>
                      ) : (
                        ""
                      )}
                    </>
                  );
                })
              : ""}

            <input
              className="inputStyle"
              type="email"
              placeholder="Email"
              onChange={(e) => userData(e)}
            />
            {error
              ? error.map((msg, index) => {
                  return (
                    <>
                      {msg.message.includes("Email") ? (
                        <p className="text-danger" key={index}>
                          {msg.message},ex: example@mail.com{" "}
                        </p>
                      ) : (
                        ""
                      )}
                    </>
                  );
                })
              : ""}
            <input
              className="inputStyle"
              type="password"
              placeholder="Password"
              onChange={(e) => userData(e)}
            />
            {error
              ? error.map((msg, index) => {
                  return (
                    <>
                      {msg.message.includes("Password") ? (
                        <p className="text-danger" key={index}>
                          Invalid-password, password must contain at least 5
                          characters or numbers
                        </p>
                      ) : (
                        ""
                      )}
                    </>
                  );
                })
              : ""}
          </div>
          <p
            id="sucessMsg"
            className="text-success fw-bolder text-center d-none"
          >
            Success
          </p>
          <p id="failMsg" className="text-danger fw-bolder text-center d-none">
            Wrong data ,Please try again
          </p>
          <button className="submitBtn" type="submit">
            Register
          </button>
        </form>
      </div>
    </>
  );
}
