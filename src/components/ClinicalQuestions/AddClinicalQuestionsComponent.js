import React, { Component } from 'react';
import { Table, Col, FormGroup, Form, Row } from 'react-bootstrap';
import { Button, Card, CardBody, CardFooter, CardHeader, } from 'reactstrap';
import Select from "react-select";
import { Label, Input } from 'reactstrap';
import AsyncPaginate from "react-select-async-paginate";
import './ClinicalQuestions.css';
import DragSortableList from 'react-drag-sortable';
import CommonServices from '../../Services/CommonServices';
import TreeView from '@material-ui/lab/TreeView';
import TreeItem from '@material-ui/lab/TreeItem';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { makeStyles } from '@material-ui/core/styles';
import MailIcon from '@material-ui/icons/Mail';
import { Link } from '@material-ui/core';
import '../../components/CommanStyle.css';

/**
 * Created Date     :   06-01-2020
 * Purpose          :   Component is used to add clicical questions
 * Author           :   Chandrashekhar Salagar.
 */
export class AddClinicalQuestionsComponent extends Component {

    /**
     * Constructor to initialize class members.
     * @param {*} props 
     */
    constructor(props) {
        super(props);
        this.state = {
            QuestionsId: 0,
            QuestionGroupId: 0,
            Question: '',
            Description: '',
            EnteredBy: '',
            SeqNo: 0,
            SectionId: 0,
            SectionIdForBodyPart: 0,
            SubSectionId: 0,
            SubSectionName: '',
            selectedSubSection: null,
            keywordQuestion: '',
            SelectedSubSectionList: [],
            SectionModel: [],
            SubSectionModel: [],
            QuestionGroupList: [],
            SubQuastionGroupList: [],
            bodyPartList: [],
            questionSubgroupId: 0,
            questionSectionId: 0,
            bodyPartId: 0,
            selectedOptions: '',
            selectedOptions1: '',
            selectedOptions2: '',
            selectedOptions3: '',
            optionList: [],
            optionList1: [],
            optionList2: [],
            optionList3: [],
            modelEx: [],
            model1: [],
            Questions: [],
            QuestionGroup: [],
            treeNodes: [],
            errors: {},
            SelectedGuestionsectionId: 0,
            SelectedQuestionGroupId: 0,
            subQuestionGroupId: 0,
            copyOfSelectedSubQuestionGroup: '',
            sendFinalReuest: {}
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.addQuestions = this.addQuestions.bind(this);
        this.treeClicked = this.treeClicked.bind(this);

    }




    /**
     * React component did mount, will execute only once per page load.
     */
    componentDidMount() {
        this.GetAllSections();
        this.getQuestionGroup();
        this.getSections();
        this.getQuestionSection();

        this.getBodyPart();
        // this.getAllClinicalQuestions();
    }

    /**
     * Custome event,will execute when list is sorted.
     */
    onSort(sortedList, dropEvent) {
    }


    render() {
        const SectionList = this.state.SectionModel;
        const counter = this.state.SectionId;
        return (
            <Card>
                <CardHeader>
                    <i className="fa fa-align-justify"></i>
                    Clinical Questions
                </CardHeader>
                <CardBody>
                    <Form encType="multipart/form-data" className="form-horizontal">
                        <Row>


                            <Col xs="12" md="4">
                                <Label className="label" htmlFor="">Existance Name
                                    <span className="required">*</span> :</Label>
                                <Select
                                    options={this.state.optionList}
                                    placeholder="Select Existance Name"
                                    name="SelectExistanceName"
                                    value={this.state.selectedOptions}
                                    onChange={(item) => this.handleSelect(item)}
                                    isSearchable={true} />
                                <span className="error">{this.state.errors["SelectExistanceName"]}</span>
                            </Col>


                            <Col xs="12" md="4">
                                <Label className="label" htmlFor="">Question Group
                                    <span className="required">*</span> :</Label>
                                <Select
                                    options={this.state.optionList3}
                                    placeholder="Select Question Group :"
                                    value={this.state.selectedOptions3}
                                    onChange={(item) => this.handleSelectedQuestionGroup(item)}
                                    isSearchable={true}
                                />
                            </Col>



                            <Col xs="12" md="4">
                                <Label className="label" htmlFor="">Sub Question Group Name
                                    <span className="required">*</span> :</Label>

                                <Select
                                    options={this.state.optionList1}
                                    placeholder="Select Sub Question Group Name :"
                                    value={this.state.selectedOptions1}
                                    onChange={(item) => this.handleSelectSubGroup(item)}
                                    isSearchable={true}

                                />

                            </Col>

                        </Row>

                        {this.state.selectedOptions1?.label?.toLowerCase() === 'location' && <Row className="mt-2">
                            <Col xs="12" md="4">
                                <Label className="label" htmlFor="">
                                    Select Section
                                    <span className="required">*</span> :</Label>
                                <Input
                                    type="select"
                                    name="SectionIdForBodyPart"
                                    value={this.state.SectionIdForBodyPart}
                                    onChange={this.handleSetionChange.bind(this)} >
                                    <option value="0">Select Section</option>
                                    {
                                        SectionList != undefined ?
                                            SectionList.map((section, index) => {
                                                return <option key={index} value={section.sectionId}>{section.sectionName}</option>
                                            }) : null
                                    }
                                </Input>
                            </Col>

                            <Col xs="12" md="8">
                                <Label className="label" htmlFor="">Body Part Name
                                    <span className="required">*</span> :</Label>

                                <Select
                                    options={this.state.optionList2}
                                    placeholder="Select Body Part Name :"
                                    value={this.state.selectedOptions2}
                                    onChange={(item) => this.handlebodypart(item)}
                                    isSearchable={true}
                                    isMulti={false} />
                            </Col>
                        </Row>}



                        {this.state.selectedOptions1?.label?.toLowerCase() !== 'location' && <Row className="mt-2">
                            <Col xs="12" md="12">
                                <FormGroup >
                                    <Label className="label" htmlFor="">Question
                                        <span className="required">*</span> :</Label>

                                    <Form.Control type="text" placeholder="Question"
                                        name="Question"
                                        onChange={this.handleChange}
                                        value={this.state.Question === null ? '' : this.state.Question} />
                                </FormGroup>
                            </Col>
                        </Row>}



                        <Row>
                            <Col xs="12" md="3">
                                <Label className="label" htmlFor="">
                                    Select Section
                                    <span className="required">*</span> :</Label>
                                <Input
                                    type="select"
                                    name="SectionId"
                                    value={this.state.SectionId}
                                    onChange={this.handleSetionChange.bind(this)} >
                                    <option value="0">Select Section</option>
                                    {
                                        SectionList != undefined ?
                                            SectionList.map((section, index) => {
                                                return <option key={index} value={section.sectionId}>{section.sectionName}</option>
                                            }) : null
                                    }
                                </Input>
                            </Col>

                            <Col xs="12" md="7">
                                <Label className="label" htmlFor="">
                                    Select Sub Section
                                    <span className="required">*</span> :</Label>

                                <AsyncPaginate style={{ width: '80px' }}
                                    isClearable
                                    key={counter}
                                    cacheOptions={counter}
                                    labelKey="value"
                                    labelValue="subSectionId"
                                    isMulti={true}
                                    placeholder="Type Sub-Section"
                                    value={this.state.selectedSubSection}
                                    loadOptions={this.loadOptions.bind(this)}
                                    onChange={(item) => this.SubsectionChanged(item)}
                                />
                            </Col>

                            <Col xs="12" md="2">
                                <FormGroup >
                                    <Button

                                        type="button"
                                        style={{ marginTop: 32 }}
                                        onClick={this.addSelectedSubSectionQuestions.bind(this)}
                                        size="sm" color="primary">
                                        <i className="fa fa-plus"></i> Add Sub Section
                                    </Button>
                                </FormGroup>
                            </Col>
                        </Row>
                    </Form>

                    <Table style={{ width: '100%' }} striped bordered hover className="mt-3">
                        <thead>
                            <tr>
                                {/* <th className='fcol'>Sr.No</th> */}
                                <th>Question</th>
                                <th>Sub Section Name</th>
                                {/* <th className='lcol'>Action</th> */}
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.SelectedSubSectionList.map((s, parentIndex) => {
                                    return <tr key={parentIndex}>
                                        {/* <td className='fcol'>{s.SubSectionId}</td> */}
                                        <td>{s.keyWords}</td>
                                        {this.state.copyOfSelectedSubQuestionGroup?.toLowerCase() !== 'location' ? <Table>
                                            {s.clinicalQuestionRubricList.map((rubric, childIndex) => {
                                                return <tr key={childIndex}>
                                                    <td>{rubric.SubSectionName}</td>
                                                    <td className='lcol'>
                                                        {/* <Link to={"/EditAuthorComponent/" + s.authorId}>
                                                    <Button onClick={() => this.editAuthor(s.authorId)} ><i className="fa fa-pencil"></i></Button> 
                                                </Link> */}
                                                        <Button style={{ marginLeft: 8 }} variant="danger" color="danger" onClick={() => this.deleteSubsSection(parentIndex, childIndex)} ><i className="fa fa-trash"></i></Button>
                                                    </td>
                                                </tr>
                                            })}

                                        </Table> :
                                            <Table>
                                                {s.clinicalBodyPartRubricList.map((rubric, childIndex) => {
                                                    return <tr>
                                                        <td>{rubric.SubSectionName}</td>
                                                        <td className='lcol'>
                                                            {/* <Link to={"/EditAuthorComponent/" + s.authorId}>
                                                <Button onClick={() => this.editAuthor(s.authorId)} ><i className="fa fa-pencil"></i></Button> 
                                            </Link> */}
                                                            <Button style={{ marginLeft: 8 }} variant="danger" color="danger" onClick={() => this.deleteSubsSection(parentIndex, childIndex)} ><i className="fa fa-trash"></i></Button>
                                                        </td>
                                                    </tr>
                                                })}

                                            </Table>}
                                    </tr>
                                })
                            }
                        </tbody>
                    </Table>
                </CardBody>
                <br></br>

                <CardFooter>
                    <Row>

                        <Col xs="12" md="6">
                            <Button
                                type="button"
                                style={{ textTransform: "uppercase" }}
                                onClick={this.handleSave.bind(this)}
                                size="sm" color="primary">
                                <i className="fa fa-save"></i> Save
                            </Button> &nbsp;
                            <Button
                                type="reset"
                                style={{ textTransform: "uppercase" }}
                                onClick={() => this.props.history.push('/ListClinicalQuestions')}
                                size="sm" color="danger">
                                <i className="fa fa-ban"></i> Cancel
                            </Button>
                        </Col>
                        <Col xs="12" md="6" style={{ textAlign: "right" }}>
                            <Label style={{ fontSize: 15, margin: 0, paddingTop: 5 }}> Fields marked with an asterisk <span className="required">*</span> are mandatory</Label>
                        </Col>
                    </Row>
                </CardFooter>

            </Card>

        )
    }

