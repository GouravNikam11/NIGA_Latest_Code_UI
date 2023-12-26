import React, { Component } from 'react';
import { Table, Col, Button, Form,Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import CommonServices from '../../Services/CommonServices';
import { connect } from 'react-redux';
import {
    enqueueSnackbar as enqueueSnackbarAction,
    closeSnackbar
} from '../../store/actions/notification';
import Pagination from "react-js-pagination";
class ListDrugSystem extends Component {
    constructor(props) {
        super(props)

        this.state = {
            DrugSystemList: [],
            currentPage: 1,
            pageSize: 10,
        }
    }

    componentDidMount() {
        debugger
        this.getDrugSystem(1)
    }

    getDrugSystem(pageNumber) {
        CommonServices.getData(`/Pagination/GetDrugSystem?PageNumber=${pageNumber}&PageSize=${this.state.pageSize}`).then((temp) => {
            this.state.currentPage = pageNumber
            this.setState({
                DrugSystemList: temp,
            })
        });
    }

    renderDrugSystemTable = () => {
        debugger
        // let DrugSystemList = this.state.DrugSystemList;
        // const { currentPage, pageSize } = this.state;
        // const currentPageRecords = DrugSystemList.slice(((currentPage - 1) * pageSize), (currentPage) * pageSize);

        // return this.state.DrugSystemList?.resultObject?.map((s, index) => {
        //      <tr key={index}>
        //         <td className='fcol'>{s.drugSystemId}</td>
        //         <td>{s.drugSystemName}</td>
        //         <td className='lcol'>
        //             <Link to={"/EditDrugSystem/" + s.drugSystemId}><Button> <i className="fa fa-pencil"></i></Button></Link>
        //             <Button style={{ marginLeft: 8 }} variant="danger" onClick={() => this.deleteDrugSystem(s.drugSystemId)} ><i className="fa fa-trash"></i></Button>
        //         </td>
        //     </tr>
        // })

        if (this.state.DrugSystemList.resultObject?.length === 0) {
            return (
                <tr>
                    <td colSpan={7} style={{ textAlign: 'center' }}>
                        <Row>
                            <Col>
                                <label>No record found.</label>
                            </Col>
                        </Row>
                    </td>
                </tr>
            );
        }

        return this.state.DrugSystemList?.resultObject?.map((s, index) => (
             <tr key={index}>
                <td className='fcol'>{s.drugSystemId}</td>
                <td>{s.drugSystemName}</td>
                <td className='lcol'>
                    <Link to={"/EditDrugSystem/" + s.drugSystemId}><Button> <i className="fa fa-pencil"></i></Button></Link>
                    <Button style={{ marginLeft: 8 }} variant="danger" onClick={() => this.deleteDrugSystem(s.drugSystemId)} ><i className="fa fa-trash"></i></Button>
                </td>
            </tr>
        ));
    }



    renderPagination = () => {
        debugger
        const totalRecords = (this.state.DrugSystemList.totalCount);
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
                onChange={(pageNumber) => { this.getDrugSystem(pageNumber) }}

            />
        )
    }


    render() {
        return (
            <div>

                <Link to={'/AddDrugSystem'} className="nav-link lnkbtn" >
                    <Button color="primary"
                        style={{ textTransform: "uppercase" }}
                    > <i className="fa fa-plus"></i> &nbsp;
                        Add Drug System
                    </Button>
                </Link>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th className='fcol'>Sr.No</th>
                            <th>Drug System Name</th>
                            <th className='lcol'>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.renderDrugSystemTable()
                        }
                    </tbody>
                </Table>
                <div responsive="true" className='pgdiv'>
                    {this.renderPagination()}
                </div>
            </div>
        );
    }



    deleteDrugSystem(id) {
        CommonServices.postData({drugSystemId:id}, `/DrugSystem/DeleteDrugSystem`).then((res) => {
            debugger
            console.log('props=======',this.props)
            this.props.enqueueSnackbarAction("Record deleted successfully.", "warning");
            this.getDrugSystem(this.state.currentPage);
        });
    }


}
export default connect(null, { enqueueSnackbarAction, closeSnackbar })(ListDrugSystem)
