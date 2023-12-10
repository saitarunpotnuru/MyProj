import React, { useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { Card, Form, Button, Alert } from 'react-bootstrap';
import { Container, Nav, Navbar, Table } from 'react-bootstrap';

function AdmitPatient() {
  const [admittedDate, setAdmittedDate] = useState('');
  const [dischargeDate, setDischargeDate] = useState('');
  const [msg, setMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const pid = searchParams.get('pid');
  const did = searchParams.get('did');
  const rid = searchParams.get('rid');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`http://localhost:8082/admission/add/${rid}/${pid}/${did}`, {
        admittedDate: admittedDate,
        dischargeDate: dischargeDate,
      });
      console.log('Admission added:', response.data);
      setSuccessMsg('Successfully Admitted!');
      setMsg('');
    } catch (error) {
      console.error('Error adding admission:', error);
      setMsg('room not available...');
      setSuccessMsg('');
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate('/auth/login');
  };

  const HandleAdmissions = () => {
    navigate(`/all/admissions`);
  };

  return (
    <div
      style={{
        backgroundImage: `url('https://img.freepik.com/free-psd/hallway-emergency-room-generative-ai_587448-2157.jpg')`,
        backgroundSize: 'cover',
        minHeight: '100vh',
        paddingTop: '60px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Navbar bg="dark" variant="dark" fixed="top">
        <Container>
          <Navbar.Brand href="#home"><h4>MediConnect</h4></Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link onClick={HandleAdmissions}>All Admissions</Nav.Link>
          </Nav>
          {localStorage.getItem('isLoggedIn') ? (
            <React.Fragment>
              <Navbar.Text>
                Signed in as: <span style={{ color: 'white' }}>{localStorage.getItem('username')}</span>
              </Navbar.Text>
              &nbsp;&nbsp;&nbsp;
              <button className="btn btn-outline-info" onClick={handleLogout}>Logout</button>
              &nbsp;&nbsp;&nbsp;&nbsp;
            </React.Fragment>
          ) : (
            <div style={{ display: 'flex' }}>
              <button className="btn btn-primary btn-sm thick-color mr-2" onClick={() => navigate('/auth/login')} style={{ color: 'white' }}>Login</button>
            </div>
          )}
        </Container>
      </Navbar>
      <Card style={{ width: '400px', padding: '20px', position: 'fixed' }}>
        <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>Admit Patient</h1>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="admittedDate">
            <Form.Label>Admitted Date:</Form.Label>
            <Form.Control type="date" value={admittedDate} onChange={(e) => setAdmittedDate(e.target.value)} required />
          </Form.Group>
          <Form.Group controlId="dischargeDate">
            <Form.Label>Discharge Date:</Form.Label>
            <Form.Control type="date" value={dischargeDate} onChange={(e) => setDischargeDate(e.target.value)} required />
          </Form.Group>
          <Button variant="primary" type="submit">
            Admit Patient
          </Button>
        </Form>
        {msg && <Alert variant="danger">{msg}</Alert>}
        {successMsg && <Alert variant="success">{successMsg}</Alert>}
      </Card>
    </div>
  );
}

export default AdmitPatient;