    validateForm() {
        let fields = this.state;

        let errors = {};
        let isFormValid = true;

        if (fields.SelectExistanceName == "") {
            isFormValid = false;
            errors["SelectExistanceName"] = "Please select existance name"
        }
        this.setState({ errors });
        return isFormValid;
    }

    deleteSubsSection = (parentIndex, childIndex) => {
        debugger;
        console.log('parentIndex', parentIndex);
        console.log('childIndex', childIndex)
        if (this.state.copyOfSelectedSubQuestionGroup?.toLowerCase() !== 'location') {

            var array = [...this.state.SelectedSubSectionList[parentIndex].clinicalQuestionRubricList]; // make a separate copy of the array

            if (childIndex !== -1) {
                array.splice(childIndex, 1);
                this.state.SelectedSubSectionList[parentIndex].clinicalQuestionRubricList = array
                if (childIndex === 0 && this.state.SelectedSubSectionList[parentIndex].clinicalQuestionRubricList.length === 0) {
                    var tempArray = [...this.state.SelectedSubSectionList];
                    tempArray.splice(parentIndex, 1);
                    this.setState({ SelectedSubSectionList: tempArray });
                } else {
                    this.setState({ SelectedSubSectionList: this.state.SelectedSubSectionList });
                }

            }
        } else {

            var array = [...this.state.SelectedSubSectionList[parentIndex].clinicalBodyPartRubricList]; // make a separate copy of the array
            console.log(this.state.SelectedSubSectionList[parentIndex].clinicalBodyPartRubricList.length)
            if (childIndex !== -1) {
                array.splice(childIndex, 1);
                this.state.SelectedSubSectionList[parentIndex].clinicalBodyPartRubricList = array
                if (childIndex === 0 && this.state.SelectedSubSectionList[parentIndex].clinicalBodyPartRubricList.length === 0) {
                    var tempArray = [...this.state.SelectedSubSectionList];
                    tempArray.splice(parentIndex, 1);
                    this.setState({ SelectedSubSectionList: tempArray });
                } else {
                    this.setState({ SelectedSubSectionList: this.state.SelectedSubSectionList });
                }

            }
        }


    }

