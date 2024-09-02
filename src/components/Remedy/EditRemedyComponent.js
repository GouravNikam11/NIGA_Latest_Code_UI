import React, { Component } from 'react';
import { Table, Col, FormGroup, Form, Row } from 'react-bootstrap';
import { Button, Card, CardBody, CardFooter, CardHeader, } from 'reactstrap';
import { Input, Label } from 'reactstrap';
import CommonServices from '../../Services/CommonServices';
import { Editor } from 'react-draft-wysiwyg';
import { convertToRaw, EditorState, ContentState } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import { connect } from 'react-redux';
import {
    enqueueSnackbar as enqueueSnackbarAction,
    closeSnackbar
} from '../../store/actions/notification';

class EditRemedyComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            remedyId: 0,
            RemedyName: '',
            RemedyAlias: '',
            Description: '',
            EnteredBy: 'Admin',
            DeleteStatus: false,
            errors: {},
            thermalId: null,
            thermalNameList: [],

            themesOrCharacteristics: '',
            generals: '',
            modalities: '',
            particulars: '',

            editorStateThemesCharacteristics: undefined,
            editorStateGenerals: undefined,
            editorStateModalities: undefined,
            editorStateParticulars: undefined,
            commonOrUncommon: '',
           
        }
        this.handleChange = this.handleChange.bind(this);
        this.submitForm = this.submitForm.bind(this);
    }

    handleChangeforeditorThemesCharacteristics = (rawDraftContentState) => {
        console.log('test = ', draftToHtml(convertToRaw(rawDraftContentState.getCurrentContent())))
        this.setState({ themesOrCharacteristics: draftToHtml(convertToRaw(rawDraftContentState.getCurrentContent())) })
       // console.log('test = ', draftToHtml(convertToRaw(rawDraftContentState.getCurrentContent())))
    }

    handleChangeforeditorGenerals = (rawDraftContentState) => {
        this.setState({ generals: draftToHtml(convertToRaw(rawDraftContentState.getCurrentContent())) })
        //console.log('test = ', draftToHtml(convertToRaw(rawDraftContentState.getCurrentContent())))
    }

    handleChangeforModalities = (rawDraftContentState) => {
        this.setState({ modalities: draftToHtml(convertToRaw(rawDraftContentState.getCurrentContent())) })
        //console.log('test = ', draftToHtml(convertToRaw(rawDraftContentState.getCurrentContent())))
    }

    handleChangeforParticulars = (rawDraftContentState) => {
        this.setState({ particulars: draftToHtml(convertToRaw(rawDraftContentState.getCurrentContent())) })
        //console.log('test = ', draftToHtml(convertToRaw(rawDraftContentState.getCurrentContent())))
    }

    render() {
        const { editorStateThemesCharacteristics } = this.state;
        const { editorStateGenerals } = this.state;
        const { editorStateModalities } = this.state;
        const { editorStateParticulars } = this.state;
        return (
            <Card>

                <CardHeader>
                    <i className="fa fa-align-justify"></i>
                    Edit Remedy
                </CardHeader>

                <CardBody>
                    <Form encType="multipart/form-data" className="form-horizontal">
                        <Row>
                            <Col xs="12" md="4">
                                <FormGroup >
                                    <Label className="label" htmlFor="">Remedy Name <span className="required">*</span> :</Label>
                                    <Form.Control type="text" placeholder="Remedy Name"
                                        name="RemedyName"
                                        onChange={this.handleChange}
                                        value={this.state.RemedyName === null ? '' : this.state.RemedyName} />
                                    <span className="error">{this.state.errors["RemedyName"]}</span>

                                </FormGroup>
                            </Col>

                            <Col xs="12" md="4">
                                <FormGroup >
                                    <Label className="label" htmlFor="">Remedy Alias <span className="required">*</span> :</Label>
                                    <Form.Control type="text" placeholder="Remedy Alias"
                                        name="RemedyAlias"
                                        onChange={this.handleChange}
                                        value={this.state.RemedyAlias} />
                                    <span className="error">{this.state.errors["RemedyAlias"]}</span>
                                </FormGroup>
                            </Col>

                            <Col xs="12" md="4">
                                <FormGroup >
                                    <Label className="label" htmlFor="">Thermal Name
                                        <span className="required"></span> :</Label>
                                    <Form.Control as="select"
                                        name="thermalId"
                                        onChange={this.handlethermalIdChanges.bind(this)}
                                        value={this.state.thermalId}>
                                        <option value="">
                                            Select Thermal Name
                                        </option>
                                        {
                                            this.renderthermalNameList()
                                        }
                                    </Form.Control>
                                </FormGroup>
                            </Col>

                            <Col xs="12" md="6">
                                <FormGroup >
                                    <Label className="label" htmlFor="">Description :</Label>
                                    <textarea placeholder="Description" className="form-control"
                                        name="Description"
                                        onChange={this.handleChange}
                                        value={this.state.Description === null ? '' : this.state.Description} >
                                    </textarea>
                                </FormGroup>
                            </Col>
                            <Col xs="12" md="6">
                                {/* <FormGroup >
                                    <Label className="label" htmlFor="">Themes/ Characteristics :</Label>
                                    <textarea  placeholder="Themes/ Characteristics" className="form-control"
                                        name="themesOrCharacteristics"
                                        onChange={this.handleChange}
                                        value={this.state.themesOrCharacteristics === null ? '' : this.state.themesOrCharacteristics} >
                                    </textarea>
                                </FormGroup> */}
                            </Col>
                            {/* <Col xs="12" md="6">
                                <FormGroup >
                                    <Label className="label" htmlFor="">Generals :</Label>
                                    <textarea  placeholder="Generals" className="form-control"
                                        name="generals"
                                        onChange={this.handleChange}
                                        value={this.state.generals === null ? '' : this.state.generals} >
                                    </textarea>
                                </FormGroup>
                            </Col> */}
                            {/* <Col xs="12" md="6">
                                <FormGroup >
                                    <Label className="label" htmlFor="">Modalities :</Label>
                                    <textarea  placeholder="Modalities" className="form-control"
                                        name="modalities"
                                        onChange={this.handleChange}
                                        value={this.state.modalities === null ? '' : this.state.modalities}  >
                                    </textarea>
                                </FormGroup>
                            </Col> */}
                            {/* <Col xs="12" md="6">
                                <FormGroup >
                                    <Label className="label" htmlFor="">Particulars :</Label>
                                    <textarea  placeholder="Particulars" className="form-control"
                                        name="particulars"
                                        onChange={this.handleChange}
                                        value={this.state.particulars === null ? '' : this.state.particulars}  >
                                    </textarea>
                                </FormGroup>
                            </Col> */}

                            <Col xs="12" md="6">
                                <Label className="label" htmlFor="">Themes/ Characteristics :</Label>
                                {editorStateThemesCharacteristics !== undefined &&    <div>
                                    <Editor
                                        wrapperClassName="demo-wrapper"
                                        editorClassName="demo-editor"
                                        onEditorStateChange={editorStateThemesCharacteristics => {
                                            this.handleChangeforeditorThemesCharacteristics(editorStateThemesCharacteristics);
                                        }}
                                        toolbarClassName="toolbar-class"
                                        defaultEditorState={editorStateThemesCharacteristics}
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
                                }
                            
                            </Col>

                            <Col xs="12" md="6">
                                <Label className="label" htmlFor="">Generals :</Label>
                                {
                                    editorStateGenerals !== undefined &&  <div>
                                    <Editor
                                        wrapperClassName="demo-wrapper"
                                        editorClassName="demo-editor"
                                        onEditorStateChange={editorStateGenerals => {
                                            this.handleChangeforeditorGenerals(editorStateGenerals);
                                        }}
                                        toolbarClassName="toolbar-class"
                                        defaultEditorState={editorStateGenerals}
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
                                }
                               
                            </Col>

                            <Col xs="12" md="6">
                                <Label className="label" htmlFor="">Modalities :</Label>
                                { editorStateModalities !== undefined &&  <div>
                                    <Editor
                                        wrapperClassName="demo-wrapper"
                                        editorClassName="demo-editor"
                                        onEditorStateChange={editorStateModalities => {
                                            this.handleChangeforModalities(editorStateModalities);
                                        }}
                                        toolbarClassName="toolbar-class"
                                        defaultEditorState={editorStateModalities}
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

                                }
                              
                            </Col>

                            <Col xs="12" md="6">
                                <Label className="label" htmlFor="">Particulars :</Label>
                                {editorStateParticulars !== undefined &&  <div>
                                    <Editor
                                        wrapperClassName="demo-wrapper"
                                        editorClassName="demo-editor"
                                        onEditorStateChange={editorStateParticulars => {
                                            this.handleChangeforParticulars(editorStateParticulars);
                                        }}
                                        toolbarClassName="toolbar-class"
                                        defaultEditorState={editorStateParticulars}
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

                                }
                              
                            </Col>
                            <Col xs="12" md="6">
                                <FormGroup >
                                    <Label className="label" htmlFor="">Common ? :</Label><br />
                                    <input class="form-check-input-check" type="checkbox" value="" id="" checked={this.state.commonOrUncommon}
                                        onChange={() => this.setState({ commonOrUncommon: !this.state.commonOrUncommon })} />
                                </FormGroup>
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
                                onClick={() => this.props.history.push('/ListRemedy')}
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
    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value })
    }

    validateForm() {
        debugger
        let fields = this.state;

        let errors = {};
        let isFormValid = true;

        if (fields.RemedyName == '') {
            isFormValid = false;
            errors["RemedyName"] = "Please enter Remedy Name"
        }

        if (fields.RemedyAlias == '') {
            isFormValid = false;
            errors["RemedyAlias"] = "Please enter Remedy Alias"
        }

        this.setState({ errors });
        return isFormValid;
    }


    componentDidMount() {
        var Id = this.props.match.params.id;
        this.editRemedy(this.props.match.params.id);
        this.getThermalNameList();
    }
    submitForm() {
        
      

        if (this.validateForm()) {
            console.log('this.state.themesOrCharacteristics=',this.state.themesOrCharacteristics)
        console.log('this.state.editorStateThemesCharacteristics ',this.state.editorStateThemesCharacteristics)
        console.log('this.state.editorStateGenerals ',this.state.editorStateGenerals) 
            let  obj={
                themesOrCharacteristics: this.state.themesOrCharacteristics==='' ? draftToHtml(convertToRaw(this.state.editorStateThemesCharacteristics.getCurrentContent())) :this.state.themesOrCharacteristics,
                generals: this.state.generals===''? draftToHtml(convertToRaw(this.state.editorStateGenerals.getCurrentContent())) :this.state.generals,
                modalities: this.state.modalities===''?draftToHtml(convertToRaw(this.state.editorStateGenerals.getCurrentContent())) :this.state.modalities,
                particulars:this.state.particulars===''?draftToHtml(convertToRaw(this.state.editorStateParticulars.getCurrentContent())) :this.state.particulars,
        
                    remedyId: this.state.remedyId,
                    RemedyName: this.state.RemedyName,
                    RemedyAlias: this.state.RemedyAlias,
                    Description: this.state.Description,
                    EnteredBy: 'Admin',
                    DeleteStatus: false,
                    errors: {},
                    thermalId: this.state.thermalId,
                    thermalNameList: this.state.thermalNameList,
                    commonOrUncommon:this.state.commonOrUncommon
                }
        console.log("submit===",obj)
            CommonServices.postData(obj, `/remedy`).then((responseMessage) => {
                this.props.enqueueSnackbarAction(responseMessage.data);
                this.props.history.push('/ListRemedy');

            });
            this.setState({
                remedyId: 0,
                RemedyName: "",
                RemedyAlias: '',
                Description: "",
                EnteredBy: 'Admin',
                DeleteStatus: false,
                themesOrCharacteristics: '',
                generals: '',
                modalities: '',
                particulars: '',
                commonOrUncommon: '',
                thermalId: ''
            });
        }

    }

    editRemedy(remedyId) {
        debugger;
        if (remedyId != undefined) {
            CommonServices.getDataById(remedyId, `/remedy`).then((res) => {
                debugger;
                console.log("remedy==",res)
                // this is fot editorStateThemesCharacteristics
                const blocksFromHTMLThemesCharacteristics = htmlToDraft(res.themesOrCharacteristics)
                const contentStateThemesCharacteristics = ContentState.createFromBlockArray(
                    blocksFromHTMLThemesCharacteristics.contentBlocks,
                    blocksFromHTMLThemesCharacteristics.entityMap
                );
                const editorStateThemesCharacteristics1 = EditorState.createWithContent(contentStateThemesCharacteristics);
                console.log("editorStateThemesCharacteristics==",editorStateThemesCharacteristics1)
                // this is fot editorStateGenerals
                const blocksFromHTMLgenerals = htmlToDraft(res.generals)
                const contentStategenerals = ContentState.createFromBlockArray(
                    blocksFromHTMLgenerals.contentBlocks,
                    blocksFromHTMLgenerals.entityMap
                );
                const editorStateGenerals = EditorState.createWithContent(contentStategenerals);
                console.log("editorStateGenerals==",editorStateGenerals)
                // this is fot editorStatemodalities 
                const blocksFromHTMLModalities = htmlToDraft(res.generals)
                const contentStateModalities = ContentState.createFromBlockArray(
                    blocksFromHTMLModalities.contentBlocks,
                    blocksFromHTMLModalities.entityMap
                );
                const editorStateModalities = EditorState.createWithContent(contentStateModalities);

                // this is fot editorStatemodalities 
                const blocksFromHTMLparticulars = htmlToDraft(res.particulars)
                const contentStateparticulars = ContentState.createFromBlockArray(
                    blocksFromHTMLparticulars.contentBlocks,
                    blocksFromHTMLparticulars.entityMap
                );
                const editorStateParticulars = EditorState.createWithContent(contentStateparticulars);

                this.setState({
                    remedyId: res.remedyId,
                    RemedyName: res.remedyName,
                    RemedyAlias: res.remedyAlias,
                    Description: res.description,
                    EnteredBy: 'Admin',
                    DeleteStatus: false,
                    editorStateThemesCharacteristics: editorStateThemesCharacteristics1,
                    editorStateGenerals: editorStateGenerals,
                    editorStateModalities: editorStateModalities,
                    editorStateParticulars: editorStateParticulars,
                    commonOrUncommon: res.commonOrUncommon,
                    thermalId: res.thermalId,
                })
            });
        }
    }

    getThermalNameList() {
        CommonServices.getData(`/DropdownList/GetAllThermalDDL`).then((temp) => {
            this.setState({
                thermalNameList: temp
            })
        })
    }

    handlethermalIdChanges(e) {
        this.setState({
            thermalId: e.target.value
        })
    }

    renderthermalNameList = () => {
        if (this.state.thermalNameList === undefined) {
            return null;
        }
        return this.state.thermalNameList.map((thermal, index) => {
            return <option key={index} value={thermal.thermalId}>{thermal.thermalName}</option>
        })
    }
}
export default connect(null, { enqueueSnackbarAction, closeSnackbar })(EditRemedyComponent)
