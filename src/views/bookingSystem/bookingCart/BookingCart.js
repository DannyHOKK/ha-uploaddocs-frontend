import React, { useEffect, useState } from "react";
import "./BookingCart.css";
import BookingService from "../../../api/BookingService";
import DeleteIcon from "@mui/icons-material/Delete";
import { Button, ThemeProvider, createTheme } from "@mui/material";
import { Divider } from "antd";
import LocalAtmIcon from "@mui/icons-material/LocalAtm";
import EventNoteIcon from "@mui/icons-material/EventNote";

// const Testing = (props) => {
//   const { item } = props;
//   return <>{console.log(item.item1)}</>;
// };

const BookingCart = () => {
  const [bookingCart, setBookingCart] = useState([]);
  const theme = createTheme({
    palette: {
      ochre: {
        main: "#FF7414",
        light: "#E9DB5D",
        dark: "#A29415",
      },
    },
  });

  useEffect(() => {
    const userDetails = JSON.parse(localStorage.getItem("userDetails"));
    cartDetailsUpdate(userDetails.id);
  }, []);

  const cartDetailsUpdate = async (userId) => {
    const res = await BookingService.getCart(userId);
    setBookingCart(res.data.data);
  };

  const cancelBookingHandler = async (cartId) => {
    const res = await BookingService.deleteCartById(cartId);

    window.location.reload();
  };

  return (
    <ThemeProvider theme={theme}>
      <div className="booking-cart-container">
        <div className="booking-cart-layout">
          <h4>購物車 ({bookingCart.length})</h4>

          {bookingCart.map((item, index) => (
            <>
              {console.log(item)}
              <div key={index} className="booking-cart-card">
                <div style={{ color: "#FF7414", fontSize: "10px" }}>
                  項目 #{index + 1}
                </div>
                <div style={{ fontWeight: "900", fontSize: "18px" }}>
                  {item.venueInfo.venueName}
                </div>
                <div>
                  {item.venueInfo.venueName} | 容納人數 {item.venueInfo.nop} |
                  面積(平方呎) {item.venueInfo.area}
                </div>
                <hr className="divier" />
                <div>日期 {item.bookingDate}</div>
                <hr className="divier" />
                {Object.keys(item.bookingItem).map((keys) => (
                  <p key={keys}>
                    {item.bookingItem[keys] > 0 ? (
                      <>
                        {keys}: {item.bookingItem[keys]}
                      </>
                    ) : (
                      <></>
                    )}
                  </p>
                ))}
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <span>房間費用</span>
                  <span>HK$200</span>
                </div>
                <div style={{ margin: "10px 0" }}>
                  <Button
                    component="label"
                    variant="outlined"
                    color="ochre"
                    startIcon={<DeleteIcon />}
                    style={{ width: "100%" }}
                    onClick={() => {
                      cancelBookingHandler(item.cartId);
                    }}
                  >
                    取消預訂
                  </Button>
                </div>
              </div>
            </>
          ))}
          <Divider />
          <br />
          <h4>預訂摘要({bookingCart.length})</h4>
          <div className="booking-cart-card">
            <div className="space-between">
              <span>預訂項目</span>
              <span>價錢</span>
            </div>
            {bookingCart.map((item, index) => (
              <>
                <div className="space-between">
                  <span>#{index + 1}</span>
                  <span>HK$750</span>
                </div>
              </>
            ))}

            <hr className="divier" />
            <div className="space-between">
              <span>折扣優惠</span>
              <span>- HK$50</span>
            </div>
            <hr className="divier" />

            <div className="space-between">
              <span>總收費</span>
              <span>HK$900</span>
            </div>
            <div className="space-between" style={{ marginTop: "10px" }}>
              <Button
                component="label"
                variant="outlined"
                color="ochre"
                startIcon={<EventNoteIcon />}
                style={{ width: "100%", marginRight: "10px" }}
              >
                繼續預約
              </Button>
              <Button
                component="label"
                variant="outlined"
                color="ochre"
                startIcon={<LocalAtmIcon />}
                style={{ width: "100%", marginLeft: "10px" }}
              >
                訂單結算
              </Button>
            </div>
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default BookingCart;
