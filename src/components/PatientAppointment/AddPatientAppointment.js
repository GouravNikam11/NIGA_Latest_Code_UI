import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Table, Col, Button, FormGroup, Form, Row } from 'react-bootstrap';
import { Input, Label, Select } from 'reactstrap';
import {
    Card,
    CardBody,
    CardFooter,
    CardHeader
} from 'reactstrap';

import CommonServices from '../../Services/CommonServices';
import { enqueueSnackbar as snackAlert } from "../../store/actions/notification";
import {
    enqueueSnackbar as enqueueSnackbarAction,
    closeSnackbar
} from '../../store/actions/notification';
import { DatePickerInput } from "rc-datepicker";
import 'rc-datepicker/lib/style.css';

class AddPatientAppointment extends Component {
    constructor(props) {
        super(props);

        this.state = {
            // patientID: 0,
            // patientName: '',
            patientAppId: 0,
            PatientId: null,
            DoctorId: '',
            AppointmentDate: new Date(),
            AppointmentTime: '',
            Status: 'Waiting',
            UserId: localStorage.getItem("UserId"),
            patientList: [],
            doctorList: [],
            DeleteStatus: false,
            errors: {}
        }
        this.handleChange = this.handleChange.bind(this);
        this.submitForm = this.submitForm.bind(this);
    }



