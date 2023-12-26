import React, { Component } from 'react';
import { Table, Col, Button, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import CommonServices from '../../Services/CommonServices';
import Pagination from "react-js-pagination";
import { connect } from 'react-redux';
import '../../components/CommanStyle.css';
import {
    enqueueSnackbar as enqueueSnackbarAction,
    closeSnackbar
} from '../../store/actions/notification';
export class ListLabsAndImaging extends Component {

    constructor(props) {
        super(props);
        this.state = {
            patientLabTestId: 0,
            labTestName: '',
            GetLabTest: [],
            description: '',
            currentPage: 1,
            pageSize: 10
        }
    }

    renderpathologyTable = () => {
        // let GetLabTest = this.state.GetLabTest;
        // const { currentPage, pageSize } = this.state;
        // const currentPageRecords = GetLabTest.slice(((currentPage - 1) * pageSize), (currentPage) * pageSize);

        return  this.state.GetLabTest?.resultObject?.map((d, index) => {
            return <tr key={index}>
                <td className='fcol'>{d.patientLabTestId}</td>
                <td >{d.labTestName}</td>
                <td>{d.description}</td>
                <td className='lcol'>
                    <Link to={"/EditLabsAndImaging/" + d.patientLabTestId}>
                        <Button onClick={() => this.editPathology(d.patientLabTestId)} ><i className="fa fa-pencil"></i></Button>
                    </Link>
                    <Button style={{ marginLeft: 8 }} variant="danger" onClick={() => this.DeleteLabsAndImaging(d.patientLabTestId)} ><i className="fa fa-trash"></i></Button>
                </td>
            </tr>
        })
    }

    renderPagination = () => {
        const totalRecords = (this.state.GetLabTest?.totalCount);
        return (
            (totalRecords > 9) &&
            <Pagination
                itemClass="page-item"
                linkClass="page-link"
                activePage={this.state.currentPage}
                itemsCountPerPage={this.state.pageSize}
                totalItemsCount={totalRecords}
                pageRangeDisplayed={this.state.pageSize}
                // onChange={(pageNumber) => {
                //     this.setState({
                //         currentPage: pageNumber
                //     })
                // }}
                onChange={(pageNumber) => { this.GetLabTest(pageNumber) }}

            />
        )
    }


    render() {
        return (
            <div>

                <Link to={'/AddLabsAndImaging'} className="nav-link lnkbtn" >
                    <Button color="primary"
                        style={{ textTransform: "uppercase" }}
                    > <i className="fa fa-plus"></i> &nbsp;
                        Add Labs & Imaging
                    </Button>
                </Link>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th className='fcol'>#</th>
                            <th>Test Name</th>
                            <th>Description</th>
                            <th className='lcol'>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.renderpathologyTable()
                        }
                    </tbody>
                </Table>
                <div responsive="true" className='pgdiv'>
                    {this.renderPagination()}
                </div>
            </div >
        );
    }
    /**
    * Created Date     :   19 Des 2019
    * purpose          :   To refresh list of diagnosis master records
    * Author           :   
    */
    GetLabTest(pageNumber) {
        // CommonServices.getData(`/PatientLabTest/GetPatientLabTest`).then((temp) => {
            CommonServices.getData(`/Pagination/GetPatientLabTests?PageNumber=${pageNumber}&PageSize=${this.state.pageSize}`).then((temp) => {
                this.state.currentPage = pageNumber
            this.setState({
                GetLabTest: temp
            })
        })
    }

    componentDidMount() {
        this.GetLabTest(1);
    }

    /**
     * Created Date     :   19 Dec 2019.
     * Purpose          :   Get diagnosis record for edit.
     * Author           :   
     */
    editPathology(Id) {
        CommonServices.getDataById(Id, `/PatientLabTest/GetPatientLabTestById`).then((res) => {
            this.setState({
                patientLabTestId: res.patientLabTestId,
                labTestName: res.labTestName,
                description: res.description,
                // deleteStatus:false


            })
        });
    }

    DeleteLabsAndImaging(id) {
        debugger;
        CommonServices.postData({}, `/PatientLabTest/DeletePatientLabTest/` + id).then((res) => {
            this.props.enqueueSnackbarAction(res.data, "warning");
            this.GetLabTest(this.state.currentPage);
        });
    }
}

export default connect(null, { enqueueSnackbarAction, closeSnackbar })(ListLabsAndImaging)
