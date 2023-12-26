/*========================= AddRubrics ==================================*/
/**
 * Created Date     :   03-03-2020
 * Purpose          :   Component is responsible for adding rubrics for sections.
 * Author           :   Chandrashekhar Salagar.
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getCountries, getStates } from "../../store/actions/Country";
import { getDoctors } from "../../store/actions/Doctor";
import { savePatient } from "../../store/actions/Patient";
import { enqueueSnackbar as snackAlert } from "../../store/actions/notification";
import validator from 'validator';
import moment from 'moment';
import {

    Button,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    Col,
    Form,
    FormGroup,
    Input,
    Label,
    Row,
} from 'reactstrap';
import DatePicker from "reactstrap-date-picker";
import './styles.css';
/*========================= AddRubrics ==================================*/



class AddPatientComponent extends Component {
    state = {
        cellPhone: "",
        firstName: "",
        lastName: "",
        gender: null,
        age: "",
        dateOfBirth: "",
        email: "",
        clinicName: "",
        physician: 0,
        // patentId: "",
        referredBy: "",
        address1: "",
        address2: "",
        stateId: 0,
        countryId: 0,
        pin: "",
        monthAge: "",
        formattedDate: "",
        isLoading: false,
        errors: {}
    }

    async componentDidMount() {
        this.setState({ isLoading: true });
        await this.props.getCountries();
        await this.props.getStates();
        await this.props.getDoctors();

        this.setState({ isLoading: false });
    }

    /**
     * Render functions
     */

    /**
     * 
     * Render countries
     */
    renderCountries() {
        const { countries } = this.props.state.country;
        if (!countries.length) {
            return null;

        }
        return countries.map((country, index) => {
            return (
                <option key={index} value={country.countryId}>{country.countryName}</option>
            )
        });
    }

    /**
     * renderStates
     */
    renderStates() {
        const { states } = this.props.state.country;
        if (!states.length) {
            return null;

        }

        return states.filter(state => state.countryId == this.state.countryId).map((state, index) => {
            return (
                <option key={index} value={state.stateId}>{state.stateName}</option>
            )
        });
    }

    /**
     * render Doctors
     */

    renderDoctors() {
        const { doctors } = this.props.state.doctor;
        if (!doctors.length) {
            return null;

        }

        return doctors.map((doctor, index) => {
            return (
                <option key={index} value={doctor.doctorId}>{`${doctor.firstName}  ${doctor.lastName}`}</option>
            )
        });
    }


