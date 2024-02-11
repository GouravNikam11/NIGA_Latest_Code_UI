// import React, { Component } from 'react';
// import { Table, Col, FormGroup, Form, Row } from 'react-bootstrap';
// import { Button, Card, CardBody, CardFooter, CardHeader, } from 'reactstrap';
// import Select from 'react-select';
// import {
//     Input, Label, Modal,
//     ModalHeader,
//     ModalBody,
//     ModalFooter,
// } from 'reactstrap';

// import DragSortableList from 'react-drag-sortable';
// import CommonServices from '../../Services/CommonServices';
// import TreeView from '@material-ui/lab/TreeView';
// import TreeItem from '@material-ui/lab/TreeItem';
// import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
// import ChevronRightIcon from '@material-ui/icons/ChevronRight';
// import { makeStyles } from '@material-ui/core/styles';
// import MailIcon from '@material-ui/icons/Mail';
// import { Link } from 'react-router-dom';
// import '../../components/CommanStyle.css';
// import { ClipLoader } from 'react-spinners';
// import engs from '../../assets/eng.png';
// import mart from '../../assets/mar.png';
// /**
//  * Created Date     :   06-01-2020
//  * Purpose          :   Component is used to add clicical questions
//  * Author           :   Chandrashekhar Salagar.
//  */
// export class ListNigaRepertoryComponent extends Component {

//     /**
//      * Constructor to initialize class members.
//      * @param {*} props 
//      */
//     constructor(props) {
//         super(props);
//         this.state = {
//             RemedyAndAuthor: [],
//             OnlySectionList: [],
//             previousnodeIds: [],
//             hasChildrenNodeIds: [],
//             RemedyGradeModel: [],
//             RemedyAndAuthorList: [],
//             englishArray: [],
//             marathiArray: [],
//             GradeId: 0,
//             closedeletenodeId: 0,
//             toggleOrderModel: false,
//             isloding: false,
//             RubricNameForPopUp: '',
//             RemedyCountsList:{},
//             treeNodes: [

//             ]
//         };
//         this.handleChange = this.handleChange.bind(this);
//         this.handleClick = this.handleClick.bind(this);
//         this.treeClicked = this.treeClicked.bind(this);
//     }

//     /**
//      * React component did mount, will execute only once per page load.
//      */
//     componentDidMount() {
//         this.getOnlySections();
//         this.getSections();
//         this.GetAllGrades();
//         // this.getAllClinicalQuestions();
//     }

//     getOnlySections() {
//         debugger;
//         CommonServices.getData(`/mastersAPI/GetSections`).then((temp) => {
//             this.setState({
//                 OnlySectionList: temp,
//                 isddlSearchLoading: false
//             })
//         })
//     }

//     handleChange(event, nodes) {
//         debugger
//         console.log('e===', event)
//         // console.log('enodes==', nodes)

//     }
//     GetAllGrades = () => {
//         CommonServices.getData(`/mastersAPI/GetRemedyGrades`).then((grades) => {
//             this.setState({
//                 RemedyGradeModel: grades,
//             })
//         })
//     }
//     // gradeChange(e) {
//     //     debugger
//     //     this.state.RemedyAndAuthor = this.state.RemedyAndAuthorList
//     //     const gradeId = parseInt(e.target.value)
//     //     if (gradeId > 0) {
//     //         const filteredList = this.state.RemedyAndAuthor.filter(item => item.gradeId === gradeId);
//     //         console.log('updated RemedyAndAuthor==', filteredList)
//     //         this.setState({
//     //             RemedyAndAuthor: filteredList,
//     //             GradeId: parseInt(e.target.value)
//     //         })
//     //     }
//     //     else {
//     //         this.setState({
//     //             RemedyAndAuthor: this.state.RemedyAndAuthor,
//     //             GradeId: 0

//     //         })
//     //     }


//     // }

//     render() {
//         const GradeList = this.state.RemedyGradeModel;
//         return (
//             <Card>
//                 <CardHeader>
//                     <i className="fa fa-align-justify"></i>
//                     Niga Repertory

//                 </CardHeader>
//                 <Row>
//                     <Col xs="12" md="6">
//                         <FormGroup >
//                             <TreeView
//                                 defaultCollapseIcon={<ExpandMoreIcon />}
//                                 defaultExpandIcon={<ChevronRightIcon />}


//                             >
//                                 {this.getTreeItemsFromData(this.state.treeNodes)}
//                             </TreeView>
//                         </FormGroup>
//                     </Col>
//                 </Row>


//                 <Modal isOpen={this.state.toggleOrderModel} size="lg">
//                     <ModalHeader className="mdheader" style={{ display: 'block' }}>
//                         <Row>
//                             <Col xs="8">
//                                 {this.state.RubricNameForPopUp} 
//                                 <br/>
//                                 <span>RemedyCounts: ({this.state.RemedyCountsList.remedyCount})</span>
//                             </Col>
//                             <Col xs="4" className="txtright">
//                                 <div>
//                                     <span className="auth" 
//                                         // onClick={}
//                                     ><i class="fa fa-user" aria-hidden="true"></i></span>
//                                 </div>

