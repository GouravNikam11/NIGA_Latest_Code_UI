
import React, { Component } from 'react';
import { Table, Col, Button, Form,Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import CommonServices from '../../Services/CommonServices';
import { connect } from 'react-redux';
import {
    enqueueSnackbar as enqueueSnackbarAction,
    closeSnackbar
} from '../../store/actions/notification';
import Pagination from "react-js-pagination";
class LanguageListComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            languageId: 0,
            languageName: "",
            description: "",
            ListLanguage: [],
            currentPage: 1,
            pageSize: 10,
        }
    }

    renderLanguageTable = () => {
        // debugger
        // let ListLanguage = this.state.ListLanguage;
        // const { currentPage, pageSize } = this.state;
        // const currentPageRecords = ListLanguage.slice(((currentPage-1) * pageSize), (currentPage) * pageSize);
           
        // if (this.state.ListLanguage.resultObject?.length === 0) {
        //     return (
        //         <tr>
        //             <td colSpan={7} style={{ textAlign: 'center' }}>
        //                 <Row>
        //                     <Col>
        //                         <label>No record found.</label>
        //                     </Col>
        //                 </Row>
        //             </td>
        //         </tr>
        //     );
        // }
        return this.state.ListLanguage?.resultObject?.map((s, index) => {
            return <tr key={index}>
                <td className='fcol'>{s.languageId}</td>
                <td>{s.languageName}</td>
                <td>{s.description}</td>
                <td className='lcol'>
                    <Link to={"/EditLanguage/" + s.languageId}>
                        <Button><i className="fa fa-pencil"></i></Button> 
                    </Link>
                    <Button style={{marginLeft:8}} variant="danger" onClick={() => this.deleteLanguage(s.languageId)} ><i className="fa fa-trash"></i></Button>
                </td>
            </tr>
        })
    }

    renderPagination = () => {
        debugger
        const totalRecords = (this.state.ListLanguage.totalCount);
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
                onChange={(pageNumber) => { this.getListLanguage(pageNumber) }}

            />
        )
    }


    render() {
        return (
            <div>

                <Link to={'/AddLanguage'} className="nav-link lnkbtn" >
                    <Button color="primary"
                    style={{ textTransform: "uppercase" }}
                    > <i className="fa fa-plus"></i> &nbsp; 
                    Add Language 
                    </Button>
                </Link>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th className='fcol'>Sr.No</th>
                            <th>Language Name</th>
                            <th>Description</th>
                            <th className='lcol'>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.renderLanguageTable()
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
        this.getListLanguage(1);

    }
    getListLanguage(pageNumber) {
        CommonServices.getData(`/Pagination/GetLanguage?PageNumber=${pageNumber}&PageSize=${this.state.pageSize}`).then((temp) => {
            this.state.currentPage = pageNumber
            this.setState({
                ListLanguage: temp,
            })
        });
    }


    deleteLanguage(id) {
        debugger;
        this.setState({
            languageId: id,
            languageName: "jjc",
            description: "mcmcm",
            isDeleted: true
        }, function () {
            console.log(this.state)
            debugger;
            CommonServices.postData(this.state, `/LanguageMaster/DeleteLanguage`).then((res) => {
                debugger
                console.log('props=======',this.props)
                this.props.enqueueSnackbarAction("Record deleted successfully.", "warning");
                this.getListLanguage(this.state.currentPage);

                this.setState({
                    languageId: 0,
                    languageName: "",
                    description: "",
                    isDeleted: true
                })
            });
        });
    }
}
export default connect(null, { enqueueSnackbarAction, closeSnackbar })(LanguageListComponent)
