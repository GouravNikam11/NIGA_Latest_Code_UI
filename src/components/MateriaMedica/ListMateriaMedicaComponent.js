import React, { Component } from 'react';
import { Table, Col, Button, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import CommonServices from '../../Services/CommonServices';
import Pagination from "react-js-pagination";
import {   FormGroup,  Row } from 'react-bootstrap';
import {  Card, CardBody, CardFooter, CardHeader, } from 'reactstrap';
import { Input, Label, Select } from 'reactstrap';
import AsyncPaginate from "react-select-async-paginate";

export class ListMateriaMedicaComponent extends Component {
    /**
    * Created Date     :   19 Dec 2019  
    * purpose          :   Component responsible for handling DiagnosisMaster records   
    * Author           :   
    */

    constructor(props) {
        super(props);
        this.state = {
            materiaMedicaId: 0,
            authorId:'',
            remedyId:'',
            materiaMedicaHeadId:'',
            HeadName:'',
            MateriaMedicaList: [],
            authorName: '',
            remedyName: '',
            materiaMedicaHeadName: '',
            currentPage: 1,
            pageSize: 10,
            remedyId: '',
            authorId: '',
            RemedyList: [],
            authourList: [],
            RemedyIds: [],

           }

    }

    componentDidMount() 
    {   
        this.getMateriaMedica(1);
        this.getauthor();
        this.getremedy();
        this.GetAllRemedies();
        console.log("**********API CALL**************")
    }

    rendermateriamedicaTable = () => {
        // let MateriaMedicaList = this.state.MateriaMedicaList;
        // const { currentPage, pageSize } = this.state;
        // const currentPageRecords = MateriaMedicaList.slice(((currentPage-1) * pageSize), (currentPage) * pageSize);
       
        return this.state.MateriaMedicaList?.resultObject?.map((d, index) => {
            return <tr key={index}>
                <td className='fcol'>{d.materiaMedicaId}</td>
                <td>{d.authorName}</td>
                <td>{d.remedyName}</td>
                <td>{d.materiaMedicaHeadName}</td>
                <td className='lcol'>
                    <Link to={"/EditMateriaMedicaComponent/" + d.materiaMedicaId}>
                        <Button onClick={() => this.editMateriaMedica(d.materiaMedicaId)} ><i className="fa fa-pencil"></i></Button> &nbsp;
                    </Link>
                    <Button variant="danger" onClick={() => this.deleteMateriaMedica(d.materiaMedicaId)} ><i className="fa fa-trash"></i></Button>
                </td>
            </tr>
        }) 
    }

    renderPagination = () => {
        const totalRecords = (this.state.MateriaMedicaList?.totalCount);
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
                onChange={(pageNumber) => { this.getMateriaMedica(pageNumber) }}

            />
        )
    }



    render() {
        return (
            <div>
<CardBody>
                    <Form encType="multipart/form-data" className="form-horizontal">
                        <Row>
                            <Col xs="12" md="4">
                                <FormGroup >
                                    <Label className="label" htmlFor="">Author :</Label>

                                    <Form.Control as="select"
                                        name="authorId"
                                        onChange={this.changehandleauthorId.bind(this)}
                                        value={this.state.authorId}>
                                        <option value="0">
                                            Select author name
                                        </option>
                                        {
                                            this.renderauthorList()
                                        }
                                    </Form.Control>

                                </FormGroup>
                            </Col>

                            <Col xs="12" md="4">
                                <FormGroup >
                                    <Label className="label" htmlFor="">Remedy :</Label>
                                    {/* <Form.Control as="select"
                                        name="remedyId"
                                        onChange={this.handleChangeremedyId.bind(this)}
                                        value={this.state.remedyId}>
                                        <option value="0">
                                            Select Remedy Name
                                        </option>
                                        {
                                            this.renderRemedyList()
                                        }
                                    </Form.Control> */}
                                    <AsyncPaginate isClearable
                                    labelKey="value"
                                    labelValue="RemedyId"
                                    placeholder="Search remedy name"
                                    value={this.state.RemedyIds}
                                    loadOptions={this.loadRemedies}
                                    onChange={this.RemedyChanged.bind(this)}
                                />
                                </FormGroup>
                            </Col>
                            <Col xs="12" md="4">

                            <Link to={'/AddMateriaMedicaComponent'} className="nav-link lnkbtn" >
                    <Button color="primary"
                    style={{ textTransform: "uppercase" }}
                    > <i className="fa fa-plus"></i> &nbsp; 
                        Add Materia Medica Details
                    </Button>
                </Link>
                </Col>

</Row>
  </Form>
                </CardBody>

                {/* <Link to={'/AddMateriaMedicaComponent'} className="nav-link lnkbtn" >
                    <Button color="primary"
                    style={{ textTransform: "uppercase" }}
                    > <i className="fa fa-plus"></i> &nbsp; 
                        Add Materia Medica Details
                    </Button>
                </Link> */}
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th className='fcol'>#</th>
                           
                            <th>Author</th>
                            <th>Remedy</th>
                            <th>Head</th>
                            <th className='lcol'>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.rendermateriamedicaTable()
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
    getMateriaMedica(pageNumber) {
        debugger
        console.log('temp=====',this.state);

        // CommonServices.getData(`/MateriaMedicaMaster/GetMateriaMedica`).then((temp) => {
            CommonServices.getData(`/Pagination/GetMateriaMedica?${this.state.authorId ? `authorId=${this.state.authorId}&` : ''}${this.state.remedyId ? `remedyId=${this.state.remedyId}&` : ''}PageNumber=${pageNumber}&PageSize=${this.state.pageSize}`).then((temp) => {
                this.state.currentPage = pageNumber

            // console.log('temp=====',temp);
            debugger;
            this.setState({
                MateriaMedicaList: temp,
            })

        });
    }

    /**
     * Created Date     :   19 Dec 2019.
     * Purpose          :   Get diagnosis record for edit.
     * Author           :   
     */
     editMateriaMedica(materiaMedicaId) {
        CommonServices.getDataById(materiaMedicaId, `/MateriaMedicaMaster`).then((res) => {
            this.setState({
                materiaMedicaId: res.materiaMedicaId,
                authorId: res.authorId,
                remedyId: res.remedyId,
                materiaMedicaHeadId: res.materiaMedicaHeadId,
            })
        });
    }
    deleteMateriaMedica(id) {
        debugger;
        this.setState({
            materiaMedicaId: id,
            authorId:'',
            remedyId:'',
            materiaMedicaHeadId: '',
            HeadName:'',
        
            MateriaMedicaList: [],
          


        }, function () {
            console.log(this.state)
            debugger;
            CommonServices.postData(this.state, `/MateriaMedicaMaster/DeleteMateriaMedica`).then((res) => {
                alert(res.data);
                this.getMateriaMedica(this.state.currentPage);

                this.setState({
                    materiaMedicaHeadId: '',
                    HeadName:'',
                    MateriaMedicaList: [],
                    materiaMedicaId: id,
                    authorId:"",
                    remedyId:"",
                   
                    
                })
            });
        });
    }
    renderauthorList = () => {
        if (this.state.authourList == undefined) {
            return null;
        }
        return this.state.authourList.map((author, index) => {
            return <option key={index} value={author.authorId}>{author.authorName}</option>
        })
    }

    changehandleauthorId(e) {
        this.state.authorId= e.target.value 
        this.getMateriaMedica(1);

    }

    handleChangeremedyId(e) {
        this.state.remedyId= e.target.value 
        this.getMateriaMedica(1);
    }

    renderRemedyList = () => {
        if (this.state.RemedyList == undefined) {
            return null;
        }
        return this.state.RemedyList.map((Remedy, index) => {
            return <option key={index} value={Remedy.remedyId}>{Remedy.remedyName}</option>
        })
    }
    getauthor() {
        CommonServices.getData(`/DropdownList/GetAuthorforMateriaMedicaDDL`).then((temp) => {
            this.setState({
                authourList: temp
            })
        })
    }
    getremedy() {
        CommonServices.getData(`/remedy/GetRemedies`).then((temp) => {
            this.setState({
                RemedyList: temp
            })
        })
    }
    loadRemedies = async (search, prevOptions) => {
        debugger;
        const options = [];
        var subsectionList = this.state.SubSectionModel;
        await this.GetAllRemedies().then((result) => {
            subsectionList = result;
            console.log('data===>>', result)
        })
debugger
        subsectionList.map(x => options.push({ value: x.remedyId, label: x.remedyName }));
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

    RemedyChanged = (e) => {
        debugger;
        // if (e != null) {
        //     this.state.RemedyIds=e
        //     // this.setState({
        //     //     RemedyIds: e,
        //     // }, () => {
        //     // })
        // }
        // else
        // {
        //     this.state.RemedyIds=[]
        // }
        if (e != null) {
            this.state.remedyId=e.value
            this.state.RemedyIds=e

            // this.setState({
            //     RemedyIds: e,
            // }, () => {
            // })
        }
         else
        {
            this.state.remedyId=''
            this.state.RemedyIds=[]
        }
        this.getMateriaMedica(1);

    }

    GetAllRemedies(){
   debugger
   return CommonServices.getData(`/MateriaMedicaMaster/GetRemedyDDL`).then((remadies) => {

    return remadies;
})
    }
}

export default ListMateriaMedicaComponent
