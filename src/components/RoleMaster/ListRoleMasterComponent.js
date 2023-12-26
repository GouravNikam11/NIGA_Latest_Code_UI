import React, { Component } from 'react';
import { Table, Col, Button, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import CommonServices from '../../Services/CommonServices';
import { connect } from 'react-redux';
import {
    enqueueSnackbar as enqueueSnackbarAction,
    closeSnackbar
} from '../../store/actions/notification';
import Pagination from 'react-js-pagination';
class ListRoleMasterComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            RoleId: 0,
            RoleName: '',
            FirmIds: '',
            RoleMasterList: [],
            EnteredBy: 'Admin',
            DeleteStatus: false,
            currentPage: 1,
            pageSize: 10
        }
    }



    renderrolemasterTable = () => {
        debugger
        let RoleMasterList = this.state.RoleMasterList;
        const { currentPage, pageSize } = this.state;
        const currentPageRecords = RoleMasterList.slice(((currentPage-1) * pageSize), (currentPage) * pageSize);
       
        return currentPageRecords.map((q, index) => {
            return <tr key={index}>
                <td>{q.roleId}</td>
                <td>{q.roleName}</td>
                <td>{q.firmIds}</td>
                <td >
                    <Link to={"/EditRoleMaster/" + q.roleId}>
                        <Button onClick={() => this.editRoleMaster(q.roleId)} >Edit</Button> &nbsp;
                    </Link>
                    <Button variant="danger" onClick={() => this.deleteRoleMaster(q.roleId)} >Delete</Button>
                </td>
            </tr>
        }) 
    }

    renderPagination = () => {
        debugger
        const totalRecords = (this.state.RoleMasterList.length);
        return (
            (totalRecords>9)&&
            <Pagination
                itemClass="page-item" // add it for bootstrap 4
                linkClass="page-link" // add it for bootstrap 4
                activePage={this.state.currentPage}
                itemsCountPerPage={this.state.pageSize}
                totalItemsCount={totalRecords}
                pageRangeDisplayed={this.state.pageSize}
                onChange={(pageNumber)=>{
                    this.setState({
                        currentPage:pageNumber
                    })
                }}
            />
        )
    }



    render() {
        return (
            <div>

                <h2>Role Master List</h2>

                <Link to={'/AddRoleMaster'} className="nav-link">
                    <Button color="primary">
                        Add Role
                    </Button>
                </Link>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Role Name</th>
                            <th>FirmIds</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.renderrolemasterTable()
                        }
                    </tbody>
                </Table>
                <div responsive="true" className='pgdiv'>
                    {this.renderPagination()}
                </div>
            </div>
        );
    }

    componentDidMount() {
        this.getRoleMaster();
        console.log("**********API CALL**************")
    }

    getRoleMaster() {
        CommonServices.getData(`/rolemaster/GetRoleMaster`).then((temp) => {
            console.log(temp);
            debugger;
            this.setState({
                RoleMasterList: temp,
            })
        });
    }
    editRoleMaster(roleId) {
        debugger;
        CommonServices.getDataById(roleId, `/roleMaster`).then((res) => {
            this.setState({
                roleId: res.roleId,
                RoleName: res.roleName,
                FirmIds: res.firmIds,
                EnteredBy: 'Admin',
                DeleteStatus: false
            })
        });
    }

    deleteRoleMaster(id) {
        debugger;
        this.setState({
            roleId: id,
            RoleName: "dnd",
            FirmIds: "dr",
            EnteredBy: 'Admin',
            DeleteStatus: true
        }, function () {
            console.log(this.state)
            debugger;
            CommonServices.postData(this.state, `/roleMaster/DeleteRoleMaster`).then((res) => {
                this.props.enqueueSnackbarAction(res.data, "warning");
                this.getRoleMaster();

                this.setState({
                    roleId: id,
                    RoleName: "",
                    FirmIds: "",
                    EnteredBy: 'Admin',
                    DeleteStatus: true
                })
            });
        });
    }
}
export default connect(null, { enqueueSnackbarAction, closeSnackbar })(ListRoleMasterComponent)
