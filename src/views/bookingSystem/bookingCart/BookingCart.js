import React, { useEffect, useState } from "react";
import "./BookingCart.css";
import BookingService from "../../../api/BookingService";

const BookingCart = () => {
  const [bookingCart, setBookingCart] = useState([]);

  useEffect(() => {
    const userDetails = JSON.parse(localStorage.getItem("userDetails"));
    cartDetailsUpdate(userDetails.id);
  }, []);

  const cartDetailsUpdate = async (userId) => {
    const res = await BookingService.getCart(userId);
    setBookingCart(res.data.data);
    console.log(bookingCart);
  };

  return (
    <div className="booking-cart-container">
      <div className="booking-cart-layout">
        <h4>購物車 ({bookingCart.length})</h4>
        <div>
          {bookingCart.map((item) => (
            <>
              <p>{item.cartId}</p>

              <div className="booking-cart-card">
                <div>{item.venueInfo.venueName}</div>

                <div>
                  {item.venueInfo.venueName} | 容納人數 {item.venueInfo.nop} |
                  面積(平方呎) {item.venueInfo.area}
                </div>
                <div>日期 {item.bookingDate}</div>

                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <span>房間費用</span> <span>HK$200</span>
                </div>
              </div>
            </>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BookingCart;
