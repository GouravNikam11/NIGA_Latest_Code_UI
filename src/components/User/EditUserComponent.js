import React, { Component } from 'react';
import { Row, Col, Button, FormGroup, Form } from 'react-bootstrap';
import { } from './UserComponent.css'
import {  Label } from 'reactstrap';
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
class EditUserComponent extends Component {
    /**
     * Constructor to initialize class members
     * @param {} props 
     */
    constructor(props) {
        super(props);
        this.state = {
         
            countryList: [],
            UserPassword: '',
            roleList:[],
            userId:0,
            userName:'' ,
            ReenterPassword:'',
            Title: '' ,
            firstName:'',
            lastName:'',
            roleId:'',
            mobileNo:'',
            emailId:'',
            DeleteStatus: false
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    
    handleSectionChanges(e) {
      
        this.setState({
            roleId: e.target.value
        })
    }
    renderroleList = () => {
       
        if (this.state.roleList == undefined) {
            return null;
        }
        return this.state.roleList.map((role, index) => {
            return <option key={index} value={role.roleId}>{role.roleName}</option>
        })
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
            <div >
              
                    <Form 
                     style={{marginLeft:'10px'}}
                     onSubmit={this.handleClick} >
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
                                    style={{width:'50%'}}
                                    onChange={this.handleChange}
                                    value={this.state.userName === null ? '' : this.state.userName} />
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
                                disabled={true}
                                style={{width:'50%'}}
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
                                    style={{width:'50%'}}
                                    disabled={true}
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
                                 style={{width:'50%'}}
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
                                    style={{width:'50%'}}
                                    onChange={this.handleChange}
                                    value={this.state.firstName === null ? '' : this.state.firstName} />
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
                                 style={{width:'50%'}}
                                    name="LastName"
                                    onChange={this.handleChange}
                                    value={this.state.lastName === null ? '' : this.state.lastName} />
                            </Col>
                        </Form.Group>
                        {/* <Form.Group as={Row} controlId="formCompany">
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
                        </Form.Group> */}
                        {/* <Form.Group as={Row} controlId="formCountry">
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
                        </Form.Group> */}


                           {/* <Col xs="12" md="4"> */}

                          
                           <Form.Group as={Row} controlId="formTitle">
                            <Form.Label column sm="3">
                                Role
                            </Form.Label>
                            <Form.Label column sm="1" className="colm">
                                :
                            </Form.Label>
                            <Col sm="8">
                            <Form.Control as="select"
                                        name="roleId"    
                                        style={{width:'50%'}}                
                                        onChange={this.handleSectionChanges.bind(this)}
                                        value={this.state.roleId}>
                                        <option value="0">
                                            Select Users Role
                                        </option>
                                        {
                                            this.renderroleList()
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
                                    value={this.state.mobileNo === null ? '' : this.state.mobileNo} />
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
                                    value={this.state.emailId === null ? '' : this.state.emailId} />
                            </Col>
                        </Form.Group>
                        {/* <Form.Group as={Row} controlId="formReenterEmail">
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
                        </Form.Group> */}

                        <hr />

                        <Col>
                            <div>
                                <Col sm="12" className="text-center ">
                                    <Button color="primary" style={{ backgroundColor: "#20a8d8", textTransform: "uppercase", margin: 10 }} className="paddg" type="submit">&nbsp; <i className="fa fa-user"></i>  &nbsp; Create an account &nbsp;</Button>
                                    &nbsp;&nbsp;&nbsp;&nbsp;
                                    <Button className='btn_Cancel'  onClick={() => this.props.history.push('/ListUserComponent')}>&nbsp; <i className="fa fa-close"></i>  &nbsp; Cancel &nbsp;</Button>
                                    <br/>
                                </Col>
                            </div>
                        </Col>
                        <br/>
                        <br/>
                    </Form>
                    <br/>
                
                
            </div>
            
        )
    }

   
    componentDidMount() {
        var userId = this.props.match.params.id;
        this.editUserComponent(userId);
        this.getrole();
         this.GetCountries();
    }

    async GetCountries() {
        CommonServices.getData(`/country`).then((response) => {
            console.log(response);
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

   

    submitForm = () => {
        CommonServices.postData(this.state, `/users`).then((responseMessage) => {
            this.props.enqueueSnackbarAction("Record updated successfully");
            this.props.history.push('/ListUserComponent');
            
        });
        this.setState({
             userId: 0,
                    UserName: "",
                    UserPassword:"",
                    ReenterPassword: "",
                    Title:  "",
                    FirstName:"",
                    LastName:"",
                    roleId:"",
                    MobileNo:"",
                    EmailId:"",
                    DeleteStatus: false
            
            
        });
    }

    getrole() {
        CommonServices.getData(`/roleMaster/GetRoleMaster`).then((temp) => {
            debugger;
            console.log('temp=====>>>>',temp)
            this.setState({
                roleList: temp
            })
        })
    }

    /**
     * Created Date     :       19 Dec 2019.
     * Purpose          :       To handle click of button.
     * Author           :       Chandrashekhar Salagar.            
     */
    handleClick(event) {
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
        // else if (this.state.EmailId != "") {
        //     if (this.state.EmailId != this.state.ReEnterEmail) {
        //         alert("Email and Re-enterd email are not same");
        //     }
        //     else {
        //         this.saveUser(this.state);
        //     }
        // }
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
            // if (response.data.toLowerCase() != "user already exists") {
            //     this.clearState();
            // }
        })
    }
    editUserComponent(userId) {
        debugger;
        if (userId != undefined) {
            CommonServices.getDataById(userId, `/users`).then((res) => {
                debugger;
                console.log('res...p;;' ,res)
                this.setState({
                    userId:res.userId,
                    userName: res.userName,
                    ReenterPassword: res.ReenterPassword,
                    Title:  res.Title,
                    firstName:res.firstName,
                    lastName:res.lastName,
                    roleId:res.roleId,
                    mobileNo:res.mobileNo,
                    emailId:res.emailId,
                    DeleteStatus: false
                })
            });
        }
    }
    /**
     * TMethod is used to clear state if record saved.
     */
    // clearState() {
    //     this.setState({
    //         UserName: '',
    //         UserPassword: '',
    //         EmailId: '',
    //         EnteredBy: 'Admin',
    //         Title: '',
    //         FirstName: '',
    //         LastName: '',
    //         CompanyName: '',
    //         CountryId: 0,
    //         ReenterPassword: '',
    //         ReEnterEmail: '',
    //         MobileNo: '',
    //         EmailId: '',
    //         UserNameError: '',
    //         PasswordError: '',
    //         CountryError: '',
    //         roleList:[]
    //     });
    // }
}
export default connect(null, { enqueueSnackbarAction, closeSnackbar })(EditUserComponent)