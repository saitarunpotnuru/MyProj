// import { Button, Card, Form } from "react-bootstrap";
// import NavbarComponent from "../navbar";
// import axios from "axios";
// import React, { useState } from 'react';
// import { useParams } from 'react-router-dom';

// function UpdateReceptionist() {
//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const [gender, setGender] = useState('');
//   const [contact, setContact] = useState('');
//   const [receptionist, setReceptionist] = useState('');

//   const { id } = useParams();

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const data = {
//       "name": name,
//       "email": email,
//       "gender": gender,
//       "contact": contact,
//     };

//     axios.put(`http://localhost:8082/receptionist/update/${id}`, data)
//       .then(response => {
//         console.log("Updated receptionist Data:", response.data);
//         setReceptionist(response.data); 
//       })
//       .catch(error => console.error("Error updating receptionist:", error));
//   }

//   return (
//     <div>
//       <NavbarComponent />
//       <div style={{
//         backgroundImage: `url('https://img.freepik.com/free-psd/hallway-emergency-room-generative-ai_587448-2157.jpg')`,
//         backgroundSize: "cover",
//         minHeight: "100vh",
//         paddingTop: "60px",
//         backgroundAttachment: "fixed",
//       }}>
//         <div className="container mt-4">
//           <Card>
//             <Card.Body>
//               <Card.Title>Update Receptionist Information</Card.Title>
//               <Form onSubmit={handleSubmit}>
//                 <Form.Group controlId="formBookTitle">
//                   <Form.Label><h5>Name</h5></Form.Label>
//                   <Form.Control
//                     type="text"
//                     placeholder="Enter receptionist name"
//                     name="name"
//                     onChange={(e) => setName(e.target.value)}
//                   />
//                 </Form.Group>

//                 <Form.Group controlId="formAuthor">
//                   <Form.Label><h5>Contact</h5></Form.Label>
//                   <Form.Control
//                     type="text"
//                     placeholder="Enter contact"
//                     name="contact"
//                     onChange={(e) => setContact(e.target.value)}
//                   />
//                 </Form.Group>

//                 <Form.Group controlId="formBookPrice">
//                   <Form.Label><h5>Email</h5></Form.Label>
//                   <Form.Control
//                     type="email"
//                     placeholder="Enter email"
//                     name="email"
//                     onChange={(e) => setEmail(e.target.value)}
//                   />
//                 </Form.Group>
//                 <Form.Group controlId="formBookPrice">
//                   <Form.Label><h5>Gender</h5></Form.Label>
//                   <Form.Control
//                     type="gender"
//                     placeholder="Enter gender"
//                     name="gender"
//                     onChange={(e) => setGender(e.target.value)}
//                   />
//                 </Form.Group>
//                 <br />

//                 <Button variant="primary" type="submit">
//                   UPDATE
//                 </Button>
//               </Form>
//             </Card.Body>
//           </Card>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default UpdateReceptionist;





















// // import React, { useState, useEffect } from 'react';
// // import { useParams, useNavigate } from 'react-router-dom';
// // import axios from 'axios';


// // function UpdateReceptionist() {
//     // const [name,setName] = useState('');
//     // const [email,setEmail] = useState('');
//     // const [gender,setGender] = useState('');
//     // const [contact,setContact] = useState('');

//     // const { id } =useParams();

//     // const handleSubmit = (e) => {
       
        
//     //     e.preventDefault();
//     //     let data = ({
//     //         "name": '',
//     //         "email": '',
//     //         "gender": '',
//     //         "contact": '',
//     //     });
        
//     //     }
// //   return (
// //     <div>
// //       <h2>Update Receptionist</h2>
// //       <form onSubmit={handleSubmit}>
// //         <label>
// //           Name:
// //           <input
// //             type="text"
// //             name="name"
// //             onChange={(e)=>setName(e.target.value)}

// //           />
// //         </label>
// //         <br />
// //         <label>
// //           Contact:
// //           <input
// //             type="text"
// //             name="contact"
// //             onChange={(e)=>setContact(e.target.value)}

// //           />
// //         </label>
// //         <br />
// //         <label>
// //           Email:
// //           <input
// //             type="email"
// //             name="email"
// //             onChange={(e)=>setEmail(e.target.value)}
// //           />
// //         </label>
// //         <br />
// //         <label>
// //           Gender:
// //           <select name="gender" onChange={(e)=>setGender(e.target.value)}
// // >
// //             <option value="male">Male</option>
// //             <option value="female">Female</option>
// //             <option value="other">Other</option>
// //           </select>
// //         </label>
// //         <br />
// //         <button type="submit">Update</button>
// //       </form>
// //     </div>
// //   );
// // }

// // export default UpdateReceptionist;
