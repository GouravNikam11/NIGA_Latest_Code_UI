import React, { Component } from 'react';
import { Table, Col, FormGroup, Form, Row } from 'react-bootstrap';
import { Button, Card, CardBody, CardFooter, CardHeader, } from 'reactstrap';
import { Input, Label, Select } from 'reactstrap';
import CommonServices from '../../Services/CommonServices';
import { DatePickerInput } from "rc-datepicker";
import { connect } from 'react-redux';
import '../../components/CommanStyle.css';
import {
    enqueueSnackbar as enqueueSnackbarAction,
    closeSnackbar
} from '../../store/actions/notification';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';



class CreateNewsComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            newsId: 0,
            newsDate: "",
            newsCategoryId:0,
            newsCategory1:'',
            NewsHeading: "",
            NewsSubHeading: "",
            NewsContent: "",
            enteredBy: null,
            enteredDate: "",
            isActive: true,
            images: null,
            NewsCategory:[],
            ListNews: [],
            errors: {},
            startDate: new Date(),
            newsImage1: '',
            newsImage2: '',
            newsImage3: '',
            newsImage4: '',
            NewsDate: new Date(),
            file: null,
            base64URL: ""
        }

        // this.handleChange = this.handleChange.bind(this);
        // this.handleChangeForDate = this.handleChangeForDate.bind(this);
        //this.submitForm = this.submitForm.bind(this);
    }

    async componentDidMount() {
        this.getNewsCategory();
    }

    renderNewsCategory = () => {
        if (this.state.NewsCategory == undefined) {
            return null;
        }
        return this.state.NewsCategory.map((newsCategory, index) => {
            return <option key={index} value={newsCategory.newsCategoryId}>{newsCategory.newsCategory1}</option>
        })
    }

    render() {

        return (
            <Card>
                <CardHeader>
                    <i className="fa fa-align-justify"></i>
                    Add News
                </CardHeader>
                <CardBody>
                    <Form encType="multipart/form-data" className="form-horizontal">
                        <Row>
                            <Col xs="12" md="4">
                                <FormGroup >
                                    <Label className="label" htmlFor="">News Heading
                                        <span className="required">*</span> :</Label>
                                    <Form.Control type="text" placeholder="News Heading"
                                        name="NewsHeading"
                                        onChange={this.handleChange}
                                        value={this.state.NewsHeading === null ? '' : this.state.NewsHeading} />
                                    <span className="error">{this.state.errors["authorName"]}</span>

                                </FormGroup>
                            </Col>

                            <Col xs="12" md="4">
                                <FormGroup >
                                    <Label className="label" htmlFor="">News SubHeading :</Label>
                                    <Form.Control type="text" placeholder="News SubHeading"
                                        name="NewsSubHeading"
                                        onChange={this.handleChange}
                                        value={this.state.NewsSubHeading === null ? '' : this.state.NewsSubHeading} />
                                </FormGroup>
                            </Col>


                            <Col xs="12" md="4">
                                <FormGroup >
                                    <Label className="label" htmlFor="">News Date :</Label>
                                    <DatePickerInput
                                        dateFormat="yyyy/MM/dd"
                                        value={this.state.NewsDate}
                                        onChange={this.handleDateChange.bind(this)}
                                        name="selectednewsdate"
                                        selected={this.state.NewsDate}
                                    />
                                </FormGroup>
                            </Col>

                            
                        </Row>

                        <Row>
                        <Col xs="12" md="4">
                                <FormGroup >
                                    <Label className="label" htmlFor="">News Category
                                        <span className="required">*</span>:</Label>
                                    <Form.Control as="select"
                                        name="newsCategoryId"
                                        onChange={this.handleNewsCategory.bind(this)}
                                        value={this.state.newsCategoryId}>
                                        <option value="0">
                                            Select News Category
                                        </option>
                                        {
                                            this.renderNewsCategory()
                                        }
                                    </Form.Control>
                                    <span className="error">{this.state.errors["questionSectionId"]}</span>
                                </FormGroup>
                            </Col>
                        </Row>

                        <Row>
                       
                       <Col xs="12" >
                          <Label className="label" htmlFor="">News Content :</Label>                          
                           <CKEditor
                               editor={ClassicEditor}
                               data={this.state.NewsContent}
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

                     <br></br>
                        <Row>
                            <Col xs="24" md="3">
                                <img style={{
                                    height: '135px',
                                    width: '100 %',
                                    marginBottom:'10px'
                                }}   src={this.state.newsImage1} ></img>
                            </Col>
                            <Col xs="24" md="3">
                                <img style={{
                                    height: '135px',
                                    width: '100 %'
                                }}  src={this.state.newsImage2} ></img>
                            </Col>
                            <Col xs="24" md="3">
                                <img style={{
                                    height: '135px',
                                    width: '100 %'
                                }}   src={this.state.newsImage3} ></img>
                            </Col>
                            <Col xs="24" md="3">
                                <img style={{
                                    height: '135px',
                                    width: '100 %'
                                }}   src={this.state.newsImage4} ></img>
                            </Col>

                        </Row>



                        <Row>
                            <Col xs="24" md="3">
                                {/* <input type="file" name="file" onChange={this.ImageOnChangeHandler1} /> */}
                                <input type="file" name="newsImage1" onChange={this.handleFileInputChange1} />
                            </Col>

                            <Col xs="24" md="3">
                                <input type="file" name="newsImage2" onChange={this.handleFileInputChange2} />
                            </Col>

                            <Col xs="24" md="3">
                                <input type="file" name="newsImage3" onChange={this.handleFileInputChange3} />
                            </Col>

                            <Col xs="24" md="3">
                                <input type="file" name="newsImage4" onChange={this.handleFileInputChange4} />
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
                                <i className="fa fa-save"></i> Save
                            </Button> &nbsp;
                            <Button
                                type="reset"
                                style={{ textTransform: "uppercase" }}
                                onClick={() => this.props.history.push('/ListNewsComponent')}
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

    getNewsCategory() {
        debugger;
        CommonServices.getData(`/NewsCategory/GetAllNewsCategory`).then((temp) => {
            console.log("tufan====>>>>>>", temp);
            debugger;
            this.setState({
                NewsCategory: temp,
            })
        });
    }

    handleNewsCategory(e) {
        this.setState({
            newsCategoryId: e.target.value
        })
    }


    editorhandlechanges(e, NewsContent) {
        /*  this.data = details.getData();
         this.addData(e.data); */

        this.setState({ NewsContent: NewsContent })
    }
    handleDateChange = (value, formattedDate) => {
        console.log('formattedDate==', formattedDate)
        this.setState({ NewsDate: value, formattedDate: formattedDate }, () => {
        });
    }

    handleChange = (e) => {
        console.log('e.target.value ==', { [e.target.name]: e.target.value })
        this.setState({ [e.target.name]: e.target.value })
    }




    // validateForm() {
    //     let fields = this.state;

    //     let errors = {};
    //     let isFormValid = true;

    //     if (fields.authorName == "") {
    //         isFormValid = false;
    //         errors["authorName"] = "Please enter the author name"
    //     }

    //     this.setState({ errors });
    //     return isFormValid;
    // }


    ImageOnChangeHandler1 = event => {
        console.log('event.target.files[0]1==', event.target.files[0])
        this.setState({
            newsImage1: event.target.files[0]
        });
    };

    ImageOnChangeHandler2 = event => {
        console.log('event.target.files[0]2==', event.target.files[0])
        this.setState({
            newsImage2: event.target.files[0]
        });
    };

    ImageOnChangeHandler3 = event => {
        console.log('event.target.files[0]3==', event.target.files[0])
        this.setState({
            newsImage3: event.target.files[0]
        });
    };

    ImageOnChangeHandler4 = event => {
        console.log('event.target.files[0]4==', event.target.files[0])
        this.setState({
            newsImage4: event.target.files[0]
        });
    };

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


   
    //     debugger
    //    // console.log(e.target.name);
    //     let { file } = this.state;
    //     file = e.target.files[0];
    //     this.getBase64(file)
    //         .then(result => {
    //             file["base64"] = result;
    //             //console.log("File Is", file);
    //             if(e.target.name==newsImage1){
    //                 debugger
    //                 this.setState({     
    //                     newsImage1: result   
    //                 });
    //             }
    //             else if(e.target.name==newsImage2){
    //                 this.setState({                        
    //                     newsImage2: result                      
    //                 });
    //             }
    //             else if(e.target.name==newsImage3){
    //                 this.setState({                         
    //                     newsImage3: result                       
    //                 });                  
    //             }
    //             else{
    //                 this.setState({                        
    //                     newsImage4: result                       
    //                 });                  
    //             }   
    //         })
    //         .catch(err => {
    //             console.log(err);
    //         });
    //     this.setState({
    //         file: e.target.files[0]
    //     });
    // };


    handleFileInputChange1 = e => {
        // console.log(e.target.files[0]);
        let { file } = this.state;  
        file = e.target.files[0]; 

        this.getBase64(file)
          .then(result => {
            file["base64"] = result;
            console.log("File Is", result);
            this.setState({
                newsImage1: result
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
                newsImage2: result
            });
          })
          .catch(err => {
            console.log(err);
          });
    
        this.setState({
          file: e.target.files[0]
        });
      };

      handleFileInputChange3 = e => {
        // console.log(e.target.files[0]);
        let { file } = this.state;  
        file = e.target.files[0]; 

        this.getBase64(file)
          .then(result => {
            file["base64"] = result;
            console.log("File Is", result);
            this.setState({
                newsImage3: result
            });
          })
          .catch(err => {
            console.log(err);
          });
    
        this.setState({
          file: e.target.files[0]
        });
      };

      handleFileInputChange4 = e => {
        // console.log(e.target.files[0]);
        let { file } = this.state;  
        file = e.target.files[0]; 

        this.getBase64(file)
          .then(result => {
            file["base64"] = result;
            console.log("File Is", result);
            this.setState({
                newsImage4: result
            });
          })
          .catch(err => {
            console.log(err);
          });
    
        this.setState({
          file: e.target.files[0]
        });
      };


    submitForm() { 
        CommonServices.postData(this.state, `/NewsDetail/SaveNewsDetails`).then((responseMessage) => {
            this.props.enqueueSnackbarAction();
            this.props.history.push("ListNewsComponent")
        });
        // this.setState({
        //     newsId: 0,
        //     newsDate: "",
        //     newsHeading: "",
        //     newsSubHeading: "",
        //     newsContent: "",
        //     newsImage1: "",
        //     newsImage2: "",
        //     newsImage3: "",
        //     newsImage4: "",
        //     enteredBy: null,
        //     enteredDate: "",
        //     isActive: true,
        //     images: null,
        //     ListNews: [],
        //     errors: {},
        //     startDate: new Date(),
        //     newsImage1: null,
        //     newsImage2: null,
        //     newsImage3: null,
        //     newsImage4: null,
        // });

    };
}

export default connect(null, { enqueueSnackbarAction, closeSnackbar })(CreateNewsComponent)
