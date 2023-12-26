import React, { Component } from 'react';
import CommonServices from '../../Services/CommonServices';
import { Table, Col, Button, Form, Row, Pagination, Glyphicon } from 'react-bootstrap';
import { Link } from 'react-router-dom';
// import SpeechRecognition from '../SpeechRecognition/SpeechRecognition';

/**
 * Created Date     :   25 Dec 2019.
 * Purpose          :   Component to show cases of logged in user.
 * Author           :   Chandrashekhar Salagar.
 */
export class MyCasesComponent extends Component {
    /**
     * Constructor
     */
    constructor(props) {
        console.log(props);
        super(props);
        this.state = {
            caseDetails: [],
            SearchKey: '',
            transcript: 'sfdgdfgdfgdfg'
        }
        this.handleChange = this.handleChange.bind(this);
    }

    /**
     * componentDidMount lifecycle method
     */
    componentDidMount() {
        this.GetAllCases();
    }

    /**
     * Rendor lifecycle method
     */
    render() {

        var SearchKey = this.state.SearchKey;
        var caseDetails;
        if (SearchKey != "") {
            caseDetails = this.state.caseDetails.filter(function (value, index) {
                if (value['patientName'].toLowerCase().includes(SearchKey.toLowerCase())) {

                    return value;
                }
                else if (value['diagnosisIds'].toLowerCase().includes(SearchKey.toLowerCase())) {
                    return value;
                }
                else if (value['dateodFirstVisit'].toLowerCase().includes(SearchKey.toLowerCase())) {
                    return value;
                }
            });
        }
        else {
            caseDetails = this.state.caseDetails;
        }

        let active = 1;
        let items = [];
        for (let number = 1; number <= caseDetails.length; number++) {
            items.push(
                <Pagination.Item key={number} active={number === active}>
                    {number}
                </Pagination.Item>,
            );
        }



        return (
            <div>
                <Col>
                    <Col>
                        <Col>
                            <h2>All Cases</h2>

                            <Link to={'/CaseEntry'} >
                                <Button color="primary">
                                    New Case
                                </Button>
                            </Link>
                            <br></br>
                            <br></br>
                            <Form.Group as={Row} controlId="fromUserName">
                                <Col sm="2">
                                    <Form.Control type="text" placeholder="Search"
                                        name="SearchKey"
                                        onChange={this.handleChange}
                                        value={this.state.SearchKey === null ? '' : this.state.SearchKey}
                                    />
                                </Col>
                                {/* <SpeechRecognition
                                    data={{ transcript: this.state.transcript, onChangeLinkName: this.onChangeLinkName.bind(this) }}
                                >
                                </SpeechRecognition> */}
                            </Form.Group>
                            <Table striped bordered hover>
                                <thead>
                                    <tr>
                                        <th>Case Name</th>
                                        <th>Diagnosis</th>
                                        <th>First Visit Date</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        caseDetails ?
                                            caseDetails.map((c, index) => {
                                                return <tr key={index}>
                                                    <td>{c.patientName}</td>
                                                    <td>{c.diagnosisIds}</td>
                                                    <td>{c.dateodFirstVisit}</td>
                                                    <td >
                                                        <Button >Edit</Button> &nbsp;
                                                        <Button variant="danger" >Delete</Button>
                                                    </td>
                                                </tr>
                                            }) : null
                                    }
                                </tbody>
                            </Table>
                            <Pagination>{items}</Pagination>
                        </Col>
                    </Col>
                </Col>
            </div >
        )
    }

    /**
     * Method to get all the cases of logged in user
     */
    GetAllCases() {
        CommonServices.getDataById(1, `/patient`).then((result) => {
            this.setState({
                caseDetails: result
            })
            console.log(this.state);

        });
    }

    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value });
        console.log(this.state);
        debugger;
    }

    onChangeLinkName(newName, SecondParameter) {
        debugger;
        this.setState({
            SearchKey: newName
        })

    }





}