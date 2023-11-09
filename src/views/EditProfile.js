import React from "react";
import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
  MDBBtn,
  MDBBreadcrumb,
  MDBBreadcrumbItem,
  MDBFile,
  MDBIcon,
  MDBListGroup,
  MDBListGroupItem,
  MDBInput,
} from "mdb-react-ui-kit";
import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import UserService from "../api/UserService";
import "../css/EditProfile.css";
import ADD_BTN from "../img/add_btn.png";
import { Modal, Button } from "react-bootstrap";
import Avatar from "react-avatar-edit";
import blobToUrl from "../utils/blobToUrl";
import Cropper from "react-easy-crop";

function EditProfile() {
  const [userDetails, setUserDetails] = useState({});
  const [icon, setIcon] = useState(null);
  const [show, setShow] = useState(false);
  const [preview, setPreview] = useState(null);
  const [iconShow, setIconShow] = useState(false);
  const [crop, setCrop] = React.useState({ x: 0, y: 0 });
  const [croppedArea, setCroppedArea] = useState(null);
  const naviagte = useNavigate();
  const inputRef = useRef(null);

  useEffect(() => {
    const userId = JSON.parse(localStorage.getItem("userDetails"));

    UserService.getUser(userId.id)
      .then((res) => {
        setUserDetails(res.data.data);
      })
      .catch((error) => {
        console.log("error" + error);
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserDetails((e) => ({
      ...userDetails,
      [name]: value,
    }));
  };

  const handleClose = (e) => {
    setShow(false);
    clickHandler(e);
  };

  const clickHandler = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", icon);
    formData.append("userinfo", JSON.stringify(userDetails));
    UserService.updateUser(formData).then((res) => {
      naviagte("/userDetails");
    });
  };

  const iconHandler = (e) => {
    setIcon(e.target.files[0]);

    const url = URL.createObjectURL(blobToUrl(icon));
    const reader = new FileReader();
    reader.readAsDataURL(icon);
    reader.addEventListener("load", () => {
      setPreview(reader.result);
    });
    setPreview(url);
    setIconShow(true);
  };

  const iconClickHandler = () => {
    inputRef.current.click();
  };

  const homeHandler = () => {
    naviagte("/userDetails");
  };

  const onCropComplete = (croppedAreaPercentage, croppedAreaPixels) => {
    setCroppedArea(croppedAreaPixels);
  };

  return (
    <section style={{ backgroundColor: "#eee" }}>
      <MDBContainer className="py-5">
        <MDBRow>
          <MDBCol>
            <MDBBreadcrumb className="bg-light rounded-3 p-3 mb-4">
              <MDBBreadcrumbItem>
                <a href="#">Home</a>
              </MDBBreadcrumbItem>
              <MDBBreadcrumbItem>
                <a onClick={homeHandler}>User</a>
              </MDBBreadcrumbItem>
              <MDBBreadcrumbItem active>Edit</MDBBreadcrumbItem>
            </MDBBreadcrumb>
          </MDBCol>
        </MDBRow>

        <MDBRow>
          <MDBCol lg="4">
            <MDBCard className="mb-4">
              <MDBCardBody className="text-center">
                <div>
                  <MDBCardImage
                    src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp"
                    alt="icon"
                    className="rounded-circle"
                    style={{ width: "150px", backgroundImage: { ADD_BTN } }}
                    fluid
                  />
                </div>

                <p className="text-muted m-2">{userDetails.username} </p>
                <p className="text-muted m-2">{userDetails.address} </p>
                <MDBBtn
                  onClick={() => {
                    setShow(true);
                  }}
                >
                  Save & Exit
                </MDBBtn>
                <Modal
                  show={show}
                  onHide={() => {
                    setShow(false);
                  }}
                >
                  <Modal.Header closeButton>
                    <Modal.Title>Save Confirmation</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    Woohoo, Are you sure to save the change?
                  </Modal.Body>
                  <Modal.Footer>
                    <Button
                      variant="secondary"
                      onClick={() => {
                        setShow(false);
                      }}
                    >
                      Close
                    </Button>
                    <Button
                      variant="primary"
                      className="btn btn-danger"
                      onClick={handleClose}
                    >
                      Save & Exit
                    </Button>
                  </Modal.Footer>
                </Modal>

                <MDBBtn
                  onClick={() => {
                    setIconShow(true);
                  }}
                >
                  Upload Image
                </MDBBtn>

                <Modal
                  show={iconShow}
                  onHide={() => {
                    setIconShow(false);
                  }}
                >
                  <Modal.Header closeButton>
                    <Modal.Title>Crop your profile picture</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <>
                      {preview ? (
                        <>
                          <div>
                            <Cropper
                              image={preview}
                              crop={crop}
                              aspect={1}
                              onCropChange={setCrop}
                              onCropComplete={onCropComplete}
                            />
                          </div>
                        </>
                      ) : null}
                    </>
                  </Modal.Body>
                  <Modal.Footer>
                    <Button variant="secondary" onClick={iconClickHandler}>
                      Choose
                    </Button>

                    <input
                      type="file"
                      ref={inputRef}
                      onChange={iconHandler}
                      style={{ display: "none" }}
                    ></input>

                    <Button
                      variant="primary"
                      className="btn"
                      onClick={() => {
                        setIconShow(false);
                      }}
                    >
                      Finish
                    </Button>
                  </Modal.Footer>
                </Modal>

                <div className="d-flex justify-content-center mb-2"></div>
              </MDBCardBody>
            </MDBCard>

            <MDBCard className="mb-4 mb-lg-0">
              <MDBCardBody className="p-0">
                <MDBListGroup flush className="rounded-3">
                  <MDBListGroupItem className="d-flex justify-content-between align-items-center p-3">
                    <MDBIcon fas icon="globe fa-lg text-warning" />
                    <MDBCardText>https://mdbootstrap.com</MDBCardText>
                  </MDBListGroupItem>
                  <MDBListGroupItem className="d-flex justify-content-between align-items-center p-3">
                    <MDBIcon
                      fab
                      icon="github fa-lg"
                      style={{ color: "#333333" }}
                    />
                    <MDBCardText>mdbootstrap</MDBCardText>
                  </MDBListGroupItem>
                  <MDBListGroupItem className="d-flex justify-content-between align-items-center p-3">
                    <MDBIcon
                      fab
                      icon="twitter fa-lg"
                      style={{ color: "#55acee" }}
                    />
                    <MDBCardText>@mdbootstrap</MDBCardText>
                  </MDBListGroupItem>
                  <MDBListGroupItem className="d-flex justify-content-between align-items-center p-3">
                    <MDBIcon
                      fab
                      icon="instagram fa-lg"
                      style={{ color: "#ac2bac" }}
                    />
                    <MDBCardText>mdbootstrap</MDBCardText>
                  </MDBListGroupItem>
                  <MDBListGroupItem className="d-flex justify-content-between align-items-center p-3">
                    <MDBIcon
                      fab
                      icon="facebook fa-lg"
                      style={{ color: "#3b5998" }}
                    />
                    <MDBCardText>mdbootstrap</MDBCardText>
                  </MDBListGroupItem>
                </MDBListGroup>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
          <MDBCol lg="8">
            <MDBCard className="mb-4">
              <MDBCardBody>
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>User ID</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">
                      {userDetails.id}
                    </MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Full Name</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBInput
                      className="text-muted mb-1"
                      name="username"
                      value={userDetails.username}
                      onChange={handleChange}
                    />
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Email</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBInput
                      className="text-muted mb-1"
                      name="email"
                      value={userDetails.email}
                      onChange={handleChange}
                    />
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Mobile</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBInput
                      className="text-muted mb-1"
                      name="mobile"
                      value={userDetails.mobile}
                      onChange={handleChange}
                    />
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Address</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBInput
                      className="text-muted mb-1"
                      name="address"
                      value={userDetails.address}
                      onChange={handleChange}
                    />
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Position</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBInput
                      className="text-muted mb-1"
                      name="position"
                      value={userDetails.position}
                      onChange={handleChange}
                    />
                  </MDBCol>
                </MDBRow>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </section>
  );
}

export default EditProfile;
