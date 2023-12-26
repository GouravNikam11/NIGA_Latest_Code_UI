import React, { Component } from 'react';
import { Col, FormGroup, Form, Row } from 'react-bootstrap';
import { Button, Card, CardBody, CardFooter, CardHeader, } from 'reactstrap';
import { Label } from 'reactstrap';
import CommonServices from '../../Services/CommonServices';
import { connect } from 'react-redux';
import '../../components/CommanStyle.css';
import {
    enqueueSnackbar as enqueueSnackbarAction,
    closeSnackbar
} from '../../store/actions/notification';

export class AddDiagnosisSystem extends Component {
    constructor(props) {
        super(props)

        this.state = {


            diagnosisSystemName: '',
            description: '',
            isActive: '',
            errors: {}
        }
        this.handleChange = this.handleChange.bind(this);
        this.submitForm = this.submitForm.bind(this);
    }

    async componentDidMount() {

        await this.getDignosisSystem();
        //  this.getLatestSeqId();
    }
    /**
        * handleSectionChanges
        */
    handleSectionChanges(e) {
        this.setState({
            diagnosisSystemId: e.target.value
        })
    }
    // renderauthorList = () => {
    //     if (this.state.diagnosisSystemList == undefined) {
    //         return null;
    //     }
    //     return this.state.diagnosisSystemList.map((author, index) => {
    //         return <option key={index} value={author.diagnosisSystemId}>{author.diagnosisSystemName}</option>
    //     })
    // }

    // getLatestSeqId() {
    //     var id = this.props.match.params.id;
    //     this.setState({
    //         seqNo: parseInt(id) + 1,
    //     })
    // }

    render() {
        return (
            <Card>

                <CardHeader>
                    <i className="fa fa-align-justify"></i>
                    Add Diagnosis System
                </CardHeader>

                <CardBody>
                    <Form encType="multipart/form-data" className="form-horizontal">
                        <Row>
                            <Col xs="12" md="4">
                                <FormGroup >
                                    <Label className="label" htmlFor="">Diagnosis System Name
                                        <span className="required">*</span> :</Label>
                                    <Form.Control type="text" placeholder="Diagnosis System Name"
                                        name="diagnosisSystemName"
                                        onChange={this.handleChange}
                                        value={this.state.diagnosisSystemName === null ? '' : this.state.diagnosisSystemName} />
                                    <span className="error">{this.state.errors["diagnosisSystemName"]}</span>

                                </FormGroup>
                            </Col>



                            <Col xs="12" md="4">
                                <FormGroup >
                                    <Label className="label" htmlFor="">Description :</Label>
                                    <Form.Control type="text" placeholder="Description"
                                        name="description"
                                        onChange={this.handleChange}
                                        value={this.state.description === null ? '' : this.state.description} />
                                </FormGroup>
                            </Col>

                            {/* <Col xs="12" md="4">
                            <FormGroup >
                                <Label className="label" htmlFor="">IsActive
                                <span className="required">*</span> :</Label>
                                <Form.Control type="text" placeholder="isActive"
                                        name="isActive"
                                        onChange={this.handleChange}
                                        value={this.state.isActive === null ? '' : this.state.isActive} />
                                    <span className="error">{this.state.errors["isActive"]}</span>
                            
                            </FormGroup>
                        </Col> */}

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
                                onClick={() => this.props.history.push('/ListDignosisSystem')}
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

        if (fields.diagnosisSystemName == "") {
            isFormValid = false;
            errors["diagnosisSystemName"] = "Please enter the diagnosis System Name"
        }

        this.setState({ errors });
        return isFormValid;
    }


    getDignosisSystem() {
        CommonServices.getData(`/DiagnosisSystem/GetDiagnosisSystem`).then((temp) => {
            this.setState({
                diagnosisSystemList: temp
            })
        })
    }


    submitForm(e) {
        debugger;
        if (this.validateForm()) {
        var    obj = {
            "diagnosisSystemName": this.state.diagnosisSystemName,
            "description": this.state.description,
            }

            CommonServices.postData(obj, `/DiagnosisSystem/SaveDiagnosisSystem`).then((responseMessage) => {
                debugger
                alert(responseMessage.data);
                this.props.history.push('/ListDignosisSystem');
            }).catch(error => {
                console.log("error", error);
                debugger;
            });
            this.setState({
                diagnosisSystemId: 0,
                diagnosisSystemName: '',
                diagnosisSystemList: [],
                description: '',
                isActive: '',
            });
        }
    }

}
export default connect(null, { enqueueSnackbarAction, closeSnackbar })(AddDiagnosisSystem)
