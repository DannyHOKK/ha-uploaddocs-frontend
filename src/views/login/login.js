import React, { useEffect, useRef, useState } from "react";
import {
  MDBContainer,
  MDBTabs,
  MDBTabsItem,
  MDBTabsLink,
  MDBTabsContent,
  MDBTabsPane,
  MDBBtn,
  MDBInput,
  MDBCheckbox,
} from "mdb-react-ui-kit";
import Register from "../register/Register";
import AuthService from "../../api/AuthService";

function Login() {
  const inputRef = useRef();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [justifyActive, setJustifyActive] = useState("tab1");

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const submitHandler = (e) => {
    AuthService.loginUser(user);
  };

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setUser((e) => ({
      ...user,
      [name]: value,
    }));
  };

  const handleJustifyClick = (value) => {
    if (value === justifyActive) {
      return;
    }
    setJustifyActive(value);
  };

  return (
    <MDBContainer className="p-3 my-5 d-flex flex-column w-50">
      <MDBTabs
        pills
        justify
        className="mb-3 d-flex flex-row justify-content-between"
      >
        <MDBTabsItem>
          <MDBTabsLink
            onClick={() => handleJustifyClick("tab1")}
            active={justifyActive === "tab1"}
          >
            Login
          </MDBTabsLink>
        </MDBTabsItem>
        <MDBTabsItem>
          <MDBTabsLink
            onClick={() => handleJustifyClick("tab2")}
            active={justifyActive === "tab2"}
          >
            Register
          </MDBTabsLink>
        </MDBTabsItem>
      </MDBTabs>

      <MDBTabsContent>
        <MDBTabsPane show={justifyActive === "tab1"}>
          <div className="text-center mb-3"></div>
          <form onSubmit={(e) => submitHandler(e)}>
            <MDBInput
              wrapperClass="mb-4"
              ref={inputRef}
              label="Email address"
              id="form1"
              name="email"
              type="email"
              value={user.email}
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
          <p className="text-center">
            Not a member?
            <a
              onClick={() => handleJustifyClick("tab2")}
              active={justifyActive === "tab2"}
            >
              Register
            </a>
          </p>
        </MDBTabsPane>

        <MDBTabsPane show={justifyActive === "tab2"}>
          <Register />
        </MDBTabsPane>
      </MDBTabsContent>
    </MDBContainer>
  );
}

export default Login;
