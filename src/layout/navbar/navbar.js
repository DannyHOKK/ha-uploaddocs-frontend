import { useEffect, useState } from "react";
import WORD_IMAGE from "../../img/word_image.png";

function Navbar() {
  const [currentUser, setCurrentUser] = useState(undefined);
  const [user, setUser] = useState(Object);

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light font-monospace p-4">
      <div className="container-fluid justify-content-between">
        <div>
          <a className="navbar-brand " href="#">
            <img src={WORD_IMAGE} alt="" width="40" height="40" />
            File Upload Application
          </a>
        </div>
        <div>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavDropdown"
            aria-controls="navbarNavDropdown"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavDropdown">
            <ul className="navbar-nav">
              <li className="nav-item px-2">
                <a className="nav-link active" aria-current="page" href="#">
                  Home
                </a>
              </li>
              <li className="nav-item px-2">
                <a className="nav-link" href="#">
                  Features
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
                <li className="nav-item px-2">
                  <a className="nav-link" href="#">
                    Username
                  </a>
                </li>
              ) : (
                <div></div>
              )}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
