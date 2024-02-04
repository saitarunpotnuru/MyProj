import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import { Form, InputGroup, Col } from "react-bootstrap";
import Select from "react-select";
import { AutoComplete } from "antd";
import {
  Button,
  Card,
  CardBody,
  CardSubtitle,
  CardTitle,
  Container,
  Nav,
  Navbar,
  Row,
} from "react-bootstrap";

function DoctorSignUpComponent() {
  const [name, setName] = useState('');
  const [gender, setGender] = useState('');
  const [date, setDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [fee, setFee] = useState('');
  const [qualification, setQualification] = useState('');
  const [email, setEmail] = useState('');
  const [contact, setContact] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState('');
  const [department, setDepartment] = useState('');
  const [alldept, setAlldept] = useState([]);
  const navigate = useNavigate();
 

  const handleDepartmentChange = (selectedOption) => {
    setDepartment(selectedOption);
  };
  const handleLogout = () => {
    localStorage.clear();
    navigate('/auth/login');
  };

  useEffect(() => {
    axios.get('http://localhost:8082/department/get')
      .then(response => {
        setAlldept(response.data);
      })
      .catch(function (error) {
        setMsg('Issue in processing sign up');
      });
  }, []);

  const doSignUp = (e) => {
    e.preventDefault();
    const doctorObj = {
      name,
      gender,
      email,
      contact,
      date,
      startTime,
      endTime,
      fee,
      qualification,
      user: { username, password },
      department // Add selected department to the doctor object
      
    };
    console.log(doctorObj);

    axios.post('http://localhost:8082/doctor/add', doctorObj)
      .then(response => {
        navigate('/auth/login?msg=signup success');
      })
      .catch(error => {
        setMsg('Issue in processing sign up');
      });
  };

  return (
    <div
    
  >
    <Navbar
        bg="dark"
        data-bs-theme="dark"
        className="justify-content-between"
      >
        <Container>
          <Navbar.Brand href="#home">
            <h4>MediConnect</h4>
          </Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="#home">home</Nav.Link>
            <Nav.Link href="#features">about us</Nav.Link>
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
    <div className="container">
      <Row className="gx-1">
        <Col md={5}>
            <div className="card">
              <form onSubmit={doSignUp} className="box" style={{marginRight:50}}>
                <h1>Sign Up</h1>
                <p style={{ color: "white" }}>Please enter your information:</p>
                <input
                  type="text"
                  name="name"
                  placeholder="Name"
                  onChange={(e) => setName(e.target.value)}
                />
                <input
                  type="text"
                  name="email"
                  placeholder="Email"
                  onChange={(e) => setEmail(e.target.value)}
                />
                <input
                  type="text"
                  name="username"
                  placeholder="Username"
                  onChange={(e) => setUsername(e.target.value)}
                />
                <select
                  name="gender"
                  style={{ color: "grey" }}
                  onChange={(e) => setGender(e.target.value)}
                  className="gender-dropdown"
                >
                  <option style={{ color: "grey" }} value="">Gender</option>
                  <option style={{ color: "black" }} value="male">Male</option>
                  <option style={{ color: "black" }} value="female">Female</option>
                  <option style={{ color: "black" }} value="other">Other</option>
                </select>
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                />
                <input
                  type="text"
                  name="qualification"
                  placeholder="Qualification"
                  onChange={(e) => setQualification(e.target.value)}
                />
                <br/>
                
                <div className="col-md-4"></div>
              </form>
            </div>
          </Col>
          <Col md={7}>
            <div className="card">
              <form onSubmit={doSignUp} className="box">

              <Form.Group>
              <div style={{ display: "flex", justifyContent: "center" }}>
      <Select
        options={alldept.map((d) => ({ value: d.name, label: d.name }))}
        value={department}
        onChange={handleDepartmentChange}
        placeholder="Select department"
        styles={{
          control: (provided) => ({
            ...provided,
            maxWidth: "500px",
            border: "1px solid #ced4da",
          }),
        }}
      />
    </div>
    </Form.Group>

                
                <input
                  type="time"
                  name="startTime"
                  placeholder="StartTime"
                  onChange={(e) => setStartTime(e.target.value)}
                />
                <input
                  type="time"
                  name="endTime"
                  placeholder="EndTime"
                  onChange={(e) => setEndTime(e.target.value)}
                />
                <input
                  type="text"
                  name="fee"
                  placeholder="Fee"
                  onChange={(e) => setFee(e.target.value)}
                />
                <input
                  type="date"
                  name="date"
                  placeholder="Date"
                  onChange={(e) => setDate(e.target.value)}
                />
                <input
                  type="text"
                  name="contact"
                  placeholder="Contact"
                  onChange={(e) => setContact(e.target.value)}
                />
                
                   <input type="submit" value="Sign Up" />
                   <br/>
              </form>
            </div>
          </Col>
        </Row>
        
      </div>
    </div>
  );
}

export default DoctorSignUpComponent;







