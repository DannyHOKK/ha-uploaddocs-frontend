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
import React, { useContext, useEffect, useState } from "react";
import "./BookingPage.css";
import bookingPage1 from "../../img/bookingPage1.png";
import dayjs from "dayjs";
import { Button } from "@mui/material";
import LocalAtmIcon from "@mui/icons-material/LocalAtm";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { additional_item, stage_item } from "./items/items";
import { BookingPageContext } from "./BookingPageContext";
import QuantityBtn from "./QuantityBtn";

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

  const [value, setValue] = useState(() => dayjs().endOf("today"));
  const [selectedValue, setSelectedValue] = useState(() =>
    dayjs().endOf("today")
  );

  const onSelect = (newValue) => {
    setValue(newValue);
    setSelectedValue(newValue);
  };
  const onPanelChange = (newValue) => {
    setValue(newValue);
  };

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
          <h3>204及205相連房間</h3>
          <p> 遲啲資料input in here</p>
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
            value={value}
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
            <div className="time-box">
              <p>
                扮工時間
                <br />
                <strong style={{ fontSize: "16px" }}>09:00</strong>
                <br />
                可預約
              </p>
            </div>
            <div className="time-box">
              <p>
                扮工時間
                <br />
                <strong style={{ fontSize: "16px" }}>09:00</strong>
                <br />
                可預約
              </p>
            </div>
            <div className="time-box">
              <p>
                扮工時間
                <br />
                <strong style={{ fontSize: "16px" }}>09:00</strong>
                <br />
                可預約
              </p>
            </div>
            <div className="time-box">
              <p>
                扮工時間
                <br />
                <strong style={{ fontSize: "16px" }}>09:00</strong>
                <br />
                可預約
              </p>
            </div>
            <div className="time-box">
              <p>
                扮工時間
                <br />
                <strong style={{ fontSize: "16px" }}>09:00</strong>
                <br />
                可預約
              </p>
            </div>
            <div className="time-box">
              <p>
                扮工時間
                <br />
                <strong style={{ fontSize: "16px" }}>09:00</strong>
                <br />
                可預約
              </p>
            </div>
            <div className="time-box">
              <p>
                扮工時間
                <br />
                <strong style={{ fontSize: "16px" }}>09:00</strong>
                <br />
                可預約
              </p>
            </div>
            <div className="time-box">
              <p>
                扮工時間
                <br />
                <strong style={{ fontSize: "16px" }}>09:00</strong>
                <br />
                可預約
              </p>
            </div>
            <div className="time-box">
              <p>
                扮工時間
                <br />
                <strong style={{ fontSize: "16px" }}>09:00</strong>
                <br />
                可預約
              </p>
            </div>
            <div className="time-box">
              <p>
                扮工時間
                <br />
                <strong style={{ fontSize: "16px" }}>09:00</strong>
                <br />
                可預約
              </p>
            </div>
            <div className="time-box">
              <p>
                扮工時間
                <br />
                <strong style={{ fontSize: "16px" }}>09:00</strong>
                <br />
                可預約
              </p>
            </div>
            <div className="time-box">
              <p>
                扮工時間
                <br />
                <strong style={{ fontSize: "16px" }}>09:00</strong>
                <br />
                可預約
              </p>
            </div>
            <div className="time-box">
              <p>
                扮工時間
                <br />
                <strong style={{ fontSize: "16px" }}>09:00</strong>
                <br />
                可預約
              </p>
            </div>
            <div className="time-box">
              <p>
                扮工時間
                <br />
                <strong style={{ fontSize: "16px" }}>09:00</strong>
                <br />
                可預約
              </p>
            </div>
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
                      {/* <strong style={{ fontWeight: "900" }}>{item.name}</strong>
                      <span>
                        <a>
                          <RemoveIcon />
                        </a>
                        {"  "}0/{item.quantity}
                        {"  "}
                        <a>
                          <AddIcon />
                        </a>
                      </span> */}
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
                      {/* <strong style={{ fontWeight: "900" }}>{item.name}</strong>
                      <span>
                        <a>
                          <RemoveIcon />
                        </a>
                        {"  "}0/{item.quantity}
                        {"  "}
                        <a>
                          <AddIcon />
                        </a>
                      </span> */}
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
          <h3>
            <span style={{ color: "red" }}>*</span>活動資料
          </h3>
          <div>
            <Form className="form" layout="vertical">
              <Row>
                <Col span={11} key={0} style={{ marginRight: "50px" }}>
                  <Form.Item label="活動名稱">
                    <Input />
                  </Form.Item>
                </Col>

                <Col span={11} key={1}>
                  <Form.Item label="性質">
                    <Select name="category" defaultValue="">
                      <Select.Option value="">All</Select.Option>
                      <Select.Option value="pdf">pdf</Select.Option>
                    </Select>
                  </Form.Item>
                </Col>
              </Row>

              <Row>
                <Col span={11} key={0} style={{ marginRight: "50px" }}>
                  <Form.Item label="收費(僅適用於商業活動)">
                    <Input />
                  </Form.Item>
                </Col>

                <Col span={11} key={1}>
                  <Form.Item label="場地用途">
                    <Select name="category" defaultValue="">
                      <Select.Option value="">All</Select.Option>
                      <Select.Option value="pdf">pdf</Select.Option>
                    </Select>
                  </Form.Item>
                </Col>
              </Row>
            </Form>
          </div>
          <Divider />
          <div className="other-container">
            <h3>其他</h3>
            <div>
              <Form className="form" layout="vertical">
                <Row>
                  <Col span={11} key={0} style={{ marginRight: "50px" }}>
                    <Form.Item label="備註(可能涉及額外收費)">
                      <Input />
                    </Form.Item>
                  </Col>

                  <Col span={11} key={1}>
                    <Form.Item label="如何得知本公司的租用計劃">
                      <Select name="category" defaultValue="">
                        <Select.Option value="">All</Select.Option>
                        <Select.Option value="pdf">pdf</Select.Option>
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
                  <Checkbox>需要餐飲服務</Checkbox>
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
