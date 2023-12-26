import React, { Component } from 'react';
import { Table, Col, Button, Form ,Row} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import CommonServices from '../../Services/CommonServices';
import { connect } from 'react-redux';
import {
    enqueueSnackbar as enqueueSnackbarAction,
    closeSnackbar
} from '../../store/actions/notification';
import Pagination from "react-js-pagination";
import { Input } from 'reactstrap';
class ListAllopathicDrugMaster extends Component {
    constructor(props) {
        super(props)

        this.state = {
            AllopathicDrugMasterList: [],
            currentPage: 1,
            pageSize: 10,
            searchQuery: ''
        }
        this.handleChangeforsearch = this.handleChangeforsearch.bind(this);
    }


    componentDidMount() {
        this.getAllopathicDrugMaster(1);
    }

    getAllopathicDrugMaster(pageNumber,searchQuery) {
        debugger
        CommonServices.getData(`/Pagination/GetAllopathicDrug?${searchQuery ? `&queryString=${searchQuery}` : ''}&PageNumber=${pageNumber}&PageSize=${this.state.pageSize}`).then((temp) => {  
        this.state.currentPage = pageNumber
        console.log(temp);
            debugger;
            this.setState({
                AllopathicDrugMasterList: temp,
            })
        });
    }


    // renderAllopathicDrugMasterTable = () => {
    //     debugger
    //     let AllopathicDrugMasterList = this.state.AllopathicDrugMasterList;
    //     const { currentPage, pageSize } = this.state;
    //     const currentPageRecords = AllopathicDrugMasterList.slice(((currentPage - 1) * pageSize), (currentPage) * pageSize);


    //     return currentPageRecords.map((s, index) => {
    //         return <tr key={index}>
    //             <td className='fcol'>{s.allopathicDrugId}</td>
    //             <td>{s.allopathicDrugName}</td>
    //             <td>{s.drugGroupName}</td>
    //             <td className='lcol'>
    //                 <Link to={"/EditAllopathicDrugMaster/" + s.allopathicDrugId}>
    //                     <Button ><i className="fa fa-pencil"></i></Button>
    //                 </Link>
    //                 <Button style={{ marginLeft: 8 }} variant="danger" onClick={() => this.deleteAllopathicDrug(s.allopathicDrugId)} ><i className="fa fa-trash"></i></Button>
    //             </td>
    //         </tr>
    //     })
    // }


    renderAllopathicDrugMasterTable = () => {
        // const { AllopathicDrugMasterList, currentPage, pageSize, searchQuery } = this.state;

        // // Apply search filter
        // let filteredList = AllopathicDrugMasterList;
        // if (searchQuery) {
        //     filteredList = AllopathicDrugMasterList.filter(
        //         item =>
        //             item.allopathicDrugName.toLowerCase().includes(searchQuery.toLowerCase())
        //     );
        // }

        // const currentPageRecords = filteredList.slice(
        //     (currentPage - 1) * pageSize,
        //     currentPage * pageSize
        // );

        if (this.state.AllopathicDrugMasterList.resultObject?.length === 0) {
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

        return this.state.AllopathicDrugMasterList?.resultObject?.map((s, index) => (
            <tr key={index}>
                <td className='fcol'>{s.allopathicDrugId}</td>
                <td>{s.allopathicDrugName}</td>
                <td>{s.drugGroupName}</td>
                <td className='lcol'>
                    <Link to={"/EditAllopathicDrugMaster/" + s.allopathicDrugId}>
                        <Button><i className="fa fa-pencil"></i></Button>
                    </Link>
                    <Button
                        style={{ marginLeft: 8 }}
                        variant="danger"
                        onClick={() => this.deleteAllopathicDrug(s.allopathicDrugId)}
                    >
                        <i className="fa fa-trash"></i>
                    </Button>
                </td>
            </tr>
        ));
    }



    renderPagination = () => {
        debugger
        const totalRecords = (this.state.AllopathicDrugMasterList?.totalCount);
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
                onChange={(pageNumber) => { this.getAllopathicDrugMaster(pageNumber, this.state.searchQuery) }}
            />
        )
    }
    handleChangeforsearch(e) {
        console.log('handleChangeforsearch===', e.target.value)
        this.setState({
            searchQuery: e.target.value,
            AllopathicDrugMasterList: []
        })
        this.getAllopathicDrugMaster(1,e.target.value);

        // this.setState({
        //     [e.target.name]: e.target.value,
        // }, () => {
        // })
    }

    render() {
        return (
            <div>

                <Link to={'/AddAllopathicDrugMaster'} className="nav-link lnkbtn" >
                    <Button color="primary"
                        style={{ textTransform: "uppercase" }}
                    > <i className="fa fa-plus"></i> &nbsp;
                        Add Allopathic Drug
                    </Button>
                </Link>

                <Col sm="5">
                    <Input type="search"
                        placeholder="Search by LowerCase or UpperCase "
                        name='searchQuery'
                        value={this.state.searchQuery}
                        onChange={this.handleChangeforsearch} />
                </Col>
                
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th className='fcol'>Sr.No</th>
                            <th>Allopathic Drug Name</th>
                            <th>Drug Group Name</th>
                            <th className='lcol'>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.renderAllopathicDrugMasterTable()
                        }
                    </tbody>
                </Table>
                <div responsive="true" className='pgdiv'>
                    {this.renderPagination()}
                </div>
            </div >
        );
    }


    deleteAllopathicDrug(id) {
        CommonServices.postData({ allopathicDrugId: id }, `/AllopathicDrug/DeleteAllopathicDrug`).then((res) => {
            debugger
            console.log('props=======', this.props)
            this.props.enqueueSnackbarAction("Record deleted successfully.", "warning");
            this.getAllopathicDrugMaster(this.state.currentPage);

        });
    }


}
export default connect(null, { enqueueSnackbarAction, closeSnackbar })(ListAllopathicDrugMaster)
