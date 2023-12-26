import React, { Component } from 'react';
import { Table, Col, Button, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import CommonServices from '../../Services/CommonServices';
import { connect } from 'react-redux';
import {
    enqueueSnackbar as enqueueSnackbarAction,
    closeSnackbar
} from '../../store/actions/notification';

class ListMenuMasterComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            MenuId: 0,
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
            MenuMasterList: [],
            EnteredBy: 'Admin',
            DeleteStatus: false
        }
    }
    render() {
        return (
            <div>

                <h2>Menu Master List</h2>

                <Link to={'/AddMenuMaster'} className="nav-link">
                    <Button color="primary">
                        Add Menu
                    </Button>
                </Link>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Menu Name</th>
                            <th>Menu Url</th>
                            <th>Action Name</th>
                            <th>Controller Name</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.MenuMasterList ?
                                this.state.MenuMasterList.map((q, index) => {
                                    return <tr key={index}>
                                        <td>{q.menuId}</td>
                                        <td>{q.menuName}</td>
                                        <td>{q.menuUrl}</td>
                                        <td>{q.actionName}</td>
                                        <td>{q.controllerName}</td>
                                        <td >
                                            <Link to={"/EditMenuMaster/" + q.menuId}>
                                                <Button onClick={() => this.editMenuMaster(q.menuId)} >Edit</Button> &nbsp;
                                            </Link>
                                            <Button variant="danger" onClick={() => this.deleteMenuMaster(q.menuId)} >Delete</Button>
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
        this.getMenuMaster();
        console.log("**********API CALL**************")
    }

    getMenuMaster() {
        CommonServices.getData(`/menumaster/GetMenuMaster`).then((temp) => {
            console.log(temp);
            debugger;
            this.setState({
                MenuMasterList: temp,
            })
        });
    }
    editMenuMaster(menuId) {
        debugger;
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

    deleteMenuMaster(id) {
        debugger;
        this.setState({
            menuId: id,
            ModuleId: 5,
            MenuName: "dnd",
            MenuNameMarathi: "jgf",
            MenuType: "hfd",
            ParentMenuId: 5,
            MenuUrl: "gdsrt",
            Description: "ddtrt",
            MenuIcon: "vfdrt",
            ActionName: "cfdfrt",
            ControllerName: "cdfy",
            IsLeaf: "ftyy",
            ShowInMainMenu: "fgyyu",
            SeqNo: 3,
            FirmIds: "dr",
            EnteredBy: 'Admin',
            DeleteStatus: true
        }, function () {
            console.log(this.state)
            debugger;
            CommonServices.postData(this.state, `/menuMaster/DeleteMenuMaster`).then((res) => {
                this.props.enqueueSnackbarAction(res.data, "warning");
                this.getMenuMaster();

                this.setState({
                    menuId: id,
                    ModuleId: "",
                    MenuName: "",
                    MenuNameMarathi: "",
                    MenuType: "",
                    ParentMenuId: "",
                    MenuUrl: "",
                    Description: "",
                    MenuIcon: "",
                    ActionName: "",
                    ControllerName: "",
                    IsLeaf: "",
                    ShowInMainMenu: "",
                    SeqNo: "",
                    FirmIds: "",
                    EnteredBy: 'Admin',
                    DeleteStatus: true
                })
            });
        });
    }
}
export default connect(null, { enqueueSnackbarAction, closeSnackbar })(ListMenuMasterComponent)
