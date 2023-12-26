import React, { Component } from 'react';
import { Table, Col, FormGroup, Form, Row } from 'react-bootstrap';
import { Button, Card, CardBody, CardFooter, CardHeader, } from 'reactstrap';
import { Input, Label, Select } from 'reactstrap';
import CommonServices from '../../Services/CommonServices';
import { connect } from 'react-redux';
import {
    enqueueSnackbar as enqueueSnackbarAction,
    closeSnackbar
} from '../../store/actions/notification';

class AddRemedyComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            RemedyId: 0,
            RemedyName: '',
            RemedyAlias: '',
            Description: '',
            EnteredBy: 'Admin',
            DeleteStatus: false,
            errors: {},
            themesOrCharacteristics: '',
            generals: '',
            modalities: '',
            particulars: '',
            commonOrUncommon: false,
            thermalId: null,
            thermalNameList: [],
        }
        this.handleChange = this.handleChange.bind(this);
        this.submitForm = this.submitForm.bind(this);
    }

    render() {
        return (


            <Card>

                <CardHeader>
                    <i className="fa fa-align-justify"></i>
                    Add Remedy
                </CardHeader>

                <CardBody>
                    <Form encType="multipart/form-data" className="form-horizontal">
                        <Row>
                            <Col xs="12" md="4">
                                <FormGroup >
                                    <Label className="label" htmlFor="">Remedy Name <span className="required">*</span> :</Label>
                                    <Form.Control type="text" placeholder="Remedy Name"
                                        name="RemedyName"
                                        onChange={this.handleChange}
                                        value={this.state.RemedyName === null ? '' : this.state.RemedyName} />
                                    <span className="error">{this.state.errors["RemedyName"]}</span>
                                </FormGroup>
                            </Col>

                            <Col xs="12" md="4">
                                <FormGroup >
                                    <Label className="label" htmlFor="">Remedy Alias <span className="required">*</span> :</Label>
                                    <Form.Control type="text" placeholder="Remedy Alias"
                                        name="RemedyAlias"
                                        onChange={this.handleChange}
                                        value={this.state.RemedyAlias} />
<span className="error">{this.state.errors["RemedyAlias"]}</span>
                                </FormGroup>
                            </Col>

                            <Col xs="12" md="4">
                                <FormGroup >
                                    <Label className="label" htmlFor="">Thermal Name 
                                        <span className="required"></span> :</Label>
                                    <Form.Control as="select"
                                        name="thermalId"
                                        onChange={this.handlethermalIdChanges.bind(this)}
                                        value={this.state.thermalId}>
                                        <option value="">
                                            Select Thermal Name
                                        </option>
                                        {
                                            this.renderthermalNameList()
                                        }
                                    </Form.Control>
                                </FormGroup>
                            </Col>

                            <Col xs="12" md="6">
                                <FormGroup >
                                    <Label className="label" htmlFor="">Description :</Label>
                                    <textarea  placeholder="Description" className="form-control"
                                        name="Description"
                                        onChange={this.handleChange}
                                        value={this.state.Description === null ? '' : this.state.Description} >
                                    </textarea>
                                </FormGroup>
                            </Col>

                            <Col xs="12" md="6">
                                <FormGroup >
                                    <Label className="label" htmlFor="">Themes/ Characteristics :</Label>
                                    <textarea  placeholder="Themes/ Characteristics"
                                        name="themesOrCharacteristics" className="form-control"
                                        onChange={this.handleChange}
                                        value={this.state.themesOrCharacteristics === null ? '' : this.state.themesOrCharacteristics} >
                                    </textarea>
                                </FormGroup>
                            </Col>
                            <Col xs="12" md="6">
                                <FormGroup >
                                    <Label className="label" htmlFor="">Generals :</Label>
                                    <textarea  placeholder="Generals" className="form-control"
                                        name="generals"
                                        onChange={this.handleChange}
                                        value={this.state.generals === null ? '' : this.state.generals} >
                                    </textarea>
                                </FormGroup>
                            </Col>
                            <Col xs="12" md="6">
                                <FormGroup >
                                    <Label className="label" htmlFor="">Modalities :</Label>
                                    <textarea  placeholder="Modalities" className="form-control"
                                        name="modalities"
                                        onChange={this.handleChange}
                                        value={this.state.modalities === null ? '' : this.state.modalities}  >
                                    </textarea>
                                </FormGroup>
                            </Col>
                            <Col xs="12" md="6">
                                <FormGroup >
                                    <Label className="label" htmlFor="">Particulars :</Label>
                                    <textarea  placeholder="Particulars" className="form-control"
                                        name="particulars"
                                        onChange={this.handleChange}
                                        value={this.state.particulars === null ? '' : this.state.particulars}  >
                                    </textarea>
                                </FormGroup>
                            </Col>
                            <Col xs="12" md="6">
                                <FormGroup >
                                    <Label className="label" htmlFor="">Common ? :</Label><br/>
                                    <input class="form-check-input-check" type="checkbox" value="" id="" checked={this.state.commonOrUncommon}
                                            onChange={() => this.setState({ commonOrUncommon: !this.state.commonOrUncommon })} />
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
                                onClick={() => this.props.history.push('/ListRemedy')}
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

    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value })
    }

    validateForm() {
        let fields = this.state;

        let errors = {};
        let isFormValid = true;

        if (fields.RemedyName == "") {
            isFormValid = false;
            errors["RemedyName"] = "Please enter Remedy Name"
        }
        if (fields.RemedyAlias == '') {
            isFormValid = false;
            errors["RemedyAlias"] = "Please enter Remedy Alias"
        }
        this.setState({ errors });
        return isFormValid;
    }


    submitForm() {
        if (this.validateForm()) {

            CommonServices.postData(this.state, `/remedy`).then((responseMessage) => {
                this.props.enqueueSnackbarAction(responseMessage.data);
                this.props.history.push('/ListRemedy');


            });
            this.setState({
                remedyId: 0,
                RemedyName: "",
                RemedyAlias: '',
                Description: "",
                EnteredBy: 'Admin',
                DeleteStatus: false,
                themesOrCharacteristics: '',
                generals: '',
                modalities: '',
                particulars: '',
                commonOrUncommon: '',
                thermalId:''
            });
            //this.props.history.push('/ListRemedy');
        }
    }

    handlethermalIdChanges(e) {
        this.setState({
            thermalId: e.target.value
        })
    }

    renderthermalNameList = () => {
        if (this.state.thermalNameList === undefined) {
            return null;
        }
        return this.state.thermalNameList.map((thermal, index) => {
            return <option key={index} value={thermal.thermalId}>{thermal.thermalName}</option>
        })
    }

    getThermalNameList() {
        CommonServices.getData(`/DropdownList/GetAllThermalDDL`).then((temp) => {
            this.setState({
                thermalNameList: temp
            })
        })
    }

    async componentDidMount() {
        await this.getThermalNameList();
    }

}
export default connect(null, { enqueueSnackbarAction, closeSnackbar })(AddRemedyComponent)
