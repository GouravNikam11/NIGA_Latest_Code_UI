import React, { Component } from 'react';
import { Table, Col, FormGroup, Form, Row } from 'react-bootstrap';
import { Button, Card, CardBody, CardFooter, CardHeader, } from 'reactstrap';
import { Input, Label, Select } from 'reactstrap';
import CommonServices from '../../Services/CommonServices';
import { connect } from 'react-redux';
import '../../components/CommanStyle.css';
import AsyncPaginate from "react-select-async-paginate";
import {
    enqueueSnackbar as enqueueSnackbarAction,
    closeSnackbar
} from '../../store/actions/notification';

export class EditSubSectionComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            mainsubSectionId: 0,
            subSectionId: 0,
            sectionId: 0,
            parentSubSectionId: 0,
            SubSectionName: '',
            SubSectionNameAlias: '',
            Description: '',
            SubSectionList: [],
            SectionList: [],
            EnteredBy: 'Admin',
            referencerubric: [],
            subSectionLanguageDetails: [],
            DeleteStatus: false,
            languageId: 0,
            SubSectionDetails: '',
            SubSectionDetailsList: [],
            referencesectionId: 0,
            referencesection: [],
            referencesectionname: '',
            referenceSubSectionId: '',
            referenceSubSectionName: '',
            NewParentSubsection: [],
        }
        this.handleChange = this.handleChange.bind(this);
        this.submitForm = this.submitForm.bind(this);
    }

    async componentDidMount() {
        debugger;
        var Id = this.props.match.params.id;
        await this.editSubSection(Id);
        await this.getSections();
        await this.getLanguage();
        this.setState({
            subsectionId: Id
        });
        await this.getSubSection();
        this.setState({
            SectionId: Id
        });

    }




    /**
        * handleSectionChanges
        */
    handleSectionChanges(e) {
        this.setState({
            sectionId: e.target.value
        })
    }
    renderSectionList = () => {
        if (this.state.SectionList === undefined) {
            return null;
        }
        return this.state.SectionList.map((section, index) => {
            return <option key={index} value={section.sectionId}>{section.sectionName}</option>
        })
    }
    renderParentSub = () => {
        if (this.state.SubSectionList === undefined) {
            return null;
        }
        return this.state.SubSectionList.filter(state => state.sectionId === this.state.sectionId).map((subsection, index) => {
            return <option key={index} value={subsection.subSectionId}>{subsection.subSectionName}</option>
        });
    }


    renderReferenceSubSection = () => {
        debugger
        if (this.state.SubSectionList === undefined) {
            return null;
        }
        return this.state.SubSectionList.filter(state => state.sectionId === parseInt(this.state.referencesectionId)).map((subsection, index) => {
            return <option key={index} value={subsection.subSectionId}>{subsection.subSectionName}</option>
        });
    }


    renderLanguageList = () => {
        if (this.state.LanguageList == undefined) {
            return null;
        }
        return this.state.LanguageList.map((language, index) => {
            return <option key={index} value={language.languageId}>{language.languageName}</option>
        })
    }

    getLanguage() {
        CommonServices.getData(`/LanguageMaster`).then((temp) => {
            debugger
            this.setState({
                LanguageList: temp
            })
        })
    }

    addLanguageDetails() {
        debugger
        const selectedLanguage = this.state.LanguageList.find(
            (language) => language.languageId === parseInt(this.state.languageId)
        );
        console.log('selectedLanguage=', selectedLanguage)
        var obj = {

            languageId: parseInt(this.state.languageId),
            languageName: selectedLanguage.languageName,
            subSectionDetails: this.state.SubSectionDetails,
            subSectionId: this.state.mainsubSectionId
        }
        this.state.SubSectionDetailsList.push(obj);
        console.log('SubSectionDetailsList==', this.state.SubSectionDetailsList)
        this.setState({
            languageId: 0,
            languageName: '',
            SubSectionDetails: ''
        })
    }

    deleteLanguageName = (index, subSectionLanguageId) => {
        var array = [...this.state.SubSectionDetailsList]; // make a separate copy of the array  

        if (index !== -1) {
            array.splice(index, 1);
            this.setState({ SubSectionDetailsList: array });
        }
        CommonServices.postData({ "subSectionLanguageId": subSectionLanguageId }, `/subsection/DeleteSubSectionLanguageDetails`).then((res) => {
            debugger
            console.log('res=======', res)

        });
    }


    Deletereferencerubric = (index, referenceRubricId) => {
        debugger
        console.log('referenceRubricId==', referenceRubricId)
        console.log('index===', index)
        var array = [...this.state.referencerubric]; // make a separate copy of the array  
        if (index !== -1) {
            array.splice(index, 1);
            this.setState({ referencerubric: array });
        }
        CommonServices.postData({ "referenceRubricId": referenceRubricId }, `/subsection/DeleteReferenceRubricDetails`).then((res) => {
            debugger
            console.log('res=======', res)

        });
    }


    handleSectionChangesforrefernce(e) {
        debugger
        console.log('e=======', e.target.options[e.target.selectedIndex].text)
        if (e != null) {
            this.setState({
                referencesectionId: e.target.value,
                referencesectionname: e.target.options[e.target.selectedIndex].text
            })
        }
        else {
            this.setState({
                referencesectionId: 0
            })
        }
    }

    handleReferenceSubSectionChanges(e) {
        debugger
        console.log('e=======', e.target.options[e.target.selectedIndex].text)
        if (e != null) {
            this.setState({
                referenceSubSectionId: e.target.value,
                referenceSubSectionName: e.target.options[e.target.selectedIndex].text
            })
        }
        else {
            this.setState({
                referenceSubSectionId: 0
            })
        }
    }

    addSelectedSubSectionQuestions() {
        let obj = {
            sectionId: parseInt(this.state.referencesectionId),
            sectionName: this.state.referencesectionname,
            refSubSectionId: parseInt(this.state.referenceSubSectionId),
            enteredBy: null,
            enteredDate: null,
            changedBy: null,
            changedDate: null,
            deleteStatus: null,
            refSubSectionName: this.state.referenceSubSectionName
        }
        this.state.referencerubric.push(obj)

        console.log('referencerubric==', this.state.referencerubric)
        this.setState({
            referencesectionId: 0,
            referencesectionname: '',
            referenceSubSectionId: 0,
            referenceSubSectionName: ''
        })
    }





    render() {
        const counter = this.state.sectionId;
        return (
            <Card>
                <CardHeader>
                    <i className="fa fa-align-justify"></i>
                    Edit SubSection
                </CardHeader>
                <CardBody>
                    <Form encType="multipart/form-data" className="form-horizontal">
                        <Row>
                            <Col xs="12" md="4">
                                <FormGroup >
                                    <Label className="label" htmlFor="">Sub Section Name :</Label>
                                    <Form.Control type="text" placeholder="SubSection Name"
                                        name="SubSectionName"
                                        onChange={this.handleChange}
                                        value={this.state.SubSectionName === null ? '' : this.state.SubSectionName} />
                                </FormGroup>
                            </Col>

                            <Col xs="12" md="4">
                                <FormGroup >
                                    <Label className="label" htmlFor="">Sub Section Name Alias :</Label>
                                    <Form.Control type="text" placeholder="SubSection Name Alias"
                                        name="SubSectionNameAlias"
                                        onChange={this.handleChange}
                                        value={this.state.SubSectionNameAlias === null ? '' : this.state.SubSectionNameAlias} />
                                </FormGroup>
                            </Col>

                            <Col xs="12" md="4">
                                <FormGroup >
                                    <Label className="label" htmlFor="">Description :</Label>
                                    <Form.Control type="text" placeholder="Description"
                                        name="Description"
                                        onChange={this.handleChange}
                                        value={this.state.Description === null ? '' : this.state.Description} />
                                </FormGroup>
                            </Col>
                        </Row>

                        <Row>
                            <Col xs="12" md="4">
                                <FormGroup >
                                    <Label className="label" htmlFor="">Section Name :</Label>
                                    <Form.Control as="select"
                                        name="sectionId"
                                        onChange={this.handleChange}
                                        value={this.state.sectionId}>
                                        <option value="0">
                                            Select Section
                                        </option>
                                        {
                                            this.renderSectionList()
                                        }
                                    </Form.Control>
                                </FormGroup>
                            </Col>

                            <Col xs="12" md="4">
                                <FormGroup >
                                    <Label className="label" htmlFor="">Parent Sub Section :</Label>
                                    {/* <Form.Control as="select"
                                        name="parentSubSectionId"
                                        onChange={this.handleChange}
                                        value={this.state.parentSubSectionId}>
                                        <option value="0">
                                            Select Parent Sub Section
                                        </option>
                                        {
                                            this.state.sectionId !== 0 ?
                                                this.renderParentSub()
                                                : null
                                        }

                                    </Form.Control> */}
                                    <AsyncPaginate isClearable
                                    key={counter}
                                    cacheOptions={counter}
                                    labelKey="value"
                                    labelValue="subSectionId"
                                    placeholder="Type Sub-Section"
                                    value={this.state.NewParentSubsection}
                                    loadOptions={this.loadParentSubOptions.bind(this)}
                                    onChange={this.SubsectionChanged.bind(this)}
                                />
                                </FormGroup>
                            </Col>
                        </Row>

                        {/* List Of Reference Rubrics Section */}
                        <Card>
                            <CardHeader>
                                <i className="fa fa-align-justify"></i>
                                List Of Reference Rubrics
                            </CardHeader>
                            <CardBody>
                                <Row>
                                    <Col xs="12" md="4">
                                        <FormGroup >
                                            <Label className="label" htmlFor="">Reference Section Name :</Label>
                                            <Form.Control as="select"
                                                name="referencesectionId"
                                                onChange={this.handleSectionChangesforrefernce.bind(this)}
                                                value={this.state.referencesectionId}>
                                                <option value="0">
                                                    Select Reference Section
                                                </option>
                                                {
                                                    this.renderSectionList()
                                                }
                                            </Form.Control>
                                        </FormGroup>
                                    </Col>

                                    <Col xs="12" md="4">
                                        <FormGroup >
                                            <Label className="label" htmlFor="">Select reference sub section :</Label>
                                            <Form.Control as="select"
                                                name="referenceSubSectionId"
                                                onChange={this.handleReferenceSubSectionChanges.bind(this)}
                                                value={this.state.referenceSubSectionId}>
                                                <option value="0">
                                                    Select reference sub section
                                                </option>
                                                {
                                                    this.state.referencesectionId !== 0 ?
                                                        this.renderReferenceSubSection()
                                                        : null
                                                }
                                            </Form.Control>
                                        </FormGroup>
                                    </Col>
                                    <Col xs="12" md="4">
                                        <FormGroup >
                                            <Button
                                                type="button"
                                                style={{ marginTop: 32 }}
                                                onClick={this.addSelectedSubSectionQuestions.bind(this)}
                                                size="sm" color="primary">
                                                <i className="fa fa-plus"></i> Add Reference Rubrics
                                            </Button>
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col xs="12" md="12">
                                        <Table bordered hover>
                                            <thead>
                                                <tr>
                                                    <th className='fcol'>#</th>
                                                    <th>Reference Section Name</th>
                                                    <th>Reference SubSection Name</th>
                                                    <th className='lcol'>Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    this.state.referencerubric.length > 0 ?
                                                        this.state.referencerubric.map((c, index) => {
                                                            return <tr key={index}>
                                                                <td className='fcol'>{c.sectionId}</td>
                                                                <td>{c.sectionName}</td>
                                                                <td>{c.refSubSectionName}</td>
                                                                <td className='lcol'>
                                                                    {/* <Button className=" btn-primary" variant="primary" onClick={() => this.editQuestion(c.questionsId)}><i className="fa fa-pencil"></i></Button> &nbsp; */}
                                                                    <Button className="btn btn-danger" variant="danger" onClick={() => this.Deletereferencerubric(index, c.referenceRubricId)}  ><i className="fa fa-trash"></i></Button>
                                                                </td>
                                                            </tr>
                                                        }) :
                                                        <tr>
                                                            <td colSpan="4">No data to display</td>
                                                        </tr>
                                                }
                                            </tbody>
                                        </Table>
                                    </Col>
                                </Row>
                            </CardBody>
                        </Card>


                        {/* Language  Reference Section */}
                        <Card>
                            <CardHeader>
                                <i className="fa fa-align-justify"></i>
                                Language  Reference
                            </CardHeader>
                            <CardBody>
                                <Row>
                                    <Col xs="12" md="4">
                                        <FormGroup >
                                            <Label className="label" htmlFor="">Language :</Label>
                                            <Form.Control as="select"
                                                name="languageId"
                                                onChange={this.handleChange}
                                                value={this.state.languageId}>
                                                <option value="0">
                                                    Select Language
                                                </option>
                                                {
                                                    this.renderLanguageList()
                                                }
                                            </Form.Control>
                                        </FormGroup>
                                    </Col>

                                    <Col md="5">
                                        <FormGroup >
                                            <Label className="label" htmlFor="">SubSectionDetails :</Label>
                                            <textarea placeholder="SubSectionDetails"
                                                name="SubSectionDetails"
                                                onChange={this.handleChange}
                                                value={this.state.SubSectionDetails === null ? '' : this.state.SubSectionDetails} >
                                            </textarea>
                                        </FormGroup>

                                    </Col>
                                    <Col md="3">
                                        <FormGroup >
                                            <Button

                                                type="button"
                                                style={{ marginTop: 32 }}
                                                onClick={this.addLanguageDetails.bind(this)}
                                                size="sm" color="primary">
                                                <i className="fa fa-plus"></i> Add Language Reference
                                            </Button>
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Table style={{ width: '100%' }} striped bordered hover>
                                    <thead>
                                        <tr>
                                            {/* <th className='fcol'>Sr.No</th> */}
                                            <th>Language</th>
                                            <th>Language Details</th>
                                            <th className='lcol'>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            this.state.SubSectionDetailsList.length > 0 ?
                                                this.state.SubSectionDetailsList.map((s, index) => {
                                                    return <tr key={index}>
                                                        {/* <td className='fcol'>{s.SubSectionId}</td> */}
                                                        <td>{s.languageName}</td>
                                                        <td>{s.subSectionDetails}</td>
                                                        <td className='lcol'>
                                                            {/* <Link to={"/EditAuthorComponent/" + s.authorId}>
                                                              <Button onClick={() => this.editAuthor(s.authorId)} ><i className="fa fa-pencil"></i></Button> 
                                                             </Link> */}
                                                            <Button style={{ marginLeft: 8 }} variant="danger" color="danger" onClick={() => this.deleteLanguageName(index, s.subSectionLanguageId)} ><i className="fa fa-trash"></i></Button>
                                                        </td>
                                                    </tr>
                                                })
                                                :
                                                <tr>
                                                    <td colSpan="4">No data to display</td>
                                                </tr>
                                        }
                                    </tbody>
                                </Table>

                            </CardBody>
                        </Card>
                    </Form>
                </CardBody>

                <CardFooter>
                    <Row>
                        <Col xs="12" md="6">
                            <Button
                                type="button"
                                style={{ textTransform: "uppercase" }}
                                onClick={this.submitForm}
                                size="sm" color="primary">
                                <i className="fa fa-save"></i> Update
                            </Button> &nbsp;
                            <Button
                                type="reset"
                                style={{ textTransform: "uppercase" }}
                                onClick={() => this.props.history.push('/ListSubSection')}
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







    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value })

    }

    getSections() {
        CommonServices.getData(`/mastersAPI/GetSections`).then((temp) => {
            this.setState({
                SectionList: temp
            })
        })
    }

    getSubSection() {
        CommonServices.getData(`/subsection/GetSubSections`).then((temp) => {
            this.setState({
                SubSectionList: temp,
            })
        });
    }
    submitForm() {
        debugger
        // console.log('reubricref==', this.state.referencerubric)
        // console.log('reubricref==', this.state.SubSectionDetailsList)

        let Obj = {
            "subSectionId": this.state.subsectionId,
            "sectionId": this.state.sectionId,
            "parentSubSectionId": this.state.NewParentSubsection.value,
            "subSectionName": this.state.SubSectionName,
            "subSectionNameAlias": this.state.SubSectionNameAlias,
            "description": this.state.Description,
            "enteredBy": localStorage.getItem("UserId"),
            "changedBy": localStorage.getItem("UserId"),
            "deleteStatus": false,
            "referencerubric": this.state.referencerubric,
            "subSectionLanguageDetails": this.state.SubSectionDetailsList
        }
        console.log('Obj==', Obj)
        debugger
        CommonServices.postData([Obj], `/subsection`).then((responseMessage) => {
            debugger
            console.log('responseMessage==', responseMessage.data)
            this.props.enqueueSnackbarAction(responseMessage.data);
            // alert(responseMessage.data);
            this.props.history.push('/ListSubSection');
        });
        this.setState({
            subSectionId: 0,
            sectionId: 0,
            parentSubSectionId: 0,
            SubSectionName: '',
            SubSectionNameAlias: '',
            Description: '',
            SubSectionList: [],
            SectionList: [],
            EnteredBy: 'Admin',
            referencerubric: [],
            subSectionLanguageDetails: [],
            DeleteStatus: false,
            languageId: 0,
            SubSectionDetails: '',
            SubSectionDetailsList: [],
            referencesectionId: 0,
            referencesection: [],
            referencesectionname: '',
            referenceSubSectionId: '',
            referenceSubSectionName: '',
        });
    }

    editSubSection(subsectionId) {
        debugger;
        if (subsectionId != undefined) {
            CommonServices.getDataById(parseInt(subsectionId), `/subsection`).then((res) => {

                let options = [];
                let obj={
                    value:res.parentSubSectionId,
                    label:res.parentSubSectionName
                }
                 options.push(obj);
                
                this.setState({
                    mainsubSectionId: res.subSectionId,
                    subsectionId: res.subSectionId,
                    SubSectionName: res.subSectionName,
                    SubSectionNameAlias: res.subSectionNameAlias,
                    Description: res.description,
                    sectionId: res.sectionId,
                    parentSubSectionId: res.parentSubSectionId,
                    referencerubric: res.referencerubric,
                    SubSectionDetailsList: res.subSectionLanguageDetails,
                    EnteredBy: 'Admin',
                    DeleteStatus: false,
                     NewParentSubsection:options[0]
                })
              
            });
        }
    }

    GetParentSubsections = async (sectionId) => {
        var subSectionsList = [];
        return (CommonServices.getDataById(sectionId, `/DropdownList/GetSubsectionBySection`).then((subSections) => {
            subSectionsList = subSections;
            return subSectionsList;

        }))
    }

    loadParentSubOptions = async (search, prevOptions) => {
        const options = [];
        var subsectionList 
        await this.GetParentSubsections(this.state.sectionId).then((result) => {
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

    SubsectionChanged(e) {
        debugger
        if (e != null) {
            this.setState({
                NewParentSubsection: e
            })
        }
        else {
            this.setState({
                NewParentSubsection: []
            })

        }
    }
}

export default connect(null, { enqueueSnackbarAction, closeSnackbar })(EditSubSectionComponent)
