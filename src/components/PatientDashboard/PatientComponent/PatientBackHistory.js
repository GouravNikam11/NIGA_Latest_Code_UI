//========================================================================================//
import React, { Component } from 'react';
import CommonServices from '../../../Services/CommonServices';
import { Badge, Card, CardBody, CardHeader,  TabPane, Col, PaginationItem, PaginationLink, Row, Table } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Button, Form } from 'react-bootstrap';
import moment from 'moment';
import {
    enqueueSnackbar as enqueueSnackbarAction,
    closeSnackbar
} from '../../../store/actions/notification';
import { connect } from 'react-redux';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import Pagination from "react-js-pagination";
import {
    addRubrics, deleteRubrics
} from "../../../store/actions/FindRubricsAction";
import { getIntensities } from "../../../store/actions/IntensityAction"

//========================================================================================//

/**
 * Created Date     :   17 March 2020
 * Purpose          :   Component to show cases of logged in user.
 * Author           :   Chandrashekhar Salagar.
 */
class PatientBackHistory extends Component {
    //Constructor.
    constructor(props) {
        super(props);
        this.state = {
            PatientBackHostory: [],
            SearchKey: '',
            currentPage: 1,
            pageSize: 10,
            IsDataFetched: false,
            previousFU:0

        }
    }

    componentDidMount() {
        debugger
        // var Id = this.props.patientId
        // this.GetPatientBackHostoryById(Id);
    }




    render() {
        return (
            <TabPane tabId={10} >
                   <div className="animated fadeIn">
                <Row>
                    <Col xs="12" lg="12">
                        <Card>
                            <CardHeader>
                                <Row>

                                    <Col >
                                        <i className="fa fa-align-justify"></i> &nbsp;
                                        Patient Back History
                                    </Col>
                                    <Col >

                                    </Col>
                                    <Col>

                                    </Col>
                                </Row>



                            </CardHeader>

                            <CardBody>


                                <Row>
                                    <Col md="6">
                                        <span className="hthead">Case History : </span>
                                        {/* <Button className='btncons' size="md" color="primary"><i className="fa fa-plus-square"></i> NEW CONSULTATION</Button> */}

                                        <Table hover bordered responsive >
                                            <thead style={{ textAlign: 'center' }}>
                                                <th>Date</th>
                                                <th>Time</th>
                                                <th>Type</th>
                                                <th>Case Notes</th>
                                            </thead>
                                            <tbody>
                                                {
                                                    this.renderpatientbackhostory()
                                                }
                                                {/* <td>NOV. 11, 2023</td>
                                                <td>Prescription</td> */}
                                            </tbody>
                                        </Table>
                                        <div className='text-center'>{this.renderPagination()}</div>
                                    </Col>
                                    <Col md="6">
                                        <span className="hthead">Case Notes : </span>
                                        <CKEditor className="mt-0"
                                            editor={ClassicEditor}

                                            onFocus={(event, editor) => {
                                                editor.ui.view.editable.element.style.minHeight = "300px";
                                                console.log('Focus.', editor);
                                            }}
                                        />
                                    </Col>
                                </Row>

                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </div>
            </TabPane>
         
        );
    }


    // GetPatientBackHostoryById(Id) {
    //     debugger;
    //     if (Id != undefined) {
    //         CommonServices.getDataById(Id, `/CaseDetails/GetPatientBackHostoryById`).then((res) => {
    //             debugger
    //             console.log("for ids PatientBackHostory", res)

    //             this.setState({
    //                 PatientBackHostory: res,
    //                 previousFU:res.length
    //             });
    //         });
    //     }
    // }



