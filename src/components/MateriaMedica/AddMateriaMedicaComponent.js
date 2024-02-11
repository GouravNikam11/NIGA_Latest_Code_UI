import React, { Component } from 'react';

import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
//import FontFamilyUI from './FontFamilyUI';
import { Editor } from 'react-draft-wysiwyg';
import { convertToRaw, EditorState } from 'draft-js';

import { Table, Col, FormGroup, Form, Row } from 'react-bootstrap';
import { Button, Card, CardBody, CardFooter, CardHeader } from 'reactstrap';
import { Input, Label, Select } from 'reactstrap';
import CommonServices from '../../Services/CommonServices';
import { connect } from 'react-redux';
import '../../components/CommanStyle.css';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import draftToMarkdown from 'draftjs-to-markdown';
import { stateToHTML } from "draft-js-export-html";

import {
    enqueueSnackbar as enqueueSnackbarAction,
    closeSnackbar
} from '../../store/actions/notification';

const content = { "entityMap": {}, "blocks": [{ "key": "637gr", "text": "Initialized from content state.", "type": "unstyled", "depth": 0, "inlineStyleRanges": [], "entityRanges": [], "data": {} }] };


export class AddMateriaMedicaComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            materiaMedicaHeadId: '',
            HeadList: [],
            HeadByAuthorID: [],
            materiaMedicaHeadName: '',
            remedyName: '',
            remedyId: '',
            RemedyList: [],
            authorId: '',
            authourList: [],
            materiaMedicaDetail1: '',
            modelEx: [],
            details: [],
            addData: '',
            addedData: '',
            data: [],
            isDeleted: false,
            errors: {},
            editorState: EditorState.createEmpty(),

        }
        this.handleChange = this.handleChange.bind(this);
        this.submitForm = this.submitForm.bind(this);

    }

    async componentDidMount() {
        await this.getauthor();
        await this.getremedy();
        await this.getHead();

    }

    renderauthorList = () => {
        if (this.state.authourList == undefined) {
            return null;
        }
        return this.state.authourList.map((author, index) => {
            return <option key={index} value={author.authorId}>{author.authorName}</option>
        })
    }

    renderRemedyList = () => {
        if (this.state.RemedyList == undefined) {
            return null;
        }
        return this.state.RemedyList.map((Remedy, index) => {
            return <option key={index} value={Remedy.remedyId}>{Remedy.remedyName}</option>
        })
    }

    renderHeadList = () => {
        if (this.state.HeadList == undefined) {
            return null;
        }
        return this.state.HeadList.map((Head, index) => {
            return <option key={index} value={Head.materiaMedicaHeadId}>{Head.materiaMedicaHeadName}</option>
        })
    }
    renderHeadListByAuthourID = () => {
        if (this.state.HeadByAuthorID == undefined) {
            return null;
        }
        return this.state.HeadByAuthorID.map((Head, index) => {
            return <option key={index} value={Head.materiaMedicaHeadId}>{Head.materiaMedicaHeadName}</option>
        })
    }

    render() {
        const { editorState } = this.state;
        return (


            <Card>

                <CardHeader>
                    <i className="fa fa-align-justify"></i>
                    Add Materia Medica Details
                </CardHeader>

                <CardBody>
                    <Form encType="multipart/form-data" className="form-horizontal">
                        <Row>
                            <Col xs="12" md="4">
                                <FormGroup >
                                    <Label className="label" htmlFor="">Author
                                        <span className="required">*</span> :</Label>

                                    <Form.Control as="select"
                                        name="authorId"
                                        onChange={this.changehandle.bind(this)}
                                        value={this.state.authorId}>

                                        <option value="0">
                                            Select Author Name
                                        </option>
                                        {
                                            this.renderauthorList()
                                        }
                                    </Form.Control>
                                    <span className="error">{this.state.errors["authorId"]}</span>

                                </FormGroup>
                            </Col>


                            <Col xs="12" md="4">
                                <FormGroup >
                                    <Label className="label" htmlFor="">Remedy
                                        <span className="required">*</span> :</Label>
                                    <Form.Control as="select"
                                        name="remedyId"
                                        onChange={this.handleChange.bind(this)}
                                        value={this.state.remedyId}>
                                        <option value="0">
                                            Select Remedy Name
                                        </option>
                                        {
                                            this.renderRemedyList()
                                        }
                                    </Form.Control>
                                    <span className="error">{this.state.errors["remedyId"]}</span>

                                </FormGroup>
                            </Col>


                            <Col xs="12" md="4">
                                <FormGroup >
                                    <Label className="label" htmlFor="">Head
                                        <span className="required">*</span> :</Label>
                                    <Form.Control as="select"
                                        name="materiaMedicaHeadId"
                                        onChange={this.handleChange.bind(this)}
                                        value={this.state.materiaMedicaHeadId}>
                                        <option value="0">
                                            Select Head Name
                                        </option>
                                        {
                                            this.renderHeadListByAuthourID()
                                        }
                                    </Form.Control>
                                    <span className="error">{this.state.errors["materiaMedicaHeadId"]}</span>

                                </FormGroup>
                            </Col>



                            {/* <Col xs="12" md="4">
                                <FormGroup style={{ width: '1035px' }}>
                                    <Label className="label" htmlFor="">Materia Medica Details :</Label>
                                    <Form.Control as="textarea" placeholder=" Enter Materia Medica Details"
                                        style={{ height: '200px' }}
                                        name="details"
                                        onChange={this.handleChange}
                                        value={this.state.details === null ? '' : this.state.details} />
                                </FormGroup>
                            </Col> */}



                        </Row>

                        {/* <Row>
                            <Col xs="12" > Materia Medica Details : </Col>

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

                        </Row> */}

                        {/* <CKEditor
                            editor={ClassicEditor}
                            data={this.state.details}
                            onReady={editor => {
                                editor.ui.view.editable.element.style.minHeight = '300px';
                                console.log('Editor is ready to use!', editor);
                            }}
                            onChange={(event, editor) => {
                                const data = editor.getData();
                                editor.ui.view.editable.element.style.minHeight = '300px';
                                console.log({ event, editor, data });
                                this.editorhandlechanges(event, data);
                            }}
                            onFocus={(event, editor) => {
                                editor.ui.view.editable.element.style.minHeight = '300px';
                                console.log('Focus.', editor);
                            }}
                            config={{
                                language: 'en',
                                toolbar: ['fontFamily', 'undo', 'redo', 'fontColor',
                                    'fontSize','font'],
                                fontColor: {
                                    colors: [
                                        { color: 'hsl(0, 0%, 0%)', label: 'Black' },
                                        { color: 'hsl(0, 0%, 30%)', label: 'Dark Gray' },
                                        { color: 'hsl(0, 0%, 60%)', label: 'Gray' },
                                        { color: 'hsl(0, 0%, 90%)', label: 'Light Gray' },
                                        { color: 'hsl(0, 0%, 100%)', label: 'White' },
                                    ],
                                },
                                fontSize: {
                                    options: [10, 12, 14, 'default', 18, 24, 36],
                                },
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

    handleChangeforeditor = (rawDraftContentState) =>{
        // no need for convertToRaw or stateToHtml anymore
       
       // console.log('test = ',stateToHTML(rawDraftContentState.getCurrentContent()))
      //  console.log('test = ',draftToHtml(convertToRaw(rawDraftContentState.getCurrentContent())))
        this.setState({ details: draftToHtml(convertToRaw(rawDraftContentState.getCurrentContent())) })
    }

    onContentStateChange = (editorState) => {
        debugger
        console.log('contentState ==', editorState)
        this.setState({
            editorState,
        });
    };


    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value })
    }

    validateForm() {
        let fields = this.state;

        let errors = {};
        let isFormValid = true;

        if (fields.authorId == "") {
            isFormValid = false;
            errors["authorId"] = "Please select author name"
        }

        if (fields.remedyId == "") {
            isFormValid = false;
            errors["remedyId"] = "Please select remedy name"
        }
        if (fields.materiaMedicaHeadId == "") {
            isFormValid = false;
            errors["materiaMedicaHeadId"] = "Please select head name"
        }

        this.setState({ errors });
        return isFormValid;
    }


    handlequestion(e) {
        this.setState({
            questionSectionId: e.target.value
        })
    }

    changehandle(e) {

        console.log("e>>>>>", e.target.value);
        this.setState({ [e.target.name]: e.target.value })
        this.getHeadbyAuthorID(e.target.value)
    }

    editorhandlechanges(e, details) {
        /*  this.data = details.getData();
         this.addData(e.data); */

        this.setState({ details: details })
    }

    getauthor() {
        CommonServices.getData(`/DropdownList/GetAuthorforMateriaMedicaDDL`).then((temp) => {
            this.setState({
                authourList: temp
            })
        })
    }
    getremedy() {
        CommonServices.getData(`/remedy/GetRemedies`).then((temp) => {
            this.setState({
                RemedyList: temp
            })
        })
    }

    getHeadbyAuthorID(authourid) {
        CommonServices.getData(`/MateriaMedicaMaster/GetMateriaMedicaHeadByAuthorId/` + authourid).then((temp) => {
            this.setState({
                HeadByAuthorID: temp
            })
        })

    }

    getHead() {
        CommonServices.getData(`/MateriaMedicaHead/GetMateriaMedicaHead`).then((temp) => {
            this.setState({
                HeadList: temp
            })
        })
    }

    submitForm(e) {
        var obj = {
            "materiaMedicaId": 0,
            "details": this.state.details,

        }
        this.state.modelEx.push(obj)

        e.preventDefault();
        debugger;
        console.log('this.state====++++>>>>>', this.state)

        if (this.validateForm()) {
            CommonServices.postData(this.state, `/MateriaMedicaMaster`).then((responseMessage) => {

                this.props.enqueueSnackbarAction(responseMessage.data);
                this.props.history.push('/ListMateriaMedicaComponent');
            }).catch(error => {
                console.log("error", error);
                debugger;
            });
            this.setState({
                materiaMedicaHeadId: 0,
                HeadList: [],
                materiaMedicaHeadName: '',
                remedyName: '',
                remedyId: 0,
                RemedyList: [],
                authorId: 0,
                authourList: [],
                modelEx: [],
                HeadByAuthorID: [],
                details: [],
                isDeleted: false

            });
        }
    }

}
export default connect(null, { enqueueSnackbarAction, closeSnackbar })(AddMateriaMedicaComponent)
