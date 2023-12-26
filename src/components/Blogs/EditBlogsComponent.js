import React, { Component } from 'react';
import { Table, Col, FormGroup, Form, Row } from 'react-bootstrap';
import { Button, Card, CardBody, CardFooter, CardHeader, } from 'reactstrap';
import { Input, Label, Select } from 'reactstrap';
import CommonServices from '../../Services/CommonServices';
import { connect } from 'react-redux';
import moment from 'moment';
import { DatePickerInput } from "rc-datepicker";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

import '../../components/CommanStyle.css';
import {
    enqueueSnackbar as enqueueSnackbarAction,
    closeSnackbar
} from '../../store/actions/notification';
import "react-datepicker/dist/react-datepicker.css";
import 'bootstrap/dist/css/bootstrap.min.css';


class EditBlogComponent extends Component {
    constructor(props) {
        super(props)
        //debugger;
        this.state = {
            blogId: 0,
            blogHead: "",
            blogSubHead: "",
            blogImage1: '',
            blogImage2: '',
            blogDetails1: "",
            isActive: true,
            errors: {},
            blogDate: '',
           
        }

        this.handleChange = this.handleChange.bind(this);
        //  this.submitForm = this.submitForm.bind(this);

    }


    componentDidMount() {
        debugger;
        console.log('match =', this.props.match)
        var blogId = this.props.match.params.blogId;
        this.editBlog(blogId);

    }

    render() {
        console.log('state var == ', this.state.startDate)
        return (
            <Card>
                <CardHeader>
                    <i className="fa fa-align-justify"></i>
                    Edit Blog
                </CardHeader>
                <CardBody>
                    <Form encType="multipart/form-data" className="form-horizontal">
                        <Row>
                            <Col xs="12" md="4">
                                <FormGroup >
                                    <Label className="label" htmlFor=""> Blog Heading
                                        <span className="required">*</span> :</Label>
                                    <Form.Control type="text" placeholder="News Heading"
                                        name="blogHead"
                                        onChange={this.handleChange}
                                        value={this.state.blogHead === null ? '' : this.state.blogHead} />
                                    <span className="error">{this.state.errors["authorName"]}</span>

                                </FormGroup>
                            </Col>

                            <Col xs="12" md="4">
                                <FormGroup >
                                    <Label className="label" htmlFor="">Blog SubHeading :</Label>
                                    <Form.Control type="text" placeholder="News SubHeading"
                                        name="blogSubHead"
                                        onChange={this.handleChange}
                                        value={this.state.blogSubHead === null ? '' : this.state.blogSubHead} />
                                </FormGroup>
                            </Col>

                            <Col xs="12" md="4">
                                <FormGroup >
                                    <Label className="label" htmlFor="">Blog Date :</Label>
                                    <DatePickerInput
                                        dateFormat="yyyy/MM/dd"
                                        value={this.state.blogDate}
                                        onChange={this.handleDateChange}
                                        name="blogDate"
                                        selected={this.state.blogDate}
                                    />
                                </FormGroup>
                            </Col>
                        </Row>

                   
                        <Row>
                            <Col xs="24" md="3">
                                <img style={{
                                    height: '135px',
                                    width: '100 %'
                                }}
                                    src={this.state.blogImage1} ></img>
                            </Col>
                            <Col xs="24" md="3">
                                <img style={{
                                    height: '135px',
                                    width: '100 %'
                                }}
                                    src={this.state.blogImage2}></img>
                            </Col>
                        </Row>

                        <br></br>

                        <Row>
                            <Col xs="24" md="3">
                                {/* <input type="file" name="file" onChange={this.ImageOnChangeHandler1} /> */}
                                <input type="file" name="newsImage1" onChange={this.handleFileInputChange1} />
                            </Col>

                            <Col xs="24" md="3">
                                <input type="file" name="newsImage2" onChange={this.handleFileInputChange2} />
                            </Col>
                        </Row>

                        <br></br>
                        <Row>
                       
                            <Col xs="12" >
                               <Label className="label" htmlFor="">Blog Details :</Label>                          
                                <CKEditor
                                    editor={ClassicEditor}
                                    data={this.state.blogDetails1}
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
                                onClick={this.submitForm.bind(this)}
                                size="sm" color="primary">
                                <i className="fa fa-save"></i> Update
                            </Button> &nbsp;
                            <Button
                                type="reset"
                                style={{ textTransform: "uppercase" }}
                                onClick={() => this.props.history.push('/ListBlogsComponent')}
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


    editorhandlechanges(e, blogDetails1) {
        /*  this.data = details.getData();
         this.addData(e.data); */

        this.setState({ blogDetails1: blogDetails1 })
    }







    handleDateChange = (value, formattedDate) => {
        debugger
        console.log('formattedDate==', formattedDate)
        this.setState({ blogDate: value, formattedDate: formattedDate }, () => {
        });
    }

    getBase64 = file => {
        return new Promise(resolve => {
            let fileInfo;
            let baseURL = "";
            // Make new FileReader
            let reader = new FileReader();

            // Convert the file to base64 text
            reader.readAsDataURL(file);

            // on reader load somthing...
            reader.onload = () => {
                // Make a fileInfo Object
                console.log("Called", reader.result);
                baseURL = reader.result;
                console.log(baseURL);
                resolve(baseURL);
            };
            console.log(fileInfo);
        });
    };


    handleFileInputChange1 = e => {
        // console.log(e.target.files[0]);
        let { file } = this.state;
        file = e.target.files[0];

        this.getBase64(file)
            .then(result => {
                file["base64"] = result;
                console.log("File Is", result);
                this.setState({
                    blogImage1: result
                });
            })
            .catch(err => {
                console.log(err);
            });

        this.setState({
            file: e.target.files[0]
        });
    };

    handleFileInputChange2 = e => {
        // console.log(e.target.files[0]);
        let { file } = this.state;
        file = e.target.files[0];

        this.getBase64(file)
            .then(result => {
                file["base64"] = result;
                console.log("File Is", result);
                this.setState({
                    blogImage2: result
                });
            })
            .catch(err => {
                console.log(err);
            });

        this.setState({
            file: e.target.files[0]
        });
    };

    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value })
    }


    submitForm() {
        debugger
        console.log('this.state=====',this.state)
        CommonServices.postData(this.state, `/BlogDetail`).then((responseMessage) => {
            this.props.enqueueSnackbarAction("Record updated successfully");
            this.props.history.push("/ListBlogsComponent")
        });


    };

    editBlog(blogId) {
        debugger;
        console.log('blogId===',blogId)
        CommonServices.getDataById(blogId, `/BlogDetail/GetBlogDetailById`).then((res) => {
            debugger;
            console.log('res.newsImage1 == ', res)
            this.setState({
                blogId: res.blogId,
                blogHead: res.blogHead,
                blogSubHead: res.blogSubHead,
                blogDate: res.blogDate,
                blogImage1: res.blogImage1,
                blogImage2: res.blogImage2,
                blogDetails1: res.blogDetails1,
                isActive: true,
            })
        });

    }

}
export default connect(null, { enqueueSnackbarAction, closeSnackbar })(EditBlogComponent)