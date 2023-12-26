import React, { Component } from 'react';
import { Table, Col, Button, FormGroup, Form, Row } from 'react-bootstrap';
import { Input, Label, Select } from 'reactstrap';
import CommonServices from '../../Services/CommonServices';
import { connect } from 'react-redux';
import { enqueueSnackbar as snackAlert } from "../../store/actions/notification";
import {
    enqueueSnackbar as enqueueSnackbarAction,
    closeSnackbar
} from '../../store/actions/notification';
import { DatePickerInput } from "rc-datepicker";
import 'rc-datepicker/lib/style.css';

class EditPatientAppointment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            PatientAppId: 0,
            PatientId: null,
            DoctorId: null,
            Status: '',
            UserId: localStorage.getItem("UserId"),
            patientList: [],
            doctorList: [],
            DeleteStatus: false,
            errors: {}
        }
        this.handleChange = this.handleChange.bind(this);
        this.submitForm = this.submitForm.bind(this);
    }

    renderPatientList = () => {
        if (this.state.patientList == undefined) {
            return null;
        }
        return this.state.patientList.map((patient, index) => {
            return <option key={index} value={patient.patientID}>{patient.patientName}</option>
        })
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
        return (
            <div>
                <div>
                    <Form className="wid80">
                        <h4 className="text-center pb-3 clrcode">Edit Appointment</h4>
                        <br></br>
                        <Col>
                            <Form.Group as={Row} controlId="formPatientId">
                                <Form.Label column sm="3">
                                    Patient Name <span className="required">*</span> :
                                </Form.Label>
                                <Form.Label column sm="1">
                                </Form.Label>
                                <Col sm={6}>
                                    <Form.Control as="select"
                                        name="PatientId"
                                        onChange={this.handleChange}
                                        value={this.state.PatientId === null ? '' : this.state.PatientId}>
                                        <span className="error">{this.state.errors["PatientId"]}</span>
                                        <option value="0">Select</option>
                                        {
                                            this.renderPatientList()
                                        }
                                    </Form.Control>
                                    <span className="error">{this.state.errors["PatientId"]}</span>
                                </Col>

                            </Form.Group>
                            <Form.Group as={Row} controlId="formStatus">
                                <Form.Label column sm="3">
                                    Status <span className="required">*</span> :
                                </Form.Label>
                                <Form.Label column sm="1">
                                </Form.Label>
                                <Col sm={6}>
                                    <Form.Control as="select"
                                        name="Status"
                                        onChange={this.handleChange}
                                        value={this.state.Status === null ? '' : this.state.Status}>
                                        {/* <option value=""></option> */}
                                        <option value="Not Arrived">Not Arrived</option>
                                        <option value="Waiting">Waiting</option>
                                        <option value="Completed">Completed</option>
                                    </Form.Control>
                                    <span className="error">{this.state.errors["Status"]}</span>
                                </Col>
                            </Form.Group>

                            <Col>
                                <div>
                                    <Col sm="12" className="text-right">
                                        <button className='btn_Appointment' onClick={this.submitForm}>Save </button>
                                    </Col>
                                </div>
                            </Col>
                        </Col>
                    </Form>
                </div>
                <br></br>
            </div>
        );
    }

    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    validateForm() {
        let fields = this.state;

        let errors = {};
        let isFormValid = true;

        if (fields.PatientId == "") {
            isFormValid = false;
            errors["PatientId"] = "Please select patient name"
        }
        if (fields.FirmIds == "") {
            isFormValid = false;
            errors["Status"] = "Please select the firm name"
        }

        this.setState({ errors });
        return isFormValid;
    }

    handleDateChange = (value, formattedDate) => {
        this.setState({ AppointmentDate: value, formattedDate: formattedDate });
    }
    async componentDidMount() {
        debugger
        await this.GetPatient();
        await this.GetDoctor();
        var Id = this.props.match.params.id;
        this.editPatientApp(Id);
    }

    async GetPatient() {
        var userId = localStorage.getItem("UserId");
        CommonServices.getDataById(userId, `/patientApp/GetCasesByUser`).then((result) => {
            console.log(result);
            this.setState({
                patientList: result
            });
        })
    }
    async GetDoctor() {
        var userId = localStorage.getItem("UserId");
        var result = await CommonServices.getDataById(userId, `/mastersAPI/GetDoctorDetails`);
        this.setState({
            doctorList: result,
        });
    }
    submitForm() {
        if (this.validateForm()) {
            debugger;
            CommonServices.postData(this.state, `/patientApp`).then((responseMessage) => {
                debugger
                this.props.snackAlert();
                //this.props.enqueueSnackbarAction(responseMessage.data);
               
                
              
            });
            this.props.history.push("/DoctorDashboard/");
            this.setState({
                patientAppId: 0,
                PatientId: '',
                DoctorId: '',
                AppointmentDate: '',
                AppointmentTime: '',
                Status: '',
                UserId: localStorage.getItem("UserId"),
                DeleteStatus: false
            });
           
        }
    }

    editPatientApp(patientAppId) {
        debugger;
        if (patientAppId != undefined) {

            CommonServices.getDataById(patientAppId, `/patientApp`).then((res) => {
                this.setState({
                    patientAppId: res.patientAppId,
                    PatientId: res.patientId,
                    DoctorId: res.doctorId,
                    AppointmentDate: res.appointmentDate,
                    AppointmentTime: res.appointmentTime,
                    Status: res.status,
                    DeleteStatus: false
                })
            });
        }
    }
}
const mapStateToProps = (state) => ({
    state: state
});
const mapDispatchToProps = {
    snackAlert
}
export default connect(mapStateToProps, mapDispatchToProps)(EditPatientAppointment)