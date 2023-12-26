//========================================================================================//
import React, { Component, Fragment } from 'react';
import CommonServices from '../../Services/CommonServices';
import { Link } from 'react-router-dom';
import { withSnackbar } from 'notistack';
import { connect } from 'react-redux';
import {
    Badge,
    Card,
    CardBody,
    CardHeader,
    Col,
    Pagination,
    PaginationItem,
    PaginationLink,
    Row,
    Table,
    Collapse,
    Form,
    Input,
    FormGroup,
} from 'reactstrap';
//========================================================================================//
/**
 * Created Date     :   19 March 2020
 * Purpose          :   Component to find rubrics.
 * Author           :   Chandrashekhar Salagar.
 */

class FindRubricsComponent extends Component {
    /**
     * Constructor to initialize class state.
     * @param {*} props 
     */
    constructor(props) {
        super(props);
        this.state = {
            SectionMaster: [],
            HeaderName: '',
            SelectedSubSection: -1,
            collapse: false,
            Remedies: [],
            GradeStyle: [],
            SelectdetGrade: -1,
            StripBackGroundColor: "",
            isDataFetched: false,
            isBodyPartsFetched: false,
            SectionBodyParts: [],
            searchSection: '',
            searchBodyPart: '',
            subsections: {},
            isSubSectionFetched: false
        }
    }

    /**
     * componentDidMount
     */
    componentDidMount = () => {
        this.GetSections();
    }

