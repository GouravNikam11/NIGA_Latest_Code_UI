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
const Prescription = React.lazy(() => import('./PatientComponent/Prescription'))

class PatientDashboard extends React.Component {
    state = {
remedyId: 0,
        activeTab: 4,
        patientId: "",
        caseId: "",
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

            {
                tabId: 6,
                tabName: "Labs & Imaging"
            },

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

    async componentDidMount() {
        this.props.getIntensities();
        store.dispatch({ type: 'SET_CHILD_OPTION', payload: {} });
        store.dispatch({ type: 'SET_PARENT_OPTION', payload: {} });
        this.getQuestionSection();
        var Id = this.props.match.params.id;
        var caseId = this.props.match.params.caseId;
        // console.log('patientDashboard===>>>',this.props)
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
      







    // async getQuestionSection() {
    //     debugger;
    //     CommonServices.getData(`/questionsection`).then(async (temp) => {
    //         console.log('questionsection========', temp)
    //         var copyTableData = temp;
    //         let array = []
    //         let promises = new Promise((resolve, reject) => {
    //             copyTableData.forEach(async (element, index) => {
    //                 debugger;
    //                 console.log('index == ', index);
    //                 console.log('element == ', element);
    //                 let child =await this.navquestiongroup(element.questionSectionId) ;
    //                 console.log('child == ', child);
    //                 let obj = {
    //                     "ID": parseInt(element.questionSectionId),
    //                     "name": element.questionSectionName,
    //                     "icon": 'icon-list',
    //                     "children": child
    //                 }
    //                 array.push(obj);
    //                 console.log('array == ', index === copyTableData.length - 1)
    //                 index === copyTableData.length - 1 && resolve();
    //             });
    //         });
    //         promises.then(() => {
    //             console.log('result === ', array);
    //             let navarray = [{
    //                 "name": "Existance",
    //                 "icon": 'icon-notebook',
    //                 "children": array
    //             }]
    //             console.log('array === ', array)
    //             console.log('navarray === ', navarray)
    //             // navlinks.items = navarray     
    //             store.dispatch({ type: SET_EXISTANCE, existance: [...navarray] })
    //         })
    //     });
    // }
    // navquestiongroup(questionSectionId) {
    //     let res = CommonServices.getDataById(questionSectionId, `/questiongroup/GetQuestionGroupByExistanceId`).then((res) => {
    //         debugger
    //         var copyTableData = res;
    //         let array = []
    //         copyTableData.forEach(element => {
    //             let obj = {
    //                 "ID": element.questionGroupId,
    //                 "name": element.questionGroupName,
    //                 "url": '/PatientDashboard/' + this.state.patientId + "/" + this.state.caseId + "/" + this.props.match.params.patientAppId + "/" + this.props.match.params.doctorId + "/" + questionSectionId + "/" + element.questionGroupId,
    //                 "icon": 'icon-arrow-right',
    //             }
    //             array.push(obj)
    //         });
    //         return array;
    //     });
    //     return res;
    // }







    renderNavigationTabs() {
        const { navigationTabs } = this.state;
        return navigationTabs.map((tab, index) => {
            
            if(index===7){
                 return(
                    <NavLink
                        className={classnames({ active: this.state.activeTab === tab.tabId })}
                        style={{ backgroundColor: "#20a8d8", color: "white" }}
                        onClick={() => { this.toggle(tab.tabId);
                            store.dispatch({ type: 'SET_CHILD_OPTION', payload: {} });
                            store.dispatch({ type: 'SET_PARENT_OPTION', payload: {} }); }} >
                        {tab.tabName} <span className="numbadge1">{this.props.state.selectedRubrics.length}</span>
                    </NavLink>
                 )   
            }
            else if(index===8){
                return(
                   <NavLink
                       className={classnames({ active: this.state.activeTab === tab.tabId })}
                       style={{ backgroundColor: "#268026", color: "white" }}
                       onClick={() => { this.toggle(tab.tabId); 
                        store.dispatch({ type: 'SET_CHILD_OPTION', payload: {} });
         store.dispatch({ type: 'SET_PARENT_OPTION', payload: {} });}} >
                       {tab.tabName} <span className="numbadge1">11</span>
                   </NavLink>
                )   
            }
            else if(index===9){
                return(
                   <NavLink
                       className={classnames({ active: this.state.activeTab === tab.tabId })}
                       style={{ backgroundColor: "#c3b20a", color: "white" }}
                       onClick={() => { this.toggle(tab.tabId); 
                        store.dispatch({ type: 'SET_CHILD_OPTION', payload: {} });
                        store.dispatch({ type: 'SET_PARENT_OPTION', payload: {} });}} >
                       {tab.tabName} <span className="numbadge1">07</span>
                   </NavLink>
                )   
            }
            else if(index===10){
                return(
                   <NavLink
                       className={classnames({ active: this.state.activeTab === tab.tabId })}
                       style={{ backgroundColor: "#224285", color: "white" }}
                       onClick={() => { this.toggle(tab.tabId); 
                        store.dispatch({ type: 'SET_CHILD_OPTION', payload: {} });
                        store.dispatch({ type: 'SET_PARENT_OPTION', payload: {} });}} >
                       {tab.tabName} 
                      
                   </NavLink>
                   
                )   
            }
            else{

            

            return (

                

                <NavItem key={index}>
                    

                    <NavLink
                        className={classnames({ active: this.state.activeTab === tab.tabId })}
                        style={{ backgroundColor: this.state.activeTab === tab.tabId ? "#ddd" : "#fff" }}
                        onClick={() => { this.toggle(tab.tabId); 
                            store.dispatch({ type: 'SET_CHILD_OPTION', payload: {} });
                            store.dispatch({ type: 'SET_PARENT_OPTION', payload: {} });}} >
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
                <TabContent activeTab={this.state.activeTab} style={{ backgroundColor: "#f5f5f5" }} >
                    <React.Suspense fallback={<Spinner style={{ marginLeft: "50%" }} size="md" color="primary" />} >
                        <Reportary updatePassedId={this.updatePassedId} patientId={this.state.patientId} caseId={this.state.caseId} doctorId={this.props.match.params.doctorId} patientAppId={this.props.match.params.patientAppId} />
                        <Question patientId={this.props.match.params.id} caseId={this.props.match.params.caseId} doctorId={this.props.match.params.doctorId} patientAppId={this.props.match.params.patientAppId} />
                        <ClinicalPattern updatePassedId={this.updatePassedId} />
                        <MateriaMedica remedyIdToMM={this.state.remedyId} />
                        <AdverseEffect />
                        <Repertorize updatePassedId={this.updatePassedId} />
                        <LabsAndImaging patientId={this.props.match.params.id} caseId={this.state.caseId} />
                        <Prescription patientId={this.state.patientId} caseId={this.state.caseId} doctorId={this.props.match.params.doctorId} patientAppId={this.props.match.params.patientAppId} />
                    </React.Suspense>
                </TabContent>
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

const mapStateToProps = (state) => ({
    patient: state.patient.patient,
    state: state.rubrics,
});

const mapDispatchToProps = {
    getPatient,
    addRubrics,
getIntensities
}

export default connect(mapStateToProps, mapDispatchToProps)(PatientDashboard)

