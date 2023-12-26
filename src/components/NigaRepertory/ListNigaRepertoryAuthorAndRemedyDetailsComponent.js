
import React, { Component } from 'react';
import { Col, Row, Form, FormLabel } from 'react-bootstrap';
import { Card, CardBody, CardHeader, Input, FormGroup } from 'reactstrap';


import ReactHtmlParser from 'react-html-parser';
import {
    enqueueSnackbar as enqueueSnackbarAction,
    closeSnackbar
} from '../../store/actions/notification';
import CommonServices from '../../Services/CommonServices';
import { connect } from 'react-redux';
import { Label } from 'reactstrap';


export class ListNigaRepertoryAuthorAndRemedyDetailsComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            remedyId: 0,
            authorId: 0,
            lstRemedy: [],
            isLstRemedyLoad: false,
            remedyName: '',
            remedyAlias: '',
        }
    }

    async componentDidMount() {
        debugger
        var authorId = this.props.match.params.id;
        var remedyId = this.props.match.params.remedyid;
        var remedyName = this.props.match.params.remedyName;
        var remedyAlias = this.props.match.params.remedyAlias;

        this.setState({
            authorId: authorId,
            remedyId: remedyId,
            remedyName: remedyName,
            remedyAlias: remedyAlias
        })
        this.getMateriaMedicaRemediesDetails(remedyId, authorId)
    }

    getMateriaMedicaRemediesDetails(remedyId, authorId) {
        debugger
        CommonServices.getData(`/MateriaMedicaRemediesDetails/GetMateriaMedicaRemediesDetails?remedyId=` + remedyId + `&authorId=` + authorId).then((temp) => {
            console.log('lstRemedy===', temp.lstRemedy)
            this.setState({
                lstRemedy: temp.lstRemedy,
                isLstRemedyLoad: true,
            })
        })
    }


    render() {
        return (
            <div>
                <Row>
                    <Col xs="12" md="12">
                        <Card>
                            <CardHeader style={{ padding: 8 }}>
                                <Row>
                                    <Col md="12">
                                        <Row>
                                            <Col md="6">
                                                <FormLabel className='frm-lbl'>Remedy: {this.state.remedyName}</FormLabel>
                                            </Col>                                        
                                            <Col md="6">
                                                <FormLabel className='frm-lbl flt-r'>Remedy Alias: {this.state.remedyAlias}</FormLabel>
                                            </Col>                           
                                        </Row>
                                    </Col>


                                </Row>
                            </CardHeader>

                            <CardBody  >

                                <Row>
                                    {this.state.lstRemedy.length > 0 ?
                                        <Col sm="12" className='medica'>
                                            {
                                                this.state.lstRemedy.map((r, index) => {
                                                    return <Row key={index}>
                                                        <Col>
                                                            {ReactHtmlParser(r.materiaMedicaDetail1)}</Col>
                                                    </Row>
                                                })
                                            }
                                        </Col>:
                                        <Col sm="12" className='medica'>Data Not Available</Col>
                                    }
                                </Row>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </div>



        )
    }






}


export default connect(null, { enqueueSnackbarAction, closeSnackbar })(ListNigaRepertoryAuthorAndRemedyDetailsComponent)














