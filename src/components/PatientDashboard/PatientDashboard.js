import React from 'react';
import {
    TabContent, Nav, NavItem, NavLink, Card, CardTitle, CardText,
} from 'reactstrap';
import classnames from 'classnames';
import { connect } from "react-redux"
import { Spinner } from 'reactstrap';
import { SET_EXISTANCE } from '../../store/actions/types';
import CommonServices from '../../Services/CommonServices';
import store from '../../store'
// import PatientDashHeder from './PatientComponent/PatientDashHeder';
// const PatientDashHeder = React.lazy(() => import('./PatientComponent/PatientDashHeder'));
import { getPatient } from '../../store/actions/Patient';
import { result } from 'lodash';
import {
    addRubrics
} from "../../store/actions/FindRubricsAction";
import { getIntensities } from "../../store/actions/IntensityAction"


require('./styles.css');
const PatientDashHeder = React.lazy(() => import('./PatientComponent/PatientDashHeder'));
const Question = React.lazy(() => import('./PatientComponent/Question'));
const MateriaMedica = React.lazy(() => import('./PatientComponent/MateriaMedica'));
const LabsAndImaging = React.lazy(() => import('./PatientComponent/LabsAndImaging'));
const Reportary = React.lazy(() => import('./PatientComponent/Reportary'));
const ClinicalPattern = React.lazy(() => import('./PatientComponent/ClinicalPattern'));
const AdverseEffect = React.lazy(() => import('./PatientComponent/AdverseEffect'));
const Repertorize = React.lazy(() => import('./PatientComponent/Repertorize'));
const Prescription = React.lazy(() => import('./PatientComponent/Prescription'));
const AddAppointmentHistoryNotes = React.lazy(() => import('../AppointmentHistoryNotes/AddAppointmentHistoryNotes'))
const PatientBackHistory = React.lazy(() => import('./PatientComponent/PatientBackHistory'));

class PatientDashboard extends React.Component {
    state = {
        remedyId: 0,
        activeTab: 4,
        patientId: "",
        caseId: "",
        previousFU:0,
        PatientBackHostory:[],
        navigationTabs: [
            {
                tabId: 1,
                tabName: "Question"
            },
            {
                tabId: 2,
                tabName: " Clinical Pattern"
            },
            {
                tabId: 3,
                tabName: "Deep Analytics"
            },
            {
                tabId: 4,
                tabName: "Repertory"
            },
            {
                tabId: 5,
                tabName: "Materia Medica"
            },

            /*  {
                 tabId: 6,   
                 tabName: "Labs & Imaging"
             }, */

            {
                tabId: 7,
                tabName: "Adverse Effect"
            },

            {
                tabId: 8,
                tabName: "Repetorize",
            },

            // {
            //     tabId: 9,
            //     tabName: "Extra Clipboard "
            // },

            {
                tabId: 10,
                tabName: "Previous F/U"
            },

            {
                tabId: 11,
                tabName: "Prescription"
            },

        ]
    }


    updatePassedId = (id, remedyId) => {
        debugger
        if (id != undefined || id != '') {
            this.setState({
                activeTab: id,
                remedyId: remedyId
            });
        }
    };



    UpdatePatientDashboard = (id) => {
        // this.props.history.push({
        //     pathname: '/PatientDashboard/' + patientId + '/' + caseId + '/' + patientAppId + '/' + doctorId,
        //     state: {
        //         selectedRubrics: this.props.state.selectedRubrics,
        //         TabIdFromPatientHistory: id
        //     },
        // });
        this.setState({
            activeTab: id,
           
        });
    };

    async componentDidMount() {
        this.props.getIntensities();
        store.dispatch({ type: 'SET_CHILD_OPTION', payload: {} });
        store.dispatch({ type: 'SET_PARENT_OPTION', payload: {} });
        this.getQuestionSection();
        var Id = this.props.match.params.id;
        var caseId = this.props.match.params.caseId;
         //console.log('patientAppId===>>>',this.props.match.params.patientAppId)
        this.setState({
            patientId: Id,
            caseId: caseId,
        })
        await this.props.getPatient(Id, caseId, this.props.match.params.doctorId, this.props.match.params.patientAppId);
        debugger
        const { TabIdFromPatientHistory } = this.props.location.state || {};
        const { TabIdFromPatientHistoryforprec } = this.props.location.state || {};
        console.log("TabIdFromPatientHistory", TabIdFromPatientHistory)

        if (TabIdFromPatientHistory != undefined) {
            // this.props.getIntensities();

            this.state.activeTab = TabIdFromPatientHistory
            const { selectedRubrics } = this.props.location.state || {};
            console.log("selectedRubrics after PD", selectedRubrics)
            this.props.state.selectedRubrics = selectedRubrics
        }
        if (TabIdFromPatientHistoryforprec != undefined) {
            this.state.activeTab = TabIdFromPatientHistoryforprec
        }

        console.log("selectedRubrics after patient", this.props)
        console.log("selectedRubrics after patient", this.props.state.selectedRubrics)
        // this.props.state.selectedRubrics=selectedRubrics
        this.GetPatientBackHostoryById(Id);

    }

