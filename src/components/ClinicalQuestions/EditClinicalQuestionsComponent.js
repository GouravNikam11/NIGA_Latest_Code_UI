import React, { Component } from 'react';
import { Table, Col, FormGroup, Form, Row } from 'react-bootstrap';
import { Button, Card, CardBody, CardFooter, CardHeader,} from 'reactstrap';
import { Input, Label } from 'reactstrap';
import Select from "react-select";
import AsyncPaginate from "react-select-async-paginate";
import './ClinicalQuestions.css';
import DragSortableList from 'react-drag-sortable';
import CommonServices from '../../Services/CommonServices';
import '../../components/CommanStyle.css';

/**
 * Created Date     :   07-01-2020.
 * Purpose          :   Class us used to display and edit existing clinical questions.
 * Author           :   Chandrashekhar Salagar.
 */
export class EditClinicalQuestionsComponent extends Component {
    /**
    * Constructor to initialize class members.
    * @param {*} props 
    */
    constructor(props) {
        super(props);
        this.state = {
            QuestionsId: 0,
            QuestionGroupId: 0,
            Question: '',
            Description: '',
            EnteredBy: '',
            SeqNo: 0,
            Questions: [

            ],
            QuestionGroup: [

            ]
        };
        this.handleChange = this.handleChange.bind(this);
    }

    /**
     * React's render mwthod extended from React Component
     */
    render() {
        return (

            <Card>

                <CardHeader>
                    <i className="fa fa-align-justify"></i>
                    Edit Clinical Question
                </CardHeader>

                <CardBody>
                    <Form encType="multipart/form-data" className="form-horizontal">
                        <Row>

                            <Col xs="12" md="4">
                                <Label className="label" htmlFor="">Existance Name
                                    <span className="required">*</span> :</Label>
                                <Select
                                    placeholder="Select Existance Name"
                                    name="SelectExistanceName"
                                    isSearchable={true} />
                            </Col>


                            <Col xs="12" md="4">
                                <Label className="label" htmlFor="">Question Group
                                    <span className="required">*</span> :</Label>
                                <Select
                                    placeholder="Select Question Group :"
                                    isSearchable={true}
                                />
                            </Col>



                            <Col xs="12" md="4">
                                <Label className="label" htmlFor="">Sub Question Group Name
                                    <span className="required">*</span> :</Label>
                                <Select
                                    placeholder="Select Sub Question Group Name :"
                                    isSearchable={true}
                                />
                            </Col>

                        </Row>

                        <Row className="mt-2">
                            <Col xs="12" md="4">
                                <Label className="label" htmlFor="">
                                    Select Section
                                    <span className="required">*</span> :</Label>
                                <Input
                                    type="select"
                                    name="SectionIdForBodyPart">
                                    <option value="0">Select Section</option>
                                </Input>
                            </Col>

                            <Col xs="12" md="8">
                                <Label className="label" htmlFor="">Body Part Name
                                    <span className="required">*</span> :</Label>
                                <Select
                                    placeholder="Select Body Part Name :"
                                    isSearchable={true}
                                    isMulti={false} />
                            </Col>
                        </Row>

                        <Row className="mt-2">
                            <Col xs="12" md="12">
                                <FormGroup >
                                    <Label className="label" htmlFor="">Question
                                        <span className="required">*</span> :</Label>
                                    <Form.Control type="text" placeholder="Question"name="Question"/>
                                </FormGroup>
                            </Col>
                        </Row>


                        <Row>
                            <Col xs="12" md="3">
                                <Label className="label" htmlFor="">
                                    Select Section
                                    <span className="required">*</span> :</Label>
                                <Input
                                    type="select"
                                    name="SectionId">
                                    <option value="0">Select Section</option>
                                </Input>
                            </Col>

                            <Col xs="12" md="7">
                                <Label className="label" htmlFor="">
                                    Select Sub Section
                                    <span className="required">*</span> :</Label>

                                <AsyncPaginate style={{ width: '80px' }}
                                    isClearable
                                    isMulti={false}
                                    placeholder="Type Sub-Section"
                                />
                            </Col>

                            <Col xs="12" md="2">
                                <FormGroup >
                                    <Button
                                        type="button"
                                        style={{ marginTop: 32 }}
                                        size="sm" color="primary">
                                        <i className="fa fa-plus"></i> Add Sub Section
                                    </Button>
                                </FormGroup>
                            </Col>
                        </Row>


                        <Table style={{ width: '100%' }} striped bordered hover className="mt-3">
                            <thead>
                                <tr>
                                    <th colSpan={2}>Question</th>
                                    <th>Sub Section Name</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>      
                                    <td>Data</td>
                                    <td className='lcol' style={{ width: '10%' }}>
                                        <Button style={{ marginLeft: 8 }} color="primary"  ><i className="fa fa-pencil"></i></Button>
                                    </td>
                                    <Table>
                                        <tr>
                                            <td>Data</td>
                                            <td className='lcol'>
                                                <Button style={{ marginLeft: 8 }} variant="danger" color="danger"  ><i className="fa fa-trash"></i></Button>
                                            </td>
                                        </tr>
                                    </Table>
                                </tr>
                            </tbody>
                        </Table>

                    </Form>

                </CardBody>

                <CardFooter>
                        <Row>
                        
                            <Col xs="12" md="6">
                                <Button
                                    type="button"
                                    style={{ textTransform: "uppercase" }}
                                    onClick={this.handleSave.bind(this)}
                                    size="sm" color="primary">
                                    <i className="fa fa-save"></i> Update
                                </Button> &nbsp;
                                <Button
                                    type="reset"
                                    style={{ textTransform: "uppercase" }}
                                    onClick={() => this.props.history.push('/ListClinicalQuestions')}
                                    size="sm" color="danger">
                                    <i className="fa fa-ban"></i> Cancel
                                </Button>
                            </Col>
                            <Col xs="12" md="6" style={{ textAlign: "right" }}>
                                <Label style={{ fontSize: 15 , margin: 0, paddingTop : 5}}> Fields marked with an asterisk <span className="required">*</span> are mandatory</Label>
                            </Col>

                        </Row>

                </CardFooter>

            </Card>

                
            
        )
    }

