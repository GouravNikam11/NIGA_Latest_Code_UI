import React, { Component } from 'react';
import { Row, Col, Button, FormGroup, Form } from 'react-bootstrap';
import { } from './UserComponent.css'
import UserService from '../../Services/UserServices';
import CommonServices from '../../Services/CommonServices';
import { connect } from 'react-redux';
import {
    enqueueSnackbar as enqueueSnackbarAction,
    closeSnackbar
} from '../../store/actions/notification';
import bgs from '../../assets/img/regss.png'
import { FaEye, FaEyeSlash } from 'react-icons/fa';
/**
 * Created Date     :   19 Dec 2019.
 * Purpose          :   Component is used to add new user.
 * Author           :   Chandrashekhar Salagar.
 */
class AddUserComponent extends Component {
    /**
     * Constructor to initialize class members
     * @param {} props 
     */
    constructor(props) {
        super(props);
        this.state = {
            countryList: [],
            UserName: '',
            UserPassword: '',
            EmailId: '',
            EnteredBy: 'Admin',
            Title: '',
            FirstName: '',
            LastName: '',
            CompanyName: '',
            CountryId: 0,
            ReenterPassword: '',
            ReEnterEmail: '',
            MobileNo: '',
            EmailId: '',
            RoleId: 16,
            showPassword: false,
            showConfirmPassword: false,
            UserNameError: '',
            PasswordError: '',
            CountryError: ''
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.toggleShowPassword = this.toggleShowPassword.bind(this);
        this.toggleShowConfirmPassword = this.toggleShowConfirmPassword.bind(this);

    }

    renderCountryList = () => {
        if (this.state.countryList == undefined) {
            return null;
        }
        return this.state.countryList.map((country, index) => {
            return <option key={index} value={country.countryId}>{country.countryName}</option>
        })
    }

    toggleShowPassword() {
        this.setState({ showPassword: !this.state.showPassword });
    }

    toggleShowConfirmPassword() {
        this.setState({ showConfirmPassword: !this.state.showConfirmPassword });
    }
    /**
     * html rendor method for adding new user.
     */
    render() {
        return (
            <div className="Signup" style={{ backgroundImage: 'url(' + bgs + ')', backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundSize: '100% 100%', height: '100vh' }}>
                <Col className="mres11">
                    <Form onSubmit={this.handleClick} className="mres wid801" style={{ height: '100vh', overflowY: 'scroll' }}>
                        <center> <img src="/static/media/logo.fe659025.png" width="175" height="50" alt="Homeo Centrum Logo" /></center>
                        <br></br>
                        <h4 className="text-center pb-1 pt-1 clrcode">Account Credentials</h4>

                        <Row>

                            <Col sm="4">
                                <Form.Group as={Row} controlId="fromUserName" >
                                    <Form.Label column sm="12" className='col-form-lbl lbls'>
                                        User Name<br />
                                    </Form.Label>

                                    <Col sm="12">
                                        <Form.Control type="text" placeholder="Enter Username" className='form-cnt brdrds brds'
                                            name="UserName"
                                            maxLength={15}
                                            onChange={this.handleChange}
                                            value={this.state.UserName === null ? '' : this.state.UserName} />
                                    </Col>

                                </Form.Group>
                            </Col>
                            <Col sm="4">
                                <Form.Group as={Row} controlId="formPassword" >
                                    <Form.Label column sm="12" className='col-form-lbl lbls'>
                                        Password<br />
                                    </Form.Label>
                                    <Col sm="12" className="password-input">
                                        <Form.Control type={this.state.showPassword ? 'text' : 'password'} placeholder="Enter Password" className='form-cnt brdrds brds'
                                            name="UserPassword"
                                            maxLength={15}
                                            onChange={this.handleChange}
                                            value={this.state.UserPassword === null ? '' : this.state.UserPassword}
                                        />
                                        <span
                                            onClick={this.toggleShowPassword}
                                            style={{ cursor: 'pointer', position: 'absolute', right: 20, top: 3 }}
                                        >
                                            {this.state.showPassword ? <FaEyeSlash color='#20a8d8' size={18} /> : <FaEye color='#20a8d8' size={18} />}
                                        </span>
                                    </Col>
                                </Form.Group>
                            </Col>
                            <Col sm="4">
                                <Form.Group as={Row} controlId="formReEnterPassword"  >
                                    <Form.Label column sm="12" className='col-form-lbl lbls'>
                                        Confirm Password<br />
                                    </Form.Label>
                                    <Col sm="12" className="password-input">
                                        <Form.Control type={this.state.showConfirmPassword ? 'text' : 'password'} placeholder="Enter Password Again" className='form-cnt brdrds brds'
                                            name="ReenterPassword"
                                            maxLength={15}
                                            onChange={this.handleChange}
                                            value={this.state.ReenterPassword === null ? '' : this.state.ReenterPassword} />
                                        <span
                                            onClick={this.toggleShowConfirmPassword}
                                            style={{ cursor: 'pointer', position: 'absolute', right: 20, top: 3 }}
                                        >
                                            {this.state.showConfirmPassword ? <FaEyeSlash color='#20a8d8' size={18} /> : <FaEye color='#20a8d8' size={18} />}
                                        </span>
                                    </Col>
                                </Form.Group>
                            </Col>
                        </Row>




                        <h4 className="text-center pb-1 pt-1 clrcode">Basic information </h4>

                        <Row>

                            <Col sm="2">
                                <Form.Group as={Row} controlId="formTitle" className='frmgrp'>
                                    <Form.Label column sm="12" className='col-form-lbl lbls'>
                                        Title<br />
                                    </Form.Label>
                                    <Col sm="12">
                                        <Form.Control as="select" className='form-cnt brdrds brds'
                                            name="Title"
                                            onChange={this.handleChange}
                                            value={this.state.Title === null ? '' : this.state.Title} >
                                            <option>--</option>
                                            <option value="1">Mr.</option>
                                            <option value="2">Mrs.</option>
                                            <option value="3">Dr.</option>
                                            <option value="4">Miss.</option>
                                        </Form.Control>
                                    </Col>
                                </Form.Group>
                            </Col>

                            <Col sm="5">
                                <Form.Group as={Row} controlId="formFirstName" className='frmgrp' >
                                    <Form.Label column sm="12" className='col-form-lbl lbls'>
                                        First Name<br />
                                    </Form.Label>
                                    <Col sm="12">
                                        <Form.Control type="text" placeholder="Enter First Name" className='form-cnt brdrds brds'
                                            name="FirstName"
                                            onChange={this.handleChange}
                                            value={this.state.FirstName === null ? '' : this.state.FirstName} />
                                    </Col>
                                </Form.Group>
                            </Col>

                            <Col sm="5">
                                <Form.Group as={Row} controlId="formLastName" className='frmgrp'>
                                    <Form.Label column sm="12" className='col-form-lbl lbls'>
                                        Last Name<br />
                                    </Form.Label>
                                    <Col sm="12">
                                        <Form.Control type="text" placeholder="Enter Last Name" className='form-cnt brdrds brds'
                                            name="LastName"
                                            onChange={this.handleChange}
                                            value={this.state.LastName === null ? '' : this.state.LastName} />
                                    </Col>
                                </Form.Group>
                            </Col>

                        </Row>

                        <Row>

                            <Col sm="6">
                                <Form.Group as={Row} controlId="formCompany" >
                                    <Form.Label column sm="12" className='col-form-lbl lbls'>
                                        Company<br />
                                    </Form.Label>
                                    <Col sm="12">
                                        <Form.Control type="text" placeholder="Enter Company" className='form-cnt brdrds brds'
                                            name="CompanyName"
                                            onChange={this.handleChange}
                                            value={this.state.CompanyName === null ? '' : this.state.CompanyName} />
                                    </Col>
                                </Form.Group>
                            </Col>

                            <Col sm="6">
                                <Form.Group as={Row} controlId="formCountry" >
                                    <Form.Label column sm="12" className='col-form-lbl lbls'>
                                        Country<br />
                                    </Form.Label>
                                    <Col sm="12">
                                        <Form.Control as="select" className='form-cnt brdrds brds'
                                            name="CountryId"
                                            onChange={this.handleChange}
                                            value={this.state.CountryId === null ? '' : this.state.CountryId}>
                                            <option value="0">--</option>
                                            {
                                                this.renderCountryList()
                                            }
                                        </Form.Control>
                                    </Col>
                                </Form.Group>
                            </Col>

                        </Row>







                        <h4 className="text-center pb-1 pt-1 clrcode">Contact information </h4>

                        <Row>

                            <Col sm="12">
                                <Form.Group as={Row} controlId="formMobile" className='frmgrp'>
                                    <Form.Label column sm="12" className='col-form-lbl lbls'>
                                        Mobile No.<br />
                                    </Form.Label>
                                    <Col sm="12">
                                        <Form.Control type="text" placeholder="Enter Mobile No." className='form-cnt brdrds brds'
                                            name="MobileNo"
                                            onChange={this.handleChange}
                                            value={this.state.MobileNo === null ? '' : this.state.MobileNo} />
                                    </Col>
                                </Form.Group>
                            </Col>

                            <Col sm="6">

                                <Form.Group as={Row} controlId="formEmail">
                                    <Form.Label column sm="12" className='col-form-lbl lbls'>
                                        Email<br />
                                    </Form.Label>
                                    <Col sm="12">
                                        <Form.Control type="text" placeholder="Enter Email" className='form-cnt brdrds brds'
                                            name="EmailId"
                                            onChange={this.handleChange}
                                            value={this.state.EmailId === null ? '' : this.state.EmailId} />
                                    </Col>
                                </Form.Group>

                            </Col>

                            <Col sm="6">

                                <Form.Group as={Row} controlId="formReenterEmail">
                                    <Form.Label column sm="12" className='col-form-lbl lbls'>
                                        Confirm Email<br />
                                    </Form.Label>
                                    <Col sm="12">
                                        <Form.Control type="text" placeholder="Enter Email Again" className='form-cnt brdrds brds'
                                            name="ReEnterEmail"
                                            onChange={this.handleChange}
                                            value={this.state.ReEnterEmail === null ? '' : this.state.ReEnterEmail} />
                                    </Col>
                                </Form.Group>

                            </Col>

                        </Row>






                        <hr />

                        <Col>
                            <Row>
                                <Col sm="6" className="text-center ">
                                    <Button color="primary" style={{ borderRadius: '40px', width: '80%', backgroundColor: "#20a8d8", textTransform: "uppercase", margin: 10 }} className="paddg" type="submit">&nbsp; <i className="fa fa-user"></i>  &nbsp; Create an account &nbsp;</Button>
                                </Col>
                                <Col sm="6" className="text-center ">
                                    <Button className='btn_Cancel paddg' style={{ borderRadius: '40px', width: '80%', textTransform: "uppercase", margin: 10 }} onClick={() => this.props.history.push('/Login')}>&nbsp; <i className="fa fa-close"></i>  &nbsp; Cancel &nbsp;</Button>
                                    <br />
                                </Col>
                            </Row>
                        </Col>
                        <br />
                    </Form>
                    <br />
                </Col>

            </div>

        )
    }

    /**
     * will call when page rendered.
     */
    async componentDidMount() {
        debugger
        this.GetCountries();
    }

    async GetCountries() {
        CommonServices.getData(`/country`).then((response) => {
            console.log('country===', response);
            this.setState({

                countryList: response
            })
        })
    }

    /**
     * Created Date     :       19 Dec 2019.
     * Purpose          :       To handle change event of form controls.
     * Author           :       Chandrashekhar Salagar.
     * @param  event 
     */
    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value.replace(/\s+/g, '') });
    }

    /**
     * Created Date     :       19 Dec 2019.
     * Purpose          :       To handle click of button.
     * Author           :       Chandrashekhar Salagar.            
     */
    handleClick(event) {
        debugger
        event.preventDefault();
        let mobileNumberRegex = /^\d{10}$/;
        let emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

        if (this.state.UserName == "") {
            alert("Please enter user name");
        }
        else if (this.state.UserPassword == "") {
            alert("Please enter password");
        }
        else if (this.state.UserPassword != this.state.ReenterPassword) {
            alert("Password not matched with confirmed password");
        }
        else if (this.state.FirstName === "") {
            alert("Please enter first name");
        }
        else if (this.state.LastName === "") {
            alert("Please enter last name");
        }
        else if (this.state.CompanyName === "") {
            alert("Please enter company name");
        }
        else if (this.state.Title === "") {
            alert("Please select title");
        }
        else if (this.state.CountryId === "") {
            alert("Please select country");
        }
        else if (this.state.MobileNo === "") {
            alert("Please enter mobile number");
        }
        else if (!mobileNumberRegex.test(this.state.MobileNo)) {
            alert("Please enter a valid mobile number");
        }
        else if (!emailRegex.test(this.state.EmailId)) {
            alert("Please enter a valid email");
        }
        else if (!emailRegex.test(this.state.ReEnterEmail)) {
            alert("Please enter a valid confirm email");
        }
        else if (this.state.EmailId != "") {
            if (this.state.EmailId != this.state.ReEnterEmail) {
                alert("Email and Re-enterd email are not same");
            }
            else {
                debugger
                this.saveUser(this.state);
            }
        }
        else {
            this.saveUser(this.state);
        }
    }

    /**
     * Method is used to validate all the input fields
     */
    saveUser(userModel) {
        debugger;
        CommonServices.postData(userModel, `/users`).then((response) => {
            console.log(response);
            this.props.enqueueSnackbarAction(response.data);
            this.clearState();
            this.props.history.push("Login");
            // if (response.data.toLowerCase() != "user already exists") {
            //     this.clearState();
            // }
        })
    }
    /**
     * TMethod is used to clear state if record saved.
     */
    clearState() {
        this.setState({
            UserName: '',
            UserPassword: '',
            EmailId: '',
            EnteredBy: 'Admin',
            Title: '',
            FirstName: '',
            LastName: '',
            CompanyName: '',
            CountryId: 0,
            ReenterPassword: '',
            ReEnterEmail: '',
            MobileNo: '',
            EmailId: '',
            UserNameError: '',
            PasswordError: '',
            CountryError: ''
        });
    }
}
export default connect(null, { enqueueSnackbarAction, closeSnackbar })(AddUserComponent)