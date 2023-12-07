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
  MDBIcon,
  MDBListGroup,
  MDBListGroupItem,
  MDBInput,
  MDBFile,
} from "mdb-react-ui-kit";
import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import UserService from "../api/UserService";
import "../css/EditProfile.css";
import ADD_BTN from "../img/add_btn.png";
import { Modal, Button } from "react-bootstrap";
import blobToUrl from "../utils/blobToUrl";
import default_icon from "../img/default_icon.png";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import Avatar from "react-avatar-edit";

function EditProfile() {
  const [userDetails, setUserDetails] = useState({
    username: "", // provide default values for each field
    email: "",
    mobile: "",
    address: "",
    position: "",
  });
  const [icon, setIcon] = useState(null);
  const [show, setShow] = useState(false);
  const [preview, setPreview] = useState(null);
  const [iconShow, setIconShow] = useState(false);
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

    UserService.GetIcon(userId.id)
      .then((res) => {
        if (res.data.data === null) {
          setIcon(default_icon);
        } else {
          const url = URL.createObjectURL(blobToUrl(res.data.data));
          setIcon(url);
        }
      })
      .catch((error) => {
        console.log(error);
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

  const homeHandler = () => {
    naviagte("/userDetails");
  };

  const onClose = () => {
    setPreview(null);
  };

  const onBeforeFileLoad = (e) => {
    if (e.target.files[0].size > 2097152) {
      alert("File is too big! Please upload the files less than 2MB");
      e.target.value = "";
    }
  };

  const onCrop = (e) => {
    setPreview(e);
    console.log(e);
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
                <a href="#" onClick={homeHandler}>
                  User
                </a>
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
                    src={icon}
                    alt="icon"
                    className="rounded-circle icon-container mb-4"
                    fluid
                  />
                </div>
                <div className="d-flex flex-column mx-5">
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
                        variant="secondary"
                        className="btn btn-danger"
                        onClick={() => {
                          homeHandler();
                        }}
                      >
                        Exit
                      </Button>
                      <Button
                        variant="primary"
                        className="btn btn-primary"
                        onClick={handleClose}
                      >
                        Save & Exit
                      </Button>
                    </Modal.Footer>
                  </Modal>

                  <MDBBtn
                    className="mt-4"
                    onClick={() => {
                      setIconShow(true);
                    }}
                  >
                    Upload Image
                  </MDBBtn>

                  <Modal
                    show={iconShow}
                    size="lg"
                    onHide={() => {
                      setIconShow(false);
                      setPreview(null);
                    }}
                  >
                    <Modal.Header closeButton>
                      <Modal.Title>Crop your profile picture</Modal.Title>
                    </Modal.Header>
                    <Modal.Body className="d-flex justify-content-center">
                      <Avatar
                        width={500}
                        height={400}
                        onCrop={onCrop}
                        onClose={onClose}
                        onBeforeFileLoad={onBeforeFileLoad}
                      />
                    </Modal.Body>
                    <Modal.Footer>
                      <Button
                        variant="secondary"
                        className="btn-danger"
                        onClick={() => {
                          setIconShow(false);
                          console.log(preview);
                          setPreview(null);
                        }}
                      >
                        Close
                      </Button>

                      <Button
                        variant="primary"
                        className="btn"
                        onClick={() => {
                          setIconShow(false);
                          setIcon(preview);
                          setPreview(null);
                          console.log(preview);
                        }}
                      >
                        Finish
                      </Button>
                    </Modal.Footer>
                  </Modal>
                </div>
                <div className="d-flex justify-content-center mb-2"></div>
              </MDBCardBody>
            </MDBCard>

            <MDBCard className="mb-4 mb-lg-0">
              <MDBCardBody className="p-0">
                <MDBListGroup className="rounded-3">
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
