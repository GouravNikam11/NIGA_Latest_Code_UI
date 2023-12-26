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
import AsyncPaginate from 'react-select-async-paginate';
class ListDiagnosisTherapeuticsDetail extends Component {
    constructor(props) {
        super(props)

        this.state = {
            ListDiagnosisTherapeuticsDetail: [],
            GetDiagnosisForClinicalPattern: [],
            DiagnosisIds: [],
            currentPage: 1,
            pageSize: 10,
            selectedDiagnosisId:''
        }
    }

    componentDidMount() {
        this.GetDiagnosisForClinicalPattern()
        this.getListDiagnosisTherapeutics(1,this.state.selectedDiagnosisId);

    }

    GetDiagnosisForClinicalPattern() {
        CommonServices.getData(`/diagnosis/GetDiagnosisForClinicalPattern`).then((temp) => {
            this.setState({
                GetDiagnosisForClinicalPattern: temp
            })
        })
    }

    getListDiagnosisTherapeutics(pageNumber,selectedDiagnosisId) {
        // CommonServices.getData(`/DiagnosisTherapeuticsDetail/GetDiagnosisTherapeuticsDetail`).then((temp) => {
            CommonServices.getData(`/Pagination/GetDiagnosisTherapeuticsDetails?${selectedDiagnosisId ? `diagonosisId=${selectedDiagnosisId}&` :''}PageNumber=${pageNumber}&PageSize=${this.state.pageSize}`).then((temp) => {
                this.state.currentPage = pageNumber
            console.log(temp);
            debugger;
            this.setState({
                ListDiagnosisTherapeuticsDetail: temp,
            })
        });
    }

    loadDiagnosisListOptions = async (search, prevOptions) => {
        const options = [];
        // var subsectionList 
        // await this.GetParentSubsections(this.state.sectionId).then((result) => {
        //     subsectionList = result;
        // })
        this.state.GetDiagnosisForClinicalPattern.map(x => options.push({ value: x.diagnosisID, label: x.diagnosisName }));
        let filteredOptions;
        if (!search) {
            filteredOptions = options;
        } else {
            const searchLower = search.toLowerCase();

            filteredOptions = options.filter(({ label }) =>
                label.toLowerCase().includes(searchLower)
            );
        }

        const hasMore = filteredOptions.length > prevOptions.length + 10;
        const slicedOptions = filteredOptions.slice(
            prevOptions.length,
            prevOptions.length + 10
        );
        return {
            options: slicedOptions,
            hasMore
        };
    }

    DiagnosisChanged(e) {
        debugger
        // console.log("e====", e.value)
        if (e == null) {
            this.setState({ 
                DiagnosisIds: [],
                selectedDiagnosisId: '',
                ListDiagnosisTherapeuticsDetail:[]
             })
                this.getListDiagnosisTherapeutics(1,'');
        }
else{
        this.setState({ 
            DiagnosisIds: e,
            selectedDiagnosisId: e.value,
            ListDiagnosisTherapeuticsDetail:[]
         })
            this.getListDiagnosisTherapeutics(1,e.value);
        }
    }

    // renderauthorTable = () => {
    //     debugger
    //     let ListDiagnosisTherapeutics = this.state.ListDiagnosisTherapeuticsDetail;
    //     const { currentPage, pageSize } = this.state;
    //     const currentPageRecords = ListDiagnosisTherapeutics.slice(((currentPage - 1) * pageSize), (currentPage) * pageSize);
    //     console.log('currentPageRecords==', currentPageRecords)
    //     return currentPageRecords.map((s, index) => {
    //         return <tr key={index}>
    //             <td className='fcol'>{s.diagnosisTherapeuticsDetailId}</td>
    //             <td>{s.diagnosisName}</td>
    //             <td className='lcol'><Link to={"/DiagnosisTherapeuticsDetail/" + s.diagnosisTherapeuticsDetailId}><Button><i className="fa fa-eye"></i></Button></Link></td>
    //             <td className='lcol'>
    //                 <Link to={"/EditDiagnosisTherapeuticsDetail/" + s.diagnosisTherapeuticsDetailId}><Button><i className="fa fa-pencil"></i></Button></Link>
    //                 <Button style={{ marginLeft: 8 }} variant="danger"
    //                     onClick={() => this.deleteAuthor(s.diagnosisTherapeuticsDetailId)}
    //                 ><i className="fa fa-trash"></i></Button>
    //             </td>
    //         </tr>
    //     })
    // }

    // renderauthorTable = () => {
    //     debugger
    //     const { ListDiagnosisTherapeuticsDetail, currentPage, pageSize, selectedDiagnosisId } = this.state;
      
    //     // Filter the ListDiagnosisTherapeutics based on the selectedDiagnosisId
    //     const filteredList = selectedDiagnosisId
    //       ? ListDiagnosisTherapeuticsDetail.filter(s => s.diagnosisId === selectedDiagnosisId)
    //       : ListDiagnosisTherapeuticsDetail;
      
