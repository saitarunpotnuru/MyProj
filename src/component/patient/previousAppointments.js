import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Container, Nav, Navbar, Table } from "react-bootstrap";

function PreviousAppointments() {
  const { pid } = useParams();
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const navigate = useNavigate();

  const filteredAppointments = appointments.filter(appointment => {
    const appointmentStatus = appointment.status.toLowerCase();
    const filterStatus = filter.toLowerCase();
  
    if (filter === "all" || appointmentStatus === filterStatus) {
      return true;
    } else {
      return false;
    }
  });

  useEffect(() => {
    if (pid) {
      axios
        .get("http://localhost:8082/appointment/get/appointment/" + pid)
        .then((response) => {
          setAppointments(response.data);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching appointments: ", error);
          setLoading(false);
        });
    }
  }, [pid]);

  useEffect(() => {
    console.log("Appointments:", appointments);
    console.log("Filtered Appointments:", filteredAppointments);
  }, [appointments, filteredAppointments]);

  const handleLogout = () => {
    localStorage.clear();
    navigate('/auth/login');
  }

  const handleFilterChange = (status) => {
    setFilter(status);
  }

  return (
    <div>
      <Navbar bg="dark" data-bs-theme="dark" className="justify-content-between" fixed="top">
        <Container>
          <Navbar.Brand href="#home"><h4>MediConnect</h4></Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link onClick={() => navigate('/patient/dashboard/')}>Home</Nav.Link>
            {localStorage.getItem('isLoggedIn') ? (
              <Nav.Link onClick={() => navigate('/previous/appointments/:pid')}>My Appointments</Nav.Link>) : ''}
            
          </Nav>
          {localStorage.getItem('isLoggedIn') ? (
            <React.Fragment>
              <Navbar.Text>
                Signed in as: <span style={{ color: "white" }}>
                  {localStorage.getItem('username')}
                </span>
              </Navbar.Text>
              &nbsp;&nbsp;&nbsp;
              <button className="btn btn-outline-info " onClick={handleLogout}>Logout</button>&nbsp;&nbsp;&nbsp;&nbsp;
            </React.Fragment>
          ) : (
            <div style={{ display: 'flex' }}>
              <button className="btn btn-primary btn-sm thick-color mr-2" onClick={() => navigate('/auth/login')} style={{ color: 'white' }}>Login</button>&nbsp;&nbsp;&nbsp;&nbsp;
              <button className="btn btn-success btn-sm thick-color" onClick={() => navigate('/auth/signup')} style={{ color: 'white' }}>Signup</button>&nbsp;&nbsp;&nbsp;&nbsp;
            </div>
          )}
        </Container>
      </Navbar>

      <div
        style={{
          backgroundImage: `url('https://img.freepik.com/free-psd/hallway-emergency-room-generative-ai_587448-2157.jpg')`,
          backgroundSize: 'cover',
          minHeight: '200vh',
          paddingTop: '60px',
          backgroundAttachment: 'fixed',
        }}
      >
        <br/>
        <br/>
        <h1>Previous Appointments</h1>
        <br/>
        

        <div>
          <button onClick={() => handleFilterChange("all")} >All</button> &nbsp;&nbsp;
          <button onClick={() => handleFilterChange("pending")} style={{ backgroundColor: "lightgoldenrodyellow" }}>Pending</button>&nbsp;&nbsp;&nbsp;
          <button onClick={() => handleFilterChange("accepted")} style={{ backgroundColor: "lightgreen" }}>Accepted</button>&nbsp;&nbsp;&nbsp;
          <button onClick={() => handleFilterChange("cancelled")} style={{ backgroundColor: "red" }}>Cancelled</button>&nbsp;&nbsp;&nbsp;
        </div>
        <br></br>
        {loading ? (
          <p>Loading...</p>
        ) : filteredAppointments.length === 0 ? (
          <p>No appointments found.</p>
        ) : (
          <Table striped bordered hover size="sm" style={{ maxWidth: "800px", margin: "auto" }}>
            <thead>
              <tr>
                <th>Doctor Name</th>
                <th>Date</th>
                <th>Time</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredAppointments.map((appointment, index) => (
                <tr key={index}>
                  <td>{appointment.doctor ? appointment.doctor.name : 'No Doctor Found'}</td>
                  <td>{appointment.date}</td>
                  <td>{appointment.time}</td>
                  <td>{appointment.status}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </div>
    </div>
  );
}

export default PreviousAppointments;
