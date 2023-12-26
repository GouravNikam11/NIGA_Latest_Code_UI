//========================================================================//
import React, { Component } from 'react';
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
 * Purpose          :   Class is responsible for adding RemedialRubrics.
 * Author           :   Chandrashekhar Salagar.
 */
export class AddRemedialRubricsComponent extends Component {
    /**
     * Constructor for initilizing class members
     * @param {} props 
     */
    constructor(props) {
        super(props);
        this.state = {
            RemedyList: [],
            SearchText: '',
            DataFetched: false
        }
    }

    /**
     * componentDidMount
     */
    componentDidMount() {
        this.GetAllRemedies();
    }

    /**
     * handleChange
     * @param {*} e 
     */
    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value })
    }

    /**
     * Render Method.
     */
    render() {
        // const remedies = this.state.RemedyList;
        const searchTerm = this.state.SearchText;
        var remedies;
        if (searchTerm != "") {
            remedies = this.state.RemedyList.filter((value, index) => {
                if (value.remedyName.toLowerCase().includes(searchTerm.toLowerCase())) {
                    return value;
                }
            });
        }
        else {
            remedies = this.state.RemedyList;
        }
        return (
            <div className="animated fadeIn" responsive="true" >
                <FormGroup row className="mb-2 mt-1">
                    <Col sm="4">
                        <Input type="text"
                            placeholder="Type and Search..."
                            name='SearchText'
                            value={this.state.SearchText}
                            onChange={this.handleChange.bind(this)}
                        />
                    </Col>
                </FormGroup>
                <Row>
                    <Col xs="12" lg="12">
                        <Card>
                            <CardHeader>
                                <i className="fa fa-align-justify"></i>
                                <strong> Remedial Rubrics</strong>
                            </CardHeader>
                            <CardBody>
                                <Table >
                                    <thead>
                                        <tr>
                                            <th>Remedy Name</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            this.state.DataFetched == true ?
                                                remedies.map((value, index) => {
                                                    return (
                                                        <tr key={index}>
                                                            <td className="curptr">
                                                                <a onClick={() => { this.GetSectionsForRemedy(value.remedyId) }}>
                                                                    <i className="fa fa-bars fa-sm mt-0 btn-outline-secondary">
                                                                    </i>
                                                                
                                                                &nbsp; {value.remedyName}</a>
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
     * Get all remedies.
     */
    GetAllRemedies = () => {
        CommonServices.getData(`/remedy/GetRemedies`).then((remedies) => {
            if (remedies != undefined) {
                debugger;
                // console.log(remedies);
                this.setState({
                    RemedyList: remedies,
                    DataFetched: true
                })
            }
            else {
                this.setState({
                    DataFetched: false
                })
            }
        }).catch(e => {
            debugger;
            this.setState({
                DataFetched: false
            })
        })
    }

    /*Get Sections from remedy */
    GetSectionsForRemedy = remedyId => {
        console.log(remedyId);
        debugger;
        this.props.history.push('/ViewRemedialRubrics/' + remedyId);
    }
}