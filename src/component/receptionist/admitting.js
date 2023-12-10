import React, { useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { Card } from 'react-bootstrap';

function AdmitPatient() {
  const [admittedDate, setAdmittedDate] = useState('');
  const [dischargeDate, setDischargeDate] = useState('');
  const [msg, setMsg] = useState('');
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const pid = searchParams.get('pid');
  const did = searchParams.get('did');
  const rid = searchParams.get('rid');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`http://localhost:8082/admission/add/${rid}/${pid}/${did}`, {
        admittedDate: admittedDate,
        dischargeDate: dischargeDate,
      });
      console.log('Admission added:', response.data);
      // Handle success message or any further action upon successful submission
    } catch (error) {
      console.error('Error adding admission:', error);
      // Handle error message or any further action upon failure
      setMsg('An error occurred. Please try again later.');
    }
  };

  return (
    <div style={{
      backgroundImage: `url('https://img.freepik.com/free-psd/hallway-emergency-room-generative-ai_587448-2157.jpg')`,
      backgroundSize: 'cover',
      minHeight: '200vh',
      paddingTop: '60px',
      backgroundAttachment: 'fixed',
    }}>
      <h1>Admit Patient</h1>
      <Card>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Admitted Date:</label>
          <input type="date" value={admittedDate} onChange={(e) => setAdmittedDate(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>Discharge Date:</label>
          <input type="date" value={dischargeDate} onChange={(e) => setDischargeDate(e.target.value)} required />
        </div>
        <button type="submit">Admit Patient</button>
        {msg && <div className="error-msg">{msg}</div>}
      </form>

      </Card>
      
    </div>
  );
}

export default AdmitPatient;
