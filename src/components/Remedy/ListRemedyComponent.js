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
import { Input } from 'reactstrap';


class ListRemedyComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            remedyId: 0,
            RemedyName: '',
            RemedyAlias: '',
            Description: '',
            RemedyList: [],
            EnteredBy: 'Admin',
            DeleteStatus: false,
            currentPage: 1,
            pageSize: 10,
            searchQuery: '',
        }
    }

    handleSearchChange = (e) => {
        this.getRemedy(1,e.target.value);
        this.setState({
            searchQuery: e.target.value,
            RemedyList: []
        })
        // const searchQuery = event.target.value;
        // this.setState({ searchQuery,currentPage:1});
    }

    // renderRemedyTable = () => {
    //     let RemedyList = this.state.RemedyList;
    //     const { currentPage, pageSize } = this.state;
    //     const currentPageRecords = RemedyList.slice(((currentPage-1) * pageSize), (currentPage) * pageSize);
       
    //     return currentPageRecords.map((r, index) => {
    //         return <tr key={index}>
    //             <td className='fcol'>{r.remedyId}</td>
    //             <td>{r.remedyName}</td>
    //             <td>{r.remedyAlias}</td>
    //             <td className='lcol'>{r.description}</td>
    //             <td >
    //                 <Link to={"/EditRemedy/" + r.remedyId}>
    //                     <Button onClick={() => this.editRemedy(r.remedyId)} ><i className="fa fa-pencil"></i></Button> 
    //                 </Link>
    //                 <Button style={{marginLeft:8}} variant="danger" onClick={() => this.deleteRemedy(r.remedyId)} ><i className="fa fa-trash"></i></Button>
    //             </td>
    //         </tr>
    //     })
    // }

    renderRemedyTable = () => {
        // const { RemedyList, currentPage, pageSize, searchQuery } = this.state;

        // const filteredRemedyList = searchQuery
        //     ? RemedyList.filter(r => r.remedyName.toLowerCase().includes(searchQuery.toLowerCase()))
        //     : RemedyList;

        // const currentPageRecords = filteredRemedyList.slice(
        //     (currentPage - 1) * pageSize,
        //     currentPage * pageSize
        // );

        return this.state.RemedyList?.resultObject?.map((r, index) => (
            <tr key={index}>
                <td className='fcol'>{r.remedyId}</td>
                <td>{r.remedyName}</td>
                <td>{r.remedyAlias}</td>
                <td className='lcol'>{r.description}</td>
                <td className='lcol'>
                    <Link to={"/EditRemedy/" + r.remedyId}>
                        <Button onClick={() => this.editRemedy(r.remedyId)} ><i className="fa fa-pencil"></i></Button>
                    </Link>
                    <Button style={{marginLeft:8}} variant="danger" onClick={() => this.deleteRemedy(r.remedyId)} ><i className="fa fa-trash"></i></Button>
                </td>
            </tr>
        ));
    }


    renderPagination = () => {
        const totalRecords = (this.state.RemedyList?.totalCount);
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
                onChange={(pageNumber) => { this.getRemedy(pageNumber, this.state.searchQuery) }}
            />
        )
    }



    render() {
        return (
            <div>


                <Link to={'/AddRemedy'} className="nav-link lnkbtn" >
                    <Button color="primary"
                    style={{ textTransform: "uppercase" }}
                    > <i className="fa fa-plus"></i> &nbsp; 
                        Add Remedy
                    </Button>
                </Link>
                <Col sm="5">
                <Input type="search"
                        placeholder="Search by Lower Case or Upper Case "
                        name='searchQuery'
                        value={this.state.searchQuery}
                    onChange={this.handleSearchChange} />
                    </Col>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th className='fcol'>#</th>
                            <th>Remedy Name</th>
                            <th>Remedy Alias</th>
                            <th>Description</th>
                            <th className='lcol'>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.renderRemedyTable()
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
        this.getRemedy(1);
        console.log("**********API CALL**************")

    }

    getRemedy(pageNumber,searchQuery) {
        // CommonServices.getData(`/remedy/GetRemedies`).then((temp) => {
        CommonServices.getData(`/Pagination/GetRemedies?${searchQuery ? `&queryString=${searchQuery}` : ''}&PageNumber=${pageNumber}&PageSize=${this.state.pageSize}`).then((temp) => {
            this.state.currentPage = pageNumber
            console.log(temp);
            debugger;
            this.setState({
                RemedyList: temp,
            })
        });
    }


    editRemedy(remedyId) {
        CommonServices.getDataById(remedyId, `/remedy`).then((res) => {
            this.setState({
                remedyId: res.remedyId,
                RemedyName: res.remedyName,
                RemedyAlias: res.remedyAlias,
                Description: res.description,
                EnteredBy: 'Admin',
                DeleteStatus: false
            })
        });
    }

    deleteRemedy(id) {
        debugger;
        this.setState({
            remedyId: id,
            RemedyName: "jsjdj",
            RemedyAlias: "jdhf",
            Description: "mcmcm",
            EnteredBy: 'Admin',
            DeleteStatus: true
        }, function () {
            console.log(this.state)
            debugger;
            CommonServices.postData(this.state, `/remedy/DeleteRemedy`).then((res) => {
                this.props.enqueueSnackbarAction(res.data, "warning");
                this.getRemedy(this.state.currentPage);

                this.setState({
                    remedyId: id,
                    RemedyName: "",
                    RemedyAlias: "",
                    Description: "",
                    EnteredBy: 'Admin',
                    DeleteStatus: true
                })
            });
        });
    }
}
export default connect(null, { enqueueSnackbarAction, closeSnackbar })(ListRemedyComponent)
