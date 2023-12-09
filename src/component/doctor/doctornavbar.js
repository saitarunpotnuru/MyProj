import React from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import { Link, useNavigate, useParams } from 'react-router-dom';

function DocNavbarComponent() {
  const navigate = useNavigate();
  const {id}=useParams();


  const handleLogout = () => {
    localStorage.clear();
    navigate('/auth/login');
  };
  const handleNavigate = () => {
    navigate(`/doctor/appointments/${id}`);
  };

  return (
    <Navbar bg="dark" data-bs-theme="dark" className="justify-content-between">
      <Container>
        <Navbar.Brand href="#home"><h4>MediConnect</h4></Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link href="#home">Home</Nav.Link>
          <Nav.Link onClick={handleNavigate}>My Appointments</Nav.Link>  </Nav>
      </Container>
      {localStorage.getItem('isLoggedIn') ?
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
  );
}

export default DocNavbarComponent;
