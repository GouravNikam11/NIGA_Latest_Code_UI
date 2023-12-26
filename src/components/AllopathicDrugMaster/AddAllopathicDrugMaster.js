

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


class AddAllopathicDrugMaster extends Component {
    constructor(props) {
        super(props)
        this.state = {
            allopathicDrugName: '',
            drugGroupId: 0,
            drugGroupList: [],
            seriousSideEffectName: '',
            otherSideEffectName: '',
            adverseReactionName: '',
            adverseReactionModelList: [],
            otherSideEffectModelList: [],
            seriousSideEffectModelList: [],
            errors: {}

        }
        this.handleChange = this.handleChange.bind(this);
        this.submitForm = this.submitForm.bind(this);
    }

    async componentDidMount() {
        await this.getdrugGroup();
    }

    getdrugGroup() {
        CommonServices.getData(`/DrugGroup/GetDrugGroup`).then((temp) => {
            this.setState({
                drugGroupList: temp
            })
        })
    }

    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value })
    }
    validateForm() {
        let fields = this.state;

        let errors = {};
        let isFormValid = true;

        if (fields.allopathicDrugName === "") {
            isFormValid = false;
            errors["allopathicDrugName"] = "Please enter the Allopathic Drug Name"
        }

        this.setState({ errors });
        return isFormValid;
    }

    handledrugGroupChanges(e) {
        this.setState({
            drugGroupId: e.target.value
        })
    }

    renderdrugGroupList = () => {
        if (this.state.drugGroupList === undefined) {
            return null;
        }
        return this.state.drugGroupList.map((drugGroup, index) => {
            return <option key={index} value={drugGroup.drugGroupId}>{drugGroup.drugGroupName}</option>
        })
    }

    addDrugEffectDetails() {
        debugger
        if (this.state.adverseReactionName !== '') {
            var adverseReactionObj = {
                adverseReactionName: this.state.adverseReactionName
            }
            this.state.adverseReactionModelList.push(adverseReactionObj);
            this.setState({
                adverseReactionName: ''
            })
        }

        if (this.state.otherSideEffectName !== '') {
            var otherSideEffectObj = {
                otherSideEffectName: this.state.otherSideEffectName
            }
            this.state.otherSideEffectModelList.push(otherSideEffectObj);
            this.setState({
                otherSideEffectName: ''
            })
        }

        if (this.state.seriousSideEffectName !== '') {
            var seriousSideEffectObj = {
                seriousSideEffectName: this.state.seriousSideEffectName
            }
            this.state.seriousSideEffectModelList.push(seriousSideEffectObj);
            this.setState({
                seriousSideEffectName: ''
            })
        }
    }

    deleteSideEffect = (index, string) => {
        debugger
        if (string === 'seriousSideEffectName') {
            var array = [...this.state.seriousSideEffectModelList]; // make a separate copy of the array
            if (index !== -1) {
                array.splice(index, 1);
                this.setState({ seriousSideEffectModelList: array });
            }
        }
        else if (string === 'otherSideEffectName') {
            var array1 = [...this.state.otherSideEffectModelList]; // make a separate copy of the array
            if (index !== -1) {
                array1.splice(index, 1);
                this.setState({ otherSideEffectModelList: array1 });
            }
        }
        else {
            var array2 = [...this.state.adverseReactionModelList]; // make a separate copy of the array
            if (index !== -1) {
                array2.splice(index, 1);
                this.setState({ adverseReactionModelList: array2 });
            }
        }
    }

    render() {
        return (
            <Card>
                <CardHeader>
                    <i className="fa fa-align-justify"></i>
                    Add Allopathic Drug
                </CardHeader>
                <CardBody>
                    <Form encType="multipart/form-data" className="form-horizontal">

                        <Row>
                            <Col xs="12" md="4">
                                <FormGroup >
                                    <Label className="label" htmlFor="">Allopathic Drug Name
                                        <span className="required">*</span> :</Label>
                                    <Form.Control type="text"
                                        placeholder="Allopathic Drug Name"
                                        name="allopathicDrugName"
                                        onChange={this.handleChange}
                                        value={this.state.allopathicDrugName === null ? '' : this.state.allopathicDrugName} />
                                    <span className="error">{this.state.errors["allopathicDrugName"]}</span>
                                </FormGroup>
                            </Col>
                            <Col xs="12" md="4">
                                <FormGroup >
                                    <Label className="label" htmlFor="">Drug Group Name
                                        <span className="required">*</span>:</Label>
                                    <Form.Control as="select"
                                        name="drugGroupId"
                                        onChange={this.handledrugGroupChanges.bind(this)}
                                        value={this.state.drugGroupId}>
                                        <option value="0">
                                            Select Drug Group Name
                                        </option>
                                        {
                                            this.renderdrugGroupList()
                                        }
                                    </Form.Control>
                                    <span className="error">{this.state.errors["drugGroupId"]}</span>
                                </FormGroup>
                            </Col>
                        </Row>

                        <Card>
                            <CardHeader>
                                <i className="fa fa-align-justify"></i>
                                Allopathic Drug Details
                            </CardHeader>
                            <CardBody>
                                <Row>
                                    <Col xs="12" md="4">
                                        <FormGroup >
                                            <Label className="label" htmlFor="">Serious Side Effect
                                                <span className="required">*</span> :</Label>
                                            <Form.Control type="text"
                                                placeholder="Serious Side Effect"
                                                name="seriousSideEffectName"
                                                onChange={this.handleChange}
                                                value={this.state.seriousSideEffectName === null ? '' : this.state.seriousSideEffectName} />
                                            <span className="error"></span>
                                        </FormGroup>
                                    </Col>

                                    <Col xs="12" md="4">
                                        <FormGroup >
                                            <Label className="label" htmlFor="">Other Side Effect
                                                <span className="required">*</span> :</Label>
                                            <Form.Control type="text"
                                                placeholder="Other Side Effect"
                                                name="otherSideEffectName"
                                                onChange={this.handleChange}
                                                value={this.state.otherSideEffectName === null ? '' : this.state.otherSideEffectName} />
                                            <span className="error"></span>
                                        </FormGroup>
                                    </Col>

                                    <Col xs="12" md="4">
                                        <FormGroup >
                                            <Label className="label" htmlFor="">Adverse Side Effect
                                                <span className="required">*</span> :</Label>
                                            <Form.Control type="text"
                                                placeholder="Adverse Side Effect"
                                                name="adverseReactionName"
                                                onChange={this.handleChange}
                                                value={this.state.adverseReactionName === null ? '' : this.state.adverseReactionName} />
                                            <span className="error"></span>
                                        </FormGroup>
                                    </Col>
                                </Row>

                                <Row>
                                    <Col xs="12" md="4"></Col>
                                    <Col xs="12" md="4"></Col>
                                    <Col xs="12" md="4">
                                        <FormGroup className="text-right">
                                            <Button onClick={this.addDrugEffectDetails.bind(this)}
                                                type="button" size="sm" color="primary" >
                                                <i className="fa fa-plus"></i> Add Drug Effect </Button>
                                        </FormGroup>
                                    </Col>
                                </Row>

                                <Row>
                                    <Col xs="12" md="4">
                                        <Table style={{ width: '100%' }} striped bordered hover>
                                            <thead>
                                                <tr>
                                                    <th>Serious Side Effect</th>
                                                    <th className='lcol'>Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>

                                                {
                                                    this.state.seriousSideEffectModelList.map((s, index) => {
                                                        return <tr key={index}>
                                                            <td>{s.seriousSideEffectName}</td>
                                                            <td className='lcol'>
                                                                <Button style={{ marginLeft: 8 }} variant="danger" color="danger" onClick={() => this.deleteSideEffect(index, 'seriousSideEffectName')} ><i className="fa fa-trash"></i></Button>
                                                            </td>
                                                        </tr>
                                                    })
                                                }
                                            </tbody>
                                        </Table>
                                    </Col>
                                    <Col xs="12" md="4">
                                        <Table style={{ width: '100%' }} striped bordered hover>
                                            <thead>
                                                <tr>
                                                    <th>Other Side Effect</th>
                                                    <th className='lcol'>Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    this.state.otherSideEffectModelList.map((s, index) => {
                                                        return <tr key={index}>
                                                            <td>{s.otherSideEffectName}</td>
                                                            <td className='lcol'>
                                                                <Button style={{ marginLeft: 8 }} variant="danger" color="danger" onClick={() => this.deleteSideEffect(index, 'otherSideEffectName')} ><i className="fa fa-trash"></i></Button>
                                                            </td>
                                                        </tr>
                                                    })
                                                }
                                            </tbody>
                                        </Table>
                                    </Col>
                                    <Col xs="12" md="4">
                                        <Table style={{ width: '100%' }} striped bordered hover>
                                            <thead>
                                                <tr>
                                                    <th>Adverse Side Effect</th>
                                                    <th className='lcol'>Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    this.state.adverseReactionModelList.map((s, index) => {
                                                        return <tr key={index}>
                                                            <td>{s.adverseReactionName}</td>
                                                            <td className='lcol'>
                                                                <Button style={{ marginLeft: 8 }} variant="danger" color="danger" onClick={() => this.deleteSideEffect(index, 'adverseReactionName')} ><i className="fa fa-trash"></i></Button>
                                                            </td>
                                                        </tr>
                                                    })
                                                }
                                            </tbody>
                                        </Table>
                                    </Col>
                                </Row>
                            </CardBody>
                        </Card>

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
                                onClick={() => this.props.history.push('/ListAllopathicDrugMaster')}
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
        var obj = {
                    "drugGroupId": this.state.drugGroupId,
                    "allopathicDrugName": this.state.allopathicDrugName,
                    "adverseReactionModelList": this.state.adverseReactionModelList,
                    "otherSideEffectModelList": this.state.otherSideEffectModelList,
                    "seriousSideEffectModelList": this.state.seriousSideEffectModelList
                   }
                   console.log('obj==',obj)
        if (this.validateForm()) {
            CommonServices.postData(obj, `/AllopathicDrug`).then((responseMessage) => {
                debugger
                this.props.enqueueSnackbarAction();
                this.props.history.push("/ListAllopathicDrugMaster")
            });
            this.setState({
                allopathicDrugName: '',
                drugGroupId: 0,
                drugGroupList: [],
                seriousSideEffectName: '',
                otherSideEffectName: '',
                adverseReactionName: '',
                adverseReactionModelList: [],
                otherSideEffectModelList: [],
                seriousSideEffectModelList: [],
            });
        }
    }




}

export default connect(null, { enqueueSnackbarAction, closeSnackbar })(AddAllopathicDrugMaster)
