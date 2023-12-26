//========================================================================================//
import React, { Component } from 'react';
import CommonServices from '../../Services/CommonServices';
import {
    Badge,
    Button,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    Table,
    Col,
    Collapse,
    DropdownItem,
    DropdownMenu,
    DropdownToggle,
    Fade,
    Form,
    FormGroup,
    FormText,
    FormFeedback,
    Input,
    InputGroup,
    InputGroupAddon,
    InputGroupButtonDropdown,
    InputGroupText,
    Label,
    Row,
} from 'reactstrap';
import { Link } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
//========================================================================================//

/**
 * Created Date     :   17 March 2020
 * Purpose          :   Component to Add new case
 * Author           :   Chandrashekhar Salagar.
 */
export class AddCaseComponent extends Component {
    //Constructor.
    constructor(props) {
        super(props);
        this.state = {
            IsDataFetched: false,
            existingChiefComplaints: [],
            PatientID: 0,
            PatientName: '',
            Address: '',
            DateOfBirth: '',
            Gender: '',
            searchedOption: '',
            searchedComplaints: '',
            errors: {}
        }
    }

    /**
     *  component Did Mount life cycle method.
     */
    componentDidMount(){
        debugger
        var Id = this.props.match.params.id;
        this.getChiefComplaints();
        this.getPatientDetails(Id);
    }
   

    /**
     * Method to handle change event of all input fields
     * @param {*} event 
     */
    handleInputChange(event) {
        if (event != null) {

            this.setState({
                searchedOption: event.target.value
            })
        }
    }

    /**
     * To add searched or plain chief Case Name.
     */
    handleAutoSearch(event, value) {
        this.setState({
            searchedOption: event.target.textContent
        })

    }

    render() {
        var addedItems = '';
        if (this.state.searchedComplaints != '') {
            addedItems = this.state.searchedComplaints.split(',');
        }
        return (
            <Card>
                <CardHeader>
                    <strong>Add Case</strong>
                </CardHeader>
                <CardBody>
                    <Form action="" method="post" encType="multipart/form-data" className="form-horizontal">

                        <Row>
                            <Col md="6">
                                <Row>
                                    <Col md="12">
                                        <FormGroup>
                                            <Label htmlFor="PatientName">Patient Name</Label>
                                            <Input
                                                type="text"
                                                disabled id="PatientName"
                                                placeholder="Enter your name" required
                                                value={this.state.PatientName}
                                            />
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md="12">
                                        <FormGroup>
                                            <Row>
                                                <Col md="10">
                                                    <Label htmlFor="SubSectionId">Select Complaint
                                                        <span className="required"> *</span> :
                                                    </Label>
                                                    {
                                                        this.state.existingChiefComplaints ?
                                                            <Autocomplete
                                                                id="free-solo-demo"
                                                                freeSolo
                                                                onInputChange={this.handleInputChange.bind(this)}
                                                                name="searchedOption"
                                                              
                                                                value={this.state.searchedOption}
                                                                onChange={this.handleAutoSearch.bind(this)}
                                                                options={this.state.existingChiefComplaints.map(option => option.chiefComplaintName)}
                                                                renderInput={params => (
                                                                    <TextField {...params} margin="normal" fullWidth />
                                                                )}
                                                            /> :
                                                            <Form.Control type="text" placeholder="Add Item"
                                                                name="searchedOption"
                                                                onChange={this.handleInputChange.bind(this)}
                                                                value={this.state.searchedOption === null ? '' : this.state.searchedOption} />
                                                    }
                                                    <span className="error">{this.state.errors["authorName"]}</span>
                                                </Col>
                                                <Col md="2">

                                                    <Button color="primary" size="sm" type="button" onClick={this.handleSearch.bind(this)} className="add"><i className="fa fa-pencil-square"></i>&nbsp; Add</Button>
                                                </Col>
                                            </Row>
                                        </FormGroup>
                                    </Col>
                                </Row>
                            </Col>

                            <Col md="6">

                                <FormGroup>
                                    <Label>Complaints</Label>
                                    <Table className="table-bordered ">
                                        <thead>
                                            <tr>
                                                <th style={{ width: "80%" }}>Complaint Name</th>
                                                <th style={{ textAlign: 'center', width: "20%" }}>Delete ?</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                addedItems.length > 0 ?
                                                    addedItems.map((complaint, index) => {
                                                        return <tr key={index}>
                                                            <td>{complaint}</td>
                                                            <td style={{ textAlign: 'center' }}>
                                                                <Button className="btn btn-danger active"
                                                                    onClick={() => this.handleDelete(complaint)}  >
                                                                    <i class="fa fa-trash"></i>
                                                                </Button>
                                                            </td>
                                                        </tr>
                                                    }) :
                                                    <tr>
                                                        <td colSpan="2">Please Add Items... </td>
                                                    </tr>
                                            }
                                        </tbody>
                                    </Table>

                                </FormGroup>

                            </Col>
                        </Row>

                    </Form>
                </CardBody>
                <CardFooter>
                    <Button
                        type="button"
                        size="sm"
                        color="primary"
                        onClick={this.handleSubmit.bind(this)}>
                        <i className="fa fa-dot-circle-o"></i> Submit
                    </Button> &nbsp;
                    <Button
                                type="reset"
                                style={{ textTransform: "uppercase" }}
                                onClick={() => this.props.history.push('/PatientList')}
                                size="sm" color="danger">
                                <i className="fa fa-ban"></i> Cancel
                            </Button>
                </CardFooter>
            </Card>
        )
    }

    validateForm() {
        let fields = this.state;

        let errors = {};
        let isFormValid = true;

        if (fields.searchedOption == "") {
            isFormValid = false;
            errors["searchedOption"] = "Please select the complaint"
        }

        this.setState({ errors });
        return isFormValid;
    }



    /**
     * handle submit button
     */
    handleSubmit = () => {
        if (this.validateForm()) {

            debugger;
            var Patient = {
                PatientID: this.state.PatientID,
                ChiefComplaintIds: this.state.searchedComplaints
            }
            CommonServices.postData(Patient, `/patient/SaveComplaints`).then((result) => {
                debugger;
                alert(result.data)
                this.props.history.push("/PatientList");

            })
        }
    }


    /**
     * To get all chief complaints
     */
    getChiefComplaints() {
        CommonServices.getData(`/mastersAPI/getAllChiefComplaints`).then((result) => {
            if (result != undefined) {
                this.setState({
                    existingChiefComplaints: result
                })
            }
        })
    }

    /**
     * To add searched or plain chief Case Name.
     */
    handleSearch(e) {

        var userSearch = this.state.searchedComplaints;
        if (userSearch != '') {
            this.setState({
                searchedComplaints: this.state.searchedComplaints + ',' + this.state.searchedOption,
                searchedOption: ''
            });
        }
        else {
            this.setState({
                searchedComplaints: this.state.searchedOption,
                searchedOption: ''
            });

        }
    }

    /**
     * To add searched or plain chief Case Name.
     */
    handleDelete(complaint) {
        var searched = [this.state.searchedComplaints];
        var array = searched[0].split(',');
        var index = array.indexOf(complaint)
        if (index != -1) {
            array.splice(index, 1);
            this.setState({
                searchedComplaints: array.toString()
            })
        }
    }

    getPatientDetails = patientId => {

        CommonServices.getDataById(patientId, `/patient/GetPatientDetailsById`).then((result) => {
            debugger
            if (result != undefined) {
                this.setState({
                    PatientName: result.patientName,
                    PatientID: patientId
                })
            }
        })

    }

}