    renderpatientbackhostory = () => {
        debugger
        let PatientBackHostory = this.props.patientBackHostory;
        const { currentPage, pageSize } = this.state;
        const currentPageRecords = PatientBackHostory.slice(((currentPage - 1) * pageSize), (currentPage) * pageSize);

        return currentPageRecords.map((s, index) => {
            return <tr key={index}>
                {/* <td>{s.appointmentDate}</td> */}
                <td onClick={() => this.handlegetrubricbyPatientAppid(s)} style={{ textAlign: 'center' }}>{new Date(s.appointmentDate).toLocaleDateString('en-GB')}</td>
                <td onClick={() => this.handlegetrubricbyPatientAppid(s)} style={{ textAlign: 'center' }}>{s.appointmentTime}</td>
                <td onClick={() => this.handlegetPrescriptionbyPatientAppid(s)} style={{ textAlign: 'center' }}>Prescription</td>
                <td style={{ textAlign: 'center' }}><Button>Nots</Button></td>


                {/* <td  style={{ textAlign: 'center' }}>{new Date(s.appointmentDate).toLocaleDateString('en-GB')}</td>
                <td  style={{ textAlign: 'center' }}>{s.appointmentTime}</td>
                <td  style={{ textAlign: 'center' }}>Prescription</td>
                <td style={{ textAlign: 'center' }}><Button>Nots</Button></td> */}



            </tr>
        })
    }

    renderPagination = () => {
        debugger
        const totalRecords = (this.props.patientBackHostory.length);
        return (
            (totalRecords > 9) &&
            <Pagination
                itemClass="page-item" // add it for bootstrap 4
                linkClass="page-link" // add it for bootstrap 4
                activePage={this.state.currentPage}
                itemsCountPerPage={this.state.pageSize}
                totalItemsCount={totalRecords}
                pageRangeDisplayed={this.state.pageSize}
                onChange={(pageNumber) => {
                    this.setState({
                        currentPage: pageNumber
                    })
                }}
            />
        )
    }

    handlegetrubricbyPatientAppid = (s) => {
        debugger
        console.log("s for ids", s)

        CommonServices.getDataByIdmonogram(s.patientAppId, `/Prescription/PrescriptionRubricDetail?appointmentId=`).then((res) => {
            let resp = res
            // console.log("this.props.state.selectedRubrics",this.props.state.selectedRubrics)
            console.log("PrescriptionRubricDetail", res)
            // this.props.state.selectedRubrics = 

            let rubricListtoProps = []
            resp?.forEach(element => {
                let obj = {
                    "subSectionId": element.rubricId,
                    "subSectionName": element.rubricName,
                    "remedyCountForSort": element.remedyCount,
                    "intensity": element.intensityId,
                    "remedyCount": { "remedyCount": element.remedyCount },
                }
                rubricListtoProps.push(obj)
            });

            debugger
            this.props.state.selectedRubrics = rubricListtoProps
            // const selectedRubrics = this.props.state.selectedRubrics;
            debugger
            console.log("after set from api this.props.state.selectedRubrics", this.props.history)
            //  this.props.history.push('/PatientDashboard/' + s.patientId + "/" + 1075 +"/"+s.patientAppId+"/"+s.doctorId);

            this.props.UpdatePatientDashboard(8, s.patientId , s.caseId , s.patientAppId ,  s.doctorId);
        });
    };


    handlegetPrescriptionbyPatientAppid = (s) => {
        debugger
        CommonServices.getDataByIdmonogram(s.patientAppId, `/Prescription/PrescriptionRemedyDetail?appointmentId=`).then((res) => {
            let resp = res
            let PrescriptionFromAPILIST = []
            resp?.forEach(element => {
                var obj = {
                    remedyId: element.remedyId,
                    remedyName: element.remedyName,
                    PrescriptionDec: element.description,
                }
                PrescriptionFromAPILIST.push(obj)
            });
            debugger
            this.props.history.push({
                pathname: '/PatientDashboard/' + s.patientId + '/' + s.caseId + '/' + s.patientAppId + '/' + s.doctorId,
                state: {
                    PrescriptionFromAPILIST: PrescriptionFromAPILIST,
                    TabIdFromPatientHistoryforprec: 11
                },
            });
        });
    };


}
const mapStateToProps = (state) => ({
    state: state.rubrics,
    intensity: state.intensity
});
const mapDispatchToProps = {
    addRubrics,
    getIntensities,
    deleteRubrics,
    enqueueSnackbarAction,
    closeSnackbar
}
export default connect(mapStateToProps, mapDispatchToProps)(PatientBackHistory);