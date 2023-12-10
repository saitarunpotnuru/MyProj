import axios from "axios";
import { useEffect, useState } from "react";
import { Card, Col, Table } from 'react-bootstrap';
import { useDispatch, useSelector } from "react-redux";
import { getAdmissions } from "../../store/actions/admissions";

function AllAdmissions(){
    const [admissions, setAdmissions] = useState([]); 
    const dispatch = useDispatch();
    let { list } = useSelector((state) => state.admission);
   
    useEffect(() => {
        dispatch(getAdmissions());
    }, [dispatch]);

    return (
        <div style={{
            backgroundImage: `url('https://img.freepik.com/free-psd/hallway-emergency-room-generative-ai_587448-2157.jpg')`,
            backgroundSize: 'cover',
            minHeight: '200vh',
            paddingTop: '60px',
            backgroundAttachment: 'fixed',
          }}>
            <Col md={{ span: 6, offset: 3 }}>
                <Card bg="secondary" text="white" style={{ width: '70%' }}>
                    <Card.Header style={{ backgroundColor: 'gray', color: '#fff', fontSize: '140%' }}>All Admissions</Card.Header>
                    <Card.Body>
                        <Table striped bordered hover variant="dark">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>ID</th>
                                    <th>Admit Date</th>
                                    <th>Discharge Date</th>
                                    {/* Add more table headers as needed */}
                                </tr>
                            </thead>
                            <tbody>
                                {list.map((admission, index) => (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{admission.id}</td>
                                        <td>{admission.admittedDate}</td>
                                        <td>{admission.dischargeDate}</td>
                                        {/* Add more table cells with admission data */}
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </Card.Body>
                </Card>
            </Col>
        </div>
    )
}

export default AllAdmissions;
