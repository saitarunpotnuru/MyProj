import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Button } from 'react-bootstrap';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import { Container, Nav, Navbar } from 'react-bootstrap';


function RoomComponent() {
  const [rooms, setRooms] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);
  const pid = searchParams.get('pid');
  const did = searchParams.get('did');

  useEffect(() => {
    axios
      .get('http://localhost:8082/room/all')
      .then((response) => {
        setRooms(response.data);
      })
      .catch((error) => {
        console.error('Error fetching rooms:', error);
      });
  }, []);

  const handleAdmit = (rid) => {
    navigate(`/receptionist/admit?pid=${pid}&did=${did}&rid=${rid}`);
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate('/auth/login');
  };

  const HandleAdmissions = () => {
    navigate(`/all/admissions`);
  };

  return (
    <div>
      <Navbar bg="dark" data-bs-theme="dark" className="justify-content-between">
      <Container>
        <Navbar.Brand href="#home"><h4>MediConnect</h4></Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link href="#home">Home</Nav.Link>
          <Nav.Link onClick={HandleAdmissions}>All Admissions</Nav.Link>
        </Nav>
      </Container>
      {
        localStorage.getItem('isLoggedIn') ?
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
    <div style={{
      backgroundImage: `url('https://img.freepik.com/free-psd/hallway-emergency-room-generative-ai_587448-2157.jpg')`,
      backgroundSize: 'cover',
      minHeight: '200vh',
      paddingTop: '60px',
      backgroundAttachment: 'fixed',
    }}>
      
      <h3>Rooms List</h3>
      <Table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Type</th>
            <th>Status</th>
            <th>Cost</th>
            <th>Room No</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {rooms.map((room) => (
            <tr key={room.id}>
              <td>{room.id}</td>
              <td>{room.type}</td>
              <td>{room.roomstatus}</td>
              <td>{room.cost}</td>
              <td>{room.room_no}</td>
              <td>
                <Button onClick={() => handleAdmit(room.id)}>Admit</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
    </div>
  );
}

export default RoomComponent;

















