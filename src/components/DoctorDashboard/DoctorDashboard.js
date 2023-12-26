import React from 'react';
import { connect } from "react-redux"
import CommonServices from '../../Services/CommonServices';
import { Link } from 'react-router-dom';
import {
    enqueueSnackbar as enqueueSnackbarAction,
    closeSnackbar
} from '../../store/actions/notification';
import {
    Button,
    Card,
    CardBody,
    CardHeader,
    Col,
    FormGroup,
    Input,
    Label,
    Row,
} from 'reactstrap';
import './styles.css'
import { DatePickerInput } from "rc-datepicker";
import 'rc-datepicker/lib/style.css';
import { FormLabel, Table } from 'react-bootstrap';
import { getIntensities } from "../../store/actions/IntensityAction"

class DoctorDashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            PatientAppId: 0,
            patientList: [],
            doctorList: [],
            DoctorId: '',
            PatientId: '',
            AppointmentDate: '',
            AppointmentTime: '',
            Status: '',
            UserId: localStorage.getItem("UserId"),
            SearchKey: '',
            appointmentCount: '',
            Appdate: new Date(),
            IsDataFetched: false,
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleDateChange = this.handleDateChange.bind(this);
        this.handleDoctorChange = this.handleDoctorChange.bind(this);
    }

    patientAdd = () => {
        this.props.history.push('/PatientEntry');
    }
    billPay = () => {
        this.props.history.push('/');
    }
    async componentDidMount() {
        debugger;
        this.props.getIntensities();
        await this.GetDoctor();
        this.GetAllCases();
        this.GetAllCount();
    }

    renderDoctorList = () => {
        if (this.state.doctorList == undefined) {
            return null;
        }
        return this.state.doctorList.map((doctor, index) => {
            return <option key={index} value={doctor.doctorID}>{doctor.doctorName}</option>
        })
    }
    render() {
        debugger;
        const searchTerm = this.state.SearchText;
        var patients;
        if (searchTerm != "" && searchTerm != undefined) {
            patients = this.state.patientList.filter((value) => {
                if (value.patientName.toLowerCase().indexOf(searchTerm) !== -1) {
                    return value;
                } else if (value.mobileNo.indexOf(searchTerm) !== -1) {
                    return value;
                }
            });
        }
        else {
            patients = this.state.patientList;
            console.log('>>>>>===>>>', patients)
        }
        return (
            <div>
                <Row>
                    <Col xs="12" md="12">
                        <Card>
                            <CardBody style={{ fontWeight: "600" }} >
                                <FormGroup style={{ marginBottom: 0 }}>
                                    <Row>
                                        <FormLabel column sm="1">Patient : </FormLabel>
                                        <Col sm="3">
                                            <Input type="search"
                                                placeholder="Search by Name / Mobile No."
                                                name='SearchText'
                                                value={this.state.SearchText}
                                                onChange={this.handleChange} />
                                        </Col>

                                        <FormLabel column sm="1">Doctor : </FormLabel>
                                        <Col sm="3">
                                            <Input type="select"
                                                name="DoctorId"
                                                onChange={this.handleDoctorChange}
                                                value={this.state.DoctorId}>
                                                {
                                                    this.renderDoctorList()
                                                }
                                            </Input>
                                        </Col>

                                        <FormLabel column sm="2">Date : </FormLabel>
                                        <FormLabel column sm="2"><i className="fa fa-calendar" aria-hidden="true"></i> &nbsp;&nbsp;|&nbsp;&nbsp; {(this.state.Appdate.getDate() + "-" + (this.state.Appdate.getMonth() + 1) + "-" + this.state.Appdate.getFullYear())}</FormLabel>

                                    </Row>

                                    <Row>

                                        <FormLabel column sm="2" style={{ color: "#0d37d3" }}>Waiting : </FormLabel>
                                        <FormLabel column sm="2" style={{ color: "#0d37d3" }}><i className="fa fa-hourglass-half" aria-hidden="true"></i> &nbsp;&nbsp;|&nbsp;&nbsp; {this.state.appointmentCount.patientAppWaiting}</FormLabel>

                                        <FormLabel column sm="2" style={{ color: "#ff0000" }}>Not Arrived : </FormLabel>
                                        <FormLabel column sm="2" style={{ color: "#ff0000" }}><i className="fa fa-ban" aria-hidden="true"></i> &nbsp;&nbsp;|&nbsp;&nbsp; {this.state.appointmentCount.patientAppNotArrived}</FormLabel>

                                        <FormLabel column sm="2" style={{ color: "#00a100" }}>Completed : </FormLabel>
                                        <FormLabel column sm="2" style={{ color: "#00a100" }}><i className="fa fa-check-square-o" aria-hidden="true"></i> &nbsp;&nbsp;|&nbsp;&nbsp; {this.state.appointmentCount.patientAppComplated}</FormLabel>

                                    </Row>

                                    <Row>

                                        <FormLabel column sm="2" style={{ color: "#d3960d" }}>Walk-Ins : </FormLabel>
                                        <FormLabel column sm="2" style={{ color: "#d3960d" }}>&nbsp;<i className="fa fa-male" aria-hidden="true"></i> &nbsp;&nbsp;|&nbsp;&nbsp; 0</FormLabel>

                                        <FormLabel column sm="2" style={{ color: "#d800ff" }}>E-Consult : </FormLabel>
                                        <FormLabel column sm="2" style={{ color: "#d800ff" }}><i className="fa fa-laptop" aria-hidden="true"></i> &nbsp;&nbsp;|&nbsp;&nbsp; 0</FormLabel>

                                        <FormLabel column sm="2" style={{ color: "#5aa2e0" }}>Total : </FormLabel>
                                        <FormLabel column sm="2" style={{ color: "#5aa2e0" }}><i className="fa fa-list-alt" aria-hidden="true"></i> &nbsp;&nbsp;|&nbsp;&nbsp; 0</FormLabel>

                                    </Row>

                                </FormGroup>
                            </CardBody>
                        </Card>
                        <Card>
                            <CardHeader style={{ padding: 8 }}>
                                <Row>
                                    <Col md="6" style={{ paddingTop: 5 }}>
                                        <i className="fa fa-pencil-square headerIcon"></i> Appointments
                                    </Col>
                                    <Col md="4"></Col>
                                    <Col md="2">
                                        <FormGroup style={{ marginBottom: 0, width: 100 }}>
                                            <DatePickerInput
                                                dateFormat="yyyy/MM/dd"
                                                value={this.state.Appdate}
                                                onChange={this.handleDateChange}
                                                name="Appdate"
                                                selected={this.state.Appdate}
                                            />
                                        </FormGroup>
                                    </Col>
                                </Row>
                            </CardHeader>


                            <CardBody>
                                <Table responsive="sm" style={{ marginBottom: 0 }} hover bordered >
                                    <thead>
                                        <tr>
                                            <th style={{ width: "20%", textAlign: "left" }}>Name</th>
                                            <th style={{ width: "15%", textAlign: "center" }}>Phone</th>
                                            <th style={{ width: "15%", textAlign: "center" }}>Time</th>
                                            <th style={{ width: "15%", textAlign: "center" }}>Payment</th>
                                            <th style={{ width: "15%", textAlign: "center" }}>Status</th>
                                            <th style={{ width: "20%", textAlign: "center" }}>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            patients ?
                                                patients.map((value, index) => {
                                                    return (
                                                        <tr key={index}>
                                                            <td className="tbl1">
                                                                <Link to={"/PatientDashboard/" + value.patientId + "/" + value.caseId + "/" + value.patientAppId + "/" + value.doctorId}>
                                                                    <p style={{ color: "#007bff", textTransform: "uppercase", padding: 0, margin: 0 }}>{value.patientName}</p>
                                                                </Link></td>
                                                            <td className="tbl">{value.mobileNo}</td>
                                                            <td className="tbl"> {new Date(`2000-01-01T${value.appointmentTime}`).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit', hour12: true })}</td>
                                                            <td className="tbl"></td>
                                                            <td className="tbl">{value.status}</td>
                                                            <td className="tbl2" style={{ textAlign: "center" }}>
                                                                <Link to={"/PatientDashboard/" + value.patientId + "/" + value.caseId + "/" + value.patientAppId + "/" + value.doctorId}>
                                                                    <Button style={{ fontSize: "12px" }} size="md" color="primary"><i className="fa fa-plus-square"></i> ADD SYMPTOM</Button> &nbsp;
                                                                </Link>
                                                                <Link to={"/EditPatientAppointment/" + value.patientAppId}>
                                                                    <Button onClick={() => this.editPatientApp(value.patientAppId)} style={{ fontSize: "12px" }} size="md" color="danger"><i className="fa fa-pencil-square"></i> EDIT</Button> &nbsp;
                                                                </Link>
                                                            </td>
                                                        </tr>
                                                    )
                                                }) : null
                                        }
                                    </tbody>
                                </Table>
                            </CardBody>
                        </Card>
                    </Col>

                </Row>

                <div className="row ">
                    <div className="col-sm-1"></div>
                    <div className="col-sm-10">
                        <div className="sticky" >
                            <div className="stickyc">
                                <span className="rndv">{this.state.appointmentCount.patientAppNotArrived}</span>  Not Arrived &nbsp;&nbsp;&nbsp;&nbsp;
                                <span className="rndv">0</span>  Walk-Ins &nbsp;&nbsp;&nbsp;&nbsp;
                                <span className="rndv">0</span>  Regular &nbsp;&nbsp;&nbsp;&nbsp;
                                <span className="rndv">0</span>  Guaranteed &nbsp;&nbsp;&nbsp;&nbsp;
                                <span className="rndv">0</span>  Video Consult &nbsp;&nbsp;&nbsp;&nbsp;
                                <span className="rndv">{this.state.appointmentCount.patientAppComplated}</span>  Completed &nbsp;&nbsp;&nbsp;&nbsp;
                                <span className="rndv">{this.state.appointmentCount.patientApp}</span>  Total &nbsp;&nbsp;&nbsp;&nbsp;
                            </div>

                        </div>
                    </div>
                    <div className="col-sm-1"></div>
                </div>

            </div>
        )
    }
    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }
    handleDateChange = (value, formattedDate) => {
        this.setState({ Appdate: value, formattedDate: formattedDate }, () => {
            this.GetAllCases();
            this.GetAllCount();
        });
    }

    handleDoctorChange(e) {
        this.setState({
            DoctorId: e.target.value
        })
    }
    async GetDoctor() {
        var userId = localStorage.getItem("UserId");
        var result = await CommonServices.getDataById(userId, `/mastersAPI/GetDoctorDetails`);
        this.setState({
            doctorList: result,
        });
    }

    GetAllCases() {
        var patient = {
            UserId: localStorage.getItem("UserId"),
            AppointmentDate: (this.state.Appdate.getFullYear() + "-" + (this.state.Appdate.getMonth() + 1) + "-" + this.state.Appdate.getDate()),
        };

        console.log(patient);
        CommonServices.postData(patient, `/doctorDashBoard`).then((result) => {
            this.setState({
                patientList: result.data,


            })

        });

    }

    GetAllCount() {
        var patient = {
            UserId: localStorage.getItem("UserId"),
            AppointmentDate: (this.state.Appdate.getFullYear() + "-" + (this.state.Appdate.getMonth() + 1) + "-" + this.state.Appdate.getDate()),
        };
        CommonServices.postData(patient, `/doctorDashBoard/GetCountApp`).then((result) => {
            debugger;

            console.log('GetAllCount====>>>>>', result)

            this.setState({
                appointmentCount: result.data,
            })
        })
    }

    editPatientApp(patientAppId) {
        debugger;
        CommonServices.getDataById(patientAppId, `/patientApp`).then((res) => {

            this.setState({
                patientAppId: res.patientAppId,
                PatientId: res.patientId,
                DoctorId: res.doctorID,
                AppointmentDate: res.appointmentDate,
                AppointmentTime: res.appointmentTime,
                Status: res.status,
                DeleteStatus: false
            })
        });
    }

};

const mapStateToProps = (state) => ({
    // patient: state.patient.patient,
    // state: state.rubrics,
});

const mapDispatchToProps = {
    enqueueSnackbarAction,
    getIntensities,
    closeSnackbar
}

export default connect(mapStateToProps, mapDispatchToProps)(DoctorDashboard)