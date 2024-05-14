//========================================================================//
import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
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
    Form,
    Input,
    FormGroup,
    NavLink
} from 'reactstrap';
import CommonServices from '../../Services/CommonServices';
//========================================================================//

/**
 * Created Date     :   10-March-2020
 * Purpose          :   Class is responsible for viewing Remedial Rubrics.
 * Author           :   Chandrashekhar Salagar.
 */
export class ViewRemedialRubricsComponent extends Component {

    /**
     * Initilize class members
     * @param {} props 
     */
    constructor(props) {
        super(props);
        this.state = {
            isDatafetched: false,
            RubricRemedy: [],
            SearchText: '',
            RemedyName:'',
            ThemesCharacteristics:'',
            Generals:'',
            Modalities:'',
            Perticulars:'',
            GetRemedyId:this.props.match.params.id
        };
    }

    /**
     * componentDidMount lifecycle method
     */
    componentDidMount() {
        var Id = this.props.match.params.id;
        this.GetRemedyDetails(Id)
    }

    /**
    * handleChange
    * @param {*} e 
    */
    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value })
    }

    /**
     * render method
     */
    render() {
        const searchTerm = this.state.SearchText;
        var SubSections;
        if (searchTerm != "") {
            SubSections = this.state.RubricRemedy.filter((value, index) => {
                if (value.subSectionName.toLowerCase().includes(searchTerm.toLowerCase())) {
                    return value;
                }
            });
        }
        else {
            SubSections = this.state.RubricRemedy;
        }
        return (
            <div className="animated fadeIn" responsive="true">
                <FormGroup row className="mb-2 mt-2">
                    <Col sm="4">
                        <Input type="text"
                            placeholder="Type and Search..."
                            name='SearchText'
                            value={this.state.SearchText}
                            onChange={this.handleChange.bind(this)}
                        />
                    </Col>
                    <Col sm="4">

                    </Col>
                    <Col sm="4" className="tright">
                        <Link to={"/AddRemedialRubrics"} className="nav-link lnkbtn" >
                            <Button color="primary" style={{ textTransform: "uppercase" }} onClick="{this.context.router.history.goBack}">
                                <i className="fa fa-arrow-circle-left"></i> &nbsp; Back
                            </Button>
                        </Link>
                    </Col>
                </FormGroup>
                <Row>
                    <Col xs="12" lg="12">
                        <Card>
                            <CardHeader>
                                <i className="fa fa-align-justify"></i>
                                <strong> SubSections</strong>
                            </CardHeader>
                            <CardBody>
                                <Table style={{background: '#f0f3f5'}}>
                                    <thead>
                                        <tr><td style={{width:'15%'}}><strong>Remedy Name</strong></td><td style={{width:'2%'}}>:</td><td>{this.state.RemedyName}</td></tr>
                                        <tr><td><strong>Themes/ Characteristics</strong></td><td>:</td><td>{this.state.ThemesCharacteristics}</td></tr>
                                        <tr><td><strong>Generals</strong></td><td>:</td><td>{this.state.Generals}</td></tr>
                                        <tr><td><strong>Modalities</strong></td><td>:</td><td>{this.state.Modalities}</td></tr>
                                        <tr><td><strong>Particulars</strong></td><td>:</td><td>{this.state.Perticulars}</td></tr>
                                    </thead>
                                </Table>
                                <Table>
                                    
                                    <tbody>
                                        {
                                            this.state.isDatafetched == true ?
                                                SubSections.map((value, index) => {
                                                    return (
                                                        <tr key={index}>
                                                            <td >
                                                                <h6

                                                                    style={{
                                                                        fontFamily: value.fontFamily,
                                                                        color: value.fontColor,
                                                                        fontStyle: value.fontStyle
                                                                    }}>{value.subSectionName} <div class="fltr" style={{ width: '4.5rem' }}><div class="fltcnt"></div>
                                                                        
                                                                        </div> </h6>
                                                            </td>
                                                            <td className='text-right' title='Score'><strong>[{value.remedyCount}]</strong> &nbsp;&nbsp;&nbsp;</td>
                                                            <td className='text-center' style={{ width: '5%' }} title='Small Rubric ?'>
                                                                <input class="form-check-input" type="checkbox" value="" id="" checked={value.isSmallRubric}onClick={() => this.Checkissmallrubric(value.rubricRemedyId, !value.isSmallRubric)} />
                                                                <label class="form-check-label" for="smallrub">S.R.</label>
                                                            </td>
                                                            <td className='text-center' style={{ width: '5%' }} title='Confirmative Rubric ?'>
                                                                <input class="form-check-input" type="checkbox" value="" id="" checked={value.isConformationRubric}onClick={() => this.CheckisConformationRubric(value.rubricRemedyId, !value.isConformationRubric)}/>
                                                                <label class="form-check-label" for="confrub">C.R.</label>
                                                            </td>
                                                        </tr>
                                                    )
                                                }) : <tr>
                                                    <td colSpan="1">
                                                        <img style={{
                                                            height: '100px',
                                                            alignSelf: 'left',
                                                            color: '#e4e5e6'
                                                        }}
                                                            title="loading..."
                                                            src={'https://i.imgur.com/T3Ht7S3.gif?noredirect'}></img>
                                                        <br />
                                                        <br />
                                                        &nbsp; &nbsp; &nbsp; Loading...
                                                </td>
                                                </tr>
                                        }
                                    </tbody>

                                   

                                </Table>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </div>
        )
    }

    /**
     * Get Remedy Details
     */
    GetRemedyDetails = remedyId => {
      
        CommonServices.getDataById(remedyId, `/RubricRemedy/GetRubricRemedyDetails`).then((result) => {
            debugger;
            console.log("/RubricRemedy/GetRubricRemedyDetails",result)
            if (result != undefined) {
                console.log(result);
                this.setState({ isDatafetched: true, RubricRemedy: result.rubricRemedyViewsList,
                    RemedyName:result.remedyName,
                    ThemesCharacteristics:result.themesOrCharacteristics,
                    Generals:result.generals,
                    Modalities:result.modalities,
                    Perticulars:result.particulars});
            }
            else {
                this.setState({ isDatafetched: false });
            }
        })
    }

    Checkissmallrubric = (rubricRemedyId,isSmallRubric) => {
        debugger
        CommonServices.getData(`/RubricRemedy/UpdateIsSmallRubric/${rubricRemedyId}/${isSmallRubric}`).then((result) => {
        //  window.location.reload();
        this.GetRemedyDetails(this.state.GetRemedyId)
        });
    }
    
    CheckisConformationRubric = (rubricRemedyId,isConformationRubric) => {
        debugger
        CommonServices.getData(`/RubricRemedy/UpdateIsConfirmationRubric/${rubricRemedyId}/${isConformationRubric}`).then((result) => {
         // window.location.reload();
         this.GetRemedyDetails(this.state.GetRemedyId)
        });
    }
}