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

class EditQuestionSectionComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            questionSectionId: 0,
            QuestionSectionName: '',
            Description: '',
            QuestionSectionList: [],
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
                    Edit Existance
                </CardHeader>
                <CardBody>
                    <Form encType="multipart/form-data" className="form-horizontal">
                        <Row>
                            <Col xs="12" md="4">
                                <FormGroup >
                                    <Label className="label" htmlFor="">Existance Name
                                        <span className="required">*</span> :</Label>
                                    <Form.Control type="text" placeholder="Question Section Name"
                                        name="QuestionSectionName"
                                        onChange={this.handleChange}
                                        value={this.state.QuestionSectionName === null ? '' : this.state.QuestionSectionName} />
                                    <span className="error">{this.state.errors["name"]}</span>
                                </FormGroup>
                            </Col>

                            <Col xs="12" md="4">
                                <FormGroup >
                                    <Label className="label" htmlFor="">Description :</Label>
                                    <Form.Control type="text" placeholder="Description"
                                        name="Description"
                                        onChange={this.handleChange}
                                        value={this.state.Description === null ? '' : this.state.Description} />
                                    <span className="error">{this.state.errors["description"]}</span>
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
                                onClick={() => this.props.history.push('/ListQuestionSection')}
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

    validateForm() {
        let fields = this.state;

        let errors = {};
        let isFormValid = true;

        if (fields.QuestionSectionName == "") {
            isFormValid = false;
            errors["name"] = "Please enter the existance name"
        }

        this.setState({ errors });
        return isFormValid;
    }


    handleChange(e) {
        debugger;
        this.setState({ [e.target.name]: e.target.value })
    }

    componentDidMount() {
        debugger;
        console.log(this.props.match)
        var Id = this.props.match.params.id;
        this.editQuestionSection(Id);
    }

    submitForm = () => {
        debugger;
        if (this.validateForm()) {

            CommonServices.postData(this.state, `/questionsection`).then((responseMessage) => {
                this.props.enqueueSnackbarAction("Record updated successfully");
                this.props.history.push('/ListQuestionSection');

            });
            this.setState({
                questionSectionId: 0,
                QuestionSectionName: "",
                Description: "",
                EnteredBy: 'Admin',
                DeleteStatus: false
            });
        }
    }

    editQuestionSection(questionsectionId) {
        debugger;
        if (questionsectionId != undefined) {
            CommonServices.getDataById(questionsectionId, `/questionsection`).then((res) => {
                this.setState({
                    questionSectionId: res.questionSectionId,
                    QuestionSectionName: res.questionSectionName,
                    Description: res.description,
                    EnteredBy: 'Admin',
                    DeleteStatus: false
                });
            });
        }
    }
}
export default connect(null, { enqueueSnackbarAction, closeSnackbar })(EditQuestionSectionComponent)