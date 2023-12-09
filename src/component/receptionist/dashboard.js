// import React, { useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import { Container, Nav, Navbar } from 'react-bootstrap';

// function ReceptionistDashboard() {
//   const [name, setName] = useState('');
//   const [age, setAge] = useState('');
//   const [gender, setGender] = useState('');
//   const [email, setEmail] = useState('');
//   const [contact, setContact] = useState('');
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [patient, setPatient] = useState('');
//   const navigate = useNavigate();
//   const [msg, setMsg] = useState('');

//   const doSignUp = (e) => {
//     e.preventDefault();
//     let patientObj = {
//       name: name,
//       age: age,
//       gender: gender,
//       email: email,
//       contact: contact,
//       user: {
//         username: username,
//         password: password,
//       },
//     };

//     axios
//       .post('http://localhost:8082/patient/add', patientObj)
//       .then((response) => {
//         setPatient(response.data);
//         navigate('/auth/login?msg=signup success');
//       })
//       .catch(function (error) {
//         setMsg('Issue in processing sign up');
//       });
//   };

//   const handleLogout = () => {
//     localStorage.clear();
//     navigate('/auth/login');
//   };

//   return (
//     <div>
//       <Navbar bg="dark" data-bs-theme="dark" className="justify-content-between">
//       <Container>
//         <Navbar.Brand href="#home"><h4>MediConnect</h4></Navbar.Brand>
//         <Nav className="me-auto">
//           <Nav.Link href="#home">Home</Nav.Link>
          
//           <Nav.Link href="#pricing"onClick={() => navigate("/previous/appointments/" + pid)}>Admit Patient</Nav.Link>
//         </Nav>
//       </Container>
//       {
//         localStorage.getItem('isLoggedIn') ?
//           <React.Fragment>
//             <Navbar.Text>
//               Signed in as: <span style={{ color: "white" }}>
//                 {localStorage.getItem('username')}
//               </span>
//             </Navbar.Text>
//             &nbsp;&nbsp;&nbsp;
//             <button className="btn btn-outline-info " onClick={handleLogout}>Logout</button>&nbsp;&nbsp;&nbsp;&nbsp;
//           </React.Fragment>
//           :
//           <div style={{ display: 'flex' }}>
//             <button className="btn btn-primary btn-sm thick-color mr-2" onClick={() => navigate('/auth/login')} style={{ color: 'white' }}>Login</button>&nbsp;&nbsp;&nbsp;&nbsp;
            
//           </div>
//       }
//     </Navbar>
//       <div
//         style={{
//           backgroundImage: `url('https://img.freepik.com/free-psd/hallway-emergency-room-generative-ai_587448-2157.jpg')`,
//           backgroundSize: 'cover',
//           minHeight: '200vh',
//           paddingTop: '60px',
//           backgroundAttachment: 'fixed',
//         }}
//       >
//         <h1>Receptionist Dashboard</h1>
//         {/* Your signup form code here
//         <div className="container">
//       <div className="row">
//         <div className="col-md-6">
//           <div className="scard">
//             <form onSubmit={doSignUp} className="box">
              
//               <h1>Sign Up</h1>
//               <p style={{ color: "white" }}>Please enter your information:</p>
//               <input
//                 type="text"
//                 name="name"
//                 placeholder="Name"
                
//                 onChange={(e)=>setName(e.target.value)}              />
//               <input
//                 type="text"
//                 name="email"
//                 placeholder="Email"
               
//                 onChange={(e)=>setEmail(e.target.value)}              />

//                 <input
//                 type="text"
//                 name="username"
//                 placeholder="Username"
               
//                 onChange={(e)=>setUsername(e.target.value)}              />

//                 <input
//                 type="password"
//                 name="password"
//                 placeholder="Password"
               
//                 onChange={(e)=>setPassword(e.target.value)}              />
//               <input
//                 type="text"
//                 name="age"
//                 placeholder="Age"
                
//                 onChange={(e)=>setAge(e.target.value)}              />

//               <input
//                 type="text"
//                 name="contact"
//                 placeholder="Contact"
                
//                 onChange={(e)=>setContact(e.target.value)}              />
//               <select
//                 name="gender"
//                 style={{color:"grey"}} 
//                 onChange={(e)=>setGender(e.target.value)}
//                 className="gender-dropdown"
//               >
//                 <option style={{color:"grey"}} value="">Select Gender</option>
//                 <option style={{color:"black"}} value="male">Male</option>
//                 <option style={{color:"black"}} value="female">Female</option>
//                 <option style={{color:"black"}} value="other">Other</option>
//               </select>
//               <input type="submit" value="Sign Up" />
//               <div className="col-md-12"></div>
              
//             </form>
//           </div>
//         </div>
//       </div>
//     </div> */}


//       </div>
//     </div>
//   );
// }

// export default ReceptionistDashboard;
