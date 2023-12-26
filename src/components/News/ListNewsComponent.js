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
class ListNewsComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            newsId: 0,
            newsDate: "",
            newsHeading: "",
            newsSubHeading: "",
            newsContent: "",
            newsImage1: "",
            newsImage2: "",
            newsImage3: "",
            newsImage4: "",
            enteredBy: null,
            enteredDate: "",
            isActive: true,
            images: null,  
            ListNews: [],     
            currentPage: 1,
            pageSize: 10,
        }
    }

    rendernewsTable = () => {
        // debugger
        // let ListNews = this.state.ListNews;
        // const { currentPage, pageSize } = this.state;
        // const currentPageRecords = ListNews.slice(((currentPage-1) * pageSize), (currentPage) * pageSize);
       
        return this.state.ListNews?.resultObject?.map((s, index) => {
            return <tr key={index}>
                <td className='fcol'>{s.newsId}</td>
                <td>{s.newsHeading}</td>
                <td>{s.newsSubHeading}</td>
                <td>{s. newsDate}</td>
               
                <td className='lcol'>
                    <Link to={"/EditNewsComponent/" + s.newsId}>
                        <Button /* onClick={() => this.editNews(s.newsId)} */ ><i className="fa fa-pencil"></i></Button> 
                    </Link>
                    <Button style={{marginLeft:8}} variant="danger" onClick={() => this.deleteNews(s.newsId)} ><i className="fa fa-trash"></i></Button>
                </td>
            </tr>
        })
    }

    renderPagination = () => {
        debugger
        const totalRecords = (this.state.ListNews?.totalCount);
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
                onChange={(pageNumber) => { this.getListNews(pageNumber) }}
            />
        )
    }



    render() {
        return (
            <div>

                <Link to={'/CreateNewsComponent'} className="nav-link lnkbtn" >
                    <Button color="primary"
                    style={{ textTransform: "uppercase" }}
                    > <i className="fa fa-plus"></i> &nbsp; 
                    Create News 
                    </Button>
                </Link>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th className='fcol'>Sr.No</th>
                            <th>News Heading</th>
                            <th>News SubHeading</th>
                            <th>News Date</th>
                            <th className='lcol'>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.rendernewsTable()
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
        this.getListNews(1);

    }
   

    getListNews(pageNumber) {
        // CommonServices.getData(`/NewsDetail/GetAllNewsDetails`).then((temp) => {
            CommonServices.getData(`/Pagination/GetAllNewsDetails?PageNumber=${pageNumber}&PageSize=${this.state.pageSize}`).then((temp) => {
                this.state.currentPage = pageNumber
            console.log(temp);
            debugger;
            this.setState({
                ListNews: temp,
            })
        });
    }
    

    editNews(newsId) {
        debugger;
        CommonServices.getDataById(newsId, `/NewsDetail/GetNewsDetailsbyId`).then((res) => {
            debugger;    
            this.setState({
                newsId: res.newsId,
                newsDate: res.newsDate,
                newsHeading: res.newsHeading,
                newsSubHeading: res.newsSubHeading,
                newsContent: res.newsContent,
                newsImage1: res.newsImage1,
                newsImage2: res.newsImage2,
                newsImage3: res.newsImage3,
                newsImage4: res.newsImage4,
                enteredBy: res.enteredBy,
                enteredDate: res.enteredDate,
                isActive: res.isActive,
                images: res.images,
            })
        });

    }



    deleteNews(newsId) {
        debugger;
      
           
            CommonServices.postData({},`/NewsDetail/DeleteNewsDetails?newsId=`+newsId).then((res) => {
                debugger
                console.log('props=======',this.props)
                this.props.enqueueSnackbarAction("Record deleted successfully.", "warning");
                this.getListNews(this.state.currentPage);

                this.setState({
                  
                })
            });
        
    }

   
}
export default connect(null, { enqueueSnackbarAction, closeSnackbar })(ListNewsComponent)
