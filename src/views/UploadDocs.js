import React, { useState } from "react";
import { useRef, useEffect } from "react";
import { MDBFile, MDBInput, MDBBtn } from "mdb-react-ui-kit";
import DocsService from "../api/DocsService";
import { Modal } from "react-bootstrap";

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

  const docsHandler = (e) => {
    setDocsData(e.target.files[0]);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (docsData !== null) {
      console.log(docsData);
      const formData = new FormData();
      formData.append("file", docsData);
      formData.append("fileDetails", JSON.stringify(details));
      DocsService.uploadDocs(formData);
      setShow(true);
    } else {
      alert("Please Upload Docs! ");
    }
  };

  const clickHandler = (e) => {
    setShow(false);
    window.location.reload();
  };

  useEffect(() => {
    inputRef.current.focus();
  }, []);
  return (
    <>
      <section className="vh-100">
        <div className=" m-5 container ">
          <form>
            <select
              className="form-select"
              aria-label="Select Docs Type"
              name="category"
              onChange={changeHandler}
            >
              <option value="" disabled selected>
                Select Docs Type
              </option>
              <option value="pdf">PDF</option>
              <option value="excel">EXCEL</option>
              <option value="word">WORD</option>
            </select>
            <MDBInput
              className=" mt-4"
              wrapperClass="mb-4"
              ref={inputRef}
              label="Description"
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
            <MDBBtn className="mb-4 w-100" onClick={submitHandler}>
              Submit
            </MDBBtn>
            <Modal
              show={show}
              onHide={() => {
                setShow(false);
              }}
            >
              <Modal.Header closeButton></Modal.Header>
              <Modal.Body>Upload Success!</Modal.Body>
              <Modal.Footer>
                <button className="btn btn-primary" onClick={clickHandler}>
                  Close
                </button>
              </Modal.Footer>
            </Modal>
          </form>
        </div>
      </section>
    </>
  );
}

export default UploadDocs;
