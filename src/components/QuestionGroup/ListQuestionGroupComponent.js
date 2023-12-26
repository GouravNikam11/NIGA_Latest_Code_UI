import React, { Component } from 'react';
import { Table, Col, Button, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import CommonServices from '../../Services/CommonServices';
import { connect } from 'react-redux';
import {
    enqueueSnackbar as enqueueSnackbarAction,
    closeSnackbar
} from '../../store/actions/notification';
import Pagination from "react-js-pagination";

export class ListQuestionGroupComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            questionGroupId: 0,
            QuestionGroupName: '',
            Description: '',
            QuestionGroupList: [],
            EnteredBy: 'Admin',
            DeleteStatus: false,
            currentPage: 1,
            pageSize: 10
        }
    }



    renderquestiongroupTable = () => {
        // let QuestionGroupList = this.state.QuestionGroupList;
        // const { currentPage, pageSize } = this.state;
        // const currentPageRecords = QuestionGroupList.slice(((currentPage-1) * pageSize), (currentPage) * pageSize);
       
        return this.state.QuestionGroupList?.resultObject?.map((q, index) => {
            return <tr key={index}>
                <td className='fcol'>{q.questionGroupId}</td>
                <td>{q.questionGroupName}</td>
                <td>{q.questionSectionName}</td>
                <td>{q.description}</td>
                <td className='lcol'>
                    <Link to={"/EditQuestionGroup/" + q.questionGroupId+"/"+q.questionSectionId}>
                    <Button onClick={() => this.editQuestionGroup(q.questionGroupId)}>  
                    <i className="fa fa-pencil"></i>  </Button> 
                    </Link>
                    <Button style={{marginLeft:8}} variant="danger" onClick={() => this.deleteQuestionGroup(q.questionGroupId)} >  
                    <i className="fa fa-trash"></i>  </Button>
                </td>
            </tr>
        })
    }

    renderPagination = () => {
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
                onChange={(pageNumber) => { this.getQuestionGroup(pageNumber) }}

            />
        )
    }


    render() {
        return (
            <div>

                <Link to={'/AddQuestionGroup'} className="nav-link lnkbtn" >
                    <Button color="primary"
                    style={{ textTransform: "uppercase" }}
                    > <i className="fa fa-plus"></i> &nbsp; 
                        Add Question Group
                    </Button>
                </Link>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th className='fcol'>#</th>
                            <th>Question Group Name</th>
                            <th>Existance Name</th>
                            <th>Description</th>
                            <th className='lcol'>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.renderquestiongroupTable()
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
        this.getQuestionGroup(1);
       
        console.log("**********API CALL**************")
    }

    getQuestionGroup(pageNumber) {
        // CommonServices.getData(`/questiongroup/GetQuestionGroupExistance`).then((temp) => {
            CommonServices.getData(`/Pagination/GetQuestionGroupExistance?PageNumber=${pageNumber}&PageSize=${this.state.pageSize}`).then((temp) => {
                this.state.currentPage = pageNumber

            console.log("temp=====>>>>>",temp);
            debugger;
            this.setState({
                QuestionGroupList: temp,
               
            })
        });
    }

    editQuestionGroup(questiongroupId) {
        debugger;

        CommonServices.getDataById(questiongroupId, `/questiongroup`).then((res) => {
            this.setState({
                questionGroupId: res.questionGroupId,
                QuestionGroupName: res.questionGroupName,
                Description: res.description,
                EnteredBy: 'Admin',
                
                DeleteStatus: false
            })
        });
    }

    deleteQuestionGroup(id) {
        debugger;
        this.setState({
            questionGroupId: id,
            QuestionGroupName: "sf",
            Description: "mcmcm",
            EnteredBy: 'Admin',
            DeleteStatus: true
        }, function () {
            console.log(this.state)
            debugger;
            CommonServices.postData(this.state, `/questiongroup/DeleteQuestionGroup`).then((res) => {
                this.props.enqueueSnackbarAction(res.data, "warning");
                this.getQuestionGroup(this.state.currentPage);
                this.props.history.push('/ListQuestionGroup');

                this.setState({
                    questionGroupId: id,
                    QuestionGroupName: "",
                    Description: "",
                    EnteredBy: 'Admin',
                    DeleteStatus: true
                })
            });
        });
    }
}
export default connect(null, { enqueueSnackbarAction, closeSnackbar })(ListQuestionGroupComponent)
