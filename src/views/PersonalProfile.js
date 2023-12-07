import React, { useId } from "react";
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
  MDBProgress,
  MDBProgressBar,
  MDBIcon,
  MDBListGroup,
  MDBListGroupItem,
} from "mdb-react-ui-kit";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import "../css/PersonalProfile.css";
import AuthService from "../api/AuthService";
import UserService from "../api/UserService";
import { Modal, Button } from "react-bootstrap";
import blobToUrl from "../utils/blobToUrl";
import "react-image-crop/dist/ReactCrop.css";
import default_icon from "../img/default_icon.png";

function PersonalProfile() {
  const [crop, setCrop] = useState({ aspect: 1 / 1 });
  const [userDetails, setUserDetails] = useState({});
  const [show, setShow] = useState(false);
  const [icon, setIcon] = useState(null);
  const naviagte = useNavigate();
  const userId = JSON.parse(localStorage.getItem("userDetails"));

  useEffect(() => {
    if (userId == null) {
      localStorage.setItem("isAuthenticated", false);
      return;
    }

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

  const handleClose = () => {
    setShow(false);
    Delete();
  };
  const handleShow = () => setShow(true);

  const handleEditClick = () => {
    naviagte("/userDetails/editProfile");
  };

  const Delete = () => {
    UserService.DeleteAccount(userId.id)
      .then((res) => {
        AuthService.SignOut();
        localStorage.setItem("logoutAlert", true);
        naviagte("login");
      })
      .catch((error) => {
        console.log(error);
      });
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
                <a href="#">User</a>
              </MDBBreadcrumbItem>
              <MDBBreadcrumbItem active>User Profile</MDBBreadcrumbItem>
            </MDBBreadcrumb>
          </MDBCol>
        </MDBRow>

        <MDBRow>
          <MDBCol lg="4">
            <MDBCard className="mb-4">
              <MDBCardBody className="text-center">
                <MDBCardImage
                  src={icon}
                  alt="avatar"
                  className="rounded-circle icon-container mb-4"
                  fluid
                />
                <p className="text-muted mb-1">{userDetails.position}</p>
                <p className="text-muted mb-4">{userDetails.address}</p>
                <div className="d-flex justify-content-center mb-2">
                  <MDBBtn onClick={handleEditClick}>Edit</MDBBtn>

                  <Button
                    className="ms-1 btn btn-danger"
                    variant="primary"
                    onClick={handleShow}
                  >
                    Delete Account
                  </Button>

                  <Modal
                    show={show}
                    onHide={() => {
                      setShow(false);
                    }}
                  >
                    <Modal.Header closeButton>
                      <Modal.Title>Delete Confirmation</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      Woohoo, Are you sure to delete this account ?
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
                        Delete
                      </Button>
                    </Modal.Footer>
                  </Modal>
                </div>
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
                    <MDBCardText className="text-muted">
                      {userDetails.username}
                    </MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Email</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">
                      {userDetails.email}
                    </MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Mobile</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">
                      {userDetails.mobile}
                    </MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Address</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">
                      {userDetails.address}
                    </MDBCardText>
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

export default PersonalProfile;
