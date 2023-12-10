import axios from "axios";
import React, { useEffect, useState } from "react";
import { Container, Nav, Navbar, Table } from "react-bootstrap";
import DocNavbarComponent from "../doctornavbar";
import { useNavigate, useParams } from "react-router";

function DocAppointment() {
  const { id } = useParams();
  const [prescription, setPrescription] = useState("");
  const [selectedAppointmentId, setSelectedAppointmentId] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const navigate= useNavigate();

  useEffect(() => {
    if (id) {
      axios
        .get(`http://localhost:8082/appointment/get/${id}`)
        .then((response) => {
          console.log("Response data:", response.data);
          setAppointments(response.data);
        })
        .catch((error) => {
          console.error("Error fetching appointments: ", error);
        });
    }
  }, [id]);

  const handleAccept = (id) => {
    axios
      .put(`http://localhost:8082/doctor/updateAppointment/${id}`, {
        status: "ACCEPTED",
      })
      .then((response) => {
        console.log("Appointment status updated:", response.data);
        const updatedAppointments = appointments.map((appointment) => {
          if (appointment.id === id) {
            return { ...appointment, status: "ACCEPTED" };
          }
          return appointment;
        });
        setAppointments(updatedAppointments);
      })
      .catch((error) => {
        console.error("Error updating appointment status:", error);
      });
  };

  const handleCancel = (id) => {
    axios
      .put(`http://localhost:8082/doctor/updateAppointment/${id}`, {
        status: "CANCELLED",
      })
      .then((response) => {
        console.log("Appointment status updated:", response.data);
        const updatedAppointments = appointments.map((appointment) => {
          if (appointment.id === id) {
            return { ...appointment, status: "CANCELLED" };
          }
          return appointment;
        });
        setAppointments(updatedAppointments);
      })
      .catch((error) => {
        console.error("Error updating appointment status:", error);
      });
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate('/auth/login');
  };

  const handleNavigate = () => {
    navigate(`/doctor/appointments/${id}`);
  };

  const handleSubmit = (id) => {
    axios
      .put(`http://localhost:8082/doctor/updateAppointment/${id}`, {
        prescription: prescription,
      })
      .then((response) => {
        console.log("Updated Prescription:", response.data);
        const updatedAppointments = appointments.map((appointment) => {
          if (appointment.id === id) {
            return { ...appointment, prescription: prescription };
          }
          return appointment;
        });
        setAppointments(updatedAppointments);
        setPrescription("");
        setSelectedAppointmentId(null);
      })
      .catch((error) => {
        console.error("Error updating prescription:", error);
      });
  };

  
  
  

  return (
    <div>
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
      <div
        style={{
          backgroundImage: `url('https://img.freepik.com/free-psd/hallway-emergency-room-generative-ai_587448-2157.jpg')`,
          backgroundSize: "cover",
          minHeight: "200vh",
          paddingTop: "60px",
          backgroundAttachment: "fixed",
        }}
      >
        <h1>Previous Appointments</h1>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Patient Name</th>
              <th>Date</th>
              <th>Time</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((appointment, index) => (
              <tr key={index}>
                <td>{appointment.patient.name}</td>
                <td>{appointment.date}</td>
                <td>{appointment.time}</td>
            
                <td>{appointment.status}</td>
                <td>
                  <button onClick={() => handleAccept(appointment.id)}>
                    Accept
                  </button>
                  <button onClick={() => handleCancel(appointment.id)}>
                    Cancel
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
}

export default DocAppointment;