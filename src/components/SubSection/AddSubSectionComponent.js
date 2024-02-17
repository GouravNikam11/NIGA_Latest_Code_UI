import React, { Component } from 'react';
import { Table, Col, FormGroup, Form, Row } from 'react-bootstrap';
import { Button, Card, CardBody, CardFooter, CardHeader, } from 'reactstrap';
import { Input, Label, Select } from 'reactstrap';
import CommonServices from '../../Services/CommonServices';
import { connect } from 'react-redux';
import '../../components/CommanStyle.css';
import {
    enqueueSnackbar as enqueueSnackbarAction,
    closeSnackbar
} from '../../store/actions/notification';
import AsyncPaginate from "react-select-async-paginate";
import { getSubSection } from '../../store/actions/Patient'
import { parseInt } from 'lodash';
import store from '../../store';
import { GET_SUBSECTION } from '../../store/actions/types'

export class AddSubSectionComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {

            sectionId: 0,
            parentSubSectionId: null,
            SubSectionId: 0,
            SubSectionName: '',
            SubSectionNameAlias: '',
            Description: '',
            SectionList: [],
            SubSectionList: [],
            EnteredBy: 'Admin',
            DeleteStatus: false,
            referencesectionId: 0,
            referenceSubSectionId: 0,
            referenceSubSectionIds: [],
            Getallsubsections: this.props.Getallsubsections,
            options: [],
            selectedreference: [],
            referencesection: [],
            errors: {},
            isLoadTable: false,
            referencerubric: [],
            languageId: 0,
            LanguageList: [],
            SubSectionDetails: '',
            SubSectionDetailsList: [],
            subSectionLanguageDetails: []

        }
        // this.SubsectionAlieshandleChange=this.SubsectionAlieshandleChange.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.submitForm = this.submitForm.bind(this);

    }

    componentDidMount() {
        debugger
        this.getSections();
        // this.getSubSection();
        this.getLanguage();

    }
    /**
        * handleSectionChanges
        */
    handleSectionChanges(e) {
        this.setState({
            sectionId: e.target.value,
            SubSectionId: null,
        })

    }

    addLanguageDetails() {
        debugger
        const selectedLanguage = this.state.LanguageList.find(
            (language) => language.languageId === parseInt(this.state.languageId)
        );
        console.log('selectedLanguage=', selectedLanguage)
        var obj = {

            languageId: this.state.languageId,
            languageName: selectedLanguage.languageName,
            SubSectionDetails: this.state.SubSectionDetails,
        }
        this.state.SubSectionDetailsList.push(obj);
        console.log('SubSectionDetailsList==', this.state.SubSectionDetailsList)
        this.setState({
            languageId: 0,
            SubSectionDetails: ''
        })
    }

    async handleSectionChangesforrefernce(e) {
        debugger
        console.log('e=======', e.target.options[e.target.selectedIndex].text);

        let obj = {
            sectionId: e.target.value,
            sectionName: e.target.options[e.target.selectedIndex].text
        }
        if (e != null) {
            this.setState({
                referencesectionId: e.target.value,
                referencesection: obj
            })
        }
        else {
            this.setState({
                referencesectionId: 0
            })

        }
        //await store.dispatch({ type: GET_SUBSECTION, Getallsubsections: [] });
        //this.setState({ SubSectionList: [] })
        /* this.getSubSection(parseInt(e.target.value)) */
    }
    renderSectionList = () => {
        if (this.state.SectionList == undefined) {
            return null;
        }
        return this.state.SectionList.map((section, index) => {
            return <option key={index} value={section.sectionId}>{section.sectionName}</option>
        })
    }



    renderLanguageList = () => {
        if (this.state.LanguageList == undefined) {
            return null;
        }
        return this.state.LanguageList.map((language, index) => {
            return <option key={index} value={language.languageId}>{language.languageName}</option>
        })
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

    // renderParentSub = () => {
    //     if (this.state.SubSectionList == undefined) {
    //         return null;
    //     }
    //     return this.state.SubSectionList.filter(state => state.sectionId == this.state.sectionId).map((subsection, index) => {
    //         return <option key={index} value={subsection.subSectionId}>{subsection.subSectionName}</option>
    //     });
    // }

    loadOptions = async (search, prevOptions) => {
        debugger
        const options = [];
        var subsectionList
        // var RepertoryAuthor = this.props.Getallsubsections.filter(state => state.sectionId == this.state.referencesectionId);
        // console.log('temp===',RepertoryAuthor.length)
        await this.getSubSection(parseInt(this.state.referencesectionId)).then((result) => {
            subsectionList = result;
        })
        subsectionList.map(x => options.push({ value: x.subSectionId, label: x.subSectionName }));
        console.log('options===', options)
        let filteredOptions = [];
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
                SubSectionId: e.value
            })
        }
        else {
            this.setState({
                SubSectionId: 0
            })

        }
    }

    GetParentSubsections = async (sectionId) => {
        var subSectionsList = [];
        return (CommonServices.getDataById(sectionId, `/DropdownList/GetSubsectionBySection`).then((subSections) => {
            subSectionsList = subSections;
            return subSectionsList;

        }))
    }

    ReferenceSubSectionChanged = (e) => {
        debugger;
        if (e != null) {
            this.setState({
                referenceSubSectionIds: e,
            }, () => {
            })
        }
    }



    render() {
        const ReferenceSubSectionId = this.state.referencesectionId;
        const counter = this.state.sectionId;

        // const CustomOption = ({ label, value, isSelected, selectOption }) => (
        //     <div>
        //         <label>
        //             <input
        //                 type="checkbox"
        //                 checked={isSelected}
        //                 onChange={() => selectOption({ label, value })}
        //             />
        //             {label}
        //         </label>
        //     </div>
        // );


        return (
            <Card>
                <CardHeader>
                    <i className="fa fa-align-justify"></i>
                    Add SubSection
                </CardHeader>
                <CardBody>
                    <Form encType="multipart/form-data" className="form-horizontal">
                        <Row>
                            <Col xs="12" md="4">
                                <FormGroup >
                                    <Label className="label" htmlFor="">Sub Section Name
                                        <span className="required">*</span> :</Label>

                                    <Form.Control type="text" placeholder="Sub Section Name"
                                        name="SubSectionName"
                                        onChange={this.handleChange}
                                        value={this.state.SubSectionName === null ? '' : this.state.SubSectionName} />
                                    <span className="error">{this.state.errors["SubSectionName"]}</span>

                                </FormGroup>
                            </Col>
                            <Col xs="12" md="4">
                                <FormGroup >
                                    <Label className="label" htmlFor="">Sub Section Name Alias :</Label>

                                    <Form.Control type="text" placeholder="Sub Section Name Alias"
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
                                    <Label className="label" htmlFor="">Section Name
                                        <span className="required">*</span> :</Label>

                                    <Form.Control as="select"
                                        name="sectionId"

                                        onChange={this.handleSectionChanges.bind(this)}
                                        value={this.state.sectionId}>
                                        <option value="0">
                                            Select Section
                                        </option>
                                        {
                                            this.renderSectionList()
                                        }
                                    </Form.Control>
                                </FormGroup>
                                <span className="error">{this.state.errors["sectionId"]}</span>
                            </Col>
                            <Col xs="12" md="4">
                                <FormGroup >
                                    <Label className="label" htmlFor="">Parent Sub Section :</Label>
                                    {/* <Form.Control as="select"
                                        name="parentSubSectionId"
                                        onChange={this.handleChange}
                                        value={this.state.subSectionId}>
                                        <option value="0">
                                            Select Parent Sub Section
                                        </option>
                                        {
                                            this.state.sectionId !== 0 ?
                                                this.renderParentSub()
                                                : null
                                        }
                                    </Form.Control> */}

                                    <AsyncPaginate
                                        isClearable
                                        key={counter}
                                        cacheOptions={counter}
                                        labelKey="value"
                                        labelValue="subSectionId"
                                        placeholder="Type Sub-Section"
                                        value={this.state.subSectionId}
                                        loadOptions={this.loadParentSubOptions.bind(this)}
                                        onChange={this.SubsectionChanged.bind(this)}
                                    />
                                </FormGroup>
                            </Col>
                        </Row>



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
                                            this.state.SubSectionDetailsList.map((s, index) => {
                                                return <tr key={index}>
                                                    {/* <td className='fcol'>{s.SubSectionId}</td> */}
                                                    <td>{s.languageName}</td>
                                                    <td>{s.SubSectionDetails}</td>
                                                    <td className='lcol'>
                                                        {/* <Link to={"/EditAuthorComponent/" + s.authorId}>
                                                              <Button onClick={() => this.editAuthor(s.authorId)} ><i className="fa fa-pencil"></i></Button> 
                                                             </Link> */}
                                                        <Button style={{ marginLeft: 8 }} variant="danger" color="danger" onClick={() => this.deleteLanguageName(index)} ><i className="fa fa-trash"></i></Button>
                                                    </td>
                                                </tr>
                                            })
                                        }
                                    </tbody>
                                </Table>

                            </CardBody>
                        </Card>

                        <Card>
                            <CardHeader>
                                <i className="fa fa-align-justify"></i>
                                REFERENCE RUBRICS
                            </CardHeader>
                            <CardBody>
                                <Row>
                                    <Col xs="12" md="4">
                                        <FormGroup >
                                            <Label className="label" htmlFor=""> Reference Section Name
                                                <span className="required"></span> :</Label>

                                            <Form.Control as="select"
                                                name="referencesectionId"
                                                onChange={this.handleSectionChangesforrefernce.bind(this)}
                                                value={this.state.referencesectionId}>
                                                {/* <span className="error">{this.state.errors["referencesectionId"]}</span> */}
                                                <option value="0">
                                                    Select Reference Section
                                                </option>
                                                {
                                                    this.renderSectionList()
                                                }
                                            </Form.Control>
                                        </FormGroup>
                                        {/* <span className="error">{this.state.errors["sectionId"]}</span> */}
                                    </Col>

                                    <Col md="5">
                                        <Label className="label" htmlFor="">
                                            Select one or more reference sub section  :
                                        </Label>

                                        <AsyncPaginate
                                            isClearable
                                            isMulti
                                            key={ReferenceSubSectionId}
                                            cacheOptions={ReferenceSubSectionId}
                                            placeholder="Type Reference Sub Section"
                                            value={this.state.referenceSubSectionIds}
                                            loadOptions={this.loadOptions.bind(this)}
                                            onChange={this.ReferenceSubSectionChanged.bind(this)}
                                        />


                                        {/* <AsyncPaginate
                                            isClearable
                                            isMulti
                                            key={ReferenceSubSectionId}
                                            cacheOptions={ReferenceSubSectionId}
                                            placeholder="Type Reference Sub Section"
                                            value={this.state.referenceSubSectionIds}
                                            loadOptions={this.loadOptions}
                                            components={{
                                                Option: CustomOption,
                                            }}
                                            menuIsOpen={this.state.menuIsOpen}
                                            onMenuOpen={() => this.setState({ menuIsOpen: true })}
                                            onMenuClose={() => this.setState({ menuIsOpen: false })}
                                            onChange={this.ReferenceSubSectionChanged.bind(this)}
                                        /> */}
                                    </Col>
                                    <Col md="3">
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
                            </CardBody>
                        </Card>
                    </Form>
                    <Table style={{ width: '100%' }} striped bordered hover>
                        <thead>
                            <tr>
                                <th>Reference Section Name</th>
                                <th>Reference SubSection Name</th>
                            </tr>
                        </thead>
                        {this.state.isLoadTable && <tbody>

                            {this.state.selectedreference.map((item, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{item.sectionName}</td>
                                        {
                                            item.selectsubsectionlist.map((author, index) => {
                                                return <tr key={index}>
                                                    <td>{author.subSectionName}</td>

                                                </tr>
                                            })
                                        }

                                    </tr>
                                )
                            })}

                        </tbody>}
                    </Table>


                </CardBody>
                <CardFooter>
                    <Row>
                        <Col xs="12" md="6">
                            <Button
                                type="button"
                                style={{ textTransform: "uppercase" }}
                                onClick={this.submitForm}
                                size="sm" color="primary">
                                <i className="fa fa-save"></i> Save
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

    deleteLanguageName = (index) => {
        var array = [...this.state.SubSectionDetailsList]; // make a separate copy of the array

        if (index !== -1) {
            array.splice(index, 1);
            this.setState({ SubSectionDetailsList: array });
        }
    }


    addSelectedSubSectionQuestions() {
        var copyTableData = [this.state.referencesection];
        console.log("this.state.referencesection====>>>>", this.state.referencesection)
        debugger;
        copyTableData.forEach(element => {
            debugger;
            let obj = {
                sectionId: element.sectionId,
                sectionName: element.sectionName,
                selectsubsectionlist: []
            }
            this.state.selectedreference.push(obj)
        });

        var copyTableData = this.state.referenceSubSectionIds;
        debugger;
        copyTableData.forEach(element => {
            console.log("printed====>>>>", element)
            let obj = {
                subSectionId: element.value,
                subSectionName: element.label,
            }
            this.state.selectedreference[this.state.selectedreference.length - 1].selectsubsectionlist.push(obj)
        });
        this.setState({
            isLoadTable: true,
            referenceSubSectionIds: '',
            referencesectionId: '',
        })
        console.log('selectedauthorandremedy===', this.state.selectedreference)
    }


    handleChange(e) {
        debugger
        //console.log('lable==',)
        this.setState({ [e.target.name]: e.target.value })

    }

    validateForm() {
        let fields = this.state;

        let errors = {};
        let isFormValid = true;

        if (fields.SubSectionName == "") {
            isFormValid = false;
            errors["SubSectionName"] = "Please enter sub section name"
        }

        if (fields.sectionId == "") {
            isFormValid = false;
            errors["sectionId"] = "Please select section name"
        }

        this.setState({ errors });
        return isFormValid;
    }


    getSections() {
        CommonServices.getData(`/mastersAPI/GetSections`).then((temp) => {
            debugger
            this.setState({
                SectionList: temp
            })
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

    getSubSection(referencesectionId) {
        return (CommonServices.getDataById(referencesectionId, `/subsection/GetSubSections`).then((temp) => {
            this.setState({
                SubSectionList: temp,
            });
            return temp;
        }));
    }
    submitForm(e) {
        debugger
        if (this.validateForm()) {
            e.preventDefault();
            console.log('this.state.selectedreference=====+++++', this.state.selectedreference)
            var copyTableData = this.state.selectedreference;
            copyTableData.forEach(element => {
                debugger;
                element.selectsubsectionlist.forEach(subsection => {
                    let obj = {
                        RefSubSectionId: subsection.subSectionId,
                        enteredBy: parseInt(localStorage.getItem('UserId')),
                        changedBy: parseInt(localStorage.getItem('UserId')),
                        changedDate: '',
                        deleteStatus: false
                    };
                    this.state.referencerubric.push(obj);
                });
            });



            this.state.SubSectionDetailsList.forEach(element => {
                debugger;
                let languageobj = {
                    "languageId": element.languageId,
                    "subSectionDetails": element.SubSectionDetails
                }
                this.state.subSectionLanguageDetails.push(languageobj)
            });

            let Obj = {
                "sectionId": this.state.sectionId,
                "parentSubSectionId": this.state.SubSectionId,
                "subSectionName": this.state.SubSectionName,
                "subSectionNameAlias": this.state.SubSectionNameAlias,
                "description": this.state.Description,
                "enteredBy": localStorage.getItem("UserId"),
                "deleteStatus": false,
                "referencerubric": this.state.referencerubric,
                "subSectionLanguageDetails": this.state.subSectionLanguageDetails
            }

            debugger

            console.log('Obj==', Obj)
            debugger;
            CommonServices.postData([Obj], `/subsection`).then((responseMessage) => {
                //  alert(responseMessage.data);
                this.props.enqueueSnackbarAction(responseMessage.data);
                this.props.history.push('/ListSubSection');
            }).catch(error => {
                console.log("error", error);
                debugger;
            });
            this.setState({
                sectionId: 0,
                SubSectionId: 0,
                //sectionId: 0,
                parentSubSectionId: null,
                SubSectionName: "",
                SubSectionNameAlias: "",
                Description: "",
                EnteredBy: 'Admin',
                DeleteStatus: false,
            });
            store.dispatch({ type: GET_SUBSECTION, Getallsubsections: [] })
        }
    }
}
const mapStateToProps = (state) => ({
    Getallsubsections: state.patient.Getallsubsections,

});

const mapDispatchToProps = {
    getSubSection,
    enqueueSnackbarAction, closeSnackbar
}

// { enqueueSnackbarAction, closeSnackbar }
export default connect(mapStateToProps, mapDispatchToProps)(AddSubSectionComponent)