    /**
     * Handle change of each control.
     * @param {*} e 
     */
    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value });


    }

    changehandle(e) {
        if (e.target.value === 'Male') {
            this.setState({ gender: 0 });
        }
        else {
            this.setState({ gender: 1 });
        }
        // this.setState({ [e.target.name]: e.target.value });
        console.log('result=====>>>>>>>', e.target.name);
        console.log('response====>>>', e.target.value)
    }


    handleNumericFeilds = e => {
        // if (validator.isNumeric(e.target.value)) {
        this.setState({ [e.target.name]: e.target.value });
        // }
    }
    /**
     * handleCountryChanges
     */
    handleCountryChanges(e) {
        this.setState({
            countryId: e.target.value
        })
    }

    /**
     * Handle Date change
     */
    handleDateChange = (value, formattedDate) => {
        debugger
        console.log('value============',value)
        this.setState({ dateOfBirth: value, formattedDate: formattedDate });
        let age = moment().diff(value, "years", true).toString();
        let ageMonths = age.split('.');
        let ageInMonths = 0;
        if (ageMonths.length > 1) {
            ageInMonths = Math.round((parseInt(ageMonths[1].substr(0, 1)) * 0.1) * 12);

        }
        this.setState({
            age: ageMonths[0],
            monthAge: ageInMonths
        })
        debugger;
    }

    /**
     * validateForm
     */
    validateForm() {
        let fields = this.state;

        let errors = {};
        let isFormValid = true;

        if (fields.firstName == "") {
            isFormValid = false;
            errors["name"] = "Please enter the first name"
        }

        if (fields.lastName == "") {
            isFormValid = false;
            errors["lastName"] = "Please enter the last name"
        }

        // if (fields.cellPhone == "") {
        //     errors["cellPhone"] = "Please enter the mobile number"
        // }
        if (fields.address1 == "") {
            errors["address1"] = "Please enter address "
        }
        // if (fields.pin == "") {
        //     errors["pin"] = "Please enter the pin "
        // }
        // if (fields.countryId == "") {
        //     errors["countryId"] = "Please select country "
        // }
        // if (fields.stateId == "") {
        //     errors["stateId"] = "Please select state "
        // }
        // if (fields.email == "") {
        //     errors["email"] = "Please enter email "
        // }
        if (fields.dateOfBirth == "") {
            errors["dateOfBirth"] = "Please enter date of birth "
        }
        debugger
        if (fields.gender == null) {
            errors["gender"] = "Please select gender"
        }
        // if (fields.age == "") {
        //     errors["age"] = "Please enter age"
        // }



        // if (fields.physician == 0 || fields.physician == undefined || fields.physicia == "") {
        //     isFormValid = false;
        //     errors["physician"] = "Please select physician";
        // }
        // if (fields.patentId == 0 || fields.patentId == undefined || fields.patentId == "") {
        //     isFormValid = false;
        //     errors["patentId"] = "Please enter patient id";

        // }
        // if (!validator.isEmail(fields.email)) {
        //     isFormValid = false;
        //     errors["email"] = "Please enter valid email";
        // }
        this.setState({ errors });
        return isFormValid;
    }


    /**
     * Save Remedies for section
     */
    HandleSave = async () => {
        if (this.validateForm()) {

            var patient = {
                PatientID: 0,
                PatientName: `${this.state.firstName} ${this.state.lastName}`,
                Address: this.state.address1,
                StateId: this.state.stateId,
                CountryId: this.state.countryId,
                MobileNo: this.state.cellPhone,
                DateOfBirth: this.state.dateOfBirth,
                Gender: this.state.gender,
                EnteredBy: localStorage.getItem("UserName"),
                UserId: localStorage.getItem("UserId"),
                DoctorId: this.state.physician,
                RefBy: this.state.referredBy,
                LoggedInUser: localStorage.getItem("UserId")
            };
            console.log('response====>>>', patient)
            debugger
            const response = await this.props.savePatient(patient);

            if (response.status == 200) {
                this.props.snackAlert();
                this.handleReset();
                // this.props.history.push(`/PatientDashboard/${response.data.patientID}`);
                //this.props.history.push(`/DoctorDashboard/`);
            }
            else {
                this.handleReset("Something went wrong", "error");

            }
            this.props.history.push("/PatientList");

        }

    }

    handleReset = () => {
        this.setState({
            cellPhone: "",
            firstName: "",
            lastName: "",
            gender: 0,
            age: 0,
            dateOfBirth: "",
            email: "",
            clinicName: "",
            physician: 0,
            // patentId: "",
            referredBy: "",
            address1: "",
            address2: "",
            stateId: 0,
            countryId: 0,
            pin: "",
            monthAge: 0,
            isLoading: false,
            errors: {}
        })
    }

    /**
     * Render UI
     */
    render() {
        return (

            <Card>
                <CardHeader>
                    <i className="fa fa-align-justify"></i>
                    Add New Patient
                </CardHeader>
                <CardBody>
                    <Form action="" method="post" encType="multipart/form-data" className="form-horizontal">
                        <Row>
                            <Col xs="12" md="3">
                                <FormGroup >
                                    <Label className="label" htmlFor="FirstName">
                                        First Name
                                        <span className="required"> *</span> : </Label>
                                    <Input type="text"
                                        id="FirstName"
                                        value={this.state.firstName}
                                        onChange={this.handleChange.bind(this)}
                                        name="firstName"
                                    >
                                    </Input>
                                    <span className="error">{this.state.errors["name"]}</span>
                                </FormGroup>
                            </Col>
                            <Col xs="12" md="3">
                                <FormGroup >


                                    <Label className="label" htmlFor="LastName">
                                        Last Name
                                        <span className="required"> *</span> :</Label>
                                    <Input type="text"
                                        id="LastName"
                                        value={this.state.lastName}
                                        onChange={this.handleChange.bind(this)}
                                        name="lastName"
                                    >
                                    </Input>
                                    <span className="error">{this.state.errors["lastName"]}</span>
                                </FormGroup>
                            </Col>

                            <Col xs="12" md="6">
                                <FormGroup >
                                    <Label className="label" htmlFor="Address1">Address  <span className="required"> *</span> :</Label>
                                    <Input type="text"
                                        id="Address1"
                                        value={this.state.address1}
                                        onChange={this.handleChange.bind(this)}
                                        name="address1"
                                    >
                                    </Input>
                                    <span className="error">{this.state.errors["address1"]}</span>


                                </FormGroup>
                            </Col>
                        </Row>
                        <Row>

                            <Col xs="12" md="3">
                                <FormGroup >
                                    <Label className="label" htmlFor="Pin">PIN  <span className="required"> *</span> :</Label>
                                    <Input type="text"
                                        id="Pin"
                                        value={this.state.pin}
                                        onChange={this.handleChange.bind(this)}
                                        name="pin"
                                    >
                                    </Input>
                                    <span className="error">{this.state.errors["pin"]}</span>

                                </FormGroup>
                            </Col>
                            <Col xs="12" md="3">
                                <FormGroup >
                                    <Label className="label" htmlFor="CellNo">Mobile No

                                        <span className="required"> *</span> :</Label>
                                    <Input type="number"
                                        autoComplete="off"
                                        id="CellNo"
                                        value={this.state.cellPhone}
                                        onChange={this.handleNumericFeilds.bind(this)}
                                        name="cellPhone"
                                    >
                                    </Input>
                                    <span className="error">{this.state.errors["cellPhone"]}</span>
                                </FormGroup>
                            </Col>
           

                            <Col xs="12" md="3">
                                <FormGroup >
                                    <Label className="label" htmlFor="Email">Email 
                                    <span className="required"> *</span> :
                                    </Label>
                                    <Input type="text"
                                        id="Email"
                                        value={this.state.email}
                                        onChange={this.handleChange.bind(this)}
                                        name="email"
                                    >
                                    </Input>
                                    <span className="error">{this.state.errors["email"]}</span>
                                </FormGroup>
                            </Col>

                            <Col xs="12" md="2" >
                                <FormGroup>
                                    <Label className="label" htmlFor="Gender">
                                        Gender
                                        <span className="required"> *</span> :
                                    </Label>
                                    <FormGroup check  >
                                        <Label check style={{ fontSize: 14, marginTop: 7 }}>
                                            <Input type="radio"
                                                name="gender"
                                                value={"Male"}
                                                checked={this.state.gender == 0 ? true : false}
                                                onChange={this.changehandle.bind(this)}
                                            />
                                            Male
                                        </Label>
                                        &nbsp;&nbsp;&nbsp;&nbsp;
                                        <Label check style={{ fontSize: 14, marginLeft: 22, marginTop: 7 }}>
                                            <Input type="radio" name="gender"
                                                value={"Female"}
                                                checked={this.state.gender == 1 ? true : false}
                                                onChange={this.changehandle.bind(this)} />
                                            Female
                                        </Label>
                                    </FormGroup>

                                </FormGroup>
                                <span className="error">{this.state.errors["gender"]}</span>

                            </Col>

                            {/* <Col xs="12" md="3">
                                    <FormGroup >
                                        <Label className="label" htmlFor="clinicName">Clinic Name :</Label>
                                        <Input type="text"
                                            id="clinicName"
                                            value={this.state.clinicName}
                                            onChange={this.handleChange.bind(this)}
                                            name="clinicName"
                                        >
                                        </Input>
                                    </FormGroup>
                                </Col> */}
                            {/* <Col xs="12" md="3">
                                    <FormGroup >
                                        <Label className="label" htmlFor="Address2">Address2 :</Label>
                                        <Input type="text"
                                            id="Address2"
                                            value={this.state.address2}
                                            onChange={this.handleChange.bind(this)}
                                            name="address2"
                                        >
                                        </Input>
                                    </FormGroup>
                                </Col> */}
                        </Row>
                        <Row>
                            <Col xs="12" md="3">
                                <FormGroup >
                                    <Label className="label" htmlFor="Country">STD Code  <span className="required"> *</span> :</Label>
                                    <Input type="select" >
                                        <option value="0">
                                           Value 1
                                        </option>
                                        <option value="0">
                                           Value 2
                                        </option>
                                    </Input>
                                </FormGroup>
                            </Col>
                            <Col xs="12" md="3">
                                <FormGroup >
                                    <Label className="label" htmlFor="Country">Country  <span className="required"> *</span> :</Label>
                                    <Input type="select"
                                        id="Country"
                                        value={this.state.countryId}
                                        name="countryId"
                                        onChange={this.handleCountryChanges.bind(this)}
                                    >
                                        <option value="0">
                                            Select Country
                                        </option>
                                        {
                                            this.renderCountries()
                                        }
                                    </Input>
                                    <span className="error">{this.state.errors["countryId"]}</span>
                                </FormGroup>
                            </Col>
                            <Col xs="12" md="3">
                                <FormGroup >
                                    <Label className="label" htmlFor="State">State  <span className="required"> *</span> :</Label>
                                    <Input type="select"
                                        id="State"
                                        value={this.state.stateId}
                                        name="stateId"
                                        onChange={this.handleChange.bind(this)}
                                    >
                                        <option value="0">
                                            Select State
                                        </option>
                                        {
                                            this.state.countryId != 0 ?
                                                this.renderStates()
                                                : null
                                        }
                                    </Input>
                                    <span className="error">{this.state.errors["stateId"]}</span>

                                </FormGroup>
                            </Col>
                          
                            {/* <Col xs="12" md="3">
                                    <FormGroup >
                                        <Label className="label" htmlFor="Physician">Physician
                                        <span className="required">*</span> :</Label>
                                        <Input type="select"
                                            id="Physician"
                                            value={this.state.physician}
                                            onChange={this.handleChange.bind(this)}
                                            name="physician"
                                        >
                                            <option value="0">Select Doctor</option>
                                            {
                                                this.renderDoctors()
                                            }
                                        </Input>
                                        <span className="error">{this.state.errors["physician"]}</span>
                                    </FormGroup>
                                </Col> */}
                        

                            <Col xs="12" md="3">
                                <FormGroup >
                                    <Label className="label" htmlFor="DateOfBirth">
                                        Date Of Birth  <span className="required"> *</span> :</Label>
                                    <DatePicker autoComplete="off"
                                        readOnly={true}
                                        dateFormat="DD-MM-YYYY"
                                        minDate="2000-01-19T12:00:00.000Z"
                                        maxDate="3000-05-19T12:00:00.000Z"
                                        value={this.state.dateOfBirth}
                                        onChange={this.handleDateChange.bind(this)}
                                        name="dateOfBirth"
                                    />
                                    <span className="error">{this.state.errors["dateOfBirth"]}</span>

                                </FormGroup>
                            </Col>

                        </Row>
                        <Row>

                            <Col xs="12" md="3" >
                                <FormGroup >
                                    <Label className="label" htmlFor="AgeYear">Age  <span className="required"> *</span> :</Label>
                                    <Input type="text"
                                        id="AgeYear"
                                        value={this.state.age}
                                        onChange={this.handleNumericFeilds.bind(this)}
                                        name="age"
                                    >
                                    </Input>
                                    <span className="error">{this.state.errors["age"]}</span>

                                </FormGroup>

                            </Col>
                            <Col xs="12" md="3" >
                                <FormGroup >
                                    <Label className="label" htmlFor="Age">Month :</Label>
                                    <Input type="text"
                                        id="AgeYear"
                                        value={this.state.monthAge}
                                        onChange={this.handleNumericFeilds.bind(this)}
                                        name="monthAge"
                                    >
                                    </Input>
                                </FormGroup>

                            </Col>




                            <Col xs="12" md="3">
                                <FormGroup >
                                    <Label className="label" htmlFor="referredBy">Referred By :</Label>
                                    <Input type="text"
                                        id="referredBy"
                                        value={this.state.referredBy}
                                        onChange={this.handleChange.bind(this)}
                                        name="referredBy"
                                    >
                                    </Input>
                                </FormGroup>
                            </Col>

                            {/* <Col xs="12" md="3">
                                    <FormGroup >
                                        <Label className="label" htmlFor="PatientId">Patient ID
                                        <span className="required">*</span> :</Label>
                                        <Input type="text"
                                            id="PatientId"
                                            value={this.state.patentId}
                                            onChange={this.handleChange.bind(this)}
                                            name="patentId"
                                        >
                                        </Input>
                                        <span className="error">{this.state.errors["patentId"]}</span>
                                    </FormGroup>
                                </Col>                             */}
                        </Row>


                    </Form>
                </CardBody>
                <CardFooter>
                    <Row>

                        <Col xs="12" md="6">
                            <Button
                                type="button"
                                style={{ textTransform: "uppercase" }}
                                onClick={this.HandleSave.bind(this)}
                                size="sm" color="primary">
                                <i className="fa fa-save"></i> Submit
                            </Button> &nbsp;
                            <Button
                                style={{ textTransform: "uppercase" }}
                                type="reset"
                                size="sm"
                                color="danger"
                                onClick={this.handleReset.bind(this)}
                            >
                                <i className="fa fa-ban"></i> Reset
                            </Button>&nbsp;&nbsp;

                            <Button
                                type="Cancel"
                                style={{ textTransform: "uppercase" }}
                                onClick={() => this.props.history.push('/PatientList')}
                                size="sm" color="danger">
                                <i className="fa fa-ban"></i> Cancel
                            </Button>
                        </Col>
                        <Col xs="12" md="6" style={{ textAlign: "right" }}>
                            <Label style={{ fontSize: 15, margin: 0, paddingTop: 5 }}> Fields marked with an asterisk <span className="required">*</span> are mandatory</Label>
                        </Col>
                    </Row>

                </CardFooter>
            </Card>

        )
    }

}
const mapStateToProps = (state) => ({
    state: state
});
const mapDispatchToProps = {
    getCountries,
    getStates,
    getDoctors,
    savePatient,
    snackAlert
}

export default connect(mapStateToProps, mapDispatchToProps)(AddPatientComponent);