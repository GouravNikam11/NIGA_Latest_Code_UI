import React, { Component } from 'react';
import { Table, Col, FormGroup, Form, Row } from 'react-bootstrap';
import { Button, Card, CardBody, CardFooter, CardHeader,} from 'reactstrap';
import { Input, Label } from 'reactstrap';
import CommonServices from '../../Services/CommonServices';
import '../../components/CommanStyle.css';
import axios from 'axios'

export class EditDiagnosisSystem extends Component {

    /**
     * Created Date     :   19 Dec 2019  
     * purpose          :   Component responsible for handling DiagnosisMaster records   
     * Author           :   
     */
    constructor(props) {

        super(props);
        this.state = {
            diagnosisSystemId: 0,
            diagnosisSystemName:'',
            diagnosisSystemList: [],
            description: '',
            isActive:'',
            errors: {}

        }
        this.handleChange = this.handleChange.bind(this);
        this.submitForm = this.submitForm.bind(this);
    }
    componentDidMount() {
        debugger;
        var Id = this.props.match.params.diagnosisSystemId;
        this.editdiagnosisSystem(Id);
    }


    render() {
        return (


        <Card>

            <CardHeader>
                <i className="fa fa-align-justify"></i>
                Edit Diagnosis System
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
                                <i className="fa fa-save"></i> Update
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
                            <Label style={{ fontSize: 15 , margin: 0, paddingTop : 5}}> Fields marked with an asterisk <span className="required">*</span> are mandatory</Label>
                        </Col>

                    </Row>

            </CardFooter>
            
        </Card>           
         

            
        )
    }
    /**
    * Created Date     :   19 Des 2019
    * purpose          :   Handling change event of all input fields
    * Author           :   
    */
    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value })
    }


    /**
         * will call when page rendered.
         */
    
   
    getDignosisSystem() {
        CommonServices.getData(`/DiagnosisSystem/GetDiagnosisSystem`).then((temp) => {
            this.setState({
                diagnosisSystemList: temp
            })
        })
    }
    
    validateForm() {
        let fields = this.state;

        let errors = {};
        let isFormValid = true;

        if (fields.diagnosisSystemName == "") {
            isFormValid = false;
            errors["diagnosisSystemName"] = "Please enter the Diagnosis System name"
        }

       
        this.setState({ errors });
        return isFormValid;
    }

   
    submitForm() {

        if (this.validateForm()) {  
        CommonServices.postData(this.state, `/DiagnosisSystem/SaveDiagnosisSystem`).then((responseMessage) => {
            alert(responseMessage.data);
            // this.refreshList();
            this.props.history.push('/ListDignosisSystem');
        });
        this.setState({
          diagnosisSystemId: 0,
            diagnosisSystemName:'',
            diagnosisSystemList: [],
            description: '',
            isActive:'',
        });
    }
}
    /**
    * Created Date     :   17 Dec 2019.
    * Purpose          :   Get diagnosis record for edit.
    * Author           :   Chandrashekhar Salagar.
    */
    editdiagnosisSystem(Id) {
        debugger;
        if (Id != undefined) {
            CommonServices.getDataById(Id, `/DiagnosisSystem`).then((res) => {
                debugger;
                console.log('res==',res)
                this.setState({
                    diagnosisSystemId: res.diagnosisSystemId,
                    diagnosisSystemName: res.diagnosisSystemName,
                    description: res.description,
                    isActive: res.isActive,
                   
                })
            });
        }
    }
}

export default EditDiagnosisSystem
