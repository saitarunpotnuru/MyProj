import axios from "axios";
import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import DocNavbarComponent from "../doctornavbar";
import { useParams } from "react-router";

function DocAppointment() {
  const { id } = useParams();
  const [prescription, setPrescription] = useState("");
  const [selectedAppointmentId, setSelectedAppointmentId] = useState(null);

  const [appointments, setAppointments] = useState([]);

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
        status: "ACCEPTED", // Sending ACCEPTED instead of "Accepted"
      })
      .then((response) => {
        console.log("Appointment status updated:", response.data);
        // If you want to update the UI, update the appointments list with the new status
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
        status: "CANCELLED", // Sending CANCELLED instead of "Cancelled"
      })
      .then((response) => {
        console.log("Appointment status updated:", response.data);
        // If you want to update the UI, update the appointments list with the new status
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


  const handleSubmit = (id) => {
    axios
      .put(`http://localhost:8082/doctor/updateAppointment/${id}`, {
        prescription: prescription,
      })
      .then((response) => {
        console.log("Updated Prescription:", response.data);
        // If you want to update the UI, update the appointments list with the new prescription
        const updatedAppointments = appointments.map((appointment) => {
          if (appointment.id === id) {
            return { ...appointment, prescription: prescription };
          }
          return appointment;
        });
        setAppointments(updatedAppointments);
        setPrescription(""); // Clear the prescription input after updating
        setSelectedAppointmentId(null); // Reset selected appointment ID
      })
      .catch((error) => {
        console.error("Error updating prescription:", error);
      });
  };

  
  
  

  return (
    <div>
      <DocNavbarComponent />
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
        <div>
          {appointments.length > 0 ? (
            appointments.map((appointment, index) => (
              <div key={index}>
                <p>
                  <strong>Patient Name:</strong> {appointment.patient.name}
                </p>
                <p>
                  <strong>Date:</strong> {appointment.date}
                </p>
                <p>
                  <strong>Time:</strong> {appointment.time}
                </p>
                <p>
                  <strong>Prescription:</strong> {appointment.prescription}{" "}
                </p>

                {/* ... (existing code) */}
                <button onClick={() => setSelectedAppointmentId(appointment.id)}>
                Add Prescription
              </button>
              {selectedAppointmentId === appointment.id && (
                <div>
                  <input
                    type="text"
                    value={prescription}
                    onChange={(e) => setPrescription(e.target.value)}
                  />
                  <button onClick={() => handleSubmit(appointment.id)}>
                    Submit Prescription
                  </button>
                </div>
              )}
                <p>
                  <strong>Status:</strong> {appointment.status}{" "}
                  <button onClick={() => handleAccept(appointment.id)}>Accept</button>&nbsp;&nbsp;
                  <button onClick={() => handleCancel(appointment.id)}>Cancel</button>
                </p>
                <hr />
              </div>
            ))
          ) : (
            <p>No Appointments...</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default DocAppointment;
