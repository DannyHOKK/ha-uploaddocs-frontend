import { useEffect, useState } from "react";
import WORD_IMAGE from "../../img/word_image.png";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "../../api/AuthContext";
import { DarkMode } from "../../views/DarkMode";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Badge } from "antd";
import BookingService from "../../api/BookingService";

function HaNavbar() {
  const [currentUser, setCurrentUser] = useState(false);
  const [user, setUser] = useState({});
  const [bookingCartLength, setBookingCartLength] = useState("");
  const { logout } = useAuth();

  useEffect(() => {
    const userDetails = JSON.parse(localStorage.getItem("userDetails"));
    if (userDetails) {
      setCurrentUser(true);
      setUser(userDetails);
      cartLength(userDetails.id);
    } else {
      setCurrentUser(false);
      setUser({});
    }
  }, []);

  const cartLength = async (userId) => {
    const res = await BookingService.getCart(userId);

    setBookingCartLength(res.data.data.length);
  };

  const signout = () => {
    logout();
    localStorage.setItem("logoutAlert", true);
  };

  return (
    <nav className="navbar flex-lg-column navbar-expand-lg navbar-light">
      <div className="container-fluid justify-content-between">
        <div className=" navbar-brand">
          <a className="navbar-brand " href="#">
            <img src={WORD_IMAGE} alt="" width="40" />
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
              <a className="nav-link" href="/bookingSystem">
                Booking System
              </a>
            </li>
            <li className="nav-item px-2">
              <a className="nav-link" href="/docsList">
                Docs List
              </a>
            </li>
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

                <li className="nav-item px-2">
                  <a className="nav-link" href="/booking/cart">
                    <Badge count={bookingCartLength}>
                      <ShoppingCartIcon />
                    </Badge>
                  </a>
                </li>
              </>
            ) : (
              <div></div>
            )}
          </ul>
        </div>
        {/* <DarkMode /> */}
      </div>
    </nav>
  );
}

export default HaNavbar;
