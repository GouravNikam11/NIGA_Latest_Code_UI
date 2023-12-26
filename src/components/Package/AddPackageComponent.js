import React, { Component } from 'react';
import { Table, Col, FormGroup, Form, Row } from 'react-bootstrap';
import { Button, Card, CardBody, CardFooter, CardHeader,} from 'reactstrap';
import { Input, Label, Select } from 'reactstrap';
import CommonServices from '../../Services/CommonServices';
import { connect } from 'react-redux';
import '../../components/CommanStyle.css';
import {
    enqueueSnackbar as enqueueSnackbarAction,
    closeSnackbar
} from '../../store/actions/notification';

class AddPackageComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            packageId: 0,
            PackageName: '',
            CaseCount: '',
            ValidityInDays: '',
            Amount: '',
            PackageList: [],
            EnteredBy: 'Admin',
            DeleteStatus: false,
            errors: {}
        }
        this.handleChange = this.handleChange.bind(this);
        this.submitForm = this.submitForm.bind(this);
    }

    render() {
        return (

        <Card>

            <CardHeader>
                <i className="fa fa-align-justify"></i>
                Add Package
            </CardHeader>

            <CardBody>
                <Form encType="multipart/form-data" className="form-horizontal">
                    <Row>
                        <Col xs="12" md="4">
                            <FormGroup >
                                <Label className="label" htmlFor="">Package Name <span className="required">*</span> :</Label>
                                <Form.Control type="text" placeholder="Package Name"
                                        name="PackageName"
                                        onChange={this.handleChange}
                                        value={this.state.PackageName === null ? '' : this.state.PackageName} />
                                    <span className="error">{this.state.errors["PackageName"]}</span>

                            </FormGroup>
                        </Col>

                        <Col xs="12" md="4">
                            <FormGroup >
                                <Label className="label" htmlFor="">Case Count <span className="required">*</span> :</Label>
                                <Form.Control type="text" placeholder="Case Count"
                                        name="CaseCount"
                                        onChange={this.handleChange}
                                        value={this.state.CaseCount === null ? '' : this.state.CaseCount} />
                                    <span className="error">{this.state.errors["CaseCount"]}</span>

                            </FormGroup>
                        </Col>

                        <Col xs="12" md="4">
                            <FormGroup >
                                <Label className="label" htmlFor="">Validity In Days <span className="required">*</span> :</Label>
                                <Form.Control type="text" placeholder="Validity In Days"
                                        name="ValidityInDays"
                                        onChange={this.handleChange}
                                        value={this.state.ValidityInDays === null ? '' : this.state.ValidityInDays} />
                                    <span className="error">{this.state.errors["ValidityInDays"]}</span>

                            </FormGroup>
                        </Col>
                    </Row>

                    <Row>
                        <Col xs="12" md="4">
                            <FormGroup >
                                <Label className="label" htmlFor="">Amount <span className="required">*</span> :</Label>
                                <Form.Control type="text" placeholder="Amount"
                                        name="Amount"
                                        onChange={this.handleChange}
                                        value={this.state.Amount === null ? '' : this.state.Amount} />
                                    <span className="error">{this.state.errors["Amount"]}</span>

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
                                onClick={() => this.props.history.push('/ListPackage')}
                                size="sm" color="danger">
                                <i className="fa fa-ban"></i> Cancel
                            </Button>
                        </Col>
                        <Col xs="12" md="6" style={{ textAlign: "right" }}>
                            <Label style={{ fontSize: 15 , margin: 0, paddingTop : 5}}> Fields marked with an asterisk <span className="required">*</span> are mandatory</Label>
                        </Col>

                    </Row>

            </CardFooter>
            
        </Card>        
       
        )
    }

    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value })
    }

    validateForm() {
        let fields = this.state;

        let errors = {};
        let isFormValid = true;

        if (fields.PackageName == "") {
            isFormValid = false;
            errors["PackageName"] = "Please enter package name"
        }
        if (fields.CaseCount == "") {
            isFormValid = false;
            errors["CaseCount"] = "Please enter the case count"
        }
        if (fields.ValidityInDays == "") {
            isFormValid = false;
            errors["ValidityInDays"] = "Please enter the validity in days"
        }
        if (fields.Amount == "") {
            isFormValid = false;
            errors["Amount"] = "Please enter the amount"
        }

        this.setState({ errors });
        return isFormValid;
    }

    submitForm() {
        if (this.validateForm()) {

        CommonServices.postData(this.state, `/package`).then((responseMessage) => {
            this.props.enqueueSnackbarAction(responseMessage.data);
        this.props.history.push('/ListPackage');
            
        });
        this.setState({
            packageId: 0,
            PackageName: "",
            CaseCount: "",
            ValidityInDays: "",
            Amount: "",
            EnteredBy: 'Admin',
            DeleteStatus: false
        });
        //this.props.history.push('/ListPackage');
    }
}

}
export default connect(null, { enqueueSnackbarAction, closeSnackbar })(AddPackageComponent)
