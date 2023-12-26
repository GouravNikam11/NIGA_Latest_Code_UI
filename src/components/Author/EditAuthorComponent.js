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

class EditAuthorComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            authorId: 0,
            authorName: '',
            Description: '',
            ListAuthor: [],
            EnteredBy: 'Admin',
            isDeleted: false,
            authorAlias:'',
            isForRepertory: '',
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
                    Edit Author
                </CardHeader>
                <CardBody>
                    <Form encType="multipart/form-data" className="form-horizontal">
                        <Row>

                        <Col xs="12" md="2">
                                <FormGroup style={{ marginTop: 35 }}>
                                    <div class="form-check">
                                        <input class="form-check-input" type="checkbox" value="" id="" checked={this.state.isForRepertory}
                                            onChange={() => this.setState({ isForRepertory: !this.state.isForRepertory })} />
                                        <label class="form-check-label" for="">
                                        Is For Repertory
                                        </label>
                                    </div>
                                </FormGroup>
                            </Col>



                            <Col xs="12" md="4">
                                <FormGroup >
                                    <Label className="label" htmlFor="">Author Name
                                        <span className="required">*</span> :</Label>
                                    <Form.Control type="text" placeholder="Author Name"
                                        name="authorName"
                                        onChange={this.handleChange}
                                        value={this.state.authorName === null ? '' : this.state.authorName} />
                                    <span className="error">{this.state.errors["authorName"]}</span>

                                </FormGroup>
                            </Col>


                            <Col xs="12" md="4">
                                <FormGroup >
                                    <Label className="label" htmlFor="">Author Alias :
                                    <span className="required"> *</span> :</Label>
                                    <Form.Control type="text" placeholder="Author Alias"
                                        name="authorAlias"
                                        onChange={this.handleChange}
                                        value={this.state.authorAlias === null ? '' : this.state.authorAlias} />

                                </FormGroup>
                            </Col>

                            <Col xs="12" >
                                <FormGroup >
                                    <Label className="label" htmlFor="">Description :</Label>
                                    <textarea  placeholder="Description"
                                        name="Description"
                                        onChange={this.handleChange}
                                        value={this.state.Description === null ? '' : this.state.Description} >
                                        </textarea>
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
                                onClick={() => this.props.history.push('/ListAuthorComponent')}
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

    componentDidMount() {
        debugger;
        console.log(this.props.match)
        var Id = this.props.match.params.id;
        this.editAuthor(Id);

    }
    validateForm() {
        let fields = this.state;

        let errors = {};
        let isFormValid = true;

        if (fields.authorName == "") {
            isFormValid = false;
            errors["authorName"] = "Please enter the author name"
        }

        this.setState({ errors });
        return isFormValid;
    }

    submitForm = () => {
        if (this.validateForm()) {
            CommonServices.postData(this.state, `/Author`).then((responseMessage) => {
                this.props.enqueueSnackbarAction("Record updated successfully");
                this.props.history.push('/ListAuthorComponent');

            });
            this.setState({
                authorId: 0,
                authorName: "",
                Description: "",
                EnteredBy: 'Admin',
                DeleteStatus: false
            });
        }
    }

    editAuthor(authorId) {
        debugger;
        if (authorId != undefined) {
            CommonServices.getDataById(authorId, `/Author/GetAuthorById`).then((res) => {
                this.setState({
                    authorId: res.authorId,
                    authorName: res.authorName,
                    Description: res.description,
                    authorAlias:res.authorAlias,
                    isForRepertory:res.isForRepertory,
                    EnteredBy: 'Admin',
                    DeleteStatus: false
                });
            });
        }
    }
}
export default connect(null, { enqueueSnackbarAction, closeSnackbar })(EditAuthorComponent)