    //     const currentPageRecords = filteredList.slice((currentPage - 1) * pageSize, currentPage * pageSize);
    //     console.log('currentPageRecords==', currentPageRecords);
      
    //     return currentPageRecords.map((s, index) => {
    //       return (
    //         <tr key={index}>
    //           <td className='fcol'>{s.diagnosisTherapeuticsDetailId}</td>
    //           <td>{s.diagnosisName}</td>
    //           <td className='lcol'><Link to={"/DiagnosisTherapeuticsDetail/" + s.diagnosisTherapeuticsDetailId}><Button><i className="fa fa-eye"></i></Button></Link></td>
    //           <td className='lcol'>
    //             <Link to={"/EditDiagnosisTherapeuticsDetail/" + s.diagnosisTherapeuticsDetailId}><Button><i className="fa fa-pencil"></i></Button></Link>
    //             <Button style={{ marginLeft: 8 }} variant="danger" onClick={() => this.deleteAuthor(s.diagnosisTherapeuticsDetailId)}><i className="fa fa-trash"></i></Button>
    //           </td>
    //         </tr>
    //       );
    //     });
    //   }


    renderauthorTable = () => {
        debugger
        // const { ListDiagnosisTherapeuticsDetail, currentPage, pageSize, selectedDiagnosisId } = this.state;
      
        // // Filter the ListDiagnosisTherapeutics based on the selectedDiagnosisId or display all if selectedDiagnosisId is 0
        // const filteredList = selectedDiagnosisId === 0
        //   ? ListDiagnosisTherapeuticsDetail
        //   : ListDiagnosisTherapeuticsDetail.filter(s => s.diagnosisId === selectedDiagnosisId);
      
        // const currentPageRecords = filteredList.slice((currentPage - 1) * pageSize, currentPage * pageSize);
        // console.log('currentPageRecords==', currentPageRecords);
      
        return this.state.ListDiagnosisTherapeuticsDetail?.resultObject?.map((s, index) => {
          return (
            <tr key={index}>
              <td className='fcol'>{s.diagnosisTherapeuticsDetailId}</td>
              <td>{s.diagnosisName}</td>
              <td className='lcol'><Link to={"/DiagnosisTherapeuticsDetail/" + s.diagnosisTherapeuticsDetailId}><Button><i className="fa fa-eye"></i></Button></Link></td>
              <td className='lcol'>
                <Link to={"/EditDiagnosisTherapeuticsDetail/" + s.diagnosisTherapeuticsDetailId}><Button><i className="fa fa-pencil"></i></Button></Link>
                <Button style={{ marginLeft: 8 }} variant="danger" onClick={() => this.deleteAuthor(s.diagnosisTherapeuticsDetailId)}><i className="fa fa-trash"></i></Button>
              </td>
            </tr>
          );
        });
      }
      
      

    renderPagination = () => {
        debugger
        const totalRecords = (this.state.ListDiagnosisTherapeuticsDetail?.totalCount);
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
                onChange={(pageNumber) => { this.getListDiagnosisTherapeutics(pageNumber, this.state.selectedDiagnosisId) }}

            />
        )
    }

    deleteAuthor(id) {
        debugger;
        CommonServices.postData({ "diagnosisTherapeuticsDetailId": id }, `/DiagnosisTherapeuticsDetail/DeleteDiagnosisTherapeuticsDetail`).then((res) => {
            debugger
            console.log('props=======', this.props)
            this.props.enqueueSnackbarAction("Record deleted successfully.", "warning");
            this.getListDiagnosisTherapeutics(this.state.currentPage);

            this.setState({

            })
        });
    }

    render() {
        return (
            <div>

                <Link to={'/AddDiagnosisTherapeuticsDetail'} className="nav-link lnkbtn" >
                    <Button color="primary"
                        style={{ textTransform: "uppercase" }}
                    > <i className="fa fa-plus"></i> &nbsp;
                        Add Diagnosis Therapeutics Detail
                    </Button>
                </Link>

                <Col sm="12" md="4">
                    <AsyncPaginate isClearable
                        labelKey="value"
                        labelValue="DiagnosisId"
                        placeholder="Type Diagnosis Name"
                        value={this.state.DiagnosisIds}
                        loadOptions={this.loadDiagnosisListOptions}
                        onChange={this.DiagnosisChanged.bind(this)}
                    />

                </Col>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th className='fcol'>Sr.No</th>
                            <th>Diagnosis Name</th>
                            <th className='lcol'>Therapeutics Detail</th>
                            <th className='lcol'>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.renderauthorTable()
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
export default connect(null, { enqueueSnackbarAction, closeSnackbar })(ListDiagnosisTherapeuticsDetail)
