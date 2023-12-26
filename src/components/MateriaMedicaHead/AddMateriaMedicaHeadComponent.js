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

export class AddMateriaMedicaHeadComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {

            materiaMedicaHeadId: 0,
            isDeleted: false,
            materiaMedicaHeadName: '',
            authorId: '',
            authourList: [],
            description: '',
            isSection: '',
            seqNo: 0,
            errors: {}  
        }
        this.handleChange = this.handleChange.bind(this);
        this.submitForm = this.submitForm.bind(this);
    }

    async componentDidMount() {

        await this.getauthor();
        this.getLatestSeqId();
    }
    /**
        * handleSectionChanges
        */
    handleSectionChanges(e) {
        this.setState({
            authorId: e.target.value
        })
    }
    renderauthorList = () => {
        if (this.state.authourList == undefined) {
            return null;
        }
        return this.state.authourList.map((author, index) => {
            return <option key={index} value={author.authorId}>{author.authorName}</option>
        })
    }

    getLatestSeqId() {
        var id = this.props.match.params.id;
        this.setState({
            seqNo: parseInt(id) + 1,
        })
    }

    render() {
        return (
            <Card>

                <CardHeader>
                    <i className="fa fa-align-justify"></i>
                    Add Materia Medica Head
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
                                    <Label className="label" htmlFor="">Author Name 
                                    <span className="required">*</span>:</Label>
                                    
                                    <Form.Control as="select"
                                        name="authorId"
                                        onChange={this.handleSectionChanges.bind(this)}
                                        value={this.state.authorId}>
                                        <option value="0">
                                            Select Author Name
                                        </option>
                                        {
                                            this.renderauthorList()
                                        }
                                    </Form.Control>
                                    <span className="error">{this.state.errors["authorId"]}</span>
                                </FormGroup>
                            </Col>


                            <Col xs="12" md="4">
                                <FormGroup >
                                    <Label className="label" htmlFor="">Description :</Label>
                                    <textarea type="text" placeholder="   Description"
                                        name="Description"
                                        onChange={this.handleChange}
                                        value={this.state.Description === null ? '' : this.state.Description} >
                                 </textarea>
                                </FormGroup>
                            </Col>

                            <Col xs="12" md="4">
                                <FormGroup >
                                    <Label className="label" htmlFor="">Sequence Number :</Label>
                                    <Form.Control type="text" placeholder="Sequence Number"
                                        name="seqNo"
                                        disabled={true}
                                        onChange={this.handleChange}
                                        value={this.state.seqNo === null ? '' : this.state.seqNo} />
                                </FormGroup>
                            </Col>


                            <Col xs="12" md="4">
                                <FormGroup style={{ marginTop: 35 }}>
                                    <div class="form-check">
                                        <input class="form-check-input" type="checkbox" value="" id="" checked={this.state.isSection}
                                            onChange={() => this.setState({ isSection: !this.state.isSection })} />
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
                                <i className="fa fa-save"></i> Save
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

        if (fields.materiaMedicaHeadName == "") {
            isFormValid = false;
            errors["materiaMedicaHeadName"] = "Please enter Head Name"
        }

        if (fields.authorId == "") {
            isFormValid = false;
            errors["authorId"] = "Please select Author Name"
        }

        this.setState({ errors });
        return isFormValid;
    }


    getauthor() {
        CommonServices.getData(`/Author`).then((temp) => {
            this.setState({
                authourList: temp
            })
        })
    }


    submitForm(e) {
        e.preventDefault();
        debugger;

        if (this.validateForm()) {  
        CommonServices.postData(this.state, `/MateriaMedicaHead`).then((responseMessage) => {
            this.props.enqueueSnackbarAction(responseMessage.data);
            this.props.history.push('/ListMateriaMedicaHeadComponent');
        }).catch(error => {
            console.log("error", error);
            debugger;
        });
        this.setState({
            materiaMedicaHeadId: 0,
            authorId: '',
            materiaMedicaHeadName: '',
            authourList: [],
            description: '',
            isSection: '',
            seqNo: '',
            isDeleted: false
        });
    }}

}
export default connect(null, { enqueueSnackbarAction, closeSnackbar })(AddMateriaMedicaHeadComponent)