    GetPatientBackHostoryById(Id) {
        debugger;
        if (Id != undefined) {
            CommonServices.getDataById(Id, `/CaseDetails/GetPatientBackHostoryById`).then((res) => {
                debugger
                console.log("for ids PatientBackHostory", res)

                this.setState({
                    PatientBackHostory: res,
                    previousFU:res.length
                });
            });
        }
    }

    componentDidUpdate() {
        this.props.getIntensities();
    }

    async getQuestionSection() {
        debugger;
        const temp = await CommonServices.getData(`/questionsection`);
        console.log('questionsection========', temp);
        const copyTableData = temp;
        const array = [];

        for (let index = 0; index < copyTableData.length; index++) {
            debugger;
            const element = copyTableData[index];
            console.log('index == ', index);
            console.log('element == ', element);
            const child = await this.navquestiongroup(element.questionSectionId);
            console.log('child == ', child);
            const obj = {
                "ID": parseInt(element.questionSectionId),
                "name": element.questionSectionName,
                "icon": 'icon-list',
                "children": child
            };
            array.push(obj);
            console.log('array == ', index === copyTableData.length - 1);
        }

        console.log('result === ', array);
        const navarray = [{
            "name": "Existance",
            "icon": 'icon-notebook',
            "children": array
        }];
        console.log('array === ', array);
        console.log('navarray === ', navarray);
        store.dispatch({ type: SET_EXISTANCE, existance: [...array] });
    }

    async navquestiongroup(questionSectionId) {

        const res = await CommonServices.getDataById(questionSectionId, `/questiongroup/GetQuestionGroupByExistanceId`);
        debugger;
        const copyTableData = res;
        const array = [];

        copyTableData.forEach(element => {
            const obj = {
                "ID": element.questionGroupId,
                "name": element.questionGroupName,
                "url": `/PatientDashboard/${this.state.patientId}/${this.state.caseId}/${this.props.match.params.patientAppId}/${this.props.match.params.doctorId}/${questionSectionId}/${element.questionGroupId}`,
                "icon": 'icon-arrow-right',
            };
            array.push(obj);
        });

        return array;
    }


    renderNavigationTabs() {
        const { navigationTabs } = this.state;
        return navigationTabs.map((tab, index) => {

            // if(index===1){
            //     store.dispatch({ type: 'HIDE_SHOW_SIDE_BAR', payload: !this.props.ishideshowsidebar })
            // }
            
            
          if (index === 6) {
                return (
                    <NavLink
                        className={classnames({ active: this.state.activeTab === tab.tabId })}
                        style={{ background: "radial-gradient(#b7b7b7, #676767)", color: "white", position:"absolute", right:"232px"}}
                        onClick={() => {
                            this.toggle(tab.tabId);
                            store.dispatch({ type: 'SET_CHILD_OPTION', payload: {} });
                            store.dispatch({ type: 'SET_PARENT_OPTION', payload: {} });
                            store.dispatch({ type: 'SHOW_LAB_IMAGING', payload: false });
                            store.dispatch({ type: 'SHOW_ADD_APPOINTMENT', payload: false });
                        }} >
                        &nbsp;&nbsp;<i className="fa fa-line-chart"></i>&nbsp;&nbsp;{tab.tabName} <span className="numbadge1">{this.props.state.selectedRubrics.length}</span>
                    </NavLink>
                )
            }
            else if (index === 7) {
                return (
                    <NavLink
                        className={classnames({ active: this.state.activeTab === tab.tabId })}
                        style={{ background: "radial-gradient(#b7b7b7, #676767)", color: "white", position:"absolute", right:"116px", }}
                        onClick={() => {
                            this.toggle(tab.tabId);
                            store.dispatch({ type: 'SET_CHILD_OPTION', payload: {} });
                            store.dispatch({ type: 'SET_PARENT_OPTION', payload: {} });
                            store.dispatch({ type: 'SHOW_LAB_IMAGING', payload: false });
                            store.dispatch({ type: 'SHOW_ADD_APPOINTMENT', payload: false });
                        }} >
                        &nbsp;&nbsp;<i className="fa fa-repeat"></i>&nbsp;&nbsp;{tab.tabName} <span className="numbadge1">{this.state.previousFU}</span>
                    </NavLink>
                )
            }
            else if (index === 8) {
                return (
                    <NavLink
                        className={classnames({ active: this.state.activeTab === tab.tabId })}
                        style={{ background: "radial-gradient(#b7b7b7, #676767)", color: "white", position:"absolute", right:"4px" }}
                        onClick={() => {
                            this.toggle(tab.tabId);
                            store.dispatch({ type: 'SET_CHILD_OPTION', payload: {} });
                            store.dispatch({ type: 'SET_PARENT_OPTION', payload: {} });
                            store.dispatch({ type: 'SHOW_LAB_IMAGING', payload: false });
                            store.dispatch({ type: 'SHOW_ADD_APPOINTMENT', payload: false });
                        }} >
                        &nbsp;&nbsp;<i className="fa fa-file-text-o"></i>&nbsp;&nbsp;{tab.tabName} <span className="numbadge1">07</span>
                    </NavLink>
                )
            }
            else if (index === 10) {
                return (
                    <NavLink
                        className={classnames({ active: this.state.activeTab === tab.tabId })}
                        style={{ background: "radial-gradient(#b7b7b7, #676767)", color: "white"}}
                        onClick={() => {
                            this.toggle(tab.tabId);
                            store.dispatch({ type: 'SET_CHILD_OPTION', payload: {} });
                            store.dispatch({ type: 'SET_PARENT_OPTION', payload: {} });
                            store.dispatch({ type: 'SHOW_LAB_IMAGING', payload: false });
                            store.dispatch({ type: 'SHOW_ADD_APPOINTMENT', payload: false });
                        }} >
                        {tab.tabName}

                    </NavLink>

                )
            }
            else {



                return (
                    <NavItem key={index}>
                        <NavLink
                            className={this.props.showLabAndImaging || this.props.showAddAppointment ? classnames({ active: false }) : classnames({ active: this.state.activeTab === tab.tabId })}
                            style={this.props.showLabAndImaging || this.props.showAddAppointment ? { backgroundColor: "#fff" } : { backgroundColor: this.state.activeTab === tab.tabId ? "#20a8d8" : "#fff" }}
                            onClick={() => {
                                this.toggle(tab.tabId);
                                store.dispatch({ type: 'SET_CHILD_OPTION', payload: {} });
                                store.dispatch({ type: 'SET_PARENT_OPTION', payload: {} });
                                store.dispatch({ type: 'SHOW_LAB_IMAGING', payload: false });
                                store.dispatch({ type: 'SHOW_ADD_APPOINTMENT', payload: false });
                                if(tab.tabId ===1){
                                    document.body.classList.add('sidebar-lg-show');
                                    store.dispatch({ type: 'HIDE_SHOW_SIDE_BAR', payload: true })
                                }else{
                                    document.body.classList.remove('sidebar-lg-show');
                                    store.dispatch({ type: 'HIDE_SHOW_SIDE_BAR', payload: false })
                                }
                                
                            }} >
                            {tab.tabName}
                        </NavLink>

                    </NavItem>
                )
            }
        });
    }



