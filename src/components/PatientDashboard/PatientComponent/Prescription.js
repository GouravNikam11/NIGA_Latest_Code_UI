import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { getLabs, saveLabOrder, saveLabEntry } from '../../../store/actions/LabActions';
import { enqueueSnackbar } from '../../../store/actions/notification';
import { Table } from 'react-bootstrap';
import Select from "react-select";
import Pagination from "react-js-pagination";
import AsyncPaginate from "react-select-async-paginate";
import CommonServices from '../../../Services/CommonServices';
import '../../../components/CommanStyle.css';
import { enqueueSnackbar as enqueueSnackbarAction, closeSnackbar } from '../../../store/actions/notification';
import { getPatient } from '../../../store/actions/Patient';
import {
    addRubrics
} from "../../../store/actions/FindRubricsAction";
import {
    Col,
    Row,
    TabPane,
    Card,
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Form,
    Label,
    Input,
    FormGroup

} from 'reactstrap';
import DatePicker from "reactstrap-date-picker";
require('../styles.css');
class Prescription extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            RemedyListForDD: [],
            RemedyIds: [],
            remedyId: '',
            PrescriptionDec: '',
            RemedyAndPresList: []
        }
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        debugger
        console.log("PrescriptionFromAPILIST", this.props.location.state?.PrescriptionFromAPILIST)
        if (this.props.location.state?.TabIdFromPatientHistoryforprec != undefined) {
            debugger
            const { PrescriptionFromAPILIST } = this.props.location.state || {};

            this.state.RemedyAndPresList = PrescriptionFromAPILIST
            // const { selectedRubrics } = this.props.location.state || {};
        }
    }

    /**
     * Render functions
     */

    render() {
        return (
            <TabPane tabId={11} >
                <div className="order-imagimg">
                    <Row>
                        <Col md="6" sm="12" xs="12">
                            <h6 style={{ color: '#08478c' }} className='mt-1'> Prescription Details</h6>
                        </Col>
                        <Col md="6" sm="12" xs="12"  >
                            <span className="add-lab-order pull-right">
                                <Button disabled={this.props?.location.state?.TabIdFromPatientHistoryforprec != undefined} onClick={this.SavePres.bind(this)}
                                    className="addButton mb-1"
                                    style={{ backgroundColor: "#20a8d8" }}
                                    type="button"
                                    size="sm" color="primary">
                                    <i className="fa fa-save" color="#FFF"></i> &nbsp; Save Prescription
                                </Button>
                            </span>
                        </Col>
                    </Row>
                    <hr className='mb-2'/>
                    <Row className="padd-ot">
                        <Col md="3" sm="12" xs="12" className='p-0'>
                            {/* <AsyncPaginate isClearable
                                labelKey="value"
                                labelValue=""
                                placeholder="Type & Search"
                            /> */}
                            <AsyncPaginate disabled={this.props?.location.state?.TabIdFromPatientHistoryforprec != undefined}
                                className="padd-in"
                                labelKey="value"
                                labelValue="RemedyId"
                                placeholder="Select Remedy"
                                value={this.state.RemedyIds}
                                loadOptions={this.loadRemedies}
                                onChange={this.RemedyChanged.bind(this)}
                            />
                        </Col>
                        <Col md="8" sm="12" xs="12" className='p-0'>
                            <FormGroup className="mb-0 padd-in">
                                <textarea class="form-text" disabled={this.props?.location.state?.TabIdFromPatientHistoryforprec != undefined}
                                    placeholder="Remedy Description" name="PrescriptionDec" rows={1}
                                    onChange={this.handleChange}
                                    value={this.state.PrescriptionDec === null ? '' : this.state.PrescriptionDec} ></textarea>
                            </FormGroup>
                        </Col>
                        <Col md="1" sm="12" xs="12" className='p-0'>
                            <span className="add-lab-order pull-right padd-in">
                                <Button onClick={this.AddRemedyAndPrescriptiontolist.bind(this)}
                                    className="addButton" disabled={this.props?.location.state?.TabIdFromPatientHistoryforprec != undefined}
                                    style={{ backgroundColor: "#11b3ea" }}
                                    type="button"
                                    size="sm" color="primary">
                                    <i className="fa fa-plus" color="#FFF"></i> &nbsp; ADD
                                </Button>
                            </span>
                        </Col>
                    </Row>
                    <hr className='mb-2 mt-2'/>
                    <Row>
                        <Col sm="12" md="12">
                            <Table hover>
                                <thead>
                                    <tr>
                                        <th style={{ width: '6%' }} class='text-center'>No.</th>
                                        <th style={{ width: '25%' }}>Remedy</th>
                                        <th style={{ width: '58%' }}>Remedy Description</th>
                                        <th style={{ width: '10%' }} className='lcol'>Action</th>
                                    </tr>
                                </thead>
                                <tbody className='twht'>

                                    {
                                        this.state.RemedyAndPresList?.map((s, index) => {
                                            return <tr key={index}>
                                                <td class='text-center'>{index + 1}</td>
                                                <td>{s.remedyName}</td>
                                                <td>{s.PrescriptionDec}</td>
                                                <td className='lcol'>
                                                    <Button disabled={this.props?.location.state?.TabIdFromPatientHistoryforprec != undefined} style={{ marginLeft: 8 }} variant="danger" color="danger" onClick={() => this.deletePrec(index)} ><i className="fa fa-trash"></i></Button>
                                                </td>
                                            </tr>
                                        })
                                    }

                                </tbody>
                            </Table>

                            {/* <div responsive="true" className='pgdiv mt-1'> */}
                                {/* {this.renderPaginationOrder()} */}
                            {/* </div> */}


                        </Col>
                    </Row>
                </div>

            </TabPane >
        )
    }

    GetAllRemedies() {
        debugger
        if (this.props.state.selectedRubrics?.length > 0) {
            let array = []
            this.props.state.selectedRubrics.forEach(element => {
                // let obj = {
                //     "subsectionId": element.subSectionId
                // }
                // array.push(obj)
                array.push(element.subSectionId === undefined ? element.subSectionID === undefined ? 
                    element.subsectionId : element.subSectionID : element.subSectionId);
            });
            // let commaSeparatedList = array.join(', ');
            debugger
            return CommonServices.postData(array, `/Prescription/GetPrescriptionRemedy`).then((temp) => {
                return temp.data;

            })
        }
    }

    loadRemedies = async (search, prevOptions) => {
        debugger;
        const options = [];
        var subsectionList = this.state.SubSectionModel;
        await this.GetAllRemedies().then((result) => {
            subsectionList = result;
        })
        subsectionList.map(x => options.push({ value: x.remedyId, label: x.remedyName }));
        let filteredOptions;
        if (!search) {
            filteredOptions = options;
        } else {
            const searchLower = search.toLowerCase();

            filteredOptions = options.filter(({ label }) =>
                label.toLowerCase().includes(searchLower)
            );
        }

        const hasMore = filteredOptions.length > prevOptions.length + 10;
        const slicedOptions = filteredOptions.slice(
            prevOptions.length,
            prevOptions.length + 10
        );
        return {
            options: slicedOptions,
            hasMore
        };
    }

    RemedyChanged = (e) => {
        debugger;
        const isExist = this.state.RemedyAndPresList.findIndex((item) => item.remedyId === e.value && item.remedyId === e.value);
        if (isExist === -1) {
            this.state.RemedyIds[0] = e
            this.state.remedyId = e.value
        }
        else {
            this.props.enqueueSnackbarAction("Remedy already added", "warning");
            this.setState({
                RemedyIds: [],
            })
        }
    }

    handleChange(e) {
        debugger

        this.state.PrescriptionDec = e.target.value
        this.setState({ [e.target.name]: e.target.value })

    }


    AddRemedyAndPrescriptiontolist() {
        if (this.state.RemedyIds.length > 0 && this.state.PrescriptionDec != '') {
            var obj = {
                remedyId: this.state.RemedyIds[0].value,
                remedyName: this.state.RemedyIds[0].label,
                PrescriptionDec: this.state.PrescriptionDec,
            }
            this.state.RemedyAndPresList.push(obj);
            this.setState({
                RemedyIds: [],
                PrescriptionDec: ''
            })
        }
    }

    deletePrec = (index) => {
        var array = [...this.state.RemedyAndPresList];
        if (index !== -1) {
            array.splice(index, 1);
            this.setState({ RemedyAndPresList: array });
        }
    }

    SavePres() {
        console.log("this.props", this.props)
        //     var caseId = this.props.patient.caseId
        //     var doctorId= this.props.patient.doctorID
        //    var patientId= this.props.patient.patientID
        //    var patientAppId=parseInt(this.props.patientAppId)
        // let array = []


        if (this.props.state.selectedRubrics?.length > 0 && this.state.RemedyAndPresList.length > 0) {

            let rubricList = []
            this.props.state.selectedRubrics.forEach(element => {
                let obj = {
                    // "prescriptionRubricId": 0,
                    // "prescriptionRubricId": null,
                    "rubricId": element.subSectionId === undefined ? element.subSectionID === undefined ? 
                    element.subsectionId : element.subSectionID : element.subSectionId,
                    "intensityId": element.intensity,
                    "remedyCount": element.remedyCount.remedyCount,
                }
                rubricList.push(obj)
            });

            let prescriptionRemedyDetailList = []
            this.state.RemedyAndPresList.forEach(element => {
                let obj = {
                    // "prescriptionRemedyId": 0,
                    // "prescriptionRemedyId": null,
                    "remedyId": element.remedyId,
                    "description": element.PrescriptionDec,
                    "dose": "",
                }
                prescriptionRemedyDetailList.push(obj)
            });

            var objfinal = {
                prescriptionRubricDetailList: rubricList,
                prescriptionRemedyDetailList: prescriptionRemedyDetailList,
                appointmentId: parseInt(this.props.patientAppId),
                // caseId: this.props.patient.caseId,
                // doctorId: this.props.patient.doctorID,
                // patientId: this.props.patient.patientID
            }
            // array.push(obj);
            // if (objfinal.RemedyAndPresList.length > 0 && rubricList.length > 0) {

            console.log("objfinal to save prescription", objfinal)
            CommonServices.postData(objfinal, `/Prescription/SavePrescriptionDetail`).then((temp) => {
                debugger
                if (temp.data == "Record Saved Successfully") {
                    this.props.enqueueSnackbarAction("Prescription saved successfully");
                    debugger
                    console.log("this.propsthis.props", this.props)
                    this.props.history.push('/DoctorDashboard');
                    //    this.props.history.push("/DoctorDashboard");
                }
                this.setState({
                    RemedyIds: [],
                    RemedyIds: [],
                    RemedyAndPresList: []
                });
            })
        }
        else {
            this.props.enqueueSnackbarAction("Please add Prescription", "warning");
        }
    }
}
const mapStateToProps = (state) => ({
    patient: state.patient.patient,
    state: state.rubrics,
})

const mapDispatchToProps = {
    getPatient,
    enqueueSnackbarAction,
    addRubrics,
    closeSnackbar
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Prescription));
