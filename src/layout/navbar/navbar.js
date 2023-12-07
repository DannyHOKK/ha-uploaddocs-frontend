import { useEffect, useState } from "react";
import WORD_IMAGE from "../../img/word_image.png";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "../../api/AuthContext";

function HaNavbar() {
  const [currentUser, setCurrentUser] = useState(false);
  const [user, setUser] = useState({});
  const { logout } = useAuth();

  useEffect(() => {
    const userDetails = JSON.parse(localStorage.getItem("userDetails"));
    if (userDetails) {
      setCurrentUser(true);
      setUser(userDetails);
    } else {
      setCurrentUser(false);
      setUser({});
    }
  }, []);

  const signout = () => {
    logout();
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
              <a className="nav-link" href="/docsList">
                Docs List
              </a>
            </li>
            {/* <li className="nav-item px-2 dropdown">
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
            </li> */}

            <li className="nav-item px-2">
              <a className="nav-link" href="/userList">
                User List
              </a>
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
