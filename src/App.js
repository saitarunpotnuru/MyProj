import logo from './logo.svg';
import './App.css';
import PatientDashboard from './component/patient/dashboard';
import { Route, Routes } from 'react-router-dom';
import FormComponent from './component/patient/form';
import ReceptionistComponent from './component/executive/dashboard';
import LoginComponent from './component/auth/login';
import SignUpComponent from './component/auth/signup';
import AppointmentComponent from './component/patient/appointment';
import ExecutiveComponent from './component/executive/dashboard';
import DoctorSignUpComponent from './component/executive/doctorsignup';
import ReceptionistDashboard from './component/receptionist/dashboard';
import DoctorDashboard from './component/doctor/dashboard';
import PreviousAppointments from './component/patient/previousAppointments';
import ReceptionistSignUpComponent from './component/executive/receptionistsignup';
import UpdateComponent from './component/executive/updateDoctor';
import UpdateReceptionist from './component/executive/updatereceptionist';
import UpdateDoctor from './component/executive/updateDoctor';
import DocAppointment from './component/doctor/component/myappointments';
import { AdmissionForm } from './admission/addmission';
// import UpdateDoctor from './component/executive/updateDoctor';

function App() {
  return (
    <div className="App">
      
      {/* <FormComponent /> */}
      {/* <AppComponent /> */}
      {/* <NavbarComponent /> */}
      {/* <LoginComponent /> */}
      {/* <SignUpComponent /> */}
      {/* <AppointmentComponent /> */}
      {/* <ExecutiveComponent /> */}
      {/* <SignUpComponent /> */}
      {/* <DoctorSignUpComponent /> */}
      {/* <ReceptionistDashboard /> */}
    {/* <PreviousAppointments /> */}

  

    {/* <AdmissionForm/> */}
   

      
      
      <Routes>
      <Route path="/update-doctor/:id" element={<UpdateComponent/>}></Route> 

      <Route path='/auth/signup'element={<SignUpComponent />}></Route>



     <Route path="/" element={<FormComponent/>}></Route>  

     <Route path="/doctor/appointments/:id" element={<DocAppointment/>}></Route> 

     <Route path="/doctor/dashboard/:id" element={<DoctorDashboard/>}></Route> 

     <Route path="/patient/dashboard" element={<PatientDashboard/>}></Route>

     <Route path="/patient/dashboard/:id" element={<PatientDashboard/>}></Route>  

     <Route path="/receptionist/dashboard" element={<ReceptionistDashboard/>}></Route> 

     <Route path="/executive/dashboard/:id" element={<ExecutiveComponent />}></Route> 

     <Route path='/appointment/add/:pid/:did'element={<AppointmentComponent/>}></Route>

     <Route path="/doctor/signup" element={<DoctorSignUpComponent/>}></Route>

     <Route path="/receptionist/signup" element={<ReceptionistSignUpComponent/>}></Route>

     <Route path="/doctor/dashboard/:did" element={<DoctorDashboard/>}></Route>

      <Route path='/auth/login'element={<LoginComponent />}></Route>

     <Route path='/auth/signup'element={<SignUpComponent />}></Route>

     <Route path='/previous/appointments/:pid'element={<PreviousAppointments />}></Route>

     <Route path="/receptionist/dashboard/:id" element={<ReceptionistDashboard />}> </Route>

     <Route path='/admit/patient/:pid/:did/:rid' element={<AdmissionForm/>} />







     </Routes> 

    </div>
  );
}

export default App;
