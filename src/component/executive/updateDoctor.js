// import { Button, Card, Form } from "react-bootstrap";
// import NavbarComponent from "../navbar";
// import axios from "axios";
// import React, { useState, useEffect } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';

// function UpdateDoctor() {
//   const [name, setName] = useState('');
//   const [fee, setFee] = useState('');
//   const [qualification, setQualification] = useState('');
//   const [contact, setContact] = useState('');
//   const { id } = useParams();
//   const [doctor, setDoctor] = useState({});

//   const handleSubmit = (e) => {
    
//     e.preventDefault();
//     const data = {
//       "name": name,
//       "fee": fee,
//       "qualification": qualification,
//       "contact": contact // Ensure you set the contact value here
//     };

//     axios.put(`http://localhost:8082/doctor/update/${id}`, data)
//       .then(response => {
//         console.log("Updated Doctor Data:", response.data);
//         setDoctor(response.data); 
//       })
//       .catch(error => console.error("Error updating doctor:", error));
//   }

//   return (
//     <div><NavbarComponent />
    
//     <div  style={{
//         backgroundImage: `url('https://img.freepik.com/free-psd/hallway-emergency-room-generative-ai_587448-2157.jpg')`,
//         backgroundSize: "cover",
//         minHeight: "100vh",
//         paddingTop: "60px",
//         backgroundAttachment: "fixed",
//       }}>
      
//       <div className="container mt-4">
//         <Card>
//           <Card.Body>
//             <Card.Title>Update Doctor Information</Card.Title>
//             <Form onSubmit={handleSubmit}>
//               <Form.Group controlId="formBookTitle">
//                 <Form.Label><h5>Name</h5></Form.Label>
//                 <Form.Control
//                   type="text"
//                   placeholder="Enter doctor name"
//                   name="name"
//                   onChange={(e) => setName(e.target.value)}
//                 />
//               </Form.Group>

//               <Form.Group controlId="formAuthor">
//                 <Form.Label><h5>Contact</h5></Form.Label>
//                 <Form.Control
//                   type="text"
//                   placeholder="Enter contact"
//                   name="contact"
//                   onChange={(e) => setContact(e.target.value)}
//                 />
//               </Form.Group>

//               {/* <Form.Group controlId="formNoOfCopies">
//                 <Form.Label><h5>Qualification</h5></Form.Label>
//                 <Form.Control
//                   type="text"
//                   placeholder="Enter qualification"
//                   name="qualification"
//                   onChange={(e) => setQualification(e.target.value)}
//                 />
//               </Form.Group> */}

//               <Form.Group controlId="formBookPrice">
//                 <Form.Label><h5>Fee</h5></Form.Label>
//                 <Form.Control
//                   type="double"
//                   placeholder="Enter fee"
//                   name="fee"
//                   onChange={(e) => setFee(e.target.value)}
//                 />
//               </Form.Group>
//               <br />
              
//               <Button variant="primary" type="submit">
//                 UPDATE
//               </Button>
//             </Form>
//           </Card.Body>
//         </Card>
//       </div>
//     </div>
//     </div>
//   )
// }

// export default UpdateDoctor;
