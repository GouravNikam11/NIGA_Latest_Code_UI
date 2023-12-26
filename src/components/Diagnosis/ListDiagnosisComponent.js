import React, { Component } from 'react';
import { Table, Col, Button, Form ,Row} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import CommonServices from '../../Services/CommonServices';
import Pagination from "react-js-pagination";
import {
    enqueueSnackbar as enqueueSnackbarAction,
    closeSnackbar
} from '../../store/actions/notification';
import { Input } from 'reactstrap';
export class ListDiagnosisComponent extends Component {
    /**
    * Created Date     :   19 Dec 2019  
    * purpose          :   Component responsible for handling DiagnosisMaster records   
    * Author           :   
    */

    constructor(props) {
        super(props);
        this.state = {
            diagnosisId: 0,
            diagnosisList: [],
            DiagnosisName: '',
            DiagnosisNameAlias: '',
            Description: '',
            Keywords: '',
            DiagnosisGroupId: '',
            // SectionId: '',
            // SubSectionId: '',
            EnteredBy: 'Admin',
            DeleteStatus: false,
            currentPage: 1,
            pageSize: 10,
            searchQuery: ''
        }
    }
    componentDidMount() {
        this.getDiagnosis(1);
        console.log("**********API CALL**************")
    }

   

    handleSearch = (e) => {
        // console.log('handleChangeforsearch===', event.target.value)
        // const searchQuery = event.target.value;
        // this.setState({ searchQuery });
        this.setState({
            searchQuery: e.target.value,
            diagnosisList: []
        })
        this.getDiagnosis(1,e.target.value);
    }

    // renderSubsectionTable = () => {
    //     let diagnosisList = this.state.diagnosisList;
    //     const { currentPage, pageSize } = this.state;
    //     const currentPageRecords = diagnosisList.slice(((currentPage-1) * pageSize), (currentPage) * pageSize);
       
    //     return currentPageRecords.map((d, index) => {
    //                                    return <tr key={index}>
    //                                     <td className='fcol'>{d.diagnosisId}</td>
    //                                     <td>{d.diagnosisName}</td>
    //                                     <td>{d.diagnosisNameAlias}</td>
    //                                     <td className='lcol'>
    //                                         <Link to={"/EditDiagnosis/" + d.diagnosisId}>
    //                                             <Button  ><i className="fa fa-pencil"></i></Button>
    //                                         </Link>
    //                                         <Button style={{marginLeft:8}} variant="danger" onClick={() => this.deletediagnosis(d.diagnosisId)} ><i className="fa fa-trash"></i></Button>
    //                                     </td>
    //                                 </tr>
    //     })
    // }

    renderSubsectionTable = () => {
        // const { diagnosisList, currentPage, pageSize, searchQuery } = this.state;

        // // Filter the diagnosisList based on the searchQuery
        // const filteredList = searchQuery
        //     ? diagnosisList.filter(d => d.diagnosisName.toLowerCase().includes(searchQuery.toLowerCase()))
        //     : diagnosisList;

        // const currentPageRecords = filteredList.slice((currentPage - 1) * pageSize, currentPage * pageSize);

        return this.state.diagnosisList?.resultObject?.map((d, index) => (
            <tr key={index}>
                <td className='fcol'>{d.diagnosisId}</td>
                <td>{d.diagnosisName}</td>
                <td>{d.diagnosisNameAlias}</td>
                <td className='lcol'>
                    <Link to={"/EditDiagnosis/" + d.diagnosisId}>
                        <Button><i className="fa fa-pencil"></i></Button>
                    </Link>
                    <Button style={{ marginLeft: 8 }} variant="danger" onClick={() => this.deletediagnosis(d.diagnosisId)}><i className="fa fa-trash"></i></Button>
                </td>
            </tr>
        ));
    }

