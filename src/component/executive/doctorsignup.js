import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import { Form, InputGroup, Col, Row } from "react-bootstrap";
import { AutoComplete } from "antd";

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
      style={{
        backgroundImage: `url('https://wallpaperaccess.com/full/1282799.jpg')`,
        backgroundSize: "cover",
        minHeight: "200vh",
        paddingTop: "60px",
        backgroundAttachment: "fixed",
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start"
      }}
    >
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
                <input type="submit" value="Sign Up" />
                <div className="col-md-4"></div>
              </form>
            </div>
          </Col>
          <Col md={7}>
            <div className="card">
              <form onSubmit={doSignUp} className="box">
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
                 <Form.Group className="mb-3">
                  <Form.Label htmlFor="department">Department:</Form.Label>
                <InputGroup>
                       <AutoComplete
                         options={alldept.map(d => ({ value: d.name }))}
                         style={{ borderColor: "black", maxWidth: "800px" }}
                         value={department}
                         onChange={value => setDepartment(value)}
                         placeholder="Select department"
                         className="w-75 mx-auto border border-dark rounded"
                       />
                     </InputGroup>
                   </Form.Group>
              </form>
            </div>
          </Col>
        </Row>
        
      </div>
    </div>
  );
}

export default DoctorSignUpComponent;



