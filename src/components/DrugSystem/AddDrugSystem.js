
import React, { Component } from 'react';
import { Table, Col, FormGroup, Form, Row } from 'react-bootstrap';
import { Button, Card, CardBody, CardFooter, CardHeader, } from 'reactstrap';
import { Input, Label, Select } from 'reactstrap';
import CommonServices from '../../Services/CommonServices';
import { connect } from 'react-redux';
import '../../components/CommanStyle.css';
import {
    enqueueSnackbar as enqueueSnackbarAction,
    closeSnackbar
} from '../../store/actions/notification';


class AddDrugSystem extends Component {
    constructor(props) {
        super(props)
        this.state = {
            drugsystemName:'',
            errors: {}
        }
        this.handleChange = this.handleChange.bind(this);
        this.submitForm = this.submitForm.bind(this);
    }


    handleChange(e) {
        debugger
        console.log('[e.target.name]',e.target.value)
        this.setState({ [e.target.name]: e.target.value })
    }

    validateForm() {
        debugger
        let fields = this.state;

        let errors = {};
        let isFormValid = true;

        if (fields.drugsystemName === "") {
            isFormValid = false;
            errors["drugsystemName"] = "Please enter the DrugSystem name"
        }

        this.setState({ errors });
        return isFormValid;
    }

    render() {
        return (
            <Card>
                <CardHeader>
                    <i className="fa fa-align-justify"></i>
                    Add Drug System
                </CardHeader>
                <CardBody>
                    <Form encType="multipart/form-data" className="form-horizontal">
                        <Row>
                            <Col xs="12" md="4">
                                <FormGroup >
                                    <Label className="label" htmlFor="">Drug System Name
                                        <span className="required">*</span> :</Label>
                                        <Form.Control type="text" 
                                        placeholder="Drug System Name" 
                                        name="drugsystemName"  
                                        onChange={this.handleChange}
                                        value={this.state.drugsystemName === null ? '' : this.state.drugsystemName} />
                                    <span className="error">{this.state.errors["drugsystemName"]}</span>
                                </FormGroup>
                            </Col>
                        </Row>
                    </Form>
                </CardBody>
                <CardFooter>
                    <Row>

                        <Col xs="12" md="6">
                            <Button
                                type="button"
                                style={{ textTransform: "uppercase" }}
                                onClick={this.submitForm}
                                size="sm" color="primary">
                                <i className="fa fa-save"></i> Save
                            </Button> &nbsp;
                            <Button
                                type="reset"
                                style={{ textTransform: "uppercase" }}
                                onClick={() => this.props.history.push('/ListDrugSystem')}
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

  
    submitForm() {
        console.log('state====',this.state)
        debugger
        if (this.validateForm()) {
            CommonServices.postData(this.state, `/DrugSystem`).then((responseMessage) => {
                this.props.enqueueSnackbarAction();
                this.props.history.push("ListDrugSystem")
            });
            this.setState({
                DrugSystemName:''
            });
        }
    }
}

export default connect(null, { enqueueSnackbarAction, closeSnackbar })(AddDrugSystem)
