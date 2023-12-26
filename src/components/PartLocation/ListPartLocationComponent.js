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
class ListPartLocationComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            partLocationId: 0,
            PartLocationName: '',
            Description: '',
            PartLocationList: [],
            EnteredBy: 'Admin',
            DeleteStatus: false,
            currentPage: 1,
            pageSize: 10
         }
    }

    
    renderpartlistTable = () => {
        // let PartLocationList = this.state.PartLocationList;
        // const { currentPage, pageSize } = this.state;
        // const currentPageRecords = PartLocationList.slice(((currentPage-1) * pageSize), (currentPage) * pageSize);
       
        return this.state.PartLocationList?.resultObject?.map((p, index) => {
            return <tr key={index}>
                <td className='fcol'>{p.partLocationId}</td>
                <td>{p.partLocationName}</td>
                <td>{p.description}</td>
                <td  className='lcol'>
                    <Link to={"/EditPartLocation/" + p.partLocationId}>
                        <Button onClick={() => this.editPartLocation(p.partLocationId)} ><i className="fa fa-pencil"></i></Button> 
                    </Link>
                    <Button style={{marginLeft:8}} variant="danger" onClick={() => this.deletePartLocation(p.partLocationId)} ><i className="fa fa-trash"></i></Button>
                </td>
            </tr>
        })
    
    }

    renderPagination = () => {
        const totalRecords = (this.state.PartLocationList?.totalCount);
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
                onChange={(pageNumber) => { this.getPartLocation(pageNumber) }}

            />
        )
    }



    render() {
        return (
            <div>

                <Link to={'/AddPartLocation'} className="nav-link lnkbtn" >
                    <Button color="primary"
                    style={{ textTransform: "uppercase" }}
                    > <i className="fa fa-plus"></i> &nbsp; 
                        Add Part Location
                    </Button>
                </Link>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th className='fcol'>#</th>
                            <th>Part Location Name</th>
                            <th>Description</th>
                            <th className='lcol'>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.renderpartlistTable()
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
        this.getPartLocation(1);
        console.log("**********API CALL**************")
    }

    getPartLocation(pageNumber) {
        // CommonServices.getData(`/partlocation/GetPartLocations`).then((temp) => {
            CommonServices.getData(`/Pagination/GetPartLocations?PageNumber=${pageNumber}&PageSize=${this.state.pageSize}`).then((temp) => {
                this.state.currentPage = pageNumber
            console.log(temp);
            debugger;
            this.setState({
                PartLocationList: temp,
            })
        });
    }

    editPartLocation(partlocationId) {
        debugger;

        CommonServices.getDataById(partlocationId, `/partlocation`).then((res) => {
            this.setState({
                partLocationId: res.partLocationId,
                PartLocationName: res.partLocationName,
                Description: res.description,
                EnteredBy: 'Admin',
                DeleteStatus: false
            })
        });
    }
    deletePartLocation(id) {
        debugger;
        this.setState({
            partLocationId: id,
            PartLocationName: "jdjd",
            Description: "mcmcm",
            EnteredBy: 'Admin',
            DeleteStatus: true
        }, function () {
            console.log(this.state)
            debugger;
            CommonServices.postData(this.state, `/partlocation/DeletePartLocation`).then((res) => {
                this.props.enqueueSnackbarAction(res.data, "warning");
                this.getPartLocation(this.state.currentPage);

                this.setState({
                    partLocationId: id,
                    PartLocationName: "",
                    Description: "",
                    EnteredBy: 'Admin',
                    DeleteStatus: true
                })
            });
        });
    }
}
export default connect(null, { enqueueSnackbarAction, closeSnackbar })(ListPartLocationComponent)
