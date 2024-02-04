
import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  CardBody,
  CardSubtitle,
  CardTitle,
  Container,
  Dropdown,
  Nav,
  Navbar,
  Row,
} from "react-bootstrap";
import axios from "axios";
import { Navigate, useNavigate } from "react-router";

function PatientDashboard() {
  const navigate = useNavigate();
  const [allDoctors, setAllDoctors] = useState([]);
  const [selectedDept, setSelectedDept] = useState(null);

  useEffect(() => {
    fetchAllDoctors();
  }, []);

  const fetchAllDoctors = () => {
    axios
      .get("http://localhost:8082/doctor/all")
      .then((response) => {
        setAllDoctors(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  const handleDept = (name) => {
    axios
      .get(`http://localhost:8082/doctor/getwithname?name=${name}`)
      .then((response) => {
        setAllDoctors(response.data);
        setSelectedDept(name);
      })
      .catch((error) => {
        console.error("Error fetching doctors by department:", error);
      });
  };

  const handleResetFilter = () => {
    fetchAllDoctors();
    setSelectedDept(null);
  };

  const handleLogout = () => {
    navigate("/auth/login");
  };

  let pid = localStorage.getItem("id");

  const handleappointment = (doctorid) => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (isLoggedIn) {
      const patientid = localStorage.getItem("id");
      navigate(`/appointment/add/${patientid}/${doctorid}`);
    } else {
      navigate("/auth/login");
    }
  };
  
  return (
    <div>
      <Navbar bg="dark" data-bs-theme="dark" className="justify-content-between">
        <Container>
          <Navbar.Brand href="#home">
            <h4>MediConnect</h4>
          </Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            {localStorage.getItem("isLoggedIn") ? (
              <Nav.Link href={`/previous/appointments/${pid}`}>
                My Appointments
              </Nav.Link>
            ) : (
              ""
            )}
            
          </Nav>
        </Container>
        {localStorage.getItem("isLoggedIn") ? (
          <React.Fragment>
            <Navbar.Text>
              Signed in as:{" "}
              <span style={{ color: "white" }}>
                {localStorage.getItem("username")}
              </span>
            </Navbar.Text>
            &nbsp;&nbsp;&nbsp;
            <button className="btn btn-outline-info " onClick={handleLogout}>
              Logout
            </button>
            &nbsp;&nbsp;&nbsp;&nbsp;
          </React.Fragment>
        ) : (
          <div style={{ display: "flex" }}>
            <button
              className="btn btn-primary btn-sm thick-color mr-2"
              onClick={() => navigate("/auth/login")}
              style={{ color: "white" }}
            >
              Login
            </button>
            &nbsp;&nbsp;&nbsp;&nbsp;
            <button
              className="btn btn-success btn-sm thick-color"
              onClick={() => navigate("/auth/signup")}
              style={{ color: "white" }}
            >
              Signup
            </button>
            &nbsp;&nbsp;&nbsp;&nbsp;
          </div>
        )}
      </Navbar>
      <div
        style={{
          backgroundImage: `url('https://img.freepik.com/free-psd/hallway-emergency-room-generative-ai_587448-2157.jpg')`,
          backgroundSize: "cover",
          minHeight: "200vh",
          paddingTop: "60px",
          backgroundAttachment: "fixed",
        }}
      >
        <div>
          <h1>Patient Dashboard</h1>
        </div>
        <Dropdown>
          <Dropdown.Toggle variant="success" id="dropdown-basic">
            {selectedDept ? `${selectedDept}` : "Select Department"}
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item onClick={() => handleDept("Cardiologist")}>
              Cardiologist
            </Dropdown.Item>
            <Dropdown.Item onClick={() => handleDept("ENT")}>
              ENT
            </Dropdown.Item>
            <Dropdown.Item onClick={() => handleDept("General Physician")}>
              General Physician
            </Dropdown.Item>
            <Dropdown.Item onClick={() => handleDept("Orthopedic")}>
              Orthopedic
            </Dropdown.Item>
            <Dropdown.Item onClick={() => handleDept("Gynecologist")}>
              Gynecologist
            </Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item onClick={handleResetFilter}>Reset</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        <br />
        <div>
          <Row style={{ margin: "10px 5px" }}>
            {allDoctors.map((doctor, index) => (
              <div key={index} className="col-md-3 mb-4">
                <Card
                  style={{
                    width: "18rem",
                    height: "14rem",
                    backgroundColor: "#f8f9fa",
                    boxShadow: "0 4px 8px 0 rgba(0,0,0,0.1)",
                    borderRadius: "8px",
                    border: "none",
                    transition: "transform 0.3s ease",
                    margin: "30px",
                  }}
                >
                  <CardBody>
                    <CardTitle>
                      <h4 style={{ fontWeight: "bold", color: "#007bff" }}>
                        {doctor.name}
                      </h4>
                      <sub>({doctor.qualification})</sub>
                    </CardTitle>
                    <CardSubtitle
                      className="mb-2 text-muted"
                      tag="h6"
                    >
                      <span style={{ fontWeight: "bold" }}>Fee:</span>{" "}
                      {doctor.fee}
                      <br />
                      <span style={{ fontWeight: "bold" }}>
                        Contact:
                      </span>{" "}
                      {doctor.contact}
                      <br />
                      <span style={{ fontWeight: "bold" }}>
                        Timings:
                      </span>{" "}
                      {doctor.startTime}-{doctor.endTime}
                    </CardSubtitle>
                    <div style={{ marginTop: "auto" }}>
                      <center>
                        <Button
                          style={{
                            width: 90,
                            marginBottom: 60,
                          }}
                          variant="outline-primary"
                          onClick={() =>
                            handleappointment(doctor.id)
                          }
                        >
                          Book
                        </Button>
                      </center>
                    </div>
                  </CardBody>
                </Card>
              </div>
            ))}
          </Row>
        </div>
      </div>
    </div>
  );
}

export default PatientDashboard;
