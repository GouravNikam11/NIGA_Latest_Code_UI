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

class EditIntensityComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            intensityId: 0,
            IntensityNo: '',
            Description: '',
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
                    Add Intensity
                </CardHeader>

                <CardBody>
                    <Form encType="multipart/form-data" className="form-horizontal">
                        <Row>
                            <Col xs="12" md="4">
                                <FormGroup >
                                    <Label className="label" htmlFor="">Intensity No 
                                    <span className="required">*</span> :</Label>   
                                    
                                        <Form.Control type="text" placeholder="Intensity No"
                                        name="IntensityNo"
                                        defaultValue={this.props.IntensityNo}
                                        onChange={this.handleChange}
                                        value={this.state.IntensityNo === null ? '' : this.state.IntensityNo} />
                                        <span className="error">{this.state.errors["IntensityNo"]}</span>
                               
                                </FormGroup>
                            </Col>

                            <Col xs="12" md="4">
                                <FormGroup >
                                    <Label className="label" htmlFor="">Description :</Label>
                                        <Form.Control type="text" placeholder="Description"
                                        name="Description"
                                        defaultValue={this.props.Description}
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
                                    onClick={() => this.props.history.push('/ListIntensity')}
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

        if (fields.IntensityNo == "") {
            isFormValid = false;
            errors["IntensityNo"] = "Please enter intensity no"
        }
        this.setState({ errors });
        return isFormValid;
    }


    componentDidMount() {
        var Id = this.props.match.params.id;
        this.editIntensity(Id);

    }

    submitForm() {
        if (this.validateForm()) {  
        CommonServices.postData(this.state, `/intensity`).then((responseMessage) => {
            this.props.enqueueSnackbarAction(responseMessage.data);
            this.props.history.push('/ListIntensity');

            
        });
        this.setState({
            intensityId: 0,
            IntensityNo: "",
            Description: "",
            EnteredBy: 'Admin',
            DeleteStatus: false
        });
    }
    }

    editIntensity(intensityId) {
        debugger;
        if (intensityId != undefined) {
            CommonServices.getDataById(intensityId, `/intensity`).then((res) => {
                debugger;
                this.setState({
                    intensityId: res.intensityId,
                    IntensityNo: res.intensityNo,
                    Description: res.description,
                    EnteredBy: 'Admin',
                    DeleteStatus: false
                })
            });
        }
    }
}
export default connect(null, { enqueueSnackbarAction, closeSnackbar })(EditIntensityComponent)
