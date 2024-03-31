import React, { Component } from 'react';

import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Col, Form, Row } from 'react-bootstrap';
import { Button, Card, CardBody, CardFooter, CardHeader, } from 'reactstrap';
import { Label } from 'reactstrap';
import CommonServices from '../../Services/CommonServices';
import { connect } from 'react-redux';
import '../../components/CommanStyle.css';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import {
    enqueueSnackbar as enqueueSnackbarAction,
    closeSnackbar
} from '../../store/actions/notification';

import { Editor } from 'react-draft-wysiwyg';
import { convertToRaw, EditorState } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import draftToMarkdown from 'draftjs-to-markdown';
import {withRouter} from 'react-router-dom';


export class AddAppointmentHistoryNotes extends Component {
    constructor(props) {
        super(props)

        this.state = {

            modelEx: [],
            details: [],
            addData: '',
            data: [],
            isDeleted: false,
            errors: {},
            editorState: EditorState.createEmpty(),
            PappointmentId:this.props.appointmentId

        }

          this.submitForm = this.submitForm.bind(this);

          console.log("props==",this.props)
    }

    async componentDidMount() {
        // var Id = this.props.appointmentId;

        // this.setState({
        //     PappointmentId:Id
        // })
        // // this.state.appointmentId=Id

        // console.log("appID====>>>",Id)
       
    }

    render() {
        const { editorState } = this.state;
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
                                {/* <CKEditor
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
                                /> */}
                                <div>
                                    <Editor
                                        wrapperClassName="demo-wrapper"
                                        editorClassName="demo-editor"
                                        onEditorStateChange={editorState => {
                                            this.handleChangeforeditor(editorState);
                                        }}
                                        toolbarClassName="toolbar-class"
                                        defaultEditorState={editorState}
                                        wrapperStyle={{
                                            borderRadius: 5,
                                            borderWidth: 1,
                                            borderColor: '#0000'
                                        }}
                                        editorStyle={{
                                            borderRadius: 2,
                                            border: '1px solid lightgrey',
                                            backgroundColor: '#FFFFFF',
                                            height: '300px'
                                        }}

                                    />

                                </div>
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
                                onClick={
                                    this.submitForm
                                }
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

    handleChangeforeditor = (rawDraftContentState) => {
        // no need for convertToRaw or stateToHtml anymore

        // console.log('test = ',stateToHTML(rawDraftContentState.getCurrentContent()))
        //  console.log('test = ',draftToHtml(convertToRaw(rawDraftContentState.getCurrentContent())))
        this.setState({ details: draftToHtml(convertToRaw(rawDraftContentState.getCurrentContent())) })
    }


    submitForm(e) {
        e.preventDefault();
        debugger;
       // console.log("this.state.appointmentId====", this.props.appointmentId)
        let obj = {
            "historyId": 0,
            "appointmentId": this.props.appointmentId,
            "historyNote": this.state.details
        }

        console.log("objforhistory====", obj)
        CommonServices.postData(obj, `/AppointmentHistoryNote/SaveUpdateAppointmentHistoryNote`).then((responseMessage) => {
            console.log("responseMessageforhistory====", responseMessage)
            this.props.enqueueSnackbarAction(responseMessage.data);
            this.props.history.push('/DoctorDashboard'); 
        }).catch(error => {
            console.log("error", error);
           
        });
        this.setState({
            modelEx: [],
            details: [],
            addData: '',
            data: [],
            isDeleted: false,
            errors: {},
            editorState: EditorState.createEmpty(),
            PappointmentId:0
        });
    }

}
export default withRouter(connect(null, { enqueueSnackbarAction, closeSnackbar })(AddAppointmentHistoryNotes)) 
