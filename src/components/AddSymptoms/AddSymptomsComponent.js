import React, { Component, Fragment } from 'react';
import CommonServices from '../../Services/CommonServices';
import { Link } from 'react-router-dom';
import { Badge, Card, CardBody, CardHeader, Col, Pagination, PaginationItem, PaginationLink, Row, Table, Collapse } from 'reactstrap';
import './SampleCSS.css'

/**
 * Created Date     :   14 Feb 2020
 * Author           :   Chandrashekhar Salagar
 * Purpose          :   This component will show all the cases.
*/
class Tables extends Component {
    /**
     * Constructor to initilize class state.
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
        }
    }
    /**
     * componentDidMount
     */
    componentDidMount() {
        this.GetSections();
    }

    /**
     * Render page
     */
    render() {
        const Sections = this.state.SectionMaster;
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
                   
                        <Card>
                            <CardHeader>
                                <i className="fa fa-align-justify"></i> Add Symptoms
                            </CardHeader>
                            <CardBody>
                                <Table responsive>
                                    <thead>
                                        <tr>
                                            <th>{this.state.HeaderName}</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            Sections ?
                                                Sections.map((section, index) => {
                                                    return (
                                                        <tr key={index} onMouseOver={() => this.ShowButtons(index)}
                                                            onMouseLeave={() => this.HideButtons(index)}
                                                            style={this.state.SelectdetGrade == index ? bgColor : null}
                                                        >
                                                            <td>
                                                                <a onClick={() => this.getRemedies(index, section.parentSubSectionID)}><i className="fa fa-play fa-xm"></i></a>
                                                                <Link to="#"
                                                                    onClick={() =>
                                                                        this.GetSubSection(section.sectionId, section.parentSubSectionID,
                                                                            section.sectionName)} key={index}
                                                                > {section.sectionName}</Link>
                                                                {
                                                                    (this.state.SelectedSubSection === index) && (section.parentSubSectionID != null) ?
                                                                        <Collapse isOpen={this.state.collapse} >
                                                                            <CardBody>
                                                                                <div>
                                                                                    {
                                                                                        this.state.Remedies.length > 0 ?
                                                                                            this.state.Remedies.map((Remedy, index) => {
                                                                                                var style = {
                                                                                                    fontSize: 'small',
                                                                                                    display: "inline",
                                                                                                    fontName: Remedy.fontName,
                                                                                                    fontStyle: Remedy.fontStyle,
                                                                                                    color: Remedy.fontColor,
                                                                                                }
                                                                                                return (
                                                                                                    <h3
                                                                                                        style={ style }
                                                                                                        key={index}>{Remedy.RemedyName} &nbsp;
                                                                                                    </h3>
                                                                                                )
                                                                                            }) : "No data"
                                                                                    }
                                                                                </div>

                                                                            </CardBody>
                                                                        </Collapse> : null
                                                                }

                                                            </td>
                                                            <td>
                                                                {
                                                                    this.state.SelectdetGrade === index ?
                                                                        (

                                                                            <Fragment>                                                                       <button style={{ float: 'right' }}>4</button>
                                                                                <button style={{ float: 'right' }}>3</button>
                                                                                <button style={{ float: 'right' }}>2</button>
                                                                                <button style={{ float: 'right' }}>1</button>
                                                                                <button style={{ float: 'right' }}>0</button>
                                                                            </Fragment>
                                                                        ) : null
                                                                }
                                                            </td>

                                                        </tr>
                                                    )
                                                }) : null
                                        }

                                    </tbody>
                                </Table>

                            </CardBody>
                        </Card>
             
                </Row>

            </div>

        );
    }

    /**
     * Get all the sections
     */
    GetSections() {
        CommonServices.getData(`/mastersAPI/GetSections`).then((result) => {
            console.log(result);
            this.setState({
                SectionMaster: result
            })
        });
    }

    /**
     * Get all subsection with section id
     */
    GetSubSection(sectionId, parentSubSectionID, sectionName) {
        if (parentSubSectionID != null) {
            this.setState({

                collapse: !this.state.collapse,
            })
        }
        var sectionModel = {
            SectionId: sectionId,
            ParentSubSectionID: parentSubSectionID,
            SectionAlias: 'Test',
            SectionName: 'Test'
        }
        CommonServices.postData(sectionModel, `/subsection/GetSubSectionsBySection`).then((result) => {
            console.log(result.data);
            this.setState({
                SectionMaster: result.data,
                HeaderName: sectionName,
            })
        })
    }

    getRemedies = (selectedSubindex, SubSectionId) => {

        if (selectedSubindex != undefined)
            CommonServices.getDataById(SubSectionId, `/remedy/GetRemediesBySubSection`).then((result) => {
                console.log(result);
                debugger;
                var remedyArray = [];
                if (result != undefined) {
                    result.map((x, index) => {
                        remedyArray.push(
                            {
                                RemedyName: x.remedyName,
                                fontName: x.fontName,
                                fontStyle: x.fontStyle,
                                fontColor: x.fontColor

                            }
                        )
                    });

                }
                console.log(remedyArray.toString());
                this.setState({
                    SelectedSubSection: selectedSubindex,
                    collapse: !this.state.collapse,
                    Remedies: remedyArray,
                })

            })
    }

    ShowButtons = (index) => {
        this.setState({
            SelectdetGrade: index,
            StripBackGroundColor: "red"
        })
    }

    HideButtons = (index) => {
        this.setState({
            SelectdetGrade: -1,
            StripBackGroundColor: ""
        })
    }


}
export default Tables;
