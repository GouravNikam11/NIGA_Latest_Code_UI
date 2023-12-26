import React, { Component } from 'react';
import CommonServices from '../../Services/CommonServices';
import Select from 'react-select';
import AsyncSelect from 'react-select/async'
import AsyncPaginate from "react-select-async-paginate";
import { Table } from 'react-bootstrap';
import {
    Badge,
    Button,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    Col,
    Collapse,
    DropdownItem,
    DropdownMenu,
    DropdownToggle,
    Fade,
    Form,
    FormGroup,
    FormText,
    FormFeedback,
    Input,
    InputGroup,
    InputGroupAddon,
    InputGroupButtonDropdown,
    InputGroupText,
    Label,
    Row,
    Alert,
} from 'reactstrap';



export class RubricList extends Component {
    /**
     * Constructor for initilizing state.
     */
    constructor(props) {
        super(props);
        this.state = {
            RubricRemedyId: 0,
            SectionId: 0,
            SubSectionId: 0,
            RemedyId: 0,
            GradeId: 0,
            SectionModel: [],
            SubSectionModel: [],
            RemedyGradeModel: [],
            RemedyModel: [],
            value: '',
            options: [],
            RemedyIds: [],

            someOption: 0,
            selectedSubSection: {},

            authorId: '',
            authorIds: [],
            RepertoryAuthor: [],
            selectedauthorandremedy: [],
        }
    }

    /**
     * componentDidMount
     */
    async componentDidMount() {
        var Id = this.props.match.params.id;
        var grade = this.props.match.params.grade;
        this.GetAllSections();
        this.GetAllGrades();
        await this.GetRemedyDetailsToEdit(Id, grade)
        this.GetAllAuthor();
        // this.GetAllRemedies();//get remedies on demand
    }
    /**
    * Method to handle change event of all input fields
    * @param {*} event 
    */
    handleSetionChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
        //  this.setState({
        //      SubSectionId: null,

