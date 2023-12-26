
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

class EditDrugSystem extends Component {
    constructor(props) {
        super(props)

        this.state = {
            drugSystemId: 0,
            drugSystemName: '',
            errors: {}
        }
        this.handleChange = this.handleChange.bind(this);
        this.submitForm = this.submitForm.bind(this);
    }

    componentDidMount() {
        var drugSystemId = this.props.match.params.drugSystemId;
        this.editDrugSystem(drugSystemId);
    }

    editDrugSystem(drugSystemId) {
        debugger;
        if (drugSystemId != undefined) {
            CommonServices.getDataById(drugSystemId, `/DrugSystem`).then((res) => {
                this.setState({
                    drugSystemId: res.drugSystemId,
                    drugSystemName: res.drugSystemName,
                });
            });
        }
    }



    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value })
    }

    validateForm() {
        let fields = this.state;

        let errors = {};
        let isFormValid = true;

        if (fields.drugSystemName === "") {
            isFormValid = false;
            errors["drugSystemName"] = "Please enter the DrugSystem name"
        }

        this.setState({ errors });
        return isFormValid;
    }

    render() {
        return (
            <Card>
                <CardHeader>
                    <i className="fa fa-align-justify"></i>
                    Edit Drug System
                </CardHeader>
                <CardBody>
                    <Form encType="multipart/form-data" className="form-horizontal">
                        <Col xs="12" md="4">
                            <FormGroup >
                                <Label className="label" htmlFor="">Drug System Name
                                    <span className="required">*</span> :</Label>
                                <Form.Control type="text"
                                    placeholder="Drug System Name"
                                    name="drugSystemName"
                                    onChange={this.handleChange}
                                    value={this.state.drugSystemName === null ? '' : this.state.drugSystemName} />
                                <span className="error">{this.state.errors["drugSystemName"]}</span>
                            </FormGroup>
                        </Col>
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
                                <i className="fa fa-save"></i> Update
                            </Button> &nbsp;
                            <Button
                                type="reset"
                                style={{ textTransform: "uppercase" }}
                                onClick={() => this.props.history.push('/ListDrugSystem')}
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
        console.log('state====',this.state)
        debugger
        if (this.validateForm()) {
            CommonServices.postData(this.state, `/DrugSystem`).then((responseMessage) => {
                console.log('responseMessage====',responseMessage)
                this.props.enqueueSnackbarAction("Record updated successfully");
                this.props.history.push("/ListDrugSystem")

            });
            this.setState({
                drugSystemId: 0,
                drugSystemName: '',
            });
        }
    }

}
export default connect(null, { enqueueSnackbarAction, closeSnackbar })(EditDrugSystem)
