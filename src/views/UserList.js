import React, { useEffect, useState } from "react";
import UserService from "../api/UserService";
import { Button, Modal } from "react-bootstrap";

function UserList() {
  const [userList, setUserList] = useState([]);
  const [user, setUser] = useState([]);
  const [deleteShow, setDeleteShow] = useState(false);
  const [detailsShow, setDetailsShow] = useState(false);
  const [selectedUser, setSelectedUser] = useState([]);

  useEffect(() => {
    loadUserList();
  }, []);

  const loadUserList = () => {
    UserService.getUserList()
      .then((res) => {
        setUserList(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deleteUser = (userId) => {
    UserService.DeleteAccount(userId);
  };

  const viewUserDetails = (userLists) => {
    UserService.getUser(userLists.id)
      .then((res) => {
        setUser(res.data.data);
      })
      .catch((err) => {
        console.log("UserList Page get user" + err);
      });
  };

  const handleDeleteClose = () => setDeleteShow(false);
  const handleDeleteShow = (userLists) => {
    setDeleteShow(true);
    setSelectedUser(userLists);
  };
  const handleDetailsClose = () => setDetailsShow(false);
  const handleDetailsShow = (userLists) => {
    viewUserDetails(userLists);
    setDetailsShow(true);
  };

  return (
    <div className="container">
      <div className="py-4">
        <table className="table border shadow text-center ">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Username</th>
              <th scope="col">Email</th>
              <th scope="col">Roles</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {userList.map((userLists, index) => (
              <tr>
                <th scope="row" key={index}>
                  {userLists.id}
                </th>
                <td>{userLists.username}</td>
                <td>{userLists.email}</td>
                {/* {setRole(user.roles)} */}
                {/* {console.log(user.roles)} */}
                <td>{userLists.roles}</td>

                <td>
                  <button
                    className="btn btn-primary mx-1"
                    onClick={() => handleDetailsShow(userLists)}
                  >
                    Detail
                  </button>

                  <Modal show={detailsShow} onHide={handleDetailsClose}>
                    <Modal.Header closeButton>
                      <Modal.Title>User Details</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      <div className="card">
                        <div className="card-header">
                          <ul className="list-group list-group-flush">
                            <li className="list-group-item">
                              <b>User ID: </b>
                              {user.id}
                            </li>
                            <li className="list-group-item">
                              <b>Username: </b>
                              {user.username}
                            </li>
                            <li className="list-group-item">
                              <b>Email: </b>
                              {user.email}
                            </li>
                            <li className="list-group-item">
                              <b>Position: </b>
                              {user.position}
                            </li>
                            <li className="list-group-item">
                              <b>Mobile: </b>
                              {user.mobile}
                            </li>
                            <li className="list-group-item">
                              <b>Address: </b>
                              {user.address}
                            </li>
                          </ul>
                        </div>
                      </div>
                    </Modal.Body>
                    <Modal.Footer>
                      <Button variant="secondary" onClick={handleDetailsClose}>
                        Close
                      </Button>
                    </Modal.Footer>
                  </Modal>

                  <button
                    className="btn btn-danger mx-1"
                    onClick={() => handleDeleteShow(userLists)}
                  >
                    Delete
                  </button>

                  <Modal show={deleteShow} onHide={handleDeleteClose}>
                    <Modal.Header closeButton>
                      <Modal.Title>Delete Confirmation</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      Are you sure to delete{" "}
                      <strong>{selectedUser.username}</strong>
                    </Modal.Body>
                    <Modal.Footer>
                      <Button variant="secondary" onClick={handleDeleteClose}>
                        Close
                      </Button>
                      <Button
                        variant="primary"
                        className="btn btn-danger"
                        onClick={handleDeleteClose}
                      >
                        Yes
                      </Button>
                    </Modal.Footer>
                  </Modal>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default UserList;
