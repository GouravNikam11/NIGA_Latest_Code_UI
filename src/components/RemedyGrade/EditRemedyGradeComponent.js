import React, { Component } from 'react';
import { Table, Col, FormGroup, Form, Row } from 'react-bootstrap';
import { Button, Card, CardBody, CardFooter, CardHeader, } from 'reactstrap';
import { Input, Label } from 'reactstrap';
import CommonServices from '../../Services/CommonServices';
import { connect } from 'react-redux';
import {
    enqueueSnackbar as enqueueSnackbarAction,
    closeSnackbar
} from '../../store/actions/notification';

class EditRemedyGradeComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            gradeId: 0,
            GradeNo: '',
            Description: '',
            FontName: '',
            FontStyle: '',
            FontColor: '',
            GradeList: [],
            EnteredBy: 'Admin',
            DeleteStatus: false,
            errors: {}
        }
        this.handleChange = this.handleChange.bind(this);
        this.submitForm = this.submitForm.bind(this);
    }

    render() {
        return (
            <Card>

                <CardHeader>
                    <i className="fa fa-align-justify"></i>
                    Edit Remedy Grade
                </CardHeader>

                <CardBody>
                    <Form encType="multipart/form-data" className="form-horizontal">
                        <Row>
                            <Col xs="12" md="4">
                                <FormGroup >
                                    <Label className="label" htmlFor="">Remedy Grade No :</Label>
                                    <Form.Control type="text" placeholder="Grade No"
                                        name="GradeNo"
                                        onChange={this.handleChange}
                                        value={this.state.GradeNo === null ? '' : this.state.GradeNo} />

                                </FormGroup>
                            </Col>

                            <Col xs="12" md="4">
                                <FormGroup >
                                    <Label className="label" htmlFor="">Description :</Label>
                                    <Form.Control type="text" placeholder="Description"
                                        name="Description"
                                        onChange={this.handleChange}
                                        value={this.state.Description === null ? '' : this.state.Description} />

                                </FormGroup>
                            </Col>

                            <Col xs="12" md="4">
                                <FormGroup >
                                    <Label className="label" htmlFor="">Font Name :</Label>
                                    <Form.Control type="text" placeholder="Font Name"
                                        name="FontName"
                                        onChange={this.handleChange}
                                        value={this.state.FontName === null ? '' : this.state.FontName} />

                                </FormGroup>
                            </Col>
                        </Row>

                        <Row>
                            <Col xs="12" md="4">
                                <FormGroup >
                                    <Label className="label" htmlFor="">Font Style :</Label>
                                    <Form.Control type="text" placeholder="Font Style"
                                        name="FontStyle"
                                        onChange={this.handleChange}
                                        value={this.state.FontStyle === null ? '' : this.state.FontStyle} />

                                </FormGroup>
                            </Col>

                            <Col xs="12" md="4">
                                <FormGroup >
                                    <Label className="label" htmlFor="">Font Color :</Label>
                                    <Form.Control type="text" placeholder="Font Color"
                                        name="FontColor"
                                        onChange={this.handleChange}
                                        value={this.state.FontColor === null ? '' : this.state.FontColor} />
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
                                onClick={() => this.props.history.push('/ListRemedyGrade')}
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

        if (fields.GradeNo == "") {
            isFormValid = false;
            errors["GradeNo"] = "Please enter remedy grade no."
        }

        this.setState({ errors });
        return isFormValid;
    }

    componentDidMount() {
        var Id = this.props.match.params.id;
        this.editRemedyGrade(Id);

    }

    submitForm() {
        if (this.validateForm()) {

            CommonServices.postData(this.state, `/remedygrade`).then((responseMessage) => {
                this.props.enqueueSnackbarAction(responseMessage.data);
                //  alert(responseMessage.data);
                this.props.history.push('/ListRemedyGrade');
            });
            this.setState({
                gradeId: 0,
                GradeNo: "",
                Description: "",
                FontName: "",
                FontStyle: "",
                FontColor: "",
                EnteredBy: 'Admin',
                DeleteStatus: false
            });
        }
    }

    editRemedyGrade(gradeId) {
        debugger;
        if (gradeId != undefined) {
            CommonServices.getDataById(gradeId, `/remedygrade`).then((res) => {
                debugger;
                this.setState({
                    gradeId: res.gradeId,
                    GradeNo: res.gradeNo,
                    Description: res.description,
                    FontName: res.fontName,
                    FontStyle: res.fontStyle,
                    FontColor: res.fontColor,
                    EnteredBy: 'Admin',
                    DeleteStatus: false
                })
            });
        }
    }
}
export default connect(null, { enqueueSnackbarAction, closeSnackbar })(EditRemedyGradeComponent)