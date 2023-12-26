import React from 'react';
import { Link } from 'react-router-dom';
import CommonServices from '../../Services/CommonServices';
import { enqueueSnackbar as snackAlert } from "../../store/actions/notification";
import {
    Card,
    TabPane,
    CardBody,
    CardHeader,
    Col,
    Progress,
    Row,
    Table,
    Input,
    FormGroup,
    Label,
    CardText,
    Button,
    Alert

} from 'reactstrap';
import { connect } from "react-redux";
import {
    addRubrics, deleteRubrics
} from "../../store/actions/FindRubricsAction";
import { size } from 'lodash';
import { getIntensities } from "../../store/actions/IntensityAction"

require('./styles.css');
class ClipboardComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            switchSort: false,
            SelectedRecordList:[],
            tableData: this.props.state.selectedRubrics,
            RemedyData: this.props.state.selectedRubrics,
            SelectedRecordListforremedy:'',
            modelEx:[],

        }
        this.compareByDesc = this.compareByDesc.bind(this);
        this.submitForm = this.submitForm.bind(this);

        console.log('tableData===> ', this.state.tableData)
    };

    async componentDidMount() {
        var Id = this.props.match.params.id;
        var caseId = this.props.match.params.caseId;

        this.setState({
            ...this.state,
            patientId: Id,
            caseId: caseId

        })
        debugger;
        this.ToSelect();
        await this.props.getIntensities();
        // this.handleAccordionClick(Id);
    }
    async handleAccordionClick(patientId) {

        var result = await CommonServices.getDataById(patientId, `/clipboardRubrics/GetClipboardRubricsPatientId`);
        this.setState({
            subSectionList: result,
        });

        if (result != null) {
            result.map((rubric, index) => {
                // this.setState({
                //     ...this.state,
                //     id

                // });

                const { selectedRubrics } = this.props.state;//subSectionId
                const isExist = selectedRubrics.indexOf(rubric)
                rubric.intensity = rubric.intensity;
                const remedyCount = rubric.remedyCount;
                rubric.remedyCountForSort = remedyCount.remedyCount;

                rubric.remedyName = rubric.remedyModels;
                rubric.subSectionName = rubric.subSectionName;

                if (isExist != 0) {
                    //const { remedyCount } = this.props.state;

                    rubric.remedyCount = remedyCount.remedyCount;
                    this.props.addRubrics(rubric)

                }
            });
        }

    }
    handleSort(key) {

        this.setState({
            switchSort: !this.state.switchSort
        })
        let copyTableData = [...this.state.tableData];
        copyTableData.sort(this.compareByDesc(key));
        this.setState({
            tableData: copyTableData
        })


    }

    compareByDesc(key) {

        if (this.state.switchSort) {
            return function (a, b) {
                if (a[key] < b[key]) return -1; // check for value if the second value is bigger then first return -1
                if (a[key] > b[key]) return 1;  //check for value if the second value is bigger then first return 1
                return 0;
            };
        } else {
            return function (a, b) {
                if (a[key] > b[key]) return -1;
                if (a[key] < b[key]) return 1;
                return 0;
            };
        }
    }
    /**
     * render methods
     */

    /**
     * render selected rubrics
     */
    renderRubrics() {

        const selectedRubrics = this.state.tableData.filter((v, i, a) => a.findIndex(t => (t.subSectionId === v.subSectionId)) === i);;
     
        if (!selectedRubrics.length) {
            return (<tr><td colSpan={5}><Alert color="danger"> Rubrics not selected.</Alert></td></tr>)
        }
        const { Intensities } = this.props.intensity;
        return selectedRubrics.map((rubric, index) => {
            return (
                <tr className="rubric" key={rubric.subSectionId} >
                    <td>{index + 1}</td>
                    <td key={rubric.subSectionId} >
                        <Label> {rubric.subSectionName}
                        </Label>

                    </td>
                    <td>
                        <Label className="pull-right"> {rubric.intensity}
                        </Label>
                        {
                            Intensities.map((intensity, index) => {
                                let id = `${rubric.subSectionId}${intensity.intensityNo}`;
                                return (
                                    <button
                                        className="btn-clipboard" id={`${rubric.subSectionId}${intensity.intensityNo}`}
                                        style={{ backgroundColor: id == this.state.id ? "green" : "" }}
                                        onClick={() => this.updateIntensity(rubric.subSectionId, intensity.intensityNo)}
                                    >
                                        {intensity.intensityNo}


                                    </button>
                                )
                            })
                        }
                    </td>
                    <td>
                        <Label className="pull-right"> {rubric.remedyCount.remedyCount}
                        </Label>

                    </td>
                    <td>
                        <Button className="btn btn-danger"
                            onClick={(e) => this.handleRubricDelete(rubric.subSectionId)}
                        ><i class="fa fa-trash"></i></Button>
                    </td>
                </tr>
            )
        });
    }
    AddRemedyNames = () => {

        const arr = [];
        const RemedyList = [];
        let RemedyListCount = [];
        let RemedyListGrade = [];
        let RemedyListIntensity = [];
        let RemedyListFinal = [];
        const selectedRemedy = this.state.RemedyData;
        let sortedRemedyList = [];

        selectedRemedy.map((rubric, index) => {
            const selectedRemedyNames = rubric.remedyName.filter((v, i, a) => a.findIndex(t => (t.remedyId === v.remedyId)) === i);
        //    debugger
            console.log('selectedRemedyNames======+++++',selectedRemedyNames)
            selectedRemedyNames.map((remedy, index) => {
                (
                    arr.push({ type: remedy.remedyName,remedyId:remedy.remedyId, remedyAlias: remedy.remedyAlias, intensity: rubric.intensity, gradeNo: remedy.gradeNo, total: rubric.intensity * remedy.gradeNo })
                )
            });
        });
        console.log('arr======+++++',arr)
        arr.map((remedy, index) => {
            (
                RemedyList.push({
                    type: remedy.type, remedyId:remedy.remedyId, remedyAlias: remedy.remedyAlias,  intensity:
                        arr
                            .filter((e) => e.type === remedy.type)
                            .reduce((inten, e) => inten + e.intensity, 0),
                    count: arr.map(x => x.type).filter(item => item === remedy.type).length,
                    grade: arr
                        .filter((e) => e.type === remedy.type)
                        .reduce((grd, e) => grd + e.gradeNo, 0),

                    final: arr
                        .filter((e) => e.type === remedy.type)
                        .reduce((inten, e) => inten + e.total, 0),
                })
            )
        });
        debugger
        console.log('RemedyList last',RemedyList)
        RemedyListCount = [...RemedyList].sort(function (a, b) {
            return parseInt(b.count) - parseInt(a.count);
        });
        console.log('countSorted last',RemedyListCount)

        RemedyListGrade =  [...RemedyList].sort(function (a, b) {
            return parseInt(b.grade) - parseInt(a.grade);
        })
        console.log('gradeSorted last',RemedyListGrade)

        RemedyListIntensity =  [...RemedyList].sort(function (a, b) {
            return parseInt(b.intensity) - parseInt(a.intensity);
        })
        console.log('intensitySorted last',RemedyListIntensity)

        RemedyListFinal =  [...RemedyList].sort(function (a, b) {
            return parseInt(b.final) - parseInt(a.final);
        });
        // console.log('countSorted======+++++',countSorted)
        console.log('finalSorted last',RemedyListFinal)
        // console.log('finalSorted last',finalSorted)

        console.log('RemedyList last====t',RemedyList)
        
        RemedyList.map((item, index) => {

            let maxIndex = RemedyListCount.findIndex(x => x.type === item.type) + 1 + RemedyListGrade.findIndex(x => x.type === item.type) + 1 + RemedyListIntensity.findIndex(x => x.type === item.type) + 1
                + RemedyListFinal.findIndex(x => x.type === item.type) + 1;
            sortedRemedyList.push({
                item,
                maxIndex
            })
        });
        debugger
        // console.log('maxIndex',maxIndex)
        console.log('sortedRemedyList---------=====================',sortedRemedyList)
        return sortedRemedyList.sort(function (a, b) {
            return parseInt(a.maxIndex) - parseInt(b.maxIndex);
        });;
    }

    // renderRemedyNames() {
    //     const selectedRubrics = this.AddRemedyNames().filter((v, i, a) => a.findIndex(t => (t.item.type === v.item.type)) === i);

    //     if (selectedRubrics.length < 5) {
    //         return (<tr><td colSpan={4}><Alert color="danger"> Rubrics not selected or Add minimun 5 rubric</Alert></td></tr>)
    //     }
    //     else {

    //         return selectedRubrics.map((remedy, index) => {
    //             return (
    //                 <tr>

    //                     <td>
    //                         <Label className="pull-left"> {remedy.item.type}
    //                         </Label>
    //                     </td>
    //                     {/* <td>
    //                                     <Label className="pull-left">
    //                                         {remedy.remedyAlias}
    //                                     </Label>
    //                                 </td> */}
    //                     {/* <td>
    //                         <Label className="pull-left">
    //                             {remedy.item.count}
    //                         </Label>
    //                     </td>
    //                     <td>
    //                         <Label className="pull-left">
    //                             {remedy.item.intensity}
    //                         </Label>
    //                     </td>
    //                     <td>
    //                         <Label className="pull-left">
    //                             {remedy.item.grade}
    //                         </Label>
    //                     </td>
    //                     <td>
    //                         <Label className="pull-left">
    //                             {remedy.item.final}
    //                         </Label>
    //                     </td> */}
    //                     <td>
    //                         <Label className="pull-right">
    //                             {remedy.maxIndex}
    //                         </Label>
    //                     </td>
    //                     <td>
    //                         <Progress key={index} color="primary" value={(1000 - (remedy.maxIndex)) / 10} style={{ height: '21px', bordered: '0.15rem' }} />
    //                     </td>
    //                 </tr>
    //             )
    //         });

    //     }
    // }

    renderSelectedRecords() {
        const SelectedRecordList = this.AddRemedyNames().filter((v, i, a) => a.findIndex(t => (t.item.type === v.item.type)) === i);
        this.state.SelectedRecordListforremedy=SelectedRecordList
        debugger
       console.log('SelectedRecordListforremedy====',SelectedRecordList)
        if (SelectedRecordList.length < 5) {
            return (<tr><td colSpan={4}><Alert color="danger"> Rubrics not selected or Add minimun 5 rubric</Alert></td></tr>)
        }
        else {

            return SelectedRecordList.map((remedy, index) => {
                return (
                    <tr>

                        <td>
                            <Label className="pull-left"> {remedy.item.type}
                            </Label>
                        </td>
                        {/* <td>
                                        <Label className="pull-left">
                                            {remedy.remedyAlias}
                                        </Label>
                                    </td> */}
                        {/* <td>
                            <Label className="pull-left">
                                {remedy.item.count}
                            </Label>
                        </td>
                        <td>
                            <Label className="pull-left">
                                {remedy.item.intensity}
                            </Label>
                        </td>
                        <td>
                            <Label className="pull-left">
                                {remedy.item.grade}
                            </Label>
                        </td>
                        <td>
                            <Label className="pull-left">
                                {remedy.item.final}
                            </Label>
                        </td> */}
                        <td>
                            <Label className="pull-right">
                                {remedy.maxIndex}
                            </Label>
                        </td>
                        <td>
                            <Progress key={index} color="primary" value={(1000 - (remedy.maxIndex)) / 10} style={{ height: '21px', bordered: '0.15rem' }} />
                        </td>
                    </tr>
                )
            });

        }
    }


    handleRubricDelete = subSectionId => {
        let deleteItemIndex = this.state.tableData.findIndex(x => x.subSectionId === subSectionId);
        let RemedyData = this.state.RemedyData;
        this.setState({
            ...this.state,
            RemedyData: this.state.RemedyData.filter(x => x.subSectionId !== subSectionId),
            tableData: this.state.tableData.filter(x => x.subSectionId !== subSectionId)
        })
    }
    updateIntensity = (subSectionId, intensityNo) => {
        let updateIntensity = this.state.tableData.map(item =>
            item.subSectionId === subSectionId ? { ...item, intensity: intensityNo } : item
        );

        let updatedRemedyData = this.state.RemedyData.map(item =>
            item.subSectionId === subSectionId ? { ...item, intensity: intensityNo } : item
        );

        this.setState({
            ...this.state,
            tableData: updateIntensity,
            RemedyData: updatedRemedyData
        })
    }


    render() {
        const { currentSort } = this.state;
        return (
            <Row>
                <Col sm="12" md="7">
                    <Card>
                        <CardHeader >
                            <CardText >
                                <Row >
                                    <Col>
                                        Selected Rubrics
                                    </Col>
                                    <Col style={{ textAlign: "right" }}>
                                        <Link to={"/PatientDashboard/" + this.state.patientId + "/" + this.state.caseId+"/"+this.props.match.params.patientAppId+"/"+this.props.match.params.doctorId}>
                                            Add Another Symptoms
                                        </Link>
                                    </Col>
                                </Row>
                            </CardText>

                        </CardHeader>
                        <CardBody>
                            <div responsive="true" style={{ overflowY: 'scroll', height: '600px' }}>
                                <Table responsive hover bordered>
                                    <thead>
                                        <tr>
                                            <th>#
                                            </th>
                                            <th >Name
                                                <button className={`fa fa-sort`} id={'subSectionName'} key='subSectionName'
                                                    onClick={(e) => this.handleSort(e.target.id)}></button>
                                            </th >
                                            <th >Intensity
                                                <button className={`fa fa-sort`} id={'intensity'} key='intensity'
                                                    onClick={(e) => this.handleSort(e.target.id)}></button>
                                            </th >
                                            <th>
                                                Remedy Count
                                                <button className={`fa fa-sort`} id={'remedyCountForSort'} key='remedyCountForSort'
                                                    onClick={(e) => this.handleSort(e.target.id)}></button>
                                            </th>
                                            <th>

                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            this.renderRubrics()
                                        }
                                    </tbody>
                                </Table>
                            </div>
                        </CardBody>
                    </Card>
                </Col>
                <Col sm="12" md="5">
                    <Card>
                        <CardHeader>
                            <CardText>
                                <Row>
                                    <Col>
                                        Selected Remedies&nbsp;&nbsp;&nbsp;&nbsp;
                                        {/* </Col>
                                    <Col> */}
                                        {/* (<span style={{ fontSize: '12px' }}><b>RC-Remedy Count</b></span>,&nbsp;
                                        <span style={{ fontSize: '12px' }}><b>IS-Intensity Sum</b></span>,&nbsp;
                                        <span style={{ fontSize: '12px' }}><b>GS-Grade Sum</b></span>,&nbsp;
                                        <span style={{ fontSize: '12px' }}><b>DM-Degree Multiplies</b></span>) */}
                                    </Col>
                                    <Button
                                        type="button"
                                        style={{ textTransform: "uppercase" }}
                                        onClick={this.submitForm}
                                        size="sm" color="primary">
                                        <i className="fa fa-save"></i> Save
                                    </Button>
                                </Row>
                            </CardText>

                        </CardHeader>
                        <CardBody>
                            <div responsive="true" style={{ overflowY: 'scroll', height: '600px' }}>
                                <Table responsive hover bordered>
                                    <thead>
                                        <tr>
                                            <th>
                                                Remedy Name
                                            </th>
                                            {/* <th>
                                                 Remedy Alias
                                             </th> */}
                                            {/* <th>
                                                RC
                                            </th>
                                            <th>
                                                IS
                                            </th>
                                            <th>
                                                GS
                                            </th>
                                            <th>
                                                DM
                                            </th> */}
                                            <th>
                                                Index
                                            </th>
                                            <th>
                                                Index Bar
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            //this.renderRemedyNames()
                                            this.renderSelectedRecords()
                                        }
                                    </tbody>
                                </Table>
                            </div>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        )
    }

    updatestatus(){
        debugger;
        var status = {
            "userId": localStorage.getItem("UserId"),
         
            "patientAppId": parseInt(this.props.match.params.patientAppId),
            "patientId":parseInt(this.state.patientId),
            "status": "Completed",
            "deleteStatus": "false",
            "doctorId": parseInt(this.props.match.params.doctorId),
            "caseId":  parseInt(this.state.caseId)

        }
        CommonServices.postData(status, `/patientApp`).then((responseMessage) => {
            this.props.snackAlert();
            this.props.history.push("/DoctorDashboard");
            this.props.deleteRubrics([])
        });
        this.setState({
            patientAppId: 0,
            PatientId: '',
            DoctorId: '',
            AppointmentDate: '',
            AppointmentTime: '',
            Status: 'Waiting',
            UserId: localStorage.getItem("UserId"),
            DeleteStatus: false
        });
    }  


    submitForm() {
       // debugger;
        let copyTableData = [...this.state.tableData];
        // debugger;
        // console.log('this.state.tableData=====>>>>>>',this.state.tableData)
        let Remedyindex = [...this.state.SelectedRecordListforremedy];
        let array = []
        copyTableData.forEach(element => {
            //debugger;
            let obj = {
                "caseDetailId": 0,
                "caseId": parseInt(this.state.caseId),
                "subsectionId": element.subSectionId,
                "intensityId": element.intensity,
                "remedyCount": element.remedyCountForSort,
               modelEx:this.state.modelEx
            }
            array.push(obj)
        });
        //array.push( {modelEx:this.state.modelEx})


       
        debugger;
        Remedyindex.forEach(element => {
           
            debugger;
            let obj = {
                "remedyId": element.item.remedyId,
                "remedyIndex": element.maxIndex
            }
            this.state.modelEx.push(obj)
        });
       // array.push( this.state.modelEx)
        debugger
        console.log('arrayforsubmit====',array)






        CommonServices.postData(array, `/CaseDetails`).then((responseMessage) => {       
        });
        this.updatestatus();
        this.setState({
            patientAppId: 0,
            PatientId: '',
            DoctorId: '',
            AppointmentDate: '',
            AppointmentTime: '',
            Status: '',
            tableData: [],
            RemedyData: [],
            DeleteStatus: false
        });
    }


    ToSelect() {
        debugger;
        let copyTableData = [...this.state.tableData];
        debugger;
        console.log('this.state.tableData=====>>>>>>', this.state.tableData)

        let array = []
        copyTableData.forEach(element => {
            debugger;
            let obj = {
                
                "subsectionId": element.subSectionId,
                "intensity": element.intensity,
                
            }
            array.push(obj)
        });


        CommonServices.postData(array, `/clipboardRubrics/GetRubricsDetailsBySubsectionId`).then((temp) => {
            debugger;
            this.setState({
           
                SelectedRecordList:temp
            });
        });
        
       
    }


}

const mapStateToProps = (state) => ({
    state: state.rubrics,
    intensity: state.intensity
});
const mapDispatchToProps = {
    addRubrics,
    deleteRubrics,
    snackAlert,
    getIntensities
}
export default connect(mapStateToProps, mapDispatchToProps)(ClipboardComponent)