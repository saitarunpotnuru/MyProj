import axios from 'axios';
import React, { useState } from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';

function AppointmentForm() {
  const { pid, did } = useParams();
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [msg, setMsg] = useState('');
  const [appointment, setAppointment] = useState({});
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const appointmentObj = {
      date: date,
      time: time,
    };

    // Validate time within the specified range (9am - 6pm)
    const selectedTime = new Date(`1970-01-01T${time}`);
    const startTime = new Date(`1970-01-01T09:00:00`);
    const endTime = new Date(`1970-01-01T18:00:00`);

    if (selectedTime < startTime || selectedTime > endTime) {
      setMsg('Selected time is out of time slots (9am - 6pm)');
      return;
    }

    try {
      const response = await axios.post(`http://localhost:8082/appointment/add/${pid}/${did}`, appointmentObj);
      setAppointment(response.data);
      setMsg('Appointment booked');
      console.log('Appointment booked');
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setMsg('Slots not available. Please choose another date or time.');
      } else {
        setMsg('An error occurred. Please try again later.');
      }
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate('/auth/login');
  };

  return (
    <div>
      <Navbar bg="dark" variant="dark" className="justify-content-between">
        <Container>
          <Navbar.Brand href="#home">
            <h4 style={{ margin: '0' }}>MediConnect</h4>
          </Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#features">About Us</Nav.Link>
          </Nav>
          {localStorage.getItem('isLoggedIn') ? (
            <React.Fragment>
              <Navbar.Text>
                Signed in as: <span style={{ color: 'white' }}>{localStorage.getItem('username')}</span>
              </Navbar.Text>
              &nbsp;&nbsp;&nbsp;
              <button className="btn btn-outline-info" onClick={handleLogout}>
                Logout
              </button>
              &nbsp;&nbsp;&nbsp;&nbsp;
            </React.Fragment>
          ) : (
            <div style={{ display: 'flex' }}>
              <button className="btn btn-primary btn-sm thick-color mr-2" onClick={() => navigate('/auth/login')}>
                Login
              </button>
              &nbsp;&nbsp;&nbsp;&nbsp;
              <button className="btn btn-success btn-sm thick-color" onClick={() => navigate('/auth/signup')}>
                Signup
              </button>
              &nbsp;&nbsp;&nbsp;&nbsp;
            </div>
          )}
        </Container>
      </Navbar>
      <div
        style={{
          backgroundImage: `url('https://img.freepik.com/free-psd/hallway-emergency-room-generative-ai_587448-2157.jpg')`,
          backgroundSize: 'cover',
          minHeight: '100vh',
          paddingTop: '60px',
          backgroundAttachment: 'fixed',
        }}
      >
        <Container style={{ padding: '20px' }}>
          <div className="col-md-6 mx-auto">
            <div style={{ background: 'rgba(255, 255, 255, 0.8)', padding: '30px', borderRadius: '10px' }}>
              <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Book Appointment</h2>
              {msg && (
                <div className={msg === 'Appointment booked' ? 'success-msg' : 'error-msg'} style={{ color: msg === 'Appointment booked' ? 'green' : 'red', marginBottom: '20px' }}>
                  {msg}
                </div>
              )}
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label>Date:</label>
                  <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="form-control" required />
                </div>
                <div className="form-group">
                  <label>Time:</label>
                  <input type="time" value={time} onChange={(e) => setTime(e.target.value)} className="form-control" required />
                </div>
                <button type="submit" className="btn btn-primary">
                  Book Appointment
                </button>
              </form>
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
}

export default AppointmentForm;
