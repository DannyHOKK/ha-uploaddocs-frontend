import React, { useState } from "react";
import { useRef, useEffect } from "react";
import { MDBFile, MDBInput, MDBBtn } from "mdb-react-ui-kit";
import DocsService from "../api/DocsService";
import { Button, DatePicker, Form, Input, Upload, message } from "antd";
import TextArea from "antd/es/input/TextArea";
import { UploadOutlined } from "@ant-design/icons";

// const props = {
//   name: "file",
//   multiple: false,
//   action: "https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188",
//   onChange(info) {
//     const { status } = info.file;
//     if (status !== "uploading") {
//       console.log(info.file.originFileObj, info.fileList);
//     }
//     if (status === "done") {
//       message.success(`${info.file.name} file uploaded successfully.`);
//     } else if (status === "error") {
//       message.error(`${info.file.name} file upload failed.`);
//       console.log("error" + info.file);
//     }
//   },
//   onDrop(e) {
//     console.log("Dropped files", e.dataTransfer.files);
//   },
// };

function UploadDocs() {
  const inputRef = useRef();
  const [docsData, setDocsData] = useState(null);
  const [details, setDetails] = useState({
    category: "",
    filename: "",
    desc: "",
    remark: "",
  });
  const [show, setShow] = useState(false);
  const changeHandler = (e) => {
    const { name, value } = e.target;
    setDetails((e) => ({
      ...details,
      [name]: value,
    }));
  };
  const [loadings, setLoadings] = useState(false);

  const docsHandler = (e) => {
    console.log(e.target.files[0]);
    setDocsData(e.target.files[0]);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    setLoadings(true);

    setTimeout(() => {
      setLoadings(false);
      if (docsData !== null) {
        const formData = new FormData();
        formData.append("file", docsData);
        formData.append("fileDetails", JSON.stringify(details));
        DocsService.uploadDocs(formData);
        message.success("Submit success!");
        setDetails({});
      } else {
        message.error("Please Upload Docs!");
      }
    }, 2000);
  };

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const onFinishFailed = () => {
    message.error("Submit failed!");
  };

  return (
    <>
      <div className="mt-5 container">
        <Form
          labelCol={{
            span: 6,
          }}
          wrapperCol={{
            span: 14,
          }}
          layout="horizontal"
          style={{
            maxWidth: 1200,
          }}
          autoComplete="off"
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
            ref={inputRef}
            name="Description"
            label="Description"
            rules={[{ required: true }, { type: "string", min: 6 }]}
          >
            <Input
              ref={inputRef}
              name="desc"
              type="desc"
              value={details.desc}
              onChange={changeHandler}
            />
          </Form.Item>
          <Form.Item label="DatePicker">
            <DatePicker />
          </Form.Item>
          <Form.Item label="Remarks">
            <TextArea
              rows={4}
              label="Remarks"
              name="remark"
              type="remark"
              value={details.remark}
              onChange={changeHandler}
            />
          </Form.Item>
          <Form.Item label="Upload">
            <MDBFile id="file" name="file" type="file" onChange={docsHandler} />
          </Form.Item>
          <Form.Item>
            <Button
              onClick={submitHandler}
              type="primary"
              style={{ marginLeft: "180px" }}
              loading={loadings}
            >
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </>
  );
}

export default UploadDocs;
