import React from 'react';
import { Link } from 'react-router-dom';

import { enqueueSnackbar as snackAlert } from "../../../store/actions/notification";
import Select from "react-select";
import navlinks from '../../Navigation/DoctorNavBar';

import { setIds } from '../../../store/actions/Patient';

import {
    Card,
    TabPane,
    CardBody,
    CardHeader,
    Col,
    Row,
    Table,
    Input,
    FormGroup,
    Label,
    CardText,
    Button,
    Alert,
    CardFooter

} from 'reactstrap';


import { connect } from "react-redux";
import { debounce } from 'lodash'
import {
    getSections,
    getBodyPartsBySection,
    getSubSectionsByBodyPart,
    searchSubSections,
    addRubrics,
    getRemedyCounts,
    getRemedyName
} from "../../../store/actions/FindRubricsAction";



import { getIntensities } from "../../../store/actions/IntensityAction"

import '../styles.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import CommonServices from '../../../Services/CommonServices';
import store from '../../../store';



class ClinicalSummary extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            QuestionList: this.props.GetQuestionsBySelectedIdforclinicalquestion,
            optionList: [],
            optionList3: [],
            optionList1: [],
            optionList2: [],
            QuestionORBodyPart: [],
            QuestionORBodyPartRubric: [],
            selectedOptions3: 0,
            selectedOptions1: 0,
            selectedOptions2: 0,
            selectedOptions: 0,
            Selectedrequesttype: "",
            patientId: this.props.patientId,
            caseId: this.props.caseId,
            doctorId: this.props.doctorId,
            patientAppId: this.props.patientAppId,
            objectToCheck: {}
        }

    }
    //s1=0;
    /**
     * Component methods
     */


    componentDidMount() {
        // debugger
        // console.log('IDfor=======', this.props)
        // debugger
        // if (Object.keys(this.props.parentObject).length > 0 && Object.keys(this.props.childObject).length > 0) {
        //     this.getSubGroupQuestionSection(this.props.childObject.ID, this.props.parentObject.ID)
        // }
       
    }

    // show selected parent and chilc navigation options on question tab here/////////////////////
    componentDidUpdate() {
        debugger
        if (Object.keys(this.props.parentObject).length > 0 && Object.keys(this.props.childObject).length > 0) {
            if (this.state.objectToCheck.ID === this.props.childObject.ID) {
                return;
            } else {
                console.log('this.props.parentObject == ', this.props.parentObject);

                this.setState({
                    QuestionORBodyPartRubric:[],
                    QuestionORBodyPart:[]
                })
                /*  if (Object.keys(this.props.parentObject).length > 0 && Object.keys(this.props.childObject).length > 0) { */
                this.setState({ objectToCheck: this.props.childObject })
                this.getSubGroupQuestionSection(this.props.childObject.ID, this.props.parentObject.ID)
                /* } */
            }
        } /* else {
            this.setState({ objectToCheck: this.props.parentObject })
        } */
    }

    componentWillUnmount() {
        //  store.dispatch({ type: 'SET_CHILD_OPTION', payload: {} });
        //  store.dispatch({ type: 'SET_PARENT_OPTION', payload: {} });
        /*  if (Object.keys(this.props.parentObject).length > 0 && Object.keys(this.props.childObject).length > 0) {
             this.getSubGroupQuestionSection(this.props.childObject.ID, this.props.parentObject.ID)
         } */
    }

    getSubGroupQuestionSection(questiongroupId, questionsectionId) {
        debugger
       
        CommonServices.getData(`/DropdownList/GetSubQuestionGroupByQGIDQSIDDDL/${questiongroupId}/${questionsectionId}`).then((temp) => {
            debugger;
            console.log('getSubGroupQuestionSection====>>>>>>>', temp);
            this.setState({                
                optionList1: temp,
                // SubQuastionGroupList: temp,
            })
        });
    }


    TabKeywordById = (questionSubgroupId, string) => {
        debugger
        if (questionSubgroupId !== undefined) {
            let requesttype = string == "LOCATION" ? "Bodypart" : "Question"
            this.setState({ Selectedrequesttype: requesttype })
            let obj = {
                "questionSectionID": this.props.parentObject.ID,
                "questionGroupId": this.props.childObject.ID,
                "questionSubGroupId": questionSubgroupId,
                "requestType": requesttype
            }
            CommonServices.postData(obj, `/clinicalquestions/GetClinicalQuestionsKeyWordBodyPart`).then((res) => {
                debugger
                console.log('API res===', res.data)
                if (res.data !== undefined) {
                    this.setState({
                        QuestionORBodyPart: res.data
                    })
                }
                else {

                }
            });
        }
    }



    TabRubricById = (questionKeyWordBodyPartID) => {
        debugger
        if (questionKeyWordBodyPartID !== undefined) {

            let obj = {
                "questionKeyWordBodyPartID": questionKeyWordBodyPartID,
                "requestType": this.state.Selectedrequesttype
            }
            CommonServices.postData(obj, `/clinicalquestions/GetClinicalRubricData`).then((res) => {
                debugger
                console.log('API res for rubric===', res.data)
                if (res.data !== undefined) {
                    this.setState({
                        QuestionORBodyPartRubric: res.data
                    })
                }
                else {

                }
            });
        }
    }

    /* subgroup handle changes */
    handleSelectSubGroup(data) {
        debugger
        this.setState({
            selectedOptions1: data,
        })
        this.props.setIds(this.props.questionSectionId, this.props.questionGroupId, data.value, 0)
    }

    /* For body part type and search dropdown */
    handlebodypart(data) {
        //console.log('pranavsir++++====>>>>>',data)
        this.setState({
            selectedOptions2: data,
        })
        debugger;
        this.props.setIds(this.props.questionSectionId, this.props.questionGroupId, this.state.selectedOptions1.value, data.value)
    }


    renderSubsection = (subsections) => {
        debugger;
        const { Intensities } = this.props.intensity;
        if (!subsections?.length) {
            return null;
        }
        const uniqueSubsections = [...new Set(subsections.map(subSection => subSection.subsectionId))];
        return uniqueSubsections.map((subSectionId) => {
            const subSection = subsections.find(subSection => subSection.subsectionId === subSectionId);

            return (
                <tr className="rubric" key={subSection.subsectionId}>
                    <td>
                        {subSection.subSectionName}
                        {Intensities.map((intensity, index) => {
                            let id = `${subSection.subsectionId}${intensity.intensityNo}`;
                            return (
                                <button
                                    className="btn-clipboard"
                                    id={`${subSection.subsectionId}${intensity.intensityNo}`}
                                    style={{ backgroundColor: id === this.state.id ? "green" : "" }}
                                    onClick={() => this.selectRubrics(subSection, intensity.intensityNo, id)}
                                >
                                    {intensity.intensityNo}
                                </button>
                            )
                        })}
                    </td>
                </tr>
            )
        })
    }



    // renderSubsections = (subsections) => {
    //     debugger;
    //     const { Intensities } = this.props.intensity;
    //     if (!subsections?.length) {
    //     }
    //     return subsections.map((subSection, index) => {
    //         return (
    //             <tr className="rubric" key={subSection.subsectionId}
    //             >
    //                 <td>{subSection.subSectionName}
    //                     {
    //                         Intensities.map((intensity, index) => {
    //                             let id = `${subSection.subsectionId}${intensity.intensityNo}`;                          
    //                             return (
    //                                 <button
    //                                     className="btn-clipboard" id={`${subSection.subsectionId}${intensity.intensityNo}`}
    //                                     style={{ backgroundColor: id == this.state.id ? "green" : "" }}
    //                                     onClick={() => this.selectRubrics(subSection, intensity.intensityNo, id)
    //                                     } >
    //                                     {intensity.intensityNo}
    //                                 </button>
    //                             )
    //                         })
    //                     }
    //                 </td>
    //             </tr>
    //         )
    //     })
    // }





    render() {
        return (
            <TabPane tabId={1} >
                <div style={{ display: 'none' }}>
                    <Row>

                        <Col xs="12" md="4">
                            <Label className="label" htmlFor="">Sub Question Group Name :</Label>
                            <Select
                                options={this.props.SubGroupQuestionSection}
                                placeholder=" Sub Question Group Name :"
                                value={this.state.selectedOptions1}
                                onChange={(item) => this.handleSelectSubGroup(item)}
                                isSearchable={true}
                            />
                        </Col>


                        <Col xs="12" md="4">
                            <Label className="label" htmlFor="">Body Part Name :</Label>
                            <Select
                                options={this.props.BodyPartforclinicalquestion}
                                placeholder=" Body Part Name :"
                                value={this.state.selectedOptions2}
                                onChange={(item) => this.handlebodypart(item)}
                                isSearchable={true}
                                noOptionsMessage={() => "Data not available in the dropdown"}
                            />
                        </Col>
                        <Col xs="12" md="8" style={{ textAlign: "right", marginTop: '50px' }}>
                            <Label style={{ fontSize: 15, margin: 0, paddingTop: 5, }}><span className="required">*</span>All Fields Are Mandatory</Label>
                        </Col>
                    </Row>
                    <br></br>
                    <Row>
                        <Col xs="12" md="5">
                            <Table striped bordered hover>
                                <thead>
                                    <tr>
                                        <th>Questions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        [...new Set(this.props.GetQuestionsBySelectedIdforclinicalquestion.map(s => s.keywordQuestion))].map((question, index) => {
                                            return (
                                                <tr key={index}>
                                                    <td>{question}</td>
                                                </tr>
                                            );
                                        })
                                    }
                                </tbody>
                            </Table>
                        </Col>


                        <Col sm="12" md="7">
                            <Card>
                                <CardHeader>
                                    <CardText>Sub Sections</CardText>
                                </CardHeader>
                                <CardBody>
                                    <div responsive="true" style={{ overflowY: 'scroll', height: '600px' }}>
                                        <Table responsive hover>
                                            {
                                                (
                                                    <tbody>
                                                        {
                                                            this.renderSubsection(this.props.GetQuestionsBySelectedIdforclinicalquestion)
                                                        }
                                                    </tbody>
                                                )
                                            }
                                        </Table>
                                    </div>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </div>

                <Row>
                    <Col sm="12" md="12">
                        <span class="hthead1"><span style={{ fontWeight: '700' }}>{Object.keys(this.props.parentObject).length > 0 ? this.props.parentObject.name : ''}</span> - {Object.keys(this.props.childObject).length > 0 ? this.props.childObject.name : ''}</span> &nbsp;&nbsp;&nbsp;&nbsp;
                        <span>
                            {
                                this.state.optionList1?.map((s, index) => {
                                    return <span key={index}>
                                        <Button size="sm" className="btntab" color="primary" onClick={() => {
                                            this.TabKeywordById(s.questionSubgroupId, s.questionSubgroup1)
                                        }}>{s.questionSubgroup1}</Button>
                                    </span>
                                })
                            }


                        </span>

                    </Col>
                </Row>

                <Row className="mt-2">
                    <Col md="12">
                        <div responsive="true" className="divst0" style={{ overflowY: 'scroll', }}>
                            <span size="sm" style={{ color: '#08478c', fontWeight: '700' }}>QUESTIONS : </span>
                            <hr />
                            <table>
                                {
                                    this.state.QuestionORBodyPart?.map((s, index) => {
                                        return <tr key={index}>
                                            <td> <i className="fa fa-angle-double-right" aria-hidden="true"></i>
                                                <span className='quest' onClick={() => {
                                                    this.TabRubricById(s.questionKeyWordBodyPartID)
                                                }}>
                                                    {s.questionKeyWordBodyPart}</span></td>
                                        </tr>
                                    })
                                }

                            </table>
                        </div>
                    </Col>
                </Row>

                <Row className="mt-2">
                    <Col md="12">
                        <div responsive="true" className="divst0 table-responsive" style={{ overflowY: 'scroll', }}>
                            <span size="sm" style={{ color: '#08478c', fontWeight: '700' }}>RUBRICS : </span>
                            <table class="table table-hover mt-2">
                                <tr class="rubric" >
                                    {
                                        this.state.QuestionORBodyPartRubric?.map((s, index) => {
                                            return <td key={index}><i className="fa fa-angle-double-right" aria-hidden="true"></i> &nbsp;
                                                <span className='rubnm'>{s.subsectionName}</span>
                                                <button class="btn-clipboard" id="10">0</button>
                                                <button class="btn-clipboard" id="11">1</button>
                                                <button class="btn-clipboard" id="12">2</button>
                                                <button class="btn-clipboard" id="13">3</button>
                                                <button class="btn-clipboard" id="14">4</button>
                                            </td>
                                        })
                                    }
                                </tr>


                            </table>
                        </div>
                    </Col>
                </Row>

            </TabPane>
        )
    }

    /* For type and search dropdown Existance  */


    selectRubrics = async (rubric, intensity, id) => {
        debugger;
        const remedyCount = await this.props.getRemedyCounts(rubric.subsectionId);
        const remedyName = await this.props.getRemedyName(rubric.subsectionId);
        this.setState({
            ...this.state,
            id

        });
        const { selectedRubrics } = this.props.state;//subSectionId
        const isExist = selectedRubrics.indexOf(rubric)
        rubric.intensity = intensity;
        rubric.remedyCountForSort = remedyCount.remedyCount;
        rubric.remedyName = remedyName;

        if (isExist != 0) {
            const { remedyCount } = this.props.state;
            rubric.remedyCount = remedyCount;
            this.props.addRubrics(rubric)
            // this.handleSave();
        }
    }
};

const mapStateToProps = (state) => ({
    state: state.rubrics,
    intensity: state.intensity,
    GetQuestionsBySelectedIdforclinicalquestion: state.patient.GetQuestionsBySelectedIdforclinicalquestion,
    questionSectionId: state.patient.questionSectionId,
    questionGroupId: state.patient.questionGroupId,
    SubGroupQuestionSection: state.patient.SubGroupQuestionSection,
    BodyPartforclinicalquestion: state.patient.BodyPartforclinicalquestion,
    parentObject: state.doctor.parentObject,
    childObject: state.doctor.childObject
});

const mapDispatchToProps = {

    addRubrics,
    getIntensities,
    getRemedyCounts,
    getRemedyName,
    snackAlert,
    setIds


}
export default connect(mapStateToProps, mapDispatchToProps)(ClinicalSummary)
