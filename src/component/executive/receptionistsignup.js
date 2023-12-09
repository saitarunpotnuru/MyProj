import { Col, Row } from "react-bootstrap";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";

function ReceptionistSignUpComponent() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [gender, setGender] = useState('');
    const [contact, setContact] = useState('');
    const [username, setUsername] = useState('');
    const [receptionist, setReceptionist] = useState('');
    const [password, setPassword] = useState('');
    const [msg, setMsg] = useState('');

    const navigate = useNavigate();

    const doSignUp = (e) => {
        e.preventDefault();
        let receptionistObj = {
            "name": name,
            "contact": contact,
            "email": email,
            "gender": gender,
            "user": {
                "username": email,
                "password": password
            }
        };

        axios.post('http://localhost:8082/receptionist/add', receptionistObj)
            .then(response => {
                setReceptionist(response.data);
                navigate('/auth/login');
            })
            .catch(function (error) {
                setMsg('Issue in processing sign up');
            });
    };

    return (
        <div>
            <div
                style={{
                    backgroundImage: `url('https://wallpaperaccess.com/full/1282799.jpg')`,
                    backgroundSize: "cover",
                    minHeight: "200vh",
                    paddingTop: "60px",
                    backgroundAttachment: "fixed",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "flex-start"
                }}
            >
                <div className="container">
                    <Row className="gx-1">
                        <Col md={5}>
                            <div className="card">
                                <form onSubmit={doSignUp} className="box" style={{ marginRight: 50 }}>
                                    <h1>Sign Up</h1>
                                    <p style={{ color: "white" }}>Please enter your information:</p>
                                    <input
                                        type="text"
                                        name="name"
                                        placeholder="Name"
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                    <input
                                        type="text"
                                        name="email"
                                        placeholder="Email"
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                    <select
                                        name="gender"
                                        style={{ color: "grey" }}
                                        onChange={(e) => setGender(e.target.value)}
                                        className="gender-dropdown"
                                    >
                                        <option style={{ color: "grey" }} value="">Gender</option>
                                        <option style={{ color: "black" }} value="male">Male</option>
                                        <option style={{ color: "black" }} value="female">Female</option>
                                        <option style={{ color: "black" }} value="other">Other</option>
                                    </select>
                                    <input
                                        type="password"
                                        name="password"
                                        placeholder="Password"
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                    <input
                                        type="text"
                                        name="contact"
                                        placeholder="Contact"
                                        onChange={(e) => setContact(e.target.value)}
                                    />
                                    <input type="submit" value="Sign Up" />
                                    <div className="col-md-4"></div>
                                </form>
                            </div>
                        </Col>
                        <Col md={7}>
                            {/* Additional content for the second column */}
                        </Col>
                    </Row>
                </div>
            </div>
        </div>
    );
}

export default ReceptionistSignUpComponent;
