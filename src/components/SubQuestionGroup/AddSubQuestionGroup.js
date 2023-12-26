import React, { Component } from 'react';
import { Table, Col, FormGroup, Form, Row } from 'react-bootstrap';
import { Button, Card, CardBody, CardFooter, CardHeader, } from 'reactstrap';
import { Input, Label,  } from 'reactstrap';
import CommonServices from '../../Services/CommonServices';
import { connect } from 'react-redux';
import '../../components/CommanStyle.css';
import Select from "react-select";
import {
    enqueueSnackbar as enqueueSnackbarAction,
    closeSnackbar
} from '../../store/actions/notification';

class AddSubQuestionGroup extends Component {
    constructor(props) {
        super(props)

        this.state = {
            questionGroupId: 0,
            SubQuestionGroupName:'',
            QuestionGroupName: '',
            Description: '',
            QuestionGroupList: [],
            EnteredBy: 'Admin',
            DeleteStatus: false,
            selectedOptions3: '', 
            optionList3: [],
            SelectedQuestionGroupId:0,
            questionSubgroup1:'',
            errors: {}  
        }       
            this.handleChange = this.handleChange.bind(this);
            this.submitForm = this.submitForm.bind(this);
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
            this.setState({
                selectedOptions3: data,
                SelectedQuestionGroupId:data.value
            })
        }

        componentDidMount() {
          
            this.getQuestionGroup();
          
        }

    render() {
        return (
            <Card>

                <CardHeader>
                    <i className="fa fa-align-justify"></i>
                    Add Sub Question Group
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
                                        name="questionSubgroup1"
                                        onChange={this.handleChange}
                                        value={this.state.questionSubgroup1 === null ? '' : this.state.questionSubgroup1} />
                                    <span className="error">{this.state.errors["questionSubgroup1"]}</span>
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

        if (fields.questionSubgroup1 == "") {
            isFormValid = false;
            errors["questionSubgroup1"] = "Please enter the sub question group name"
        }

        this.setState({ errors });
        return isFormValid;
    } 

    submitForm() {

        if (this.validateForm()) {

        let obj =   {
            questionSubGroupName: this.state.questionSubgroup1,
                        description: this.state.Description,
                        questionGroupId:this.state.SelectedQuestionGroupId
                    }

        CommonServices.postData(obj, `/QuestionSubGroup`).then((responseMessage) => {
            this.props.enqueueSnackbarAction(responseMessage.data);
            this.props.history.push('/ListSubQuestionGroup');
        });
        this.setState({
            questionGroupId: 0,
            questionSubgroup1:'',
            QuestionGroupName: "",
            Description: "",
            EnteredBy: 'Admin',
            DeleteStatus: false
        });
    }
    }   
}
export default connect(null, { enqueueSnackbarAction, closeSnackbar })(AddSubQuestionGroup)
