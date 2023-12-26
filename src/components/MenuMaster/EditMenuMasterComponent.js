import React, { Component } from 'react';
import { Table, Col, Button, FormGroup, Form, Row } from 'react-bootstrap';
import { Input, Label, Select } from 'reactstrap';
import CommonServices from '../../Services/CommonServices';
import { connect } from 'react-redux';
import {
    enqueueSnackbar as enqueueSnackbarAction,
    closeSnackbar
} from '../../store/actions/notification';

class EditMenuMasterComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            MenuId: 0,
            ModuleId: 0,
            moduleMasterList: [],
            MenuName: '',
            MenuNameMarathi: '',
            MenuType: '',
            ParentMenuId: '',
            MenuUrl: '',
            Description: '',
            MenuIcon: '',
            ActionName: '',
            ControllerName: '',
            IsLeaf: false,
            ShowInMainMenu: false,
            SeqNo: '',
            FirmIds: '',
            MenuMasterList: [],
            EnteredBy: 'Admin',
            DeleteStatus: false
        }
        this.handleChange = this.handleChange.bind(this);
        this.submitForm = this.submitForm.bind(this);
    }

    renderModuleList = () => {
        if (this.state.moduleMasterList == undefined) {
            return null;
        }
        return this.state.moduleMasterList.map((module, index) => {
            return <option key={index} value={module.moduleId}>{module.moduleName}</option>
        })
    }
    renderFirmDetailsList = () => {
        if (this.state.FirmDetailsList == undefined) {
            return null;
        }
        return this.state.FirmDetailsList.map((firm, index) => {
            return <option key={index} value={firm.firmIds}>{firm.firmName}</option>
        })
    }
    render() {
        return (
            <div>

                <h2>Edit Menu</h2>

                <br></br>
                <div>
                    <Form>
                        <Row>
                            <Col xs="12" md="6">
                                <Form.Group as={Row} controlId="formMenuName">
                                    <Form.Label column sm="3">
                                        Menu Name:
                                    </Form.Label>
                                    <Col sm={6}>
                                        <Form.Control type="text" placeholder="Menu Name"
                                            name="MenuName"
                                            onChange={this.handleChange}
                                            value={this.state.MenuName === null ? '' : this.state.MenuName} />

                                    </Col>
                                </Form.Group>
                            </Col>
                            <Col xs="12" md="6">
                                <Form.Group as={Row} controlId="formMenuNameMarathi">
                                    <Form.Label column sm="4">
                                        Menu Name Marathi:
                                    </Form.Label>
                                    <Col sm={6}>
                                        <Form.Control type="text" placeholder="Menu Name Marathi"
                                            name="MenuNameMarathi"
                                            onChange={this.handleChange}
                                            value={this.state.MenuNameMarathi === null ? '' : this.state.MenuNameMarathi} />

                                    </Col>
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs="12" md="6">
                                <Form.Group as={Row} controlId="formMenuType">
                                    <Form.Label column sm="3">
                                        Menu Type:
                                    </Form.Label>
                                    <Col sm={6}>
                                        <Form.Control type="text" placeholder="Menu Type"
                                            name="MenuType"
                                            onChange={this.handleChange}
                                            value={this.state.MenuType === null ? '' : this.state.MenuType} />

                                    </Col>
                                </Form.Group>
                            </Col>

                            <Col xs="12" md="6">
                                <Form.Group as={Row} controlId="formParentMenuId">
                                    <Form.Label column sm="4">
                                        Parent Menu Id:
                                    </Form.Label>
                                    <Col sm={6}>
                                        <Form.Control type="text" placeholder="Parent Menu Id"
                                            name="ParentMenuId"
                                            onChange={this.handleChange}
                                            value={this.state.ParentMenuId === null ? '' : this.state.ParentMenuId} />

                                    </Col>
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs="12" md="6">
                                <Form.Group as={Row} controlId="formMenuUrl">
                                    <Form.Label column sm="3">
                                        Menu Url:
                                    </Form.Label>
                                    <Col sm={6}>
                                        <Form.Control type="text" placeholder="Menu Url"
                                            name="MenuUrl"
                                            onChange={this.handleChange}
                                            value={this.state.MenuUrl === null ? '' : this.state.MenuUrl} />

                                    </Col>
                                </Form.Group>
                            </Col>
                            <Col xs="12" md="6">
                                <Form.Group as={Row} controlId="formMenuIcon">
                                    <Form.Label column sm="4">
                                        Menu Icon:
                                    </Form.Label>
                                    <Col sm={6}>
                                        <Form.Control type="text" placeholder="Menu Icon"
                                            name="MenuIcon"
                                            onChange={this.handleChange}
                                            value={this.state.MenuIcon === null ? '' : this.state.MenuIcon} />

                                    </Col>
                                </Form.Group>
                            </Col>

                        </Row>
                        <Row>
                            <Col xs="12" md="6">
                                <Form.Group as={Row} controlId="formActionName">
                                    <Form.Label column sm="3">
                                        Action Name:
                                    </Form.Label>
                                    <Col sm={6}>
                                        <Form.Control type="text" placeholder="Action Name"
                                            name="ActionName"
                                            onChange={this.handleChange}
                                            value={this.state.ActionName === null ? '' : this.state.ActionName} />

                                    </Col>
                                </Form.Group>
                            </Col>
                            <Col xs="12" md="6">
                                <Form.Group as={Row} controlId="formControllerName">
                                    <Form.Label column sm="4">
                                        Controller Name:
                                    </Form.Label>
                                    <Col sm={6}>
                                        <Form.Control type="text" placeholder="Controller Name"
                                            name="ControllerName"
                                            onChange={this.handleChange}
                                            value={this.state.ControllerName === null ? '' : this.state.ControllerName} />

                                    </Col>
                                </Form.Group>
                            </Col>

                        </Row>
                        <Row>
                            <Col xs="12" md="6">
                                <Form.Group as={Row} controlId="formFirmIds">
                                    <Form.Label column sm="3">
                                        Firm Name:
                                    </Form.Label>
                                    <Col sm={6}>
                                        <Form.Control as="select"
                                            name="FirmIds"
                                            onChange={this.handleChange}
                                            value={this.state.FirmIds === null ? '' : this.state.FirmIds}>
                                            <option value="0">Select</option>
                                            {
                                                this.renderFirmDetailsList()
                                            }
                                        </Form.Control>
                                    </Col>
                                </Form.Group>
                            </Col>
                            <Col xs="12" md="6">
                                <Form.Group as={Row} controlId="formDescription">
                                    <Form.Label column sm="4">
                                        Description:
                                    </Form.Label>
                                    <Col sm={6}>
                                        <Form.Control type="text" placeholder="Description"
                                            name="Description"
                                            onChange={this.handleChange}
                                            value={this.state.Description === null ? '' : this.state.Description} />

                                    </Col>
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs="12" md="6">
                                <Form.Group as={Row} controlId="formModuleId">
                                    <Form.Label column sm="3">
                                        Module Name:
                                    </Form.Label>
                                    <Col sm={6}>
                                        <Form.Control as="select"
                                            name="ModuleId"
                                            onChange={this.handleChange}
                                            value={this.state.ModuleId === null ? '' : this.state.ModuleId}>
                                            <option value="0">Select</option>
                                            {
                                                this.renderModuleList()
                                            }
                                        </Form.Control>
                                    </Col>
                                </Form.Group>
                            </Col>
                            <Col xs="12" md="6">
                                <Form.Group as={Row} controlId="formSeqNo">
                                    <Form.Label column sm="4">
                                        SeqNo:
                                    </Form.Label>
                                    <Col sm={6}>
                                        <Form.Control type="text" placeholder="SeqNo"
                                            name="SeqNo"
                                            onChange={this.handleChange}
                                            value={this.state.SeqNo === null ? '' : this.state.SeqNo} />

                                    </Col>
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs="12" md="6">
                                <Form.Group as={Row} controlId="formIsLeaf">
                                    <Form.Label column sm="3">
                                        Is Leaf:
                                    </Form.Label>
                                    <Col sm={1}>
                                        <Form.Control style={{ height: '20px', marginTop: '9px' }} type="checkbox" placeholder="IsLeaf"
                                            name="MenuIcon"
                                            checked={this.state.IsLeaf}
                                            onChange={this.handleChange}
                                            value={this.state.IsLeaf} />

                                    </Col>
                                </Form.Group>
                            </Col>
                            <Col xs="12" md="6">
                                <Form.Group as={Row} controlId="formShowInMainMenu">
                                    <Form.Label column sm="4">
                                        Show In Main Menu:
                                    </Form.Label>
                                    <Col sm={1}>
                                        <Form.Control style={{ height: '20px', marginTop: '9px' }} type="checkbox" placeholder="Show In Main Menu"
                                            name="ShowInMainMenu"
                                            checked={this.state.ShowInMainMenu}
                                            onChange={this.handleChange}
                                            value={this.state.ShowInMainMenu} />

                                    </Col>
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Form.Group>
                                <Button onClick={this.submitForm}>Save</Button>
                            </Form.Group>
                        </Row>
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
        await this.GetModuleMaster();
        await this.GetFirmDetails();
        var Id = this.props.match.params.id;
        this.editMenuMaster(Id);
    }

    async GetModuleMaster() {
        CommonServices.getData(`/mastersAPI/GetModuleMaster`).then((temp) => {
            console.log(temp);
            this.setState({
                moduleMasterList: temp
            })
        })
    }
    async GetFirmDetails() {
        CommonServices.getData(`/mastersAPI/GetFirmDetails`).then((temp) => {
            console.log(temp);
            this.setState({
                FirmDetailsList: temp
            })
        })
    }

    submitForm() {
        CommonServices.postData(this.state, `/menuMaster`).then((responseMessage) => {
            alert(responseMessage.data);

            this.props.history.push('/ListMenuMaster');
        });
        this.setState({
            menuId: 0,
            ModuleId: '',
            MenuName: '',
            MenuNameMarathi: '',
            MenuType: '',
            ParentMenuId: '',
            MenuUrl: '',
            Description: '',
            MenuIcon: '',
            ActionName: '',
            ControllerName: '',
            IsLeaf: '',
            ShowInMainMenu: '',
            SeqNo: '',
            FirmIds: '',
            EnteredBy: 'Admin',
            DeleteStatus: false
        });
    }

    editMenuMaster(menuId) {
        debugger;
        if (menuId != undefined) {
            CommonServices.getDataById(menuId, `/menuMaster`).then((res) => {
                this.setState({
                    menuId: res.menuId,
                    ModuleId: res.moduleId,
                    MenuName: res.menuName,
                    MenuNameMarathi: res.menuNameMarathi,
                    MenuType: res.menuType,
                    ParentMenuId: res.parentMenuId,
                    MenuUrl: res.menuUrl,
                    Description: res.description,
                    MenuIcon: res.menuIcon,
                    ActionName: res.actionName,
                    ControllerName: res.controllerName,
                    IsLeaf: res.isLeaf,
                    ShowInMainMenu: res.showInMainMenu,
                    SeqNo: res.seqNo,
                    FirmIds: res.firmIds,
                    EnteredBy: 'Admin',
                    DeleteStatus: false
                })
            });
        }
    }
}
export default connect(null, { enqueueSnackbarAction, closeSnackbar })(EditMenuMasterComponent)
