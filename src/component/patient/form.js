import React, { useState } from "react";
import "./form.css";
import { Navigate, useHref, useNavigate } from "react-router-dom";

function FormComponent() {
  const [patientType, setPatientType] = useState(null);
  const navigate = useNavigate();
  
  const handleSubmit = () => {
    // Handle form submission here based on selected patientType
    if (patientType === 'inpatient') {
      // Handle inpatient submission
      console.log('Inpatient form submitted');
      navigate('/receptionist/dashboard');

    } else if (patientType === 'outpatient') {
      // Handle outpatient submission
      console.log('Outpatient form submitted');
      navigate('/patient/dashboard');
    }
    
  };

  return (
    <div
      className="container-fluid p-0"
      style={{
        backgroundImage: `url('https://www.sujosu.com/images/healthcare.jpg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh', // Set to full viewport height
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <div
        className="card border-white"
        style={{
          backgroundColor: 'rgba(255, 255, 255, 0.8)',
          borderRadius: '10px',
          padding: '40px',
          width: '80%', // Adjust card width as needed
          maxWidth: '600px', // Max width for larger screens
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

        <div className="row justify-content-center">
          <div className="col-lg-6 col-md-8 col-sm-10">
            <button
              type="button"
              className="btn btn-info "
              onClick={handleSubmit}
              disabled={!patientType} // Disable button if no type selected
            >
              <small className="font-weight-bold">Submit</small>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FormComponent;
