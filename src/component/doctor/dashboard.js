
import { useParams } from "react-router";
import DocNavbarComponent from "./doctornavbar";
import MyAppointment from "./component/myappointments";
import { useSearchParams } from "react-router-dom";
import DocAppointment from "./component/myappointments";

function DoctorDashboard(){
  

    return(
        <div>
      <DocNavbarComponent />
      
      <div
        style={{
          backgroundImage: `url('https://img.freepik.com/free-psd/hallway-emergency-room-generative-ai_587448-2157.jpg')`,
          backgroundSize: "cover",
          minHeight: "200vh",
          paddingTop: "60px",
          backgroundAttachment: "fixed",
        }}
      ><h1> Doctor Dashborard</h1></div>
        
        </div>
    )
}
export default DoctorDashboard;