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
class ListQualificationComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            qalificationId: 0,
            QualificationName: '',
            QualificationAlias: '',
            Description: '',
            DegreeLevel: '',
            QualificationList: [],
            EnteredBy: 'Admin',
            DeleteStatus: false,
            currentPage: 1,
            pageSize: 10

        }
    }

    renderqualificationTable = () => {
        // debugger
        // let QualificationList = this.state.QualificationList;
        // const { currentPage, pageSize } = this.state;
        // const currentPageRecords = QualificationList.slice(((currentPage-1) * pageSize), (currentPage) * pageSize);
       
        return this.state.QualificationList?.resultObject?.map((q, index) => {
            return <tr key={index}>
                <td className='fcol'>{q.qualificationId}</td>
                <td>{q.qualificationName}</td>
                <td>{q.qualificationAlias}</td>
                <td>{q.description}</td>
                <td>{q.degreeLevel}</td>
                <td className='lcol'>
                    <Link to={"/EditQualification/" + q.qualificationId}>
                        <Button onClick={() => this.editQualification(q.qualificationId)} ><i className="fa fa-pencil"></i></Button> 
                    </Link>
                    <Button style={{marginLeft:8}} variant="danger" onClick={() => this.deleteQualification(q.qualificationId)} ><i className="fa fa-trash"></i> </Button>
                </td>
            </tr>
        })
    }

    renderPagination = () => {
        debugger
        const totalRecords = (this.state.QualificationList?.totalCount);
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
                onChange={(pageNumber) => { this.getQualification(pageNumber) }}

            />
        )
    }



    render() {
        return (
            <div>

                <Link to={'/AddQualification'} className="nav-link lnkbtn" >
                    <Button color="primary"
                    style={{ textTransform: "uppercase" }}
                    > <i className="fa fa-plus"></i> &nbsp; 
                        Add Qualification
                    </Button>
                </Link>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th className='fcol'>#</th>
                            <th>Qualification Name</th>
                            <th>Qualification Alias</th>
                            <th>Description</th>
                            <th>Degree Level</th>
                            <th className='lcol'>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.renderqualificationTable()
                        }
                    </tbody>
                </Table>
                <div responsive="true" className='pgdiv'>
                    {this.renderPagination()}
                </div>
            </div >
        );
    }

    componentDidMount() {
        this.getQualification(1);
        console.log("**********API CALL**************")

    }

    getQualification(pageNumber) {
        // CommonServices.getData(`/qualification/GetQualifications`).then((temp) => {
            CommonServices.getData(`/Pagination/GetQualifications?PageNumber=${pageNumber}&PageSize=${this.state.pageSize}`).then((temp) => {
                this.state.currentPage = pageNumber
            console.log(temp);
            debugger;
            this.setState({
                QualificationList: temp,
            })
        });
    }

    editQualification(qualificationId) {
        CommonServices.getDataById(qualificationId, `/qualification`).then((res) => {
            this.setState({
                qualificationId: res.qualificationId,
                QualificationName: res.qualificationName,
                QualificationAlias: res.qualificationAlias,
                Description: res.description,
                DegreeLevel: res.degreeLevel,
                EnteredBy: 'Admin',
                DeleteStatus: false
            })
        });
    }

    deleteQualification(id) {
        debugger;
        this.setState({
            qualificationId: id,
            QualificationName: "jdhf",
            QualificationAlias: "jhvjvc",
            Description: "mcmcm",
            DegreeLevel: "jjv",
            EnteredBy: 'Admin',
            DeleteStatus: true
        }, function () {
            console.log(this.state)
            debugger;
            CommonServices.postData(this.state, `/qualification/DeleteQualification`).then((res) => {
                this.props.enqueueSnackbarAction(res.data, "warning");
                this.getQualification(this.state.currentPage);

                this.setState({
                    qualificationId: id,
                    QualificationName: "",
                    QualificationAlias: "",
                    Description: "",
                    DegreeLevel: "",
                    EnteredBy: 'Admin',
                    DeleteStatus: true
                })
            });
        });
    }
}
export default connect(null, { enqueueSnackbarAction, closeSnackbar })(ListQualificationComponent)