    /**
    * React component did mount, will execute only once per page load.
    */
    componentDidMount() {

        var Id = this.props.match.params.id;
        this.getQuestionGroup();
        this.setState({
            QuestionGroupId: Id
        });
        this.getClinicalQuestions(Id)
    }

    /**
     * Method is used to get all Question group for dropdown.
     */
    getQuestionGroup() {
        CommonServices.getData('/questiongroup').then((res) => {
            this.setState({
                QuestionGroup: res
            });
        })
    }

    /**
    * Handle change event of every control to update the state
    * @param {*} event 
    */
    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value });
    }

    /**
     * Method to get clinical question of selected question group.
     * @param {*} QuestionGroupId 
     */
    getClinicalQuestions(QuestionGroupId) {
        debugger;
        CommonServices.getDataById(QuestionGroupId, `/clinicalquestions/GetClinicalQuestionsByGroup`).then((result) => {
            console.log(result);
            if (result.length > 0) {
                debugger;
                this.setState({
                    QuestionsId: result[0].questionsId,
                    // Description: result[0].description,
                    Questions: result
                })
            }
        })
    }

    /**
     * Get question for edit.
     */
    editQuestion(questionId) {
        var Question = this.state.Questions.filter(x => x.questionsId == questionId);
        console.log(Question);
        debugger;
        this.setState({
            QuestionsId: Question[0].questionsId,
            Question: Question[0].questions,
            Description: Question[0].description,
            SeqNo: Question[0].seqNo,
            QuestionGroupId: Question[0].questionGroupId,
        });
    }

    /**
     * Method is used to handle save 
     */
    handleSave() {
        debugger;
        console.log(this.state);
        if (this.state.QuestionGroupId == '') {
            alert("Please select Question group");
        }
        else if (this.state.Question == "") {
            alert("Please select question to edit");
        }
        else if (this.state.Questions.length == 0) {
            alert("There are no questions to edit");
        }
        else {
            var clinicalquestionsModel = [];
            var item = {
                QuestionsId: this.state.QuestionsId,
                QuestionGroupId: this.state.QuestionGroupId,
                Questions: this.state.Question,
                Description: this.state.Description,
                EnteredBy: localStorage.getItem("UserName"),
                SeqNo: this.state.SeqNo,
            }
            clinicalquestionsModel.push(item);
            /*Save Request*/
            CommonServices.postData(clinicalquestionsModel, `/clinicalquestions`).then((res) => {
                alert(res.data);
                this.props.history.push('/ListClinicalQuestions');
                this.getClinicalQuestions(this.state.QuestionGroupId);
            });
        }
    }

    /**
     * Method is used to Delete Quesion.
     */
    handleDelete(QuestionsId) {
        console.log(this.state);
        debugger;
        var DeleteClinicalQuestions = {
            QuestionsId: QuestionsId,
            DeleteStatus: true,
            EnteredBy: localStorage.getItem("UserName"),
            QuestionGroupId: this.state.QuestionGroupId,
            Questions: "Test",
        };
        CommonServices.postData(DeleteClinicalQuestions, `/clinicalquestions/DeleteClinicalQuestions`).then((result) => {
            console.log(result);
            alert(result.data);
            this.getClinicalQuestions(this.state.QuestionGroupId);
        });
    }

}