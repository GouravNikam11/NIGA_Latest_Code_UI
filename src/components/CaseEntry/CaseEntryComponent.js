import React, { Component } from 'react';
import { Row, Table, Col, Button, FormGroup, Form } from 'react-bootstrap';
import CommonServices from '../../Services/CommonServices';
import './CaseEntryStyle.css';
import Select from 'react-select';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

/**
 * Created Date     :   19 Dec 2019.
 * Purpose          :   Component is used to add new user.
 * Author           :   Chandrashekhar Salagar.
 */
export class CaseEntryComponent extends Component {
    /*
     * purpose          :   Component responsible for handling DiagnosisGroupMaster records  
     */
    constructor(props) {
        super(props);
        this.state = {
            PatientName: '',
            Address: '',
            CountryId: null,
            StateId: null,
            MobileNo: '',
            DateOfBirth: '',
            Gender: null,
            EnteredBy: '',
            UserId: 0,
            DoctorId: 0,
            DiagnosisIds: [],
            ChiefComplaintIds: '',
            DateodFirstVisit: '',
            RefBy: '',
            diagnosisList: [
            ],
            countryList: [

            ],
            stateList: [

            ],
            searchedOption: '',
            searchedComplaints: '',
            existingChiefComplaints: [
            ]
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.SelectedDiagnosisOptions = this.SelectedDiagnosisOptions.bind(this);
    }

    /**
     * componentDidMount react hook
     */
    componentDidMount() {
        this.getDiagnosisList();
        this.GetCountries();
        this.GetStates();
        this.getChiefComplaints();

    }

    componentDidUpdate() {
        // this.getChiefComplaints();
    }

    /**
     * render method
     */
    render() {
        var addedItems = '';
        if (this.state.searchedComplaints != '') {
            addedItems = this.state.searchedComplaints.split(',');
        }
        /* Object array for Multiselect */
        const objectArray = this.state.diagnosisList;
        var arr = [];
        this.state.diagnosisList.map((c, index) => {
            var item = c.diagnosisGroupName
            c.listDiagnosisModel.map((x, i) => {
                var item2 = {
                    diagnosisGroupName: item,
                    diagnosisName: x.diagnosisName,
                    diagnosisId: x.diagnosisId
                }
                arr.push(item2);
            });
        });
        /* Filter States by country*/
        const FilterdStates = this.state.stateList.filter(item => item.countryId == this.state.CountryId);
        return (

            <div className="CaseEntry">

                <Col>
                    <Form  >
                        <h4>Patient Details </h4>
                        <Form.Group as={Row} controlId="formPatientName">
                            <Form.Label column sm="2">
                                Patient Name
                            </Form.Label>
                            <Col sm="10">
                                <Form.Control type="text" placeholder="Patient Name"
                                    name="PatientName"
                                    onChange={this.handleChange}
                                    value={this.state.PatientName === null ? '' : this.state.PatientName}
                                />
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} controlId="formAddress">
                            <Form.Label column sm="2">
                                Address
                            </Form.Label>
                            <Col sm="10">
                                <Form.Control type="textarea" placeholder="Patient Address"
                                    name="Address"
                                    onChange={this.handleChange}
                                    value={this.state.Address === null ? '' : this.state.Address}
                                />
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} controlId="formCountry">
                            <Form.Label column sm="2">
                                Country
                            </Form.Label>
                            <Col sm="10">
                                <Form.Control as="select"
                                    name="CountryId" onChange={this.handleChange}
                                    value={this.state.CountryId === null ? '' : this.state.CountryId}>
                                    <option value="0">Select</option>
                                    {this.state.countryList.map((country, index) => {
                                        return <option key={index} value={country.countryId}>{country.countryName}</option>
                                    })}
                                </Form.Control>
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} controlId="fromState">
                            <Form.Label column sm="2">
                                State
                            </Form.Label>
                            <Col sm="10">
                                <Form.Control as="select"
                                    name="StateId" onChange={this.handleChange}
                                    value={this.state.StateId === null ? '' : this.state.StateId}>
                                    <option value="0">Select</option>
                                    {FilterdStates.map((state, index) => {
                                        return <option key={index} value={state.stateId}>{state.stateName}</option>
                                    })}
                                </Form.Control>
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} controlId="MobileNO">
                            <Form.Label column sm="2">
                                Mobile No.
                            </Form.Label>
                            <Col sm="10">
                                <Form.Control type="text" placeholder="Mobile Number"
                                    name="MobileNo"
                                    onChange={this.handleChange}
                                    value={this.state.MobileNo === null ? '' : this.state.MobileNo}
                                />
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} controlId="DateOfBirth">
                            <Form.Label column sm="2">
                                DOB.
                            </Form.Label>
                            <Col sm="10">
                                <Form.Control type="datetime-local" placeholder="Date Of Birth"
                                    name="DateOfBirth"
                                    onChange={this.handleChange}
                                    value={this.state.DateOfBirth === null ? '' : this.state.DateOfBirth}
                                />
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} controlId="Gender">
                            <Form.Label column sm="2">
                                Gender
                            </Form.Label>
                            <Col sm="10">
                                <div className="radio">
                                    <label>
                                        <input type="radio" name="Gender"
                                            onChange={this.handleChange}
                                            value={this.state.Gender === null ? 0 : this.state.Gender}
                                        />
                                        Male
                                    </label> &nbsp;
                                    <label>
                                        <input type="radio" name="Gender"
                                            onChange={this.handleChange}
                                            value={this.state.Gender === null ? 1 : this.state.Gender}
                                        />
                                        Female
                                    </label>
                                </div>
                            </Col>
                        </Form.Group>

                        <h4>Dignosis Details </h4>
                        <Form.Group as={Row} controlId="formDiagnosis">
                            <Form.Label column sm="2">
                                Diagnosis
                            </Form.Label>
                            <Col sm="10">
                                <Select isMulti
                                    name="DiagnosisIds"
                                    options={
                                        arr.map((x, i) =>
                                        (
                                            {
                                                label: x.diagnosisName, value: x.diagnosisId
                                            }))}
                                    onChange={this.SelectedDiagnosisOptions}
                                    value={this.state.DiagnosisIds}
                                />
                            </Col>
                        </Form.Group>


                        <div style={{ display: 'none' }}>
                            <Form.Group as={Row} controlId="formChiefCaseName">
                                <Form.Label column sm="2">
                                    Search Complaint
                                </Form.Label>
                                <Col sm="10">
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
                                                value={this.state.searchedOption === null ? '' : this.state.searchedOption}
                                            />
                                    }
                                    <Button color="primary" type="button" onClick={this.handleSearch.bind(this)} className="add">Add</Button>
                                </Col>
                            </Form.Group>
                            <hr></hr>
                            <Table className="table-bordered ">
                                <thead>
                                    <tr>
                                        <th>Complaint Name</th>
                                        <th>Delete</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        addedItems.length > 0 ?
                                            addedItems.map((complaint, index) => {
                                                return <tr key={index}>
                                                    <td>{complaint}</td>
                                                    <td><Button variant="danger" onClick={() => this.handleDelete(complaint)}  >Delete</Button></td>
                                                </tr>
                                            }) :
                                            <tr>
                                                <td colSpan="2">Please add items </td>
                                            </tr>
                                    }
                                </tbody>
                            </Table>
                        </div>
                        <br></br>
                        <Form.Group as={Row} controlId="DateodFirstVisit">
                            <Form.Label column sm="2">
                                First Visit Date
                            </Form.Label>
                            <Col sm="10">
                                <Form.Control type="datetime-local" placeholder="First Visit Date"
                                    name="DateodFirstVisit"
                                    onChange={this.handleChange}
                                    value={this.state.DateodFirstVisit === null ? '' : this.state.DateodFirstVisit}
                                />
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} controlId="RefBy">
                            <Form.Label column sm="2">
                                Refferd by
                            </Form.Label>
                            <Col sm="10">
                                <Form.Control type="text" placeholder="Reffered by"
                                    name="RefBy"
                                    onChange={this.handleChange}
                                    value={this.state.RefBy === null ? '' : this.state.RefBy}
                                />
                            </Col>
                        </Form.Group>
                        <Button color="primary" type="submit" onClick={this.handleSubmit}>Save</Button>
                    </Form>
                </Col>
            </div>
        )
    }

    /**
    * get DiagnosisList
    */
    getDiagnosisList() {
        CommonServices.getData(`/diagnosisgroup/GetDiagnosis`).then((result) => {
            console.log(result);
            debugger;
            this.setState({
                diagnosisList: result
            })
        });
    }

    /**
     * Get All countries
     */
    GetCountries() {
        CommonServices.getData(`/country`).then((response) => {
            this.setState({
                countryList: response
            })
        })
    }

    /**
     * Method to handle change event of all input fields
     * @param {*} event 
     */
    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value });

    }

    /**
     * Selected option of diagnosis
     * @param {*} event 
     */
    SelectedDiagnosisOptions(event) {
        this.setState({
            DiagnosisIds: event
        })

    }
    /**
     * Method to bind all the states as per country selected
     * @param {} countryId 
     */
    GetStates() {
        CommonServices.getData(`/state/GetStates`).then((result) => {
            this.setState({
                stateList: result
            })

        });
    }
    /**
     * method to submit form
     * @param {*} event 
     */
    handleSubmit(event) {
        event.preventDefault();
        if (this.state.PatientName == "") {
            alert("Please enter Patient name.");
        }
        else if (this.state.CountryId == null) {
            alert("Please select Country.");
        }
        else if (this.state.StateId == null) {
            alert("Please select State.");
        }
        else if (this.state.DateOfBirth == "") {
            alert("Please enter Birth date.");
        }
        else if (this.state.Gender == null) {
            alert("Please enter Gender.");
        }
        else if (this.state.DiagnosisIds.length == 0) {
            alert("Please enter Diagnosis.");
        }
        else {
            const DisgnosisIds = this.state.DiagnosisIds.map(item => {
                return item.value;

            });
            var dataModel = {
                PatientID: 0,
                PatientName: this.state.PatientName,
                Address: this.state.Address,
                StateId: this.state.StateId,
                CountryId: this.state.CountryId,
                MobileNo: this.state.MobileNo,
                PhoneNo: this.state.PhoneNo,
                DateOfBirth: this.state.DateOfBirth,
                Gender: this.state.Gender,
                EnteredBy: localStorage.getItem("UserName"),
                UserId: this.state.UserId,
                DoctorId: this.state.DoctorId,
                DiagnosisIds: DisgnosisIds.toString(),
                ChiefComplaintIds: this.state.ChiefComplaintIds,
                DateodFirstVisit: this.state.DateodFirstVisit,
                RefBy: this.state.RefBy,
                LoggedInUser: localStorage.getItem("UserId"),
                ChiefComplaintIds: this.state.searchedComplaints
            };
            CommonServices.postData(dataModel, `/patient`).then((result) => {
                alert(result.data.message)
                this.ClearState();
            }).catch((error) => {
            });
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

    /**
     * To get all chief complaints
     */
    getChiefComplaints() {
        CommonServices.getData(`/mastersAPI/getAllChiefComplaints`).then((result) => {
            this.setState({
                existingChiefComplaints: result
            })
        })
    }

    /**
     * To clear current state of page after adding new record
     */
    ClearState() {
        this.setState({
            PatientName: '',
            Address: '',
            CountryId: null,
            StateId: 1,
            MobileNo: '',
            DateOfBirth: '',
            Gender: null,
            EnteredBy: '',
            UserId: 0,
            DoctorId: 0,
            DiagnosisIds: [],
            ChiefComplaintIds: '',
            DateodFirstVisit: '',
            RefBy: '',
            searchedComplaints: '',
        }, () => {
            this.getChiefComplaints();
        })
    }

}