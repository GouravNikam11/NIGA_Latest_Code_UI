
import React, { Component } from 'react';
import { Table, Col, FormGroup, Form, Row } from 'react-bootstrap';
import { Button, Card, CardBody, CardFooter, CardHeader, } from 'reactstrap';
import Select from "react-select";
import { Label, Input } from 'reactstrap';
import AsyncPaginate from "react-select-async-paginate";
import './MonoGram.css';
import DragSortableList from 'react-drag-sortable';
import CommonServices from '../../Services/CommonServices';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { makeStyles } from '@material-ui/core/styles';
import MailIcon from '@material-ui/icons/Mail';
import { Link } from '@material-ui/core';
import '../../components/CommanStyle.css';
import { connect } from 'react-redux';
import {
    enqueueSnackbar as enqueueSnackbarAction,
    closeSnackbar
} from '../../store/actions/notification';

class EditMonoGram extends Component {

    constructor(props) {
        super(props);
        this.state = {
            monogramId: 0,
            monogram1: '',
            enteredBy: '',
            keywords: '',
            isActive: true,
            subsectionId: 0,
            subsectionName: '',
            modelEx: [],
            selectedSubSection: '',
            SelectedSubSectionList: [],
            errors: {}
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }


    componentDidMount() {

        this.GetAllSections();

        var monogramId = this.props.match.params.monogramId;
        this.editMonogram(monogramId);

    }


    render() {
        const SectionList = this.state.SectionModel;
        const counter = this.state.SectionId;
        return (
            <Card>
                <CardHeader>
                    <i className="fa fa-align-justify"></i>
                    Add Monogram
                </CardHeader>
                <CardBody>
                    <Form encType="multipart/form-data" className="form-horizontal">
                        <Row>

                            <Col xs="12" md="4">
                                <FormGroup >
                                    <Label className="label" htmlFor="">Monogram
                                        <span className="required">*</span> :</Label>

                                    <Form.Control type="text" placeholder="Monogram"
                                        name="monogram1"
                                        defaultValue={this.props.monogram1}

                                        onChange={this.handleChange}
                                        value={this.state.monogram1 === null ? '' : this.state.monogram1} />
                                    <span className="error">{this.state.errors["monogram1"]}</span>
                                </FormGroup>
                            </Col>

                            <Col xs="12" md="4">
                                <FormGroup >
                                    <Label className="label" htmlFor="">Keywords:</Label>

                                    <Form.Control type="text" placeholder="Keywords"
                                        name="keywords"
                                        defaultValue={this.props.keywords}

                                        onChange={this.handleChange}
                                        value={this.state.keywords === null ? '' : this.state.keywords} />
                                </FormGroup>
                            </Col>

                            <Col xs="12" md="4">

                            </Col>
                        </Row>
                        <Row>
                            <Col xs="12" md="4">

                            </Col>
                        </Row>
                        <br></br>


                        <Row>
                            <Col xs="12" md="3">
                                <Label className="label" htmlFor="">
                                    Select Section
                                    <span className="required">*</span> :</Label>
                                <Input style={{ width: 240 }}
                                    type="select"
                                    name="SectionId"
                                    value={this.state.SectionId}
                                    defaultValue={this.props.SectionId}

                                    onChange={this.handleSetionChange.bind(this)} >
                                    <option value="0">Please select</option>
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
                                    name="subsectionId"
                                    defaultValue={this.props.subsectionId}

                                    placeholder="Type Sub-Section"
                                    value={this.state.selectedSubSection}
                                    loadOptions={this.loadOptions.bind(this)}
                                    onChange={(item) => this.SubsectionChanged(item)}
                                />
                                {/* <span className="error">{this.state.errors["subsectionId"]}</span> */}
                            </Col>

                            <Col xs="12" md="2">
                                <FormGroup >
                                    <Button

                                        type="button"
                                        style={{ marginTop: 32 }}
                                        onClick={this.addSelectedSubSectionQuestions.bind(this)}
                                        size="sm" color="primary">
                                        <i className="fa fa-plus"></i> Add SubSection
                                    </Button>
                                </FormGroup>
                            </Col>
                        </Row>
                    </Form>

                    <Table style={{ width: '100%' }} striped bordered hover>
                        <thead>
                            <tr>
                                {/* <th className='fcol'>Sr.No</th> */}
                                <th>Sub Section Name</th>
                                <th className='lcol'>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.modelEx.map((s, index) => {
                                    return <tr key={index}>
                                        <td>{s.subsectionName}</td>

                                        <td className='lcol'>

                                            {/* <Link to={"/EditMonoGram/" + s.monogramId}>
                                            <Button onClick={() => this.editAuthor(s.monogramId)} ><i className="fa fa-pencil"></i></Button> 
                                        </Link> */}

                                            <Button style={{ marginLeft: 8 }} variant="danger" color="danger" onClick={() => this.deleteSubsSection(index)} ><i className="fa fa-trash"></i></Button>
                                        </td>
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
                                <i className="fa fa-save"></i> Update
                            </Button> &nbsp;
                            <Button
                                type="reset"
                                style={{ textTransform: "uppercase" }}
                                onClick={() => this.props.history.push('/ListMonoGram')}
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
        debugger
        let fields = this.state;
        debugger

        let errors = {};
        let isFormValid = true;

        if (fields.monogram1 == "") {
            isFormValid = false;
            errors["monogram1"] = "Please enter Monogram"
        }
        // if (fields.subsectionId == 0) {
        //     isFormValid = false;
        //     errors["subsectionId"] = "Please select subsection"
        // }
        this.setState({ errors });
        return isFormValid;
    }

    deleteSubsSection = (index) => {
        debugger
        var array = [...this.state.modelEx]; // make a separate copy of the array

        if (index !== -1) {
            array.splice(index, 1);
            this.setState({ modelEx: array });
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
        console.log('e.label====>>>>>', item.label)
        if (item != null) {
            this.setState({
                SubSectionId: item.value,
                SubSectionName: item.label,
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

    sleep = ms => new Promise(resolve => {
        setTimeout(() => {
            resolve();
        }, ms);
    });

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


    /*For type and search dropdown Existance */
    handleSelect(data) {
        //console.log('pranavsir++++====>>>>>',data)
        this.setState({
            selectedOptions: data,
        })
    }


    /**
     * Method to handle submit event of form
     * @param {*} event 
     */
    handleClick(event) {
        event.preventDefault();
    }


    addSelectedSubSectionQuestions() {
        debugger;
        if (this.state.selectedSubSection == "") {
            alert("Please select Sub Section");
        }
        else {
            //var newQuestionprop = { content: (<div id="0" >{this.state.SubSectionId}</div>) };
            var obj = {
                subsectionId: this.state.selectedSubSection.value,
                subsectionName: this.state.selectedSubSection.label,

            }
            debugger
            console.log('Tufan-------------', obj)

            this.state.modelEx.push(obj)



            this.setState({
                selectedSubSection: null

            });
        }
    }


    handleSave() {
        debugger

        var item = {
            monogramId: this.state.monogramId,
            monogram1: this.state.monogram1,
            keywords: this.state.keywords,
            enteredBy: parseInt(localStorage.getItem('UserId')),
            isActive: true,
            modelEx: this.state.modelEx,
        }

        var copyTableData = this.state.SelectedSubSectionList;
        console.log('copyTableData===>>>>>>>>-------', copyTableData)
        debugger;
        copyTableData.forEach(element => {
            let obj = {
                subsectionId: element.subsectionId,
                isDeleted: false,

            }
            this.state.modelEx.push(obj)
        });

        debugger
        console.log('>>>>>>>', item)


        if (this.validateForm()) {

            CommonServices.postData(item, `/Monogram`).then((res) => {
                debugger;
                if (res.data == undefined) {
                    alert('All field are requerd', res.data);
                    this.props.history.push('/AddMonoGram');
                }
                else {
                    alert('Record Update Successfully', res.data);
                    this.props.history.push('/ListMonoGram');
                    this.setState({

                        monogram1: '',
                        enteredBy: '',
                        keywords: '',
                        isActive: true,
                        subsectionId: 0,
                        SubSectionName: '',
                        modelEx: [],
                        selectedSubSection: '',
                        SelectedSubSectionList: [],
                    })
                }
            })

        }
    }

    getSections() {
        CommonServices.getData(`/section`).then((result) => {
            let data = result.map((value, index) => {
                let subSectonList = value.listSubSectionModel;
                return {
                    subSectionName: value.sectionName,
                    subSectionId: value.sectionId,
                }
            });
            this.setState({
                treeNodes: data
            });
        });
    }


    editMonogram(monogramId) {
        debugger;
        if (monogramId != undefined) {
            CommonServices.getDataByIdmonogram(monogramId, `/Monogram/MonogramById?MonogramId=`).then((res) => {
                debugger;
                this.setState({
                    monogramId: res.monogramId,
                    monogram1: res.monogram1,
                    keywords: res.keywords,
                    enteredBy: '',
                    isActive: true,
                    modelEx: res.modelEx,

                })
            });
        }
    }
}
export default connect(null, { enqueueSnackbarAction, closeSnackbar })(EditMonoGram)
