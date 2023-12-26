/*========================= AddRubrics ==================================*/
/**
 * Created Date     :   03-03-2020
 * Purpose          :   Component is responsible for adding rubrics for sections.
 * Author           :   Chandrashekhar Salagar.
 */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment'
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
/*========================= AddRubrics ==================================*/



export class AddRubricsComponent extends Component {
    /**
     * Constructor for initilizing state.
     */
    constructor(props) {
        super(props);
        this.state = {
            RubricRemedyId: 0,
            SectionId: 0,
            authorId: 0,
            SubSectionId: 0,
            RemedyId: 0,
            GradeId: 0,
            SectionModel: [],
            SubSectionModel: [],
            RemedyGradeModel: [],
            RemedyModel: [],
            enteredDate: '',
            value: '',
            options: [],
            RemedyIds: [],
            authorIds: [],
            RepertoryAuthor: [],
            someOption: 0,
            selectedauthorandremedy: [],
            errors: {},
            isLoadTable: false
        }
    }

    /**
     * componentDidMount
     */
    componentDidMount() {
        this.GetAllSections();
        this.GetAllGrades();
        this.GetAllAuthor();

        // this.GetAllRemedies();//get remedies on demand
    }
    /**
    * Method to handle change event of all input fields
    * @param {*} event 
    */
    handleSetionChange = (event) => {
        debugger
        this.setState({ [event.target.name]: event.target.value });
        this.setState({
            SubSectionId: null,
        })
       
    }

    // handleRemedyChange = (event) => {
    //     this.setState({ [event.target.name]: event.target.value });

