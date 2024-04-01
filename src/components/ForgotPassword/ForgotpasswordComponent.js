import React, { Component } from 'react';
import { Row, Col, Button, FormGroup, Form } from 'react-bootstrap';
import { Redirect, Route,  BrowserRouter as Router,Switch } from 'react-router-dom';
import { Link } from 'react-router-dom';
import LoginComponent from '../Login/LoginComponent';
import { login } from '../../store/actions/auth';
import CommonServices from '../../Services/CommonServices';
import { isValidElement } from 'react';
import { connect } from 'react-redux';
import { UserRoles } from '../../Constants/UserRoles'
import {
    enqueueSnackbar as enqueueSnackbarAction,
    closeSnackbar
} from '../../store/actions/notification';
import { Input, Label, Select } from 'reactstrap';
import bgs from '../../assets/img/hm44.png'
/**
 * Created Date     :       20 Dec 2019
 * Purpose          :       To validate  username and password.
 * Author           :       Chandrashekhar Salagar.
 */


class ForgotPassword extends Component {
   
    //const history = useHistory();   
    constructor(props) {

        super(props)
        this.state = {
            email: '',
        }
        this.handleChange = this.handleChange.bind(this);
        
    }



    // componentDidMount() {
    //     // Remove query parameters when the component mounts
    //     this.removeQueryParams();
    
    //     // Add event listener to handle the browser's back button
    //     window.addEventListener('popstate', this.removeQueryParams);
    //   }
    
    //   componentWillUnmount() {
    //     // Clean up the event listener when the component unmounts
    //     window.removeEventListener('popstate', this.removeQueryParams);
    //   }
    
    //   removeQueryParams = () => {
    //     if (window.location.search) {
    //       window.history.replaceState({}, document.title, window.location.pathname);
    //     }
    //   };
    

    /**
     * Render form.
     */
    render() {

        return (
            <div className="Signup " style={{ backgroundImage: 'url(' + bgs + ')', backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundSize: '100% 100%' , height: '100vh', paddingTop: '6rem' }}>
                <Col>  <br></br>  
                    <Form className="mres wid50">
                        <center> <img src="/static/media/logo.fe659025.png" width="240" height="60" alt="Homeo Centrum Logo" /></center>
                        <br></br>  <br></br>
                        {/* <h4 className="text-center pb-2 clrcode">Forgot Password</h4> */}
                        <FormGroup >
                            <Label className="label" htmlFor="">  Email
                                <span className="required"> *</span> :</Label>
                            <Form.Control type="text" placeholder="Enter email" className="brdrds"
                                name="email"
                                onChange={this.handleChange}
                                value={this.state.email === null ? '' : this.state.email} />
                        </FormGroup>


                        <Row>
                            <Col sm="12" className="text-center pb-2 pt-3">
                                <Button color="primary" style={{ backgroundColor: "#20a8d8", textTransform: "uppercase" }} type="submit" className="paddg"
                                    onClick={this.submitForm.bind(this)}>&nbsp; <i className="fa fa-user"></i>  &nbsp; submit &nbsp;</Button>
                            </Col>

                            <Col sm="12" className="text-center pb-2 pt-3">
                            <Link to={"/Login"}>Go To Login Page</Link>
                        
                            </Col>
                        </Row>


                    </Form>
                </Col>
            </div>
        )
    }

    /**
     * Method to handle change in input fields.
     * @param {*} event 
     */
    handleChange(e) {
        debugger
        console.log('email===', { [e.target.name]: e.target.value })
        this.setState({ [e.target.name]: e.target.value })
    }

    


    submitForm() {
        debugger;
        CommonServices.post({},`/users/ForgetPassword?email=`+this.state.email).then((response) => {
            console.log(response);
            this.props.enqueueSnackbarAction(response.data);
            this.props.history.push("Login");
            // if (response.data.toLowerCase() != "user already exists") {
            //     this.clearState();
            // }
        })
    }
    /**
     * Check Query string parameter against user record and verify users account.
     */
    // submitForm() {
    //     debugger
    //     console.log('email===', this.state.email)
    //     CommonServices.postData({},`/users/ForgetPassword?email=`+this.state.email).then((result) => {
    //         this.props.enqueueSnackbarAction(result.data);
    //         this.clearState();
    //         debugger;
    //         if (result.data == "Email Send Successfully") {
    //            //navigate.go(-1)
    //            debugger
    //            this.props.history.push("Login");
    //             this.setState({
    //                 email: '',
    //             });
                
    //         }
    //         else {
    //            // this.props.enqueueSnackbarAction();
    //           //  this.props.history.push("/Forgotpassword");
    //             // this.setState({
    //             //     email: this.state
    //             // });
    //         }

    //     });


    // }
}

const mapStateToProps = (state) => ({});
const mapDispatchToprops = {

}
export default connect(mapStateToProps, mapDispatchToprops)(ForgotPassword)