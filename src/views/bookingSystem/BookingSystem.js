import { Carousel, DatePicker, Select } from "antd";
import React, { useEffect, useRef, useState } from "react";
import slider1 from "../../img/slider1.png";
import "./BookingSystem.css";
import { Today } from "@mui/icons-material";
import dayjs from "dayjs";
import venue1 from "../../img/venue1.png";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import BookingService from "../../api/BookingService";
import blobToUrl from "../../utils/blobToUrl";

function BookingSystem() {
  const [filter, setFilter] = useState({
    venue: [],
    headcount: [],
    weekday: [],
  });
  const venueOptions = [
    {
      value: "all",
      label: "所有",
    },
    {
      value: "con",
      label: "會議室",
    },
    {
      value: "sd",
      label: "活動室",
    },
    {
      value: "qwe",
      label: "演講室",
    },
    {
      value: "zx",
      label: "禮堂",
    },
    {
      value: "sda",
      label: "大堂",
    },
  ];

  const headcountOptions = [
    {
      value: "all",
      label: "所有",
    },
    {
      value: "con",
      label: "<30",
    },
    {
      value: "sd",
      label: "30-50",
    },
    {
      value: "qwe",
      label: "50-100",
    },
    {
      value: "zx",
      label: ">100",
    },
  ];
  const weekdayOptions = [
    {
      value: "all",
      label: "所有",
    },
    {
      value: "con",
      label: "週一",
    },
    {
      value: "sd",
      label: "週二",
    },
    {
      value: "qwe",
      label: "週三",
    },
    {
      value: "zx",
      label: "週四",
    },
    {
      value: "zx",
      label: "週五",
    },
    {
      value: "zx",
      label: "週六",
    },
    {
      value: "zx",
      label: "週日",
    },
  ];

  const venueDetails = [
    {
      venueName: "禮堂",
      headCount: "310",
      area: "5345",
    },
    {
      venueName: "一樓大堂",
      headCount: "",
      area: "610",
    },
    {
      venueName: "演講廳201",
      headCount: "100",
      area: "1625",
    },
    {
      venueName: "會議室202",
      headCount: "20",
      area: "212",
    },
    {
      venueName: "會議室203",
      headCount: "25",
      area: "282",
    },
    {
      venueName: "會議室205",
      headCount: "25",
      area: "284",
    },
    {
      venueName: "會議室206",
      headCount: "25",
      area: "284",
    },
    {
      venueName: "會議室207",
      headCount: "25",
      area: "284",
    },
  ];

  const dateChangeHandler = (e) => {};

  const venueHandler = (e) => {
    console.log(e);
    setFilter((query) => ({
      ...query,
      venue: e,
    }));
  };
  const headcountHandler = (e) => {
    console.log(e);
    setFilter((query) => ({
      ...query,
      headcount: e,
    }));
  };
  const weekdayHandler = (e) => {
    console.log(e);
    setFilter((query) => ({
      ...query,
      weekday: e,
    }));
  };
  const disabledDate = (current) => {
    // Can not select days before today and today
    return current && current < dayjs().endOf("day");
  };
  const handleDeselect = (value) => {
    console.log(`Deselected: ${value}`);
    // Perform additional actions when an item is deselected
  };
  const checkBoxShowHandler = () => {
    const check = document.getElementsByClassName("checkbox");
    const checkboxList = document.getElementsByClassName("checkbox-list");
    console.log(check[0].style.display);
    if (check[0].style.display === "none") {
      check[0].style.display = "block";
      checkboxList[0].style.borderColor = "grey";
      console.log("hack");
    }
  };

  const [open1, setOpen1] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [open3, setOpen3] = useState(false);
  const [open4, setOpen4] = useState(false);
  const [venue, setVeune] = useState([]);

  let menuRef = useRef();
  let menuRef2 = useRef();
  let menuRef3 = useRef();
  let menuRef4 = useRef();

  useEffect(() => {
    getVenueList();
    let handler = (e) => {
      if (!menuRef.current.contains(e.target)) {
        setOpen1(false);
      }
      if (!menuRef2.current.contains(e.target)) {
        setOpen2(false);
      }
      if (!menuRef3.current.contains(e.target)) {
        setOpen3(false);
      }
    };
    document.addEventListener("mousedown", handler);
  }, []);

  const getVenueList = async () => {
    const res = await BookingService.getVenueList();

    if (res.data.data !== null) setVeune(res.data.data);
  };

  const convertVenuePhoto = (photo) => {
    return URL.createObjectURL(blobToUrl(photo));
  };

  return (
    <>
      <div style={{ margin: "0 15% 0 15%" }}>
        <div>
          <img src={slider1} style={{ width: "100%" }} />
        </div>
        <div className="background-image">
          <div className="booking-container">
            <h5>搜尋結果: {} </h5>
            <div className="booking-search">
              <DatePicker
                style={{
                  width: "160px",
                }}
                onChange={dateChangeHandler}
                picker="month"
                disabledDate={disabledDate}
              />
              <div ref={menuRef}>
                <ul className={`checkbox-list ${open1 ? "active-border" : ""}`}>
                  <li
                    tabIndex="0"
                    onClick={() => {
                      setOpen1(!open1);
                    }}
                  >
                    <strong>場地種類</strong>{" "}
                    {open1 ? (
                      <ExpandLessIcon style={{ width: "17px" }} />
                    ) : (
                      <ExpandMoreIcon style={{ width: "17px" }} />
                    )}
                  </li>
                  <li>
                    <ul
                      className={`checkbox ${
                        open1 ? "box-active" : "inactive"
                      } `}
                    >
                      <li tabIndex="0">
                        <input type="checkbox" id="all" />
                        <label for="all">所有</label>
                      </li>
                      <li tabIndex="0">
                        <input type="checkbox" id="venue1" />
                        <label for="venue1">會議室</label>
                      </li>
                      <li tabIndex="0">
                        <input type="checkbox" id="venue2" />
                        <label for="venue2">活動室</label>
                      </li>
                      <li tabIndex="0">
                        <input type="checkbox" id="venue3" />
                        <label for="venue3">演講廳</label>
                      </li>
                      <li tabIndex="0">
                        <input type="checkbox" id="venue4" />
                        <label for="venue4">禮堂</label>
                      </li>
                      <li tabIndex="0">
                        <input type="checkbox" id="venue5" />
                        <label for="venue5">大堂</label>
                      </li>
                    </ul>
                  </li>
                </ul>
              </div>

              <div ref={menuRef2}>
                <ul className={`checkbox-list ${open2 ? "active-border" : ""}`}>
                  <li
                    tabIndex="0"
                    onClick={() => {
                      setOpen2(!open2);
                    }}
                  >
                    <strong>人數</strong>
                    {open2 ? (
                      <ExpandLessIcon style={{ width: "17px" }} />
                    ) : (
                      <ExpandMoreIcon style={{ width: "17px" }} />
                    )}
                  </li>
                  <li>
                    <ul
                      className={`checkbox ${
                        open2 ? "box-active" : "inactive"
                      } `}
                    >
                      <li tabIndex="0">
                        <input type="checkbox" id="all2" />
                        <label for="all2">所有</label>
                      </li>
                      <li tabIndex="0">
                        <input type="checkbox" id="30" />
                        <label for="30"> &lt;30 </label>
                      </li>
                      <li tabIndex="0">
                        <input type="checkbox" id="50" />
                        <label for="50">30-50</label>
                      </li>
                      <li tabIndex="0">
                        <input type="checkbox" id="100" />
                        <label for="100">50-100</label>
                      </li>
                      <li tabIndex="0">
                        <input type="checkbox" id="101" />
                        <label for="101">&gt;100</label>
                      </li>
                    </ul>
                  </li>
                </ul>
              </div>

              <div ref={menuRef3}>
                <ul className={`checkbox-list ${open3 ? "active-border" : ""}`}>
                  <li
                    tabIndex="0"
                    onClick={() => {
                      setOpen3(!open3);
                    }}
                  >
                    <strong>週日/週末</strong>{" "}
                    {open3 ? (
                      <ExpandLessIcon style={{ width: "17px" }} />
                    ) : (
                      <ExpandMoreIcon style={{ width: "17px" }} />
                    )}
                  </li>
                  <li>
                    <ul
                      className={`checkbox ${
                        open3 ? "box-active" : "inactive"
                      } `}
                    >
                      <li tabIndex="0">
                        <input type="checkbox" id="all3" />
                        <label for="all3">所有</label>
                      </li>
                      <li tabIndex="0">
                        <input type="checkbox" id="mon" />
                        <label for="mon">週一</label>
                      </li>
                      <li tabIndex="0">
                        <input type="checkbox" id="tue" />
                        <label for="tue">週二</label>
                      </li>
                      <li tabIndex="0">
                        <input type="checkbox" id="wed" />
                        <label for="wed">週三</label>
                      </li>
                      <li tabIndex="0">
                        <input type="checkbox" id="thr" />
                        <label for="thr">週四</label>
                      </li>
                      <li tabIndex="0">
                        <input type="checkbox" id="fri" />
                        <label for="fri">週五</label>
                      </li>
                      <li tabIndex="0">
                        <input type="checkbox" id="sat" />
                        <label for="sat">週六</label>
                      </li>
                      <li tabIndex="0">
                        <input type="checkbox" id="sun" />
                        <label for="sun">週日</label>
                      </li>
                    </ul>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="venue-card-container">
            {venue.map((venue) => (
              <div className="venue-card">
                <a href={"/bookingPage/" + venue.id}>
                  <div>
                    <img src={convertVenuePhoto(venue.photo)} />
                  </div>
                  <div className="venue-card-text">
                    <h6>
                      <strong>{venue.venueName}</strong>
                    </h6>
                    <p>
                      容納人數: {venue.nop} <br />
                      面積(平方呎): {venue.area}
                    </p>
                  </div>
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default BookingSystem;
