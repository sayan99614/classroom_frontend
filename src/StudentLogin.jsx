import React, { useState } from "react";
import Student from "../src/images/student.png";
function StudentLogin() {
  const [modelStyle, setModelStyle] = useState({
    display: "none",
    position: "fixed",
    zIndex: 1,
    paddingTop: "100px",
    left: 0,
    top: 0,
    float: "right",
    width: "100%",
    height: "100%",
    overflow: "auto",
  });
  return (
    <>
      <div className="row m-2">
        <div className="col-sm-12 text-center card p-2 shadow">
          <h1>CLASSROOM</h1>
          <div className="mt-3"></div>
        </div>
      </div>
      <div className="row">
        <div className="col-sm-4 offset-sm-1">
          <h1
            style={{
              justifyContent: "center",
              alignItems: "center",
              margin: "5px",
            }}
          >
            <span className="text-info" style={{ fontWeight: "bold" }}>
              Welcome to Classroom
            </span>{" "}
            Please Login or Signup for further process
          </h1>
          <button
            className="btn btn-primary shadow-sm mt-2"
            onClick={() =>
              setModelStyle({
                ...modelStyle,
                display: "block",
              })
            }
          >
            Login
          </button>
        </div>
        <div className="col-sm-6 offset-sm-1">
          <img src={Student} alt="student" className="img-fluid" />
        </div>
      </div>

      <div style={modelStyle}>
        <div className="card shadow-sm m-5">
          <p style={{ padding: "2px 16px", textAlign: "right" }}>
            <span
              style={{
                fontSize: "30px",
                fontWeight: "bold",
                cursor: "pointer",
              }}
              onClick={() => setModelStyle({ ...modelStyle, display: "none" })}
            >
              &times;
            </span>
          </p>
          <div className="card-body">
            <h1>some content</h1>
          </div>
        </div>
      </div>
    </>
  );
}

export default StudentLogin;