//                                 <div class="hover-text1"><span className=""><img src={engs} className="langicon" alt="English"/></span>
//                                     <span class="tooltip-text1 bottom">
//                                         <div style={{ fontSize: '12px' }}>
//                                         {
//                                                         this.state.englishArray.length > 0 ?
//                                                         this.state.englishArray.map((c, index) => {
//                                                         return <tr key={index}>
//                                                             <td>{c.subSectionDetails}</td>
//                                                         </tr>
//                                                         }) :
//                                                         <tr>
//                                                             <td colSpan="4">No data to display</td>
//                                                         </tr>}
//                                         </div>
//                                     </span>
//                                 </div>

//                                 <div class="hover-text2"><span className=""><img src={mart} className="langicon" alt="Marathi"/></span>
//                                     <span class="tooltip-text2 bottom">
//                                         <div style={{ fontSize: '12px' }}>
//                                         {
//                                                         this.state.marathiArray.length > 0 ?
//                                                         this.state.marathiArray.map((c, index) => {
//                                                             return <tr key={index}>
//                                                                 <td>{c.subSectionDetails}</td>
//                                                             </tr>
//                                                         }) :
//                                                         <tr>
//                                                             <td colSpan="4">No data to display</td>
//                                                         </tr>}
//                                         </div>
//                                     </span>
//                                 </div>
//                             </Col>
//                         </Row>

                        
//                     </ModalHeader>


//                     <ModalBody>
//                         <Row>
//                             <Col xs="12">
//                                 {/* <Row>
//                                     <Col md="3" className="mgt-8">
//                                         Select Grade :
//                                     </Col>
//                                     <Col md="6">

//                                         <Input type="select"
//                                             id="GradeId"
//                                             name="GradeId"
//                                             value={this.state.GradeId === null ? '' : this.state.GradeId}
//                                             onChange={this.gradeChange.bind(this)}
//                                         >
//                                             <option value="0">Please select</option>
//                                             {
//                                                 GradeList != undefined ?
//                                                     GradeList.map((Grade, index) => {
//                                                         return <option key={index} value={Grade.gradeId}>{Grade.gradeNo}</option>
//                                                     }) : null
//                                             }
//                                         </Input>
//                                     </Col>
//                                 </Row> */}
//                                 {this.state.isloding === true ?
//                                     <Row className="mgt-10">
//                                         {this.state.RemedyAndAuthor.length > 0 ?
//                                             <Col md="12">

//                                                 {this.state.RemedyAndAuthor.map((item, index) => {
//                                                     return (
//                                                         <span key={index}>
//                                                             {/* <span>{item.gradeNo}  </span> */}
//                                                             {/* {
//                                                                 item.remediesModels.map((author, index) => {
//                                                                     return <span key={index}> */}
//                                                                         <Link
//                                                                             style={{
//                                                                                 fontFamily: item.fontName,
//                                                                                 color: item.fontColor,
//                                                                                 fontStyle: item.fontStyle,
//                                                                             }}
//                                                                             to={"/ListNigaRepertoryAuthorAndRemedyDetailsComponent/" + item.authorId + "/" + item.remedyId + "/" + item.remedyName + "/" + item.remedyAlias}>
//                                                                             <span>
//                                                                                 {item.remedyAlias} ({item.authorAlias}), </span> </Link>
//                                                                     {/* </span> */}
//                                                                 {/* })
//                                                             } */}
//                                                         </span>
//                                                     )
//                                                 })}
//                                             </Col>
//                                             : <div >
//                                                 <span >Data Not Found</span>
//                                             </div>}
//                                     </Row>
//                                     : <div style={{
//                                         display: 'flex',
//                                         alignItems: 'center',
//                                         justifyContent: 'center',

//                                     }}>
//                                         <ClipLoader
//                                             color="#2d292a"
//                                             size={80}
//                                         />
//                                     </div>
//                                 }
//                             </Col>
//                         </Row>
//                     </ModalBody>
//                     <ModalFooter>

//                         <Button
//                             color="danger"
//                             onClick={this.toggleOrderModal.bind(this)}>
//                             <i className="fa fa-ban"></i> Cancel</Button>
//                     </ModalFooter>
//                 </Modal>



//             </Card>
//         )
//     }


//     // handleChange(event) {
//     //     this.setState({ [event.target.name]: event.target.value });
//     // }


//     handleClick(event) {
//         event.preventDefault();
//     }



//     getSections() {
//         CommonServices.getData(`/section`).then((result) => {
//             debugger
//             console.log('sectiondata===', result)
//             let data = result.map((value, index) => {
//                 let subSectonList = value.listSubSectionModel;
//                 let treeStructure = this.list_to_tree(subSectonList, null);
//                 return {
//                     subSectionName: value.sectionName,
//                     subSectionId: value.sectionId,
//                     children: treeStructure
//                 }
//             });
//             this.setState({
//                 treeNodes: data
//             });
//         });

