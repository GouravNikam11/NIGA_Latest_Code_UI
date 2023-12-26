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
class ListBlogsComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            blogId: 0,
            blogHead: "",
            blogSubHead: "",
            blogDate: "",
            blogImage1: '',
            blogImage2: '',
            blogDetails1: "",
            isActive: true,
            enteredBy: 0,
            enteredDate: "",
            changedBy: '',
            changedDate: '',
            currentPage: 1,
            pageSize: 10,
            BlogList:[],
        }
    }

    renderblogsTable = () => {
        // debugger
        // let BlogList = this.state.BlogList;
        // const { currentPage, pageSize } = this.state;
        // const currentPageRecords = BlogList.slice(((currentPage-1) * pageSize), (currentPage) * pageSize);
       
        return this.state.BlogList?.resultObject?.map((s, index) => {
            return <tr key={index}>
                <td className='fcol'>{s.blogId}</td>
                <td>{s.blogHead}</td>
                <td>{s.blogSubHead}</td>
                <td>{s. blogDate}</td>
               
                <td className='lcol'>
                    <Link to={"/EditBlogsCompoent/" + s.blogId}>
                        <Button /* onClick={() => this.editNews(s.newsId)} */ ><i className="fa fa-pencil"></i></Button> 
                    </Link>
                    <Button style={{marginLeft:8}} variant="danger" onClick={() => this.deleteBlogs(s.blogId)} ><i className="fa fa-trash"></i></Button>
                </td>
            </tr>
        })
    }

    renderPagination = () => {
        debugger
        const totalRecords = (this.state.BlogList?.totalCount);
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
                onChange={(pageNumber) => { this.getListBlogs(pageNumber) }}

            />
        )
    }



    render() {
        return (
            <div>

                <Link to={'/AddBlogsComponent'} className="nav-link lnkbtn" >
                    <Button color="primary"
                    style={{ textTransform: "uppercase" }}
                    > <i className="fa fa-plus"></i> &nbsp; 
                    Create Blog
                    </Button>
                </Link>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th className='fcol'>Sr.No</th>
                            <th>Blog Heading</th>
                            <th>Blog SubHeading</th>
                            <th>Blog Date</th>
                            <th className='lcol'>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.renderblogsTable()
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
        this.getListBlogs(1);

    }
   

    getListBlogs(pageNumber) {
        // CommonServices.getData(`/BlogDetail/GetAllBlogDetail`).then((temp) => {
            CommonServices.getData(`/Pagination/GetAllBlogDetail?PageNumber=${pageNumber}&PageSize=${this.state.pageSize}`).then((temp) => {
                this.state.currentPage = pageNumber
            console.log(temp);
            debugger;
            this.setState({
                BlogList: temp,
            })
        });
    }
    

    



    deleteBlogs(blogId) {
        debugger;
      
           
            CommonServices.postData({},`/BlogDetail/DeleteBlogDetail?blogId=`+blogId).then((res) => {
                this.props.enqueueSnackbarAction("Record deleted successfully.", "warning");
                this.getListBlogs(this.state.currentPage);

                this.setState({
                  
                })
            });
        
    }

   
}
export default connect(null, { enqueueSnackbarAction, closeSnackbar })(ListBlogsComponent)
