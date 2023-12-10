import axios from "axios";
import React, { useEffect, useState } from "react";
import { Card, Col, Table } from 'react-bootstrap';
import { useDispatch, useSelector } from "react-redux";
import { getAdmissions } from "../../store/actions/admissions";
import { Container, Nav, Navbar } from 'react-bootstrap';
import { useNavigate } from "react-router";


function AllAdmissions(){
    const [admissions, setAdmissions] = useState([]); 
    const dispatch = useDispatch();
    const navigate = useNavigate();

    let { list } = useSelector((state) => state.admission);
   
    useEffect(() => {
        dispatch(getAdmissions());
    }, [dispatch]);

    const handleLogout = () => {
        localStorage.clear();
        navigate('/auth/login');
      };
    
      const HandleAdmissions = () => {
        navigate(`/all/admissions`);
      };
    

    return (
        
        <div>
            <Navbar bg="dark" variant="dark" fixed="top">
        <Container>
          <Navbar.Brand href="#home"><h4>MediConnect</h4></Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link onClick={HandleAdmissions}>All Admissions</Nav.Link>
          </Nav>
          {localStorage.getItem('isLoggedIn') ? (
            <React.Fragment>
              <Navbar.Text>
                Signed in as: <span style={{ color: 'white' }}>{localStorage.getItem('username')}</span>
              </Navbar.Text>
              &nbsp;&nbsp;&nbsp;
              <button className="btn btn-outline-info" onClick={handleLogout}>Logout</button>
              &nbsp;&nbsp;&nbsp;&nbsp;
            </React.Fragment>
          ) : (
            <div style={{ display: 'flex' }}>
              <button className="btn btn-primary btn-sm thick-color mr-2" onClick={() => navigate('/auth/login')} style={{ color: 'white' }}>Login</button>
            </div>
          )}
        </Container>
      </Navbar>
      
        
        <div style={{
            backgroundImage: `url('https://img.freepik.com/free-psd/hallway-emergency-room-generative-ai_587448-2157.jpg')`,
            backgroundSize: 'cover',
            minHeight: '200vh',
            paddingTop: '60px',
            backgroundAttachment: 'fixed',
          }}>
            <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '100vh', // Adjust to set minimum height as per your design
          }}>
            <Col md={{ span: 6, offset: 3 }}>
            <Card bg="secondary" text="white" style={{ width: '70%' }}>
        <Card.Header style={{ backgroundColor: 'gray', color: '#fff', fontSize: '140%' }}>All Admissions</Card.Header>
                    <Card.Body>
                    <Table striped bordered hover variant="dark" style={{ margin: 'auto' }}>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>ID</th>
                                    <th>Admit Date</th>
                                    <th>Discharge Date</th>
                                    {/* Add more table headers as needed */}
                                </tr>
                            </thead>
                            <tbody>
                                {list.map((admission, index) => (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{admission.id}</td>
                                        <td>{admission.admittedDate}</td>
                                        <td>{admission.dischargeDate}</td>
                                        {/* Add more table cells with admission data */}
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </Card.Body>
                </Card>
            </Col>
        </div>
        </div>
        </div>
    )
}

export default AllAdmissions;
