

import React, { Component } from 'react';
import { Table, Col, FormGroup, Form, Row } from 'react-bootstrap';
import { Button, Card, CardBody, CardFooter, CardHeader, } from 'reactstrap';
import { Input, Label, Select } from 'reactstrap';
import CommonServices from '../../Services/CommonServices';
import { connect } from 'react-redux';
import '../../components/CommanStyle.css';
import {
    enqueueSnackbar as enqueueSnackbarAction,
    closeSnackbar
} from '../../store/actions/notification';


class AddDrugGroupMaster extends Component {
    constructor(props) {
        super(props)
        this.state = {
            drugGroupName: '',
            drugSystemId: 0,
            DrugSystemList: [],
            errors: {}
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleDrugGrupChanges = this.handleDrugGrupChanges.bind(this);
        this.submitForm = this.submitForm.bind(this);
    }
    componentDidMount() {
        this.getDrugSystem()
    }

    getDrugSystem() {
        CommonServices.getData(`/DrugSystem/GetDrugSystem`).then((temp) => {
            console.log(temp);
            debugger;
            this.setState({
                DrugSystemList: temp,
            })
        });
    }

    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value })
    }

    validateForm() {
        let fields = this.state;

        let errors = {};
        let isFormValid = true;

        if (fields.drugGroupName === "") {
            isFormValid = false;
            errors["drugGroupName"] = "Please enter the DrugGrup name"
        }

        this.setState({ errors });
        return isFormValid;
    }

    renderDrugGrupList = () => {
        if (this.state.DrugSystemList === undefined) {
            return null;
        }
        return this.state.DrugSystemList.map((drugSystem, index) => {
            return <option key={index} value={drugSystem.drugSystemId}>{drugSystem.drugSystemName}</option>
        })
    }

    handleDrugGrupChanges(e) {
        this.setState({
            drugSystemId: e.target.value
        })
    }

    render() {
        return (
            <Card>
                <CardHeader>
                    <i className="fa fa-align-justify"></i>
                    Add Drug Group
                </CardHeader>
                <CardBody>
                    <Form encType="multipart/form-data" className="form-horizontal">
                        <Row>
                            <Col xs="12" md="4">
                                <FormGroup >
                                    <Label className="label" htmlFor="">Drug Group Name
                                        <span className="required">*</span> :</Label>
                                    <Form.Control type="text"
                                        placeholder="Drug Group Name"
                                        name="drugGroupName"
                                        onChange={this.handleChange}
                                        value={this.state.drugGroupName === null ? '' : this.state.drugGroupName}
                                    />
                                    <span className="error">{this.state.errors["drugGroupName"]}</span>
                                </FormGroup>
                            </Col>
                            <Col xs="12" md="4">
                                <FormGroup >
                                    <Label className="label" htmlFor="">Drug System Name
                                        <span className="required">*</span>:</Label>
                                    <Form.Control as="select"
                                        name="drugSystemId"
                                        onChange={this.handleDrugGrupChanges.bind(this)}
                                        value={this.state.drugSystemId}>
                                        <option value="0">Select Drug System Name</option>
                                        {
                                            this.renderDrugGrupList()
                                        }
                                    </Form.Control>
                                    <span className="error"></span>
                                </FormGroup>
                            </Col>
                        </Row>
                    </Form>
                </CardBody>
                <CardFooter>
                    <Row>
                        <Col xs="12" md="6">
                            <Button
                                type="button"
                                style={{ textTransform: "uppercase" }}
                                onClick={this.submitForm}
                                size="sm" color="primary">
                                <i className="fa fa-save"></i> Save
                            </Button> &nbsp;
                            <Button
                                type="reset"
                                style={{ textTransform: "uppercase" }}
                                onClick={() => this.props.history.push('/ListDrugGroupMaster')}
                                size="sm" color="danger">
                                <i className="fa fa-ban"></i> Cancel
                            </Button>
                        </Col>
                        <Col xs="12" md="6" style={{ textAlign: "right" }}>
                            <Label style={{ fontSize: 15, margin: 0, paddingTop: 5 }}> Fields marked with an asterisk <span className="required">*</span> are mandatory</Label>
                        </Col>
                    </Row>

                </CardFooter>
            </Card>
        )
    }



    submitForm() {
        debugger
        console.log('state====', this.state)
        if (this.validateForm()) {
            let obj={
                drugGroupName: this.state.drugGroupName,
                drugSystemId: this.state.drugSystemId,
            }
            CommonServices.postData(obj, `/DrugGroup`).then((responseMessage) => {
                debugger
                console.log('responseMessage====', responseMessage)
                this.props.enqueueSnackbarAction();
                this.props.history.push("/ListDrugGroupMaster")
            });
            this.setState({
                drugGroupName: '',
                drugSystemId: 0,
            });
        }
    }




}

export default connect(null, { enqueueSnackbarAction, closeSnackbar })(AddDrugGroupMaster)
