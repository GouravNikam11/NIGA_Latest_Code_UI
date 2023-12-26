import React, { Component } from 'react';
import { Table, Col, Button, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import CommonServices from '../../Services/CommonServices';
import Pagination from "react-js-pagination";
import {
    enqueueSnackbar as enqueueSnackbarAction,
    closeSnackbar
} from '../../store/actions/notification';
import { connect } from 'react-redux';

export class ListMateriaMedicaHeadComponent extends Component {
   

    constructor(props) {
        super(props);
        this.state = {
            materiaMedicaHeadId: 0,
            authorId:'',
            materiaMedicaHeadName:'',
            HeadList: [],
            description: '',
            isSection:'',
            seqNo:'',
           lastseqno:0,
           authorName:'',
           isDeleted:false,
           currentPage: 1,
           pageSize: 10
        }
   }
    componentDidMount() {
        this.getMateriaMedicaHead(1);
        console.log("**********API CALL**************")
    }
    
    renderheadTable = () => {
        // let HeadList = this.state.HeadList;
        // const { currentPage, pageSize } = this.state;
        // const currentPageRecords = HeadList.slice(((currentPage-1) * pageSize), (currentPage) * pageSize);
       
        return this.state.HeadList?.resultObject?.map((d, index) => {
            return <tr key={index}>
                {/* <td className='fcol'></td> */}
                <td >{d.materiaMedicaHeadName}</td>
                <td>{d.authorName}</td>
                <td>{d.description}</td>
                <td>{d.seqNo}</td>
                <td style={{ textAlign: 'center' }}><input type="checkbox" checked={d.differentialMM} 
                onClick={() => this.CheckisdifferentialMM(d.materiaMedicaHeadId,!d.differentialMM)}/></td>
                <td className='lcol'>
                    <Link to={"/EditMateriaMedicaHeadComponent/" + d.materiaMedicaHeadId}>
                        <Button onClick={() => this.editMateriaMedicaHead(d.materiaMedicaHeadId)} ><i className="fa fa-pencil"></i></Button>
                    </Link>
                    <Button style={{marginLeft:8}} variant="danger" onClick={() => this.deletedmateriaMedicaHead(d.materiaMedicaHeadId)} ><i className="fa fa-trash"></i></Button>
                </td>
            </tr>
        }) 
    }

    renderPagination = () => {
        const totalRecords = (this.state.HeadList.totalCount);
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
                onChange={(pageNumber) => { this.getMateriaMedicaHead(pageNumber) }}

            />
        )
    }


    render() {
        return (
            <div>

                <Link to={'/AddMateriaMedicaHeadComponent/'+this.state.lastseqno} className="nav-link lnkbtn" >
                    <Button color="primary"
                    style={{ textTransform: "uppercase" }}
                    > <i className="fa fa-plus"></i> &nbsp; 
                        Add Materia Medica Head
                    </Button>
                </Link>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            {/* <th className='fcol'>#</th> */}
                            <th>Head Name</th>
                            <th>Author Name </th>
                            <th>Description</th>
                            <th>Seq. No.</th>
                            <th style={{ width: '120px' }}>Differential MM</th>
                            <th className='lcol'>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.renderheadTable()
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
    * Created Date     :   19 Des 2019
    * purpose          :   To refresh list of diagnosis master records
    * Author           :   
    */
     getMateriaMedicaHead(pageNumber) {
        CommonServices.getData(`/Pagination/GetMateriaMedicaHead?PageNumber=${pageNumber}&PageSize=${this.state.pageSize}`).then((temp) => {
            this.state.currentPage = pageNumber

        // CommonServices.getData(`/MateriaMedicaHead/GetMateriaMedicaHead`).then((temp) => {
            console.log(temp);
            debugger;
            this.setState({
                HeadList: temp,
                lastseqno:temp.length>0?temp[temp.length-1].seqNo:0
            })
        });
    }

    /**
     * Created Date     :   19 Dec 2019.
     * Purpose          :   Get diagnosis record for edit.
     * Author           :   
     */
    editMateriaMedicaHead(materiaMedicaHeadId) {
        CommonServices.getDataById(materiaMedicaHeadId, `/MateriaMedicaHead`).then((res) => {
            this.setState({
                materiaMedicaHeadId: res.materiaMedicaHeadId,
                materiaMedicaHeadName: res.materiaMedicaHeadName,
                description: res.description,
                authorId: res.authorId,
                isSection: res.isSection,
                seqNo:res.seqNo,
                
            })
        });
    }
    deletedmateriaMedicaHead(id) {
        debugger;
        this.setState({
            materiaMedicaHeadId: id,
            seqNo:"",
            materiaMedicaHeadName:"",
            description: "mcmcm",
            isSection:"",
            authorId: "3",
            HeadList: [],
          

   
        }, function () {
            console.log(this.state)
            debugger;
            CommonServices.postData(this.state, `/MateriaMedicaHead/DeleteMateriaMedicaHead`).then((res) => {
            this.props.enqueueSnackbarAction(res.data, "warning");
                this.getMateriaMedicaHead(this.state.currentPage);

                this.setState({
            materiaMedicaHeadId: id,
            seqNo:"",
            materiaMedicaHeadName:"",
            description: "",
            isSection:"",
            authorId: "",
            HeadList: [],
          
                   
                })
            });
        });
    }

    CheckisdifferentialMM = (materiaMedicaHeadId,differentialMM) => {
        CommonServices.postData({materiaMedicaHeadId:materiaMedicaHeadId,differentialMM:differentialMM}, `/MateriaMedicaHead/UpdateDifferentialMateriaMedicadDefaultStatus`).then((result) => {
            this.getMateriaMedicaHead(this.state.currentPage);
        });
    }
}

export default connect(null, { enqueueSnackbarAction, closeSnackbar })(ListMateriaMedicaHeadComponent)
