import React, { Component } from 'react';
import { Table, Col, Button, FormGroup, Form, Row } from 'react-bootstrap';
import { Input, Label, Select } from 'reactstrap';
import CommonServices from '../../Services/CommonServices';
import { connect } from 'react-redux';
import {
    enqueueSnackbar as enqueueSnackbarAction,
    closeSnackbar
} from '../../store/actions/notification';

class EditRoleMasterComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            RoleId: 0,
            RoleName: '',
            FirmIds: '',
            FirmDetailsList: [],
            EnteredBy: 'Admin',
            DeleteStatus: false,
            errors: {}
        }
        this.handleChange = this.handleChange.bind(this);
        this.submitForm = this.submitForm.bind(this);
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

                <h2>Edit Role</h2>

                <br></br>
                <div>
                    <Form>

                        <Form.Group as={Row} controlId="formRoleName">
                            <Form.Label column sm="2">
                                Role Name <span className="required">*</span> :
                            </Form.Label>
                            <Col sm={4}>
                                <Form.Control type="text" placeholder="Role Name"
                                    name="RoleName"
                                    onChange={this.handleChange}
                                    value={this.state.RoleName === null ? '' : this.state.RoleName} />
                                    <span className="error">{this.state.errors["RoleName"]}</span>
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} controlId="formFirmIds">
                            <Form.Label column sm="2">
                                Firm Name <span className="required">*</span> :
                            </Form.Label>
                            <Col sm={4}>
                                <Form.Control as="select" 
                                    name="FirmIds"
                                    onChange={this.handleChange}
                                    value={this.state.FirmIds === null ? '' : this.state.FirmIds}>
                                    <option value="0">Select</option>
                                    {
                                        this.renderFirmDetailsList()
                                    }
                                </Form.Control>
                                <span className="error">{this.state.errors["FirmIds"]}</span>
                            </Col>
                        </Form.Group>

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
        this.setState({ [e.target.name]: e.target.value })
    }
    componentDidMount() {
        var Id = this.props.match.params.id;
        this.editRoleMaster(Id);
        this.GetFirmDetails();
    }
    // async componentDidMount() {
    //     await this.GetFirmDetails();
    // }

    async GetFirmDetails() {
        CommonServices.getData(`/mastersAPI/GetFirmDetails`).then((temp) => {
            console.log(temp);
            this.setState({
                FirmDetailsList: temp
            })
        })
    }

    validateForm() {
        let fields = this.state;

        let errors = {};
        let isFormValid = true;

        if (fields.RoleName == "") {
            isFormValid = false;
            errors["RoleName"] = "Please enter the role name"
        }
        if (fields.FirmIds == "") {
            isFormValid = false;
            errors["FirmIds"] = "Please select the firm name"
        }

        this.setState({ errors });
        return isFormValid;
    }

    submitForm() {
        if (this.validateForm()) {

        CommonServices.postData(this.state, `/roleMaster`).then((responseMessage) => {
            alert(responseMessage.data);

            this.props.history.push('/ListRoleMaster');
        });
        this.setState({
            roleId: 0,
            RoleName: '',
            FirmIds: '',
            EnteredBy: 'Admin',
            DeleteStatus: false
        });
    }   
    }
    editRoleMaster(roleId) {
        debugger;
        if (roleId != undefined) {
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
    }
}
export default connect(null, { enqueueSnackbarAction, closeSnackbar })(EditRoleMasterComponent)
