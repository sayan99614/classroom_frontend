import React from "react";
import Friend from "./images/exam.png";
import { useState } from "react";
import { useEffect } from "react";
import { SpinnerDotted } from "spinners-react";
import DarkModeToggle from "react-dark-mode-toggle";
import useDarkMode from "use-dark-mode";
import { Link } from "react-router-dom";
import StudentLogin from "./StudentLogin";
function isEmpty(obj) {
  return Object.keys(obj).length === 0;
}

function MainComponent() {
  const [isDarkMode, setIsDarkMode] = useState(() => false);
  let pageNumber = 1;
  const [classname, setClassname] = useState("");
  const [description, setDescription] = useState("");
  const [statusclasscreation, setStatusclasscreation] = useState({});
  const [classes, setClasses] = useState([]);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const darkMode = useDarkMode(true);
  const [spinner, setSpinner] = useState(false);
  const fetchclasses = async () => {
    setSpinner(true);
    const res = await fetch(`/classes?page=${page}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const result = await res.json();
    console.log(result);
    setPage(result.page);
    setPages(result.pages);
    setClasses(result.data);
    setSpinner(false);
  };

  useEffect(() => {
    fetchclasses();
  }, [statusclasscreation, page]);

  const Cardcol = () => {
    if (spinner) {
      return (
        <div className="text-center mt-5">
          <SpinnerDotted
            size={90}
            thickness={140}
            speed={100}
            color="rgba(57, 172, 164, 1)"
          />
        </div>
      );
    }

    return classes.map((item, index) => {
      return (
        <>
          <div className="card shadow-sm mb-2 mx-3" key={index}>
            <div className="card-body">
              <div className="d-flex justify-content-between">
                <div>
                  <h6>Name: {item.classname}</h6>
                </div>
                <div>
                  <h6>Classcode: {item.classcode}</h6>
                </div>
              </div>
            </div>
          </div>
        </>
      );
    });
  };

  const Pagination = ({ page, pages, changePage }) => {
    let middlepagination;
    if (pages <= 5) {
      middlepagination = [...Array(pages)].map((_, idx) => {
        console.log("working");
        return (
          <button
            className="btn btn-info"
            style={{
              marginRight: "5px",
              marginLeft: "5px",
              borderRadius: "50%",
            }}
            key={idx + 1}
            onClick={() => changePage(page + 1)}
            disabled={page === idx + 1}
          >
            {idx + 1}
          </button>
        );
      });
    } else {
      const startValue = Math.floor((page - 1) / 5) * 5;
      middlepagination = (
        <>
          {[...Array(5)].map((_, idx) => (
            <button
              className="btn btn-info"
              style={{
                marginLeft: "5px",
                marginRight: "5px",
              }}
              key={startValue + idx + 1}
              disabled={page === startValue + idx + 1}
              onClick={() => changePage(startValue + idx + 1)}
            >
              {startValue + idx + 1}
            </button>
          ))}
          <button
            className="btn btn-info"
            style={{ marginRight: "5px", marginLeft: "5px" }}
          >
            ...
          </button>
          <button
            className="btn btn-info"
            style={{
              marginRight: "5px",
              marginLeft: "5px",
              borderRadius: "50%",
            }}
            onClick={() => changePage(pages)}
          >
            {pages}
          </button>
        </>
      );

      if (pages > 5) {
        if (pages - page >= 5) {
          middlepagination = (
            <>
              <button
                className="btn btn-info"
                style={{
                  marginLeft: "5px",
                  marginRight: "5px",
                }}
                onClick={() => changePage(1)}
              >
                1
              </button>
              <button
                className="btn btn-info"
                style={{
                  marginLeft: "5px",
                  marginRight: "5px",
                }}
              >
                ...
              </button>
              {[...Array(5)].map((_, idx) => (
                <button
                  className="btn btn-info"
                  style={{
                    marginLeft: "5px",
                    marginRight: "5px",
                  }}
                  key={startValue + idx + 1}
                  disabled={page === startValue + idx + 1}
                  onClick={() => changePage(startValue + idx + 1)}
                >
                  {startValue + idx + 1}
                </button>
              ))}
              <button
                className="btn btn-info"
                style={{ marginRight: "5px", marginLeft: "5px" }}
              >
                ...
              </button>
              <button
                className="btn btn-info"
                style={{
                  marginRight: "5px",
                  marginLeft: "5px",
                  borderRadius: "50%",
                }}
                onClick={() => changePage(pages)}
              >
                {pages}
              </button>
            </>
          );
        } else {
          middlepagination = (
            <>
              <button
                className="btn btn-info"
                style={{
                  marginLeft: "5px",
                  marginRight: "5px",
                }}
                onClick={() => changePage(1)}
              >
                1
              </button>
              <button
                className="btn btn-info"
                style={{
                  marginLeft: "5px",
                  marginRight: "5px",
                }}
              >
                ...
              </button>
              {[...Array(5)].map((_, idx) => (
                <button
                  className="btn btn-info"
                  style={
                    pages < startValue + idx + 1
                      ? {
                          display: "none",
                        }
                      : null
                  }
                  key={startValue + idx + 1}
                  disabled={page === startValue + idx + 1}
                  onClick={() => changePage(startValue + idx + 1)}
                >
                  {startValue + idx + 1}
                </button>
              ))}
            </>
          );
        }
      }
    }
    return (
      pages > 1 && (
        <div className="text-center mt-5">
          <button
            className="btn btn-outline-info"
            style={{ marginRight: "10px" }}
            onClick={() => changePage((page) => page - 1)}
            disabled={page === 1}
          >
            &#171;
          </button>
          {middlepagination}
          <button
            className="btn btn-outline-info"
            style={{ marginLeft: "10px" }}
            onClick={() => changePage((page) => page + 1)}
            disabled={page === pages}
          >
            &#187;
          </button>
        </div>
      )
    );
  };

  const createclassapi = async () => {
    setStatusclasscreation({});
    const res = await fetch("/class", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        classname: classname,
        description: description,
      }),
    });
    const result = await res.json();
    console.log(result);
    setStatusclasscreation(result);
    setClassname("");
    setDescription("");
  };

  const Alert = () => {
    if (!isEmpty(statusclasscreation)) {
      console.log("executing");
      if (statusclasscreation.alert === "success") {
        return (
          <div className="alert alert-success" role="alert">
            {statusclasscreation.messege}
          </div>
        );
      } else {
        return (
          <div className="alert alert-danger" role="alert">
            {statusclasscreation.message}
          </div>
        );
      }
    }
    return null;
  };

  return (
    <>
      <div className="text-center mb-3">
        <DarkModeToggle
          onChange={setIsDarkMode}
          checked={isDarkMode}
          size={80}
        />
      </div>
      <div className="row">
        <div className="col-sm-12">
          <div className="card shadow mx-2 my-2 p-5">
            <div className="text-center">
              <h1 className="fw-bold fs-1">VIRTUAL CLASSROOM</h1>
              <button
                className="btn btn-outline-info"
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
                onClick={() => setStatusclasscreation({})}
              >
                create class
              </button>

              <Link
                className="btn btn-primary shadow"
                style={{ marginLeft: "10px", width: "150px" }}
                to="/login"
              >
                Login
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-sm-6">
          <div className="text-center mx-5">
            <div className="card shadow-sm mb-5">
              <div className="card-body text-center fs-3">
                <span>ALL CLASSES</span>
              </div>
            </div>
          </div>
          <Cardcol />
          <Pagination page={page} pages={pages} changePage={setPage} />
        </div>

        <div className="col-sm-6">
          <img
            src={Friend}
            alt=""
            className="img-fluid"
            style={{ height: "550px", width: "1000px" }}
          />
        </div>
      </div>

      <div
        class="modal fade"
        id="exampleModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">
                Create Classroom
              </h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <Alert />
              <div class="mb-3">
                <label class="form-label">Class Name</label>
                <input
                  type="text"
                  class="form-control"
                  name="classname"
                  value={classname}
                  onChange={(event) => setClassname(event.target.value)}
                />
              </div>
              <div className="mb-3">
                <label class="form-label">description</label>
                <textarea
                  name="description"
                  className="form-control"
                  value={description}
                  onChange={(event) => setDescription(event.target.value)}
                />
              </div>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>

              <button
                className="btn btn-success"
                onClick={() => createclassapi()}
              >
                createclass
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default MainComponent;
