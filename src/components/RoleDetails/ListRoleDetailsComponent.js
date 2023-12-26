import React, { Component } from 'react';
import { Table, Col, Button, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import CommonServices from '../../Services/CommonServices';
import Select from 'react-select';
import { connect } from 'react-redux';
import {
    enqueueSnackbar as enqueueSnackbarAction,
    closeSnackbar
} from '../../store/actions/notification';


class ListRoleDetailsComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            RecordId: 0,
            RoleId: '',
            MenuId: '',
            IsView: '',
            IsAdd: '',
            IsModify: '',
            RoleDetailsList: [],
            EnteredBy: 'Admin',
            IsDelete: false
        }
    }
    render() {
        return (
            <div>

                <h2>Role Details List</h2>

                <Link to={'/AddRoleDetails'} className="nav-link">
                    <Button color="primary">
                        Add Role Details
                    </Button>
                </Link>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Role Name</th>
                            <th>Menu Name</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.RoleDetailsList ?
                                this.state.RoleDetailsList.map((q, index) => {
                                    return <tr key={index}>
                                        <td>{q.recordId}</td>
                                        <td>{q.roleName}</td>
                                        <td>{q.menuName}</td>
                                        <td >
                                            <Link to={"/EditRoleDetails/" + q.recordId}>
                                                <Button onClick={() => this.editRoleDetails(q.recordId)} >Edit</Button> &nbsp;
                                            </Link>
                                            <Button variant="danger" onClick={() => this.deleteRoleDetails(q.recordId)} >Delete</Button>
                                        </td>
                                    </tr>
                                }) : null
                        }
                    </tbody>
                </Table>

            </div >
        );
    }

    componentDidMount() {
        this.getRoleDetails();
        console.log("**********API CALL**************")
    }

    getRoleDetails() {
        CommonServices.getData(`/roleDetails/GetRoleDetails`).then((temp) => {
            console.log(temp);
            debugger;
            this.setState({
                RoleDetailsList: temp,
            })
        });
    }
    editRoleDetails(recordId) {
        debugger;

        CommonServices.getDataById(recordId, `/roleDetails`).then((res) => {
            this.setState({
                RecordId: res.recordId,
                RoleId: res.roleId,
                MenuId: res.menuId,
                IsView: res.isView,
                IsAdd: res.isAdd,
                IsModify: res.isModify,
                EnteredBy: 'Admin',
                IsDelete: false
            })
        });
    }

    deleteRoleDetails(id) {
        debugger;
        this.setState({
            recordId: id,
            RoleId: 3,
            MenuId: 1,
            IsView: '',
            IsAdd: '',
            IsModify: '',
            EnteredBy: 'Admin',
            IsDelete: true
        }, function () {
            console.log(this.state)
            debugger;
            CommonServices.postData(this.state, `/roleDetails/DeleteRoleDetails`).then((res) => {
                this.props.enqueueSnackbarAction(res.data, "warning");
                this.getRoleDetails();

                this.setState({
                    recordId: id,
                    RoleId: "",
                    MenuId: "",
                    IsView: '',
                    IsAdd: '',
                    IsModify: '',
                    EnteredBy: 'Admin',
                    IsDelete: true
                })
            });
        });
    }
}
export default connect(null, { enqueueSnackbarAction, closeSnackbar })(ListRoleDetailsComponent)
