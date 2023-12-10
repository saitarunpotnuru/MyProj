



import React, { useState, useEffect } from 'react';
import axios from 'axios';

function InpatientComponent() {
  const [isInpatient, setIsInpatient] = useState(false);

  useEffect(() => {
   
    setIsInpatient(true); 
  }, []);

  return (
    <div className="visit-hospital-page" style={{
        backgroundImage: `url('https://img.freepik.com/free-psd/hallway-emergency-room-generative-ai_587448-2157.jpg')`,
        backgroundSize: 'cover',
        minHeight: '200vh',
        paddingTop: '60px',
        backgroundAttachment: 'fixed',
      }}>
      <div className="content">
        {isInpatient ? (
          <>
            <h1 className="title">Dear Inpatient,</h1>
            <h2 className="subtitle">Kindly Visit the Hospital</h2>
            
          </>
        ) : (
          <h1 className="not-inpatient">You are not an Inpatient</h1>
          
        )}
      </div>
    </div>
  );
}

export default InpatientComponent;
