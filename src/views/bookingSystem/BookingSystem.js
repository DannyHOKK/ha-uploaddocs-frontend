import { Carousel, DatePicker, Select } from "antd";
import React, { useState } from "react";
import slider1 from "../../img/slider1.png";
import "./BookingSystem.css";
import { Today } from "@mui/icons-material";
import dayjs from "dayjs";
import venue1 from "../../img/venue1.png";

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
      venueName: "會議室204",
      headCount: "25",
      area: "284",
    },
    {
      venueName: "會議室204",
      headCount: "25",
      area: "284",
    },
    {
      venueName: "會議室204",
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
  return (
    <>
      <div style={{ margin: "0 15% 0 15%" }}>
        <div>
          <img src={slider1} style={{ width: "100%" }} />
        </div>
        <div className="background-image">
          <div className="booking-container">
            <div>搜尋結果: {} </div>
            <div className="booking-search">
              <DatePicker
                style={{
                  width: "100%",
                }}
                onChange={dateChangeHandler}
                picker="month"
                disabledDate={disabledDate}
              />
              <Select
                mode="multiple"
                style={{
                  width: "100%",
                  borderColor: "black",
                  color: "blue",
                  fontWeight: "bold",
                }}
                name="venue"
                placeholder="場地"
                onChange={venueHandler}
                options={venueOptions}
                onDeselect={handleDeselect}
              />

              <Select
                mode="tags"
                style={{
                  width: "100%",
                }}
                name="ppl"
                placeholder="人數"
                onChange={headcountHandler}
                options={headcountOptions}
              />
              <Select
                mode="tags"
                style={{
                  width: "100%",
                }}
                name="ppl"
                placeholder="週日/週末"
                onChange={headcountHandler}
                options={weekdayOptions}
              />
            </div>
          </div>
          <div className="venue-card-container">
            {venueDetails.map((venue, index) => (
              <div className="venue-card">
                <div>
                  <img src={venue1} />
                </div>
                <div className="venue-card-text">
                  <h6>{venue.venueName}</h6>
                  <p>
                    容納人數: {venue.headCount} <br />
                    面積(平方呎): {venue.area}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default BookingSystem;
