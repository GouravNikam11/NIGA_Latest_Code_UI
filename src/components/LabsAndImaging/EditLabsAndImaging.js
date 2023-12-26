import React, { Component } from 'react';
import { Table, Col, FormGroup, Form, Row } from 'react-bootstrap';
import { Button, Card, CardBody, CardFooter, CardHeader, } from 'reactstrap';
import { Input, Label } from 'reactstrap';
import CommonServices from '../../Services/CommonServices';
import '../../components/CommanStyle.css';
import axios from 'axios'
import {
    enqueueSnackbar as enqueueSnackbarAction,
    closeSnackbar
} from '../../store/actions/notification';
import { connect } from 'react-redux';
import '../../components/CommanStyle.css';

export class EditLabsAndImaging extends Component {

    /**
     * Created Date     :   19 Dec 2019  
     * purpose          :   Component responsible for handling DiagnosisMaster records   
     * Author           :   
     */
    constructor(props) {

        super(props);
        this.state = {
            patientLabTestId: 0,
            labTestName: '',
            description: '',
            errors: {}
        }
        this.handleChange = this.handleChange.bind(this);
        this.submitForm = this.submitForm.bind(this);
    }
    componentDidMount() {
        debugger;
        var Id = this.props.match.params.id;
        this.editPathology(Id);
    }

    render() {
        return (

            <Card>

                <CardHeader>
                    <i className="fa fa-align-justify"></i>
                    Edit Labs & Imaging
                </CardHeader>

                <CardBody>
                    <Form encType="multipart/form-data" className="form-horizontal">
                        <Row>
                            <Col xs="12" md="4">
                                <FormGroup >
                                    <Label className="label" htmlFor="">Test Name
                                        <span className="required">*</span> :</Label>
                                    <Form.Control type="text" placeholder="Test Name"
                                        name="labTestName"
                                        onChange={this.handleChange}
                                        value={this.state.labTestName === null ? '' : this.state.labTestName} />
                                    <span className="error">{this.state.errors["labTestName"]}</span>

                                </FormGroup>
                            </Col>
                        </Row>

                        <Row>
                            <Col xs="12" md="12">
                                <FormGroup >
                                    <Label className="label" htmlFor="">Description :</Label>
                                    <textarea placeholder="Description"
                                        name="description"
                                        class="form-control"
                                        onChange={this.handleChange}
                                        value={this.state.description === null ? '' : this.state.description} >
                                    </textarea>
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
                                <i className="fa fa-save"></i> Update
                            </Button> &nbsp;
                            <Button
                                type="reset"
                                style={{ textTransform: "uppercase" }}
                                onClick={() => this.props.history.push('/ListLabsAndImaging')}
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
    * Created Date     :   19 Des 2019
    * purpose          :   Handling change event of all input fields
    * Author           :   
    */
    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value })
    }

    validateForm() {
        let fields = this.state;
        let errors = {};
        let isFormValid = true;
        if (fields.labTestName == "") {
            isFormValid = false;
            errors["labTestName"] = "Please enter Test Name"
        }

        this.setState({ errors });
        return isFormValid;
    }


    submitForm() {

        if (this.validateForm()) {
            CommonServices.postData(this.state, `/PatientLabTest/AddEditPatientLabTest`).then((responseMessage) => {
                this.props.enqueueSnackbarAction(responseMessage.data);
                this.props.history.push('/ListLabsAndImaging');
            });
            this.setState({
                patientLabTestId: 0,
                labTestName: '',
                description: '',
            });
        }
    }
    /**
    * Created Date     :   17 Dec 2019.
    * Purpose          :   Get diagnosis record for edit.
    * Author           :   Chandrashekhar Salagar.
    */
    editPathology(Id) {
        debugger;
        if (Id != undefined) {
            CommonServices.getDataById(Id, `/PatientLabTest/GetPatientLabTestById`).then((res) => {
                debugger;
                this.setState({
                    patientLabTestId: res.patientLabTestId,
                    labTestName: res.labTestName,
                    description: res.description,
                })
            });
        }
    }
}

export default connect(null, { enqueueSnackbarAction, closeSnackbar })(EditLabsAndImaging)

