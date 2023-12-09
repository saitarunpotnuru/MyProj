import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  CardBody,
  CardSubtitle,
  CardTitle,
  Container,
  Nav,
  Navbar,
  Row,
} from "react-bootstrap";
import { useNavigate, useParams } from "react-router";
import axios from "axios";

function ExecutiveComponent() {
  const navigate = useNavigate();
  const [allDoctors, setAllDoctors] = useState([]);
  const [showDoctors, setShowDoctors] = useState(false);
 

  const [allReceptionists, setAllReceptionists] = useState([]);
  const [showReceptionists, setShowReceptionists] = useState(false);

  
 

  // const handleUpdateReceptionist = (id) => {
  //   navigate(`/receptionist/update/${id}`);
  // };


      const handleDelete = (id) => {
        console.log('Deleting doctor with ID:', id);
      
        axios.delete(`http://localhost:8082/doctor/delete/${id}`)
          .then(response => {
            console.log( response.data);
            fetchAllDoctors();
          })
          .catch(error => {
            console.error('Error deleting book:', error);
          });
      };
      const handleDeleteReceptionist = (id) => {
        console.log('Deleting receptionist with ID:', id);
      
        axios.delete(`http://localhost:8082/receptionist/delete/${id}`)
          .then(response => {
            console.log( response.data);
            fetchAllReceptionists();
          })
          .catch(error => {
            console.error('Error deleting receptionist:', error);
          });
      };
  

  //get all doctors
  const fetchAllDoctors = () => {
    axios
      .get("http://localhost:8082/doctor/all")
      .then((response) => {
        setAllDoctors(response.data);
      })
      .catch((error) => {
        console.error("Error fetching doctors:", error);
      });
  };

  //get all receptionists
  const fetchAllReceptionists = () => {
    axios
      .get("http://localhost:8082/receptionist/all")
      .then((response) => {
        setAllReceptionists(response.data);
      })
      .catch((error) => {
        console.error("Error fetching receptionists:", error);
      });
  };

  const handleResetFilter = () => {
    setAllDoctors([]);
    setShowDoctors(false);

    setAllReceptionists([]);
    setShowReceptionists(false);
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate('/auth/login');
  };

  

  return (
    <div>
      <Navbar
        bg="dark"
        data-bs-theme="dark"
        className="justify-content-between"
      >
        <Container>
          <Navbar.Brand href="#home">
            <h4>MediConnect</h4>
          </Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="#home">home</Nav.Link>
            <Nav.Link href="#features">about us</Nav.Link>
          </Nav>
        </Container>
        {localStorage.getItem("isLoggedIn") ? (
          <React.Fragment>
            <Navbar.Text>
              Signed in as:{" "}
              <span style={{ color: "white" }}>
                {localStorage.getItem("username")}
              </span>
            </Navbar.Text>
            &nbsp;&nbsp;&nbsp;
            <button className="btn btn-outline-info " onClick={handleLogout}>
              Logout
            </button>
            &nbsp;&nbsp;&nbsp;&nbsp;
          </React.Fragment>
        ) : (
          <div style={{ display: "flex" }}>
            <button
              className="btn btn-primary btn-sm thick-color mr-2"
              onClick={() => navigate("/auth/login")}
              style={{ color: "white" }}
            >
              Login
            </button>
            &nbsp;&nbsp;&nbsp;&nbsp;
            <button
              className="btn btn-success btn-sm thick-color"
              onClick={() => navigate("/auth/signup")}
              style={{ color: "white" }}
            >
              Signup
            </button>
            &nbsp;&nbsp;&nbsp;&nbsp;
          </div>
        )}
      </Navbar>
      
      <div  style={{
          backgroundImage: `url('https://img.freepik.com/free-psd/hallway-emergency-room-generative-ai_587448-2157.jpg')`,
          backgroundSize: "cover",
          minHeight: "100vh",
          paddingTop: "60px",
          backgroundAttachment: "fixed",
        }}>
        <div className="container">
  <h1 className="dashboard-heading">Admin Dashboard</h1>
</div>
        <div className="container">
          
          


          <button
            className="button doctors"
            onClick={() => {
              fetchAllDoctors();
              setShowDoctors(true);
              setShowReceptionists(false);
            }}
          >
            Doctors
          </button>
          <button
            className="button receptionists"
            onClick={() => {
              setShowDoctors(false);
              fetchAllReceptionists();
              setShowReceptionists(true);
            }}
          >
            Receptionists
          </button>

          <button className="button register-doctor" onClick={() => navigate("/doctor/signup")}  >Register Doctor</button>
          <button className="button register-receptionist" onClick={() => navigate("/receptionist/signup")}  >
            Register Receptionist
          </button>
          <Button color="grey" onClick={handleResetFilter} textShadow>
            Reset
          </Button>
        </div>

        
        {showDoctors && (
          <Row style={{ margin: 15 }}>
            {allDoctors.map((doctor, index) => (
              <div key={index} className="col-md-3 mb-4">
                <Card>
                  <CardBody>
                    <CardTitle>
                      <h4>{doctor.name}</h4>
                      <sub>({doctor.qualification})</sub>
                    </CardTitle>
                    <CardSubtitle className="mb-2 text-muted" tag="h6" >
                      Fee: {doctor.fee}
                      <br />
                      Contact: {doctor.contact}
                      <br />
                      Timings: {doctor.startTime}-{doctor.endTime}
                      <br/>
                      {/* <Button onClick={() => navigate(`/doctor/update/${doctor.id}`)} style={{ width: 200, alignSelf: "center", margin: 15 }} variant="outline-primary">
                      UPDATE
                    </Button> */}
                      <button  onClick={() => handleDelete(doctor.id)}>delete</button>
 
                    </CardSubtitle>
                  </CardBody>
                </Card>
              </div>
            ))}
          </Row>
        )}

        
        {showReceptionists && (
          <Row style={{ margin: 15 }}>
            {allReceptionists.map((receptionist, index) => (
              <div key={index} className="col-md-3 mb-4">
                <Card>
                  <CardBody>
                    <CardTitle>
                      <h4>{receptionist.name}</h4>
                      
                    </CardTitle>
                    <CardSubtitle className="mb-2 text-muted" tag="h6">
              <span style={{ fontWeight: "bold" }}>E-mail:</span>{" "}
               {receptionist.email}
               <br />
               <span style={{ fontWeight: "bold" }}>Gender:</span>{" "}
               {receptionist.gender}
               <br />
               <span style={{ fontWeight: "bold" }}>Contact:</span>{" "}
               {receptionist.contact}
               <br />
               {/* <Button onClick={() => navigate(`/receptionist/update/${receptionist.id}`)} style={{ width: 200, alignSelf: "center", margin: 15 }} variant="outline-primary">
                      UPDATE
                    </Button> */}
               
               <button onClick={() => handleDeleteReceptionist(receptionist.id)}>delete</button>
               
             </CardSubtitle>
                  </CardBody>
                </Card>
              </div>
            ))}
          </Row>
        )}
      </div>
    </div>
  );
}

export default ExecutiveComponent;




















