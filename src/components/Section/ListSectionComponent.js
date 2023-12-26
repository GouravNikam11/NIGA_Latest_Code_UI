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

export class ListSectionComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            sectionId: 0,
            SectionName: '',
            SectionAlias: '',
            Description: '',
            SectionList: [],
            EnteredBy: 'Admin',
            DeleteStatus: false,
            currentPage: 1,
            pageSize: 10,
        }
    }


    rendersectionTable = () => {
        // debugger
        // let SectionList = this.state.SectionList;
        // const { currentPage, pageSize } = this.state;
        // const currentPageRecords = SectionList.slice(((currentPage-1) * pageSize), (currentPage) * pageSize);
       
        return this.state.SectionList?.resultObject?.map((s, index) => {
            return <tr key={index}>
                <td className='fcol'>{s.sectionId}</td>
                <td>{s.sectionName}</td>
                <td>{s.sectionAlias}</td>
                <td>{s.description}</td>
                <td className='lcol'>
                    <Link to={"/EditSection/" + s.sectionId}>
                        <Button onClick={() => this.editSection(s.sectionId)} ><i className="fa fa-pencil"></i> </Button> 
                    </Link>
                    <Button style={{marginLeft:8}} variant="danger" onClick={() => this.deleteSection(s.sectionId)} ><i className="fa fa-trash"></i></Button>
                </td>
            </tr>
        })
    }

    renderPagination = () => {
        debugger
        const totalRecords = (this.state.SectionList.totalCount);
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
                onChange={(pageNumber) => { this.getSection(pageNumber) }}

            />
        )
    }


    render() {
        return (
            <div>

                <Link to={'/AddSection'} className="nav-link lnkbtn" >
                    <Button color="primary"
                    style={{ textTransform: "uppercase" }}
                    > <i className="fa fa-plus"></i> &nbsp; 
                        Add Section
                    </Button>
                </Link>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th className='fcol'>#</th>
                            <th>Section Name</th>
                            <th>Section Alias</th>
                            <th>Description</th>
                            <th className='lcol'>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.rendersectionTable()
                        }
                    </tbody>
                </Table>
                <div responsive="true" className='pgdiv'>
                    {this.renderPagination()}
                </div>
            </div>
        )
    }

    componentDidMount() {
        debugger;
        this.getSection(1);
        console.log("**********API CALL**************")
    }

    getSection(pageNumber) {
        CommonServices.getData(`/Pagination/GetSections?PageNumber=${pageNumber}&PageSize=${this.state.pageSize}`).then((temp) => {
            this.state.currentPage = pageNumber

        // CommonServices.getData(`/mastersAPI/GetSections`).then((temp) => {
            console.log(temp);
            debugger;
            this.setState({
                SectionList: temp,
            })
        });
    }

    editSection(sectionId) {
        debugger;

        CommonServices.getDataById(sectionId, `/section`).then((res) => {
            this.setState({
                sectionId: res.sectionId,
                SectionName: res.sectionName,
                SectionAlias: res.sectionAlias,
                Description: res.description,
                EnteredBy: 'Admin',
                DeleteStatus: false
            })
        });

    }

    deleteSection(id) {
        this.setState({
            sectionId: id,
            SectionName: "hhg",
            SectionAlias: "jjf",
            Description: "mcmcm",
            EnteredBy: 'Admin',
            DeleteStatus: true
        }, function () {
            console.log(this.state)
            CommonServices.postData(this.state, `/section/DeleteSection`).then((res) => {
                this.getSection(this.state.currentPage);
                this.props.enqueueSnackbarAction(res.data, "warning");


                this.setState({
                    sectionId: id,
                    SectionName: "",
                    SectionAlias: "",
                    Description: "",
                    EnteredBy: 'Admin',
                    DeleteStatus: true
                })
            });
        });
    }
}
export default connect(null, { enqueueSnackbarAction, closeSnackbar })(ListSectionComponent)

