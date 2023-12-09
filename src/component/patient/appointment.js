import axios from 'axios';
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

function AppointmentForm() {
  const { pid, did } = useParams();
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [msg,setMsg]=useState(' ');
  const [appointment,setAppointment]=useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    
    console.log('Patient ID:', pid);
    console.log('Doctor ID:', did);
    console.log('Date:', date);
    console.log('Time:', time);

    const appointmentObj = {
      date: date,
      time: time,
      
    };

    try {
      console.log(appointmentObj)
      const response =  axios.post(`http://localhost:8082/appointment/add/${pid}/${did}`, appointmentObj);
      setAppointment(response.data)
      console.log('Appointment booked');
      
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setMsg('Slots not available. Please choose another date or time.');
      } else {
        setMsg('An error occurred. Please try again later.');
      }
    }



  };

  return (
    <div className="container" style={{ background: 'white' }}>
      <div className="col-md-6 mx-auto">
        <div>
          <h2>Book Appointment</h2>
          {msg && <div className="error-msg">{msg}</div>}
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Date:</label>
              <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
            </div>
            <div className="form-group">
              <label>Time:</label>
              <input type="time" value={time} onChange={(e) => setTime(e.target.value)} required />
            </div>
            <button type="submit">Book Appointment</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AppointmentForm;
