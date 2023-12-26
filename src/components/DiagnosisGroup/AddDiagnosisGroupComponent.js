import React, { Component } from 'react';
import { Table, Col, FormGroup, Form, Row } from 'react-bootstrap';
import { Button, Card, CardBody, CardFooter, CardHeader, } from 'reactstrap';
import { Input, Label } from 'reactstrap';
import APICalls from '../../Services/DiagnosisGroup';
import CommonServices from '../../Services/CommonServices';
import { connect } from 'react-redux';
import '../../components/CommanStyle.css';
import {
    enqueueSnackbar as enqueueSnackbarAction,
    closeSnackbar
} from '../../store/actions/notification';

import axios from 'axios'

class AddDiagnosisGroupComponent extends Component {
    /**
     * Created Date     :   16 Dec 2019  
     * purpose          :   Component responsible for handling DiagnosisGroupMaster records   
     * Author           :   Chandrashekhar Salagar
     */
    constructor(props) {
        super(props);
        this.state = {
            diagnosisGroupId: 0,
            diagnosisGroupList: [],
            DiagnosisGroupName: '',
            Description: '',
            EnteredBy: 'Admin',
            DeleteStatus: false,
            errors: {}
        }
        this.onChange = this.onChange.bind(this);
        this.submitForm = this.submitForm.bind(this);
    }
    componentDidMount() {
        debugger;
        console.log()
        var Id = this.props.match.params.id;
        // this.refreshList();
        // console.log("**********API CALL**************")
    }
    render() {
        return (

            <Card>

                <CardHeader>
                    <i className="fa fa-align-justify"></i>
                    Add Diagnosis Group
                </CardHeader>

                <CardBody>
                    <Form encType="multipart/form-data" className="form-horizontal">
                        <Row>
                            <Col xs="12" md="4">
                                <FormGroup >
                                    <Label className="label" htmlFor="">Diagnosis Group Name
                                        <span className="required">*</span> :</Label>
                                    <Form.Control type="text" placeholder="Diagnosis Group Name"
                                        name="DiagnosisGroupName"
                                        onChange={this.onChange}
                                        value={this.state.DiagnosisGroupName === null ? '' : this.state.DiagnosisGroupName} />
                                    <span className="error">{this.state.errors["DiagnosisGroupName"]}</span>

                                </FormGroup>
                            </Col>

                            <Col xs="12" md="4">
                                <FormGroup >
                                    <Label className="label" htmlFor="">Description :</Label>
                                    <Form.Control type="text" placeholder="Description"
                                        name="Description"
                                        onChange={this.onChange}
                                        value={this.state.Description === null ? '' : this.state.Description} />
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
                                onClick={() => this.props.history.push('/ListDiagnosisGroup')}
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
    /**
    * Created Date     :   16 Des 2019
    * purpose          :   Handling change event of all input fields
    * Author           :   Chandrashekhar Salagar
    */
    onChange(e) {
        this.setState({ [e.target.name]: e.target.value })
    }

    validateForm() {
        let fields = this.state;

        let errors = {};
        let isFormValid = true;

        if (fields.DiagnosisGroupName == "") {
            isFormValid = false;
            errors["DiagnosisGroupName"] = "Please enter diagnosis group name"
        }
        this.setState({ errors });
        return isFormValid;
    }

    /**
     * Created  Date    :   16 Dec 2019
     * Purpose          :   Submit Form for adding new diagnosis sroup
     * Author           :   Chandrashekhar Salagar
     */
    submitForm() {

        if (this.validateForm()) {

            CommonServices.postData(this.state, `/diagnosisgroup`).then((responseMessage) => {
                debugger;
                this.props.enqueueSnackbarAction(responseMessage.data);
                this.props.history.push('/ListDiagnosisGroup');
                // this.refreshList();

            });
            this.setState({
                diagnosisGroupId: 0,
                DiagnosisGroupName: '',
                Description: '',
                EnteredBy: 'Admin',
                DeleteStatus: false
            });
            //this.props.history.push('/ListDiagnosisGroup');
        }
    }

}
export default connect(null, { enqueueSnackbarAction, closeSnackbar })(AddDiagnosisGroupComponent)