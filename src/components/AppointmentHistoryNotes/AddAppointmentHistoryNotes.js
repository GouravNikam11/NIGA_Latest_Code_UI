import React, { Component } from 'react';

import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import {  Col, Form, Row } from 'react-bootstrap';
import { Button, Card, CardBody, CardFooter, CardHeader, } from 'reactstrap';
import {Label} from 'reactstrap';
import CommonServices from '../../Services/CommonServices';
import { connect } from 'react-redux';
import '../../components/CommanStyle.css';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import {
    enqueueSnackbar as enqueueSnackbarAction,
    closeSnackbar
} from '../../store/actions/notification';


export class AddAppointmentHistoryNotes extends Component {
    constructor(props) {
        super(props)

        this.state = {
           
            modelEx: [],
            details: [],
            addData: '',
            data: [],
            isDeleted: false,
            errors: {}

        }
       
      //   this.submitForm = this.submitForm.bind(this);
    }

    async componentDidMount() {
      
    }

    render() {
        return (
            <Card>
                <CardHeader>
                    <i className="fa fa-align-justify"></i>
                    Add Appointment History Notes
                </CardHeader>
                <CardBody>
                    <Form encType="multipart/form-data" className="form-horizontal">                   
                       <Row>
                            <Col xs="12" > Appointment History Notes : </Col>
                            <Col xs="12" >
                                <br></br>
                                <CKEditor
                                    editor={ClassicEditor}
                                    data={this.state.details}
                                    onReady={editor => {
                                        editor.ui.view.editable.element.style.minHeight = "300px";
                                        // You can store the "editor" and use when it is needed.
                                        console.log('Editor is ready to use!', editor);
                                    }}
                                    onChange={(event, editor) => {
                                        const data = editor.getData();
                                        editor.ui.view.editable.element.style.minHeight = "300px";
                                        console.log({ event, editor, data });
                                        this.editorhandlechanges(event, data)
                                    }}
                                    onFocus={(event, editor) => {
                                        editor.ui.view.editable.element.style.minHeight = "300px";
                                        console.log('Focus.', editor);
                                    }}
                                />
                            </Col>

                        </Row>

                    </Form>
                </CardBody>
                <CardFooter>
                    <Row>

                        <Col xs="12" md="6">
                            <Button
                                type="button"
                                style={{ textTransform: "uppercase" }}
                              //   onClick={
                              //       this.submitForm
                              //   }
                                size="sm" color="primary">
                                <i className="fa fa-save"></i> Save
                            </Button> &nbsp;
                            <Button
                                type="reset"
                                style={{ textTransform: "uppercase" }}
                                onClick={() => this.props.history.push('/ListMateriaMedicaComponent')}
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

       editorhandlechanges(e, details) {
        /*  this.data = details.getData();
         this.addData(e.data); */

        this.setState({ details: details })
    }

    
    submitForm(e) {
        e.preventDefault();
        debugger;
            CommonServices.postData(this.state, `/MateriaMedicaMaster`).then((responseMessage) => {
                this.props.enqueueSnackbarAction(responseMessage.data);
               //  this.props.history.push('/ListMateriaMedicaComponent');
            }).catch(error => {
                console.log("error", error);
                debugger;
            });
            this.setState({
              
            });
    }

}
export default connect(null, { enqueueSnackbarAction, closeSnackbar })(AddAppointmentHistoryNotes)
