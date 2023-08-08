import React, { useEffect, useRef, useState } from "react";
import { MDBBtn, MDBInput, MDBCheckbox } from "mdb-react-ui-kit";
import AuthService from "../../api/AuthService";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Register() {
  const inputRef = useRef();
  const [validPwd, setValidPwd] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [status, setStatus] = useState("");
  const [submitButton, setSubmitButton] = useState(false);
  const [success, setSuccess] = useState(false);

  const [user, setUser] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
  });

  const PWD_REGEX = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
  const EMAIL_REGEX =
    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const changeHandler = (e) => {
    const { name, value } = e.target;
    if (name === "validPwd") {
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
    setStatus("");
    const msg = userValidator(user);
    console.log(Object.keys(msg).length);
    if (Object.keys(msg).length === 0) {
      AuthService.registerUser(user)
        .then((res) => {
          console.log("then");
          console.log(res.data.code);
          if (res && res.data) {
            if (res.data.code === -1) {
              setStatus(res.data.msg);
              console.log(res.data.msg);
            } else if (res.data.code === 0) {
              notify();
              setSuccess(true);
            }
          }
        })
        .catch((error) => {
          console.log("ERROR: ");
          console.log(error);
        });
    }
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
    if (!user.password) {
      msg.pwd = "Password is required";
    } else if (user.password !== validPwd) {
      msg.pwd = "Password not same ";
    } else if (!PWD_REGEX.test(user.password)) {
      msg.pwd =
        "Password must contain a special character and greater than 8 characters";
    }
    console.log(msg);
    setErrorMsg(msg);
    return msg;
  };

  const handleCheckboxChange = () => {
    setSubmitButton(!submitButton);
  };

  const notify = () => {
    toast.success("Register Successfully", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  return (
    <>
      {success ? (
        window.location.reload()
      ) : (
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
            name="password"
            id="form1"
            type="password"
            value={user.password}
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
          <div className="">
            <p className=""> - password must contain 8 character</p>
            <p className=""> - password must contain 1 special character</p>
            <p className=""> - password must contain uppercase/lowercase</p>
          </div>

          <p className=" alert-danger">{errorMsg.pwd}</p>
          <p className=" alert-danger">{status}</p>

          <div className="d-flex justify-content-center mb-4">
            <MDBCheckbox
              name="flexCheck"
              id="flexCheckDefault"
              label="I have read and agree to the terms"
              onChange={handleCheckboxChange}
            />
          </div>

          <MDBBtn className="mb-4 w-100" disabled={!submitButton}>
            Sign up
          </MDBBtn>
        </form>
      )}
    </>
  );
}

export default Register;
