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

            UserNameError: '',
            PasswordError: '',
            CountryError: ''
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    renderCountryList = () => {
        if (this.state.countryList == undefined) {
            return null;
        }
        return this.state.countryList.map((country, index) => {
            return <option key={index} value={country.countryId}>{country.countryName}</option>
        })
    }

    /**
     * html rendor method for adding new user.
     */
    render() {
        return (
            <div className="Signup">
                <Col className="mres1">
                    <Form onSubmit={this.handleClick} className="mres wid80">
                    <center> <img src="/static/media/logo.fe659025.png" width="240" height="60" alt="Homeo Centrum Logo" /></center>
                   <br></br>
                        <h4 className="text-center pb-3 clrcode">ACCOUNT CREDENTIALS</h4>
                        <Form.Group as={Row} controlId="fromUserName">
                            <Form.Label column sm="3">
                                Username
                            </Form.Label>
                            <Form.Label column sm="1" className="colm">
                                :
                            </Form.Label>
                            <Col sm="8">
                                <Form.Control type="text" placeholder="User Name"
                                    name="UserName"
                                    onChange={this.handleChange}
                                    value={this.state.UserName === null ? '' : this.state.UserName} />
                            </Col>

                        </Form.Group>

                        <Form.Group as={Row} controlId="formPassword">
                            <Form.Label column sm="3">
                                Password
                            </Form.Label>
                            <Form.Label column sm="1" className="colm">
                                :
                            </Form.Label>
                            <Col sm="8">
                                <Form.Control type="password" placeholder="Password"
                                    name="UserPassword"
                                    onChange={this.handleChange}
                                    value={this.state.UserPassword === null ? '' : this.state.UserPassword}
                                />

                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} controlId="formReEnterPassword"  >
                            <Form.Label column sm="3">
                                Confirm Password
                            </Form.Label>
                            <Form.Label column sm="1" className="colm">
                                :
                            </Form.Label>
                            <Col sm="8">
                                <Form.Control type="password" placeholder="Confirm Password"
                                    name="ReenterPassword"
                                    onChange={this.handleChange}
                                    value={this.state.ReenterPassword === null ? '' : this.state.ReenterPassword} />
                            </Col>
                        </Form.Group>

                        <hr />

                        <h4 className="text-center pb-3 clrcode">Basic information </h4>
                        <Form.Group as={Row} controlId="formTitle">
                            <Form.Label column sm="3">
                                Title
                            </Form.Label>
                            <Form.Label column sm="1" className="colm">
                                :
                            </Form.Label>
                            <Col sm="8">
                                <Form.Control as="select"
                                    name="Title"
                                    onChange={this.handleChange}
                                    value={this.state.Title === null ? '' : this.state.Title} >
                                    <option>Choose...</option>
                                    <option value="1">Mr.</option>
                                    <option value="2">Mrs.</option>
                                    <option value="2">Dr.</option>
                                </Form.Control>
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} controlId="formFirstName">
                            <Form.Label column sm="3">
                                First Name
                            </Form.Label>
                            <Form.Label column sm="1" className="colm">
                                :
                            </Form.Label>
                            <Col sm="8">
                                <Form.Control type="text" placeholder="First Name"
                                    name="FirstName"
                                    onChange={this.handleChange}
                                    value={this.state.FirstName === null ? '' : this.state.FirstName} />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} controlId="formLastName">
                            <Form.Label column sm="3">
                                Last Name
                            </Form.Label>
                            <Form.Label column sm="1" className="colm">
                                :
                            </Form.Label>
                            <Col sm="8">
                                <Form.Control type="text" placeholder="Last Name"
                                    name="LastName"
                                    onChange={this.handleChange}
                                    value={this.state.LastName === null ? '' : this.state.LastName} />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} controlId="formCompany">
                            <Form.Label column sm="3">
                                Company
                            </Form.Label>
                            <Form.Label column sm="1" className="colm">
                                :
                            </Form.Label>
                            <Col sm="8">
                                <Form.Control type="text" placeholder="Company"
                                    name="CompanyName"
                                    onChange={this.handleChange}
                                    value={this.state.CompanyName === null ? '' : this.state.CompanyName} />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} controlId="formCountry">
                            <Form.Label column sm="3">
                                Country
                            </Form.Label>
                            <Form.Label column sm="1" className="colm">
                                :
                            </Form.Label>
                            <Col sm="8">
                                <Form.Control as="select"
                                    name="CountryId"
                                    onChange={this.handleChange}
                                    value={this.state.CountryId === null ? '' : this.state.CountryId}>
                                    <option value="0">Select</option>
                                    {
                                        this.renderCountryList()
                                    }
                                </Form.Control>
                            </Col>
                        </Form.Group>

                        <hr />

                        <h4 className="text-center pb-3 clrcode">Contact information </h4>
                        <Form.Group as={Row} controlId="formMobile">
                            <Form.Label column sm="3">
                                Mobile No.
                            </Form.Label>
                            <Form.Label column sm="1" className="colm">
                                :
                            </Form.Label>
                            <Col sm="8">
                                <Form.Control type="text" placeholder="Mobile No."
                                    name="MobileNo"
                                    onChange={this.handleChange}
                                    value={this.state.MobileNo === null ? '' : this.state.MobileNo} />
                            </Col>
                        </Form.Group>


                        <Form.Group as={Row} controlId="formEmail">
                            <Form.Label column sm="3">
                                Email
                            </Form.Label>
                            <Form.Label column sm="1" className="colm">
                                :
                            </Form.Label>
                            <Col sm="8">
                                <Form.Control type="text" placeholder="Email"
                                    name="EmailId"
                                    onChange={this.handleChange}
                                    value={this.state.EmailId === null ? '' : this.state.EmailId} />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} controlId="formReenterEmail">
                            <Form.Label column sm="3">
                                Confirm Email
                            </Form.Label>
                            <Form.Label column sm="1" className="colm">
                                :
                            </Form.Label>
                            <Col sm="8">
                                <Form.Control type="text" placeholder="Re-Enter Email"
                                    name="ReEnterEmail"
                                    onChange={this.handleChange}
                                    value={this.state.ReEnterEmail === null ? '' : this.state.ReEnterEmail} />
                            </Col>
                        </Form.Group>

                        <hr />

                        <Col>
                            <div>
                                <Col sm="12" className="text-center ">
                                    <Button color="primary" style={{ backgroundColor: "#20a8d8", textTransform: "uppercase", margin: 10 }} className="paddg" type="submit">&nbsp; <i className="fa fa-user"></i>  &nbsp; Create an account &nbsp;</Button>
                                    &nbsp;&nbsp;&nbsp;&nbsp;
                                    <Button className='btn_Cancel'  onClick={() => this.props.history.push('/Login')}>&nbsp; <i className="fa fa-close"></i>  &nbsp; Cancel &nbsp;</Button>
                                    <br/>
                                </Col>
                            </div>
                        </Col>
                        <br/>
                        <br/>
                    </Form>
                    <br/>
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
            console.log('country===',response);
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
        this.setState({ [event.target.name]: event.target.value });
    }

    /**
     * Created Date     :       19 Dec 2019.
     * Purpose          :       To handle click of button.
     * Author           :       Chandrashekhar Salagar.            
     */
    handleClick(event) {
        debugger
        event.preventDefault();
        if (this.state.UserName == "") {
            alert("Please enter user name");
        }
        else if (this.state.UserPassword == "") {
            alert("Please enter password");
        }
        else if (this.state.UserPassword != this.state.ReenterPassword) {
            alert("Password not matched with confirmed password");
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