        //  })
    }


    /**
     * Handle change of each control.
     * @param {*} e 
     */
    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value })
    }

    /**
     * SubsectionChanged
     */
    SubsectionChanged(e) {
        if (e != null) {
            this.setState({
                SubSectionId: e
            })
        }
        else {
            this.setState({
                SubSectionId: 0
            })

        }
    }

    /**
     * RemedyChanged
     */
    RemedyChanged = (e) => {

        if (e != null) {
            this.setState({
                RemedyIds: e,
            }, () => {
                // console.log(this.state.RemedyIds);

            })
        }
    }

    /**
     * Render UI
     */
    render() {
        // alert("called");
        const SectionList = this.state.SectionModel;
        const SubSectionList = this.state.SubSectionModel;
        const GradeList = this.state.RemedyGradeModel;
        const RemedyList = this.state.RemedyModel;
        const counter = this.state.SectionId;
        const counterRemedy = this.state.SubSectionId;
        // alert(counter)
        return (
            <Card>
                <CardHeader>
                    <i className="fa fa-align-justify"></i>
                    Edit Rubrics
                </CardHeader>
                <CardBody>
                    <Form action="" method="post" encType="multipart/form-data" className="form-horizontal">
                        <Row>
                            <Col md="6">
                                <Label className="label" htmlFor="">
                                    Select Section
                                </Label>
                                <Input type="select"
                                    name="SectionId"
                                    value={this.state.SectionId}
                                    disabled={true}
                                    onChange={this.handleSetionChange.bind(this)}
                                >
                                    <option value="0">Please select</option>
                                    {
                                        SectionList != undefined ?
                                            SectionList.map((section, index) => {
                                                return <option key={index} value={section.sectionId}>{section.sectionName}</option>
                                            }) : null
                                    }
                                </Input>
                            </Col>

                            <Col md="6">
                                <Label className="label" htmlFor="">
                                    Select Sub Section
                                </Label>
                                <AsyncPaginate isClearable
                                    key={counter}
                                    cacheOptions={counter}
                                    labelKey="value"
                                    labelValue="SubSectionId"
                                    placeholder="Type Sub-Section"
                                    value={this.state.SubSectionId}
                                    loadOptions={this.loadOptions.bind(this)}
                                    onChange={this.SubsectionChanged.bind(this)}
                                    defaultOptions
                                    isDisabled={true}

                                />
                            </Col>
                        </Row>
                        <br />
                        <Row>
                            <Col md="6">
                                <Label className="label" htmlFor="">
                                    Select Grade
                                </Label>
                                <Input type="select"
                                    id="GradeId"
                                    name="GradeId"
                                    value={this.state.GradeId === null ? '' : this.state.GradeId}
                                    disabled={true}
                                    onChange={this.handleChange.bind(this)}
                                >
                                    <option value="0">Please select</option>
                                    {
                                        GradeList != undefined ?
                                            GradeList.map((Grade, index) => {
                                                return <option key={index} value={Grade.gradeId}>{Grade.gradeNo}</option>
                                            }) : null
                                    }
                                </Input>
                            </Col>

                            <Col md="6">
                                <Label className="label" htmlFor="">
                                    Select one or more Remedy
                                </Label>
                                <AsyncPaginate isClearable
                                    // isMulti
                                    key={counterRemedy}
                                    cacheOptions={counterRemedy}
                                    placeholder="Type Remedy"
                                    value={this.state.RemedyIds}
                                    loadOptions={this.loadRemedies}
                                    defaultOptions
                                    onChange={this.RemedyChanged.bind(this)}
                                />
                            </Col>
                        </Row>
                        <br />
                        <Row>
                            <Col md="6">
                                <Label className="label" htmlFor="">
                                    Select one or more Author :
                                </Label>
                                <AsyncPaginate isClearable
                                    isMulti
                                    placeholder="Type Author"
                                    value={this.state.authorIds}
                                    loadOptions={this.loadAuthor}
                                    onChange={this.AuthorChanged.bind(this)}
                                />
                            </Col>
                            <Col md="2">
                                <FormGroup >
                                    <Button

                                        type="button"
                                        style={{ marginTop: 32 }}
                                        onClick={this.AddSelectedRemedyAuthors.bind(this)}
                                        size="sm" color="primary">
                                        <i className="fa fa-plus"></i> Add Author And Remedy
                                    </Button>
                                </FormGroup>
                            </Col>
                        </Row>
                    </Form>
                    <br/>
                    <Table style={{ width: '100%' }} striped bordered hover>
                        <thead>
                            <tr>
                                <th>Remedy Name</th>
                                <th>Author Name</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.selectedauthorandremedy.map((item, remedyIndex) => {
                                return <tr key={remedyIndex}>
                                    <td>{item.remedyName}</td>

                                    <td>
                                        <Table>
                                            {item.rubricAuthorList.map((author, authorIndex) => {
                                                return <tr key={authorIndex}>
                                                    <td>{author.authorName}</td>
                                                    <td className='lcol'><Button variant="danger" className="btn btn-danger" onClick={() => this.deleteRubricRemedyAuthor(item.rubricRemedyId, author.remedyRubricAuthorId, remedyIndex, authorIndex)} ><i className="fa fa-trash"></i></Button></td>
                                                </tr>
                                            })
                                            }
                                        </Table>
                                    </td>
                                </tr>
                            })}
                        </tbody>
                    </Table>
                </CardBody>
                <CardFooter>
                    <Row>
                        <Col xs="12" md="6">
                            <Button type="button"
                                onClick={this.HandleSave.bind(this)}
                                size="sm" color="primary">
                                <i className="fa fa-dot-circle-o"></i> Update
                            </Button> &nbsp;

                            <Button
                                type="reset"
                                style={{ textTransform: "uppercase" }}
                                onClick={() => this.props.history.push('/RubricList')}
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

    /**
     * Get all the sections.
     */
    GetAllSections = () => {
        CommonServices.getData(`/mastersAPI/GetSections`).then((sections) => {
            this.setState({
                SectionModel: sections,
            })
        })
    }

    /**
     * GetAllSubsections.
     */
    GetAllSubsections = (sectionId) => {
        CommonServices.getDataById(sectionId, `/mastersAPI/GetSubsectionBySection`).then((subSections) => {
            this.setState({
                SubSectionModel: subSections,
            })
        });

    }

    /**
     * Select all the grades.
     */
    GetAllGrades = () => {
        CommonServices.getData(`/mastersAPI/GetRemedyGrades`).then((grades) => {
            this.setState({
                RemedyGradeModel: grades,
            })
        })
    }

    /**
     * GetAllRemedies.
     */
    GetAllRemedies = async (SubSectionId, GradeId) => {

        debugger;
        var rubricRemedyDetailsModel = {
            SubSectionId: SubSectionId,
            GradeId: GradeId
        }
        return CommonServices.postData(rubricRemedyDetailsModel, `/mastersAPI/GetRemedies`).then((remadies) => {
            debugger;
            console.log(remadies.data);
            this.setState({
                RemedyModel: remadies
            })
            return remadies.data;

        })
    }


    /**Get Sub Section */
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
     * Load data on demand for subsections
     */
    loadRemedies = async (search, prevOptions) => {

        const options = [];
        var subsectionList = this.state.SubSectionModel;
        await this.GetAllRemedies(this.state.SubSectionId.SubSectionId, this.state.GradeId).then((result) => {
            subsectionList = result;
        })

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

    /**
     * Save Remedies for section
     */
    HandleSave = () => {
        debugger;
        //   var rubricRemedyDetailsModel = {
        //     subSectionId: this.state.SubSectionId.value,
        //     sectionId: this.state.SectionId,
        //   //  remedyIds: selectedRemedies.toString(),
        //       gradeId: this.state.GradeId,
        //       rubricRemedyAuthorList: this.state.selectedauthorandremedy
        // };

        let obj = {
            "SectionId": this.state.SectionId,
            "SubSectionId": this.state.SubSectionId.value,
            "GradeId": this.state.GradeId,
            "rubricRemedyAuthorList":this.state.selectedauthorandremedy
        }
debugger
        // CommonServices.postData(obj, `/`).then((result) => {
        CommonServices.postData(obj, `/RubricRemedy/SaveUpdateRubricRemedy`).then((result) => {

            if (result.status == 200) {
                alert(result.data);
                this.setState({
                    SectionId: 0,
                    SubSectionId: null,
                    // subSectionId: null,
                    RemedyIds: [],
                    GradeId: []
                }, () => {
                    this.props.history.push('/RubricList');
                })

            }
        });
    }

    GetAllAuthor = () => {
        CommonServices.getData(`/Author/GetData`).then((result) => {
            this.setState({
                RepertoryAuthor: result
            })
        })
    }

    GetRemedyDetailsToEdit = async (subSectionId, gradeId) => {
        debugger;
        const rubricRemedyDetails = await CommonServices.getData(`/RubricRemedy/GetRubricRemedyBySectionIdGreadId/${subSectionId}/${gradeId}`);
        debugger;
        let subSections = await this.GetSubsections(rubricRemedyDetails.sectionId);
        debugger;
        let selectedSubsection = subSections.find(x => x.subSectionId === rubricRemedyDetails.subSectionId);
        debugger;
       // let allRemedies = await this.GetAllRemedies(0, rubricRemedyDetails.GradeId);
        // let remedyList = rubricRemedyDetails.remedyIds.split(',')
        // let res = allRemedies.filter(el => {
        //     return remedyList.find(element => {
        //         return parseInt(element) === el.remedyId;
        //     });
        // });

        // let selectedRemedies = [];
        // res.forEach((item) => {
        //     selectedRemedies.push({
        //         value: item.remedyId,
        //         label: item.remedyName
        //     })
        // })
        this.setState({
            SectionId: rubricRemedyDetails.sectionId,
            SubSectionId: { value: selectedSubsection.subSectionId, label: selectedSubsection.subSectionName },
            GradeId: rubricRemedyDetails.gradeId,
            RubricRemedyId: rubricRemedyDetails.rubricRemedyId,
            selectedauthorandremedy: rubricRemedyDetails.rubricRemedyAuthorList,
            //RemedyIds: selectedRemedies
        })
    }

    loadAuthor = async (search, prevOptions) => {
        debugger
        console.log('RepertoryAuthor===', this.state.RepertoryAuthor)
        const options = [];
        var RepertoryAuthor = this.state.RepertoryAuthor;
        debugger
        RepertoryAuthor.map(x => options.push({ value: x.authorId, label: x.authorName }));
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

    AuthorChanged = (e) => {
        debugger;
        if (e != null) {
            this.setState({
                authorIds: e,
            }, () => {
            })
        }
    }

    AddSelectedRemedyAuthors2() {
        if(this.state.RemedyIds.length!==0 && this.state.authorIds.length!==0)
       { var copyTableData = [this.state.RemedyIds];
        copyTableData.forEach(element => {
            debugger;
            let obj = {
                rubricRemedyId: this.state.RubricRemedyId,
                remedyId: element.value,
                remedyName: element.label,
                rubricAuthorList: []
            }

        var authorData = this.state.authorIds;
        authorData.forEach(element => {
            let authorObj = {
                remedyRubricAuthorId: 0,
                authorId: element.value,
                authorName: element.label,
            }
        obj.rubricAuthorList.push(authorObj);
        });
        this.state.selectedauthorandremedy.push(obj)
    });
        this.setState({ 
            RemedyIds: '',
            authorIds: '',
        })
    }
    }


    // test1
    AddSelectedRemedyAuthors() {
        debugger
        const existingIndex = this.state.selectedauthorandremedy.findIndex(item =>
            item.remedyId === this.state.RemedyIds.value
        );
    
        if (existingIndex !== -1) {
            const existingEntry = this.state.selectedauthorandremedy[existingIndex];

            this.state.authorIds.forEach(author => {
                const isAuthorAlreadyAdded = existingEntry.rubricAuthorList.some(existingAuthor => existingAuthor.authorId === author.value);

                if (!isAuthorAlreadyAdded) {
                    let obj = {
                        remedyRubricAuthorId: 0,
                        authorId: author.value,
                        authorName: author.label,
                    };
        
                    existingEntry.rubricAuthorList.push(obj);
                }
            });
        } 

        else {
  
        let newEntry = {
            rubricRemedyId: 0,
            remedyId: this.state.RemedyIds.value,
            remedyName: this.state.RemedyIds.label,
            rubricAuthorList: []
        }; 
      this.state.authorIds.forEach(author => {
            let obj = {
                remedyRubricAuthorId: 0,
                authorId: author.value,
                authorName: author.label,
            };
            newEntry.rubricAuthorList.push(obj);
        });
        this.state.selectedauthorandremedy.push(newEntry);
        }

////////////////
        // Reset state
        this.setState({ 
            isLoadTable: true,
            RemedyIds: '',
            authorIds: '',
        });
    }
    // test2

    deleteRubricRemedyAuthor = (rubricRemedyId,remedyRubricAuthorId,remedyIndex,authorIndex) => {
        debugger

        if(this.state.selectedauthorandremedy[remedyIndex].rubricAuthorList.length !==1)
        {
            CommonServices.postData({remedyRubricAuthorId:remedyRubricAuthorId}, `/RubricRemedy/DeleteRubricRemedyAuthor`).then((result) => {
                this.state.selectedauthorandremedy[remedyIndex].rubricAuthorList.splice(authorIndex, 1)
                this.setState({ selectedauthorandremedy:this.state.selectedauthorandremedy});
            });
        }
    
       else if(this.state.selectedauthorandremedy[remedyIndex].rubricAuthorList.length===1)
        {
            CommonServices.postData({rubricRemedyId:rubricRemedyId}, `/RubricRemedy/DeleteRubricRemedyAuthor`).then((result) => {
                this.state.selectedauthorandremedy.splice(remedyIndex, 1)
                this.setState({ selectedauthorandremedy:this.state.selectedauthorandremedy});
            });
        }     
    }
}
export default RubricList;