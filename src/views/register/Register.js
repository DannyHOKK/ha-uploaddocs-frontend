import React, { useEffect, useRef, useState } from "react";
import { MDBBtn, MDBInput, MDBCheckbox } from "mdb-react-ui-kit";
import AuthService from "../../api/AuthService";

function Register() {
  const inputRef = useRef();
  const [validPwd, setValidPwd] = useState("");
  const [checkbox, setCheckbox] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [user, setUser] = useState({
    name: "",
    username: "",
    email: "",
    pwd: "",
  });

  const PWD_REGEX = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
  const EMAIL_REGEX =
    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  //   useEffect(() => {
  //     setErrorMsg(userValidator(user));
  //     console.log("userValidator is work");
  //   }, [user]);

  const changeHandler = (e) => {
    const { name, value } = e.target;
    if (name == "validPwd") {
      setValidPwd(value);
    } else {
      setUser({
        ...user,
        [name]: value,
      });
    }
    setErrorMsg((errorMsg) => ({
      ...errorMsg,
      [name]: "",
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!errorMsg) {
      console.log("typing ok");
      //   AuthService.registerUser(user);
    }
    setErrorMsg(userValidator(user));
  };

  const userValidator = (data) => {
    const msg = {};
    if (!data.name) {
      msg.name = "Name is required";
    }
    if (!data.username) {
      msg.username = "Username is required";
    }
    if (!EMAIL_REGEX.test(data.email)) {
      msg.email = "Email is required";
    }
    if (!user.pwd) {
      msg.pwd = "Password is required";
    }
    if (user.pwd !== validPwd) {
      msg.pwd = "Password not same ";
    }
    if (!PWD_REGEX.test(user.pwd)) {
      msg.validPwd =
        "Password must contain a special character and greater than 8 characters";
    }
    return msg;
  };

  return (
    <form
      onSubmit={(e) => {
        handleSubmit(e);
      }}
    >
      <div className="text-center mb-3"></div>
      <p className=" alert-danger">{errorMsg.name}</p>
      <MDBInput
        wrapperClass="mb-4"
        ref={inputRef}
        label="Name"
        name="name"
        id="form1"
        type="text"
        autoComplete="on"
        value={user.name}
        onChange={(e) => {
          changeHandler(e);
        }}
      />
      <p className=" alert-danger">{errorMsg.username}</p>
      <MDBInput
        wrapperClass="mb-4"
        label="Username"
        name="username"
        id="form1"
        type="text"
        autoComplete="on"
        value={user.username}
        onChange={(e) => {
          changeHandler(e);
        }}
      />
      <p className=" alert-danger">{errorMsg.email}</p>
      <MDBInput
        wrapperClass="mb-4"
        label="Email"
        name="email"
        id="form1"
        type="email"
        autoComplete="on"
        value={user.email}
        onChange={(e) => {
          changeHandler(e);
        }}
      />
      <MDBInput
        wrapperClass="mb-4"
        label="Password"
        name="pwd"
        id="form1"
        type="password"
        value={user.pwd}
        onChange={(e) => {
          changeHandler(e);
        }}
      />
      <MDBInput
        wrapperClass="mb-4"
        label="Repeat Your Password"
        name="validPwd"
        id="form1"
        type="password"
        value={validPwd}
        onChange={(e) => {
          changeHandler(e);
        }}
      />

      <p className=" alert-danger">{errorMsg.pwd}</p>

      <div className="d-flex justify-content-center mb-4">
        <MDBCheckbox
          name="flexCheck"
          id="flexCheckDefault"
          label="I have read and agree to the terms"
        />
      </div>

      <MDBBtn className="mb-4 w-100">Sign up</MDBBtn>
    </form>
  );
}

export default Register;
