import React, { useState } from "react";
import { useRef, useEffect } from "react";
import { MDBFile, MDBInput, MDBBtn } from "mdb-react-ui-kit";
import AuthService from "../api/AuthService";

function UploadDocs() {
  const inputRef = useRef();
  const [docsData, setDocsData] = useState(null);
  const [docsDetails, setDocsDetails] = useState({
    category: "",
    filename: "",
    desc: "",
    remark: "",
  });

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setDocsDetails((e) => ({
      ...docsDetails,
      [name]: value,
    }));
  };

  const changeDocsDataHandler = (e) => {
    setDocsData(e.target.value);
  };

  const submitHandler = () => {
    const formData = new FormData();
    formData.append("docs", docsData);
    formData.append("docsDetails", JSON.stringify(docsDetails));
  };

  useEffect(() => {
    inputRef.current.focus();
  }, []);
  return (
    <>
      <section className="vh-100">
        <div className=" m-5 container">
          <form onSubmit={submitHandler}>
            <select class="form-select" aria-label="Select Docs Type">
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
              type="filename"
              value={docsDetails.filename}
              onChange={changeHandler}
            ></MDBInput>
            <MDBInput
              className=" mt-4"
              wrapperClass="mb-4"
              label="Desc"
              id="form1"
              name="desc"
              type="desc"
              value={docsDetails.desc}
              onChange={changeHandler}
            ></MDBInput>

            <MDBFile
              label="Upload Docs"
              id="customFile"
              name="data"
              value={docsData}
              onChange={changeHandler}
            />
            <MDBInput
              className=" mt-4"
              wrapperClass="mb-4"
              label="Remarks"
              id="form1"
              name="remark"
              type="remark"
              value={docsDetails.remark}
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
