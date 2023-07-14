import { useEffect, useState } from "react";
import WORD_IMAGE from "../../img/word_image.png";
import AuthService from "../../api/AuthService";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function HaNavbar() {
  const [currentUser, setCurrentUser] = useState(false);
  const [user, setUser] = useState({});

  useEffect(() => {
    const userDetails = JSON.parse(localStorage.getItem("userDetails"));
    console.log(userDetails);
    if (userDetails) {
      setCurrentUser(true);
      setUser(userDetails);
    } else {
      setCurrentUser(false);
      setUser({});
    }
  }, []);

  const notifyLogout = () => {
    console.log("noti");
    toast.success("Logout Successfully", {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: false,
      pauseOnHover: false,
      closeOnClick: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  const signout = () => {
    AuthService.SignOut();
    localStorage.setItem("logoutAlert", true);
  };

  return (
    <nav className="navbar flex-lg-column navbar-expand-lg navbar-light bg-light p-4 ">
      <div className="container-fluid justify-content-between">
        <div className=" navbar-brand">
          <a className="navbar-brand " href="#">
            <img src={WORD_IMAGE} alt="" width="40" height="40" />
            File Upload Application
          </a>
        </div>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavDropdown"
          aria-controls="navbarNavDropdown"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon">=</span>
        </button>
        <div
          className="collapse navbar-collapse justify-content-end"
          id="navbarNavDropdown"
        >
          <ul className="navbar-nav ml-auto">
            <li className="nav-item px-2">
              <a className="nav-link active" aria-current="page" href="#">
                Home
              </a>
            </li>
            <li className="nav-item px-2">
              <a className="nav-link" href="/uploadDocs">
                Upload Docs
              </a>
            </li>
            <li className="nav-item px-2">
              <a className="nav-link" href="#">
                Pricing
              </a>
            </li>
            <li className="nav-item px-2 dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                id="navbarDropdownMenuLink"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Dropdown link
              </a>
              <ul
                className="dropdown-menu"
                aria-labelledby="navbarDropdownMenuLink"
              >
                <li>
                  <a className="dropdown-item" href="#">
                    Action
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Another action
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Something else here
                  </a>
                </li>
              </ul>
            </li>
            {currentUser ? (
              <>
                <li className="nav-item px-2">
                  <a className="nav-link" href="/userDetails">
                    {user.username}
                  </a>
                </li>
                <li className="nav-item px-2">
                  <a
                    className="nav-link active"
                    aria-current="page"
                    href="/"
                    onClick={signout}
                  >
                    Log out
                  </a>
                </li>
              </>
            ) : (
              <div></div>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default HaNavbar;