    deleteAuthor = (index) => {
        var array = [...this.state.Questions]; // make a separate copy of the array

        if (index !== -1) {
            array.splice(index, 1);
            this.setState({ Questions: array });
        }

    }

    handleSetionChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
        this.setState({
            SubSectionId: null,
        })
    }

    GetAllSections = () => {
        CommonServices.getData(`/mastersAPI/GetSections`).then((sections) => {
            this.setState({
                SectionModel: sections,
            })
        })
    }

    SubsectionChanged(item) {
        /*   console.log('e.label====>>>>>', item.value)
          console.log('e.label====>>>>>', item.label) */
        if (item != null) {
            this.setState({
                /*  SubSectionId: item.value,
                 SubSectionName: item.label, */
                selectedSubSection: item
            })
        }
        else {
            this.setState({
                SubSectionId: 0
            })

        }
        console.log('subSectionId ==== ', this.state.subSectionId)
    }

    GetAllSubsections = (sectionId) => {
        CommonServices.getDataById(sectionId, `/mastersAPI/GetSubsectionBySection`).then((subSections) => {
            this.setState({
                SubSectionModel: subSections,
            })
        });
    }

    GetSubsections = async (sectionId) => {
        var subSectionsList = [];
        return (CommonServices.getDataById(sectionId, `/mastersAPI/GetSubsectionBySection`).then((subSections) => {
            subSectionsList = subSections;
            return subSectionsList;

        }))
    }

    /**
        * wait for result to come
        */
    sleep = ms => new Promise(resolve => {
        setTimeout(() => {
            resolve();
        }, ms);
    });

    /**
     * Load data on demand for subsections
     */
    loadOptions = async (search, prevOptions) => {

        const options = [];
        var subsectionList = this.state.SubSectionModel;
        await this.GetSubsections(this.state.SectionId).then((result) => {
            subsectionList = result;
        })

        subsectionList.map(x => options.push({ value: x.subSectionId, label: x.subSectionName }));
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

    /**
     * Handle change event of every control to update the state
     * @param {*} event 
     */

    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value });

    }

    // handlequestion(e) {
    //     this.setState({
    //         questionSectionId: e.target.value
    //     });
    // }


    /*For type and search dropdown Existance */
    handleSelect(data) {
        //console.log('pranavsir++++====>>>>>',data)
        this.setState({
            selectedOptions: data,
            SelectedGuestionsectionId: data.value
        })
    }

    /* For type and search dropdown Existance  */
    getQuestionSection() {
        debugger;
        CommonServices.getData(`/DropdownList/GetQuestionSectionsDDL`).then((temp) => {
            // console.log(temp);
            debugger;

            var copyTableData = temp;
            let array = []
            copyTableData.forEach(element => {
                debugger;
                let obj = {
                    // { value: "red", label: "Red" }
                    value: parseInt(element.questionSectionId),
                    label: element.questionSectionName
                }
                array.push(obj)
            });
            this.setState({
                optionList: array,
                //QuestionSectionList: temp,
            })
        });
    }

    // handlesubquestion(e) {
    //     this.setState({
    //         questionSubgroupId: e.target.value
    //     });
    // }

    /* subgroup handle changes */

    handleSelectSubGroup(data) {
        //console.log('pranavsir++++====>>>>>', data)
        this.setState({
            selectedOptions1: data,
            copyOfSelectedSubQuestionGroup: data.label,
            subQuestionGroupId: data.value
        })
    }

    getSubGroupQuestionSection(questiongroupId, questionsectionId) {
        debugger
        CommonServices.getData(`/DropdownList/GetSubQuestionGroupByQGIDQSIDDDL/${questiongroupId}/${questionsectionId}`).then((temp) => {
            //debugger;
            console.log('getSubGroupQuestionSection====>>>>>>>', temp);

            var copyTableData = temp;
            let array = []
            copyTableData.forEach(element => {
                debugger;
                let obj = {
                    // { value: "red", label: "Red" }
                    value: parseInt(element.questionSubgroupId),
                    label: element.questionSubgroup1
                }
                array.push(obj)
            });
            this.setState({
                optionList1: array,
                // SubQuastionGroupList: temp,
            })
        });
    }

    // handlebody(e) {
    //     this.setState({
    //         bodyPartId: e.target.value
    //     });
    // }


    /* For body part type and search dropdown */
    handlebodypart(data) {
        console.log('pranavsir++++====>>>>>', data)
        this.setState({
            selectedOptions2: data,
        })
    }

    getBodyPart() {
        debugger;
        CommonServices.getData(`/bodypart`).then((temp) => {
            //debugger;
            //console.log('getBodyPart===>>>>>>>>>>>>>>>>>',temp);

            var copyTableData = temp;
            let array = []
            copyTableData.forEach(element => {
                //debugger;
                let obj = {
                    // { value: "red", label: "Red" }
                    value: parseInt(element.bodyPartId),
                    label: element.bodyPartName
                }
                array.push(obj)
            });
            this.setState({
                optionList2: array,
                //bodyPartList: temp,
            })
        });
    }

    /**
     * Method to handle submit event of form
     * @param {*} event 
     */
    handleClick(event) {
        event.preventDefault();
    }

    /**
     * Method is used to add questions in list
     */
    async addQuestions() {
        // if (this.validateForm()) {  

        var question = this.state.Question;
        if (question == '') {
            alert("Please enter question");
        }
        else {


            // var newQuestionprop = { content: (<div id="0" >{this.state.Question}</div>) };
            var obj = {
                Question: this.state.Question
            }
            this.state.Questions.push(obj);
            /* this.setState({
                Questions: this.state.Question,
                Question: ''
            }); */
            console.log('Questions====>>>', this.state.Questions)
            this.setState({
                Question: ''
            });
        }
        // }   
    }


    async addSelectedSubSectionQuestions() {
        debugger;
        if (this.state.selectedSubSection == null) {
            alert("Please enter Sub Section");
        }
        else {
            //var newQuestionprop = { content: (<div id="0" >{this.state.SubSectionId}</div>) };
            var rubic = [];
            var request = {};
            var finalRequest = {};
            var sendToApi = [];

            console.log('value = ', this.state.selectedOptions1?.label?.toLowerCase())

            new Promise((resolve, reject) => {
                this.state.selectedSubSection.map((item, index) => {
                    if (this.state.selectedOptions1?.label?.toLowerCase() !== 'location') {
                        rubic.push({
                            "subsectionID": item.value,
                            "SubSectionName": item.label,
                        })
                        index === this.state.selectedSubSection.length - 1 && resolve(true)
                    } else {
                        rubic.push({
                            "subsectionID": item.value,
                            "SubSectionName": item.label,
                        })
                        index === this.state.selectedSubSection.length - 1 && resolve(true)
                    }

                })
            }).then(async (result) => {
                debugger
                console.log(result)
                if (result) {

                    sendToApi = await rubic.map(item => {
                        const { SubSectionName, ...rest } = item;
                        return rest;
                    });
                    console.log('sendToApi == ', sendToApi)

                    if (this.state.selectedOptions1?.label?.toLowerCase() !== 'location') {
                        request = {
                            "keyWords": this.state.Question,
                            "clinicalQuestionRubricList": rubic
                        }

                        finalRequest = {
                            "questionSectionID": this.state.SelectedGuestionsectionId,
                            "questionGroupId": this.state.SelectedQuestionGroupId,
                            "questionSubGroupID": this.state.subQuestionGroupId,
                            "qbType": 1,
                            "clinicalQuestionList": [{
                                "keyWords": this.state.Question,
                                "clinicalQuestionRubricList": sendToApi
                            }],
                            "clinicalBodyPartList": []
                        }

                    } else {
                        request = {
                            "bodypartID": this.state.selectedOptions2.value,
                            "keyWords": this.state.selectedOptions2.label,
                            "clinicalBodyPartRubricList": rubic
                        }

                        finalRequest = {
                            "questionSectionID": this.state.SelectedGuestionsectionId,
                            "questionGroupId": this.state.SelectedQuestionGroupId,
                            "questionSubGroupID": this.state.subQuestionGroupId,
                            "qbType": 2,
                            "clinicalQuestionList": [],
                            "clinicalBodyPartList": [{
                                "bodypartID": this.state.selectedOptions2.value,
                                "clinicalBodyPartRubricList": sendToApi
                            }]
                        }
                    }

                    console.log(finalRequest)
                    /* var obj = {
                        SubSectionId: this.state.selectedSubSection.value,
                        SubSectionName: this.state.selectedSubSection.label,
                    } */
                    this.state.SelectedSubSectionList.push(request)
                    this.setState({ sendFinalReuest: finalRequest })

                    this.setState({
                        selectedSubSection: null,
                        selectedOptions: null,
                        selectedOptions3: null,
                        selectedOptions1: null,
                        SectionIdForBodyPart: null,
                        selectedOptions2: null,
                        SectionId: 0,
                        selectedSubSection: null,
                        Question: ''
                    });
                }

            })
        }
    }


    // handleQuestionGroupChange(event) {
    //     this.setState({
    //         QuestionGroupId: event.target.value
    //     });
    //     this.getClinicalQuestionsByGroup(event.target.value);
    // }



    /* For the type and serch dropdown questionGroup */

    handleSelectedQuestionGroup(data) {
        //console.log('pranavsir++++====>>>>>', data)
        this.setState({
            selectedOptions3: data,
            SelectedQuestionGroupId: data.value
        })

        this.getSubGroupQuestionSection(data.value, this.state.SelectedGuestionsectionId);
    }


    /* Method is used to get all Question group for dropdown.*/

    getQuestionGroup() {
        CommonServices.getData('/DropdownList/GetQuestionGroupDDL').then((res) => {
            var copyTableData = res;
            let array = []
            copyTableData.forEach(element => {
                //console.log("printed====>>>>", element)
                //debugger;
                let obj = {
                    value: element.questionGroupId,
                    label: element.questionGroupName
                }
                array.push(obj)
            });
            this.setState({
                optionList3: array,
                //QuestionGroup: res
            });
        })
    }

    /**
     * Method is used to handle submit of form
     */
    handleSave() {

        /* if (this.state.selectedOptions.value == NaN) {
            alert("Please select Existance Name");
        }

        else if (this.state.selectedOptions3.value == '') {
            alert("Please select Question Group");
        }
        else if (this.state.Questions.length == 0) {
            alert("All fields are required")

        }
        else { */
        var clinicalquestionsModel = [];
        /* var sortedQuestions = this.state.Questions.sort(function (a, b) {
            return parseInt(a.rank) - parseInt(b.rank);
        }) */

        /* sortedQuestions.map((value, index) => {
            debugger;
            var item = {
                //QuestionsId: value.content.props.id,
                QuestionGroupId: parseInt(this.state.selectedOptions3.value),
                Questions: this.state.keywordQuestion,
                Description: this.state.Description,
                EnteredBy: localStorage.getItem("UserName"),
                SeqNo: index + 1,
                questionSubgroupId: parseInt(this.state.selectedOptions1.value),
                questionSectionId: parseInt(this.state.selectedOptions.value),
                bodyPartId: parseInt(this.state.selectedOptions2.value),
                modelEx: this.state.modelEx,
                model1: this.state.model1,
                deleteStatus: false,
            }
            clinicalquestionsModel.push(item);
        })


        var copyTableData = this.state.Questions;
        debugger;
        copyTableData.forEach(element => {
            console.log("printed====>>>>", element)
            debugger;
            let obj = {
                keywordQuestion: element.Question,
                isDeleted: false,

            }
            this.state.modelEx.push(obj)
        });



        var copyTableData = this.state.SelectedSubSectionList;
        debugger;
        copyTableData.forEach(element => {
            console.log("printed====>>>>", element)
            debugger;
            let obj = {
                subsectionId: element.SubSectionId,
                isDeleted: false,
            }
            this.state.model1.push(obj)
        });
*/
        console.log('cthis.state.sendFinalReuest for save=====>>>>>>>+++++------', JSON.stringify(this.state.sendFinalReuest))
        /*Save Request*/

        // if (this.validateForm()) {  
        debugger;
        CommonServices.post(this.state.sendFinalReuest, `/clinicalquestions/AddEditClinicalQuestionsBodyPart`).then((res) => {
            debugger;
            if (res.data == undefined) {
                // alert('All field are requerd', res.data);
                this.props.history.push('/AddClinicalQuestions');
            }
            else {
                alert(res.data);
                this.props.history.push('/ListClinicalQuestions');
                this.setState({
                    QuestionsId: 0,
                    QuestionGroupId: 0,
                    Question: '',
                    Description: '',
                    EnteredBy: '',
                    SeqNo: 0,
                    Questions: [
                    ],
                    questionSectionId: 0,
                    questionSubgroupId: 0,
                    sendFinalReuest: {}
                })
            }
        })
        /*  } */
    }

    /*
     * To get all the clinical questions.
     */
    getAllClinicalQuestions() {
        var questionsArray = [];
        debugger;
        CommonServices.getData(`/clinicalquestions`).then((result) => {
            debugger;
            result.map((value, index) => {
                var existingQuestion = { content: (<div id={value.questionsId} >{value.questions}</div>) };
                questionsArray.push(existingQuestion);
            });
            this.setState({
                Questions: questionsArray
            });
        })
    }

    /**
     * Get clinical questions by group.
     * @param {*} questionGroupId 
     */
    getClinicalQuestionsByGroup(questionGroupId) {
        debugger;
        var questionsArray = [];
        CommonServices.getData(`/clinicalquestions`).then((result) => {
            result.map((value, index) => {
                if (value.questionGroupId == questionGroupId) {
                    var existingQuestion = { content: (<div id={value.questionsId} >{value.questions}</div>) };
                    questionsArray.push(existingQuestion);
                }
            });

            console.log('questionsArray====+++>>>>', questionsArray)
            this.setState({
                Questions: questionsArray
            });
        })
    }

    getSections() {
        CommonServices.getData(`/section`).then((result) => {
            let data = result.map((value, index) => {
                let subSectonList = value.listSubSectionModel;
                let treeStructure = this.list_to_tree(subSectonList, null);
                return {
                    subSectionName: value.sectionName,
                    subSectionId: value.sectionId,
                    children: treeStructure
                }
            });
            this.setState({
                treeNodes: data
            });
        });
    }

    list_to_tree(data, root) {
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
                //debugger;
                // console.log(a);
                o[a.parentSubSectionId].children.push(a);
            }
        });
        // debugger;
        // console.log(r);
        return r;
    }

    getTreeItemsFromData = treeItems => {
        console.log('treeItems=====>>>>>>>>', treeItems);
        //debugger;
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
                    onClick={() => this.treeClicked(treeItemData.subSectionId)}
                />
            );
        });
    };

    treeClicked(nodeId) {
        // alert(nodeId);
    }
}
