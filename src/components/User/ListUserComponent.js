import React, { Component } from 'react';
import { Row, Col, Button, FormGroup, Form } from 'react-bootstrap';
import { Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { } from './UserComponent.css'
import { Input, Label } from 'reactstrap';
import UserService from '../../Services/UserServices';
import CommonServices from '../../Services/CommonServices';
import { connect } from 'react-redux';
import {
    enqueueSnackbar as enqueueSnackbarAction,
    closeSnackbar
} from '../../store/actions/notification';
import Pagination from "react-js-pagination";
/**
 * Created Date     :   19 Dec 2019.
 * Purpose          :   Component is used to add new user.
 * Author           :   Chandrashekhar Salagar.
 */
class ListUserComponent extends Component {
    /**
     * Constructor to initialize class members
     * @param {} props 
     */
    constructor(props) {
        super(props);
        this.state = {
            countryList: [],
            UserName: '',
            userId: 0,
            UserPassword: '',
            EmailId: '',
            EnteredBy: 'Admin',
            Title: '',
            currentPage: 1,
            pageSize: 10,
            FirstName: '',
            LastName: '',
            CompanyName: '',
            CountryId: 0,
            ReenterPassword: '',
            ReEnterEmail: '',
            MobileNo: '',
            EmailId: '',
            roleId: '',
            roleList: [],
            userList: [],
            ActiveStatus: [],

            searchQuery: '',
            UserNameError: '',
            PasswordError: '',
            CountryError: ''
        }
    }
    componentDidMount() {
        //this.getDiagnosis();
        debugger
        this.getUser(1);
    }


    // renderUserTable = () => {
    //     let userList = this.state.userList;
    //     const { currentPage, pageSize } = this.state;
    //     const currentPageRecords = userList.slice(((currentPage-1) * pageSize), (currentPage) * pageSize);
       
    //     return currentPageRecords.map((d, index) => {
    //         return <tr key={index}>
    //              <td>{d.userId}</td>       
    //             <td>{d.firstName}</td>
    //             <td>{d.lastName}</td>
    //             <td>{d.userName}</td>
    //             <td>{d.emailId}</td>
    //             <td>{d.roleId}</td>
    //             <td>{String(d.userStatus)}</td>
    //             <td className='lcol'>
    //                 <Link to={"/EditUserComponent/" + d.userId}>
    //                     <Button onClick={() => this.editUser(d.userId)} ><i className="fa fa-pencil"></i></Button>
    //                 </Link>
    //                 <Button style={{ marginLeft: 8 }} variant="danger" onClick={() => this.deleteuser(d.userId)} ><i className="fa fa-trash"></i></Button>
    //             </td>
    //         </tr>
    //     }) 
    // }

    renderUserTable = () => {
        // const { userList, currentPage, pageSize, searchQuery } = this.state;
        // let filteredList = userList;
        // if (searchQuery) {
        //     filteredList = userList.filter(
        //         d =>
        //             (d.firstName && d.firstName.toLowerCase().includes(searchQuery.toLowerCase())) ||
        //             (d.emailId && d.emailId.toLowerCase().includes(searchQuery.toLowerCase()))
        //     );
        // }
    
        // const startIndex = (currentPage - 1) * pageSize;
        // const endIndex = currentPage * pageSize;
        // const currentPageRecords = filteredList.slice(startIndex, endIndex);
    
        return this.state.userList?.resultObject?.map((d, index) => (
            <tr key={index}>
                <td>{d.userId}</td>
                <td>{d.firstName || 'N/A'}</td>
                <td>{d.lastName || 'N/A'}</td>
                <td>{d.userName || 'N/A'}</td>
                <td>{d.emailId || 'N/A'}</td>
                <td>{d.roleId || 'N/A'}</td>
                <td>{String(d.userStatus)}</td>
                <td className='lcol'>
                    <Link to={"/EditUserComponent/" + d.userId}>
                        <Button onClick={() => this.editUser(d.userId)}>
                            <i className="fa fa-pencil"></i>
                        </Button>
                    </Link>
                    <Button
                        style={{ marginLeft: 8 }}
                        variant="danger"
                        onClick={() => this.deleteUser(d.userId)}
                    >
                        <i className="fa fa-trash"></i>
                    </Button>
                </td>
            </tr>
        ));
    };

    handleSearchChange = e => {
        debugger
        // console.log('event==',event.tartget)
        // const { value } = event.target;
        // this.setState({ searchQuery: value });
        this.setState({
            searchQuery: e.target.value,
            userList: []
        })
        this.getUser(1,e.target.value);
      
    };

    // handleSearchChange = (event) => {
    //     console.log('event==',event.tartget.value)
    //     const searchQuery = event.target.value;
    //     this.setState({ searchQuery});
    // }

    renderPagination = () => {
        const totalRecords = (this.state.userList?.totalCount);
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
                onChange={(pageNumber) => { this.getUser(pageNumber, this.state.searchQuery) }}

            />
        )
    }


    render() {
        return (
            <div>

                <Link to={'/ManageUsers'} className="nav-link lnkbtn" >
                    <Button color="primary"
                        style={{ textTransform: "uppercase" }}
                    > <i className="fa fa-plus"></i> &nbsp;
                        Add User
                    </Button>
                </Link>

                <Col sm="5">
                <Input
                    type="text"
                    placeholder="Search by First Name or Email"
                    value={this.state.searchQuery}
                    onChange={this.handleSearchChange}
                />
                </Col>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>UserId</th>
                            <th>First Name</th>
                            <th>Last Name </th>
                            <th>User Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Active Status</th>
                            <th className='lcol'>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.renderUserTable()
                        }
                    </tbody>
                </Table>
                <div responsive="true" className='pgdiv'>
                    {this.renderPagination()}
                </div>
            </div >
        );
    }


    getUser(pageNumber,searchQuery) {
        // CommonServices.getData(`/users`).then((temp) => {
            CommonServices.getData(`/Pagination/GetUser?${searchQuery ? `queryString=${searchQuery}` : ''}&PageNumber=${pageNumber}&PageSize=${this.state.pageSize}`).then((temp) => {
            // CommonServices.getData(`/Pagination/GetUser?PageNumber=${pageNumber}&PageSize=${this.state.pageSize}`).then((temp) => {
                this.state.currentPage = pageNumber
            debugger;
            console.log('temp=====>>>>>', temp);

            this.setState({
                userList: temp,
            })
        });
    }

    editUser(userId) {
        debugger;
        CommonServices.getDataById(userId, `/users`).then((res) => {

            this.setState({
                userId: res.userId,
                FirstName: res.FirstName,
                LastName: res.LastName,
                UserName: res.UserName,
                EmailId: res.EmailId,
                ActiveStatus: res.ActiveStatus,
                roleId: res.roleId,
                EnteredBy: 'Admin',
                DeleteStatus: false



            })
        });
    }


    deleteuser(userId) {
        debugger;
        this.setState({
            userId: userId,
            userName: "tcc",
            userPassword:"hhg" ,
           
           
            mobileNo: "988",
            emailId: "gh",
           
           
            deleteStatus: true,
           
            firstName:"hj",
            lastName: "mcm",
           
            roleId:"0",
           
        }, function () {


        CommonServices.postData(this.state, `/users/DeleteUser`).then((res) => {
           
            alert(res.data);
            this.props.history.push('/ListUserComponent/');
           this. getUser(this.state.currentPage);
            this.setState({
                userId: userId,
                userName: "",
                userPassword: "",
                
                Title: "",
                firstName: "",
                lastName: "",
                roleId: "",
                mobileNo: " ",
                emailId:" ",
                DeleteStatus: true
            })
        });
    });
}
}














export default connect(null, { enqueueSnackbarAction, closeSnackbar })(ListUserComponent)