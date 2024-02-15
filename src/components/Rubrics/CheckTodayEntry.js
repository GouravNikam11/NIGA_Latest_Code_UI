import React, { Component } from 'react';
import { Table, Col, Button, Form,FormGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import CommonServices from '../../Services/CommonServices';
import { connect } from 'react-redux';
import {
    enqueueSnackbar as enqueueSnackbarAction,
    closeSnackbar
} from '../../store/actions/notification';
import {
   Label,
    Row,
    Alert,
} from 'reactstrap';

export class ListSectionComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            subSectionId: 0,
            subSectionName: '',
            remedyName: '',
            ListAuthor: [],

            // EnteredDate:"",
            // EnteredBy: '',
            UserId: localStorage.getItem("UserId")
        }
    }


    componentDidMount() {
        this.getrecord();
        console.log("**********API CALL**************")

    }


    render() {
        return (
            <>

            <Row>

                     <Col xs="12" md="4">
                                    <FormGroup >
                                        <Label className="label" htmlFor="">Today's Total Entry Count :</Label>
                                        <Form.Control type="text" 
                                                name="Today'sTotalEntryCount"
                                                disabled={true}
                                                value={this.state.length} />
                                    </FormGroup>
                        </Col>

                        <Col>
                            <Link to={"/AddRubrics"} className="nav-link lnkbtn" >
                                <Button color="primary" type="button"
                                > <i className="fa fa-dot-circle-o"></i>
                                Back to Add Rubrics
                                </Button>&nbsp;
                            </Link>
                      </Col>

                </Row>

            <div>
                
                
                <Table striped bordered hover>
               
                    <thead>

                        <tr>
                            <th className='fcol'>Sr.No</th>
                            <th> subSectionName Name</th>
                        </tr>

                    </thead>
                    <tbody>
                        {
                            this.state.ListAuthor.map((s, index) => {
                                return <tr key={index}>
                                   
                                  
                                    <td className='fcol'>{s.subSectionId}</td>
                                    <td>{s.subSectionName}</td>
                                  


                                </tr>
                            })
                        }
                    </tbody>
                </Table>

            </div >
            </>
        );
    }
    getrecord() {
        CommonServices.getData(`/subsection/GetSubSectionsByDate/` + this.state.UserId).then((temp) => {
            debugger
            console.log("check today entry==",temp);
            debugger;
            this.setState({
                ListAuthor: temp,
                length:temp.length
            })
        });
    }


}
export default connect(null, { enqueueSnackbarAction, closeSnackbar })(ListSectionComponent)

