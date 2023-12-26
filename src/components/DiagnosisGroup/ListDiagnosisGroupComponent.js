import React, { Component } from 'react';
import { Table, Col, Button, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import APICalls from '../../Services/DiagnosisGroup';
import CommonServices from '../../Services/CommonServices';
import Select from 'react-select';
import { connect } from 'react-redux';
import {
    enqueueSnackbar as enqueueSnackbarAction,
    closeSnackbar
} from '../../store/actions/notification';
import Pagination from "react-js-pagination";

class ListDiagnosisGroupComponent extends Component {
    /**
     * Created Date     :   16 Dec 2019  
     * purpose          :   Component responsible for handling DiagnosisGroupMaster records   
     * Author           :   Chandrashekhar Salagar
     */
    constructor(props) {
        super(props);
        this.state = {
            diagnosisGroupId: 0,
            diagnosisGroupList: [],
            DiagnosisGroupName: '',
            Description: '',
            EnteredBy: 'Admin',
            DeleteStatus: false,
            currentPage: 1,
            pageSize: 10,
            options: [
            ],
            groupBadgeStyles: {
                backgroundColor: '#EBECF0',
                borderRadius: '2em',
                color: '#172B4D',
                display: 'inline-block',
                fontSize: 12,
                fontWeight: 'normal',
                lineHeight: '1',
                minWidth: 1,
                padding: '0.16666666666667em 0.5em',
                textAlign: 'center',
            },
            groupStyles: {
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
            }
        }
    }
    /**
     * componentDidMount react hook
     */
    async componentDidMount() {
        await this.getDiagnosisList();
        await this.refreshList(1);

    }

    renderdiagnosisgroupTable = () => {
        // let diagnosisGroupList = this.state.diagnosisGroupList;
        // const { currentPage, pageSize } = this.state;
        // const currentPageRecords = diagnosisGroupList.slice(((currentPage-1) * pageSize), (currentPage) * pageSize);
       
        return this.state.diagnosisGroupList?.resultObject?.map((c, index) => {
            return <tr key={index}>
                <td className='fcol'>{c.diagnosisGroupId}</td>
                <td>{c.diagnosisGroupName}</td>
                <td>{c.description}</td>
                <td  className='lcol'>
                    <Link to={"/EditDiagnosisGroup/" + c.diagnosisGroupId}>
                        <Button onClick={() => this.editDiagnosisGroup(c.diagnosisGroupId)} ><i className="fa fa-pencil"></i></Button>
                    </Link>
                    <Button style={{marginLeft:8}} variant="danger" onClick={() => this.deleteDiagnosisGroup(c.diagnosisGroupId)} ><i className="fa fa-trash"></i></Button>
                </td>
            </tr>
        })
       
        // <tr>
        //     <td colSpan="4">No data to display</td>
        // </tr>
        
    }

    renderPagination = () => {
        const totalRecords = (this.state.diagnosisGroupList.totalCount);
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
                onChange={(pageNumber) => { this.refreshList(pageNumber) }}

            />
        )
    }



    render() {
        /** listDiagnosisModel*/
        const objectArray = this.state.options;
        var arr = [];
        if (this.state.options != undefined) {
            this.state.options.map((c, index) => {
                var item = c.diagnosisGroupName
                c.listDiagnosisModel.map((x, i) => {
                    var item2 = {
                        diagnosisGroupName: item,
                        diagnosisName: x.diagnosisName,
                        diagnosisId: x.diagnosisId
                    }
                    arr.push(item2);
                });
            })
        }

        return (
            <div>

               

                <Link to={'/AddDiagnosisGroup'} className="nav-link lnkbtn" >
                    <Button color="primary"
                    style={{ textTransform: "uppercase" }}
                    > <i className="fa fa-plus"></i> &nbsp; 
                        Add Diagnosis
                    </Button>
                </Link>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th className='fcol'>#</th>
                            <th>Diagnosis Group Name</th>
                            <th>Description</th>
                            <th  className='lcol'>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.renderdiagnosisgroupTable()
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
     * Created Date     :   16 Des 2019
     * purpose          :   To refresh list of diagnosis group master records
     * Author           :   Chandrashekhar Salagar
     */
    async refreshList(pageNumber) {
        // CommonServices.getData(`/diagnosisgroup`).then((temp) => {
            CommonServices.getData(`/Pagination/GetDiagnosisGroups?PageNumber=${pageNumber}&PageSize=${this.state.pageSize}`).then((temp) => {
                this.state.currentPage = pageNumber

            this.setState({
                diagnosisGroupList: temp,
            })
        });
    }
    /**
     * Created Date     :   17 Dec 2019.
     * Purpose          :   Get diagnosis record for edit.
     * Author           :   Chandrashekhar Salagar.
     */
    editDiagnosisGroup(diagnosisGroupId) {
        CommonServices.getDataById(diagnosisGroupId, `/diagnosisgroup`).then((res) => {
            this.setState({
                diagnosisGroupId: res.diagnosisGroupId,
                DiagnosisGroupName: res.diagnosisGroupName,
                Description: res.description,
                EnteredBy: 'Admin',
                DeleteStatus: false
            })
        });
    }
    deleteDiagnosisGroup(id) {
        this.setState({
            diagnosisGroupId: id,
            DiagnosisGroupName: "afsdf",
            EnteredBy: 'Admin',
            DeleteStatus: true
        }, function () {
            CommonServices.postData(this.state, `/diagnosisgroup/DeleteDiagnosisGroup`).then((res) => {
                this.props.enqueueSnackbarAction(res.data, "warning");
                this.refreshList(this.state.currentPag);

                this.setState({
                    diagnosisGroupId: id,
                    DiagnosisGroupName: "",
                    EnteredBy: 'Admin',
                    DeleteStatus: true
                })
            });
        });
    }
    /**
     * get DiagnosisList
     */
    async getDiagnosisList() {
        CommonServices.getData(`/diagnosisgroup/GetDiagnosis`).then((res) => {
            this.setState({
                options: res
            })
        });

    }
}
export default connect(null, { enqueueSnackbarAction, closeSnackbar })(ListDiagnosisGroupComponent)