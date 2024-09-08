import React from 'react';
import { Link } from 'react-router-dom';

import { enqueueSnackbar as snackAlert } from "../../../store/actions/notification";
import Select from "react-select";
import navlinks from '../../Navigation/DoctorNavBar';
import { green } from '@mui/material/colors';
import { setIds } from '../../../store/actions/Patient';
import ReactHtmlParser from 'react-html-parser';
import {
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
} from 'reactstrap';

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
import engs from '../../../assets/eng.png'
import mart from '../../../assets/mar.png'
import { ClipLoader } from 'react-spinners';
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
            id: 0,
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
            objectToCheck: {},
            isRemedyLoad: false,
            showInfoIcon: false,
            RubricNameForPopUp: '',
            RemedyDtailsList: [],
            remedyCount: 0,
            marathiArray: [],
            englishArray: [],
            referencerubric: [],
            toggleOrderModel: false
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
        //debugger
        if (Object.keys(this.props.parentObject).length > 0 && Object.keys(this.props.childObject).length > 0) {
            if (this.state.objectToCheck.ID === this.props.childObject.ID) {
                return;
            } else {
                console.log('this.props.parentObject == ', this.props.parentObject);

                this.setState({
                    QuestionORBodyPartRubric: [],
                    QuestionORBodyPart: []
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

    handleAddRubricClick = (remedyId) => {
        this.props.updatePassedId(5, remedyId);
        this.setState({
            toggleOrderModel:false
        })
    };

    handlePopuptoMM = (remedyId) => {
        this.toggleOrderModal()
        this.props.updatePassedId(5, remedyId);
    };
    ToggleAuthorAlias() {
        this.setState((prevState) => ({
            ShowAuthorAlias: !prevState.ShowAuthorAlias
        }));
    }


    getSubGroupQuestionSection(questiongroupId, questionsectionId) {
        //debugger

        CommonServices.getData(`/DropdownList/GetSubQuestionGroupByQGIDQSIDDDL/${questiongroupId}/${questionsectionId}`).then((temp) => {
            //debugger;
            console.log('getSubGroupQuestionSection====>>>>>>>', temp);
            this.setState({
                optionList1: temp,
                // SubQuastionGroupList: temp,
            })
        });
    }


    TabKeywordById = (questionSubgroupId, string) => {
        //debugger
        this.setState({
            QuestionORBodyPartRubric: []
        })
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
                //debugger
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
        //debugger
        this.setState({
            QuestionORBodyPartRubric: []
        })
        if (questionKeyWordBodyPartID !== undefined) {

            let obj = {
                "questionKeyWordBodyPartID": questionKeyWordBodyPartID,
                "requestType": this.state.Selectedrequesttype
            }
            CommonServices.postData(obj, `/clinicalquestions/GetClinicalRubricData`).then((res) => {
                //debugger
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
        //debugger
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
        //debugger;
        this.props.setIds(this.props.questionSectionId, this.props.questionGroupId, this.state.selectedOptions1.value, data.value)
    }


    renderSubsection = (subsections) => {
        //debugger;
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
                            {
                                this.state.QuestionORBodyPart?.map((s, index) => {
                                    return <span class="rubric" key={index}>
                                        <span className='lbls' onClick={() => {
                                            this.TabRubricById(s.questionKeyWordBodyPartID)
                                        }}>
                                            {s.questionKeyWordBodyPart},</span> &nbsp;
                                    </span>
                                })
                            }

                        </div>
                    </Col>
                </Row>

                <Row className="mt-2">
                    <Col md="12">
                        <div responsive="true" className="divst0 table-responsive" style={{ overflowY: 'scroll', overflowX: 'hidden' }}>
                            <span size="sm" style={{ color: '#08478c', fontWeight: '700' }}>RUBRICS : </span>

                            <div class="row">

                                {
                                    this.state.QuestionORBodyPartRubric?.map((s, index) => {
                                        const { Intensities } = this.props.intensity;
                                        return <div class="col-md-4"> <table class="table table-hover mt-2"><tr class="rubric" > <td key={index}>&nbsp;
                                            <span className='rubnm'
                                                onClick={() => {
                                                    console.log(s)
                                                    this.toggleOrderModal(); // Calling the first method
                                                    this.popup(s);   // Calling the second method
                                                }}>{s.subsectionName}</span>
                                            {/*   <button class="btn-clipboard" id="10">0</button>
                                                            <button class="btn-clipboard" id="11">1</button>
                                                            <button class="btn-clipboard" id="12">2</button>
                                                            <button class="btn-clipboard" id="13">3</button>
                                                            <button class="btn-clipboard" id="14">4</button> */}
                                            {Intensities.map((intensity, index) => {
                                                let id = `${s.subsectionId}${intensity.intensityNo}`;
                                                return (
                                                    <button
                                                        className="btn-clipboard1"
                                                        id={`${s.subsectionId}${s.intensityNo}`}
                                                        style={{ backgroundColor: id === this.state.id ? "green" : "" }}
                                                        // onClick={() => this.updateIntensity(rubric.subSectionId, intensity.intensityNo)}
                                                        onClick={() => this.selectRubrics(s, intensity.intensityNo, id)}
                                                    >
                                                        {intensity.intensityNo}
                                                    </button>
                                                )
                                            })
                                            }
                                        </td>
                                        </tr>
                                        </table>
                                        </div>
                                    })
                                }

                            </div>
                        </div>
                    </Col>
                </Row>

                <Modal size="lg" isOpen={this.state.toggleOrderModel} toggle={this.toggleOrderModal.bind(this)} >
                    <ModalBody>
                        {/* <Row>
                                                        <Col md="12">
                                                            {this.state.RemedyAndAuthor.map((item, index) => {
                                                                return (
                                                                    <span key={index}>
                                                                        <span
                                                                            style={{
                                                                                fontFamily: item.fontName,
                                                                                color: item.fontColor,
                                                                                fontStyle: item.fontStyle,
                                                                            }}
                                                                            to="#">
                                                                            <span>
                                                                                {item.remedyAlias}, &nbsp;</span> </span>
                                                                    </span>
                                                                )
                                                            })}
                                                        </Col>
                                                    </Row> */}




                        <div responsive="true" >
                            <Row>
                                <Col md="12" className="txtright">

                                    <div>
                                        <span className="auth"
                                            onClick={() => this.ToggleAuthorAlias()}
                                        ><i class="fa fa-user" aria-hidden="true"></i></span>
                                        <span className="auth"
                                            onClick={() => this.ToggleAuthorInformation()}
                                        ><i class="fa fa-info" aria-hidden="true"></i></span>
                                    </div>

                                    <div class="hover-text1"><span className=""><img src={engs} className="langicon" alt="English" /></span>
                                        <span class="tooltip-text1 bottom">
                                            <div class="">
                                                {
                                                    this.state.englishArray.length > 0 ?
                                                        this.state.englishArray.map((c, index) => {
                                                            return <tr key={index}>
                                                                <td>{c.subSectionDetails}</td>
                                                            </tr>
                                                        }) :
                                                        <tr>
                                                            <td colSpan="4">No data to display</td>
                                                        </tr>}
                                            </div>
                                        </span>
                                    </div>

                                    <div class="hover-text2"><span className=""><img src={mart} className="langicon" alt="Marathi" /></span>
                                        <span class="tooltip-text2 bottom">
                                            <div class="">
                                                {
                                                    this.state.marathiArray.length > 0 ?
                                                        this.state.marathiArray.map((c, index) => {
                                                            return <tr key={index}>
                                                                <td>{c.subSectionDetails}</td>
                                                            </tr>
                                                        }) :
                                                        <tr>
                                                            <td colSpan="4">No data to display</td>
                                                        </tr>}
                                            </div>
                                        </span>
                                    </div>
                                </Col>
                            </Row>

                            <Row style={{ padding: '6px' }}>
                                <Col md="12" className="txtleft">
                                    <strong className="h6">{this.state.RubricNameForPopUp}</strong>
                                    <hr></hr>
                                    <strong className="h6">
                                        {
                                            this.state.referencerubric.length > 0 ?
                                                this.state.referencerubric.map((c, index) => {
                                                    return <a href='#' className="crref"><tr key={index}>
                                                        <td >{c.refSubSectionName}</td>
                                                    </tr></a>
                                                }) :
                                                <tr>
                                                    <td colSpan="4">No data to display</td>
                                                </tr>
                                        }</strong>
                                    <hr></hr>
                                    <strong className="h6">Remedy Count : {this.state.isRemedyLoad ? `(${this.state.remedyCount})` : <ClipLoader
                                        color="#2d292a"
                                        size={12}
                                    />} </strong>
                                    <hr></hr>
                                    {this.state.isRemedyLoad ?
                                        <div>
                                            {this.state.RemedyDtailsList.length > 0 ?
                                                <div>
                                                    {this.state.RemedyDtailsList?.map((item, index) => {
                                                        {/* <Link to={"/PatientDashboard/" + this.props.patientId + "/" + this.props.caseId + "/" + this.props.patientAppId + "/" + this.props.doctorId} */ }
                                                        const NewTab = 5
                                                        return (
                                                            <span key={index} style={{ display: 'inline-block' }} class="remhov">
                                                                {/* { */}
                                                                {/* item.remediesModels.map((author, index) => {
                                                                                                return  */}
                                                                {/* <span > */}
                                                                {/* <Link to={`/PatientDashboard/${this.props.patientId}/${this.props.caseId}/${this.props.patientAppId}/${this.props.doctorId}/${NewTab}`} */}
                                                                <Link to={`#`}
                                                                   style={{
                                                                    textDecoration: 'none' 
                                                                }}

                                                                >
                                                                    <span onClick={() => this.handleAddRubricClick(item.remedyId)}>
                                                                        {/* {item.remedyAlias} */}
                                                                        <span className={item.gradeNo == 1 ? 'grade1css' : item.gradeNo == 2 ? 'grade2css' : item.gradeNo == 3 ? 'grade3css' : item.gradeNo == 4 && 'grade4css'}>
                                                                            {item.fontColor === 'Red'
                                                                                ? item.remedyAlias.toUpperCase()
                                                                                : item.remedyAlias}
                                                                        </span>

                                                                        {/* {this.state.ShowAuthorAlias && `(${item.authorAlias}),`} */}
                                                                        {this.state.ShowAuthorAlias && (
                                                                            <span  style={{ color: 'black' , fontSize:"12px" }}>
                                                                                ({item.authorAlias}),
                                                                            </span>
                                                                        )}
                                                                        {this.state.showInfoIcon &&
                                                                            <span className='hover-text3'>
                                                                                <i class="fa fa-info" aria-hidden="true" style={{ marginLeft: 10, color: 'black' }}></i>
                                                                                <div class="tooltip-text3">
                                                                                    {/* Themes OR Characteristics:{item.themesORCharacteristics} Generals:{item.generals}
                                                                                    Modalities:{item.modalities}  Particulars:{item.particulars} */}
                                                                                    <div className='modal-txt1'><strong>Themes/Characteristics : </strong> {ReactHtmlParser(item.themesORCharacteristics)}</div>
                                                                                    <div className='modal-txt2'><strong class="mt-2">Generals : </strong> {ReactHtmlParser(item.generals)} </div>
                                                                                    <div className='modal-txt3'><strong class="mt-2">Modalities : </strong> {ReactHtmlParser(item.modalities)} </div>
                                                                                    <div className='modal-txt4'><strong class="mt-2">Particulars : </strong> {ReactHtmlParser(item.particulars)}</div>

                                                                                </div>
                                                                            </span>}

                                                                    </span>
                                                                </Link>
                                                                {/* </span> */}
                                                                {/* }) */}
                                                                {/* } */}
                                                            </span>
                                                        )
                                                    })}
                                                </div>
                                                : <div >
                                                    <span >Data Not Found</span>
                                                </div>
                                            }
                                        </div> :
                                        <div style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',

                                        }}>
                                            <ClipLoader
                                                color="#2d292a"
                                                size={50}
                                            />
                                        </div>
                                    }

                                </Col>
                            </Row>
                        </div>



                    </ModalBody>
                    <ModalFooter>
                        <Button color="danger" onClick={this.toggleOrderModal.bind(this)}><i className="fa fa-ban"></i> Cancel</Button>
                    </ModalFooter>
                </Modal>

            </TabPane>
        )
    }

    ToggleAuthorInformation() {
        this.setState((prevState) => ({
            showInfoIcon: !prevState.showInfoIcon
        }));
    }

    toggleOrderModal = () => {
        this.setState({
            toggleOrderModel: !this.state.toggleOrderModel,

        })
    };

    popup = (item) => {
        debugger
        this.state.RubricNameForPopUp = ''
        this.state.RemedyDtailsList = []
        this.state.remedyCount = 0
        this.state.marathiArray = []
        this.state.englishArray = []
        this.state.referencerubric = []
        this.state.isRemedyLoad = false

        console.log('item == ', item)

        CommonServices.getDataById(parseInt(item.subsectionId), `/RubricRemedy/GetRubricDetails`).then((temp) => {
            console.log("rubric details t===", temp)
            temp.subSectionLanguageDetails.forEach((item) => {
                if (item.languageName.trim() === "English") {
                    this.state.englishArray.push(item);
                } else if (item.languageName.trim() === "Marathi") {
                    this.state.marathiArray.push(item);
                }
            });
            this.setState({
                // isloding: true,
                RemedyDtailsList: temp.remediesList,
                isRemedyLoad: true,
                remedyCount: temp.remdeyCount,
                referencerubric: temp.referencerubric,
                RubricNameForPopUp: temp.subSectionName
            })
        });
    }

    /* For type and search dropdown Existance  */


    selectRubrics = async (rubric, intensity, id) => {

        console.log('rubric == ', rubric)
        //debugger;
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
