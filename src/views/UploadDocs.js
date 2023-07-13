import React, { useState } from "react";
import { useRef, useEffect } from "react";
import { MDBFile, MDBInput, MDBBtn } from "mdb-react-ui-kit";
import DocsService from "../api/DocsService";

function UploadDocs() {
  const inputRef = useRef();
  const [docsData, setDocsData] = useState(null);
  const [details, setDetails] = useState({
    category: "",
    filename: "",
    desc: "",
    remark: "",
  });

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setDetails((e) => ({
      ...details,
      [name]: value,
    }));
  };

  const docsHandler = (e) => {
    setDocsData(e.target.files[0]);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", docsData);
    formData.append("fileDetails", JSON.stringify(details));
    DocsService.uploadDocs(formData);
  };

  useEffect(() => {
    inputRef.current.focus();
  }, []);
  return (
    <>
      <section className="vh-100">
        <div className=" m-5 container">
          <form onSubmit={submitHandler}>
            <select
              className="form-select"
              aria-label="Select Docs Type"
              name="category"
              onChange={changeHandler}
            >
              <option selected>Select Docs Type</option>
              <option value="pdf">PDF</option>
              <option value="excel">EXCEL</option>
              <option value="word">WORD</option>
            </select>
            <MDBInput
              className=" mt-4"
              wrapperClass="mb-4"
              ref={inputRef}
              label="Filename"
              id="form1"
              name="filename"
              value={details.filename}
              onChange={changeHandler}
            ></MDBInput>
            <MDBInput
              className=" mt-4"
              wrapperClass="mb-4"
              label="Desc"
              id="form1"
              name="desc"
              type="desc"
              value={details.desc}
              onChange={changeHandler}
            ></MDBInput>

            <MDBFile
              label="Upload Docs"
              id="file"
              name="file"
              type="file"
              onChange={docsHandler}
            />

            <MDBInput
              className=" mt-4"
              wrapperClass="mb-4"
              label="Remarks"
              id="form1"
              name="remark"
              type="remark"
              value={details.remark}
              onChange={changeHandler}
            ></MDBInput>
            <MDBBtn className="mb-4 w-100">Submit</MDBBtn>
          </form>
        </div>
      </section>
    </>
  );
}

export default UploadDocs;
