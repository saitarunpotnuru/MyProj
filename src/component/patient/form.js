import React, { useState, useEffect } from "react";
import "./form.css";
import { useNavigate } from "react-router-dom";

function FormComponent() {
  const [patientType, setPatientType] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = () => {
    if (patientType === 'inpatient') {
      console.log('Inpatient form submitted');
      navigate('/inpatient/dashboard');
    } else if (patientType === 'outpatient') {
      console.log('Outpatient form submitted');
      navigate('/patient/dashboard');
    } else {
      // If no patient type is selected
      console.log('Please select a patient type');
    }
  };

  const handleLogin = () => {
    navigate('/auth/login');
  };

  useEffect(() => {
    // Check if a patient type is not selected initially
    if (!patientType) {
      showLoginMessage();
    }
  }, [patientType]);

  const showLoginMessage = () => {
    return (
      <p className="text-center mt-4">
        If you are not a patient, click here to{" "}
        <span
          style={{ textDecoration: 'underline', cursor: 'pointer', color: 'blue' }}
          onClick={handleLogin}
        >
          login
        </span>
      </p>
    );
  };

  return (
    <div
      className="container-fluid p-0"
      style={{
        backgroundImage: `url('https://www.sujosu.com/images/healthcare.jpg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
      }}
    >
      <div
        className="card border-white"
        style={{
          backgroundColor: 'rgba(255, 255, 255, 0.8)',
          borderRadius: '10px',
          padding: '40px',
          width: '80%',
          maxWidth: '600px',
          marginBottom: '20px',
        }}
      >
        <h1 className="font-weight-bold text-center mb-4">
          Welcome to MediConnect
        </h1>
        <strong className="text-center mb-4">
          Efficiency Amplified, Care Simplified
        </strong>

        <div className="form-group">
          <label className="mr-3">Patient Type:</label>&nbsp;&nbsp;&nbsp;
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="patientType"
              id="outpatient"
              value="outpatient"
              onChange={(e) => setPatientType(e.target.value)}
            />
            <label className="form-check-label" htmlFor="outpatient">
              Outpatient
            </label>
          </div>
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="patientType"
              id="inpatient"
              value="inpatient"
              onChange={(e) => setPatientType(e.target.value)}
            />
            <label className="form-check-label" htmlFor="inpatient">
              Inpatient
            </label>
          </div>
        </div>
        <hr/>

        <div className="row justify-content-center">
          <div className="col-lg-6 col-md-8 col-sm-10">
            <button
              type="button"
              className="btn btn-info mr-2"
              onClick={handleSubmit}
              disabled={!patientType}
            >
              <small className="font-weight-bold">Submit</small>
            </button>
          </div>
        </div>

        {/* Display login message */}
        {showLoginMessage()}
      </div>
    </div>
  );
}

export default FormComponent;
