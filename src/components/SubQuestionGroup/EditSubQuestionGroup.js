import React, { Component } from 'react';
import { Table, Col, FormGroup, Form, Row } from 'react-bootstrap';
import { Button, Card, CardBody, CardFooter, CardHeader, } from 'reactstrap';
import { Input, Label} from 'reactstrap';
import CommonServices from '../../Services/CommonServices';
import { connect } from 'react-redux';
import '../../components/CommanStyle.css';
import Select from "react-select";
import {
    enqueueSnackbar as enqueueSnackbarAction,
    closeSnackbar
} from '../../store/actions/notification';

export class EditSubQuestionGroup extends Component {
    constructor(props) {
        super(props)

        this.state = {
            questionSubgroupId: 0,
            SelectedQuestionGroupId:0,
            questionSubGroupName: "",
            description: "",
            deleteStatus: false,
            errors: {},
            optionList3: [],
            selectedOptions3: '', 
        }
        this.handleChange = this.handleChange.bind(this);
        this.submitForm = this.submitForm.bind(this);
    }

    componentDidMount() {
        debugger
        var questionSubgroupId = this.props.match.params.questionSubgroupId;
        this.getQuestionGroup();
        debugger
        this.setState({
            questionSubgroupId: questionSubgroupId
        });
        this.editQuestionGroup(questionSubgroupId);
    }

    getQuestionGroup() {
        CommonServices.getData('/DropdownList/GetQuestionGroupDDL').then((res) => {
            var copyTableData = res;
            let array = []
            copyTableData.forEach(element => {
                console.log("printed====>>>>", element)
                //debugger;
                let obj = {
                    value: element.questionGroupId,
                    label: element.questionGroupName
                }
                array.push(obj)
            });
            this.setState({
                optionList3: array,
                //QuestionGroup: res
            });
        })
    }

    
    handleSelectedQuestionGroup(data) {
        console.log('pranavsir++++====>>>>>', data)
        debugger
        this.setState({
            selectedOptions3: data,
            SelectedQuestionGroupId:data.value
        })
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
                    Edit Sub Question Group
                </CardHeader>

                <CardBody>
                    <Form encType="multipart/form-data" className="form-horizontal">

                        <Row>
                        <Col xs="12" md="4">
                                <Label className="label" htmlFor="">Question Group
                                    <span className="required">*</span> :</Label>
                                <Select
                                    options={this.state.optionList3}
                                    placeholder="Select Question Group :"
                                    value={this.state.selectedOptions3}
                                    onChange={(item) => this.handleSelectedQuestionGroup(item)}
                                    isSearchable={true}
                                />
                            </Col>


                            <Col xs="12" md="4">
                                <FormGroup >
                                    <Label className="label" htmlFor="">Sub Question Group Name
                                        <span className="required">*</span> :</Label>

                                    <Form.Control type="text" placeholder="Sub Question Group Name"
                                        name="questionSubGroupName"
                                        onChange={this.handleChange}
                                        value={this.state.questionSubGroupName === null ? '' : this.state.questionSubGroupName} />
                                    <span className="error">{this.state.errors["questionSubGroupName"]}</span>

                                </FormGroup>
                            </Col>


                            <Col xs="12" md="4">
                                <FormGroup >
                                    <Label className="label" htmlFor="">Description :</Label>
                                    <Form.Control type="text" placeholder="description"
                                        name="description"
                                        onChange={this.handleChange}
                                        value={this.state.description === null ? '' : this.state.description} />
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
                                onClick={() => this.props.history.push('/ListSubQuestionGroup')}
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

        if (fields.questionSubGroupName == "") {
            isFormValid = false;
            errors["questionSubGroupName"] = "Please enter the sub question group name"
        }

        this.setState({ errors });
        return isFormValid;
    }

    getQuestionSection() {
        debugger;
        CommonServices.getData(`/QuestionSubGroup/GetQuestionSubGroup`).then((temp) => {
            console.log(temp);
            debugger;
            this.setState({
                QuestionSectionList: temp,
            })
        });

    }

    submitForm() {

        if (this.validateForm()) {
            let boj={
                questionSubgroupId:this.state.questionSubgroupId,
                questionSubGroupName:this.state.questionSubGroupName,
                questionGroupId:this.state.selectedOptions3.value,
                description:this.state.description,
                
            }
            debugger
            CommonServices.postData(boj, `/QuestionSubGroup`).then((responseMessage) => {
                this.props.enqueueSnackbarAction(responseMessage.data);
                this.props.history.push('/ListSubQuestionGroup');
            });
            this.setState({
                questionSubgroupId: 0,
                questionSubGroupName: "",
                description: "",
                deleteStatus: false
            });
        }
    }

    editQuestionGroup(questiongroupId) {
        debugger;
        if (questiongroupId != undefined) {
            CommonServices.getData(`/QuestionSubGroup/${questiongroupId}`).then((res) => {
                debugger;
                let obj={
                    label:res.questionGroupName,
                    value:res.questionGroupId
                }
                this.setState({
                    questionSubgroupId:res.questionSubgroupId,
                    questionGroupId: res.questionGroupId,
                    questionSubGroupName: res.questionSubGroupName,
                    description: res.description,
                    selectedOptions3:obj,
                    EnteredBy: '',
                    DeleteStatus: false
                })
            });
        }
    }
}
export default connect(null, { enqueueSnackbarAction, closeSnackbar })(EditSubQuestionGroup)