    render() {
        return (
            <div >
                <React.Suspense fallback={<Spinner style={{ marginLeft: "50%" }} size="md" color="primary" />}>
                    <PatientDashHeder patient={this.props.patient} />
                </React.Suspense>
                <Nav tabs>
                    {this.renderNavigationTabs()}
                </Nav>

                {this.props.showLabAndImaging ?
                    <React.Suspense fallback={<Spinner style={{ marginLeft: "50%" }} size="md" color="primary" />} >
                        <LabsAndImaging patientId={this.props.match.params.id} caseId={this.state.caseId} />
                    </React.Suspense> :
                    this.props.showAddAppointment ?
                        <React.Suspense fallback={<Spinner style={{ marginLeft: "50%" }} size="md" color="primary" />} >
                            <AddAppointmentHistoryNotes appointmentId={this.props.match.params.patientAppId} history={this.props.history}/>
                        </React.Suspense> :
                        <TabContent activeTab={this.state.activeTab} style={{ backgroundColor: "#f5f5f5" }} >
                            <React.Suspense fallback={<Spinner style={{ marginLeft: "50%" }} size="md" color="primary" />} >
                                <Reportary updatePassedId={this.updatePassedId} patientId={this.state.patientId} caseId={this.state.caseId} doctorId={this.props.match.params.doctorId} patientAppId={this.props.match.params.patientAppId} />
                                <Question updatePassedId={this.updatePassedId} patientId={this.props.match.params.id} caseId={this.props.match.params.caseId} doctorId={this.props.match.params.doctorId} patientAppId={this.props.match.params.patientAppId} />
                                <ClinicalPattern updatePassedId={this.updatePassedId} />
                                <MateriaMedica remedyIdToMM={this.state.remedyId} />
                                <AdverseEffect />
                                <Repertorize updatePassedId={this.updatePassedId} />
                                <PatientBackHistory UpdatePatientDashboard={this.UpdatePatientDashboard} patientId={this.state.patientId} patientBackHostory={this.state.PatientBackHostory} history={this.props.history}/>
                                <Prescription patientId={this.state.patientId} caseId={this.state.caseId} doctorId={this.props.match.params.doctorId} patientAppId={this.props.match.params.patientAppId} />
                            </React.Suspense>
                        </TabContent>
                }

            </div>
        )
    }

    toggle = tab => {
        if (this.state.activeTab !== tab) this.setActiveTab(tab);
    }

    setActiveTab(tab) {
        this.setState({
            activeTab: tab
        })
    }
};

const mapStateToProps = (state) => (
    {
        patient: state.patient.patient,
        state: state.rubrics,
        showLabAndImaging: state.patient.showLabAndImaging,
        showAddAppointment: state.patient.showAddAppointment,
        ishideshowsidebar:state.doctor.ishideshowsidebar
    });

const mapDispatchToProps = {
    getPatient,
    addRubrics,
    getIntensities
}

export default connect(mapStateToProps, mapDispatchToProps)(PatientDashboard)

