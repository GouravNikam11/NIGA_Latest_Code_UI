
import React, { Component } from 'react';
import { Table, Col, FormGroup, Form, Row } from 'react-bootstrap';
import { Button, Card, CardBody, CardFooter, CardHeader, } from 'reactstrap';
import { Input, Label, Select } from 'reactstrap';
import CommonServices from '../../Services/CommonServices';
import { connect } from 'react-redux';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import '../../components/CommanStyle.css';
import {
    enqueueSnackbar as enqueueSnackbarAction,
    closeSnackbar
} from '../../store/actions/notification';
import AsyncPaginate from "react-select-async-paginate";
import { Editor } from 'react-draft-wysiwyg';
import { convertToRaw, convertFromRaw, EditorState, ContentState, convertFromHTML } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import { stateFromHTML } from 'draft-js-import-html';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import htmlToDraft from 'html-to-draftjs';

class EditDiagnosisTherapeuticsDetail extends Component {
    constructor(props) {
        super(props)

        this.state = {
            diagnosisTherapeuticsDetailId: 0,
            diagnosisId: 0,
            details: '',
            deletedStatus: false,
            DiagnosisList: [],
            DiagnosisIds: [],
            editorState: undefined,
        }
    }


    componentDidMount() {
        debugger;
        console.log(this.props.match)
        var Id = this.props.match.params.diagnosisTherapeuticsDetailId;
        this.editDiagnosisTherapeuticsDetailId(Id);
        this.getdiagnosis()
    }
    getdiagnosis() {
        debugger
        CommonServices.getData(`/diagnosis/GetDiagnosis`).then((temp) => {
            this.setState({
                DiagnosisList: temp
            })
        })
    }
    DiagnosisChanged(e) {
        debugger
        console.log("e====", e)
        debugger;
        if (e != null) {
            this.setState({
                DiagnosisIds: e,
            }, () => {
            })
        }
    }

    handleChangeforeditor = (rawDraftContentState) => {
        // no need for convertToRaw or stateToHtml anymore

        // console.log('test = ',stateToHTML(rawDraftContentState.getCurrentContent()))
        console.log('test = ', draftToHtml(convertToRaw(rawDraftContentState.getCurrentContent())))
        this.setState({ rawDraftContentState });
        this.setState({ details: draftToHtml(convertToRaw(rawDraftContentState.getCurrentContent())) })
    }

    editDiagnosisTherapeuticsDetailId(id) {
        debugger;
        if (id !== undefined) {
            CommonServices.getDataById(id, `/DiagnosisTherapeuticsDetail`).then((res) => {
                debugger
                let obj = {
                    value: res.diagnosisId,
                    label: res.diagnosisName
                }
                console.log('obj==', obj)
                const blocksFromHTML = htmlToDraft(res.diagnosisTherapeuticsDetail1)
                //  console.log('blocksFromHTML.contentBlocks ', blocksFromHTML.contentBlocks)
                //  console.log('blocksFromHTML.entityMap ', blocksFromHTML.entityMap)
                const contentState = ContentState.createFromBlockArray(
                    blocksFromHTML.contentBlocks,
                    blocksFromHTML.entityMap
                );
                // console.log('contentState =', contentState);
                const editorState = EditorState.createWithContent(contentState);
                this.setState({
                    editorState: editorState,
                    "diagnosisTherapeuticsDetailId": res.diagnosisTherapeuticsDetailId,
                    "diagnosisId": res.diagnosisId,
                    // details: res.diagnosisTherapeuticsDetail1,
                    "deletedStatus": false,
                    DiagnosisIds: obj

                });
            });
        }
    }

    loadDiagnosisListOptions = async (search, prevOptions) => {
        const options = [];
        this.state.DiagnosisList.map(x => options.push({ value: x.diagnosisId, label: x.diagnosisName }));
        let filteredOptions;
        if (!search) {
            filteredOptions = options;
        } else {
            const searchLower = search.toLowerCase();

            filteredOptions = options.filter(({ label }) =>
                label.toLowerCase().includes(searchLower)
            );
        }

        const hasMore = filteredOptions.length > prevOptions.length + 10;
        const slicedOptions = filteredOptions.slice(
            prevOptions.length,
            prevOptions.length + 10
        );
        return {
            options: slicedOptions,
            hasMore
        };
    }
    editorhandlechanges(e, details) {
        debugger;
        console.log('details+++=====>>>>>', details)
        /*  this.data = details.getData();
         this.addData(e.data); */
        this.setState({
            details: details,
        })
    }

    render() {
        const { editorState } = this.state;
        return (
            <Card>
                <CardHeader>
                    <i className="fa fa-align-justify"></i>
                    Edit Diagnosis Therapeutics Detail
                </CardHeader>
                <CardBody>
                    <Form encType="multipart/form-data" className="form-horizontal">

                        <Row>
                            <Col xs="12" md="4">
                                <FormGroup >
                                    <Label className="label" htmlFor="">Diagnosis Name <span className="required">*</span> :</Label>
                                    <AsyncPaginate isClearable
                                        placeholder="Type Diagnosis Name"
                                        value={this.state.DiagnosisIds}
                                        loadOptions={this.loadDiagnosisListOptions}
                                        onChange={this.DiagnosisChanged.bind(this)}
                                    />
                                </FormGroup>
                            </Col>
                        </Row>

                        <Row>
                            <Col xs="12" > Therapeutics Details : </Col>

                            <Col xs="12" >

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
                                {editorState !== undefined && <div>
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

                                </div>}
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
                                onClick={this.submitForm}
                                size="sm" color="primary">
                                <i className="fa fa-save"></i> Update
                            </Button> &nbsp;
                            <Button
                                type="reset"
                                style={{ textTransform: "uppercase" }}
                                onClick={() => this.props.history.push('/ListDiagnosisTherapeuticsDetail')}
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


    submitForm = () => {
        debugger
        console.log('DiagnosisIds====', this.state.DiagnosisIds.value)
        console.log('DiagdiagnosisTherapeuticsDetail1osisIds====', this.state.details)
        let item = {
            "diagnosisTherapeuticsDetailId": this.state.diagnosisTherapeuticsDetailId,
            "diagnosisId": this.state.DiagnosisIds.value,
            "diagnosisTherapeuticsDetail1": this.state.details,
        }
        CommonServices.postData(item, `/DiagnosisTherapeuticsDetail/SaveDiagnosisTherapeuticsDetail`).then((responseMessage) => {
            debugger
            console.log('responseMessage====', responseMessage)
            this.props.enqueueSnackbarAction("Record updated successfully");
            this.props.history.push("/ListDiagnosisTherapeuticsDetail")
        });
        this.setState({
            diagnosisTherapeuticsDetailId: 0,
            diagnosisId: 0,
            details: '',
            deletedStatus: false,
            DiagnosisList: [],
            DiagnosisIds: [],
        });

    }




}
export default connect(null, { enqueueSnackbarAction, closeSnackbar })(EditDiagnosisTherapeuticsDetail)