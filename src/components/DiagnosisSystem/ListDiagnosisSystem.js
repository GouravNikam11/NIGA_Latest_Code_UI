import React, { Component } from 'react';
import { Table, Col, Button, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import CommonServices from '../../Services/CommonServices';
import Pagination from "react-js-pagination";

export class ListDiagnosisSystem extends Component {
   

    constructor(props) {
        super(props);
        this.state = {
            diagnosisSystemId: 0,
            diagnosisSystemName:'',
            diagnosisSystemList: [],
            description: '',
            isActive:'',
            currentPage: 1,
            pageSize: 10
        }
   }
    
    renderdiagnosisSystemTable = () => {
        // let diagnosisSystemList = this.state.diagnosisSystemList;
        // const { currentPage, pageSize } = this.state;
        // const currentPageRecords = diagnosisSystemList.slice(((currentPage-1) * pageSize), (currentPage) * pageSize);
       
        return this.state.diagnosisSystemList?.resultObject?.map((d, index) => {
            return <tr key={index}>
                <td className='fcol'>{d.diagnosisSystemId}</td>
                <td >{d.diagnosisSystemName}</td>
                <td>{d.description}</td>
                {/* <td>{d.isActive}</td> */}
                
                <td className='lcol'>
                    <Link to={"/EditDignosisSystem/" + d.diagnosisSystemId}>
                        <Button  ><i className="fa fa-pencil"></i></Button>
                    </Link>
                    <Button style={{marginLeft:8}} variant="danger" onClick={() => this.deletediagnosisSystem(d.diagnosisSystemId)} ><i className="fa fa-trash"></i></Button>
                </td>
            </tr>
        }) 
    }

    renderPagination = () => {
        const totalRecords = (this.state.diagnosisSystemList.totalCount);
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
                onChange={(pageNumber) => { this.getDignosisSystem(pageNumber) }}

            />
        )
    }


    render() {
        return (
            <div>

                <Link to={'/AddDignosisSystem'} className="nav-link lnkbtn" >
                    <Button color="primary"
                    style={{ textTransform: "uppercase" }}
                    > <i className="fa fa-plus"></i> &nbsp; 
                        Add Diagnosis System
                    </Button>
                </Link>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th className='fcol'>#</th>
                            <th>Diagnosis System Name</th>
                            <th>Description</th>
                            {/* <th>IsActive</th> */}
                            <th className='lcol'>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.renderdiagnosisSystemTable()
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
     getDignosisSystem(pageNumber) {
        // CommonServices.getData(`/DiagnosisSystem/GetDiagnosisSystem`).then((temp) => {
            CommonServices.getData(`/Pagination/GetDiagnosisSystem?PageNumber=${pageNumber}&PageSize=${this.state.pageSize}`).then((temp) => {
                this.state.currentPage = pageNumber

            console.log(temp);
            debugger;
            this.setState({
                diagnosisSystemList: temp,
            })
        });
    }



    componentDidMount() {
        this.getDignosisSystem(1);
        
    }
    
    /**
     * Created Date     :   19 Dec 2019.
     * Purpose          :   Get diagnosis record for edit.
     * Author           :   
     */
    


    deletediagnosisSystem(id) {
        debugger;
        CommonServices.postData({diagnosisSystemId:id}, `/DiagnosisSystem/DeleteDiagnosisSystem`).then((res) => {
            // this.props.enqueueSnackbarAction("Record deleted successfully.", "warning");
            debugger
            console.log('res==',res)
            alert(res.data);
             this.getDignosisSystem(this.state.currentPage);
             this.setState({
                 diagnosisSystemId: id,
                 diagnosisSystemName: "",
                 description: "",
                 isActive: false
             })
         });
    }











    // deleteddiagnosisSystem(id) {
    //     debugger;
    //     this.setState({
    //         diagnosisSystemId: id,
    //         diagnosisSystemName:"abab",
    //         description: "mcmc",
    //         isActive:false
    //       },function () {
    //         debugger;
    //         debugger;
           
          
           

    //     //  let   obj={
    //     //         "diagnosisSystemId": id,
    //     //         "diagnosisSystemName": this.state.diagnosisSystemName,
    //     //         "description": this.state.description,
    //     //         "isActive": false
    //     //     }
    //     CommonServices.postData(this.state, `/DiagnosisSystem/DeleteDiagnosisSystem`).then((res) => {
    //             debugger;
    //             alert(res.data);
    //             this.getMateriaMedicaHead();

    //             this.setState({
    //         diagnosisSystemId: id,
    //         isActive:"",
    //         diagnosisSystemName:"",
    //         description: "",
    //         diagnosisSystemList: [],
          
                   
    //             })
    //         });
    //     });
    // }
}



export default ListDiagnosisSystem
