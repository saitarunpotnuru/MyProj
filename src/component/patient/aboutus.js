// AboutUsPage.js

import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';

function AboutUsPage() {
  return (
    <div style={{
      backgroundImage: `url('https://img.freepik.com/free-psd/hallway-emergency-room-generative-ai_587448-2157.jpg')`,
      backgroundSize: "cover",
      minHeight: "100vh",
      paddingTop: "60px",
      backgroundAttachment: "fixed",
      textAlign: "center",
      padding: "20px"
    }}>
      <br/>
      <br/>
      <br/>
      <h1 style={{ color: '#000', marginBottom: '30px' }}>About HealthConnect Hospital</h1>
      <Container>
        <Row>
          <Col md={6}>
            <Card className="bg-dark text-white mb-4">
              <Card.Body>
                <Card.Title style={{ color: '#fff', fontSize: '24px' }}>Our Mission</Card.Title>
                <Card.Text style={{ color: '#fff', fontSize: '18px' }}>
                  Our mission is to deliver high-quality healthcare services and ensure the well-being of every patient. We aim to offer comprehensive, compassionate, and personalized care to each individual who walks through our doors.
                </Card.Text>
              </Card.Body>
            </Card>
            <Card className="bg-dark text-white">
              <Card.Body>
                <Card.Title style={{ color: '#fff', fontSize: '24px' }}>Get In Touch</Card.Title>
                <Card.Text style={{ color: '#fff', fontSize: '18px' }}>
                  For any inquiries or to schedule an appointment, feel free to contact us. We are here to assist you with your healthcare needs.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={6}>
            <Card className="bg-dark text-white mb-4">
              <Card.Body>
                <Card.Title style={{ color: '#fff', fontSize: '24px' }}>Contact Information</Card.Title>
                <Card.Text style={{ color: '#fff', fontSize: '18px' }}>
                  <strong>Email:</strong> healthconnect@gmail.com<br />
                  <strong>Phone:</strong> +1234567890<br />
                  <strong>Address:</strong> 123 HealthConnect Avenue, Citytown, Statezip, Country<br />
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
export default AboutUsPage;