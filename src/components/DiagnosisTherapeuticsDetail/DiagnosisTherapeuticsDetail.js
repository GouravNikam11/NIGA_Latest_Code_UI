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
import ReactHtmlParser from 'react-html-parser';
class DiagnosisTherapeuticsDetail extends Component {
    constructor(props) {
        super(props)

        this.state = {
            details: ''
        }

    }

    componentDidMount() {
        debugger;
        console.log(this.props.match)
        var Id = this.props.match.params.diagnosisTherapeuticsDetailId;
        this.editDiagnosisTherapeuticsDetailId(Id);
    }
    editDiagnosisTherapeuticsDetailId(id) {
        debugger;
        if (id !== undefined) {
            CommonServices.getDataById(id, `/DiagnosisTherapeuticsDetail`).then((res) => {
                debugger
                this.setState({
                    "diagnosisTherapeuticsDetailId": res.diagnosisTherapeuticsDetailId,
                    "diagnosisId": res.diagnosisId,
                    details: res.diagnosisTherapeuticsDetail1,
                    "deletedStatus": false,
              

                });
            });
        }
    }

    render() {
        return (
            <Card>
                <CardHeader>
                    <i className="fa fa-align-justify"></i>
                    Diagnosis Therapeutics Detail
                </CardHeader>
                <CardBody>
                    <Form encType="multipart/form-data" className="form-horizontal">

                        <Row>
                            <Col xs="12" md="12">
                                {ReactHtmlParser(this.state.details)}
                            </Col>
                        </Row>

                    </Form>
                </CardBody>
                <CardFooter>
                    <Row>

                        <Col xs="12" md="6">
                            <Button
                                type="reset"
                                style={{ textTransform: "uppercase" }}
                                onClick={() => this.props.history.push('/ListDiagnosisTherapeuticsDetail')}
                                size="sm" color="danger">
                                <i className="fa fa-ban"></i> Back
                            </Button>
                        </Col>

                    </Row>

                </CardFooter>
            </Card>
        )
    }
}
export default connect(null, { enqueueSnackbarAction, closeSnackbar })(DiagnosisTherapeuticsDetail)