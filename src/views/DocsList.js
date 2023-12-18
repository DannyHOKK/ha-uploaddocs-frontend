import React, { useEffect, useState } from "react";
import DocsService from "../api/DocsService";
import { MDBInput } from "mdb-react-ui-kit";
import UserService from "../api/UserService";
import { Modal, ModalBody, ModalHeader } from "react-bootstrap";
import { Autocomplete, TextField } from "@mui/material";

function DocsList() {
  const [docsList, setDocsList] = useState([]);
  const [userList, setUserList] = useState([]);
  const [query, setQuery] = useState({
    category: "", // provide default values for each field
    desc: "",
    createBy: "",
    remark: "",
  });
  const [showDelete, setShowDelete] = useState(false);

  useEffect(() => {
    loadDocsList();
    loadUserList();
  }, []);

  const loadUserList = async () => {
    const res = await UserService.getUserList();

    // UserService.getUserList()
    //   .then((res) => {
    //     setUserList(res.data.data);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });

    if (res) setUserList(res.data.data);

    console.log(res.data.data);
  };

  const loadDocsList = () => {
    DocsService.getDocsList()
      .then((res) => {
        setDocsList(res.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setQuery((e) => ({
      ...query,
      [name]: value,
    }));
  };

  const SearchDocsListHandler = () => {
    DocsService.searchDocsList(query)
      .then((res) => {
        setDocsList(res.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const downloadDocsHandler = async (id) => {
    try {
      const response = await DocsService.downloadDocs(id);
      console.log(response);
      if (response.status === 200) {
        const blob = new Blob([response.data]);

        const link = document.createElement("a");

        // Get the filename from the Content-Disposition header
        const contentDisposition = response.headers["content-disposition"];
        console.log("contentDisposition: " + contentDisposition);
        const fileNameMatch =
          contentDisposition && contentDisposition.match(/filename="(.+)"$/);
        const fileName = fileNameMatch
          ? decodeURIComponent(fileNameMatch[1])
          : "error.txt";

        const url = window.URL.createObjectURL(blob);
        link.href = url;
        link.setAttribute("download", fileName);

        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        window.URL.revokeObjectURL(url);
      } else {
        console.error("Failed to download document");
      }
    } catch (error) {
      console.error("Error downloading document:", error);
      // Handle the error as needed
    }
  };

  const deleteDocsHandler = (docsId) => {
    const response = DocsService.deleteDocsId(docsId);

    console.log(response);
  };

  const changeUsernameHandler = (event, value) => {
    setQuery((query) => ({
      ...query,
      createBy: value,
    }));
  };

  return (
    <div className="container">
      <div className="py-4">
        <div className="mx-5 my-4">
          <div className="form-group row mb-4">
            <label for="Category" className="col-sm-2 col-form-label">
              Category:
            </label>
            <div class="col-sm-2" style={{ marginRight: "60px" }}>
              <select
                type="text"
                className="form-select"
                aria-label="Select User"
                id="category"
                name="category"
                onChange={changeHandler}
              >
                <option value="" selected>
                  Select Docs Type
                </option>
                <option value="pdf">PDF</option>
                <option value="excel">EXCEL</option>
                <option value="word">WORD</option>
              </select>
            </div>
            <label for="description" className="col-sm-2 col-form-label">
              Description:
            </label>
            <div className="col-sm-2">
              <input
                type="text"
                className="form-control"
                id="desc"
                onChange={changeHandler}
                name="desc"
              />
            </div>
          </div>
          <div className="form-group row mb-4">
            <label for="create_by" className="col-sm-2 col-form-label">
              Create By:
            </label>
            <div className="col-sm-2" style={{ marginRight: "60px" }}>
              {userList.length > 0 ? (
                // <select
                //   type="text"
                //   className="form-select"
                //   aria-label="Select User"
                //   id="createBy"
                //   name="createBy"
                //   onChange={changeHandler}
                // >
                //   <option value="" selected>
                //     Select User
                //   </option>
                //   {userList.map((user, index) => (
                //     <option key={index} value={user.username}>
                //       {user.username}
                //     </option>
                //   ))}
                // </select>
                <Autocomplete
                  disablePortal
                  id="createBy"
                  name="createBy"
                  options={userList.map((user) => user.username)}
                  sx={{ width: 300 }}
                  renderInput={(params) => (
                    <TextField {...params} label="Select User" />
                  )}
                  onChange={changeUsernameHandler}
                />
              ) : (
                <select
                  type="text"
                  className="form-select"
                  aria-label="Select User"
                  id="createBy"
                  name="createBy"
                  onChange={changeHandler}
                >
                  <option value="" selected>
                    No users available
                  </option>
                </select>
              )}
            </div>
          </div>
          <div className="form-group row mb-4">
            <label for="remark" className="col-sm-2 col-form-label">
              Remark:
            </label>
            <div className="col-sm-2">
              <input
                type="text"
                className="form-control"
                id="remark"
                name="remark"
                onChange={changeHandler}
              />
            </div>
          </div>
          <button className="btn btn-primary" onClick={SearchDocsListHandler}>
            Search
          </button>
        </div>
        <div className="table-responsive">
          <table className="table border shadow table-striped">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Category</th>
                <th scope="col">Filename</th>
                <th scope="col">Description</th>
                <th scope="col">Create by</th>
                <th scope="col">Create Date</th>
                <th scope="col">Remark</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {docsList ? (
                docsList.map((docsList, index) => (
                  <tr>
                    <th scope="row" key={index}>
                      {index + 1}
                    </th>
                    <td>{docsList.category}</td>
                    <td>{docsList.filename}</td>
                    <td>{docsList.desc}</td>
                    {/* {setRole(user.roles)} */}
                    <td>{docsList.createBy}</td>
                    <td>{docsList.createDT}</td>
                    <td>{docsList.remark}</td>

                    <td>
                      {/* <Link
                    className="btn btn-primary mx-1"
                    to={`/viewuser/${user.id}`}
                  >
                    View
                  </Link> */}
                      {/* <Link
                    className="btn btn-outline-primary mx-1"
                    to={`/edituser/${user.id}`}
                  >
                    Edit
                  </Link> */}
                      <button
                        className="btn btn-primary mx-1"
                        onClick={() => downloadDocsHandler(index + 1)}
                      >
                        Download
                      </button>

                      <button
                        className="btn btn-danger mx-1"
                        onClick={() => {
                          setShowDelete(true);
                          console.log(showDelete);
                        }}
                      >
                        Delete
                      </button>
                      <Modal
                        show={showDelete}
                        onHide={() => {
                          setShowDelete(false);
                        }}
                      >
                        <Modal.Header closeButton>
                          <Modal.Title>Save Confirmation</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                          Woohoo, Are you sure to Delete the
                          {docsList.filename}?
                        </Modal.Body>
                        <Modal.Footer>
                          <button
                            variant="secondary"
                            className="btn btn-primary"
                            onClick={() => {
                              setShowDelete(false);
                            }}
                          >
                            Close
                          </button>
                          <button
                            variant="secondary"
                            className="btn btn-danger"
                            onClick={() => {
                              deleteDocsHandler(docsList.refNo);
                              setShowDelete(false);
                            }}
                          >
                            Delete
                          </button>
                        </Modal.Footer>
                      </Modal>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <div className="spinner-border m-5" role="status">
                    <span className="sr-only">Loading...</span>
                  </div>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default DocsList;
