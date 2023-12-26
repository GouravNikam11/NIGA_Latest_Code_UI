import React, { Component } from 'react';
import CommonServices from '../../Services/CommonServices';
import { Table, Card, Col, Button, Form, Row, Pagination, Glyphicon } from 'react-bootstrap';
import Accordion from 'react-bootstrap/Accordion'
export class AddCasesComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            sections: [

            ]
        }
    }
    componentDidMount() {
        this.getMainSections(0);
    }
    render() {
        return (
            <div className="Signup">
                <Col>
                    <Form  >
                        {this.getitems(this.state.sections)}
                    </Form>
                </Col>
            </div>
        )
    }

    getMainSections(subSectionId) {
        CommonServices.getDataById(subSectionId, `/subsection`).then((result) => {
            this.setState({
                sections: result
            })
        });

    }

    getitems(data) {
        console.log(data)
        debugger;
        return data.map((value, index) => {
            if (value.parentSubSectionId == null) {
                console.log(value.parentSubSectionId);
                debugger;
                return (<React.Fragment>
                    <Accordion >
                        <Card>
                            <Card.Header>
                                <Accordion.Toggle as={Button} variant="link" eventKey={value.subSectionId}
                                    onClick={() => this.handleAccordionClick(value.sectionId)}>
                                    {value.subSectionName}
                                </Accordion.Toggle>
                            </Card.Header>
                            <Accordion.Collapse eventKey={value.subSectionId}>
                                <Card.Body>Hello! I'm the body</Card.Body>
                            </Accordion.Collapse>
                        </Card>
                    </Accordion>
                </React.Fragment>)
            }
            else {
                return null
            }
        });
    }

    handleAccordionClick(val) {
        console.log(val);
        this.getMainSections(val);
        debugger;
    }

}