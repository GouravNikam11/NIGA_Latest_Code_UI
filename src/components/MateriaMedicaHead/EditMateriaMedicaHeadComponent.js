import React, { Component } from 'react';
import { Table, Col, FormGroup, Form, Row } from 'react-bootstrap';
import { Button, Card, CardBody, CardFooter, CardHeader,} from 'reactstrap';
import { Input, Label } from 'reactstrap';
import CommonServices from '../../Services/CommonServices';
import '../../components/CommanStyle.css';
import axios from 'axios'
import {
    enqueueSnackbar as enqueueSnackbarAction,
    closeSnackbar
} from '../../store/actions/notification';
import { connect } from 'react-redux';

export class EditDiagnosisComponent extends Component {

    /**
     * Created Date     :   19 Dec 2019  
     * purpose          :   Component responsible for handling DiagnosisMaster records   
     * Author           :   
     */
    constructor(props) {

        super(props);
        this.state = {
            materiaMedicaHeadId: 0,
            authorId:'',
            materiaMedicaHeadName:'',
            HeadList: [],
            authourList:[],
            description: '',
            isSection:'',
            seqNo:'',
            isDeleted:false,
            errors: {}

        }
        this.handleChange = this.handleChange.bind(this);
        this.submitForm = this.submitForm.bind(this);
    }
    componentDidMount() {
        debugger;
        var Id = this.props.match.params.id;
        this.editMateriaMedicaHead(this.props.match.params.id);
    }

   

    renderauthorList = () => {
        if (this.state.authourList == undefined) {
            return null;
        }
        return this.state.authourList.map((author, index) => {
            return <option key={index} value={author.authorId}>{author.authorName}</option>
        })
    }
    

   
    render() {
        return (


        <Card>

            <CardHeader>
                <i className="fa fa-align-justify"></i>
                Edit Materia Medica Head
            </CardHeader>

            <CardBody>
                <Form encType="multipart/form-data" className="form-horizontal">
                    <Row>
                        <Col xs="12" md="4">
                            <FormGroup >
                                <Label className="label" htmlFor="">Head Name 
                                <span className="required">*</span> :</Label>
                                <Form.Control type="text" placeholder="Head Name"
                                        name="materiaMedicaHeadName"
                                        onChange={this.handleChange}
                                        value={this.state.materiaMedicaHeadName === null ? '' : this.state.materiaMedicaHeadName} />
                                    <span className="error">{this.state.errors["materiaMedicaHeadName"]}</span>
                            
                            </FormGroup>
                        </Col>


                        <Col xs="12" md="4">
                            <FormGroup >
                                <Label className="label" htmlFor="">Author Name <span className="required">*</span>:</Label>
                                <Form.Control as="select"
                                        name="authorId"
                                        onChange={this.handleChange}
                                        value={this.state.authorId === null ? '' : this.state.authorId}>
                                        {/* <option value="0">Select</option> */}
                                        {
                                            this.renderauthorList()
                                        }
                                    </Form.Control>
                            </FormGroup>
                        </Col>


                        <Col xs="12" md="4">
                            <FormGroup >
                                <Label className="label" htmlFor="">Description :</Label>
                                <textarea type="text" placeholder="  Description"
                                        name="description"
                                        onChange={this.handleChange}
                                        value={this.state.description === null ? '' : this.state.description} >
                            </textarea>
                            </FormGroup>
                        </Col>

                        <Col xs="12" md="4">
                            <FormGroup >
                                <Label className="label" htmlFor="">Sequence Number
                                <span className="required">*</span> :</Label>
                                <Form.Control type="text" placeholder="Sequence Number"
                                        name="seqNo" disabled={true}
                                        onChange={this.handleChange}
                                        value={this.state.seqNo === null ? '' : this.state.seqNo} />
                                    <span className="error">{this.state.errors["seqNo"]}</span>
                            
                            </FormGroup>
                        </Col>

                        <Col xs="12" md="4">
                            <FormGroup style={{ marginTop: 35 }}>
                                <div class="form-check">
                                    <input onChange={() => this.setState({ isSection: !this.state.isSection })} checked={this.state.isSection} class="form-check-input" type="checkbox" value="" id=""  />
                                        <label class="form-check-label" for="">
                                            Is Section ?
                                        </label>
                                    </div>
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
                                onClick={() => this.props.history.push('/ListMateriaMedicaHeadComponent')}
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
    async componentDidMount() {
        debugger;
        var Id = this.props.match.params.id;
        this.editMateriaMedicaHead(Id);
        await this.getauthor();
        this.setState({
            authorId: Id
        });
        
    }

   

   
    getauthor() {
        CommonServices.getData(`/Author`).then((temp) => {
            this.setState({
                authourList: temp
            })
        })
    }
    
    validateForm() {
        let fields = this.state;

        let errors = {};
        let isFormValid = true;

        if (fields.materiaMedicaHeadName == "") {
            isFormValid = false;
            errors["materiaMedicaHeadName"] = "Please enter Head Name"
        }

        if (fields.seqNo == "") {
            isFormValid = false;
            errors["seqNo"] = "Please enter Sequence Number"
        }

        this.setState({ errors });
        return isFormValid;
    }

   
    submitForm() {

        if (this.validateForm()) {  
        CommonServices.postData(this.state, `/MateriaMedicaHead`).then((responseMessage) => {
            this.props.enqueueSnackbarAction(responseMessage.data);
            // this.refreshList();
            this.props.history.push('/ListMateriaMedicaHeadComponent');
        });
        this.setState({
            materiaMedicaHeadId: 0,
            authorId:'',
            materiaMedicaHeadName:'',
            HeadList: [],
            description: '',
            isSection:'',
            seqNo:'',
        });
    }
}
    /**
    * Created Date     :   17 Dec 2019.
    * Purpose          :   Get diagnosis record for edit.
    * Author           :   Chandrashekhar Salagar.
    */
     editMateriaMedicaHead(materiaMedicaHeadId) {
        debugger;
        if (materiaMedicaHeadId != undefined) {
            CommonServices.getDataById(materiaMedicaHeadId, `/MateriaMedicaHead`).then((res) => {
                debugger;
                this.setState({
                    materiaMedicaHeadId: res.materiaMedicaHeadId,
                    materiaMedicaHeadName: res.materiaMedicaHeadName,
                    description: res.description,
                    authorId: res.authorId,
                    isSection: res.isSection,
                    seqNo:res.seqNo,

                  
                })
            });
        }
    }
}

export default connect(null, { enqueueSnackbarAction, closeSnackbar })(EditDiagnosisComponent)