    async componentDidMount() {
        debugger;
        var Id = this.props.match.params.id;
        var DId = this.props.match.params.did
        this.setState({
            PatientId: Id,
            DoctorId: DId
        });
        console.log("state============", this.state)
        await this.GetPatient();
        await this.GetDoctor();
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

            <Card>
                <CardHeader>
                    <i className="fa fa-align-justify"></i>
                    Add Appointment
                </CardHeader>
                <CardBody>
                    <Form className="form-horizontal">
                        <Row>
                            <Col xs="12" md="3">
                                <Form.Group controlId="formPatientId">
                                    <Label>
                                        Patient Name <span className="required"> *</span>:
                                    </Label>
                                    <Form.Control as="select"
                                        name="PatientId"
                                        onChange={this.handleChange}
                                        value={this.state.PatientId === null ? '' : this.state.PatientId}
                                    //disabled={this.state.PatientId !== null}
                                    >

                                        <option value="0">Select</option>
                                        {
                                            this.renderPatientList()
                                        }
                                    </Form.Control>
                                    <span className="error">{this.state.errors["PatientId"]}</span>

                                </Form.Group>

                            </Col>

                            <Col xs="12" md="3">
                                <Form.Group controlId="formDoctorId">
                                    <Label>
                                        Doctor Name <span className="required"> *</span>:
                                    </Label>
                                    <Form.Control as="select"
                                        name="DoctorId"
                                        onChange={this.handleChange}
                                        value={this.state.DoctorId === null ? '' : this.state.DoctorId}

                                    >

                                        <option value="0">Select</option>
                                        {
                                            this.renderDoctorList()
                                        }
                                    </Form.Control>
                                    <span className="error">{this.state.errors["DoctorId"]}</span>

                                </Form.Group>

                            </Col>

                            <Col xs="12" md="3">
                                <Form.Group controlId="formAppointmentDate">
                                    <Label>
                                        Appointment Date <span className="required"> *</span>:
                                    </Label>

                                    <DatePickerInput
                                        readOnly={true}
                                        dateFormat="DD/MM/YYYY"
                                        disableClock={true}
                                        value={this.state.AppointmentDate}
                                        onChange={this.handleDateChange.bind(this)}
                                        name="AppointmentDate" 
                                        minDate={new Date()}
                                        />
                                    <span className="error">{this.state.errors["AppointmentDate"]}</span>
                                </Form.Group>

                            </Col>

                            <Col xs="12" md="3">
                                <Form.Group controlId="formAppointmentTime">
                                    <Label>
                                        Appointment Time <span className="required"> *</span>:
                                    </Label>
                                    <Form.Control type="time"
                                        name="AppointmentTime"
                                        onChange={this.handleChangefortime}
                                        value={this.state.AppointmentTime === null ? '' : this.state.AppointmentTime}
                                    />
                                    <span className="error">{this.state.errors["AppointmentTime"]}</span>

                                </Form.Group>
                            </Col>

                        </Row>
                    </Form>


                </CardBody>

                <CardFooter>
                    <Row>
                        <Col xs="12" md="6">
                            <Button className='btn_Appointment' size="sm" onClick={this.submitForm}> <i className="fa fa-save"></i> Save </Button>
                        </Col>
                        <Col xs="12" md="6" style={{ textAlign: "right" }}>
                            <Label style={{ fontSize: 15, margin: 0, paddingTop: 5 }}> Fields marked with an asterisk <span className="required">*</span> are mandatory</Label>
                        </Col>
                    </Row>
                </CardFooter>
            </Card>

        )
    }

    editAuthorGetPatientDetails(Id) {
        debugger;
        if (Id != undefined) {
            CommonServices.getDataById(Id, `/patient/GetPatientDetailsById`).then((res) => {
                this.setState({
                    PatientId: res.patientID,
                    // patientName: res.patientName
                });
            });
        }
    }

    validateForm() {
        let fields = this.state;

        let errors = {};
        let isFormValid = true;

        if (fields.PatientId == null) {
            isFormValid = false;
            errors["PatientId"] = "Please select the patient name"
        }
        if (fields.DoctorId == null) {
            isFormValid = false;
            errors["DoctorId"] = "Please select the doctor name"
        }
        if (fields.AppointmentDate == "") {
            isFormValid = false;
            errors["AppointmentDate"] = "Please enter the appointment date"
        }
        if (fields.AppointmentTime == "") {
            isFormValid = false;
            errors["AppointmentTime"] = "Please enter the appointment time"
        }

        this.setState({ errors });
        return isFormValid;
    }

    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }


    handleChangefortime = (event) => {
        const selectedTime = event.target.value;
        const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      
        // Compare the selected time with the current time
        if (selectedTime < currentTime) {
          // Prevent selecting past times by resetting the state value
          this.setState({ AppointmentTime: null });
          this.props.snackAlert('This Appointment time is not valied Please select another time',"warning");
        } else {
          this.setState({ AppointmentTime: selectedTime });
        }
      }

    handleDateChange = (value, formattedDate) => {
        debugger
        this.setState({ AppointmentDate: value.getFullYear() + "-" + (value.getMonth() + 1) + "-" + value.getDate(), formattedDate: formattedDate });
    }



    async GetPatient() {
        var userId = localStorage.getItem("UserId");
        CommonServices.getDataById(userId, `/patientApp/GetCasesByUser`).then((result) => {
            this.setState({
                patientList: result
            });
        })
    }
    async GetDoctor() {
        debugger
        var userId = localStorage.getItem("UserId");
        CommonServices.getDataById(userId, `/mastersAPI/GetDoctorDetails`).then((result) => {
            console.log('GetDoctor========', result)
            this.setState({
                doctorList: result,

            });
        })
    }

    submitForm() {
        debugger;

        if (this.validateForm()) {
            debugger



            this.state.AppointmentDate = formatDate(this.state.AppointmentDate)
            function formatDate(dateString) {
                const date = new Date(dateString);
                const day = date.getDate();
                const month = date.getMonth() + 1;
                const year = date.getFullYear();

                // Pad single-digit day and month with leading zeros
                // const formattedDay = String(day).padStart(2, '0');
                // const formattedMonth = String(month).padStart(2, '0');

                // Return the formatted date string
                return `${year}-${month}-${day}`;

            }
            // const day = String(this.state.AppointmentDate.getDate());
            // const month = String(this.state.AppointmentDate.getMonth() + 1);
            // const year = this.state.AppointmentDate.getFullYear();
            // const formattedDate = `${year}-${month}-${day}`;

            // this.state.AppointmentDate=formattedDate;
            // debugger

            console.log('this.state===========____=========', this.state)
            debugger
            CommonServices.postData(this.state, `/patientApp`).then((responseMessage) => {
                debugger
                console.log('responseMessage===', responseMessage.data)
                if (responseMessage.data == 'This Appointment Already Book Please select another time') {
                    this.props.snackAlert('This Appointment Already Book Please select another time');
                    this.props.history.push("/AddPatientAppointment/" + this.props.match.params.id + "/" + this.props.match.params.did);
                  

                }
                else {
                    this.props.snackAlert();
                    this.props.history.push("/DoctorDashboard");
                    this.setState({
                        patientAppId: 0,
                        PatientId: '',
                        DoctorId: '',
                        AppointmentDate: '',
                        AppointmentTime: '',
                        Status: 'Waiting',
                        UserId: localStorage.getItem("UserId"),
                        DeleteStatus: false
                    });
                }

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
export default connect(mapStateToProps, mapDispatchToProps)(AddPatientAppointment)