    /**
     * handle changge events of search bars
     * @param {*} e 
     */
    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value })
    }

    /**
     * render
     */
    render() {
        var { SectionBodyParts, SectionMaster } = this.state;//Destructuring of state.

        //apply filters//
        if (this.state.searchSection != '') {
            SectionMaster = this.state.SectionMaster.filter(value => {
                if (value.sectionName.toLowerCase().includes(this.state.searchSection.toLowerCase())) {
                    return value;
                }
            })

        }

        if (this.state.searchBodyPart != '') {
            SectionBodyParts = this.state.SectionBodyParts.filter(value => {
                if (value.bodyPartName.toLowerCase().includes(this.state.searchBodyPart.toLowerCase())) {
                    return value;
                }
            })

        }

        var bgColor = [];
        if (this.state.StripBackGroundColor) {
            bgColor = {
                backgroundColor: "#eee",
            }
        }
        else {
            bgColor = {
                backgroundColor: "",
            }
        }
        return (
            <div className="animated fadeIn">
                <Row>
                    <Col md="3">
                        <Card>
                            <CardHeader>
                                <Row>
                                    <Col >
                                        <Input type="text"
                                            placeholder="Type And Search..."
                                            name='searchSection'
                                            value={this.state.searchSection ? this.state.searchSection : ''}
                                            onChange={this.handleChange.bind(this)}
                                        />
                                    </Col>
                                </Row>
                            </CardHeader>
                            <CardBody>
                                <div responsive="true" style={{ overflowY: 'scroll', height: '600px' }}>
                                    <Table responsive>
                                        <thead>
                                            <tr>
                                                <th>Section</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                this.state.isDataFetched == true && SectionMaster != undefined ?
                                                    SectionMaster.map((section, index) => {
                                                        return (
                                                            <tr key={index} onClick={() => this.GetBodyParts((section.sectionId))}
                                                                onMouseOver={() => this.ShowButtons(index)}
                                                                onMouseLeave={() => this.HideButtons(index)}
                                                                style={this.state.SelectdetGrade == index ? bgColor : null}
                                                            >
                                                                <td>
                                                                    {section.sectionName}
                                                                </td>
                                                            </tr>
                                                        )
                                                    }) :
                                                    <tr>
                                                        <td colSpan='5' style={{ textAlign: 'center', fontSize: '25px' }}>
                                                            Loading...
                                                        </td>
                                                    </tr>
                                            }

                                        </tbody>
                                    </Table>
                                </div>
                            </CardBody>
                        </Card>
                    </Col>
                    {
                        this.state.isBodyPartsFetched == true ?
                            <Col sm="12" md="3">
                                <Card>
                                    <CardHeader>
                                        <Row>
                                            <Col >
                                                <Input type="text"
                                                    placeholder="Type And Search..."
                                                    name='searchBodyPart'
                                                    value={this.state.searchBodyPart ? this.state.searchBodyPart : ''}
                                                    onChange={this.handleChange.bind(this)}
                                                />
                                            </Col>
                                        </Row>
                                    </CardHeader>
                                    <CardBody>
                                        <div responsive="true" style={{ overflowY: 'scroll', height: '600px' }}>
                                            <Table responsive>
                                                <thead>
                                                    <tr>
                                                        <th>Body Part</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        this.state.isBodyPartsFetched == true ?
                                                            SectionBodyParts.map((BodyPart, index) => {

                                                                return (
                                                                    <tr key={index}
                                                                        onMouseOver={() => this.ShowButtons(index)}
                                                                        onMouseLeave={() => this.HideButtons(index)}
                                                                        onClick={() => this.handleBodyPartClick(BodyPart.bodyPartId)}
                                                                        style={this.state.SelectdetGrade == index ? bgColor : null}
                                                                    >
                                                                        <td
                                                                        >
                                                                            {BodyPart.bodyPartName}
                                                                        </td>
                                                                    </tr>
                                                                )
                                                            }) :
                                                            <tr>
                                                                <td colSpan='5' style={{ textAlign: 'center', fontSize: '25px' }}>
                                                                    Loading...
                                                                </td>
                                                            </tr>
                                                    }

                                                </tbody>
                                            </Table>
                                        </div>
                                    </CardBody>
                                </Card>
                            </Col> : null
                    }

                    {
                        this.state.isSubSectionFetched == true ?
                            <Col sm="12" md="6">
                                <Card>
                                    <CardHeader>
                                        <Row>
                                            <Col sm="6" >
                                                <Input type="text"
                                                    placeholder="Type And Search..."
                                                />
                                            </Col>
                                        </Row>
                                    </CardHeader>
                                    <CardBody>
                                        <div responsive="true" style={{ overflowY: 'scroll', height: '600px' }}>
                                            <Table responsive>
                                                <thead>
                                                    <tr>
                                                        <th>Sub Sections</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        this.state.isSubSectionFetched == true ?
                                                            this.state.subsections.map((subsection, index) => {

                                                                return (
                                                                    <tr key={subsection.subSectionId}
                                                                    >
                                                                        <td
                                                                        >
                                                                            {subsection.subSectionName}
                                                                        </td>
                                                                    </tr>
                                                                )
                                                            }) :
                                                            <tr>
                                                                <td colSpan='5' style={{ textAlign: 'center', fontSize: '25px' }}>
                                                                    Loading...
                                                                </td>
                                                            </tr>
                                                    }

                                                </tbody>
                                            </Table>
                                        </div>
                                    </CardBody>
                                </Card>
                            </Col> : null
                    }

                </Row>
            </div>
        );
    }


    /**
   * Get all the sections
   */
    GetSections() {
        CommonServices.getData(`/mastersAPI/GetSections`)
            .then((result) => {
                debugger;
                console.log(result);
                this.setState({
                    SectionMaster: result,
                    isDataFetched: true
                })
            })
            .catch((err) => {
                debugger;
            });
    }

    /**
     * ShowButtons
     */
    ShowButtons = (index) => {
        this.setState({
            SelectdetGrade: index,
            StripBackGroundColor: "red"
        })
    }

    /**
     * HideButtons
     */
    HideButtons = (index) => {
        this.setState({
            SelectdetGrade: -1,
            StripBackGroundColor: ""
        })
    }

    GetBodyParts = SectionId => {
        CommonServices.getDataById(SectionId, `/bodypart/GetBodyPartsBySection`).then((result) => {
            if (result != undefined) {

                this.setState({
                    SectionBodyParts: result,
                    isBodyPartsFetched: true
                })
            }
        })
    };

    handleBodyPartClick = bodyPartId => {
        CommonServices.getDataById(bodyPartId, `/mastersAPI/GetSubSectionByBodyPart`)
            .then((result => {
                if (result != undefined) {
                    this.setState({
                        ...this.state,
                        subsections: result,
                        isSubSectionFetched: true
                    })
                }
            }))
    }


}

export default connect(null, null)(withSnackbar(FindRubricsComponent));