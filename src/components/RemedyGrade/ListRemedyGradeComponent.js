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
class ListRemedyGradeComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            gradeId: 0,
            GradeNo: '',
            Description: '',
            FontName: '',
            FontStyle: '',
            FontColor: '',
            GradeList: [],
            EnteredBy: 'Admin',
            DeleteStatus: false,
            currentPage: 1,
            pageSize: 10
        }
    }


    renderRemedygradeTable = () => {
        debugger
        let GradeList = this.state.GradeList;
        const { currentPage, pageSize } = this.state;
        const currentPageRecords = GradeList.slice(((currentPage-1) * pageSize), (currentPage) * pageSize);
       
        return currentPageRecords.map((g, index) => {
            return <tr key={index}>
                <td className='fcol'>{g.gradeId}</td>
                <td>{g.gradeNo}</td>
                <td>{g.description}</td>
                <td>{g.fontName}</td>
                <td>{g.fontStyle}</td>
                <td>{g.fontColor}</td>
                <td className='lcol'>
                    <Link to={"/EditRemedyGrade/" + g.gradeId}>
                        <Button onClick={() => this.editRemedyGrade(g.gradeId)} ><i className="fa fa-pencil"></i> </Button> 
                    </Link>
                    <Button style={{marginLeft:8}} variant="danger" onClick={() => this.deleteRemedyGrade(g.gradeId)} ><i className="fa fa-trash"></i></Button>
                </td>
            </tr>
        })
    }

    renderPagination = () => {
        debugger
        const totalRecords = (this.state.GradeList.length);
        return (
            (totalRecords>9)&&
            <Pagination
                itemClass="page-item" // add it for bootstrap 4
                linkClass="page-link" // add it for bootstrap 4
                activePage={this.state.currentPage}
                itemsCountPerPage={this.state.pageSize}
                totalItemsCount={totalRecords}
                pageRangeDisplayed={this.state.pageSize}
                onChange={(pageNumber)=>{
                    this.setState({
                        currentPage:pageNumber
                    })
                }}
            />
        )
    }






    render() {
        return (
            <div>

                <Link to={'/AddRemedyGrade'} className="nav-link lnkbtn" >
                    <Button color="primary"
                    style={{ textTransform: "uppercase" }}
                    > <i className="fa fa-plus"></i> &nbsp; 
                        Add Remedy Grade
                    </Button>
                </Link>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th className='fcol'>#</th>
                            <th>Grade No</th>
                            <th>Description</th>
                            <th>Font Name</th>
                            <th>Font Style</th>
                            <th>Font Color</th>
                            <th className='lcol'>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.renderRemedygradeTable()
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
        this.getRemedyGrade();
        console.log("**********API CALL**************")

    }

    getRemedyGrade() {
        CommonServices.getData(`/remedygrade/GetRemedyGrades`).then((temp) => {
            console.log(temp);
            debugger;
            this.setState({
                GradeList: temp,
            })
        });
    }

    editRemedyGrade(gradeId) {
        debugger;

        CommonServices.getDataById(gradeId, `/remedygrade`).then((res) => {
            this.setState({
                gradeId: res.gradeId,
                GradeNo: res.intensityNo,
                Description: res.description,
                FontName: res.fontName,
                FontStyle: res.fontStyle,
                FontColor: res.fontColor,
                EnteredBy: 'Admin',
                DeleteStatus: false
            })
        });

    }

    deleteRemedyGrade(id) {
        debugger;
        this.setState({
            gradeId: id,
            GradeNo: 4,
            Description: "mcmcm",
            FontName: "fh",
            FontStyle: "jsjcj",
            FontColor: "ncnc",
            EnteredBy: 'Admin',
            DeleteStatus: true
        }, function () {
            console.log(this.state)
            debugger;
            CommonServices.postData(this.state, `/remedygrade/DeleteRemedyGrade`).then((res) => {
                this.props.enqueueSnackbarAction(res.data, "warning");
                this.getRemedyGrade();

                this.setState({
                    gradeId: id,
                    GradeNo: "",
                    Description: "",
                    FontName: "",
                    FontStyle: "",
                    FontColor: "",
                    EnteredBy: 'Admin',
                    DeleteStatus: true
                })
            });
        });
    }
}

export default connect(null, { enqueueSnackbarAction, closeSnackbar })(ListRemedyGradeComponent)