    renderPagination = () => {
        const totalRecords = (this.state.diagnosisList?.totalCount);
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
                onChange={(pageNumber) => { this.getDiagnosis(pageNumber, this.state.searchQuery) }}

            />
        )
    }

    render() {
        const {isLoading}=this.state;
        return (
            <div>
                
                    <Link to={'/AddDiagnosis'} className="nav-link lnkbtn" >
                    <Button color="primary"
                    style={{ textTransform: "uppercase" }}
                    > <i className="fa fa-plus"></i> &nbsp; 
                        Add Diagnosis
                    </Button>
                </Link>

                <Col sm="5">
                    <Input 
                       type="text"
                       placeholder="Search by diagnosis name..."
                       value={this.state.searchQuery}
                       onChange={this.handleSearch}/>
                </Col>
                   <Table bordered hover>
                        <thead>
                            
                            <tr>
                            <th className='fcol'>#</th>
                            <th>Diagnosis Name</th>
                            <th>Diagnosis Name Alias</th>
                            {/* <th>Description</th>
                            <th>Keywords</th>
                            <th>Diagnosis Group Id</th> */}
                            {/* <th>Section Id</th>
                            <th>Sub Section Id</th> */}
                            <th className='lcol'>Action</th>
                        </tr>
                            
                        </thead>
                        <tbody>
                            {
                                isLoading ?
                                    <tr></tr>
                                    :
                                    this.renderSubsectionTable()
                            }                         
                         
                        </tbody>
                    </Table>
                    <div responsive="true" className='pgdiv'>
                        {this.renderPagination()}
                    </div>
                
            </div >
        )
    }

    getDiagnosis(pageNumber,searchQuery) {
        // CommonServices.getData(`/diagnosis/GetDiagnosis`).then((temp) => {
            CommonServices.getData(`/Pagination/GetDiagnosis?${searchQuery ? `queryString=${searchQuery}` : ''}&PageNumber=${pageNumber}&PageSize=${this.state.pageSize}`).then((temp) => {  
                this.state.currentPage = pageNumber
            console.log(temp);
            debugger;
            this.setState({
                diagnosisList: temp,
            })
        });
    }

    /**
     * Created Date     :   19 Dec 2019.
     * Purpose          :   Get diagnosis record for edit.
     * Author           :   
     */
    // editDiagnosis(diagnosisId) {
    //     CommonServices.getDataById(diagnosisId, `/diagnosis`).then((res) => {
    //         this.setState({
    //             diagnosisId: res.diagnosisId,
    //             DiagnosisName: res.diagnosisName,
    //             DiagnosisNameAlias: res.diagnosisNameAlias,
    //             Description: res.description,
    //             Keywords: res.keywords,
    //             DiagnosisGroupId: res.diagnosisGroupId,
    //             // SectionId: res.sectionId,
    //             SubSectionId: res.subSectionId,
    //             EnteredBy: 'Admin',
    //             DeleteStatus: false
    //         })
    //     });
    // }
    deletediagnosis(id) {
        debugger;
        this.setState({
            diagnosisId: id,
            DiagnosisName: "jddj",
            DiagnosisNameAlias: "mccm",
            Description: "mcmcm",
            Keywords: "nxx",
            DiagnosisGroupId: "3",
            SectionId: "5",
            SubSectionId: "6",
            EnteredBy: 'Admin',
            DeleteStatus: true
        }, function () {
            console.log(this.state)
            debugger;
            CommonServices.postData(this.state, `/diagnosis/deletediagnosis`).then((res) => {
                // this.props.enqueueSnackbarAction("Record deleted successfully.", "warning");
                alert(res.data);
                this.getDiagnosis(this.state.currentPage);

                this.setState({
                    diagnosisId: id,
                    DiagnosisName: "",
                    DiagnosisNameAlias: "",
                    Description: "",
                    Keywords: "",
                    DiagnosisGroupId: "",
                    SectionId: "",
                    SubSectionId: "",
                    EnteredBy: 'Admin',
                    DeleteStatus: true
                })
            });
        });
    }
}

export default ListDiagnosisComponent