    // }


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
                SubSectionId: e.value
            })
        }
        else {
            this.setState({
                SubSectionId: 0
            })

        }
    }

    /**
     * RenedyChanged
     */
    AuthorChanged = (e) => {
        debugger;
        if (e != null) {
            this.setState({
                authorIds: e,
            }, () => {
            })
        }
    }


    RemedyChanged = (e) => {
        debugger;
        if (e != null) {
            this.setState({
                RemedyIds: e,
            }, () => {
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
        const Author = this.state.authorId;
        // alert(counter)
        return (
            <Card>
                <CardHeader>
                    <i className="fa fa-align-justify"></i>
                    Add Rubrics
                </CardHeader>
                <CardBody>
                    <Form action="" method="post" encType="multipart/form-data" className="form-horizontal">
                        <Row>
                            <Col md="6">
                                <Label className="label" htmlFor="">
                                    Select Section :
                                </Label>
                                <Input
                                    type="select"
                                    name="SectionId"
                                    value={this.state.SectionId}
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
                                <Label className="label" htmlFor="" name="subSectionId">
                                    Select Sub Section :
                                </Label>
                                <AsyncPaginate isClearable
                                    key={counter}
                                    cacheOptions={counter}
                                    labelKey="value"
                                    labelValue="subSectionId"
                                    placeholder="Type Sub-Section"
                                    value={this.state.subSectionId}
                                    loadOptions={this.loadOptions.bind(this)}
                                    onChange={this.SubsectionChanged.bind(this)}
                                />
                            </Col>
                        </Row>

                        <br />
                        <Row>
                            <Col md="6">
                                <Label className="label" htmlFor="">
                                    Select Grade :
                                </Label>
                                <Input type="select"
                                    id="GradeId"
                                    name="GradeId"
                                    value={this.state.GradeId === null ? '' : this.state.GradeId}
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
                                <Label className="label" htmlFor="" name="RemedyIds">
                                    Select Remedy :
                                </Label>
                                <AsyncPaginate isClearable
                                    key={counterRemedy}
                                    cacheOptions={counterRemedy}
                                    labelKey="value"
                                    labelValue="RemedyId"
                                    placeholder="Type Remedy"
                                    value={this.state.RemedyIds}
                                    loadOptions={this.loadRemedies}
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
                                    key={Author}
                                    cacheOptions={Author}
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
                                        onClick={this.addSelectedSubSectionQuestions.bind(this)}
                                        size="sm" color="primary">
                                        <i className="fa fa-plus"></i> Add Author And Remedy
                                    </Button>
                                </FormGroup>
                            </Col>
                        </Row>
                    </Form>
                    <br />
                    <Table style={{ width: '100%' }} striped bordered hover>
                        <thead>
                            <tr>
                                {/* <th className='fcol'>Sr.No</th> */}
                                <th>Remedy Name</th>
                                <th>Author Name</th>
                                {/* <th className='lcol'>Action</th> */}
                            </tr>
                        </thead>
                        {this.state.isLoadTable && <tbody>

                            {this.state.selectedauthorandremedy.map((item, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{item.remedyName}</td>
                                        {
                                            item.rubricAuthorList.map((author, index2) => {
                                                return <tr key={index2}>
                                                    <td>{author.authorName}</td>   
                                                    <td className='lcol'><Button variant="danger" className="btn btn-danger" onClick={() => this.deleteRubricRemedyAuthor(index,index2)} ><i className="fa fa-trash"></i></Button></td>
                                                    {/* <td className='lcol'>
                                                            <Button style={{ marginLeft: 8 }} variant="danger" color="danger" 
                                                            onClick={() => this.deleteSubsSection(index)} >
                                                            <i className="fa fa-trash"></i>
                                                            </Button>
                                                    </td> */}
                                                </tr>
                                            })
                                        }
                                        {/* <td className='lcol'>
                                                            <Button style={{ marginLeft: 8 }} variant="danger" color="danger" 
                                                            onClick={() => this.deleteSubsSection(index)} >
                                                            <i className="fa fa-trash"></i>
                                                            </Button>
                                                    </td> */}
                                    </tr>
                                )
                            })}

                        </tbody>}
                    </Table>
                </CardBody>
                <CardFooter>
                    <Row>
                        <Col xs="12" md="6">
                            <Button type="button"
                                onClick={this.HandleSave.bind(this)}
                                size="sm" color="primary">
                                <i className="fa fa-dot-circle-o"></i> Submit
                            </Button> &nbsp;
                            <Button
                                type="reset"
                                style={{ textTransform: "uppercase" }}
                                onClick={() => this.props.history.push('/RubricList')}
                                size="sm" color="danger">
                                <i className="fa fa-ban"></i> Cancel
                            </Button>&nbsp;&nbsp;
                            <Link to={"/CheckTodayEntry"}  >
                                <Button color="primary" type="button"
                                > <i className="fa fa-dot-circle-o"></i>
                                    Check Today Entry
                                </Button>&nbsp;
                            </Link>
                        </Col>
                        <Col xs="12" md="6" style={{ textAlign: "right" }}>
                            <Label style={{ fontSize: 15, margin: 0, paddingTop: 5 }}> Fields marked with an asterisk <span className="required">*</span> are mandatory</Label>
                        </Col>
                    </Row>
                </CardFooter>
            </Card>
        )
    }

    deleteSubsSection = (index) => {
        debugger
        console.log('index===',index)
        var array = [...this.state.selectedauthorandremedy[0].rubricAuthorList]; // make a separate copy of the array

        if (index !== -1) {
            array.splice(index, 1);
            this.state.selectedauthorandremedy[0].rubricAuthorList=array
            this.setState({ selectedauthorandremedy:this.state.selectedauthorandremedy});
        }
    }

    addSelectedSubSectionQuestions() {
        debugger
        if(this.state.RemedyIds.length!=0 && this.state.authorIds.length!=0)
        {
        const existingIndex = this.state.selectedauthorandremedy.findIndex(item =>
            item.remedyId === this.state.RemedyIds.value
        );
    
        if (existingIndex !== -1) {
            const existingEntry = this.state.selectedauthorandremedy[existingIndex];

            this.state.authorIds.forEach(author => {
                const isAuthorAlreadyAdded = existingEntry.rubricAuthorList.some(existingAuthor => existingAuthor.authorId === author.value);

                if (!isAuthorAlreadyAdded) {
                    let obj = {
                        authorId: author.value,
                        authorName: author.label,
                        remedyRubricAuthorId:0
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
                authorId: author.value,
                authorName: author.label,
                remedyRubricAuthorId:0
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

    GetAllAuthor = () => {
        debugger
        CommonServices.getData(`/Author/GetData`).then((result) => {
            debugger
            this.setState({
                RepertoryAuthor: result
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
        debugger
        var rubricRemedyDetailsModel = {
            SubSectionId: SubSectionId,
            GradeId: GradeId
        }
        return CommonServices.postData(rubricRemedyDetailsModel, `/mastersAPI/GetRemedies`).then((remadies) => {
            console.log(remadies.data);

            return remadies.data;
            // this.setState({
            //     RemedyModel: remadies
            // })
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
        var subsectionList 
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
        debugger;
        const options = [];
        var subsectionList = this.state.SubSectionModel;
        await this.GetAllRemedies(this.state.SubSectionId, this.state.GradeId).then((result) => {
            subsectionList = result;
            console.log('data===>>', result)
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

    /**
     * Save Remedies for section
     */

    HandleSave = () => {
        debugger;
    //   this.state.selectedauthorandremedy.forEach(element => {
    //         debugger;
    //       element.SectionId=parseInt(this.state.SectionId)
    //       element.SubSectionId=parseInt(this.state.SubSectionId)
    //       element.GradeId=parseInt(this.state.GradeId)  
    //        element.enteredBy=parseInt(localStorage.getItem('UserId'))
    //        element.enteredDate=moment(new Date()).format('YYYY-MM-DD')
    //     });
        let obj = {
            "SectionId": parseInt(this.state.SectionId),
            "SubSectionId": parseInt(this.state.SubSectionId),
            "GradeId": parseInt(this.state.GradeId),
            "rubricRemedyAuthorList":this.state.selectedauthorandremedy
        }
        debugger
        CommonServices.postData(obj, `/RubricRemedy/SaveUpdateRubricRemedy`).then((result) => {
            debugger
            console.log(result);
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

    deleteRubricRemedyAuthor = (authorIndex,authorIndex2) => {
        debugger
        this.state.selectedauthorandremedy[authorIndex].rubricAuthorList.splice(authorIndex2, 1)
        this.setState({ selectedauthorandremedy:this.state.selectedauthorandremedy});
    }
}