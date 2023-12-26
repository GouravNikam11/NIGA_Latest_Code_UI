import React, { Component } from 'react';
import { Table, Col, FormGroup, Form, Row } from 'react-bootstrap';
import { Button, Card, CardBody, CardFooter, CardHeader,} from 'reactstrap';
import { Input, Label, Select } from 'reactstrap';
import CommonServices from '../../Services/CommonServices';
import { connect } from 'react-redux';
import '../../components/CommanStyle.css';
import {
    enqueueSnackbar as enqueueSnackbarAction,
    closeSnackbar
} from '../../store/actions/notification';

class AddBodyPartComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            bodyPartId: 0,
            SectionId: '',
            BodyPartName: '',
            Description: '',
            sectionList: [],
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
                    Add Body Part
                </CardHeader>

                <CardBody>
                    <Form encType="multipart/form-data" className="form-horizontal">
                        <Row>
                            <Col xs="12" md="4">
                                <FormGroup >
                                    <Label className="label" htmlFor="">Body Part Name 
                                    <span className="required">*</span> :</Label>   
                                    
                                        <Form.Control type="text" placeholder="Body Part Name"
                                        name="BodyPartName"
                                        onChange={this.handleChange}
                                        value={this.state.BodyPartName === null ? '' : this.state.BodyPartName} />
                                        <span className="error">{this.state.errors["BodyPartName"]}</span>
                                
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
                                    <Label className="label" htmlFor="">Section Name 
                                    <span className="required">*</span> :</Label>   
                                    
                                    <Form.Control as="select"
                                        name="SectionId"
                                        onChange={this.handleChange}
                                        value={this.state.SectionId === null ? '' : this.state.SectionId}>
                                        <option value="0">Select</option>
                                        {this.state.sectionList.map((section, index) => {
                                            return <option key={index} value={section.sectionId}>{section.sectionName}</option>
                                        })}
                                    </Form.Control>
                                    <span className="error">{this.state.errors["SectionId"]}</span>
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
                                    onClick={() => this.props.history.push('/ListBodyPart')}
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

        if (fields.BodyPartName == "") {
            isFormValid = false;
            errors["BodyPartName"] = "Please enter body part name"
        }

        if (fields.SectionId == "") {
            isFormValid = false;
            errors["SectionId"] = "Please select section name"
        }

        this.setState({ errors });
        return isFormValid;
    }

    componentDidMount() {
        this.GetSections();
    }

    GetSections() {
        CommonServices.getData(`/mastersAPI/GetSections`).then((temp) => {

            console.log(temp);
            this.setState({
                sectionList: temp
            })
        })
    }

    submitForm() {
        if (this.validateForm()) {  

        CommonServices.postData(this.state, `/bodypart`).then((responseMessage) => {
            this.props.enqueueSnackbarAction(responseMessage.data);
            this.props.history.push('/ListBodyPart');
            
        });
        this.setState({
            bodyPartId: 0,
            BodyPartName: "",
            Description: "",
            SectionId: "",
            EnteredBy: 'Admin',
            DeleteStatus: false
        });
    }        
    }
}
export default connect(null, { enqueueSnackbarAction, closeSnackbar })(AddBodyPartComponent)
