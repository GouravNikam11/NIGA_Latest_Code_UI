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
export class ListIntensityComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            intensityId: 0,
            IntensityNo: '',
            Description: '',
            IntensityList: [],
            EnteredBy: 'Admin',
            DeleteStatus: false,
            currentPage: 1,
            pageSize: 10,
        }
    }

    renderintensityTable = () => {
        // debugger
        // let IntensityList = this.state.IntensityList;
        // const { currentPage, pageSize } = this.state;
        // const currentPageRecords = IntensityList.slice(((currentPage-1) * pageSize), (currentPage) * pageSize);
       
        return this.state.IntensityList?.resultObject?.map((i, index) => {
            return <tr key={index}>
                <td className='fcol'>{i.intensityId}</td>
                <td>{i.intensityNo}</td>
                <td>{i.description}</td>
                <td  className='lcol'>
                    <Link to={"/EditIntensity/" + i.intensityId}>
                        <Button onClick={() => this.editIntensity(i.intensityId)} ><i className="fa fa-pencil"></i></Button> 
                    </Link>
                    <Button style={{marginLeft:8}} variant="danger" onClick={() => this.deleteIntensity(i.intensityId)} ><i className="fa fa-trash"></i></Button>
                </td>
            </tr>
        })
    }

    renderPagination = () => {
        debugger
        const totalRecords = (this.state.IntensityList.totalCount);
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
                onChange={(pageNumber) => { this.getIntensity(pageNumber) }}

            />
        )
    }



    render() {

        return (
            <div>
                <Link to={'/AddIntensity'} className="nav-link lnkbtn" >
                    <Button color="primary"
                    style={{ textTransform: "uppercase" }}
                    > <i className="fa fa-plus"></i> &nbsp; 
                        Add Intensity
                    </Button>
                </Link>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th className='fcol'>#</th>
                            <th>Intensity No</th>
                            <th>Description</th>
                            <th className='lcol'>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.renderintensityTable()
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
        this.getIntensity(1);
        console.log("**********API CALL**************")

    }



    getIntensity(pageNumber) {
        // CommonServices.getData(`/intensity`).then((temp) => {
            CommonServices.getData(`/Pagination/GetIntensities?PageNumber=${pageNumber}&PageSize=${this.state.pageSize}`).then((temp) => {
                this.state.currentPage = pageNumber
            console.log(temp);
            debugger;
            this.setState({
                IntensityList: temp,
            })
        });
    }

    editIntensity(intensityId) {
        debugger;

        CommonServices.getDataById(intensityId, `/intensity`).then((res) => {
            this.setState({
                intensityId: res.intensityId,
                IntensityNo: res.intensityNo,
                Description: res.description,
                EnteredBy: 'Admin',
                DeleteStatus: false
            })
        });

    }

    deleteIntensity(id) {
        debugger;
        this.setState({
            intensityId: id,
            IntensityNo: 4,
            Description: "mcmcm",
            EnteredBy: 'Admin',
            DeleteStatus: true
        }, function () {
            console.log(this.state)
            debugger;
            CommonServices.postData(this.state, `/intensity/DeleteIntensity`).then((res) => {
                this.props.enqueueSnackbarAction(res.data, "warning");
                this.getIntensity(this.state.currentPage);

                this.setState({
                    intensityId: id,
                    IntensityNo: "",
                    Description: "",
                    EnteredBy: 'Admin',
                    DeleteStatus: true
                })
            });
        });
    }
}
export default connect(null, { enqueueSnackbarAction, closeSnackbar })(ListIntensityComponent)
