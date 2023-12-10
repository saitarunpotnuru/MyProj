import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Button } from 'react-bootstrap';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

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

  return (
    <div style={{
      backgroundImage: `url('https://img.freepik.com/free-psd/hallway-emergency-room-generative-ai_587448-2157.jpg')`,
      backgroundSize: 'cover',
      minHeight: '200vh',
      paddingTop: '60px',
      backgroundAttachment: 'fixed',
    }}>
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
  );
}

export default SelectDoctorComponent;
