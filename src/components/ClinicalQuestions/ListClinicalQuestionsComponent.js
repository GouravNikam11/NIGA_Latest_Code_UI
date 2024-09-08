import React, { Component } from 'react';
import { Table, Col, Button, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { components } from 'react-select';
import Pagination from 'react-js-pagination';
import CommonServices from '../../Services/CommonServices';
import AsyncPaginate from "react-select-async-paginate";
import { FormGroup, Row } from 'react-bootstrap';
import { Input, Label } from 'reactstrap';
import Select from "react-select";
import {
    enqueueSnackbar as enqueueSnackbarAction,
    closeSnackbar
} from '../../store/actions/notification';
import { connect } from 'react-redux';
/**
 * Class is used to show list of clinical questions.
 */
class ListClinicalQuestionsComponent extends Component {
    /**
     * Constructor to initialize class members.
     * @param {*} props 
     */
    constructor(props) {
        super(props);
        this.state = {
            QuestionGroupId: 0,
            QuestionGroupName: '',
            Description: '',
            EnteredBy: '',
            QuestionGroups: [],
            QuestionGroupDDL: [],
            QuestionGroupselectedOptions: '',
            SelectedQuestionGroupId: 0,
            QuestionSubGroupDDL: [],
            QuestionSubGroupselectedOptions: '',
            SelectedQuestionSubGroupId: 0,
            currentPage: 1,
            pageSize: 10,
            questionGroupIdDD: 0,
            questionSubgroupIdDD: 0

        }
    }


    renderclinicalquestionTable = () => {
        // let QuestionGroupslist = this.state.QuestionGroups;
        // debugger
        // const { currentPage, pageSize } = this.state;
        // const currentPageRecords = QuestionGroupslist?.slice(((currentPage-1) * pageSize), (currentPage) * pageSize);
       

              
            return this.state.QuestionGroups?.resultObject?.map((c, index) => {
                return <tr key={index}>
                    <td className='fcol'>{c.questionsId}</td>
                    <td>{c.questionSectionName}</td>
                    <td>{c.questionGroupName}</td>
                    <td>{c.questionSubgroupName}</td>
                    <td className='lcol'>
                        <Link to={"/EditClinicalQuestions/" + c.questionsId + "/" + (c.questionSubgroupName === "LOCATION" ? 0 : 1)}>
                            <Button ><i className="fa fa-pencil"></i></Button>
                        </Link>
                        <Button style={{ marginLeft: 8 }} variant="danger" onClick={() => this.deleteQuestionGroup(c.questionsId)} ><i className="fa fa-trash"></i></Button>
                    </td>
                </tr>
            }) 
            // <tr>
            //     <td colSpan="4">No data to display</td>
            // </tr>

        
       
    }

    renderPagination = () => {
        debugger
        const totalRecords = (this.state.QuestionGroups?.totalCount);
        return (
            (totalRecords > 9) &&
            <Pagination
                itemClass="page-item" // add it for bootstrap 4
                linkClass="page-link" // add it for bootstrap 4
                activePage={this.state.currentPage}
                itemsCountPerPage={this.state.pageSize}
                totalItemsCount={totalRecords}
                pageRangeDisplayed={this.state.pageSize}
                // onChange={(pageNumber)=>{
                //     this.setState({
                //         currentPage:pageNumber
                //     })
                // }}
                onChange={(pageNumber) => { this.getAllQuestionGroups(pageNumber) }}

            />
        )
    }

    getQuestionGroupDDL() {
        CommonServices.getData('/DropdownList/GetQuestionGroupDDL').then((res) => {
            var copyTableData = res;
            let array = []
            copyTableData.forEach(element => {
                //console.log("printed====>>>>", element)
                //debugger;
                let obj = {
                    value: element.questionGroupId,
                    label: element.questionGroupName
                }
                array.push(obj)
            });
            this.setState({
                QuestionGroupDDL: array,
                //QuestionGroup: res
            });
        })
    }

    GetQuestionSubGroupDDL() {
        CommonServices.getData('/DropdownList/GetQuestionSubGroupDDL').then((res) => {
            var copyTableData = res;
            let array = []
            copyTableData.forEach(element => {
                // console.log("printed====>>>>", element)
                //debugger;
                let obj = {
                    value: element.questionSubgroupId,
                    label: element.questionSubgroup1
                }
                array.push(obj)
            });
            this.setState({
                QuestionSubGroupDDL: array,
                //QuestionGroup: res
            });
        })
    }

    handleSelectedQuestionGroup(data) {
        console.log('handleSelectedQuestionGroup++++====>>>>>', data)
        this.setState({
            QuestionGroupselectedOptions: data,
            SelectedQuestionGroupId: data.value
        })
        // this.getAllQuestionGroups(1);
    }

    handleSelectedQuestionSubGroup(data) {
        if (this.state.SelectedQuestionGroupId > 0) {
            console.log('GetQuestionSubGroupDDL++++====>>>>>', data)
            this.setState({
                QuestionSubGroupselectedOptions: data,
                SelectedQuestionSubGroupId: data.value
            })
            this.getAllQuestionGroups(1, data.value);
        }
        else {
            this.props.enqueueSnackbarAction(`First Select Question Group Name`, "warning");
        }

    }

    handleResetClick = () => {
        console.log('handleResetClick++++====>>>>>')
        this.setState({
            SelectedQuestionGroupId: 0,
            SelectedQuestionSubGroupId: 0,
            QuestionGroupId: 0,
            QuestionGroupName: '',
            Description: '',
            EnteredBy: '',
            QuestionGroups: [],

            QuestionGroupselectedOptions: '',

            QuestionSubGroupselectedOptions: '',
            currentPage: 1,
            pageSize: 10,
            questionGroupIdDD: 0,
            questionSubgroupIdDD: 0
        })
        this.getAllQuestionGroups(1, '');
    };
    /**
     * Render method
     */
    render() {
        return (
            <div>

                <Row>
                    <Col xs="12" md="4">
                        <Label className="label" htmlFor="">Question Group Name
                            <span className="required">*</span> :</Label>
                        <Select
                            options={this.state.QuestionGroupDDL}
                            placeholder="Question Group Name :"
                            value={this.state.QuestionGroupselectedOptions}
                            onChange={(item) => this.handleSelectedQuestionGroup(item)}
                            isSearchable={true}
                        />
                    </Col>

                    <Col xs="12" md="4">
                        <Label className="label" htmlFor="">Sub Question Group Name
                            <span className="required">*</span> :</Label>
                        <Select
                            options={this.state.QuestionSubGroupDDL}
                            placeholder="Sub Question Group Name :"
                            value={this.state.QuestionSubGroupselectedOptions}
                            onChange={(item) => this.handleSelectedQuestionSubGroup(item)}
                            isSearchable={true}
                        />
                    </Col>
                    <Col xs="12" md="4">
                        <Button color="primary" onClick={() => this.handleResetClick()}
                            style={{ textTransform: "uppercase" }}>Reset
                        </Button>
                    </Col>
                </Row>

                <Link to={'/AddClinicalQuestions'} className="nav-link lnkbtn" >
                    <Button color="primary"
                        style={{ textTransform: "uppercase" }}
                    > <i className="fa fa-plus"></i> &nbsp;
                        Add Questions
                    </Button>
                </Link>


                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th className='fcol'>#</th>
                            <th>Existance Name</th>
                            <th>Question Group Name</th>
                            <th>Sub Question Group Name</th>

                            <th className='lcol'>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.renderclinicalquestionTable()
                        }
                    </tbody>
                </Table>
                <div responsive="true" className='pgdiv'>
                    {this.renderPagination()}
                </div>


            </div >
        )
    }
    /**
     * componentDidMount lifecycle hook
     */
    async componentDidMount() {
        await this.getAllQuestionGroups(1);
        await this.getQuestionGroupDDL();
        await this.GetQuestionSubGroupDDL();
    }

    /**
     * Method to get all question groups
     */
    getAllQuestionGroups(pageNumber, SubgroupId) {
        console.log('getAllQuestionGroups++++====>>>>>', this.state)
        this.setState({
            QuestionGroups: []
        })
        console.log(`/Pagination/GetClinicalQuestionBodyPart?${this.state.SelectedQuestionGroupId ? `questionGroupId=${this.state.SelectedQuestionGroupId}&` : ''}${this.state.SelectedQuestionSubGroupId ? `questionSubgroupId=${this.state.SelectedQuestionSubGroupId}&` : ''}PageNumber=${pageNumber}&PageSize=${this.state.pageSize}`)
        // CommonServices.getData(`/clinicalquestions/GetClinicalQuestionBodyPartList`).then((result) => {
        CommonServices.getData(`/Pagination/GetClinicalQuestionBodyPart?${this.state.SelectedQuestionGroupId ? `questionGroupId=${this.state.SelectedQuestionGroupId}&` : ''}${SubgroupId ? `questionSubgroupId=${SubgroupId}&` : ''}PageNumber=${pageNumber}&PageSize=${this.state.pageSize}`).then((result) => {
            this.state.currentPage = pageNumber
            debugger
            console.log("QuestionGroups====================", result);
            this.setState({
                QuestionGroups: result
            })

        });
    }
    /**
     * Method is used to delete question group.
     * @param {delete question group} QuestionGroupId 
     */
    deleteQuestionGroup(questionsId) {
        // var questiongroupModel = {
        //     QuestionGroupId: questionsId,
        //     QuestionGroupName: "test",
        //     DeleteStatus: true
        // };
        console.log("questionsId======++++", questionsId);
        debugger;
        CommonServices.postData({}, `/clinicalquestions/DeleteQuestionBodyPartData?questionId=${questionsId}`).then((result) => {
            console.log(result);
            alert(result.data);
            this.getAllQuestionGroups(this.state.currentPage);
        });
    }
}
export default connect(null, { enqueueSnackbarAction, closeSnackbar })(ListClinicalQuestionsComponent)