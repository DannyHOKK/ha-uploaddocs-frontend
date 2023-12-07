import React, { useEffect, useRef, useState } from "react";
import { MDBBtn, MDBInput, MDBCheckbox } from "mdb-react-ui-kit";

import { useAuth } from "../../api/AuthContext";
// import "react-toastify/dist/ReactToastify.css";
// import { ToastContainer, toast } from "react-toastify";

function Login() {
  const inputRef = useRef();
  const [errorMsg, setErrorMsg] = useState("");
  const [user, setUser] = useState({
    username: "",
    password: "",
  });
  const { login } = useAuth();

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const submitHandler = (e) => {
    e.preventDefault();
    login(user).then((res) => {
      setErrorMsg(res);
    });
  };

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setUser((e) => ({
      ...user,
      [name]: value,
    }));
    setErrorMsg(null);
  };

  return (
    <div>
      <div className="text-center mb-3"></div>
      <form onSubmit={(e) => submitHandler(e)}>
        <MDBInput
          wrapperClass="mb-4"
          ref={inputRef}
          label="username"
          id="form1"
          name="username"
          type="username"
          value={user.username}
          onChange={changeHandler}
        />
        <MDBInput
          wrapperClass="mb-4"
          label="Password"
          name="password"
          id="form6"
          type="password"
          value={user.password}
          onChange={changeHandler}
        />

        <p className=" alert-danger">{errorMsg}</p>
        <div className="d-flex justify-content-between mx-4 mb-4">
          <MDBCheckbox
            name="flexCheck"
            value=""
            id="flexCheckDefault"
            label="Remember me"
          />
          <a href="!#">Forgot password?</a>
        </div>

        <MDBBtn className="mb-4 w-100">Sign in</MDBBtn>
      </form>
      <p className="text-center">Not a member?</p>
      {/* <ToastContainer /> */}
    </div>
  );
}

export default Login;
