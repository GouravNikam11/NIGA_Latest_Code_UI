import React, { Component } from 'react';
import { Table, Col, Button, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import CommonServices from '../../Services/CommonServices';
import { connect } from 'react-redux';
import {
    enqueueSnackbar as enqueueSnackbarAction,
    closeSnackbar
} from '../../store/actions/notification';
import Pagination from 'react-js-pagination';
export class ListSubQuestionGroup extends Component {
    constructor(props) {
        super(props)

        this.state = {
            questionSubgroupId: 0,
            questionSubgroup1: '',
            QuestionGroupName: '',
            Description: '',
            QuestionGroupList: [],
            EnteredBy: 'Admin',
            DeleteStatus: false,
            currentPage: 1,
            pageSize: 10
        }
    }

    rendersubquestionTable = () => {
        // debugger
        // let QuestionGroupList = this.state.QuestionGroupList;
        // const { currentPage, pageSize } = this.state;
        // const currentPageRecords = QuestionGroupList.slice(((currentPage-1) * pageSize), (currentPage) * pageSize);
       
        return this.state.QuestionGroupList?.resultObject?.map((q, index) => {
            return <tr key={index}>
                <td className='fcol'>{q.questionSubgroupId}</td>
                <td>{q.questionGroupName}</td>
                <td>{q.questionSubGroupName}</td>
                <td>{q.description}</td>
                <td className='lcol'>
                    <Link to={"/EditSubQuestionGroup/" + q.questionSubgroupId}>
                        <Button onClick={() => this.editQuestionGroup(q.questionSubgroupId)}>
                            <i className="fa fa-pencil"></i>  </Button>
                    </Link>
                    <Button style={{ marginLeft: 8 }} variant="danger" onClick={() => this.deleteQuestionGroup(q.questionSubgroupId)} >
                        <i className="fa fa-trash"></i>  </Button>
                </td>
            </tr>
        })
    }

    renderPagination = () => {
        debugger
        const totalRecords = (this.state.QuestionGroupList.totalCount);
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
                onChange={(pageNumber) => { this.getSubQuestionGroup(pageNumber) }}

            />
        )
    }




    render() {
        return (
            <div>

                <Link to={'/AddSubQuestionGroup'} className="nav-link lnkbtn">
                    <Button color="primary"
                        style={{ textTransform: "uppercase" }}
                    > <i className="fa fa-plus"></i> &nbsp;
                        Add Sub Question Group
                    </Button>
                </Link>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th className='fcol'>#</th>
                             <th>Question Group Name</th>
                            <th>Sub Question Group Name</th>
                            <th>Description</th>
                            <th className='lcol'>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.rendersubquestionTable()
                        }
                    </tbody>
                </Table> 
                <div responsive="true" className='pgdiv'>
                    {this.renderPagination()}
                </div>     
            </div>
        );
    }

    componentDidMount() {
        this.getSubQuestionGroup(1);

        console.log("**********API CALL**************")
    }

    getSubQuestionGroup(pageNumber) {
        // CommonServices.getData(`/QuestionSubGroup/GetQuestionSubGroup`).then((temp) => {
            CommonServices.getData(`/Pagination/GetQuestionSubGroup?PageNumber=${pageNumber}&PageSize=${this.state.pageSize}`).then((temp) => {
                this.state.currentPage = pageNumber

            console.log("temp=====>>>>>", temp);
            debugger;
            this.setState({
                QuestionGroupList: temp,

            })
        });
    }

    editQuestionGroup(questionSubgroupId) {
        debugger;

        CommonServices.getDataById(questionSubgroupId, `/QuestionSubGroup`).then((res) => {
            this.setState({
                questionSubgroupId: res.questionSubgroupId,
                questionSubgroup1: res.questionSubGroupName,
                Description: res.description,
                EnteredBy: '',
                DeleteStatus: false
            })
        });
    }

    deleteQuestionGroup(questionSubgroupId) {
        debugger;
        this.setState({
            "questionSubgroupId": parseInt(questionSubgroupId),
            "questionSubgroup1": "jjc",
            "description": "mcmcm",
            "deleteStatus": true
        }, function () {
            console.log(this.state)
            debugger;
            CommonServices.postData( this.state,`/QuestionSubGroup/DeleteQuestionSubGroup`).then((res) => {
                this.props.enqueueSnackbarAction(res.data, "warning");
                this.getSubQuestionGroup(this.state.currentPage);

                this.setState({
                    "questionSubgroupId": parseInt(questionSubgroupId),
                    "questionSubgroup1": "jjc",
                    "description": "mcmcm",
                    "deleteStatus": true
                })
            });
        });
    }

    
}
export default connect(null, { enqueueSnackbarAction, closeSnackbar })(ListSubQuestionGroup)
