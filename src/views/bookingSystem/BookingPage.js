import {
  Alert,
  Calendar,
  Carousel,
  Checkbox,
  Col,
  Divider,
  Form,
  Input,
  Row,
  Select,
} from "antd";
import React, { useContext, useEffect, useReducer, useState } from "react";
import "./BookingPage.css";
import bookingPage1 from "../../img/bookingPage1.png";
import dayjs from "dayjs";
import { Button } from "@mui/material";
import LocalAtmIcon from "@mui/icons-material/LocalAtm";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { additional_item, stage_item } from "./items/items";
import { BookingPageContext } from "./BookingPageContext";
import QuantityBtn from "./QuantityBtn";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import { useParams } from "react-router-dom";
import BookingService from "../../api/BookingService";

function BookingPage() {
  const data = [
    {
      alt: "Image 1 for carousel",
    },
    {
      alt: "Image 2 for carousel",
    },
    {
      alt: "Image 3 for carousel",
    },
  ];

  const textUploaded = [
    { id: "1", text: "9:00", checked: false, booking: false },
    { id: "2", text: "10:00", checked: false, booking: false },
    { id: "3", text: "11:00", checked: false, booking: false },
    { id: "4", text: "12:00", checked: false, booking: false },
    { id: "5", text: "13:00", checked: false, booking: false },
    { id: "6", text: "14:00", checked: false, booking: false },
    { id: "7", text: "15:00", checked: false, booking: false },
    { id: "8", text: "16:00", checked: false, booking: false },
    { id: "9", text: "17:00", checked: false, booking: false },
    { id: "10", text: "18:00", checked: false, booking: false },
    { id: "11", text: "19:00", checked: false, booking: false },
    { id: "12", text: "20:00", checked: false, booking: false },
    { id: "13", text: "21:00", checked: false, booking: false },
    { id: "14", text: "22:00", checked: false, booking: false },
  ];

  const [state, dispatch] = useReducer(reducer, textUploaded);
  const [dateValue, setDateValue] = useState(() => dayjs().endOf("today"));
  const [selectedValue, setSelectedValue] = useState(() =>
    dayjs().endOf("today")
  );
  const [venueDetails, setVenueDetails] = useState([]);
  const params = useParams();
  const [expand, setExpand] = useState(false);
  const [expand2, setExpand2] = useState(false);
  const [cartDetails, setCartDetails] = useState({
    bookingDate: "",
    bookingItem: {
      item1: 0,
      item2: 0,
      item3: 0,
      item4: 0,
      item5: 0,
      item6: 0,
      item7: 0,
      item8: 0,
      item9: 0,
      item10: 0,
      item11: 0,
      item12: 0,
      item13: 0,
    },
    eventName: "",
    extraCharge: "",
    foodOption: false,
    howToKnow: "",
    nature: "",
    other: "",
    timeslot: {
      bookingTimeslot1: false,
      bookingTimeslot2: false,
      bookingTimeslot3: false,
      bookingTimeslot4: false,
      bookingTimeslot5: false,
      bookingTimeslot6: false,
      bookingTimeslot7: false,
      bookingTimeslot8: false,
      bookingTimeslot9: false,
      bookingTimeslot10: false,
      bookingTimeslot11: false,
      bookingTimeslot12: false,
      bookingTimeslot13: false,
    },
    venueID: 0,
    venueUsage: "",
  });
  const { cartItems } = useContext(BookingPageContext);

  useEffect(() => {
    getVenue();
  }, []);

  function reducer(state, action) {
    switch (action.type) {
      case "select":
        const list = state.map((item) =>
          item.id === action.item.id
            ? { ...item, checked: !item.checked }
            : item
        );
        return list;
      default:
        throw new Error();
    }
  }

  const getVenue = async () => {
    const response = await BookingService.getVenue(params.id);
    setVenueDetails(response.data.data);
  };

  const onSelect = (newValue) => {
    setDateValue(newValue);
    setSelectedValue(newValue);
  };
  const onPanelChange = (newValue) => {
    setDateValue(newValue);
  };

  const hideItemCardHandler = (idName) => {
    const card1 = document.getElementById(idName);
    if (card1.style.display === "" || card1.style.display === "block") {
      card1.style.display = "none";
      setExpand(true);
    } else if (card1.style.display === "none") {
      card1.style.display = "block";
      setExpand(false);
    }
  };

  const hideItemCardHandler2 = (idName) => {
    const card1 = document.getElementById(idName);
    if (card1.style.display === "" || card1.style.display === "block") {
      card1.style.display = "none";
      setExpand2(true);
    } else if (card1.style.display === "none") {
      card1.style.display = "block";
      setExpand2(false);
    }
  };

  const cartChangeHandler = (e) => {
    const { name, value } = e.target;
    setCartDetails(() => ({
      ...cartDetails,
      [name]: value,
    }));
    console.log(cartDetails);
  };

  const cartNatureChangeHandler = (value, option) => {
    setCartDetails((prevCartDetails) => ({
      ...prevCartDetails,
      nature: value,
    }));
  };
  const cartHowToKnowChangeHandler = (value, option) => {
    setCartDetails((prevCartDetails) => ({
      ...prevCartDetails,
      howToKnow: value,
    }));
  };
  const cartFoodOptionChangeHandler = (e) => {
    const { name, value, checked } = e.target;

    setCartDetails((prevCartDetails) => ({
      ...prevCartDetails,
      [name]: checked,
    }));
  };

  const [bookingCartSubmit, setBookingCartSubmit] = useState(false);
  const bookingCartHandler = () => {
    const updatedTimeslot = { ...cartDetails.timeslot };
    const updateCartItems = { ...cartDetails.bookingItem };

    state.forEach((item, index) => {
      const name = "bookingTimeslot" + item.id;

      updatedTimeslot[name] = item.checked;
    });

    cartItems.forEach((item) => {
      const name = "item" + item.id;
      updateCartItems[name] = item.quantity;
    });

    const formattedBookingDate = dateValue.format("DD/MM/YYYY");

    setCartDetails((prevCartDetails) => ({
      ...prevCartDetails,
      bookingDate: formattedBookingDate,
      bookingItem: updateCartItems,
      timeslot: updatedTimeslot,
      venueID: params.id,
    }));

    setBookingCartSubmit(!bookingCartSubmit);
  };

  useEffect(() => {
    try {
      const response = BookingService.createCart(cartDetails);
      console.log(cartDetails);
      // Handle the response as needed
      console.log("API response:", response);
    } catch (error) {
      console.error("Error making API call:", error);
    }
  }, [bookingCartSubmit]);

  return (
    <div className="booking-page-container">
      <div style={{ margin: "0 6% 0 6%" }}>
        <div className="booking-page-carosuel">
          <Carousel autoplay>
            {data.map((item, index) => (
              <div>
                <img
                  src={bookingPage1}
                  alt={item.alt}
                  style={{ width: "100%" }}
                />
              </div>
            ))}
          </Carousel>
        </div>

        <Divider />
        <div className="event-details-container">
          {
            <>
              <h3>{venueDetails.venueName}</h3>
              <p>
                {venueDetails.venueName} | 容納人數 {venueDetails.nop} |
                面積(平方呎) {venueDetails.area}
              </p>
            </>
          }
          <br />
          <h3>簡介</h3>
          <p>
            位於2樓的演講廳及多用途會議室，面積由212至1,625平方呎，全部均配備基本的會議設施，適合舉行不同類型的會議、研討會、工作坊、排練及小型活動。
          </p>
          <br />
          <h3>注意事項</h3>
          <ol>
            <li>出租時間：星期一至日，上午9時至晚上10時</li>
            <li>
              收費以小時計，禮堂每次最少3小時，演講廳及會議室每次最少2小時，之後以每1小時為計算單位，超時15分鐘或以上作1小時計。
            </li>
            <li>
              本會大門於晚上10時15分關閉，因此晚上10時後恕不接受超時租用。​
            </li>
          </ol>
          <br />
          <h4>收費概覽</h4>
          <table>
            <tbody>
              <tr>
                <th>
                  <strong>政府認可服務機構或註冊慈善團體#</strong>
                  <br />
                  辦公時間 (一至六，09:00 - 18:00) | 非辦公時間
                  <br />
                  <strong style={{ color: "orange" }}>$280 | $410</strong>
                </th>
                <th>
                  <strong>其他機構</strong>
                  <br />
                  辦公時間 (一至六，09:00 - 18:00) | 非辦公時間
                  <br />
                  <strong style={{ color: "orange" }}>$410 | $580</strong>
                </th>
              </tr>
            </tbody>
          </table>
          <br />
          <p>
            #需出示政府認可文件以茲證明及所舉辦的活動需為非商業性活動方可享此優惠
            <br />
            *另備其他收費設施
          </p>
          <br />
          <h4>附加物件</h4>
          <div className="additional-item">
            <div className="additional-item-card">
              <p>
                <strong>手提電腦</strong>
                <br />
                收費$100
                <br />
              </p>
              <div>
                <strong style={{ color: "orange" }}>詳細資料 &rarr; </strong>
              </div>
            </div>
            <div className="additional-item-card">
              <p>
                <strong>會議講解板</strong>
                <br />
                收費$100
                <br />
              </p>
              <div>
                <strong style={{ color: "orange" }}>詳細資料 &rarr; </strong>
              </div>
            </div>
            <div className="additional-item-card">
              <p>
                <strong>台階 (3x3x3尺)</strong>
                <br />
                收費$100
                <br />
              </p>
              <div>
                <strong style={{ color: "orange" }}>詳細資料 &rarr; </strong>
              </div>
            </div>
          </div>
        </div>
        <Divider />
        <div>
          <Alert
            message={`你選擇的日期是: ${selectedValue?.format("YYYY-MM-DD")}`}
          />
          <Calendar
            value={dateValue}
            onSelect={onSelect}
            onPanelChange={onPanelChange}
          />
        </div>
        <Divider />
        <div className="time-select">
          <h3>
            <span style={{ color: "red" }}>*</span>選擇時間
          </h3>
          <p>至少選擇兩小時</p>

          <div className="time-box-container">
            {state.map((item) => (
              <div
                onClick={
                  item.booking ? null : () => dispatch({ type: "select", item })
                }
                className={
                  item.booking
                    ? "time-box item-booked"
                    : item.checked
                    ? "time-box selected"
                    : "time-box"
                }
              >
                <p>
                  辦工時間
                  <br />
                  <strong style={{ fontSize: "16px" }}>{item.text}</strong>
                  <br />
                  {item.booking ? "預約滿額" : "可預約"}
                </p>
              </div>
            ))}
          </div>
          <div>已選時段:</div>
        </div>
        <Divider />
        <table className="item-table">
          <tbody>
            <tr>
              <th>
                <span style={{ color: "red" }}>*</span>選擇設備
              </th>
              <th>選擇附加物件</th>
            </tr>
            <tr>
              <td>
                <div className="item-card">
                  <div className="item-card-header">基本套餐一</div>
                  {stage_item.map((item) => (
                    <div className="item-count">
                      <QuantityBtn product={item} />
                    </div>
                  ))}
                  <div className="item-cost">HK$450</div>
                </div>
              </td>
              <td>
                <div className="item-card">
                  {additional_item.map((item) => (
                    <div className="item-count">
                      <QuantityBtn product={item} />
                    </div>
                  ))}
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        <Divider />
        <div className="input-details-container">
          <div className="item-header">
            <h3>
              <span style={{ color: "red" }}>*</span>活動資料
            </h3>{" "}
            <a onClick={() => hideItemCardHandler("item-card-1")}>
              {expand ? <AddIcon /> : <RemoveIcon />}
            </a>
          </div>
          <div id="item-card-1">
            <Form className="form" layout="vertical">
              <Row>
                <Col span={11} key={0} style={{ marginRight: "50px" }}>
                  <Form.Item label="活動名稱">
                    <Input
                      name="eventName"
                      type="eventName"
                      value={cartDetails.eventName}
                      onChange={cartChangeHandler}
                    />
                  </Form.Item>
                </Col>

                <Col span={11} key={1}>
                  <Form.Item label="性質">
                    <Select
                      name="nature"
                      defaultValue=""
                      onChange={cartNatureChangeHandler}
                    >
                      <Select.Option value="">請選擇以下其中一個</Select.Option>
                      <Select.Option value="典禮">典禮</Select.Option>
                      <Select.Option value="畢業">畢業</Select.Option>
                      <Select.Option value="結婚">結婚</Select.Option>
                    </Select>
                  </Form.Item>
                </Col>
              </Row>

              <Row>
                <Col span={11} key={0} style={{ marginRight: "50px" }}>
                  <Form.Item label="收費(僅適用於商業活動)">
                    <Input
                      name="extraCharge"
                      type="extraCharge"
                      value={cartDetails.extraCharge}
                      onChange={cartChangeHandler}
                    />
                  </Form.Item>
                </Col>

                <Col span={11} key={1}>
                  <Form.Item label="場地用途">
                    <Input
                      name="venueUsage"
                      type="venueUsage"
                      value={cartDetails.venueUsage}
                      onChange={cartChangeHandler}
                    />
                  </Form.Item>
                </Col>
              </Row>
            </Form>
          </div>
          <Divider />
          <div className="other-container">
            <div className="item-header">
              <h3>其他</h3>{" "}
              <a onClick={() => hideItemCardHandler2("item-card-2")}>
                {expand2 ? <AddIcon /> : <RemoveIcon />}
              </a>
            </div>
            <div id="item-card-2">
              <Form className="form" layout="vertical">
                <Row>
                  <Col span={11} key={0} style={{ marginRight: "50px" }}>
                    <Form.Item label="備註(可能涉及額外收費)">
                      <Input
                        name="other"
                        type="other"
                        value={cartDetails.other}
                        onChange={cartChangeHandler}
                      />
                    </Form.Item>
                  </Col>

                  <Col span={11} key={1}>
                    <Form.Item label="如何得知本公司的租用計劃">
                      <Select
                        name="howToKnow"
                        defaultValue=""
                        onChange={cartHowToKnowChangeHandler}
                      >
                        <Select.Option value="">
                          請選擇以下其中一個
                        </Select.Option>
                        <Select.Option value="youtube">Youtube</Select.Option>
                        <Select.Option value="facebook">Facebook</Select.Option>
                        <Select.Option value="instagram">
                          Instagram
                        </Select.Option>
                      </Select>
                    </Form.Item>
                  </Col>
                </Row>
                <Form.Item label="附加餐飲服務">
                  <p>
                    我們會提供場地餐飲服務，並且會透過電郵聯絡你更多詳情，如有興趣或疑問，歡迎
                    <br />
                    與我們查詢。
                  </p>
                  <Checkbox
                    name="foodOption"
                    onChange={cartFoodOptionChangeHandler}
                  >
                    需要餐飲服務
                  </Checkbox>
                </Form.Item>
              </Form>
            </div>
          </div>
          <Divider />
          <div className="finish-button">
            <Button
              component="label"
              variant="contained"
              style={{
                marginRight: "50px",
                backgroundColor: "#E0E0E0",
                color: "black",
              }}
              startIcon={<ShoppingCartIcon />}
              onClick={bookingCartHandler}
            >
              添加到購物車
            </Button>
            <Button
              component="label"
              variant="contained"
              style={{
                marginRight: "50px",
                backgroundColor: "#E0E0E0",
                color: "black",
              }}
              startIcon={<LocalAtmIcon />}
            >
              訂單結算
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookingPage;
