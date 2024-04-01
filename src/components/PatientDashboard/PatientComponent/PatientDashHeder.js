import React from 'react';
import { Link } from 'react-router-dom';
import {
    Button,
    Col,
    Container,
    Row
} from 'reactstrap';
import {
    FolderOutlined,
    EventOutlined,
    EditOutlined,
    Keyboard, Print,
    CreditCardOutlined
} from "@material-ui/icons";
import moment from 'moment';
import { Biotech } from '@mui/icons-material';
import { connect, useDispatch, useSelector } from 'react-redux';
require('../styles.css')
const PatientDashHeder = ({ patient }) => {

    const dispatch = useDispatch();
    const { showLabAndImaging, showAddAppointment } = useSelector((state) => state.patient)
    console.log('patient==', patient)
    const currentDate = new Date().toLocaleDateString('en-US', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
    });

    const [day, month, year] = currentDate.split(' ');
    return (
        <>
            {/* <Container>
                <Row>
                    <Col md="6" sm="12" xs="12">
                        <div className="patient_action pull-right" style={{ marginTop: 10}}>
                            <Button
                                type="button"
                                style={{ backgroundColor: "#11b3ea" , borderColor: "#11b3ea" }}
                                size="sm" color="primary">
                                <i className="fa fa-user-plus" color="#FFF"></i>&nbsp; ADD OFFICE VISIT
                            </Button>
                            &nbsp;&nbsp;
                            <Button
                                className="addButton"
                                style={{ backgroundColor: "#fb6c91" , borderColor: "#fb6c91"}}
                                type="button"
                                size="sm" color="primary">
                                <i className="fa fa-pencil-square-o" color="#FFF"></i>&nbsp; REGISTER
                            </Button>
                            &nbsp;&nbsp;
                            <Button
                                type="button"
                                style={{ backgroundColor: "#5cc251" , borderColor: "#5cc251"}}
                                size="sm" color="primary">
                                <i className="fa fa-male" color="#FFF"></i>&nbsp; ADD WALK IN
                            </Button>
                        </div>
                    </Col>
                </Row>
            </Container> */}
            <Row className="header_strip" style={{ marginTop: "-7px", marginBottom: "10px", paddingBottom: "10px" }}>
                <Container className="mxwidth">
                    <Row style={{ marginLeft: "-30px", marginRight: "-30px" }}>
                        <Col md="5" sm="12" xs="12" >
                            <a href="#" className="profile-text">&nbsp;&nbsp;{patient.patientName}</a><span>&nbsp;&nbsp;</span>
                            <p className="profile-info">
                                {`${moment().diff(patient.dateOfBirth, "years")}/${patient.gender == 0 ? "M" : "F"} | ${patient.mobileNo}`} <span className="profile-date">{day} {month} {year}</span>
                            </p>

                        </Col>


                        <Col md="4" sm="12" xs="12" >
                            <p className="pull-right profile-info" >
                                No Upcoming Appointment <span>&nbsp;&nbsp;| &nbsp;&nbsp;</span>Due Amount: Rs. 0.00
                            </p>
                        </Col>
                        <Col md="3" sm="12" xs="12" >
                            <ul className="quick_actions pull-right">
                                <li>
                                    <a href="#" title='Labs & Imaging'>
                                        <Biotech style={{ color: showLabAndImaging ? "#33ACFF" : "#fff", fontSize: 26 }} onClick={() => {
                                            dispatch({ type: 'SHOW_LAB_IMAGING', payload: !showLabAndImaging })
                                            dispatch({ type: 'SHOW_ADD_APPOINTMENT', payload: false })
                                        }} />
                                    </a>
                                </li>
                                <li>
                                    <a href="#" title='Calendar'>
                                        <EventOutlined style={{ color: "#fff", fontSize: 24 }} />
                                    </a>
                                </li>
                                <li>
                                    <a href="#" title='Add Appointment'>
                                        <EditOutlined style={{ color: showAddAppointment ? "#33ACFF" : "#fff", fontSize: 24 }} onClick={() => {
                                            dispatch({ type: 'SHOW_LAB_IMAGING', payload: false })
                                            dispatch({ type: 'SHOW_ADD_APPOINTMENT', payload: !showAddAppointment })
                                        }} />
                                    </a>
                                </li>
                                <li>
                                    <a href="#" title='Keyboard'>
                                        <Keyboard style={{ color: "#fff", fontSize: 24 }} />
                                    </a>
                                </li>
                                <li>
                                    <a href="#" title='Print'>
                                        <Print style={{ color: "#fff", fontSize: 24 }} />
                                    </a>
                                </li>
                                {/* <li>
                                    <a href="#">
                                        <CreditCardOutlined style={{ color: "#fff", fontSize: 24 }} />
                                    </a>
                                </li> */}
                            </ul>

                        </Col>
                    </Row>
                </Container>
            </Row>

            {/* <Row style={{  float: "right" }}>

               
                <Button size="sm" className="btn1" color="primary">REPORTORIZE</Button><span className="numbadge1">02</span>
                &nbsp;&nbsp;
                <Button size="sm" className="btn2" color="primary">EXTRA CLIPBOARD</Button><span className="numbadge1">11</span>
                &nbsp;&nbsp;
                <Button size="sm" className="btn3" color="primary">FOLLOW UP</Button><span className="numbadge1">07</span>
                &nbsp;&nbsp;
                <Button
                    type="button"
                    style={{ backgroundColor: "#224285" , borderColor: "#224285"}}
                    size="sm" color="primary">
                    PRESCRIPTION
                </Button>
                &nbsp;&nbsp;
            </Row> */}


        </>
    )
}

export default connect(null, null)(PatientDashHeder);