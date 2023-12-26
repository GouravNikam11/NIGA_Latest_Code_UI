import React, { Component } from 'react';
import { Table, Col, FormGroup, Form, Row } from 'react-bootstrap';
import { Button, Card, CardBody, CardFooter, CardHeader,} from 'reactstrap';
import { Input, Label } from 'reactstrap';
import CommonServices from '../../Services/CommonServices';
import { connect } from 'react-redux';
import '../../components/CommanStyle.css';
import {
    enqueueSnackbar as enqueueSnackbarAction,
    closeSnackbar
} from '../../store/actions/notification';

class EditPartLocationComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            partLocationId: 0,
            PartLocationName: '',
            Description: '',
            PartLocationList: [],
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
                    Edit Part Location
                </CardHeader>

                <CardBody>
                    <Form encType="multipart/form-data" className="form-horizontal">

                        <Row>
                            <Col xs="12" md="4">
                                <FormGroup >
                                    <Label className="label" htmlFor="">Part Location Name 
                                    <span className="required">*</span> :</Label>   
                                        <Form.Control type="text" placeholder="Part Location Name"
                                        name="PartLocationName"
                                        onChange={this.handleChange}
                                        value={this.state.PartLocationName === null ? '' : this.state.PartLocationName} />
                                        <span className="error">{this.state.errors["PartLocationName"]}</span>
                                
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
                                    <i className="fa fa-save"></i> Update
                                </Button> &nbsp;
                                <Button
                                    type="reset"
                                    style={{ textTransform: "uppercase" }}
                                    onClick={() => this.props.history.push('/ListPartLocation')}
                                    size="sm" color="danger">
                                    <i className="fa fa-ban"></i> Cancel
                                </Button>
                            </Col>
                            <Col xs="12" md="6" style={{ textAlign: "right" }}>
                                <Label style={{ fontSize: 15 , margin: 0, paddingTop : 5}}> Fields marked with an asterisk <span className="required">*</span> are mandatory</Label>
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

        if (fields.PartLocationName == "") {
            isFormValid = false;
            errors["PartLocationName"] = "Please enter part location name"
        }

        this.setState({ errors });
        return isFormValid;
    }

    componentDidMount() {
        var Id = this.props.match.params.id;
        this.editPartLocation(Id);

    }

    submitForm() {
        if (this.validateForm()) {  
        CommonServices.postData(this.state, `/partlocation`).then((responseMessage) => {
            this.props.enqueueSnackbarAction(responseMessage.data);
            this.props.history.push('/ListPartLocation');
        });
        this.setState({
            partLocationId: 0,
            PartLocationName: "",
            Description: "",
            EnteredBy: 'Admin',
            DeleteStatus: false
        });
    }
        //this.props.history.push('/ListPartLocation');
    }

    editPartLocation(partlocationId) {
        debugger;
        if (partlocationId != undefined) {
            CommonServices.getDataById(partlocationId, `/partlocation`).then((res) => {
                debugger;
                this.setState({
                    partLocationId: res.partLocationId,
                    PartLocationName: res.partLocationName,
                    Description: res.description,
                    EnteredBy: 'Admin',
                    DeleteStatus: false
                })
            });
        }
    }
}
export default connect(null, { enqueueSnackbarAction, closeSnackbar })(EditPartLocationComponent)
