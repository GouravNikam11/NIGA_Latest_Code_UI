
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

export class ListQuestionSectionComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            questionSectionId: 0,
            QuestionSectionName: '',
            Description: '',
            QuestionSectionList: [],
            EnteredBy: 'Admin',
            DeleteStatus: false,
            currentPage: 1,
            pageSize: 10,
        }
    }

    renderquestionsectionTable = () => {
        // debugger
        // let QuestionSectionList = this.state.QuestionSectionList;
        // const { currentPage, pageSize } = this.state;
        // const currentPageRecords = QuestionSectionList.slice(((currentPage-1) * pageSize), (currentPage) * pageSize);
       
        return this.state.QuestionSectionList?.resultObject?.map((s, index) => {
            return <tr key={index}>
                <td className='fcol'>{s.questionSectionId}</td>
                <td>{s.questionSectionName}</td>
                <td>{s.description}</td>
                <td className='lcol'>
                    <Link to={"/EditQuestionSection/" + s.questionSectionId}>
                        <Button  onClick={() => this.editQuestionSection(s.questionSectionId)} ><i className="fa fa-pencil"></i></Button>
                    </Link>
                    <Button style={{marginLeft:8}} variant="danger" onClick={() => this.deleteQuestionSection(s.questionSectionId)} ><i className="fa fa-trash"></i></Button>
                </td>
            </tr>
        })
    }

    renderPagination = () => {
        debugger
        const totalRecords = (this.state.QuestionSectionList.totalCount);
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
                onChange={(pageNumber) => { this.getQuestionSection(pageNumber) }}

            />
        )
    }

    render() {
        return (
            <div>

                <Link to={'/AddQuestionSection'} className="nav-link lnkbtn" >
                    <Button color="primary"
                        style={{ textTransform: "uppercase" }}
                    > <i className="fa fa-plus"></i> &nbsp;
                        Add Existance
                    </Button>
                </Link>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th className='fcol'>Sr.No</th>
                            <th>Existance Name</th>
                            <th>Description</th>
                            <th className='lcol'>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.renderquestionsectionTable()
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

        this.getQuestionSection(1);

    }
    getQuestionSection(pageNumber) {
        debugger;
        // CommonServices.getData(`/questionsection`).then((temp) => {
            CommonServices.getData(`/Pagination/GetQuestionSections?PageNumber=${pageNumber}&PageSize=${this.state.pageSize}`).then((temp) => {
                this.state.currentPage = pageNumber

            console.log(temp);
            debugger;
            this.setState({
                QuestionSectionList: temp,
            })
        });
    }

    editQuestionSection(questionsectionId) {
        debugger;
        CommonServices.getDataById(questionsectionId, `/questionsection`).then((res) => {
            debugger;
            this.setState({

                questionSectionId: res.questionSectionId,
                QuestionSectionName: res.questionSectionName,
                Description: res.description,
                EnteredBy: 'Admin',
                DeleteStatus: false
            })
        });

    }

    deleteQuestionSection(id) {
        debugger;
        this.setState({
            questionSectionId: id,
            QuestionSectionName: "jjc",
            Description: "mcmcm",
            EnteredBy: 'Admin',
            DeleteStatus: true
        }, function () {
            console.log(this.state)
            debugger;
            CommonServices.postData(this.state, `/questionsection/DeleteQuestionSection`).then((res) => {
                this.props.enqueueSnackbarAction("Record deleted successfully.", "warning");
                this.getQuestionSection(this.state.currentPage);

                this.setState({
                    questionSectionId: id,
                    QuestionSectionName: "",
                    Description: "",
                    EnteredBy: 'Admin',
                    DeleteStatus: true
                })
            });
        });
    }
}
export default connect(null, { enqueueSnackbarAction, closeSnackbar })(ListQuestionSectionComponent)
