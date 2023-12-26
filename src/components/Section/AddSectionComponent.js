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

class AddSectionComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            sectionId: 0,
            SectionName: '',
            SectionAlias: '',
            Description: '',
            SectionList: [],
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
                    Add Section
                </CardHeader>

                <CardBody>
                    <Form encType="multipart/form-data" className="form-horizontal">
                        <Row>
                            <Col xs="12" md="4">
                                <FormGroup >
                                    <Label className="label" htmlFor="">Section Name
                                        <span className="required">*</span> :</Label>

                                    <Form.Control type="text" placeholder="Section Name"
                                        name="SectionName"
                                        onChange={this.handleChange}
                                        value={this.state.SectionName === null ? '' : this.state.SectionName} />
                                    <span className="error">{this.state.errors["SectionName"]}</span>

                                </FormGroup>
                            </Col>

                            <Col xs="12" md="4">
                                <FormGroup >
                                    <Label className="label" htmlFor="">Section Alias : </Label>

                                    <Form.Control type="text" placeholder="Section Alias"
                                        name="SectionAlias"
                                        onChange={this.handleChange}
                                        value={this.state.SectionAlias === null ? '' : this.state.SectionAlias} />
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
                                onClick={() => this.props.history.push('/ListSection')}
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

        if (fields.SectionName == "") {
            isFormValid = false;
            errors["SectionName"] = "Please enter section name"
        }
        this.setState({ errors });
        return isFormValid;
    }

    submitForm() {
        debugger;
        if (this.validateForm()) {
            CommonServices.postData(this.state, `/section`).then((responseMessage) => {
                this.props.enqueueSnackbarAction(responseMessage.data);
                this.props.history.push('/ListSection');
            });
            this.setState({
                sectionId: 0,
                SectionName: "",
                SectionAlias: "",
                Description: "",
                EnteredBy: 'Admin',
                DeleteStatus: false
            });
        }
    }
}
export default connect(null, { enqueueSnackbarAction, closeSnackbar })(AddSectionComponent)
