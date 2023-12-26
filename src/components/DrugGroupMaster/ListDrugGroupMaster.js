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
class ListDrugGroupMaster extends Component {
    constructor(props) {
        super(props)

        this.state = {
            DrugGroupMasterList: [],
            currentPage: 1,
            pageSize: 10,

        }
    }

    componentDidMount() {
        this.getDrugGroupMaster(1)
    }

    getDrugGroupMaster(pageNumber) {
        // CommonServices.getData(`/Pagination/GetDrugGroup`).then((temp) => {
            CommonServices.getData(`/Pagination/GetDrugGroup?PageNumber=${pageNumber}&PageSize=${this.state.pageSize}`).then((temp) => {
                this.state.currentPage = pageNumber
            this.setState({
                DrugGroupMasterList: temp,
            })
        });
    }


    renderDrugGroupMasterTable = () => {
        // debugger
        // let DrugGroupMasterList = this.state.DrugGroupMasterList.;
        // const { currentPage, pageSize } = this.state;
        // const currentPageRecords = DrugGroupMasterList.slice(((currentPage - 1) * pageSize), (currentPage) * pageSize);

        return this.state.DrugGroupMasterList?.resultObject?.map((s, index) => {
            return <tr key={index}>
                <td className='fcol'>{s.drugGroupId}</td>
                <td>{s.drugGroupName}</td>
                <td>{s.drugSystemName}</td>
                <td className='lcol'>
                    <Link to={"/EditDrugGroupMaster/" + s.drugGroupId}><Button> <i className="fa fa-pencil"></i></Button></Link>
                    <Button style={{ marginLeft: 8 }} variant="danger" onClick={() => this.deleteDrugGroupMaster(s.drugGroupId)} ><i className="fa fa-trash"></i></Button>
                </td>
            </tr>
        })
    }



    renderPagination = () => {
        debugger
        const totalRecords = (this.state.DrugGroupMasterList.totalCount);
        return (
            (totalRecords > 9) &&
            <Pagination
                itemClass="page-item" // add it for bootstrap 4
                linkClass="page-link" // add it for bootstrap 4
                activePage={this.state.currentPage}
                itemsCountPerPage={this.state.pageSize}
                totalItemsCount={totalRecords}
                pageRangeDisplayed={this.state.pageSize}
                // onChange={(pageNumber) => {
                //     this.setState({
                //         currentPage: pageNumber
                //     })
                // }}
                onChange={(pageNumber) => { this.getDrugGroupMaster(pageNumber) }}
            />
        )
    }


    deleteDrugGroupMaster(id) {
        CommonServices.postData({ drugGroupId: id }, `/DrugGroup/DeleteDrugGroup`).then((res) => {
            debugger
            console.log('props=======', this.props)
            this.props.enqueueSnackbarAction("Record deleted successfully.", "warning");
            this.getDrugGroupMaster(this.state.currentPage);
        });
    }


    render() {
        return (
            <div>

                <Link to={'/AddDrugGroupMaster'} className="nav-link lnkbtn" >
                    <Button color="primary"
                        style={{ textTransform: "uppercase" }}
                    > <i className="fa fa-plus"></i> &nbsp;
                        Add Drug Group
                    </Button>
                </Link>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th className='fcol'>Sr.No</th>
                            <th>Drug Group Name</th>
                            <th>Drug System Name</th>
                            <th className='lcol'>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.renderDrugGroupMasterTable()
                        }
                    </tbody>
                </Table>

                <div responsive="true" className='pgdiv'>
                    {this.renderPagination()}
                </div>
            </div >
        );
    }



}
export default connect(null, { enqueueSnackbarAction, closeSnackbar })(ListDrugGroupMaster)
