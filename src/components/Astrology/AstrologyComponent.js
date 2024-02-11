// import React, { Component } from 'react';
// import AstroService from '../../Services/AstroService';
// import { Table, Col, FormGroup, Form, Row } from 'react-bootstrap';
// import { Input, Label, Select } from 'reactstrap';
// import { Button, Card, CardBody, CardFooter, CardHeader,} from 'reactstrap';
// import { DatePickerInput } from "rc-datepicker";
// import 'rc-datepicker/lib/style.css';
// import { connect } from 'react-redux';

// export class AstrologyComponent extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             astroBasicList: [],
//             dateofBirth: new Date(),
//             birthTime: new Date(),
//             latitude: '',
//             longitude: '',
//             timeZone: '',
//             day: '',
//             month: '',
//             year: '',
//             hour: '',
//             min: '',
//             lat: '',
//             lon: '',
//             tzone: ''
//         }
//          this.handleChange = this.handleChange.bind(this);
//     }
//     // componentDidMount() {
//     //     this.planetBasic();
//     // }
//     render() {
//         return (
    
//             <Card>

//             <CardHeader>
//                 <i className="fa fa-align-justify"></i>
//                 Astrology
//             </CardHeader>

//             <CardBody>
//                 <Form encType="multipart/form-data" className="form-horizontal">
//                     <Row>
//                         <Col xs="12" md="4">
//                             <FormGroup >
//                                 <Label className="label" htmlFor="">Birth Of Date: :</Label>
//                                 <DatePickerInput
//                                                 dateFormat="yyyy/MM/dd"
//                                                 value={this.state.dateOfBirth}
//                                                 onChange={this.handleDateChange.bind(this)}
//                                                 name="dateOfBirth"
//                                                 selected={this.state.dateOfBirth}
//                                             />
//                             </FormGroup>
//                         </Col>

//                         <Col xs="12" md="4">
//                             <FormGroup >
//                                 <Label className="label" htmlFor="">Birth Time :</Label>
//                                 <Form.Control type="time"
//                                                     name="birthTime"
//                                                     onChange={this.handleChange}
//                                                     value={this.state.birthTime === null ? '' : this.state.birthTime} />
//                             </FormGroup>
//                         </Col>

//                         <Col xs="12" md="4">
//                             <FormGroup >
//                                 <Label className="label" htmlFor="">Latitude :</Label>
//                                 <Form.Control type="text" placeholder="Latitude"
//                                                     name="latitude"
//                                                     onChange={this.handleChange}
//                                                     value={this.state.latitude === null ? '' : this.state.latitude} />
//                             </FormGroup>
//                         </Col>
//                     </Row>

//                     <Row>
//                         <Col xs="12" md="4">
//                             <FormGroup >
//                                 <Label className="label" htmlFor="">Longitude :</Label>
//                                 <Form.Control type="text" placeholder="Longitude"
//                                                     name="longitude"
//                                                     onChange={this.handleChange}
//                                                     value={this.state.longitude === null ? '' : this.state.longitude} />
//                             </FormGroup>
//                         </Col>

//                         <Col xs="12" md="4">
//                             <FormGroup >
//                                 <Label className="label" htmlFor="">Time Zone :</Label>
//                                 <Form.Control type="text" placeholder="Time Zone"
//                                                     name="timeZone"
//                                                     onChange={this.handleChange}
//                                                     value={this.state.timeZone === null ? '' : this.state.timeZone} />
//                             </FormGroup>
//                         </Col>

                     
//                     </Row>

//                 </Form>
//             </CardBody>

//             <CardFooter>
//                     <Row>
                    
//                         <Col xs="12" md="6">

//                             <Button
//                                 type="button"
//                                 style={{ textTransform: "uppercase" }}
//                                 onClick={this.planetBasic.bind(this)}
//                                 size="sm" color="primary"><i className="fa fa-save"></i> Submit
//                             </Button>
                            
//                         </Col>
//                         <Col xs="12" md="6" style={{ textAlign: "right" }}>
//                             <Label style={{ fontSize: 15 , margin: 0, paddingTop : 5}}> Fields marked with an asterisk <span className="required">*</span> are mandatory</Label>
//                         </Col>

//                     </Row>

//             </CardFooter>

//                 <div style={{ padding: 10 }}>
//                     <p>Basic Astro</p>
//                     {
//                         this.state.astroBasicList ?
//                             this.state.astroBasicList.map((value, index) => {
//                                 return (
//                                     <div>{value.name} {value.isRetro == 'true' ? 'is retro' : 'is not retro'},{" "}
//                                         {value.name} in {value.sign},{" "}
//                                         {value.name} sign lord {value.signLord},{" "}
//                                         {value.name} nakshatra {value.nakshatra},{" "}
//                                         {value.name} nakshatra lord {value.nakshatraLord},{" "}
//                                         {value.name} is prsent in {value.house}th house of chart
//                                     </div>
//                                 )
//                             }) : null
//                     }
//                 </div>
            
//         </Card>   
             
                            
                                

                    
//         )
//     }
//     handleChange(e) {
//         this.setState({
//             [e.target.name]: e.target.value
//         });
//     }
//     handleDateChange = (value, formattedDate) => {
//         this.setState({ dateOfBirth: value, formattedDate: formattedDate }, () => {          
//         });
//     }
   
//     planetBasic() {
//         debugger;
//       //  const number =  this.state.birthTime.parseInt('en-US', { hour: 'numeric', hour24: true })
//       //var c=  Intl.DateTimeFormat('en-US', { hour: '2-digit', hour24: true }).format(this.state.birthTime);
//         var astro = {
//             day: this.state.dateOfBirth.getDay(),
//             month: this.state.dateOfBirth.getMonth(),
//             year: this.state.dateOfBirth.getFullYear(),
//             hour:parseInt(this.state.birthTime.split(':')[0]),
//             min: parseInt(this.state.birthTime.split(':')[1]),
//             lat: this.state.latitude,
//             lon: this.state.longitude,
//            tzone:this.state.timeZone
//     };
     
//     this.props.history.push(
//         {

//             pathname:'/GetAstrologyComponent',
//             state:astro
//         }
//     )
//         AstroService.postData(astro, `/planets`).then((responseMessage) => {
//             console.log(responseMessage);
//             this.setState({
//                 astroBasicList: responseMessage.data,
//             })
//         });

       
//     }
 
  
    
// };
// const mapStateToProps = (state) => ({
//     state: state,
  
// });

// export default connect(mapStateToProps)(AstrologyComponent)