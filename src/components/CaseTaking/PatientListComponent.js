//========================================================================================//
import React, { Component } from 'react';
import CommonServices from '../../Services/CommonServices';
import { Badge, Card, CardBody, CardHeader, Input, Col, Pagination, PaginationItem, PaginationLink, Row, Table } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Button, Form } from 'react-bootstrap';
import moment from 'moment';
import {
    enqueueSnackbar as enqueueSnackbarAction,
    closeSnackbar
} from '../../store/actions/notification';
import { connect } from 'react-redux';
//========================================================================================//

/**
 * Created Date     :   17 March 2020
 * Purpose          :   Component to show cases of logged in user.
 * Author           :   Chandrashekhar Salagar.
 */
class PatientListComponent extends Component {
    //Constructor.
    constructor(props) {
        super(props);
        this.state = {
            patientList: [],
            SearchKey: '',
            IsDataFetched: false,

        }
    }

    /**
     * componentDidMount lifecycle method
     */
    componentDidMount() {
        this.GetAllCases();
    }

    /**
     * handle changge events of search bars
     * @param {*} e 
     */
    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value })
    }


    // handleChangeforsearch(e) {
    //     debugger
    //     console.log(' [e.target.name]: e.target.value',{ [e.target.name]: e.target.value})
    //     this.setState({
    //         [e.target.name]: e.target.value
    //     });
    // }
    render() {

        debugger;
        const searchTerm = this.state.SearchText;
        var patients;
        if (searchTerm != "" && searchTerm != undefined) {
            patients = this.state.patientList.filter((value) => {
                if (value.patientName.toLowerCase().indexOf(searchTerm) !== -1) {
                    return value;
                }
                else if (value.patientName.toUpperCase().indexOf(searchTerm) !== -1) {
                    return value;
                }
                else if (value.mobileNo.indexOf(searchTerm) !== -1) {
                    return value;
                }
            });
        }
        else {
            patients = this.state.patientList;
            console.log('>>>>>===>>>', patients)


        }

        // const patientList = this.state.patientList;
        return (
            <div className="animated fadeIn">
                <Row>
                    <Col xs="12" lg="12">
                        <Card>
                            <CardHeader className="crdhd">
                                <Row>

                                    <Col md="6">
                                        <i className="fa fa-align-justify" ></i>&nbsp;
                                        Patient List
                                    </Col>
                                    <Col md="4">
                                        <Input type="search"
                                            placeholder="Search by Name "
                                            name='SearchText'
                                            value={this.state.SearchText}
                                            
                                            onChange={this.handleChange.bind(this)} />
                                   </Col>
                                   <Col md="2">
                                        <Link to={'/PatientEntry'} className="nav-link lnkbtn m-0 p-0">
                                            <Button color="primary"
                                                style={{ textTransform: "uppercase" }}
                                            > <i className="fa fa-plus"></i> &nbsp;
                                                Add Patient
                                            </Button>
                                        </Link>
                                    </Col>
                                </Row>



                            </CardHeader>

                            <CardBody>
                                <Table hover bordered responsive >
                                    <thead>
                                        <tr>
                                            <th style={{ width: "20%" }}>Patient</th>
                                            <th style={{ textAlign: 'center', width: "9%" }}>Date</th>
                                            <th style={{ textAlign: 'center', width: "5%" }}>Age</th>
                                            <th style={{ textAlign: 'center', width: "10%" }}>Mobile</th>
                                            <th style={{ textAlign: 'center', width: "8%" }}>D.O.B</th>
                                            <th style={{ textAlign: 'center', width: "6%" }}>Gender</th>
                                            <th style={{ width: "35%" }}>Address</th>
                                            <th style={{ textAlign: 'center', width: "15%" }}>Appointment</th>
                                            <th style={{ textAlign: 'center', width: "15%" }}>Complaint</th>
                                            <th style={{ textAlign: 'center', width: "15%" }}>History</th>
                                            <th style={{ textAlign: 'center', width: "15%" }}>Action</th>
                                            

                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            this.state.IsDataFetched == true ?
                                                patients.map((value, index) => {
                                                    return (
                                                        <tr key={index}>
                                                            <td>{value.patientName}</td>
                                                            <td className='text-center'>{new Date(value.enteredDate).toLocaleDateString('en-GB')}</td>
                                                            <td className='text-center'>{value.age}</td>
                                                            <td className='text-center'>{value.mobileNo}</td>
                                                            <td style={{ textAlign: 'center' }}>{new Date(value.dateOfBirth).toLocaleDateString('en-GB')}</td>
                                                            <td style={{ textAlign: 'center' }}>{value.gender == 1 ? 'Female' : 'Male'}</td>
                                                            <td>{value.address}</td>
                                                            <td style={{ textAlign: 'center' }}>
                                                                <button aria-pressed="true"
                                                                    style={{
                                                                        fontSize: "11px",
                                                                        color: "white",
                                                                        width: "100px"
                                                                    }}
                                                                    onClick={() => this.handleClickForappointment(value.patientID, value.doctorID)}
                                                                    className="btn btn-ghost-info  active" size="md" color="primary">
                                                                    <i className="fa fa-plus"></i>&nbsp;Appointment
                                                                </button>
                                                            </td>
                                                            <td style={{ textAlign: 'center' }}>
                                                                <button aria-pressed="true"
                                                                    style={{
                                                                        fontSize: "11px",
                                                                        color: "white",
                                                                        width: "90px"
                                                                    }}
                                                                    onClick={() => this.handleClick(value.patientID)}
                                                                    className="btn btn-ghost-info cmpbtn active" size="md" color="primary">
                                                                    <i className="fa fa-plus"></i>&nbsp;Complaint
                                                                </button>
                                                            </td>
                                                          
                                                            <td style={{ textAlign: 'center' }}>
                                                               
                                                                <button aria-pressed="true"
                                                                    style={{
                                                                        fontSize: "11px",
                                                                        color: "white",
                                                                        width: "100px"
                                                                    }}
                                                                    onClick={() => this.handleClickForPatientBackHistory(value.patientID)}
                                                                    className="btn btn-ghost-info bhbtn active" size="md" color="primary">
                                                                    <i className="fa fa-undo"></i>&nbsp;Back History
                                                                </button>
                                                               
                                                            </td>
                                                            <td className='lcol'>
                                                                <Button variant="danger" onClick={() => this.deletePatient(value.patientID)} ><i className="fa fa-trash"></i></Button>
                                                            </td>
                                                        </tr>
                                                    )
                                                })
                                        : <tr>
                                            <td colSpan='5' style={{ textAlign: 'center', fontSize: '25px' }}>
                                                Loading...
                                            </td>
                                        </tr>
                                        }
                                    </tbody>
                                </Table>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </div>
        )
    }


    handleChangeforsearch(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }
    /**
     * Method to get all the cases of logged in user
     */
    GetAllCases() {
        var userId = localStorage.getItem("UserId");
        //  console.log('userid===>>', userId)
        CommonServices.getDataById(userId, `/patient`).then((result) => {

            if (result != undefined) {
                result.forEach(element => {
                    debugger;
                    let age = moment().diff(element.dateOfBirth, "years", true).toString();
                    let ageMonths = age.split('.');
                    let ageInMonths = 0;
                    if (ageMonths.length > 1) {
                        ageInMonths = Math.round((parseInt(ageMonths[1].substr(0, 1)) * 0.1) * 12);
                    }
                    element.age = ageMonths[0] + '.' + ageInMonths
                });
                this.setState({
                    patientList: result,
                    IsDataFetched: true
                })
                console.log('result========----------', result)
            }

            else {
                this.setState({
                    patientList: result,
                    IsDataFetched: false
                })
                console.log('result========----------', result)
            }

        });

    }

    handleClick = PatientId => {
        this.props.history.push("/AddCase/" + PatientId);

    }

    handleClickForappointment = (patientID, doctorID) => {
        this.props.history.push("/AddPatientAppointment/" + patientID + "/" + doctorID);

    }
    handleClickForPatientBackHistory = (patientID) => {
        this.props.history.push("/PatientBackHistory/" + patientID );

    }

    // deletePatient(id) {
    //     debugger;
    //         CommonServices.postData({}, `/patient/Deletepatient?patientId=`+id).then((res) => {
    //             debugger
    //             this.props.enqueueSnackbarAction("Record deleted successfully.", "warning");
    //             this.GetAllCases();

    //             this.setState({

    //             })
    //         });

    // }


    deletePatient(id) {
        debugger;
        this.setState({

        }, function () {
            console.log(this.state)
            debugger;
            CommonServices.postData({}, `/patient/Deletepatient?patientId=` + id).then((res) => {
                debugger
                console.log('props=======', this.props)
                this.props.enqueueSnackbarAction("Record deleted successfully.", "warning");
                this.GetAllCases();

                this.setState({

                })
            });
        });
    }

}
export default connect(null, { enqueueSnackbarAction, closeSnackbar })(PatientListComponent);