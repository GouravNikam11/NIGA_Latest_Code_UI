import React from 'react';
import { Link } from 'react-router-dom';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import {
    Col,
    Row,
    TabPane,
    Card,
    Button,
    Modal,
    Progress,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Form,
    Label,
    Input,
    FormGroup,
    Alert, CardText, CardHeader

} from 'reactstrap';
import { ClipLoader } from 'react-spinners';
import srticon from '../../../assets/srtico.png'
import pyicon from '../../../assets/pyico.png'
import DatePicker from "reactstrap-date-picker";
import { connect } from "react-redux";
import CommonServices from '../../../Services/CommonServices';
import {
    addRubrics, deleteRubrics
} from "../../../store/actions/FindRubricsAction";
import { getIntensities } from "../../../store/actions/IntensityAction"


import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import color from '@material-ui/core/colors/amber';
import { green } from '@mui/material/colors';
import {
    enqueueSnackbar as enqueueSnackbarAction,
    closeSnackbar
} from '../../../store/actions/notification';
import engs from '../../../assets/eng.png'
import mart from '../../../assets/mar.png'
require('../styles.css');
class RepertorizePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            toggleOrderModel: false,
            ListSelectSection: [],
            ListSelectSection2: [],
            tableData: [],
            NewtableData: [],
            // RemedyData: this.props.state.selectedRubrics,
            authourList: [],

            commonRemedyList: [],
            commonRemedyList2: [],
            NewcommonRemedyList: [],

            unCommonRemedyList: [],
            unCommonRemedyList2: [],
            NewunCommonRemedyList: [],

            HeadingByAuthorList: [],
            selectedAuthorId: 4,
            expanded: false,
            expanded2: false,
            expanded3: false,
            expanded4: false,
            selectedCommonUnCommonTab: 1,
            DifferentialMateriaMedica: [],
            NewDifferentialMateriaMedica: [],
            ShowDivCommonUnCommon: 1,

            RubricListByRemedyKolkattaCommon: [],
            RubricListByRemedyKolkattaUnCommon: [],

            RubricListByRemedySmallRubricCommon: [],
            RubricListByRemedySmallRubricUnCommon: [],

            SearchRemedydefaultCommon: '',
            SearchRemedydefaultUnCommon: '',
            SearchDiffMMRemedy: '',
            thermalId: '',

            SearchRubricForRepertorization: '',
            RemedyAndAuthor: [],
            RemedyCountsList: {},
            SelectedRubricForPopUp: '',
            RemedyAndAuthor: [],
            EliminationofRubric: [],
            SelectedgradeId: '',
            ClipboardRubricsEliminateModel: [],
            IsLoad: false,
            RubricBoldModel: [],

            RubricNameForPopUp: '',
            RemedyDtailsList: [],
            remedyCount: 0,
            marathiArray: [],
            englishArray: [],
            referencerubric: []
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleChange2 = this.handleChange2.bind(this);
        this.handleChange3 = this.handleChange3.bind(this);
        this.handleChange4 = this.handleChange4.bind(this);
    }

    ///search
    handleSearchDefaultCommon = (event) => {
        this.setState({ SearchRemedydefaultCommon: event.target.value });

        if (this.state.SearchRemedydefaultCommon === "") {
            this.setState({ NewcommonRemedyList: this.state.commonRemedyList });
        }
        if (this.state.SearchRemedydefaultCommon != "") {
        }
    }

    handleSearchDefaultUnCommon = (event) => {
        this.setState({ SearchRemedydefaultUnCommon: event.target.value });

        if (this.state.SearchRemedydefaultUnCommon === "") {
            this.setState({ NewunCommonRemedyList: this.state.unCommonRemedyList });
        }
        if (this.state.SearchRemedydefaultUnCommon != "") {
        }
    }

    // SearchDiffMMRemedy
    SearchDiffMMRemedy = (event) => {
        this.setState({ SearchDiffMMRemedy: event.target.value });
    }
    // this.setState.RubricListByRemedyKolkattaCommon= []

    handleChange = (panel) => (event, isExpanded) => { this.setState({ expanded: isExpanded ? panel : false, RubricListByRemedyKolkattaCommon: [] }); };
    handleChange2 = (panel) => (event, isExpanded) => { this.setState({ expanded2: isExpanded ? panel : false, RubricListByRemedyKolkattaUnCommon: [] }); };
    handleChange3 = (panel) => (event, isExpanded) => { this.setState({ expanded3: isExpanded ? panel : false, RubricListByRemedySmallRubricCommon: [] }); };
    handleChange4 = (panel) => (event, isExpanded) => { this.setState({ expanded4: isExpanded ? panel : false, RubricListByRemedySmallRubricUnCommon: [] }); };



    /**
     * Render functions
     */


    render() {

        const { expanded } = this.state;

        return (
            <TabPane tabId={8} >
                <div className="labs-imagimg">

                    {/* <Row>
                        <Col sm="12" md="12">
                        <div>
                            <Accordion expanded={expanded === 'panel1'} onChange={this.handleChange('panel1')}>
                                <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1bh-content" id="panel1bh-header">
                                    <Typography sx={{ width: '33%', flexShrink: 0 }}>
                                        Remedy Name 1
                                    </Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Typography>
                                        Rubric List
                                    </Typography>
                                </AccordionDetails>
                            </Accordion>
                            <Accordion expanded={expanded === 'panel2'} onChange={this.handleChange('panel2')}>
                                <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel2bh-content"  id="panel2bh-header">
                                    <Typography sx={{ width: '33%', flexShrink: 0 }}>
                                        Remedy Name 2
                                    </Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Typography>
                                        Rubric List
                                    </Typography>
                                </AccordionDetails>
                            </Accordion>
                            <Accordion expanded={expanded === 'panel3'} onChange={this.handleChange('panel3')}>
                                <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel3bh-content" id="panel3bh-header">
                                    <Typography sx={{ width: '33%', flexShrink: 0 }}>
                                        Remedy Name 3
                                    </Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                <Typography>
                                    Rubric List
                                </Typography>
                                </AccordionDetails>
                            </Accordion>
                        
                        </div>
                        </Col>
                    </Row> */}

                    <Row>
                        <Col sm="12" md="12">
                            <Row className="mb-1">
                                <Col sm="12" md="3">
                                    {/* <Input type="text"
                                        placeholder="Rubric Search..."
                                        name='searchText'
                                        className="textrs"
                                        onChange={this.SearchSearchRubricForRepertorization}
                                    /> */}
                                </Col>

                                <Col sm="12" md="9" className="txtright">
                                    <span class="hthead1 txtht">Repertorization</span>
                                    &nbsp;&nbsp;
                                    <Button size="sm" className="bt1" style={{ border: this.state.thermalId === 1 ? '2px solid green' : 'none' }} color="primary" title="EXTREME CHILLY" onClick={() => this.ChangeThermalState(1)}></Button>
                                    &nbsp;&nbsp;
                                    <Button size="sm" className="bt2" style={{ border: this.state.thermalId === 2 ? '2px solid green' : 'none' }} color="primary" title="CHILLY" onClick={() => this.ChangeThermalState(2)}></Button>
                                    &nbsp;&nbsp;
                                    <Button size="sm" className="bt3" style={{ border: this.state.thermalId === 3 ? '2px solid green' : 'none' }} color="primary" title="AMBITHERMAL" onClick={() => this.ChangeThermalState(3)}></Button>
                                    &nbsp;&nbsp;
                                    <Button size="sm" className="bt4" style={{ border: this.state.thermalId === 4 ? '2px solid green' : 'none' }} color="primary" title="HOT" onClick={() => this.ChangeThermalState(4)}></Button>
                                    &nbsp;&nbsp;
                                    <Button size="sm" className="bt5" style={{ border: this.state.thermalId === 5 ? '2px solid green' : 'none' }} color="primary" title="EXTREME HOT" onClick={() => this.ChangeThermalState(5)}></Button>
                                    &nbsp;&nbsp;
                                    <Button size="sm" className="bt6" color="primary" title="N/A" onClick={() => this.ChangeThermalState('')}>N/A</Button>
                                    &nbsp;&nbsp;
                                    <Button size="sm" className="btn4" color="primary" onClick={() => this.ChangeTabReset(1)}>Reset</Button>
                                    &nbsp;&nbsp;
                                    <Button size="sm" className="btn5" style={{ border: this.state.ShowDivCommonUnCommon === 2 ? '2px solid green' : 'none' }} color="primary" onClick={() => this.ChangeTab(2)}>Kolkatta Keynote Method</Button>
                                    &nbsp;&nbsp;
                                    <Button size="sm" className="btnr btn6" style={{ border: this.state.ShowDivCommonUnCommon === 3 ? '2px solid green' : 'none' }} color="primary" onClick={() => this.ChangeTab(3)} >Small Rubric</Button>
                                </Col>
                            </Row>
                        </Col>
                    </Row>

                    <Row>
                        <div className="col-md-3-half" style={{ padding: 0 }}>
                            <div className="divst1">
                                <span class="hthead1">Rubrics For Repertorization ({this.props.state.selectedRubrics?.length}) :  <div className="inbr"><img src={srticon} className="inicon" alt="Sort" title="Sort" /> <Button size="sm" className="btnr" color="primary" onClick={() => this.handleAddRubricClick(4)}>Add Rubric</Button></div></span><br />
                                <div responsive="true" style={{ overflowY: 'scroll', height: '846px' }}>

                                    <span class="divdet">
                                        <div class="table-responsive">
                                            <table class="table table-hover">
                                                <tbody>
                                                    {
                                                        this.renderRubricsForRepertorization()
                                                    }
                                                </tbody>
                                            </table>


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


                                                    <div responsive="true">
                                                        <Row>
                                                            <Col md="12" className="txtright">

                                                                <div>
                                                                    <span className="auth"
                                                                        onClick={() => this.ToggleAuthorAlias()}
                                                                    ><i class="fa fa-user" aria-hidden="true"></i></span>
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
                                                                <strong className="h6">Remedy Count : ({this.state.remedyCount}) </strong>
                                                                <hr></hr>
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
                                                                                            // fontFamily: item.fontName,
                                                                                            color: item.fontColor,
                                                                                            fontStyle: item.fontStyle,
                                                                                            textDecoration: 'none',
                                                                                            cursor: 'pointer',
                                                                                        }}>
                                                                                        <span onClick={() => this.handlePopuptoMM(item.remedyId)}>
                                                                                            {/* {item.remedyAlias} */}
                                                                                            {item.fontColor === 'Red'
                                                                                                ? item.remedyAlias.toUpperCase()
                                                                                                : item.remedyAlias}
                                                                                            {this.state.ShowAuthorAlias && `(${item.authorAlias}),`}</span>
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
                                                            </Col>
                                                        </Row>
                                                    </div>



                                                </ModalBody>
                                                <ModalFooter>
                                                    <Button color="danger" onClick={this.toggleOrderModal.bind(this)}><i className="fa fa-ban"></i> Cancel</Button>
                                                </ModalFooter>
                                            </Modal>

                                        </div>
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-7">
                            <Row>
                                <Col sm="12" md="6" style={{ padding: 0 }}>
                                    <div className="divst2">
                                        <span class="hthead1">Common :
                                            <Input type="text" className="textr" placeholder="Find Remedy" name='searchText'
                                                onChange={this.handleSearchDefaultCommon}
                                            /></span><br />

                                        {/* For By Default */}
                                        {this.state.ShowDivCommonUnCommon === 1 && (
                                            <div responsive="true" style={{ overflowY: 'scroll', height: '290px' }}>
                                                <span class="divdet">
                                                    <div class="table-responsive">
                                                        <table class="table table-hover">
                                                            <tbody>
                                                                {
                                                                    this.renderCommonTable()
                                                                }
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                </span>
                                            </div>
                                        )}

                                        {/* For Kolkatta Keynote Method */}
                                        {this.state.ShowDivCommonUnCommon === 2 && (
                                            <div responsive="true" style={{ overflowY: 'scroll', height: '290px' }}>
                                                <span class="divdet">
                                                    <div class="table-responsive">
                                                        <table class="table table-hover">
                                                            <tbody>
                                                                {
                                                                    this.renderKolkattaKeynoteCommonTable()
                                                                }
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                </span>
                                            </div>
                                        )}
                                        {/* For Small Rubrics */}
                                        {this.state.ShowDivCommonUnCommon === 3 && (
                                            <div responsive="true" style={{ overflowY: 'scroll', height: '290px' }}>
                                                <span class="divdet">
                                                    <div class="table-responsive">
                                                        <table class="table table-hover">
                                                            <tbody>
                                                                {this.renderSmallRubricCommonTable()}
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                </span>
                                            </div>
                                        )}

                                    </div>
                                </Col>
                                <Col sm="12" md="6" style={{ padding: 0 }}>
                                    <div className="divst2">
                                        <span class="hthead1">Uncommon :   <Input type="text" className="textr" placeholder="Find Remedy" name='searchText'
                                            onChange={this.handleSearchDefaultUnCommon} /></span><br />

                                        {/* For By Default */}
                                        {this.state.ShowDivCommonUnCommon === 1 && (
                                            <div responsive="true" style={{ overflowY: 'scroll', height: '290px' }}>
                                                <span class="divdet">
                                                    <div class="table-responsive">
                                                        <table class="table table-hover">
                                                            <tbody>
                                                                {
                                                                    this.renderUnCommonTable()
                                                                }
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                </span>
                                            </div>
                                        )}
                                        {/* For Kolkatta Keynote Method */}
                                        {this.state.ShowDivCommonUnCommon === 2 && (
                                            <div responsive="true" style={{ overflowY: 'scroll', height: '290px' }}>
                                                <span class="divdet">
                                                    <div class="table-responsive">
                                                        <table class="table table-hover">
                                                            <tbody>
                                                                {
                                                                    this.renderKolkattaKeynoteUnCommonTable()
                                                                }
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                </span>
                                            </div>
                                        )}
                                        {/* For Small Rubrics */}
                                        {this.state.ShowDivCommonUnCommon === 3 && (
                                            <div responsive="true" style={{ overflowY: 'scroll', height: '290px' }}>
                                                <span class="divdet">
                                                    <div class="table-responsive">
                                                        <table class="table table-hover">
                                                            <tbody>
                                                                {this.renderSmallRubricUnCommonTable()}
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                </span>
                                            </div>
                                        )}
                                    </div>
                                </Col>
                            </Row>

                            <Row>
                                <Col sm="12" md="12" style={{ padding: 0 }}>
                                    <div className="divst2" style={{ height: '550px', padding: '0px' }}>
                                        <span class="hthead1">&nbsp; Differential Materia Medica
                                            {/* <Input type="text" className="textr" placeholder="Find Author" name='searchText' /> */}
                                            <Input onChange={this.SearchDiffMMRemedy} style={{ margin: '3px' }} type="text" className="textr" placeholder="Find Remedy" name='searchText' /></span>

                                        <Tabs onSelect={this.handleCommonUncommonTabClick} fill className="custtab">
                                            <Tab eventKey={1} activeKey={this.state.selectedCommonUnCommonTab} title="COMMON">
                                                <Tabs activeKey={this.state.selectedAuthorId} onSelect={this.handleTabClick} fill>
                                                    {
                                                        this.renderauthorTable()
                                                    }

                                                </Tabs>
                                            </Tab>
                                            <Tab eventKey={2} activeKey={this.state.selectedCommonUnCommonTab} defaultActiveKey={this.state.selectedCommonUnCommonTab} title="UNCOMMON">
                                                <Tabs activeKey={this.state.selectedAuthorId} onSelect={this.handleTabClick} fill>
                                                    {
                                                        this.renderauthorTable()
                                                    }

                                                </Tabs>
                                            </Tab>
                                        </Tabs>
                                    </div>
                                </Col>
                            </Row>
                        </div>

                        <div className="col-md-1-half" style={{ padding: 0 }}>
                            <div className="divst3" >
                                <span class="hthead1">Select Section</span>
                                <div responsive="true" style={{ overflowY: 'scroll', height: '260px', borderBottom: '1px solid gainsboro' }}>

                                    <span class="divdet">
                                        <div class="table-responsive">
                                            <table class="table table-hover">
                                                <tbody>
                                                    {
                                                        this.renderSelectSectionTable()
                                                    }
                                                </tbody>
                                            </table>
                                        </div>
                                    </span>
                                </div>
                                <span class="text-center">
                                    <div style={{ paddingTop: '8px' }}>
                                        {this.renderButtonsSelectGradeInSelectSection()}
                                    </div>
                                </span>
                            </div>

                            <div className="divst3" style={{ marginTop: '6px' }}>
                                <span class="hthead1">Select Heading </span><br />
                                <div responsive="true" style={{ overflowY: 'scroll', height: '505px' }}>

                                    <span class="divdet">
                                        <div class="table-responsive">

                                            <table class="table table-hover">
                                                <tbody>
                                                    {
                                                        this.renderSelectHeadingTable()
                                                    }
                                                </tbody>
                                            </table>

                                        </div>
                                    </span>
                                </div>
                            </div>
                        </div>

                    </Row>
                </div>
            </TabPane>
        )
    }

    toggleOrderModal = () => {
        this.setState({
            toggleOrderModel: !this.state.toggleOrderModel
        })
    };

    componentDidMount() {
        this.getListSelectSection();
        this.props.getIntensities();
        this.getauthor();
        this.props.deleteRubrics([])
        this.GetHeadingByAuthorid(this.state.selectedAuthorId);
        this.ToSelect();
    }

    componentDidUpdate(prevProps) {
        this.props.getIntensities();
        if (prevProps.state.selectedRubrics !== this.props.state.selectedRubrics) {
            this.ToSelect();
        }
    }

    getListSelectSection() {
        CommonServices.getData(`/mastersAPI/GetSections`).then((temp) => {
            this.setState({
                ListSelectSection: temp,
            })
        });
    }

    getauthor() {
        CommonServices.getData(`/DropdownList/GetAuthorforMateriaMedicaDDL`).then((temp) => {
            this.setState({
                authourList: temp,
            })
        })
    }

    renderSelectSectionTable = () => {
        return this.state.ListSelectSection.map((section, index) => {
            return <tr class="rubric" key={index}>
                <td >
                    <span>{section.sectionName}<input disabled={this.state.ShowDivCommonUnCommon === 1} onChange={() => this.handleCheckboxChangeforSection(index)} class="form-check-input flt" type="checkbox" value="" id="" /></span>
                </td>
            </tr>
        })
    }

    ToSelect = () => {
        this.state.isLoad = true
        this.setState({
            commonRemedyList: [],
            unCommonRemedyList: [],
            DifferentialMateriaMedica: [],
            NewDifferentialMateriaMedica: [],
            // isLoad: true
        });

        let array = []
        this.props.state.selectedRubrics?.forEach(element => {
            let obj = {

                "subsectionId": element.subSectionId,
                "intensity": element.intensity,

            }
            array.push(obj)
        });

        if (this.state.ClipboardRubricsEliminateModel.length > 0) {
            // this.state.isLoad= true
            CommonServices.postData({ withoutEliminateRubric: array, withEliminateRubric: this.state.ClipboardRubricsEliminateModel }, `/clipboardRubrics/GetEliminationData`).then((temp) => {
                // let filteredcommonRemedyList = temp.data.commonRemedyList;
                // let filteredunCommonRemedyList = temp.data.unCommonRemedyList;

                // if (this.state.thermalId !== '') {
                //     filteredcommonRemedyList = temp.data.commonRemedyList.filter(item => item.thermalId === this.state.thermalId);
                //     filteredunCommonRemedyList = temp.data.unCommonRemedyList.filter(item => item.thermalId === this.state.thermalId);
                // }
                this.setState({
                    commonRemedyList: temp.data.commonRemedyList,
                    unCommonRemedyList: temp.data.unCommonRemedyList,
                    // commonRemedyList2: temp.data.commonRemedyList,
                    // unCommonRemedyList2: temp.data.unCommonRemedyList,
                    isLoad: false
                });
                this.GetDifferentialMateriaMedica();
            })
        }

        else {
            console.log("array001", array)
            // this.state.isLoad= true
            // CommonServices.postData(array, `/clipboardRubrics/GetCommanUnCommanRubricsDetailsBySubsectionId`).then((temp) => {
            CommonServices.postData(array, `/clipboardRubrics/GetCommanUnCommanRubricsDetails`).then((temp) => {
                debugger
                console.log("clipboardRubrics/GetDemo test", temp)
                // this.setState({
                //     commonRemedyList2: temp.data.commonRemedyList,
                //     unCommonRemedyList2: temp.data.unCommonRemedyList,
                // });

                // let filteredcommonRemedyList = temp.data.commonRemedyList;
                // let filteredunCommonRemedyList = temp.data.unCommonRemedyList;

                // if (this.state.thermalId !== '') {
                //     filteredcommonRemedyList = temp.data.commonRemedyList.filter(item => item.thermalId === this.state.thermalId);
                //     filteredunCommonRemedyList = temp.data.unCommonRemedyList.filter(item => item.thermalId === this.state.thermalId);
                // }
                this.setState({
                    commonRemedyList: temp.data.commonRemedyList,
                    unCommonRemedyList: temp.data.unCommonRemedyList,
                    commonRemedyList2: temp.data.commonRemedyList,
                    unCommonRemedyList2: temp.data.unCommonRemedyList,
                    isLoad: false
                });
                this.GetDifferentialMateriaMedica();
            });
        }
    }

    renderRubricsForRepertorization() {
        // const selectedRubrics = this.props.state.selectedRubrics.filter((v, i, a) => a.findIndex(t => (t.subSectionId === v.subSectionId)) === i);;

        const { Intensities } = this.props?.intensity;
        if (!this.props.state.selectedRubrics?.length) {
            return (<tr><td><Alert color="danger">Please select Rubrics for Repertorization</Alert></td></tr>)
        }

        // const keyword = this.state.SearchRubricForRepertorization
        // this.state.NewtableData = selectedRubrics?.filter(common =>
        //     common.subSectionName.toLowerCase().includes(keyword.toLowerCase())
        // );

        return this.props.state.selectedRubrics?.map((rubric, index) => {
            ///For Eliminate
            const isEliminate = this.state.ClipboardRubricsEliminateModel?.some(item => item.subSectionId === rubric.subSectionId);
            const eliminateStyle = isEliminate ? { backgroundColor: '#ffc7c7', borderRadius: '4px', border: '2px solid #c51515', height: '20px', width: '20px' } : {};
            /// For RubricBold
            const isBold = this.state.RubricBoldModel?.some(item => item === rubric.subSectionId);
            const BoldStyle = isBold ? { fontWeight: "bold" } : {};

            return (
                <tr className="rubric" key={rubric?.subSectionId} >
                    <td>
                        <span> <span onClick={() => { this.toggleOrderModal(); this.popup(rubric?.subSectionId) }} style={BoldStyle}>{rubric?.subSectionName} [{rubric?.remedyCount.remedyCount}]</span>

                            <div className="intbar" ><img src={pyicon} className="elibtn" alt="" title="Eliminate" style={eliminateStyle}
                                onClick={(e) => this.HandleAddEliminationofRubric(rubric)} />

                                <Button onClick={(e) => this.handleRubricDelete(index, rubric)} className="delbint" title="Delete"><i className="fa fa-trash"></i>
                                </Button> <Button style={{
                                    backgroundColor:
                                        rubric.intensity === 1 ? "black" :
                                            rubric.intensity === 2 ? "blue" :
                                                rubric.intensity === 3 ? "red" :
                                                    rubric.intensity === 4 ? "red" : "",
                                    color: "white"

                                }}
                                    className="delbint1 int1"
                                >{rubric.intensity}</Button></div></span>
                        {
                            Intensities?.map((intensity, index) => {
                                let id = `${rubric.subSectionId}${intensity.intensityNo}`;
                                return (
                                    <button
                                        className="btn-clipboard0" id={`${rubric.subSectionId}${intensity.intensityNo}`}
                                        style={{ backgroundColor: green }}
                                        onClick={() => this.updateIntensity(rubric.subSectionId, intensity.intensityNo)}
                                    >
                                        {intensity.intensityNo}
                                    </button>
                                )
                            })
                        }
                    </td>
                </tr>
            )
        });
    }

    updateIntensity = (subSectionId, intensityNo) => {
        let updateIntensity = this.props.state.selectedRubrics?.map(item =>
            item.subSectionId === subSectionId ? { ...item, intensity: intensityNo } : item
        );

        // let updatedRemedyData = this.state.RemedyData.map(item =>
        //     item.subSectionId === subSectionId ? { ...item, intensity: intensityNo } : item
        // );

        this.props.state.selectedRubrics = updateIntensity
        this.ToSelect();
    }

    ///Author Tabs
    renderauthorTable = () => {

        let authourList = this.state.authourList;
        return authourList.map((author, index) => (
            <Tab eventKey={author.authorId} title={author.authorName} style={{ overflowY: 'scroll' }}>
                {/* <span className="divdet">Heading | (Score) | Remedy Name</span> */}
                {this.renderTabContent()}
            </Tab>
        ));
    }

    /// render differential mm
    renderTabContent = () => {
        debugger
        const keyword = this.state.SearchDiffMMRemedy
        this.state.NewDifferentialMateriaMedica = this.state.DifferentialMateriaMedica?.filter(common =>
            common.remedyName.toLowerCase().includes(keyword.toLowerCase())
        );
        if (!this.props.state.selectedRubrics?.length) {
            return (<tr><td>Please select Rubrics</td></tr>)
        }

        else if (this.state.isLoad == true) {
            return (<div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: '70px',

            }}>
                <ClipLoader
                    color="#2d292a"
                    size={80}
                />
            </div>)
        }
        else if (this.state.NewDifferentialMateriaMedica.length == 0) {
            return (<tr><td>No data found</td></tr>)
        }
        return (
            <div responsive="true" style={{ height: '430px' }}>
                {this.state.NewDifferentialMateriaMedica.map((item, index) => (
                    <div key={index}>
                        <span className="divdet">  <strong>{item.remedyName}</strong></span> [{item.score}] 
                        <p dangerouslySetInnerHTML={{ __html: item.materiaMedica }} ></p>
                        {/* <div dangerouslySetInnerHTML={{ __html: item.materiaMedica }} /> */}
                    </div>
                ))}
            </div>
        );
    }

    handleTabClick = (authorId) => {
        debugger
        console.log("this.state.NewcommonRemedyList", this.state.NewcommonRemedyList)
        this.setState({
            selectedAuthorId: authorId,
            DifferentialMateriaMedica: [],
            HeadingByAuthorList: [],
            NewDifferentialMateriaMedica: []
        });
        this.GetHeadingByAuthorid(authorId);
    }

    handleCommonUncommonTabClick = (selectedTabKey) => {
        this.setState({
            DifferentialMateriaMedica: [],
            NewDifferentialMateriaMedica: [],
            selectedCommonUnCommonTab: parseInt(selectedTabKey)
        });
        this.handleTabClick(this.state.selectedAuthorId)
    }

    //render common
    renderCommonTable = () => {
        debugger
        const keyword = this.state.SearchRemedydefaultCommon
        this.state.NewcommonRemedyList = this.state.commonRemedyList?.filter(common =>
            common.remedyName.toLowerCase().includes(keyword.toLowerCase())
        )

        if (!this.props.state.selectedRubrics?.length) {
            return (<tr><td>Please select Rubrics</td></tr>)
        }

        else if (this.state.isLoad == true) {
            return (<div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: '70px',

            }}>
                <ClipLoader
                    color="#2d292a"
                    size={80}
                />
            </div>)
        }

        const filteredListNewcommonRemedyList = this.state.NewcommonRemedyList.filter(item => this.state.thermalId === '' || item.thermalId === this.state.thermalId)
        if (filteredListNewcommonRemedyList.length == 0) {
            return (<tr><td>No data found</td></tr>)
        }
        return filteredListNewcommonRemedyList.map((common, index) => {
            return <tr class="rubric" key={index}>
                <td>
                    <span class="dvComm" onClick={() => this.handleAddRubricClick(5, common.remedyId)}>
                        {common.remedyName}
                    </span>
                    <div class="dvCommhide">
                        <strong>Themes/Characteristics : </strong> {common.themesOrCharacteristics} <br></br><br></br>
                        <strong class="mt-2">Generals : </strong> {common.generals} <br></br><br></br>
                        <strong class="mt-2">Modalities : </strong> {common.modalities} <br></br><br></br>
                        <strong class="mt-2">Particulars : </strong> {common.particulars}
                    </div>
                    <button class="btnscore"><span onClick={(e) => this.HandleBoldRubricOnRemedyClick(common)} title={`Score: ${common.score}`} class="scrvalue">[{common.score}]</span></button> <Progress color="primary" value={common.progressBar} className="pbar" title={`Max Index: ${common.maxIndex}, Progress Bar: ${common.progressBar} %`}>{common.maxIndex}</Progress>
                </td>
            </tr>
        })

    }

    // render uncommon
    renderUnCommonTable = () => {

        const keyword = this.state.SearchRemedydefaultUnCommon
        this.state.NewunCommonRemedyList = this.state.unCommonRemedyList?.filter(common =>
            common.remedyName.toLowerCase().includes(keyword.toLowerCase())
        );
        if (!this.props.state.selectedRubrics?.length) {
            return (<tr><td>Please select Rubrics</td></tr>)
        }
        if (this.state.isLoad == true) {
            return (<div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: '70px',

            }}>
                <ClipLoader
                    color="#2d292a"
                    size={80}
                />
            </div>)
        }

        // if (this.state.SearchRemedydefaultUnCommon === "") {
        //     // this.setState({ NewcommonRemedyList : this.state.commonRemedyList})
        //     this.state.NewunCommonRemedyList = this.state.unCommonRemedyList
        // }

        const filteredListNewunCommonRemedyList = this.state.NewunCommonRemedyList.filter(item => this.state.thermalId === '' || item.thermalId === this.state.thermalId)
        if (filteredListNewunCommonRemedyList.length == 0) {
            return (<tr><td>No data found</td></tr>)
        }

        return filteredListNewunCommonRemedyList.map((common, index) => {
            return <tr class="rubric" key={index}>
                <td>
                    {/* <span title="Data/Information Hover Popup"> */}
                    <span class="dvUncomm" onClick={() => this.handleAddRubricClick(5, common.remedyId)}>
                        {common.remedyName}
                    </span>
                    <div class="dvUncommhide">
                        <strong>Themes/Characteristics : </strong> {common.themesOrCharacteristics} <br></br><br></br>
                        <strong class="mt-2">Generals : </strong> {common.generals} <br></br><br></br>
                        <strong class="mt-2">Modalities : </strong> {common.modalities} <br></br><br></br>
                        <strong class="mt-2">Particulars : </strong> {common.particulars}
                    </div>

                    <button class="btnscore"><span onClick={(e) => this.HandleBoldRubricOnRemedyClick(common)} title={`Score: ${common.score}`} class="scrvalue">[{common.score}]</span></button> <Progress color="primary" value={common.progressBar} className="pbar" title={`Max Index: ${common.maxIndex}, Progress Bar: ${common.progressBar} %`}>{common.maxIndex}</Progress>
                </td>
            </tr>
        })
    }

    GetHeadingByAuthorid(authorId) {
        debugger
        console.log("this.state.NewcommonRemedyList", this.state.NewcommonRemedyList)

        CommonServices.getDataById(authorId, `/RepertorizationPage/GetMateriaMedicaHeadingbyAuthorId`).then((Heads) => {
            this.setState({
                HeadingByAuthorList: Heads
            })
            this.GetDifferentialMateriaMedica();
        });
    }

    renderSelectHeadingTable = () => {
        if (!this.state.HeadingByAuthorList?.length) {
            return (<tr><td>No Data Found</td></tr>)
        }
        return this.state.HeadingByAuthorList.map((Heading, index) => {
            return <tr class="rubric" key={index}>
                <td >
                    <span>{Heading.materiaMedicaHeadName}
                        <input onChange={() => this.handleCheckboxChange(index)} checked={Heading.differentialMM} class="form-check-input flt" type="checkbox" /></span>
                </td>
            </tr>
        })
    }

    // render Differential Materia Medica
    GetDifferentialMateriaMedica() {
        debugger
        //While Common
        debugger
        if (this.state.selectedCommonUnCommonTab == 1) {
            const selectedHeadIds = this.state.HeadingByAuthorList
                .filter((item) => item.differentialMM)
                .map((item) => item.materiaMedicaHeadId);

            const selectedRemedyListPost = this.state.NewcommonRemedyList.filter(item => this.state.thermalId === '' || item.thermalId === this.state.thermalId).map((element, index) => {
                return {
                    "remedyId": element.remedyId,
                    "index": index,
                    "score": element.score
                };
            });

            let obj = {
                "authorId": this.state.selectedAuthorId,
                "materiaMedicaHeadIds": selectedHeadIds,
                "remedyIndexModelList": selectedRemedyListPost
            }

            console.log("Request GetDifferentialMateriaMedica last", obj)

            CommonServices.postData(obj, `/RepertorizationPage/GetDifferentialMateriaMedica`).then((result) => {
                this.setState({
                    DifferentialMateriaMedica: result.data
                });
                console.log("DifferentialMateriaMedica last", this.state.DifferentialMateriaMedica)
            });
        }

        ///While Uncommon
        else if (this.state.selectedCommonUnCommonTab == 2) {
            const selectedHeadIds = this.state.HeadingByAuthorList
                .filter((item) => item.differentialMM)
                .map((item) => item.materiaMedicaHeadId);

            const selectedRemedyListPost = this.state.NewunCommonRemedyList.filter(item => this.state.thermalId === '' || item.thermalId === this.state.thermalId).map((element, index) => {
                return {
                    "remedyId": element.remedyId,
                    "index": index,
                    "score": element.score
                };
            });

            let obj = {
                "authorId": this.state.selectedAuthorId,
                "materiaMedicaHeadIds": selectedHeadIds,
                "remedyIndexModelList": selectedRemedyListPost
            }
            CommonServices.postData(obj, `/RepertorizationPage/GetDifferentialMateriaMedica`).then((result) => {
                this.setState({
                    DifferentialMateriaMedica: result.data
                });

            });
        }
    }

    handleCheckboxChange = (index) => {
        const updatedList = [...this.state.HeadingByAuthorList];
        updatedList[index].differentialMM = !updatedList[index].differentialMM;
        this.setState({
            HeadingByAuthorList: updatedList
        });
        this.GetDifferentialMateriaMedica()

    };

    ChangeTab(Tab) {
        debugger
        if (this.state.ClipboardRubricsEliminateModel.length > 0 && (this.state.ShowDivCommonUnCommon == 2 || this.state.ShowDivCommonUnCommon == 3)) {
            debugger
            this.setState({
                // thermalId: '',
                SelectedgradeId: '',
                ShowDivCommonUnCommon: Tab,
                ListSelectSection: [],
                // commonRemedyList: this.state.commonRemedyList2,
                // unCommonRemedyList: this.state.unCommonRemedyList2,
                // selectedCommonUnCommonTab:1,
                // selectedAuthorId: 4,
                // DifferentialMateriaMedica: [],
            });
            this.state.selectedAuthorId = 4
            this.GetDifferentialMateriaMedica()
            this.getListSelectSection();
        }

        else if (this.state.ClipboardRubricsEliminateModel.length == 0) {
            this.setState({
                // thermalId: '',
                SelectedgradeId: '',
                ShowDivCommonUnCommon: Tab,
                ListSelectSection: [],
                // commonRemedyList: this.state.commonRemedyList2,
                // unCommonRemedyList: this.state.unCommonRemedyList2,
                // selectedCommonUnCommonTab:1,
                // selectedAuthorId: 4,
                // DifferentialMateriaMedica: [],
            });
            // this.state.selectedCommonUnCommonTab=1
            this.state.thermalId = ''
            this.state.selectedAuthorId = 4
            this.state.commonRemedyList = this.state.commonRemedyList2
            this.state.unCommonRemedyList = this.state.unCommonRemedyList2
            this.GetDifferentialMateriaMedica()
            this.getListSelectSection();
        }

        else {
            this.setState({
                SelectedgradeId: '',
                ShowDivCommonUnCommon: Tab,
                ListSelectSection: []
            });
            this.state.thermalId = ''
            this.state.selectedAuthorId = 4
            this.state.commonRemedyList = []
            this.state.unCommonRemedyList = []
            this.getListSelectSection();
            this.ToSelect()
        }
    }

    ChangeTabReset(Tab) {
        debugger
        // if(this.state.ClipboardRubricsEliminateModel.length=0){
        this.setState({
            ShowDivCommonUnCommon: Tab,
            // thermalId: '',
            SelectedgradeId: '',
            // NewDifferentialMateriaMedica: [],
            ListSelectSection: [],
            // commonRemedyList: this.state.commonRemedyList2,
            // unCommonRemedyList: this.state.unCommonRemedyList2,
            // selectedCommonUnCommonTab:1,
            // selectedAuthorId: 4,
            ClipboardRubricsEliminateModel: [],
            RubricBoldModel: [],
            expanded: false,
            expanded2: false,
            expanded3: false,
            expanded4: false,
        });
        // this.ToSelect()
        this.state.thermalId = ''
        this.state.selectedCommonUnCommonTab = 1
        this.state.selectedAuthorId = 4
        this.state.commonRemedyList = this.state.commonRemedyList2
        this.state.unCommonRemedyList = this.state.unCommonRemedyList2
        this.getListSelectSection();
        this.GetDifferentialMateriaMedica()
        // }

    }

    ///render common table for KOLKATTA keynote method 
    renderKolkattaKeynoteCommonTable = () => {
        const { expanded } = this.state;
        const keyword = this.state.SearchRemedydefaultCommon
        this.state.NewcommonRemedyList = this.state.commonRemedyList?.filter(common =>
            common.remedyName.toLowerCase().includes(keyword.toLowerCase())
        );
        if (!this.props.state.selectedRubrics?.length) {
            return (<tr><td>Please select Rubrics</td></tr>)
            // return (<tr><td>Rubrics Not Selected</td></tr>)
        }
        if (this.state.isLoad == true) {
            return (<div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: '70px',

            }}>
                <ClipLoader
                    color="#2d292a"
                    size={80}
                />
            </div>)
        }

        // if (this.state.SearchRemedydefaultCommon === "") {
        //     // this.setState({ NewcommonRemedyList : this.state.commonRemedyList})
        //     this.state.NewcommonRemedyList = this.state.commonRemedyList
        // }

        const filteredListNewcommonRemedyList2 = this.state.NewcommonRemedyList.filter(item => this.state.thermalId === '' || item.thermalId === this.state.thermalId)
        if (filteredListNewcommonRemedyList2.length == 0) {
            return (<tr><td>No data found</td></tr>)
        }

        return filteredListNewcommonRemedyList2.map((common, index) => {
            return <Accordion key={index} onChange={this.handleChange(index)} onClick={() => this.renderRubricCommonKolkatta(common.remedyId, "KolkattaKeynoteMethod", index)} expanded={expanded === index} >
                <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1bh-content" id="panel1bh-header">
                    <Typography onClick={(e) => { e.stopPropagation(); }} sx={{ width: '33%', flexShrink: 0 }}>
                        {/* <span title="Data/Information Hover Popup"> */}

                        <span class="dvComm" onClick={() => this.handleAddRubricClick(5, common.remedyId)}>
                            {common.remedyName}
                        </span>
                        <div class="dvCommhide">
                            <strong>Themes/Characteristics : </strong> {common.themesOrCharacteristics} <br></br><br></br>
                            <strong class="mt-2">Generals : </strong> {common.generals} <br></br><br></br>
                            <strong class="mt-2">Modalities : </strong> {common.modalities} <br></br><br></br>
                            <strong class="mt-2">Particulars : </strong> {common.particulars}
                        </div>

                        <button class="btnscore" ><span onClick={(e) => this.HandleBoldRubricOnRemedyClick(common)} title={`Score: ${common.score}`} class="scrvalue">[{common.score}]</span> </button>
                        <Progress color="primary" value={common.progressBar} className="pbar" title={`Max Index: ${common.maxIndex}, Progress Bar: ${common.progressBar} %`}>{common.maxIndex}</Progress>

                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        <table class="w-100">
                            {/* between filter and map */}
                            {/* (common => this.state.SelectedgradeId === '' || common.gradeId === parseInt(this.state.SelectedgradeId)) */}

                            <tbody>
                                {
                                    this.state.RubricListByRemedyKolkattaCommon.filter
                                        (common => (this.state.SelectedgradeId === '' || common.gradeId === parseInt(this.state.SelectedgradeId)) &&
                                            (!this.state.ListSelectSection.some(item => item.isChecked !== undefined && item.isChecked != false) || this.state.ListSelectSection.some(selectedItem =>
                                                selectedItem.isChecked && selectedItem.sectionId === common.sectionId
                                            )))
                                        .map((common, index) => {

                                            const { Intensities } = this.props?.intensity;

                                            return (<tr class="rubric1" >
                                                <td>
                                                    {/* <span style={{ color: common.fontColor, fontFamily: common.fontName }}>{common.subSectionName}</span> */}
                                                    <span style={{ color: common.fontColor }}>{common.subSectionName}</span>
                                                    {Intensities?.map((intensity, index) => {
                                                        let id = `${common.subSectionId}${intensity.intensityNo}`;
                                                        return (
                                                            <button
                                                                className="btn-clipboard1"
                                                                id={`${common.subSectionId}${common.intensityNo}`}
                                                                style={{ backgroundColor: green }}
                                                                // onClick={() => this.updateIntensity(rubric.subSectionId, intensity.intensityNo)}
                                                                onClick={() => this.selectRubrics(common, intensity.intensityNo, id)}
                                                            >
                                                                {intensity.intensityNo}
                                                            </button>
                                                        )
                                                    })
                                                    }
                                                </td>
                                            </tr>
                                            )
                                        })
                                }
                            </tbody>
                        </table>
                    </Typography>
                </AccordionDetails>
            </Accordion>
        })

    }



    ///render Uncommon table for KOLKATTA keynote method 
    renderKolkattaKeynoteUnCommonTable = () => {
        const { expanded2 } = this.state;
        const keyword = this.state.SearchRemedydefaultUnCommon
        this.state.NewunCommonRemedyList = this.state.unCommonRemedyList?.filter(common =>
            common.remedyName.toLowerCase().includes(keyword.toLowerCase())
        );
        if (!this.props.state.selectedRubrics?.length) {
            return (<tr><td>Please Select Rubrics</td></tr>)
            // return (<tr><td>Rubrics Not Selected</td></tr>)
        }
        if (this.state.isLoad == true) {
            return (<div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: '70px',

            }}>
                <ClipLoader
                    color="#2d292a"
                    size={80}
                />
            </div>)
        }

        // if (this.state.SearchRemedydefaultUnCommon === "") {
        //     // this.setState({ NewcommonRemedyList : this.state.commonRemedyList})
        //     this.state.NewunCommonRemedyList = this.state.unCommonRemedyList
        // }



        const filteredListNewunCommonRemedyList2 = this.state.NewunCommonRemedyList.filter(item => this.state.thermalId === '' || item.thermalId === this.state.thermalId)
        if (filteredListNewunCommonRemedyList2.length == 0) {
            return (<tr><td>No data found</td></tr>)
        }

        return filteredListNewunCommonRemedyList2.map((common, index) => {
            return <Accordion key={index} onClick={() => this.renderRubricUnCommonKolkatta(common.remedyId, "KolkattaKeynoteMethod", index)} expanded2={expanded2 === index} onChange={this.handleChange2(index)}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1bh-content" id="panel1bh-header">
                    <Typography onClick={(e) => { e.stopPropagation(); }} sx={{ width: '33%', flexShrink: 0 }}>
                        {/* <span title="Data/Information Hover Popup"> */}
                        <span class="dvUncomm" onClick={() => this.handleAddRubricClick(5, common.remedyId)}>
                            {common.remedyName}
                        </span>
                        <div class="dvUncommhide">
                            <strong>Themes/Characteristics : </strong> {common.themesOrCharacteristics} <br></br><br></br>
                            <strong class="mt-2">Generals : </strong> {common.generals} <br></br><br></br>
                            <strong class="mt-2">Modalities : </strong> {common.modalities} <br></br><br></br>
                            <strong class="mt-2">Particulars : </strong> {common.particulars}
                        </div>

                        <button class="btnscore" ><span onClick={(e) => this.HandleBoldRubricOnRemedyClick(common)} title={`Score: ${common.score}`} class="scrvalue">[{common.score}]</span></button> <Progress color="primary" value={common.progressBar} className="pbar" title={`Max Index: ${common.maxIndex}, Progress Bar: ${common.progressBar} %`}>{common.maxIndex}</Progress>
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        <table class="w-100">
                            <tbody>

                                {

                                    this.state.RubricListByRemedyKolkattaUnCommon?.filter
                                        (common => (this.state.SelectedgradeId === '' || common.gradeId === parseInt(this.state.SelectedgradeId)) &&
                                            (!this.state.ListSelectSection.some(item => item.isChecked !== undefined && item.isChecked != false) || this.state.ListSelectSection.some(selectedItem =>
                                                selectedItem.isChecked && selectedItem.sectionId === common.sectionId
                                            )))
                                        .map((common, index) => {
                                            const { Intensities } = this.props?.intensity;
                                            if (this.state.RubricListByRemedyKolkattaUnCommon.length == 0) {
                                                return (<tr><td>No data found</td></tr>)
                                            }
                                            return (<tr class="rubric1" >
                                                <td>
                                                    <span style={{ color: common.fontColor }}>{common.subSectionName}</span>
                                                    {Intensities?.map((intensity, index) => {
                                                        let id = `${common.subSectionId}${intensity.intensityNo}`;
                                                        return (
                                                            <button
                                                                className="btn-clipboard1"
                                                                id={`${common.subSectionId}${common.intensityNo}`}
                                                                style={{ backgroundColor: green }}
                                                                onClick={() => this.selectRubrics(common, intensity.intensityNo, id)}
                                                            >
                                                                {intensity.intensityNo}
                                                            </button>
                                                        )
                                                    })
                                                    }
                                                    {/* </td> */}
                                                </td>
                                            </tr>
                                            )
                                        })
                                }
                            </tbody>
                        </table>
                    </Typography>
                </AccordionDetails>
            </Accordion>
        })

    }


    ///render small rubric common
    renderSmallRubricCommonTable = () => {
        const { expanded3 } = this.state;
        const keyword = this.state.SearchRemedydefaultCommon
        this.state.NewcommonRemedyList = this.state.commonRemedyList?.filter(common =>
            common.remedyName.toLowerCase().includes(keyword.toLowerCase())
        );
        if (!this.props.state.selectedRubrics?.length) {
            return (<tr><td>Please select Rubrics</td></tr>)
            // return (<tr><td>Rubrics Not Selected</td></tr>)
        }
        if (this.state.isLoad == true) {
            return (<div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: '70px',

            }}>
                <ClipLoader
                    color="#2d292a"
                    size={80}
                />
            </div>)
        }

        // if (this.state.SearchRemedydefaultCommon === "") {
        //     // this.setState({ NewcommonRemedyList : this.state.commonRemedyList})
        //     this.state.NewcommonRemedyList = this.state.commonRemedyList
        // }



        const filteredListNewcommonRemedyList3 = this.state.NewcommonRemedyList.filter(item => this.state.thermalId === '' || item.thermalId === this.state.thermalId)
        if (filteredListNewcommonRemedyList3.length == 0) {
            return (<tr><td>No data found</td></tr>)
        }

        return filteredListNewcommonRemedyList3.map((common, index) => {
            return <Accordion onChange={this.handleChange3(index)} onClick={() => this.renderRubricCommonSmallRubric(common.remedyId, "SmallRubric", index)} key={index} expanded3={expanded3 === index} >
                <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1bh-content" id="panel1bh-header">
                    <Typography onClick={(e) => { e.stopPropagation(); }} sx={{ width: '33%', flexShrink: 0 }}>
                        {/* <span title="Data/Information Hover Popup"> */}

                        <span class="dvComm" onClick={() => this.handleAddRubricClick(5, common.remedyId)}>
                            {common.remedyName}
                        </span>
                        <div class="dvCommhide">
                            <strong>Themes/Characteristics : </strong> {common.themesOrCharacteristics} <br></br><br></br>
                            <strong class="mt-2">Generals : </strong> {common.generals} <br></br><br></br>
                            <strong class="mt-2">Modalities : </strong> {common.modalities} <br></br><br></br>
                            <strong class="mt-2">Particulars : </strong> {common.particulars}
                        </div>

                        <button class="btnscore"><span onClick={(e) => this.HandleBoldRubricOnRemedyClick(common)} title={`Score: ${common.score}`} class="scrvalue">[{common.score}]</span></button> <Progress color="primary" value={common.progressBar} className="pbar" title={`Max Index: ${common.maxIndex}, Progress Bar: ${common.progressBar} %`}>{common.maxIndex}</Progress>
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        <table class="w-100">
                            <tbody>

                                {

                                    this.state.RubricListByRemedySmallRubricCommon?.filter
                                        (common => (this.state.SelectedgradeId === '' || common.gradeId === parseInt(this.state.SelectedgradeId)) &&
                                            (!this.state.ListSelectSection.some(item => item.isChecked !== undefined && item.isChecked != false) || this.state.ListSelectSection.some(selectedItem =>
                                                selectedItem.isChecked && selectedItem.sectionId === common.sectionId
                                            )))
                                        .map((common, index) => {
                                            if (this.state.RubricListByRemedySmallRubricCommon.length == 0) {
                                                return (<tr><td>No data found</td></tr>)
                                            }
                                            const { Intensities } = this.props?.intensity;
                                            return (<tr class="rubric1" >
                                                <td>
                                                    <span style={{ color: common.fontColor, fontFamily: common.fontName }}>{common.subSectionName}</span>
                                                    {Intensities?.map((intensity, index) => {
                                                        let id = `${common.subSectionId}${intensity.intensityNo}`;
                                                        return (
                                                            <button
                                                                className="btn-clipboard1"
                                                                id={`${common.subSectionId}${common.intensityNo}`}
                                                                style={{ backgroundColor: green }}
                                                                onClick={() => this.selectRubrics(common, intensity.intensityNo, id)}
                                                            >
                                                                {intensity.intensityNo}
                                                            </button>
                                                        )
                                                    })
                                                    }
                                                </td>
                                            </tr>
                                            )
                                        })
                                }

                            </tbody>
                        </table>
                    </Typography>
                </AccordionDetails>
            </Accordion>
        })
    }

    /// render small rubric uncommon
    renderSmallRubricUnCommonTable = () => {
        const { expanded4 } = this.state;
        const keyword = this.state.SearchRemedydefaultUnCommon
        this.state.NewunCommonRemedyList = this.state.unCommonRemedyList?.filter(common =>
            common.remedyName.toLowerCase().includes(keyword.toLowerCase())
        );
        if (!this.props.state.selectedRubrics?.length) {
            return (<tr><td>Please select Rubrics</td></tr>)
        }

        if (this.state.isLoad == true) {
            return (<div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: '70px'

            }}>
                <ClipLoader
                    color="#2d292a"
                    size={80}
                />
            </div>)
        }

        // if (this.state.SearchRemedydefaultUnCommon === "") {
        //     this.state.NewunCommonRemedyList = this.state.unCommonRemedyList
        // }

        const filteredListNewunCommonRemedyList3 = this.state.NewunCommonRemedyList.filter(item => this.state.thermalId === '' || item.thermalId === this.state.thermalId)
        if (filteredListNewunCommonRemedyList3.length == 0) {
            return (<tr><td>No data found</td></tr>)
        }

        return filteredListNewunCommonRemedyList3.map((common, index) => {
            return <Accordion onChange={this.handleChange4(index)} onClick={() => this.renderRubricUnCommonSmallRubric(common.remedyId, "SmallRubric", index)} key={index} expanded4={expanded4 === index}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1bh-content" id="panel1bh-header">
                    <Typography onClick={(e) => { e.stopPropagation(); }} sx={{ width: '33%', flexShrink: 0 }}>
                        {/* <span title="Data/Information Hover Popup"> */}
                        <span class="dvUncomm" onClick={() => this.handleAddRubricClick(5, common.remedyId)}>
                            {common.remedyName}
                        </span>
                        <div class="dvUncommhide">
                            <strong>Themes/Characteristics : </strong> {common.themesOrCharacteristics} <br></br><br></br>
                            <strong class="mt-2">Generals : </strong> {common.generals} <br></br><br></br>
                            <strong class="mt-2">Modalities : </strong> {common.modalities} <br></br><br></br>
                            <strong class="mt-2">Particulars : </strong> {common.particulars}
                        </div>
                        <button class="btnscore" ><span onClick={(e) => this.HandleBoldRubricOnRemedyClick(common)} title={`Score: ${common.score}`} class="scrvalue">[{common.score}]</span></button> <Progress color="primary" value={common.progressBar} className="pbar" title={`Max Index: ${common.maxIndex}, Progress Bar: ${common.progressBar} %`}>{common.maxIndex}</Progress>
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        <table class="w-100">
                            <tbody>
                                {
                                    this.state.RubricListByRemedySmallRubricUnCommon?.filter
                                        (common => (this.state.SelectedgradeId === '' || common.gradeId === parseInt(this.state.SelectedgradeId)) &&
                                            (!this.state.ListSelectSection.some(item => item.isChecked !== undefined && item.isChecked != false) || this.state.ListSelectSection.some(selectedItem =>
                                                selectedItem.isChecked && selectedItem.sectionId === common.sectionId
                                            )))
                                        .map((common, index) => {
                                            const { Intensities } = this.props?.intensity;
                                            return (<tr class="rubric1" >
                                                <td>
                                                    <span style={{ color: common.fontColor, fontFamily: common.fontName }}>{common.subSectionName}</span>
                                                    {Intensities?.map((intensity, index) => {
                                                        let id = `${common.subSectionId}${intensity.intensityNo}`;
                                                        return (
                                                            <button
                                                                className="btn-clipboard1"
                                                                id={`${common.subSectionId}${common.intensityNo}`}
                                                                style={{ backgroundColor: green }}
                                                                // onClick={() => this.updateIntensity(rubric.subSectionId, intensity.intensityNo)}
                                                                onClick={() => this.selectRubrics(common, intensity.intensityNo, id)}
                                                            >
                                                                {intensity.intensityNo}
                                                            </button>
                                                        )
                                                    })
                                                    }
                                                </td>
                                            </tr>
                                            )
                                        })
                                }
                            </tbody>
                        </table>
                    </Typography>
                </AccordionDetails>
            </Accordion>
        })

    }


    ///render rubric in remedy common Kolkatta Key note

    renderRubricCommonKolkatta = (remedyId, method, index) => {
        // this.setState({ RubricListByRemedyKolkattaCommon: [] });
        // this.setState.RubricListByRemedyKolkattaCommon= []
        CommonServices.postData({ remedyID: remedyId, requiredType: method }, `/clipboardRubrics/GetRepertorizarionRemedy`).then((result) => {


            // if (!this.state.ListSelectSection.some(item => item.isChecked !== undefined && item.isChecked != false)) {
            this.setState({ RubricListByRemedyKolkattaCommon: result.data });
            // }

            //    else if (result.data.filter(item => this.state.ListSelectSection.some(selectedItem => selectedItem.isChecked && selectedItem.sectionId === item.sectionId)).length > 0) {

            //         this.setState({ RubricListByRemedyKolkattaCommon: result.data.filter(item => this.state.ListSelectSection.some(selectedItem => selectedItem.isChecked && selectedItem.sectionId === item.sectionId)) });
            //     }

        });
    }

    ///render kolkatta uncommon
    renderRubricUnCommonKolkatta = (remedyId, method, index) => {
        // this.state.RubricListByRemedyKolkattaUnCommon = []
        this.setState({ RubricListByRemedyKolkattaUnCommon: [] });

        CommonServices.postData({ remedyID: remedyId, requiredType: method }, `/clipboardRubrics/GetRepertorizarionRemedy`).then((result) => {

            // if (!this.state.ListSelectSection.some(item => item.isChecked !== undefined && item.isChecked != false)) {
            this.setState({ RubricListByRemedyKolkattaUnCommon: result.data });
            // }

            // if (result.data.filter(item => this.state.ListSelectSection.some(selectedItem => selectedItem.isChecked && selectedItem.sectionId === item.sectionId)).length > 0) {

            //     this.setState({ RubricListByRemedyKolkattaUnCommon: result.data.filter(item => this.state.ListSelectSection.some(selectedItem => selectedItem.isChecked && selectedItem.sectionId === item.sectionId)) });
            // }
        });

    }

    renderRubricCommonSmallRubric = (remedyId, method, index) => {
        // this.state.RubricListByRemedySmallRubricCommon = []

        CommonServices.postData({ remedyID: remedyId, requiredType: method }, `/clipboardRubrics/GetRepertorizarionRemedy`).then((result) => {

            if (!this.state.ListSelectSection.some(item => item.isChecked !== undefined && item.isChecked != false)) {
                this.setState({ RubricListByRemedySmallRubricCommon: result.data });
            }

            if (result.data.filter(item => this.state.ListSelectSection.some(selectedItem => selectedItem.isChecked && selectedItem.sectionId === item.sectionId)).length > 0) {

                this.setState({ RubricListByRemedySmallRubricCommon: result.data.filter(item => this.state.ListSelectSection.some(selectedItem => selectedItem.isChecked && selectedItem.sectionId === item.sectionId)) });
            }

        });

    }


    renderRubricUnCommonSmallRubric = (remedyId, method, index) => {
        // this.state.RubricListByRemedySmallRubricUnCommon = []

        CommonServices.postData({ remedyID: remedyId, requiredType: method }, `/clipboardRubrics/GetRepertorizarionRemedy`).then((result) => {

            if (!this.state.ListSelectSection.some(item => item.isChecked !== undefined && item.isChecked != false)) {
                this.setState({ RubricListByRemedySmallRubricUnCommon: result.data });
            }

            if (result.data.filter(item => this.state.ListSelectSection.some(selectedItem => selectedItem.isChecked && selectedItem.sectionId === item.sectionId)).length > 0) {

                this.setState({ RubricListByRemedySmallRubricUnCommon: result.data.filter(item => this.state.ListSelectSection.some(selectedItem => selectedItem.isChecked && selectedItem.sectionId === item.sectionId)) });
            }
        });
    }

    ChangeThermalState(Tab) {
        debugger
        this.state.thermalId = Tab
        this.state.DifferentialMateriaMedica = []
        this.GetDifferentialMateriaMedica()
    }

    SearchSearchRubricForRepertorization = (event) => {
        this.setState({ SearchRubricForRepertorization: event.target.value });
    }

    popup2 = (item) => {
        this.setState({
            RemedyAndAuthor: [],
            RemedyCountsList: {},
        })
        CommonServices.getDataById(item.subSectionId, `/RubricRemedy/GetGradeDetailsWithoutGrade`).then((temp) => {
            this.setState({
                RemedyAndAuthor: temp,
            })
        });

        CommonServices.getDataById(item.subSectionId, `/RubricRemedy/GetRemedyCounts`).then((temp) => {
            if (temp !== undefined) {
                this.setState({
                    RemedyCountsList: temp
                })
            }
        });
        this.setState({
            SelectedRubricForPopUp: item.subSectionName
        })
    }

    handleRubricDelete(index, rubric) {
        this.setState({
            commonRemedyList: [],
            unCommonRemedyList: [],
            DifferentialMateriaMedica: [],
            NewDifferentialMateriaMedica: [],
            expanded: false,
            expanded2: false,
            expanded3: false,
            expanded4: false,
        });

        this.state.ClipboardRubricsEliminateModel = this.state.ClipboardRubricsEliminateModel.filter(item => item.subSectionId !== rubric.subSectionId);
        const updatedRubrics = [...this.props.state.selectedRubrics];
        updatedRubrics.splice(index, 1);
        this.props.state.selectedRubrics = updatedRubrics
        this.ToSelect(rubric)
    }

    /// Select Section 
    handleCheckboxChangeforSection = (index) => {
        const updatedList = [...this.state.ListSelectSection];
        updatedList[index].isChecked = !updatedList[index].isChecked;

        this.setState({
            ListSelectSection: updatedList
        });

        // this.setState({
        //             expanded: false,
        //             expanded2: false,
        //             expanded3: false,
        //             expanded4: false
        //         });

        // this.state.expanded= false
        // this.state.expanded2= false
        // this.state.expanded3= false
        // this.state.expanded4= false
    }

    handleSelecteddgradeIdClick = (gradeId) => {
        debugger
        // this.setState({
        //     expanded: false,
        //     expanded2: false,
        //     expanded3: false,
        //     expanded4: false
        // });

        if (this.state.SelectedgradeId == gradeId) {
            this.setState({ SelectedgradeId: '' });

        }
        else {
            this.setState({ SelectedgradeId: gradeId });
        }
    }

    ///render grade buttons
    renderButtonsSelectGradeInSelectSection() {
        debugger
        const buttonNumbers = ['5', '2', '3', '4'];

        return buttonNumbers.map(number => (
            <button disabled={this.state.ShowDivCommonUnCommon === 1}
                key={number}
                className="btnsctn"
                style={{
                    backgroundColor: this.state.SelectedgradeId === number ? 'green' : 'white',
                }}
                onClick={() => this.handleSelecteddgradeIdClick(number)}
            >
                {/* {number} */}
                {number === '5' ? '1' : number}
            </button>
        ));
    }

    selectRubrics = (rubric, intensity, id) => {
        const { selectedRubrics } = this.props.state;
        rubric.intensity = intensity;
        const isExist = selectedRubrics.findIndex((item) => item.subSectionId === rubric.subSectionId && item.subSectionId === rubric.subSectionId);
        if (isExist === -1) {
            const { remedyCount } = this.props.state;
            rubric.remedyCount = remedyCount;
            if (this.props.state.selectedRubrics?.length < 20) {
                this.setState({
                    commonRemedyList: [],
                    unCommonRemedyList: [],
                    DifferentialMateriaMedica: [],
                    NewDifferentialMateriaMedica: [],
                    expanded: false,
                    expanded2: false,
                    expanded3: false,
                    expanded4: false,
                });
                this.props.addRubrics(rubric)
            }
            else {
                this.props.enqueueSnackbarAction("Maximum 20 Rubrics add limit reached.", "warning");
            }
        }
        else {
            this.props.enqueueSnackbarAction("Rubric Already Added for Repertorization", "warning");
        }
    }

    handleAddRubricClick = (tab, remedyId) => {
        // this.toggleOrderModal.bind(this)
        this.props.updatePassedId(tab, remedyId);
    };


    ///Elimination       
    HandleAddEliminationofRubric = (rubric) => {
        const isExist = this.state.ClipboardRubricsEliminateModel.some(item => item.subSectionId === rubric.subSectionId);
        if (isExist == false) {
            let obj = {
                "subSectionId": rubric.subSectionId,
                "intensity": rubric.intensity,
                "rubriccount": rubric.remedyCount.remedyCount,
            }
            this.state.ClipboardRubricsEliminateModel.push(obj)
        }
        else {
            this.state.ClipboardRubricsEliminateModel = this.state.ClipboardRubricsEliminateModel.filter(item => item.subSectionId !== rubric.subSectionId);
        }
        this.ToSelect();
    }

    ///Bold Rubric on remedy click
    HandleBoldRubricOnRemedyClick = (rubric) => {
        this.setState({ RubricBoldModel: rubric.presentSubSection });
    }
    ToggleAuthorAlias() {
        this.setState((prevState) => ({
            ShowAuthorAlias: !prevState.ShowAuthorAlias
        }));
    }
    handlePopuptoMM = (remedyId) => {
        this.toggleOrderModal()
        this.props.updatePassedId(5, remedyId);
    };

    popup(subSectionId) {
        debugger
        this.state.RubricNameForPopUp = ''
        this.state.RemedyDtailsList = []
        this.state.remedyCount = 0
        this.state.marathiArray = []
        this.state.englishArray = []
        this.state.referencerubric = []

        CommonServices.getDataById(parseInt(subSectionId), `/RubricRemedy/GetRubricDetails`).then((temp) => {
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
                remedyCount: temp.remdeyCount,
                referencerubric: temp.referencerubric,
                RubricNameForPopUp: temp.subSectionName
            })
        });
    }

    // componentWillUnmount() {
    //     this.props.state.selectedRubrics = [];
    // }
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
}

export default connect(mapStateToProps, mapDispatchToProps)(RepertorizePage)