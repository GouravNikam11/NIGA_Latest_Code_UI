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

export class AddQualificationComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            qalificationId: 0,
            QualificationName: '',
            QualificationAlias: '',
            Description: '',
            DegreeLevel: '',
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
                    Add Qualification
                </CardHeader>

                <CardBody>
                    <Form encType="multipart/form-data" className="form-horizontal">
                        <Row>
                            <Col xs="12" md="4">
                                <FormGroup >
                                    <Label className="label" htmlFor="">Qualification Name <span className="required">*</span> :</Label>
                                    <Form.Control type="text" placeholder="Qualification Name"
                                        name="QualificationName"
                                        onChange={this.handleChange}
                                        value={this.state.QualificationName === null ? '' : this.state.QualificationName} />
                                    <span className="error">{this.state.errors["QualificationName"]}</span>

                                </FormGroup>
                            </Col>

                            <Col xs="12" md="4">
                                <FormGroup >
                                    <Label className="label" htmlFor="">Qualification Alias :</Label>
                                    <Form.Control type="text" placeholder="Qualification Alias"
                                        name="QualificationAlias"
                                        onChange={this.handleChange}
                                        value={this.state.QualificationAlias === null ? '' : this.state.QualificationAlias} />
                                  
                                </FormGroup>
                            </Col>

                            <Col xs="12" md="4">
                                <FormGroup >
                                    <Label className="label" htmlFor="">Description :</Label>
                                    <Form.Control type="text" placeholder="Description"
                                        name="Description"
                                        onChange={this.handleChange}
                                        value={this.state.Description === null ? '' : this.state.Description} />

                                </FormGroup>
                            </Col>
                        </Row>

                        <Row>
                            <Col xs="12" md="4">
                                <FormGroup >
                                    <Label className="label" htmlFor="">Degree Level <span className="required">*</span> :</Label>
                                    <Form.Control type="text" placeholder="Degree Level"
                                        name="DegreeLevel"
                                        onChange={this.handleChange}
                                        value={this.state.DegreeLevel === null ? '' : this.state.DegreeLevel} />
                                    <span className="error">{this.state.errors["DegreeLevel"]}</span>

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
                                onClick={() => this.props.history.push('/ListQualification')}
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

        if (fields.QualificationName == "") {
            isFormValid = false;
            errors["QualificationName"] = "Please enter qualification name"
        }

        if (fields.DegreeLevel == "") {
            isFormValid = false;
            errors["DegreeLevel"] = "Please enter the degree level"
        }

        this.setState({ errors });
        return isFormValid;
    }

    submitForm() {

        if (this.validateForm()) {

            CommonServices.postData(this.state, `/qualification`).then((responseMessage) => {
                this.props.enqueueSnackbarAction(responseMessage.data);
                this.props.history.push('/ListQualification');

            });
            this.setState({
                qualificationId: 0,
                QualificationName: "",
                QualificationAlias: "",
                Description: "",
                DegreeLevel: "",
                EnteredBy: 'Admin',
                DeleteStatus: false
            });
            // this.props.history.push('/ListQualification');
        }
    }
}
export default connect(null, { enqueueSnackbarAction, closeSnackbar })(AddQualificationComponent)