import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DocNavbarComponent from './doctornavbar';
import { useParams } from 'react-router';
import { Card, Table } from 'react-bootstrap';

function DoctorDashboard() {
  const [doctorDetails, setDoctorDetails] = useState({});
  const { id } = useParams();

  useEffect(() => {
    axios.get(`http://localhost:8082/doctor/getone/${id}`)
      .then((response) => {
        setDoctorDetails(response.data);
        console.log('Fetched Doctor Details:', response.data);
      })
      .catch((error) => {
        console.error('Error fetching doctor details:', error);
      });
  }, [id]);

  return (
    <div>
      <DocNavbarComponent />
      <div
        style={{
          backgroundImage: `url('https://img.freepik.com/free-psd/hallway-emergency-room-generative-ai_587448-2157.jpg')`,
          backgroundSize: 'cover',
          minHeight: '100vh',
          paddingTop: '60px',
          backgroundAttachment: 'fixed',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <div className="main-container">
          <div className="content" style={{ marginTop: '20px' }}>
            <h1 style={{ textAlign: 'center' }}>Doctor Dashboard</h1>
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                marginTop: '20px',
              }}
            >
              <Card
                style={{
                  width: '20rem',
                  height: '14rem',
                  backgroundColor: '#f8f9fa',
                  boxShadow: '0 4px 8px 0 rgba(0,0,0,0.1)',
                  borderRadius: '8px',
                  border: 'none',
                  transition: 'transform 0.3s ease',
                }}
              >
                <Card.Body>
                  <Card.Title>Doctor Details</Card.Title>
                  <Table striped bordered>
                    <tbody>
                      <tr>
                        <td><strong>Name:</strong></td>
                        <td>{doctorDetails.name}</td>
                      </tr>
                      <tr>
                        <td><strong>Contact:</strong></td>
                        <td>{doctorDetails.contact}</td>
                      </tr>
                      <tr>
                        <td><strong>Email:</strong></td>
                        <td>{doctorDetails.email}</td>
                      </tr>
                      <tr>
                        <td><strong>Qualification:</strong></td>
                        <td>{doctorDetails.qualification}</td>
                      </tr>
                    </tbody>
                  </Table>
                </Card.Body>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DoctorDashboard;
