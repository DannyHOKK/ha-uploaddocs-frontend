import React, { useEffect, useRef, useState } from "react";
import { MDBBtn, MDBInput, MDBCheckbox } from "mdb-react-ui-kit";
import AuthService from "../../api/AuthService";

function Login() {
  const inputRef = useRef();

  const [errorMsg, setErrorMsg] = useState("");
  const [user, setUser] = useState({
    username: "",
    password: "",
  });

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const submitHandler = (e) => {
    e.preventDefault();

    AuthService.loginUser(user).then((res) => {
      if (res.data.code === 0) {
        window.location.reload();
      } else {
        setErrorMsg(res.data.msg);
      }
    });
  };

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setUser((e) => ({
      ...user,
      [name]: value,
    }));
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
          id="form2"
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
    </div>
  );
}

export default Login;
