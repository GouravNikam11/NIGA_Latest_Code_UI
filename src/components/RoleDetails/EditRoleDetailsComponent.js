import React, { Component } from 'react';
import { Table, Col, Button, FormGroup, Form, Row } from 'react-bootstrap';
import { Input, Label, Select } from 'reactstrap';
import CommonServices from '../../Services/CommonServices';
import { connect } from 'react-redux';
import {
    enqueueSnackbar as enqueueSnackbarAction,
    closeSnackbar
} from '../../store/actions/notification';

class EditRoleDetailsComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            RecordId: 0,
            RoleId: null,
            MenuId: null,
            IsView: false,
            IsAdd: false,
            IsModify: false,
            RoleDetailsList: [],
            RoleMasterList: [],
            MenuMasterList: [],
            EnteredBy: 'Admin',
            IsDelete: false
        }
        this.handleChange = this.handleChange.bind(this);
        this.submitForm = this.submitForm.bind(this);
    }

    renderRoleList = () => {
        if (this.state.roleMasterList == undefined) {
            return null;
        }
        return this.state.roleMasterList.map((role, index) => {
            return <option key={index} value={role.roleId}>{role.roleName}</option>
        })
    }

    renderMenuList = () => {
        if (this.state.menuMasterList == undefined) {
            return null;
        }
        return this.state.menuMasterList.map((menu, index) => {
            return <option key={index} value={menu.menuId}>{menu.menuName}</option>
        })
    }

    render() {
        return (
            <div>

                <h2>Edit Role Details</h2>

                <br></br>
                <div>
                    <Form>
                        <Row>
                            <Col xs="12" md="6">
                                <Form.Group as={Row} controlId="formRoleId">
                                    <Form.Label column sm="3">
                                        Role Name:
                                    </Form.Label>
                                    <Col sm={8}>
                                        <Form.Control as="select"
                                            name="RoleId"
                                            onChange={this.handleChange}
                                            value={this.state.RoleId === null ? '' : this.state.RoleId}>
                                            <option value="0">Select</option>
                                            {
                                                this.renderRoleList()
                                            }
                                        </Form.Control>
                                    </Col>
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs="12" md="6">
                                <Form.Group as={Row} controlId="formMenuId">
                                    <Form.Label column sm="3">
                                        Menu Name:
                                    </Form.Label>
                                    <Col sm={8}>
                                        <Form.Control as="select"
                                            name="MenuId"
                                            onChange={this.handleChange}
                                            value={this.state.MenuId === null ? '' : this.state.MenuId}>
                                            <option value="0">Select</option>
                                            {
                                                this.renderMenuList()
                                            }
                                        </Form.Control>
                                    </Col>
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs="12" md="6">
                                <Form.Group as={Row} controlId="formIsView">
                                    <Form.Label column sm="5">
                                        Is View:
                                    </Form.Label>
                                    <Col sm={1}>
                                        <Form.Control style={{ height: '20px', marginTop: '9px' }} type="checkbox" placeholder="IsView"
                                            name="IsView"
                                            checked={this.state.IsView}
                                            onChange={this.handleChange}
                                            value={this.state.IsView} />
                                    </Col>
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs="12" md="6">
                                <Form.Group as={Row} controlId="formIsAdd">
                                    <Form.Label column sm="5">
                                        Is Add:
                                    </Form.Label>
                                    <Col sm={1}>
                                        <Form.Control style={{ height: '20px', marginTop: '9px' }} type="checkbox" placeholder="IsAdd"
                                            name="IsAdd"
                                            checked={this.state.IsAdd}
                                            onChange={this.handleChange}
                                            value={this.state.IsAdd} />

                                    </Col>
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs="12" md="6">
                                <Form.Group as={Row} controlId="formIsModify">
                                    <Form.Label column sm="5">
                                        Is Modify:
                                    </Form.Label>
                                    <Col sm={1}>
                                        <Form.Control style={{ height: '20px', marginTop: '9px' }} type="checkbox" placeholder="IsAdd"
                                            name="IsModify"
                                            checked={this.state.IsModify}
                                            onChange={this.handleChange}
                                            value={this.state.IsModify} />

                                    </Col>
                                </Form.Group>
                            </Col>
                        </Row>
                        <Form.Group>
                            <Button onClick={this.submitForm}>Save</Button>
                        </Form.Group>
                    </Form>
                </div>
                <br></br>


            </div>
        );
    }

    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value,
            [e.target.checked]: e.target.checked
        })
    }
    async componentDidMount() {
        await this.GetRoleMaster();
        await this.GetMenuMaster();
        var Id = this.props.match.params.id;
        this.editRoleDetails(Id);
    }

    async GetRoleMaster() {
        CommonServices.getData(`/roleMaster/GetRoleMaster`).then((temp) => {
            console.log(temp);
            this.setState({
                roleMasterList: temp
            })
        })
    }
    async GetMenuMaster() {
        debugger;
        CommonServices.getData(`/menuMaster/GetMenuMaster`).then((temp) => {
            console.log(temp);
            this.setState({
                menuMasterList: temp
            })
        })
    }

    submitForm() {
        debugger;
        CommonServices.postData(this.state, `/roleDetails`).then((responseMessage) => {
            alert(responseMessage.data);

            this.props.history.push('/ListRoleDetails');
        });
        this.setState({
            recordId: 0,
            RoleId: '',
            MenuId: '',
            IsView: '',
            IsAdd: '',
            IsModify: '',
            EnteredBy: 'Admin',
            IsDelete: false
        });
    }

    editRoleDetails(recordId) {
        debugger;
        if (recordId != undefined) {
            CommonServices.getDataById(recordId, `/roleDetails`).then((res) => {
                console.log(res);
                this.setState({
                    recordId: res.recordId,
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
    }
}
export default connect(null, { enqueueSnackbarAction, closeSnackbar })(EditRoleDetailsComponent)
