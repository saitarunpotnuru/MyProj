import React, { useState } from "react";
import axios from "axios";
import { Navigate, useNavigate } from "react-router";

function RegisterPatient() {
  const [formData, setFormData] = useState('');
  const [name,setName] = useState('');
  const [age,setAge] = useState ('');
  const [gender,setGender] = useState ('');
  const [email,setEmail] = useState ('');
  const [contact,setContact] = useState ('');
  const [username,setUsername] = useState ('');
  const [password,setPassword] = useState ('');
  const [patient,setPatient] = useState ('');
  const [msg,setMsg] = useState('');
  const navigate = useNavigate();

  





  const doSignUp = (e) => {
    
    e.preventDefault();
    let patientObj = {
      name: name,
      age: age,
      gender: gender,
      email: email,
      contact: contact,
      user: {
        username: username,
        password: password
      }
    };
  
    axios.post('http://localhost:8082/patient/add', patientObj)
      .then(response => {
        setPatient(response.data);
        navigate('/receptionist/dashboard/');
      })
      .catch(function (error) {
        setMsg('Issue in processing sign up');
      });
  };
  
    

  return (
    <div
        style={{
          backgroundImage: `url('https://wallpaperaccess.com/full/1282799.jpg')`,
          backgroundSize: "cover",
          minHeight: "100vh",
          paddingTop: "10px",

          backgroundAttachment: "fixed",
        }}
      >
    <div className="container">
      <div className="row">
        <div className="col-md-6">
          <div className="scard">
            <form onSubmit={doSignUp} className="box">
              
              <h1>Sign Up</h1>
              <p style={{ color: "white" }}>Please enter your information:</p>
              <input
                type="text"
                name="name"
                placeholder="Name"
                
                onChange={(e)=>setName(e.target.value)}              />
              <input
                type="text"
                name="email"
                placeholder="Email"
               
                onChange={(e)=>setEmail(e.target.value)}              />

                <input
                type="text"
                name="username"
                placeholder="Username"
               
                onChange={(e)=>setUsername(e.target.value)}              />

                <input
                type="password"
                name="password"
                placeholder="Password"
               
                onChange={(e)=>setPassword(e.target.value)}              />
              <input
                type="text"
                name="age"
                placeholder="Age"
                
                onChange={(e)=>setAge(e.target.value)}              />

              <input
                type="text"
                name="contact"
                placeholder="Contact"
                
                onChange={(e)=>setContact(e.target.value)}              />
              <select
                name="gender"
                style={{color:"grey"}} 
                onChange={(e)=>setGender(e.target.value)}
                className="gender-dropdown"
              >
                <option style={{color:"grey"}} value="">Select Gender</option>
                <option style={{color:"black"}} value="male">Male</option>
                <option style={{color:"black"}} value="female">Female</option>
                <option style={{color:"black"}} value="other">Other</option>
              </select>
              <input type="submit" value="Sign Up" />
              <div className="col-md-12"></div>
              
            </form>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}

export default RegisterPatient;
