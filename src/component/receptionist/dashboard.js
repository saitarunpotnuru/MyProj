import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Nav, Navbar, Table } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function ReceptionistDashboard() {
  const [patients, setPatients] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get('http://localhost:8082/patient/get')
      .then((response) => {
        setPatients(response.data);
      })
      .catch((error) => {
        console.error('Error fetching patients:', error);
      });
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    navigate('/auth/login');
  };

  const handleDoctorClick = (patientId) => {
    navigate(`/receptionist/doctor?pid=${patientId}`);
  };

  return (
   
    <div >
      
<Navbar bg="dark" data-bs-theme="dark" className="justify-content-between">
      <Container>
        <Navbar.Brand href="#home"><h4>MediConnect</h4></Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link href="#home">Home</Nav.Link>
          <Nav.Link href="#pricing">All Admissions</Nav.Link>
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
            <button className="btn btn-outline-info " onClick={handleLogout}>Logout</button>&nbsp;&nbsp;&nbsp;&nbsp;
          </React.Fragment>
          :
          <div style={{ display: 'flex' }}>
            <button className="btn btn-primary btn-sm thick-color mr-2" onClick={() => navigate('/auth/login')} style={{ color: 'white' }}>Login</button>&nbsp;&nbsp;&nbsp;&nbsp;
            
          </div>
      }
    </Navbar>
    <div style={{
      backgroundImage: `url('https://img.freepik.com/free-psd/hallway-emergency-room-generative-ai_587448-2157.jpg')`,
      backgroundSize: 'cover',
      minHeight: '200vh',
      paddingTop: '60px',
      backgroundAttachment: 'fixed',
    }}>

      <Container>
        <div
          
        >
          <h1>Receptionist Dashboard</h1>

          <Table striped bordered hover>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Age</th>
                <th>Gender</th>
                <th>Contact</th>
                <th>select</th>
              </tr>
            </thead>
            <tbody>
              {patients.map((patient) => (
                <tr key={patient.id}>
                  <td>{patient.id}</td>
                  <td>{patient.name}</td>
                  <td>{patient.age}</td>
                  <td>{patient.gender}</td>
                  <td>{patient.contact}</td>
                  <td>
                    <button
                      className="btn btn-primary"
                      onClick={() => handleDoctorClick(patient.id)}
                    >
                      Admit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </Container>
    </div>
    </div>
  );
}

export default ReceptionistDashboard;
























