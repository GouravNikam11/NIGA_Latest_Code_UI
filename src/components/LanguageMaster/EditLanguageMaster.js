
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
class EditLanguageComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            languageId: 0,
            languageName: "",
            description: "",
            isDeleted: false,
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
                    Add Language
                </CardHeader>
                <CardBody>
                    <Form encType="multipart/form-data" className="form-horizontal">
                        <Row>
                            <Col xs="12" md="4">
                                <FormGroup >
                                    <Label className="label" htmlFor="">Language Name
                                        <span className="required"> *</span> :</Label>
                                    <Form.Control type="text" placeholder="Language Name"
                                        name="languageName"
                                        onChange={this.handleChange}
                                        value={this.state.languageName === null ? '' : this.state.languageName} />
                                    <span className="error">{this.state.errors["languageName"]}</span>
                                </FormGroup>
                            </Col>
                            <Col xs="12" md="8">
                                <FormGroup >
                                    <Label className="label" htmlFor="">Description :</Label>
                                    <textarea placeholder="Description"
                                        name="description"
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
                                onClick={() => this.props.history.push('/LanguageList')}
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

    componentDidMount() {
        debugger;
        console.log(this.props.match)
        var languageId = this.props.match.params.languageId;
        this.editLanguage(languageId);

    }


    editLanguage(languageId) {
        debugger;
        if (languageId !== undefined) {
            CommonServices.getDataById(languageId, `/LanguageMaster/GetLanguageById`).then((res) => {
                this.setState({
                    "languageId": res.languageId,
                    "languageName": res.languageName,
                    "description": res.description,
                    "isDeleted": res.isDeleted
                });
            });
        }
    }


    validateForm() {
        let fields = this.state;

        let errors = {};
        let isFormValid = true;

        if (fields.languageName === "") {
            isFormValid = false;
            errors["languageName"] = "Please enter the Language name"
        }

        this.setState({ errors });
        return isFormValid;
    }


    submitForm = () => {
        if (this.validateForm()) {
            CommonServices.postData(this.state, `/LanguageMaster`).then((responseMessage) => {
                this.props.enqueueSnackbarAction("Record updated successfully");
                this.props.history.push('/LanguageList');

            });
            this.setState({
                languageId: 0,
                languageName: "",
                description: "",
                isDeleted: false,
            });
        }
    }



}
export default connect(null, { enqueueSnackbarAction, closeSnackbar })(EditLanguageComponent)
