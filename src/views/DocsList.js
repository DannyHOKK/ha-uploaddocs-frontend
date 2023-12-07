import React, { useEffect, useState } from "react";
import DocsService from "../api/DocsService";
import { MDBInput } from "mdb-react-ui-kit";
import UserService from "../api/UserService";

function DocsList() {
  const [docsList, setDocsList] = useState([]);
  const [userList, setUserList] = useState([]);
  const [query, setQuery] = useState({
    category: "", // provide default values for each field
    desc: "",
    createBy: "",
    remark: "",
  });

  useEffect(() => {
    loadDocsList();
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
    const response = await DocsService.downloadDocs(id);

    console.log("response", response);
    if (response.ok) {
      // Create a Blob from the response
      const blob = await response.blob();

      // Create a link element
      const link = document.createElement("a");

      // Create a URL for the Blob and set it as the href of the link
      const url = window.URL.createObjectURL(blob);
      link.href = url;

      // Set the filename for the download
      link.setAttribute("download", "Docs");

      // Append the link to the body
      document.body.appendChild(link);

      // Trigger the click event on the link
      link.click();

      // Remove the link from the body
      document.body.removeChild(link);

      // Clean up the URL created for the Blob
      window.URL.revokeObjectURL(url);
    } else {
      console.error("Failed to download document");
    }
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
                <select
                  type="text"
                  className="form-select"
                  aria-label="Select User"
                  id="createBy"
                  name="createBy"
                  onChange={changeHandler}
                >
                  <option value="" selected>
                    Select User
                  </option>
                  {userList.map((user, index) => (
                    <option key={index} value={user.username}>
                      {user.username}
                    </option>
                  ))}
                </select>
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
        <table className="table border shadow">
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

                    <button className="btn btn-danger mx-1">Delete</button>
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
  );
}

export default DocsList;