//     }


//     list_to_tree(data, root) {
//         debugger
//         console.log('data ==', data)
//         var r = [], o = {};
//         data.forEach(function (a) {

//             //  console.log('o[a.subSectionId] ==', o[a.subSectionId])
//             // console.log('o[a.subSectionId].children==',o[a.subSectionId].children)
//             if (o[a.subSectionId] && o[a.subSectionId].children) {
//                 debugger
//                 a.children = o[a.subSectionId] && o[a.subSectionId].children;
//             }
//             o[a.subSectionId] = a;
//             if (a.parentSubSectionId === root) {
//                 r.push(a);
//             } else {
//                 o[a.parentSubSectionId] = o[a.parentSubSectionId] || {};
//                 o[a.parentSubSectionId].children = o[a.parentSubSectionId].children || [];
//                 console.log(a);
//                 o[a.parentSubSectionId].children.push(a);
//             }
//         });
//         console.log(r);
//         return r;
//     }

//     getTreeItemsFromData = treeItems => {
//         // console.log('treeItems==', treeItems)
//         // console.log(treeItems);
//         return treeItems.map(treeItemData => {
//             let children = undefined;
//             if (treeItemData.children && treeItemData.children.length > 0) {
//                 // console.log('treeItemData.children==', treeItemData.children)
//                 children = this.getTreeItemsFromData(treeItemData.children);
//             }
//             return (
//                 <TreeItem
//                     key={treeItemData.subSectionName}
//                     nodeId={treeItemData.subSectionName}
//                     label={treeItemData.subSectionName}
//                     children={children}
//                     labelIcon={MailIcon}
//                     onClick={() => this.treeClicked(treeItemData.subSectionId, treeItemData.subSectionName, treeItemData.children)}

//                 />
//             );
//         });
//     };

//     treeClicked(nodeId, sectionname, children) {
//         debugger
//         this.setState({
//             RubricNameForPopUp : sectionname
//         })
//         CommonServices.getDataById(nodeId, `/RubricRemedy/GetRemedyCounts`).then((temp) => {
//             debugger
//             this.setState({
//                 RemedyCountsList:temp
//             })
//         });

//         CommonServices.getDataById(parseInt(nodeId), `/subsection`).then((res) => {
//             debugger
//             console.log('res===',res)
//             if(res.subSectionLanguageDetails.length > 0){
//                 res.subSectionLanguageDetails.forEach((item) => {
//                     if (item.languageName.trim() === "English") {
//                         this.state.englishArray.push(item);
//                     } else if (item.languageName.trim() === "Marathi") {
//                         this.state.marathiArray.push(item);
//                     }
//                 });
//             }
//             else{
//                 this.setState({
//                     englishArray:[],
//                     marathiArray:[]

//                 })
//             }
//         })



      
//         if (children) {
//             // The TreeItem has children
//             console.log("TreeItem has children:", children);
//             this.state.hasChildrenNodeIds.push(nodeId);
//             // Perform additional actions if needed
//         } else {
//             // The TreeItem does not have children
//             console.log("TreeItem does not have children");
//             // Perform additional actions if needed
//         }

//         // console.log('nodeId', nodeId, sectionname)
//         this.setState({
//             isloding: false,
//             closedeletenodeId: nodeId
//         })
//         debugger
//         const found = this.state.OnlySectionList.some(el => el.sectionName === sectionname);
//         if (!found) {
//             debugger
//             CommonServices.getDataById(nodeId, `/RubricRemedy/GetGradeDetailsWithoutGrade`).then((temp) => {
//                 debugger
//                 console.log(temp);
//                 debugger;
//                 if (temp !== undefined) {
//                     this.setState({

//                         RemedyAndAuthor: temp,
//                         RemedyAndAuthorList: temp,
//                         isloding: true
//                     })
//                 }
//                 else {
//                     this.setState({

//                         RemedyAndAuthor: [],
//                         isloding: true
//                     })
//                 }

//             });
//             const nodefound = this.state.previousnodeIds.some(el => el === nodeId);
//             var index = this.state.previousnodeIds.indexOf(nodeId)
//             if (nodefound) {
//                 this.state.previousnodeIds.splice(index, 1);
//             }
//             else {
//                 this.toggleOrderModal()
//                 this.state.previousnodeIds.push(nodeId)


//             }
//             // alert('hi')
//         }



//     }
//     toggleOrderModal = () => {
//         var index1 = this.state.hasChildrenNodeIds.indexOf(this.state.closedeletenodeId);
//         if (index1 === -1) {
//             var index = this.state.previousnodeIds.indexOf(this.state.closedeletenodeId)
//             if (index !== -1) {
//                 this.state.previousnodeIds.splice(index, 1);
//             }
//         }

//         this.setState({
//             toggleOrderModel: !this.state.toggleOrderModel,
//             GradeId: 0,
//             RemedyAndAuthor: [],
//             RemedyAndAuthorList: [],
//             isloding: false

//         })
//     };

// }

// export default ListNigaRepertoryComponent;
