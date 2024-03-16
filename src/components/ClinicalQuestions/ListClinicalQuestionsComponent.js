import React, { Component } from 'react';
import { Table, Col, Button, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { components } from 'react-select';
import Pagination from 'react-js-pagination';
import CommonServices from '../../Services/CommonServices';
/**
 * Class is used to show list of clinical questions.
 */
export class ListClinicalQuestionsComponent extends Component {
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
            currentPage: 1,
            pageSize: 10
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
                <td  className='lcol'>
                    <Link to={"/EditClinicalQuestions/" + c.questionsId + "/" + (c.questionSubgroupName === "LOCATION" ? 0 : 1)}>
                        <Button ><i className="fa fa-pencil"></i></Button> 
                    </Link>
                    <Button style={{marginLeft:8}} variant="danger" onClick={() => this.deleteQuestionGroup(c.questionsId)} ><i className="fa fa-trash"></i></Button>
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
            (totalRecords>9)&&
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


    /**
     * Render method
     */
    render() {
        return (
            <div>
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
    componentDidMount() {
        this.getAllQuestionGroups(1);
    }

    /**
     * Method to get all question groups
     */
    getAllQuestionGroups(pageNumber) {
        // CommonServices.getData(`/clinicalquestions/GetClinicalQuestionBodyPartList`).then((result) => {
            CommonServices.getData(`/Pagination/GetClinicalQuestionBodyPart?PageNumber=${pageNumber}&PageSize=${this.state.pageSize}`).then((result) => {
                this.state.currentPage = pageNumber
            debugger
            console.log("QuestionGroups====================",result);
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
       console.log("questionsId======++++",questionsId);
        debugger;
        CommonServices.postData({}, `/clinicalquestions/DeleteQuestionBodyPartData?questionId=${questionsId}`).then((result) => {
            console.log(result);
            alert(result.data);
            this.getAllQuestionGroups(this.state.currentPage);
        });
    }
}