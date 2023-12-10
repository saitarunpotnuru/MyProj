import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Button } from 'react-bootstrap';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { Container, Nav, Navbar } from 'react-bootstrap';


function SelectDoctorComponent() {
  const [doctors, setDoctors] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();
 

  // Extracting pid from the URL
  const searchParams = new URLSearchParams(location.search);
  const pid = searchParams.get('pid');
 

  useEffect(() => {
    axios
      .get('http://localhost:8082/doctor/all')
      .then((response) => {
        setDoctors(response.data);
      })
      .catch((error) => {
        console.error('Error fetching doctors:', error);
      });
  }, [pid]);

  const handleNavigate = (did) => {
    navigate(`/receptionist/room?pid=${pid}&did=${did}`);
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate('/auth/login');
  };

  const HandleAdmissions = () => {
    navigate(`/all/admissions`);
  };


  return (
    <div><Navbar bg="dark" data-bs-theme="dark" className="justify-content-between">
    <Container>
      <Navbar.Brand href="#home"><h4>MediConnect</h4></Navbar.Brand>
      <Nav className="me-auto">
        <Nav.Link href="#home">Home</Nav.Link>
        <Nav.Link onClick={HandleAdmissions}>All Admissions</Nav.Link>
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
      
      <br/>
      <br/>
      <br/>
      <h3>Doctor List</h3>
      <Table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Contact</th>
            <th>Department</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {doctors.map((doctor) => (
            <tr key={doctor.id}>
              <td>{doctor.id}</td>
              <td>{doctor.name}</td>
              <td>{doctor.contact}</td>
              <td>{doctor.department.name}</td>
              <td>
                <Button onClick={() => handleNavigate(doctor.id)}>
                  Select
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
    </div>
  );
}

export default SelectDoctorComponent;
