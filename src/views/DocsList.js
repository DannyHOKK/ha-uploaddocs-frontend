import React, { useEffect, useState } from "react";
import DocsService from "../api/DocsService";
import UserService from "../api/UserService";
import { Autocomplete, TextField } from "@mui/material";
import { DatePicker, Divider, Form, Input, Modal, Select, Table } from "antd";
import UploadDocs from "./UploadDocs";
import TextArea from "antd/es/input/TextArea";
import { DateRange } from "@mui/icons-material";

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
  const [loading, setLoading] = useState(false);
  const { RangePicker } = DatePicker;

  useEffect(() => {
    loadDocsList();
    loadUserList();
  }, []);

  const loadUserList = async () => {
    setLoading(true);
    const res = await UserService.getUserList();

    // UserService.getUserList()
    //   .then((res) => {
    //     setUserList(res.data.data);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });

    if (res) {
      setUserList(res.data.data);
      setLoading(false);
      console.log("hihi");
    }

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
    console.log(e);
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
    window.location.reload();
  };

  const changeUsernameHandler = (event, value) => {
    setQuery((query) => ({
      ...query,
      createBy: value,
    }));
  };

  const [createModal, setCreateModal] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);

  const createDocsHandler = () => {
    setCreateModal(true);
    console.log(createModal);
  };
  const handleOk = () => {
    setConfirmLoading(true);
    setTimeout(() => {
      setCreateModal(false);
      setConfirmLoading(false);
    }, 2000);
  };

  const handleCancel = () => {
    console.log("Clicked cancel button");
    setCreateModal(false);
  };

  const rangePickerHandler = (e) => {
    console.log(e);
  };

  const createByHandler = (e) => {
    setQuery((query) => ({
      ...query,
      createBy: e,
    }));
  };
  const categoryHandler = (e) => {
    console.log(e);
    setQuery((query) => ({
      ...query,
      category: e,
    }));
  };

  const columns = [
    {
      title: "refNo",
      width: 90,
      dataIndex: "refNo",
      key: "refNo",
      fixed: "left",
    },
    {
      title: "category",
      dataIndex: "category",
      key: "category",
    },
    {
      title: "Description",
      dataIndex: "desc",
      key: "desc",
    },
    {
      title: "Filename",
      dataIndex: "filename",
      key: "filename",
    },
    {
      title: "createBy",
      dataIndex: "createBy",
      key: "createBy",
    },
    {
      title: "remark",
      dataIndex: "remark",
      key: "remark",
    },
    {
      title: "Action",
      key: "operation",
      fixed: "right",
      width: 300,
      render: (record) => (
        <>
          <button
            className="btn btn-primary mx-1"
            onClick={() => downloadDocsHandler(record.refNo)}
          >
            Download
          </button>
          <button
            className="btn btn-danger mx-1"
            onClick={() => {
              setShowDelete(true);
              setDeleteRefNo(record.refNo);
              console.log(showDelete);
            }}
          >
            Delete
          </button>
        </>
      ),
    },
  ];
  const [deleteRefNo, setDeleteRefNo] = useState(null);

  const deleteShowCancelHandler = () => {
    setShowDelete(false);
  };

  return (
    <div className="container">
      <div className="py-4">
        <div className="mx-5 my-4">
          {/* <div className="form-group row mb-4"> */}
          {/* <label for="Category" className="col-sm-2 col-form-label">
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
          </div> */}

          <Form
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 14 }}
            layout="horizontal"
            style={{ maxWidth: 500 }}
          >
            <Form.Item label="Category">
              <Select
                name="category"
                onChange={categoryHandler}
                initialValues=""
              >
                <Select.Option value="">All</Select.Option>
                <Select.Option value="pdf">pdf</Select.Option>
                <Select.Option value="jpeg">jpeg</Select.Option>
                <Select.Option value="xls">xls</Select.Option>
                <Select.Option value="excel">excel</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item label="Description">
              <Input
                type="text"
                id="desc"
                name="desc"
                onChange={changeHandler}
              />
            </Form.Item>
            <Form.Item label="createBy" name="createBy">
              <Select
                id="createBy"
                name="createBy"
                onChange={createByHandler}
                initialValues=""
              >
                <Select.Option value="">All User</Select.Option>
                {userList.map((user, index) => (
                  <Select.Option
                    key={index}
                    value={user.username}
                    name="createBy"
                  >
                    {user.username}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item label="Date Range" className="text-start">
              <RangePicker name="dateRange" onChange={rangePickerHandler} />
            </Form.Item>
            <Form.Item label="Remarks">
              <TextArea
                rows={4}
                label="Remarks"
                name="remark"
                type="remark"
                onChange={changeHandler}
              />
            </Form.Item>
            <button
              className="btn btn-primary mx-3"
              onClick={SearchDocsListHandler}
            >
              Search
            </button>
            <button
              className="btn btn-primary mx-3"
              onClick={createDocsHandler}
            >
              Create
            </button>
          </Form>
          <Modal
            title="Create Document Form"
            open={createModal}
            onOk={handleOk}
            onCancel={handleCancel}
            width={800}
            confirmLoading={confirmLoading}
          >
            <UploadDocs />
          </Modal>
        </div>
        <Divider />
        <div className="table-responsive">
          <Table
            columns={columns}
            dataSource={docsList}
            loading={loading}
            scroll={{
              x: 1000,
            }}
          />
        </div>

        <Modal
          title="Delele Confirmation"
          open={showDelete}
          onOk={() => deleteDocsHandler(deleteRefNo)}
          onCancel={deleteShowCancelHandler}
          width={800}
        >
          <p>
            Are you sure you want to delete document with Ref No {deleteRefNo}
          </p>
        </Modal>
      </div>
    </div>
  );
}

export default DocsList;
