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

export class EditQuestionGroupComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            questionGroupId: 0,
            QuestionGroupName: '',
            questionSectionId: '',
            Description: '',
            QuestionGroupList: [],
            EnteredBy: 'Admin',
            DeleteStatus: false,
            errors: {}
        }
        this.handlequestion = this.handlequestion.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.submitForm = this.submitForm.bind(this);
    }

    renderquestiongroupList = () => {
        if (this.state.QuestionSectionList == undefined) {
            return null;
        }
        return this.state.QuestionSectionList.map((question, index) => {
            return <option key={index} value={question.questionSectionId}>{question.questionSectionName}</option>
        })
    }
    render() {
        return (
            <Card>
                <CardHeader>
                    <i className="fa fa-align-justify"></i>
                    Edit Question Group
                </CardHeader>

                <CardBody>
                    <Form encType="multipart/form-data" className="form-horizontal">

                        <Row>
                            <Col xs="12" md="4">
                                <FormGroup >
                                    <Label className="label" htmlFor="">Question Group Name
                                        <span className="required">*</span> :</Label>
                                    <Form.Control type="text" placeholder="Question Group Name"
                                        name="QuestionGroupName"
                                        onChange={this.handleChange}
                                        value={this.state.QuestionGroupName === null ? '' : this.state.QuestionGroupName} />
                                    <span className="error">{this.state.errors["QuestionGroupName"]}</span>
                                </FormGroup>
                            </Col>
                            <Col xs="12" md="4">
                                <FormGroup >
                                    <Label className="label" htmlFor="">Existance Name
                                        <span className="required">*</span>:</Label>
                                    <Form.Control as="select"
                                        name="questionSectionId"
                                        onChange={this.handlequestion.bind(this)}
                                        value={this.state.questionSectionId === null ? '' : this.state.questionSectionId}>
                                        {/* <option value="0">Select Existance Name</option> */}
                                        {
                                            this.renderquestiongroupList()
                                        }
                                    </Form.Control>
                                    <span className="error">{this.state.errors["questionSectionId"]}</span>
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
                                <i className="fa fa-save"></i> Update
                            </Button> &nbsp;
                            <Button
                                type="reset"
                                style={{ textTransform: "uppercase" }}
                                onClick={() => this.props.history.push('/ListQuestionGroup')}
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

        if (fields.QuestionGroupName == "") {
            isFormValid = false;
            errors["QuestionGroupName"] = "Please enter the question group name"
        }

        this.setState({ errors });
        return isFormValid;
    }
    
componentDidMount() {
        debugger
        var Id = this.props.match.params.id;
        var questionSectionId = this.props.match.params.questionSectionId;
        this.getQuestionSection();
        debugger
        this.setState({
            questionSectionId: questionSectionId
        });
        this.editQuestionGroup(Id);  
    }

    handlequestion(e) {
            this.setState({
                questionSectionId: e.target.value
            })
    }

    getQuestionSection() {
        debugger;
        CommonServices.getData(`/questionsection`).then((temp) => {
            console.log(temp);
            debugger;
            this.setState({
                QuestionSectionList: temp,
            })
        });
    }

    submitForm() {
        if (this.validateForm()) {

            CommonServices.postData(this.state, `/questiongroup`).then((responseMessage) => {
                this.props.enqueueSnackbarAction(responseMessage.data);
                this.props.history.push('/ListQuestionGroup');
            });
            this.setState({
                questionGroupId: 0,
                QuestionGroupName: "",
                Description: "",
                EnteredBy: 'Admin',
                DeleteStatus: false
            });
        }
    }

    editQuestionGroup(questiongroupId) {
        debugger;
        if (questiongroupId != undefined) {
            CommonServices.getDataById(questiongroupId, `/questiongroup`).then((res) => {
                debugger;
                this.setState({
                    
                    questionGroupId: res.questionGroupId,
                    QuestionGroupName: res.questionGroupName,
                    Description: res.description,
                    EnteredBy: 'Admin',
                    DeleteStatus: false
                })
            });
        }
    }
}
export default connect(null, { enqueueSnackbarAction, closeSnackbar })(EditQuestionGroupComponent)
