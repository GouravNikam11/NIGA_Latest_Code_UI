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
import { Input } from 'reactstrap';
class AuthorListComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            authorId: 0,
            authorName: '',
            Description: '',
            ListAuthor: [],
            EnteredBy: 'Admin',
            DeleteStatus: false,
            currentPage: 1,
            pageSize: 10,
            searchQuery:"",
        }
    }

    renderauthorTable = () => {
        // debugger
        // let ListAuthor = this.state.ListAuthor;
        // const { currentPage, pageSize } = this.state;
        // const currentPageRecords = ListAuthor.slice(((currentPage-1) * pageSize), (currentPage) * pageSize);
       
        return this.state.ListAuthor?.resultObject?.map((s, index) => {
            return <tr key={index}>
                <td className='fcol'>{s.authorId}</td>
                <td>{s.authorName}</td>
                <td>{s.description}</td>
                <td className='lcol'>
                    <Link to={"/EditAuthorComponent/" + s.authorId}>
                        <Button onClick={() => this.editAuthor(s.authorId)} ><i className="fa fa-pencil"></i></Button> 
                    </Link>
                    <Button style={{marginLeft:8}} variant="danger" onClick={() => this.deleteAuthor(s.authorId)} ><i className="fa fa-trash"></i></Button>
                </td>
            </tr>
        })
    }

    
    renderPagination = () => {
        const totalRecords = (this.state.ListAuthor.totalCount);

        // const totalRecords = (this.state.ListAuthor.totalCount);
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
                onChange={(pageNumber) => { this.getListAuthor(pageNumber,this.state.searchQuery) }}
            />
        )
    }

    handleSearch = (e) => {
        // console.log('handleChangeforsearch===', event.target.value)
        // const searchQuery = event.target.value;
        // this.setState({ searchQuery });
        this.setState({
            searchQuery: e.target.value,
            ListAuthor: [],
        })
        this.getListAuthor(1,e.target.value);
    }

    render() {
        return (
            <div>

                <Link to={'/AddAuthorComponent'} className="nav-link lnkbtn" >
                    <Button color="primary"
                    style={{ textTransform: "uppercase" }}
                    > <i className="fa fa-plus"></i> &nbsp; 
                    Add Author 
                    </Button>
                </Link>

                <Col sm="5">
                    <Input 
                       type="text"
                       placeholder="Search by diagnosis name..."
                       value={this.state.searchQuery}
                       onChange={this.handleSearch}/>
                </Col>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th className='fcol'>Sr.No</th>
                            <th>Author Name</th>
                            <th>Description</th>
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

    componentDidMount() {
        this.getListAuthor(1);
    }
    getListAuthor(pageNumber,searchQuery) {
        // CommonServices.getData(`/Author`).then((temp) => {
            CommonServices.getData(`/Pagination/GetAuthor?${searchQuery ? `queryString=${searchQuery}` : ''}&PageNumber=${pageNumber}&PageSize=${this.state.pageSize}`).then((temp) => {
                this.state.currentPage = pageNumber
               
            this.setState({
                ListAuthor: temp,
            })
        });
    }

    editAuthor(authorId) {
        debugger;
        CommonServices.getDataById(authorId, `/Author/GetAuthorById`).then((res) => {
            debugger;    
            this.setState({
                authorId: res.authorId,
                authorName: res.authorName,
                Description: res.description,
                EnteredBy: 'Admin',
                DeleteStatus: false
            })
        });

    }

    deleteAuthor(id) {
        debugger;
        this.setState({
            authorId: id,
            authorName: "jjc",
            Description: "mcmcm",
            EnteredBy: 'Admin',
            DeleteStatus: true
        }, function () {
            console.log(this.state)
            debugger;
            CommonServices.postData(this.state, `/Author/DeleteAuthor`).then((res) => {
                debugger
                console.log('props=======',this.props)
                this.props.enqueueSnackbarAction("Record deleted successfully.", "warning");
                this.getListAuthor(this.state.currentPage);
                this.setState({
                    authorId: id,
                    authorName: "",
                    Description: "",
                    EnteredBy: 'Admin',
                    DeleteStatus: true
                })
            });
        });
    }
}
export default connect(null, { enqueueSnackbarAction, closeSnackbar })(AuthorListComponent)
