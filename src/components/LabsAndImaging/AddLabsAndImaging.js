import React, { Component } from 'react';
import { Col, FormGroup, Form, Row } from 'react-bootstrap';
import { Button, Card, CardBody, CardFooter, CardHeader, } from 'reactstrap';
import { Label } from 'reactstrap';
import CommonServices from '../../Services/CommonServices';
import { connect } from 'react-redux';
import '../../components/CommanStyle.css';
import {
    enqueueSnackbar as enqueueSnackbarAction,
    closeSnackbar
} from '../../store/actions/notification';

export class AddLabsAndImaging extends Component {
    constructor(props) {
        super(props)

        this.state = {

            patientLabTestId: 0,
            labTestName: '',
            description: '',
            errors: {}
        }
        this.handleChange = this.handleChange.bind(this);
        this.submitForm = this.submitForm.bind(this);
    }

    async componentDidMount() {
    }

    handleSectionChanges(e) {
        this.setState({
            patientLabTestId: e.target.value
        })
    }

    render() {
        return (
            <Card>

                <CardHeader>
                    <i className="fa fa-align-justify"></i>
                    Add Labs & Imaging
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
                                <i className="fa fa-save"></i> Save
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

    submitForm(e) {
        e.preventDefault();
        debugger;

        if (this.validateForm()) {
            debugger
            CommonServices.postData(this.state, `/PatientLabTest/AddEditPatientLabTest`).then((responseMessage) => {
                this.props.enqueueSnackbarAction(responseMessage.data);
                this.props.history.push('/ListLabsAndImaging');
            }).catch(error => {
                console.log("error", error);
                debugger;
            });
            this.setState({
                patientLabTestId: 0,
                labTestName: '',
                description: '',
            });
        }
    }

}
export default connect(null, { enqueueSnackbarAction, closeSnackbar })(AddLabsAndImaging)
