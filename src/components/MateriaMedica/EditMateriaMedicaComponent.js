import React, { Component } from 'react';
import { Table, Col, FormGroup, Form, Row } from 'react-bootstrap';
import { Button, Card, CardBody, CardFooter, CardHeader, } from 'reactstrap';
import { Input, Label } from 'reactstrap';
import CommonServices from '../../Services/CommonServices';
import '../../components/CommanStyle.css';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import axios from 'axios'

export class EditMateriaMedicaComponent extends Component {

    /**
     * Created Date     :   19 Dec 2019  
     * purpose          :   Component responsible for handling DiagnosisMaster records   
     * Author           :   
     */
    constructor(props) {

        super(props);
        this.state = {
            dose:'',
            enteredBy: '',
            enteredDate: "",
            changedBy: '',
            changedDate: "",
            seqNo: 0,
            matriaMedicaDetailId: 0,
            materiaMedicaHeadId: 0,
            materiaMedicaId: 0,
            HeadList: [],
            materiaMedicaHeadName: '',
            remedyName: '',
            remedyId: '',
            RemedyList: [],
            authorId: '',
            modelEx: [],
            details: '',
            authourList: [],
            IsDeleted: false
        }
        this.handleChange = this.handleChange.bind(this);
        this.submitForm = this.submitForm.bind(this);
    }
    componentDidMount() {
        debugger;
        var Id = this.props.match.params.id;
        this.editMateriaMedica(this.props.match.params.id);
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
    render() {
        return (

            <Card>

                <CardHeader>
                    <i className="fa fa-align-justify"></i>
                    Edit Materia Medica Details
                </CardHeader>

                <CardBody>
                    <Form encType="multipart/form-data" className="form-horizontal">
                        <Row>
                            <Col xs="12" md="4">
                                <FormGroup >
                                    <Label className="label" htmlFor="">Author:</Label>
                                    <Form.Control as="select"
                                        name="authorId"
                                        onChange={this.handleChange}
                                        value={this.state.authorId === null ? '' : this.state.authorId}>
                                        {/* <option value="0">Select</option> */}
                                        {
                                            this.renderauthorList()
                                        }
                                    </Form.Control>
                                </FormGroup>
                            </Col>


                            <Col xs="12" md="4">
                                <FormGroup >
                                    <Label className="label" htmlFor="">Remedy :</Label>
                                    <Form.Control as="select"
                                        name="remedyId"
                                        onChange={this.handleChange}
                                        value={this.state.remedyId === null ? '' : this.state.remedyId}>
                                        {/* <option value="0">Select</option> */}
                                        {
                                            this.renderRemedyList()
                                        }
                                    </Form.Control>
                                </FormGroup>
                            </Col>

                            <Col xs="12" md="4">
                                <FormGroup >
                                    <Label className="label" htmlFor="">Head :</Label>
                                    <Form.Control as="select"
                                        name="materiaMedicaHeadId"
                                        onChange={this.handleChange}
                                        value={this.state.materiaMedicaHeadId === null ? '' : this.state.materiaMedicaHeadId}>
                                        {/* <option value="0">Select</option> */}
                                        {
                                            this.renderHeadList()
                                        }
                                    </Form.Control>
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row>
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
    /**
    * Created Date     :   19 Des 2019
    * purpose          :   Handling change event of all input fields
    * Author           :   
    */
    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value })
    }


    /**
         * will call when page rendered.
         */
    async componentDidMount() {
        debugger;
        var Id = this.props.match.params.id;
        this.editMateriaMedica(Id);
        await this.getauthor();
        this.setState({
            authorId: Id
        });
        await this.getremedy();
        this.setState({
            remedyId: Id
        });
        await this.getHead();
        this.setState({
            materiaMedicaHeadId: Id
        });
    }


    editorhandlechanges(e, details) {
        debugger;
        console.log('details+++=====>>>>>',details)
        /*  this.data = details.getData();
         this.addData(e.data); */

        this.setState({
            details: details,
            modelEx: [{
                "matriaMedicaDetailId": this.state.matriaMedicaDetailId,
                "materiaMedicaId": this.state.materiaMedicaId,
                "details": details
            }]

        })

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

    getHead() {
        CommonServices.getData(`/MateriaMedicaHead/GetMateriaMedicaHead`).then((temp) => {
            this.setState({
                HeadList: temp
            })
        })
    }
    /**
         * Created  Date    :   19 Dec 2019
         * Purpose          :   Submit Form for adding new diagnosis sroup
         * Author           :   
         */
    submitForm() {
        var array = []
        debugger;
        var obj = {
            "materiaMedicaId": parseInt(this.state.materiaMedicaId),
            "authorId": parseInt(this.state.authorId),
            "remedyId": parseInt(this.state.remedyId),
            "materiaMedicaHeadId": parseInt(this.state.materiaMedicaHeadId),
            "isDeleted": false,
            "modelEx": this.state.modelEx
        }
        array.push(obj)
        debugger;
        CommonServices.postData(obj, `/MateriaMedicaMaster`).then((responseMessage) => {
            debugger;
            alert(responseMessage.data);
            // this.refreshList();
            this.props.history.push('/ListMateriaMedicaComponent');
        });
        this.setState({
            materiaMedicaId:0,
            materiaMedicaHeadId: 0,
            remedyId: 0,
            authorId: 0,
            modelEx: [],
            isDeleted: false
        });
    }
    /**
    * Created Date     :   17 Dec 2019.
    * Purpose          :   Get diagnosis record for edit.
    * Author           :   Chandrashekhar Salagar.
    */
    editMateriaMedica(materiaMedicaId) {
        debugger;
        if (materiaMedicaId != undefined) {
            CommonServices.getDataById(materiaMedicaId, `/MateriaMedicaMaster`).then((res) => {
                debugger;
                console.log('res======>>>>>>', res)
                this.setState({
                    materiaMedicaId: res.materiaMedicaId,
                    authorId: res.authorId,
                    remedyId: res.remedyId,
                    materiaMedicaHeadId: res.materiaMedicaHeadId,
                    modelEx: res.modelEx,

                })
                var copyTableData = this.state.modelEx;
                debugger;
                copyTableData.forEach(element => {
                    console.log("printed====>>>>", element)
                    debugger;
                    let obj = {

                        details: element.details,
                    }
                    this.setState(
                        {
                            details: element.details,
                            matriaMedicaDetailId: element.matriaMedicaDetailId
                        })
                    //this.state.Editordetails.push(obj)
                });
            });
        }
    }
}

export default EditMateriaMedicaComponent
