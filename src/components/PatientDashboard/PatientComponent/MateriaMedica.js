import React from 'react';
import { Link } from 'react-router-dom';

import { enqueueSnackbar as snackAlert } from "../../../store/actions/notification";
import Select from "react-select";
import navlinks from '../../Navigation/DoctorNavBar';
import AsyncPaginate from "react-select-async-paginate";
import { setIds } from '../../../store/actions/Patient';
import { Form, FormLabel } from 'react-bootstrap';
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
    CardText,
    Button,
    Alert,
    CardFooter

} from 'reactstrap';

import ReactHtmlParser from 'react-html-parser';
import { connect } from "react-redux";
import { debounce } from 'lodash'
import {
    getSections,
    getBodyPartsBySection,
    getSubSectionsByBodyPart,
    searchSubSections,
    addRubrics,
    getRemedyCounts,
    getRemedyName,
} from "../../../store/actions/FindRubricsAction";
import {
    enqueueSnackbar as enqueueSnackbarAction,
    closeSnackbar
} from '../../../store/actions/notification';
import CommonServices from '../../../Services/CommonServices';
import { getIntensities } from "../../../store/actions/IntensityAction"

import '../styles.css';
import 'bootstrap/dist/css/bootstrap.min.css'



class ClinicalSummary extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            QuestionList: '',
            optionList: [],
            optionList3: [],
            optionList1: [],
            optionList2: [],
            selectedOptions3: 0,
            selectedOptions1: 0,
            selectedOptions2: 0,
            selectedOptions: 0,
            patientId: this.props.patientId,
            caseId: this.props.caseId,
            doctorId: this.props.doctorId,
            patientAppId: this.props.patientAppId,

            authorId: '',
            authourList: [],
            remedyId: 0,
            RemedyName: '',
            remedyAlias: '',
            lstRemedy: [],
            isLstRemedyLoad: false,
            RemedyIds: [],
        }
    }
    //s1=0;
    /**
     * Component methods
     */
    async componentDidMount() {
        this.getauthor();

    }

    componentDidUpdate(prevProps) {
        if (prevProps.remedyIdToMM !== this.props.remedyIdToMM) {
            this.state.remedyId=this.props.remedyIdToMM
            this.state.RemedyIds= []
            this.getRemedynameToShow()
        }
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
            <TabPane tabId={5} >



                <div>
                    <Row>
                        <Col xs="12" md="12">

                            <Row>
                                <Col sm="12" md="4">
                                    {/* <Input type="text"
                                        placeholder="Search..."
                                    /> */}
                                        <AsyncPaginate isClearable
                                    labelKey="value"
                                    labelValue="RemedyId"
                                    placeholder="Search remedy"
                                    value={this.state.RemedyIds}
                                    loadOptions={this.loadRemedies}
                                    onChange={this.RemedyChanged.bind(this)}
                                />
                                </Col>

                                <Col sm="12" md="8">
                                <Row>
                                        <Col md="4" className='tright'>
                                            <FormLabel className='hthead1'><i className="fa fa-user"></i> | Author  </FormLabel>
                                        </Col>

                                        <Col md="8">
                                            <Form.Control as="select"
                                                onChange={this.handleSectionChanges.bind(this)}
                                                value={this.state.authorId}>
                                                <option value="0">
                                                    Select Author
                                                </option>
                                                {
                                                    this.renderauthorList()
                                                }
                                            </Form.Control>
                                        </Col>
                                    </Row>
                                    </Col>
                            </Row>

                            <Row>
                                <Col md="6">
                                    <Row>
                                        <Col md="6">
                                            {/* <FormLabel className='hthead1'>Remedy : &nbsp;&nbsp;</FormLabel> */}

                                            <FormLabel className='hthead1' name="RemedyName"
                                            >{this.state.RemedyName}</FormLabel>
                                        </Col>

                                        {/* <Col md="6">
                                            <FormLabel className='hthead1'>Remedy Alias : &nbsp;&nbsp;</FormLabel>

                                            <FormLabel className='hthead1' name="remedyAlias"
                                            >{this.state.remedyAlias}</FormLabel>
                                        </Col> */}

                                    </Row>
                                </Col>

                                {/* <Col md="6">

                                    <Row>
                                        <Col md="4" className='tright'>
                                            <FormLabel className='hthead1'><i className="fa fa-user"></i> | Author : </FormLabel>
                                        </Col>

                                        <Col md="8">
                                            <Form.Control as="select"
                                                onChange={this.handleSectionChanges.bind(this)}
                                                value={this.state.authorId}>
                                                <option value="0">
                                                    Select Author
                                                </option>
                                                {
                                                    this.renderauthorList()
                                                }
                                            </Form.Control>
                                        </Col>
                                    </Row>
                                </Col> */}
                            </Row>

                            <Row className="mt-0">
                                <Col md="12">
                                    <div responsive="true" className="divst0">
                                        <span size="sm" style={{ color: '#08478c', fontWeight: '700' }}>Information : </span>
                                        <hr />
                                        {/* <div class="medica">
                                                    <div class="row">
                                                        <div class="col">
                                                            <p>
                                                                <strong>PINUS CANADENSIS</strong>
                                                                <br/><br/>
                                                                <strong>Hemlock Spruce</strong>
                                                            </p>
                                                            <p>Mucous membranes are affected by Abies can and gastric symptoms are most marked, and a catarrhal condition of the stomach is produced. There are peculiar&nbsp;<i>cravings</i>&nbsp;and chilly sensations that are very characteristic, especially for women with uterine displacement, probably due to defective nutrition with debility. Respiration and heart action labored. Wants to lie down all the time; skin cold and clammy, hands cold; very faint. Right lung and liver feel small and hard. Glee</p>
                                                        </div>
                                                    </div>
                                                    <div class="row">
                                                        <div class="col">
                                                            <p><strong>Head.–</strong>Feels light-headed, tipsy. Irritable.</p>
                                                        </div>
                                                    </div>
                                                    <div class="row">
                                                        <div class="col">
                                                            <p><strong>Stomach.–</strong>Canine hunger with torpid liver.&nbsp;<i>Gnawing, hungry, faint feeling</i>&nbsp;at the epigastrium. Great appetite, craving for meat, pickles, radishes, turnips, artichokes, coarse food.&nbsp;<i>Tendency to eat far beyond capacity for digestion</i>. Burning and&nbsp;<i>distention of stomach and abdomen with palpitation</i>. Flatulence disturbs the heart’s action. Pain in right shoulder-blade, and constipation, with burning in rectum.</p>
                                                        </div>
                                                    </div>
                                                    <div class="row">
                                                        <div class="col">
                                                            <p><strong>Female.–</strong>Uterine displacements. Sore feeling at fundus of uterus, relieved by pressure. Prostration; wants to lie down all the time. Thinks womb is soft and feeble.</p>
                                                        </div>
                                                    </div>
                                                    <div class="row">
                                                        <div class="col">
                                                            <p><strong>Fever.–</strong>Cold shivering, as if blood were ice-water (<i>Acon</i>). Chills run down back. Cold water feeling between shoulders (<i>Ammon mur</i>). Skin clammy and sticky. Night-sweat (<i>China</i>)</p>
                                                        </div>
                                                    </div>
                                                </div> */}

                                        {this.state.authorId !== '' && this.state.remedyId!='' ?
                                            <Row>
                                                <Col sm="12" className='medica'>
                                                    {
                                                        this.state.lstRemedy.map((r, index) => {
                                                            return <Row key={index}>
                                                                <Col>
                                                                    {ReactHtmlParser(r.materiaMedicaDetail1)}</Col>
                                                            </Row>
                                                        })
                                                    }

                                                </Col>
                                            </Row> :
                                            <Row>
                                                <Col sm="12" className='medica'>
                                                    Please Select Author
                                                </Col>
                                            </Row>
                                        }

                                    </div>
                                </Col>
                            </Row>




                        </Col>
                    </Row>
                </div>




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

    renderauthorList = () => {
        if (this.state.authourList == undefined) {
            return null;
        }
        return this.state.authourList.map((author, index) => {
            return <option key={index} value={author.authorId}>{author.authorName}</option>
        })
    }

    getauthor() {
        CommonServices.getData(`/Author`).then((temp) => {
            this.setState({
                authourList: temp
            })
        })
    }

    handleSectionChanges(e) {
        debugger
        if (this.props.remedyIdToMM > 0 || this.state.remedyId>0) {
            CommonServices.getData(`/MateriaMedicaRemediesDetails/GetMateriaMedicaRemediesDetails?remedyId=` + parseInt(this.state.remedyId) + `&authorId=` + parseInt(e.target.value)).then((temp) => {
                console.log(temp)
                this.setState({
                    lstRemedy: temp.lstRemedy,
                    isLstRemedyLoad: true,
                })
            })
        }
        this.setState({
            authorId: e.target.value,
            isLstRemedyLoad: false
        })
    }

    getRemedynameToShow() {
        debugger;
        if (this.props.remedyIdToMM > 0) {
            this.state.authorId=''
            this.state.lstRemedy=[]
            CommonServices.getDataById(this.props.remedyIdToMM, `/remedy`).then((res) => {
                debugger;
                this.setState({
                    remedyId: res.remedyId,
                    RemedyName: res.remedyName,
                    remedyAlias: res.remedyAlias
                })
            });
        }
    }

    getRemedynameToShow2() {
        debugger;
        if (this.state.remedyId > 0) {
            this.state.authorId=''
            this.state.lstRemedy=[]
            CommonServices.getDataById(this.state.remedyId, `/remedy`).then((res) => {
                debugger;
                this.setState({
                    remedyId: res.remedyId,
                    RemedyName: res.remedyName,
                    remedyAlias: res.remedyAlias
                })
            });
        }
    }

    loadRemedies = async (search, prevOptions) => {
        debugger;
        const options = [];
        var subsectionList = this.state.SubSectionModel;
        await this.GetAllRemedies().then((result) => {
            subsectionList = result;
            console.log('data===>>', result)
        })
debugger
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
        if (e != null) {
            this.state.RemedyIds=e
            this.state.remedyId=e.value
        this.getRemedynameToShow2()
        }
         else
        {
            // this.state.remedyId=0
            this.setState({
                RemedyIds: [],
                lstRemedy:[],
                RemedyName:'',
                remedyAlias:'',
                authorId:''
            })
            // this.state.RemedyIds= []

        }
    }
    GetAllRemedies(){
        debugger
        return CommonServices.getData(`/MateriaMedicaMaster/GetRemedyDDL`).then((remadies) => {
     
         return remadies;
     })
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
