import axios from "axios";
import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import DocNavbarComponent from "../doctornavbar";
import { useParams } from "react-router";



function DocAppointment() {
  const { pid, id ,aid} = useParams();
  const [appointments, setAppointments] = useState([]);
 
  const [showTextarea, setShowTextarea] = useState(false);
const [prescription,setPrescription]=useState();
 
  
  useEffect(() => {
    if (id) {
      axios
        .get(`http://localhost:8082/appointment/get/${id}`)
        .then((response) => {
          console.log("Response data:", response.data); // Add this line to check the structure
          setAppointments(response.data);
        })
        .catch((error) => {
          console.error("Error fetching appointments: ", error);
        });
    }
  }, [id]);
  const handleSubmit = (e) => {
    e.preventDefault();
    let data = ({
        "prescription": prescription,
        
    });
    axios.put(`http://localhost:8082/doctor/updateAppointment/${aid}`,data)
    .then(response => {
        console.log("Updated Description:", response.data);
        setPrescription(response.data); // If you want to update state with the response, you can do it here.
      })
      .catch(error => console.error("Error updating prescription:", error));
  }

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
                <p><strong>Patient Name:</strong> {appointment.patient.name}</p>
                <p><strong>Date:</strong> {appointment.date}</p>
                <p><strong>Time:</strong> {appointment.time}</p>
                <p><strong>Prescription:</strong> {appointment.prescription} </p>
               
                
               
 <button onClick={(e) => handleSubmit(e, appointment.id)}>Add Prescription</button>
 <p><strong>Status:</strong> {appointment.status} <button>Accept</button>&nbsp;&nbsp;<button>Cancel</button></p>
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
