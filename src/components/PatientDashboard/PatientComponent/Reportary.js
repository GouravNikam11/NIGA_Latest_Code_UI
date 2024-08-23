import React from 'react';
import { Link } from 'react-router-dom';
import CommonServices from '../../../Services/CommonServices';
import { enqueueSnackbar as snackAlert } from "../../../store/actions/notification";
import Pagination from "react-js-pagination";
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
    Alert

} from 'reactstrap';
import {
    NavLink,
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
import TreeView from '@material-ui/lab/TreeView';
import TreeItem from '@material-ui/lab/TreeItem';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { makeStyles } from '@material-ui/core/styles';
import MailIcon from '@material-ui/icons/Mail';

import { Navigation } from 'react-minimal-side-navigation';
import 'react-minimal-side-navigation/lib/ReactMinimalSideNavigation.css'
import engs from '../../../assets/eng.png'
import mart from '../../../assets/mar.png'
import Collapsible from 'react-collapsible';
import { ClipLoader } from 'react-spinners';
import {
    enqueueSnackbar as enqueueSnackbarAction,
    closeSnackbar
} from '../../../store/actions/notification';

class SummaryComponent extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            display: "none;",
            id: 0,
            isLoading: false,
            isBodyPartsLoaded: false,
            isSubsectionsLoaded: false,
            searchText: "",
            subSections: {},
            subSectionList: [],
            patientId: 0,
            SubsectionListByBodyPart: [],
            RemedyDtailsList: [],
            CrossReferences: {},
            referencerubric: [],
            subSectionLanguageDetails: [],
            englishArray: [],
            marathiArray: [],
            RemedyCountsList: {},
            RubricNameForPopUp: '',
            remedyCount: 0,
            treeNodes: [],
            NewSubsectionlist: [],
            currentPage: 1,
            pageSize: 20,
            searchQuery: '',
            searchQuery2: '',
            SelectedSectionId: 0,
            showInfoIcon: false
            // ShowAuthorAlias:false
        }
        this.searchSubsections = debounce(this.searchSubsections, 200)
        this.treeClicked = this.treeClicked.bind(this);
        this.handleClick = this.handleClick.bind(this);
        //  this.handleColor = this.handleColor.bind(this);
    }

    /**
     * Component methods
     */
    async componentDidMount() {
        // this.getSectionsforreportary();
        this.setState({
            isLoading: true
        });
        await this.props.getSections();
        await this.props.getIntensities();
        this.setState({
            isLoading: false
        });
        // console.log('state========',this.props.state)
    }

    /**
     * Render methods
     */

    /**
     * render sections
     */
    handleChange2(sectionId) {
        this.state.SelectedSectionId = sectionId
        this.state.searchQuery2 = ''
        // this.setState({
        //     [e.target.name]: e.target.value,
        //     isLoading: true
        // }, () => {
        this.setState({
            searchQuery: '',
        })
        this.GetSubSection(1, '', sectionId)
        // })
        this.state.RubricNameForPopUp = ''
        this.state.RemedyDtailsList = []
        this.state.remedyCount = 0
        this.state.marathiArray = []
        this.state.englishArray = []
        this.state.referencerubric = []
    }
    handleChange3(referencerubric) {
        // this.setState({
        //     [e.target.name]: e.target.value,
        //     isLoading: true
        // }, () => {
        this.setState({
            searchQuery: '',
        })
        this.GetSubSection(1, referencerubric, this.state.SelectedSectionId)
        // })
    }
    renderSections = () => {

        const { sections } = this.props.state;
        // console.log('sections========', sections)
        if (!sections?.length) {
            return null;
        }
        return sections.map((section, index) => {
            const isSelected = section.sectionId === this.state.SelectedSectionId;
            return (
                <>
                    <tr key={section.sectionId}
                        // onClick={() => this.handleChange2((section.sectionId))
                        // onClick={this.handleChange2(section.sectionId)}
                        onClick={() => this.handleChange2((section.sectionId))}>
                        <Navigation 
                            items={[
                                {
                                    title: <span style={{ fontWeight: isSelected ? 'bold' : '' }}>{section.sectionName}</span>,
                                    itemId: '/mainsection2',
                                },
                            ]}
                        />
                    </tr>
                </>
            )
        })
    }

    /**
     * render body parts
     */
    // renderBodyParts() {

    //     const { bodyParts } = this.props.state;
    //     if (!bodyParts.length) {
    //         return (<tr><td><Alert color="danger"> body parts not found</Alert></td></tr>)
    //     }
    //     return bodyParts.map((bodyPart, index) => {
    //         return (
    //             <tr key={bodyPart.bodyPartId} onClick={() => this.getSubSection(bodyPart.bodyPartId)}>
    //                 <td >{bodyPart.bodyPartName} </td>
    //             </tr>
    //         )
    //     });
    // };
    /**
     * render subsections
     */
    // renderSubsections = ({ subsections }) => {
    //     debugger;
    //     console.log('subsections===', subsections)
    //     debugger;
    //     const { Intensities } = this.props.intensity;
    //     if (!subsections?.length) {
    //         return (<tr><td><Alert color="danger"> sub sections not found</Alert></td></tr>)
    //     }
    //     return subsections.map((subSection, index) => {
    //         return <tr className="rubric" key={subSection.subSectionId} >
    //             <td onClick={() => this.RemedyDetailsByID(subSection.subSectionId, subSection.subSectionName)}>{subSection.subSectionName}
    //                 {
    //                     Intensities.map((intensity, index) => {
    //                         let id = `${subSection.subSectionId}${intensity.intensityNo}`;
    //                         return (
    //                             <button
    //                                 className="btn-clipboard" id={`${subSection.subSectionId}${intensity.intensityNo}`}
    //                                 style={{ backgroundColor: id == this.state.id ? "green" : "" }}
    //                                 onClick={() => this.selectRubrics(subSection, intensity.intensityNo, id)
    //                                 } >
    //                                 {intensity.intensityNo}
    //                             </button>
    //                         )
    //                     })
    //                 }
    //             </td>
    //         </tr>
    //         // )
    //     })
    // }

    RemedyDetailsByID(subSectionId) {
        debugger
        this.state.RubricNameForPopUp = ''
        this.state.RemedyDtailsList = []
        this.state.remedyCount = 0
        this.state.marathiArray = []
        this.state.englishArray = []
        this.state.referencerubric = []
        this.state.showInfoIcon = false;

        CommonServices.getDataById(parseInt(subSectionId), `/RubricRemedy/GetRubricDetails`).then((temp) => {
            console.log("rubric details t===", temp)

            temp.subSectionLanguageDetails.forEach((item) => {
                if (item.languageName.trim() === "English") {
                    this.state.englishArray.push(item);
                } else if (item.languageName.trim() === "Marathi") {
                    this.state.marathiArray.push(item);
                }
            });

            console.log("this.state.marathiArray", this.state.marathiArray)
            console.log("this.state.englishArray", this.state.englishArray)

            this.setState({
                // isloding: true,
                RemedyDtailsList: temp.remediesList,
                remedyCount: temp.remdeyCount,
                // marathiArray:temp.subSectionLanguageDetails,
                // englishArray:temp.subSectionLanguageDetails,
                referencerubric: temp.referencerubric,
                RubricNameForPopUp: temp.subSectionName
            })
        });

        // CommonServices.getDataById(subSectionId, `/RubricRemedy/GetRemedyCounts`).then((temp) => {
        //     debugger
        //     this.setState({
        //         RemedyCountsList: temp,
        //         remedyCount: temp.remedyCount
        //     })
        // });

        // CommonServices.getDataById(parseInt(subSectionId), `/subsection`).then((res) => {
        //     debugger
        //     res.subSectionLanguageDetails.forEach((item) => {
        //         if (item.languageName.trim() === "English") {
        //             this.state.englishArray.push(item);
        //         } else if (item.languageName.trim() === "Marathi") {
        //             this.state.marathiArray.push(item);
        //         }
        //     });
        //     console.log('englishArray==', this.state.englishArray)
        //     console.log('marathiArray==', this.state.marathiArray)
        //     this.setState({
        //         CrossReferences: res,
        //         referencerubric: res.referencerubric,
        //         subSectionLanguageDetails: res.subSectionLanguageDetails
        //     })
        // })
    }



    render() {
        return (
            <TabPane tabId={4} >
                <Row>
                    <Col sm="12" md="12">
                        <Row>
                            <Col sm="12" md="3">
                                <Input type="text"
                                    placeholder="Rubric Search..."
                                    name='searchQuery'
                                    value={this.state.searchQuery}
                                    onChange={this.handleChange.bind(this)}
                                />
                            </Col>
                            {/* <Col sm="12" md="3" className="txtright">
                                <Button size="sm" className="btn5" color="primary">KOLKATTA KEYNOTE METHOD</Button>
                            </Col> */}
                            {/* <Col sm="12" md="6" className="txtright">
                                <Button size="sm" className="btns1" color="primary">EXTREME CHILLY</Button>
                                &nbsp;&nbsp;
                                <Button size="sm" className="btns2" color="primary">CHILLY</Button>
                                &nbsp;&nbsp;
                                <Button size="sm" className="btns3" color="primary">AMBITHERMAL</Button>
                                &nbsp;&nbsp;
                                <Button size="sm" className="btns4" color="primary">HOT</Button>
                                &nbsp;&nbsp;
                                <Button size="sm" className="btns5" color="primary">EXTREME HOT</Button>
                            </Col> */}



                            {/* <Col sm="12" md="9" className="txtright ">

                                <Link to={"/Clipboard/" + this.props.patientId + "/" + this.props.caseId + "/" + this.props.patientAppId + "/" + this.props.doctorId}>
                                    <Button size="sm" className="btn1" color="primary">REPORTORIZE</Button><span className="numbadge">{this.props.state.selectedRubrics?.length}</span>
                                </Link>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                <Button size="sm" className="btn2" color="primary">ACUTE CLIPBOARD</Button><span className="numbadge">11</span>
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                <Button size="sm" className="btn3" color="primary">FOLLOW UP</Button><span className="numbadge">07</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                <Button size="sm" className="btn4" color="primary">5-35 ANALYSIS METHOS &nbsp;<i className="fa fa-angle-down" aria-hidden="true"></i></Button>
                            </Col> */}
                        </Row>
                    </Col>
                </Row>
                <Row>
                    <Col sm="12" md="2" className="fdiv">
                        <Card>
                            <CardHeader>
                                <CardText>Sections</CardText>
                            </CardHeader>

                            <div responsive="true" style={{ overflowY: 'scroll', height: '600px' }}>
                                <Table responsive hover>
                                    <tbody>
                                        {
                                            !this.state.isLoading ?
                                                this.renderSections()
                                                : <tr><td>Loading...</td></tr>
                                        }
                                    </tbody>
                                </Table>
                            </div>

                        </Card>
                    </Col>
                    {/* Body Part  */}
                    {/* <Col sm="12" md="3">
                        <Card>
                            <CardHeader>
                                <CardText>Body Parts</CardText>
                            </CardHeader>
                            <CardBody>
                                <div responsive="true" style={{ overflowY: 'scroll', height: '600px' }}>
                                    <Table responsive hover>
                                        <tbody>
                                            {
                                                this.state.isBodyPartsLoaded ?
                                                    this.renderBodyParts()
                                                    : null
                                            }
                                        </tbody>
                                    </Table>
                                </div>
                            </CardBody>
                        </Card>
                    </Col> */}
                    {/* Subsections  */}
                    <Col sm="12" md="4" className="sdiv">
                        <Card>
                            <CardHeader style={{ height: '35px' }}>
                                <CardText className="cardtextl">Sub Sections</CardText>
                                {this.state.SelectedSectionId !== 0 && (
                                    <Input type="text"
                                        className="cardsearch"
                                        placeholder="Sub Sections Search..."
                                        name='searchQuery2'
                                        value={this.state.searchQuery2}
                                        onChange={this.handleChangeSubSection.bind(this)}
                                    />
                                )}
                            </CardHeader>

                            <div responsive="true" style={{ overflowY: 'scroll', height: '600px' }}>
                                <div responsive="true" style={{ overflowY: 'scroll', height: '560px' }}>
                                    <Table responsive hover >
                                        <tbody>
                                            {
                                                this.renderNewSubsections()
                                            }
                                        </tbody>
                                    </Table>
                                </div>
                                <div responsive="true" className='pgdiva'>
                                    {this.renderPagination()}
                                </div>
                            </div>

                        </Card>
                    </Col>

                    <Col sm="12" md="6" className="tdiv">
                        <Card>
                            <CardHeader>
                                <CardText>Rubric Details</CardText>
                            </CardHeader>

                            <div responsive="true" style={{ overflowY: 'scroll', overflowX: 'hidden', height: '600px' }}>
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
                                                    {/* {
                                                    
                                                    this.state.marathiArray.length > 0 ?
                                                        this.state.marathiArray.map((c, index) => {
                                                             <tr >
                                                                <td>{c.subSectionDetails}</td>
                                                            </tr>
                                                        }) :
                                                        <tr>
                                                            <td colSpan="4">No data to display</td>
                                                        </tr>} */}
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

                                <Row style={{ padding: '6px'}}>
                                    <Col md="12" className="txtleft">
                                        {/* <strong className="h6">{this.state.RubricNameForPopUp} ({this.state.remedyCount})</strong> */}
                                        {this.state.RubricNameForPopUp && (
                                            <strong className="h6">
                                                {this.state.RubricNameForPopUp} [{this.state.remedyCount}]
                                            </strong>
                                        )}
                                        <hr></hr>
                                        <strong className="h6">
                                            {
                                                this.state.referencerubric.length > 0 ?
                                                    this.state.referencerubric.map((c, index) => {
                                                        return <a href='#' className="crref"><tr key={index}>
                                                            <td onClick={() => this.handleChange3((c.refSubSectionName))} >{c.refSubSectionName}&nbsp;&nbsp;</td>
                                                        </tr></a>
                                                    }) :
                                                    <tr>
                                                        <td colSpan="4">No data to display</td>
                                                    </tr>
                                            }</strong>
                                        <hr></hr>
                                        {/* <strong className="h6">Remedy Count : ({this.state.remedyCount}) </strong> */}
                                        {/* <hr></hr> */}
                                        {this.state.RemedyDtailsList.length > 0 ?
                                            <div>
                                                {this.state.RemedyDtailsList?.map((item, index) => {
                                                    {/* <Link to={"/PatientDashboard/" + this.props.patientId + "/" + this.props.caseId + "/" + this.props.patientAppId + "/" + this.props.doctorId} */ }
                                                    const NewTab = 5
                                                    return (
                                                        <span class="text-in" >
                                                            <span key={index} style={{ display: 'inline-block', }} class="remhov">
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
                                                                    <span >
                                                                        {/* {item.remedyAlias} */}
                                                                        <span onClick={() => this.handleAddRubricClick(item.remedyId)}
                                                                         className={item.gradeNo == 1 ? 'grade1css' : item.gradeNo == 2 ? 'grade2css' : item.gradeNo == 3 ? 'grade3css' : item.gradeNo == 4 && 'grade4css'}>
                                                                        {item.fontColor === 'Red'
                                                                            ? item.remedyAlias.toUpperCase()
                                                                            : item.remedyAlias}
                                                                        </span>
                                                                        
                                                                        {/* {this.state.ShowAuthorAlias && `(${item.authorAlias}),`} */}
                                                                        {this.state.ShowAuthorAlias && (
                                                                            <span style={{ color: 'black' , fontSize:"12px" }}>
                                                                                ({item.authorAlias}),
                                                                            </span>
                                                                        )}
                                                                        {this.state.showInfoIcon &&
                                                                            <span className='hover-text3'>
                                                                                <i class="fa fa-info" aria-hidden="true" style={{ marginLeft: 10, color: 'black' }}></i>
                                                                                <div class="tooltip-text3">
                                                                                    {/* Themes OR Characteristics:{item.themesORCharacteristics} Generals:{item.generals}
                                                                                    Modalities:{item.modalities}  Particulars:{item.particulars} */}
                                                                                    <strong>Themes/Characteristics : </strong> {item.themesORCharacteristics} <br></br><br></br>
                                                                                    <strong class="mt-2">Generals : </strong> {item.generals} <br></br><br></br>
                                                                                    <strong class="mt-2">Modalities : </strong> {item.modalities} <br></br><br></br>
                                                                                    <strong class="mt-2">Particulars : </strong> {item.particulars}

                                                                                </div>
                                                                            </span>}

                                                                    </span>
                                                                </Link>

                                                                {/* </span> */}
                                                                {/* }) */}
                                                                {/* } */}
                                                            </span>

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

                        </Card>
                    </Col>
                </Row>



                {/* <Card>
                            <CardHeader>
                                <i className="fa fa-align-justify"></i>
                                Niga Repertory
                            </CardHeader>
                            <Row>
                                <Col xs="12" md="6">
                                    <FormGroup >
                                        <TreeView
                                            defaultCollapseIcon={<ExpandMoreIcon />}
                                            defaultExpandIcon={<ChevronRightIcon />}
                                        >
                                            {this.getTreeItemsFromData(this.state.treeNodes)}
                                         
                                        </TreeView>
                                    </FormGroup>
                                </Col>
                            </Row>
                        </Card> */}
            </TabPane>



        )
    }

    //Methods for nigareportary//
    handleClick(event) {
        event.preventDefault();
    }

    // getSectionsforreportary() {
    //     debugger
    //     CommonServices.getData(`/section`).then((result) => {
    //         debugger
    //         let data = result.map((value, index) => {
    //             let subSectonList = value.listSubSectionModel;
    //             let treeStructure = this.list_to_tree(subSectonList, null);
    //             return {
    //                 subSectionName: value.sectionName,
    //                 subSectionId: value.sectionId,
    //                 children: treeStructure
    //             }
    //         });
    //         this.setState({
    //             treeNodes: data

    //         });
    //     });

    // }


    list_to_tree(data, root) {
        console.log('root======', root)
        console.log('data======', data)
        var r = [], o = {};
        data.forEach(function (a) {
            if (o[a.subSectionId] && o[a.subSectionId].children) {
                a.children = o[a.subSectionId] && o[a.subSectionId].children;
            }
            o[a.subSectionId] = a;
            if (a.parentSubSectionId === root) {
                r.push(a);
            } else {
                o[a.parentSubSectionId] = o[a.parentSubSectionId] || {};
                o[a.parentSubSectionId].children = o[a.parentSubSectionId].children || [];


                o[a.parentSubSectionId].children.push(a);
            }
        });

        return r;
    }

    getTreeItemsFromData = treeItems => {
        // console.log('treeItems==================================',treeItems);
        return treeItems.map(treeItemData => {
            let children = undefined;
            if (treeItemData.children && treeItemData.children.length > 0) {
                children = this.getTreeItemsFromData(treeItemData.children);
            }
            return (
                <TreeItem
                    key={treeItemData.subSectionName}
                    nodeId={treeItemData.subSectionName}
                    label={treeItemData.subSectionName}
                    children={children}
                    labelIcon={MailIcon}
                    onClick={() => this.treeClicked(treeItemData.subSectionId)} />
            );

        });
    };

    treeClicked(nodeId) {

        // alert(nodeId);
    }
    /**
     * handleChange
     */
    handleChange(e) {
        debugger
        // this.setState({ [e.target.name]: e.target.value });
        // if (e.target.value != undefined) {
        //     this.searchSubsections(e.target.value)
        // }
        this.state.searchQuery = ""
        this.state.searchQuery2 = ""
        this.state.SelectedSectionId = 0
        this.state.SubSectionList = []

        this.setState({
            searchQuery: e.target.value,
            SubSectionList: []
        })
        // if(e.target.value=="")
        // {
        //     // this.state.SelectedSectionId=0
        //     this.state.SubSectionList=[]
        // }

        this.GetSubSection(1, e.target.value, this.state.SelectedSectionId)
    }

    handleColor = (event) => {
        const id = event.target.id;
        // this.setState({
        //     ...this.state,
        //     id:id

        // });

    };

    /**
     * get body parts from section
     */
    getBodyParts = async (sectionId) => {
        this.setState({
            CrossReferences: [],
            RemedyCountsList: [],
            RubricNameForPopUp: '',
            englishArray: [],
            marathiArray: [],
            RemedyDtailsList: [],
            remedyCount: 0,
            isloding: true,
            isBodyPartsLoaded: false
        });
        await this.props.getBodyPartsBySection(sectionId);
        this.setState({
            isBodyPartsLoaded: true
        });

    };

    /**
     * Get Subsections by body part
     */
    // getSubSection = async (bodyPartId) => {
    //     debugger
    //     this.setState({
    //         CrossReferences: [],
    //         RemedyCountsList: [],
    //         englishArray: [],
    //         marathiArray: [],
    //         RubricNameForPopUp: '',
    //         RemedyDtailsList: [],
    //         remedyCount: 0,
    //         isloding: true,
    //         isSubsectionsLoaded: false
    //     });
    //     const response = await this.props.getSubSectionsByBodyPart(bodyPartId)
    //     debugger
    //     console.log('response getSubSectionsByBodyPart==', response)
    //     this.setState({
    //         // SubsectionListByBodyPart:response,
    //         isSubsectionsLoaded: true
    //     });
    // };

    /**
     * searchSubsections
     */
    searchSubsections = async (searchKey) => {
        this.setState({
            isBodyPartsLoaded: false
        });
        const response = await this.props.searchSubSections(searchKey);
        this.setState({
            isSubsectionsLoaded: true
        });

    };

    /**
     * Select Rubrics
     */
    selectRubrics = async (rubric, intensity, id) => {
        this.state.searchQuery = ""
        this.state.searchQuery2 = ""
        const remedyCount = await this.props.getRemedyCounts(rubric.subSectionId);
        const remedyName = await this.props.getRemedyName(rubric.subSectionId);
        this.setState({
            ...this.state,
            id
        });

        const { selectedRubrics } = this.props.state;
        const isExist = selectedRubrics.findIndex((item) => item.subSectionId === rubric.subSectionId && item.subSectionId === rubric.subSectionId);
        rubric.intensity = intensity;
        rubric.remedyCountForSort = remedyCount.remedyCount;
        rubric.remedyName = remedyName;

        if (isExist === -1) {
            const { remedyCount } = this.props.state;
            rubric.remedyCount = remedyCount;
            if (this.props.state.selectedRubrics?.length < 20) {
                this.props.addRubrics(rubric)
            }
            else {
                this.props.enqueueSnackbarAction("Whoops! You've hit the max limit of 20 rubrics.", "warning");
            }
        }
        else {
            this.props.enqueueSnackbarAction("This rubric is already added for Repertorization", "warning");
        }
    }

    /**
         * Method is used to handle submit of form
         */
    handleSave() {
        var clipboardRubricsModel = [];
        var patientId = this.props.patientId;
        var caseId = this.props.caseId;
        const selectedRubrics = this.props.state.selectedRubrics;
        selectedRubrics.map((value, index) => {
            var item = {
                ClipboardRubricsId: 0,
                PatientId: patientId,
                caseId: caseId,
                SubSectionId: value.subSectionId,
                Intensity: value.intensity,
                EnteredBy: localStorage.getItem("UserName"),
                DeleteStatus: false,
            }
            clipboardRubricsModel.push(item);
        })
        /*Save Request*/
        CommonServices.postData(clipboardRubricsModel, `/clipboardRubrics`).then((res) => {
            this.props.snackAlert();
            this.setState({
                ClipboardRubricsId: 0,
                PatientId: 0,
                caseId: 0,
                SubSectionId: 0,
                Intensity: '',
                EnteredBy: '',
                DeleteStatus: '',
            })
        })
    }

    GetSubSection(pageNumber, searchQuery, sectionId) {
        // this.setState({
        //     SubSectionList: []
        // })
        this.state.SelectedSectionId = sectionId;
        // if (this.state.SelectedSectionId > 0) {
        this.state.currentPage = pageNumber
        this.state.SubSectionList = []
        CommonServices.getData(`/Pagination/GetSubsectionBySectionIdOrQueryString?sectionId=${this.state.SelectedSectionId}${searchQuery ? `&queryString=${searchQuery}` : ''}&PageNumber=${pageNumber}&PageSize=${this.state.pageSize}`).then((temp) => {
            console.log("searchq2=========", temp)
            this.state.currentPage = pageNumber
            this.setState({
                SubSectionList: temp,
                isLoading: false
            })
        });
    }

    handleAddRubricClick = (remedyId) => {
        this.props.updatePassedId(5, remedyId);
    };

    renderNewSubsections = () => {
        // const { currentPage, pageSize, searchQuery } = this.state;
        const { Intensities } = this.props.intensity;

        // Apply search filtering
        // let filteredSubsectionList = this.state.NewSubsectionlist;
        // if (searchQuery) {
        //     filteredSubsectionList = this.state.NewSubsectionlist.filter(subSection =>
        //         subSection.subSectionName.toLowerCase().includes(searchQuery.toLowerCase())
        //     );
        // }

        // const paginatedSubsections = filteredSubsectionList.slice(
        //     (currentPage - 1) * pageSize,
        //     currentPage * pageSize
        // );

        // if (this.state.NewSubsectionlist.resultObject?.length === 0) {
        //     return (
        //         <tr>
        //             <td colSpan={2}>
        //                 <Alert color="danger">No matching subsections found.</Alert>
        //             </td>
        //         </tr>
        //     );
        // }

        return this.state.SubSectionList?.resultObject?.map((subSection, index) => (
            <tr className="rubric" key={subSection.subSectionId}>
                <td onClick={() => this.RemedyDetailsByID(subSection.subSectionId)}>
                    <span className='subsect'>{subSection.subSectionName}</span>
                    {
                        Intensities.map((intensity, index) => {
                            let id = `${subSection.subSectionId}${intensity.intensityNo}`;
                            return (
                                <button
                                    className="btn-clipboard"
                                    id={`${subSection.subSectionId}${intensity.intensityNo}`}
                                    style={{ backgroundColor: id === this.state.id ? "green" : "" }}
                                    onClick={() => this.selectRubrics(subSection, intensity.intensityNo, id)}
                                >
                                    {intensity.intensityNo}
                                </button>
                            );
                        })
                    }
                </td>
            </tr>
        ));
    }

    renderPagination = () => {
        const totalRecords = this.state.SubSectionList?.totalCount;
        // const { currentPage, pageSize } = this.state;

        return totalRecords > 25 && (
            <Pagination
                itemClass="page-item"
                linkClass="page-link"
                activePage={this.state.currentPage}
                itemsCountPerPage={this.state.pageSize}
                totalItemsCount={totalRecords}
                pageRangeDisplayed={5}
                // onChange={(pageNumber) => {
                //     this.setState({ currentPage: pageNumber });
                // }}
                onChange={(pageNumber) => { this.GetSubSection(pageNumber, this.state.searchQuery2 == '' ? this.state.searchQuery : this.state.searchQuery2, this.state.SelectedSectionId) }}
            />
        );
    }

    ToggleAuthorAlias() {
        this.setState((prevState) => ({
            ShowAuthorAlias: !prevState.ShowAuthorAlias
        }));
    }

    ToggleAuthorInformation() {
        this.setState((prevState) => ({
            showInfoIcon: !prevState.showInfoIcon
        }));
    }

    handleChangeSubSection(e) {
        debugger
        // this.setState({ [e.target.name]: e.target.value });
        // if (e.target.value != undefined) {
        //     this.searchSubsections(e.target.value)
        // }

        this.setState({
            searchQuery2: e.target.value,
            // SubSectionList: []
        })
        // if(e.target.value=="")
        // {
        // this.state.SelectedSectionId=0
        // this.state.SubSectionList=[]
        // }

        this.GetSubSection(1, e.target.value, this.state.SelectedSectionId)
    }
};

const mapStateToProps = (state) => ({
    state: state.rubrics,
    intensity: state.intensity,
});


const mapDispatchToProps = {
    getSections,
    getBodyPartsBySection,
    getSubSectionsByBodyPart,
    searchSubSections,
    addRubrics,
    getIntensities,
    getRemedyCounts,
    getRemedyName,
    snackAlert,
    enqueueSnackbarAction
}
export default connect(mapStateToProps, mapDispatchToProps)(SummaryComponent)