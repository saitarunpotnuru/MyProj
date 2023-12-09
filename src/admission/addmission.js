import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import NavbarComponent from '../component/navbar';
import { Container, Nav, Navbar } from 'react-bootstrap';

export const AdmissionForm = () => {
  const { pid, did, rid } = useParams();
  const [admitdate, setAdmitDate] = useState('');
  const [dischargeDate, setDischargeDate] = useState('');
  const [msg,setMsg]=useState(' ');
  const [date,setDate]=useState(' ');
  const navigate= useNavigate();

  const [admission,setAdmission]=useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    
    console.log('Patient ID:', pid);
    console.log('Doctor ID:', did);
    console.log('Room ID:', rid);
    
    const addmissionObj = {
      date: date,
    
      
    };

    try {
      console.log(addmissionObj)
      const response =  axios.post(`http://localhost:8082/admission/add/${rid}/${did}/${pid}`, addmissionObj);
      setAdmission(response.data)
      console.log('Admission booked');
      
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setMsg('');
      } else {
        setMsg('An error occurred. Please try again later.');
      }
    }

    const handleLogout = () => {
        localStorage.clear();
        navigate('/auth/login');
      }



  };

  return (
    <div className="container" style={{ background: 'white' }}>
      <div className="col-md-6 mx-auto">
        <div>
        <Navbar bg="dark" data-bs-theme="dark" className="justify-content-between">
      <Container>
        <Navbar.Brand href="#home"><h4>MediConnect</h4></Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link href="#home">Home</Nav.Link>
          <Nav.Link href={`admit/patient/${pid}/${did}/${rid}`}>admit patient</Nav.Link>
          <Nav.Link href="#pricing">About Us</Nav.Link>
          <Nav.Link href='/auth/signup'>Sign up</Nav.Link>
        </Nav>
      </Container>
      {
        localStorage.getItem('isLoggedIn') ?
          <React.Fragment>
            <Navbar.Text>
              Signed in as: <span style={{ color: "white" }}>
                {localStorage.getItem('username')}
              </span>
            </Navbar.Text>
            &nbsp;&nbsp;&nbsp;
            <button className="btn btn-outline-info " >Logout</button>&nbsp;&nbsp;&nbsp;&nbsp;
          </React.Fragment>
          :
          <div style={{ display: 'flex' }}>
            <button className="btn btn-primary btn-sm thick-color mr-2" onClick={() => navigate('/auth/login')} style={{ color: 'white' }}>Login</button>&nbsp;&nbsp;&nbsp;&nbsp;
            <button className="btn btn-success btn-sm thick-color" onClick={() => navigate('/auth/signup')} style={{ color: 'white' }}>Signup</button>&nbsp;&nbsp;&nbsp;&nbsp;
          </div>
      }
    </Navbar>
          <h2>Book Admission</h2>
          {msg && <div className="error-msg">{msg}</div>}
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>admitdate:</label>
              <input type="date" value={admitdate} onChange={(e) => setAdmitDate(e.target.value)} required />
            </div>
            <div className="form-group">
              <label>dischargedate:</label>
              <input type="date" value={date} onChange={(e) => setDischargeDate(e.target.value)} required />
            </div>
            <button type="submit">Book Admission</button>
          </form>
        </div>
      </div>
    </div>
  );
}

