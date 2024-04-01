import React from 'react';
import { connect } from "react-redux"
import CommonServices from '../../Services/CommonServices';
import { Link } from 'react-router-dom';
import {
    enqueueSnackbar as enqueueSnackbarAction,
    closeSnackbar
} from '../../store/actions/notification';
import {
    Button,
    Card,
    CardBody,
    CardHeader,
    CardFooter,
    Col,
    FormGroup,
    Input,
    Label,
    Row,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
} from 'reactstrap';
import './styles.css'
import { DatePickerInput } from "rc-datepicker";
import 'rc-datepicker/lib/style.css';
import { FormLabel, Table, Form } from 'react-bootstrap';
import { getIntensities } from "../../store/actions/IntensityAction";

class DoctorDashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            PatientAppId: 0,
            patientList: [],
            doctorList: [],
            DoctorId: '',
            PatientId: '',
            AppointmentDate: '',
            AppointmentTime: '',
            Status: '',
            UserId: localStorage.getItem("UserId"),
            SearchKey: '',
            appointmentCount: '',
            Appdate: new Date(),
            IsDataFetched: false,
            toggleOrderModel: null,
            // toggleOrderModel: !JSON.parse(localStorage.getItem("isPlanActive")),
            isLastFiveDaysRemaining: JSON.parse(localStorage.getItem("islastFiveDays")),
            packageId: 0,
            packageName: '',
            caseCount: '',
            ListSubcription: [],
            validityInDays: '',
            amount: '',
            razorpay: null,
            SelectedPackage: {}
        }
        console.log("modal isfiveday==", localStorage.getItem("islastFiveDays"))
        this.handleChange = this.handleChange.bind(this);
        this.handleDateChange = this.handleDateChange.bind(this);
        this.handleDoctorChange = this.handleDoctorChange.bind(this);
        this.handlePaymentSuccess = this.handlePaymentSuccess.bind(this);
        this.handlePayment = this.handlePayment.bind(this);
    }

    patientAdd = () => {
        this.props.history.push('/PatientEntry');
    }
    billPay = () => {
        this.props.history.push('/');
    }
    async componentDidMount() {
        debugger;
        this.getListSubscription();
        this.props.getIntensities();
        await this.GetDoctor();
        this.GetAllCases();
        this.GetAllCount();
    }

    getListSubscription() {
        CommonServices.getData(`/package`).then((temp) => {
            debugger;
            console.log("Result======", temp)
            this.setState({
                ListSubcription: temp,
            })

            console.log(this.state);
        });
    }


    handlePayment() {
        debugger
        if (this.state.razorpay) {
            this.state.razorpay.open();
        } else {
            console.error('Razorpay is not initialized yet.');
        }
    }

    OnBuyClick(variant) {
        console.log(variant)
        debugger
        this.setState({
            SelectedPackage: variant
        })

        CommonServices.postData({
            "amount": 1,
            "currency": "INR",
            "receipt": "order_rcptid_11",
            "paymentCapture": 1
        }, `/Order/GenerateOrderId`).then((result) => {
            debugger
            console.log('result.orderId == ', result.data.orderId)
            if (result.data.orderId !== undefined) {
                const script = document.createElement('script');
                script.src = 'https://checkout.razorpay.com/v1/checkout.js';
                script.async = true;
                script.onload = () => {
                    // Initialize Razorpay
                    const razorpay = new window.Razorpay({
                        key: 'rzp_live_WSDlLVrcCPFbEQ',
                        amount: 1 * 100,
                        name: 'Homeo Centrum',
                        description: 'Payment For Docter Subscription',
                        order_id: result.data.orderId,
                        //image: '/your_logo.png',
                        handler: this.handlePaymentSuccess,
                        prefill: {
                            name: 'John Doe',
                            email: 'john@example.com',
                            contact: '9876543210'
                        },
                        notes: {
                            address: '123, Main Street, City, Country'
                        },
                        theme: {
                            color: '#F37254'
                        }
                    });

                    this.setState({ razorpay });
                };
                document.body.appendChild(script);
                setTimeout(() => {
                    this.handlePayment();
                }, 1000);
            }
        });
    }

    handlePaymentSuccess(paymentResponse) {
        // Handle payment success response from Razorpay
        console.log('obj == ', {
            "packageDetailId": 0,
            "packageId": this.state.SelectedPackage.packageId,
            "doctorId": localStorage.getItem("UserId"),
            "activationDate": new Date(),
            "orderId": paymentResponse.razorpay_order_id,
            "transactionId": paymentResponse.razorpay_signature,
            "paymentId": paymentResponse.razorpay_payment_id,
        })
        CommonServices.postData({
            "packageDetailId": 0,
            "packageId": this.state.SelectedPackage.packageId,
            "doctorId": parseInt(localStorage.getItem("UserId")),
            "activationDate": new Date(),
            "orderId": paymentResponse.razorpay_order_id,
            "transactionId": paymentResponse.razorpay_signature,
            "paymentId": paymentResponse.razorpay_payment_id,
        }, `/Subscription/SaveUpdateSubscription`).then((result) => {
            debugger
            console.log("result payment==", result);
            this.setState({ toggleOrderModel: false })

        })
        console.log('handlePaymentSuccess == ', paymentResponse);


    }

    renderDoctorList = () => {
        if (this.state.doctorList == undefined) {
            return null;
        }
        return this.state.doctorList.map((doctor, index) => {
            return <option key={index} value={doctor.doctorID}>{doctor.doctorName}</option>
        })
    }

    toggleOrderModal = () => {
        this.setState({
            toggleOrderModel: !this.state.toggleOrderModel,

        })
    };

    toggleSubscriptionEndAlertModal = () => {
        console.log("toggleSubscriptionEndAlertModal=",)
        this.setState({
            isLastFiveDaysRemaining: !this.state.isLastFiveDaysRemaining,

        })
    };

    render() {
        debugger;
        const searchTerm = this.state.SearchText;
        var patients;
        if (searchTerm != "" && searchTerm != undefined) {
            patients = this.state.patientList.filter((value) => {
                if (value.patientName.toLowerCase().indexOf(searchTerm) !== -1) {
                    return value;
                } else if (value.mobileNo.indexOf(searchTerm) !== -1) {
                    return value;
                }
            });
        }
        else {
            patients = this.state.patientList;
            console.log('>>>>>===>>>', patients)
        }
        return (
            <div>
                <Row>
                    <Col xs="12" md="12">
                        <Card>
                            <CardBody style={{ fontWeight: "600" }} >
                                <FormGroup style={{ marginBottom: 0 }}>
                                    <Row>
                                        <FormLabel column sm="1">Patient : </FormLabel>
                                        <Col sm="3">
                                            <Input type="search"
                                                placeholder="Search by Name / Mobile No."
                                                name='SearchText'
                                                value={this.state.SearchText}
                                                onChange={this.handleChange} />
                                        </Col>

                                        <FormLabel column sm="1">Doctor : </FormLabel>
                                        <Col sm="3">
                                            <Input type="select"
                                                name="DoctorId"
                                                onChange={this.handleDoctorChange}
                                                value={this.state.DoctorId}>
                                                {
                                                    this.renderDoctorList()
                                                }
                                            </Input>
                                        </Col>

                                        <FormLabel column sm="2">Date : </FormLabel>
                                        <FormLabel column sm="2"><i className="fa fa-calendar" aria-hidden="true"></i> &nbsp;&nbsp;|&nbsp;&nbsp; {(this.state.Appdate.getDate() + "-" + (this.state.Appdate.getMonth() + 1) + "-" + this.state.Appdate.getFullYear())}</FormLabel>

                                    </Row>

                                    <Row>

                                        <FormLabel column sm="2" style={{ color: "#0d37d3" }}>Waiting : </FormLabel>
                                        <FormLabel column sm="2" style={{ color: "#0d37d3" }}><i className="fa fa-hourglass-half" aria-hidden="true"></i> &nbsp;&nbsp;|&nbsp;&nbsp; {this.state.appointmentCount.patientAppWaiting}</FormLabel>

                                        <FormLabel column sm="2" style={{ color: "#ff0000" }}>Not Arrived : </FormLabel>
                                        <FormLabel column sm="2" style={{ color: "#ff0000" }}><i className="fa fa-ban" aria-hidden="true"></i> &nbsp;&nbsp;|&nbsp;&nbsp; {this.state.appointmentCount.patientAppNotArrived}</FormLabel>

                                        <FormLabel column sm="2" style={{ color: "#00a100" }}>Completed : </FormLabel>
                                        <FormLabel column sm="2" style={{ color: "#00a100" }}><i className="fa fa-check-square-o" aria-hidden="true"></i> &nbsp;&nbsp;|&nbsp;&nbsp; {this.state.appointmentCount.patientAppComplated}</FormLabel>

                                    </Row>

                                    <Row>

                                        <FormLabel column sm="2" style={{ color: "#d3960d" }}>Walk-Ins : </FormLabel>
                                        <FormLabel column sm="2" style={{ color: "#d3960d" }}>&nbsp;<i className="fa fa-male" aria-hidden="true"></i> &nbsp;&nbsp;|&nbsp;&nbsp; 0</FormLabel>

                                        <FormLabel column sm="2" style={{ color: "#d800ff" }}>E-Consult : </FormLabel>
                                        <FormLabel column sm="2" style={{ color: "#d800ff" }}><i className="fa fa-laptop" aria-hidden="true"></i> &nbsp;&nbsp;|&nbsp;&nbsp; 0</FormLabel>

                                        <FormLabel column sm="2" style={{ color: "#5aa2e0" }}>Total : </FormLabel>
                                        <FormLabel column sm="2" style={{ color: "#5aa2e0" }}><i className="fa fa-list-alt" aria-hidden="true"></i> &nbsp;&nbsp;|&nbsp;&nbsp; 0</FormLabel>

                                    </Row>

                                </FormGroup>
                            </CardBody>
                        </Card>
                        <Card>
                            <CardHeader style={{ padding: 8 }}>
                                <Row>
                                    <Col md="6" style={{ paddingTop: 5 }}>
                                        <i className="fa fa-pencil-square headerIcon"></i> Appointments
                                    </Col>
                                    <Col md="4"></Col>
                                    <Col md="2">
                                        <FormGroup style={{ marginBottom: 0, width: 100 }}>
                                            <DatePickerInput
                                                dateFormat="yyyy/MM/dd"
                                                value={this.state.Appdate}
                                                onChange={this.handleDateChange}
                                                name="Appdate"
                                                selected={this.state.Appdate}
                                            />
                                        </FormGroup>
                                    </Col>
                                </Row>
                            </CardHeader>


                            <CardBody>
                                <Table responsive="sm" style={{ marginBottom: 0 }} hover bordered >
                                    <thead>
                                        <tr>
                                            <th style={{ width: "20%", textAlign: "left" }}>Name</th>
                                            <th style={{ width: "15%", textAlign: "center" }}>Phone</th>
                                            <th style={{ width: "15%", textAlign: "center" }}>Time</th>
                                            <th style={{ width: "15%", textAlign: "center" }}>Payment</th>
                                            <th style={{ width: "15%", textAlign: "center" }}>Status</th>
                                            <th style={{ width: "20%", textAlign: "center" }}>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            patients ?
                                                patients.map((value, index) => {
                                                    return (
                                                        <tr key={index}>
                                                            <td className="tbl1">
                                                                <Link to={"/PatientDashboard/" + value.patientId + "/" + value.caseId + "/" + value.patientAppId + "/" + value.doctorId}>
                                                                    <p style={{ color: "#007bff", textTransform: "uppercase", padding: 0, margin: 0 }}>{value.patientName}</p>
                                                                </Link></td>
                                                            <td className="tbl">{value.mobileNo}</td>
                                                            <td className="tbl"> {new Date(`2000-01-01T${value.appointmentTime}`).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit', hour12: true })}</td>
                                                            <td className="tbl"></td>
                                                            <td className="tbl">{value.status}</td>
                                                            <td className="tbl2" style={{ textAlign: "center" }}>
                                                                <Link to={"/PatientDashboard/" + value.patientId + "/" + value.caseId + "/" + value.patientAppId + "/" + value.doctorId}>
                                                                    <Button style={{ fontSize: "12px" }} size="md" color="primary"><i className="fa fa-plus-square"></i> ADD SYMPTOM</Button> &nbsp;
                                                                </Link>
                                                                <Link to={"/EditPatientAppointment/" + value.patientAppId}>
                                                                    <Button onClick={() => this.editPatientApp(value.patientAppId)} style={{ fontSize: "12px" }} size="md" color="danger"><i className="fa fa-pencil-square"></i> EDIT</Button> &nbsp;
                                                                </Link>
                                                            </td>
                                                        </tr>
                                                    )
                                                }) : null
                                        }
                                    </tbody>
                                </Table>
                            </CardBody>
                        </Card>
                    </Col>

                </Row>

                <div className="row ">
                    <div className="col-sm-1"></div>
                    <div className="col-sm-10">
                        <div className="sticky" >
                            <div className="stickyc">
                                <span className="rndv">{this.state.appointmentCount.patientAppNotArrived}</span>  Not Arrived &nbsp;&nbsp;&nbsp;&nbsp;
                                <span className="rndv">0</span>  Walk-Ins &nbsp;&nbsp;&nbsp;&nbsp;
                                <span className="rndv">0</span>  Regular &nbsp;&nbsp;&nbsp;&nbsp;
                                <span className="rndv">0</span>  Guaranteed &nbsp;&nbsp;&nbsp;&nbsp;
                                <span className="rndv">0</span>  Video Consult &nbsp;&nbsp;&nbsp;&nbsp;
                                <span className="rndv">{this.state.appointmentCount.patientAppComplated}</span>  Completed &nbsp;&nbsp;&nbsp;&nbsp;
                                <span className="rndv">{this.state.appointmentCount.patientApp}</span>  Total &nbsp;&nbsp;&nbsp;&nbsp;
                            </div>

                        </div>
                    </div>
                    <div className="col-sm-1"></div>
                </div>

                <Modal backdrop="static" size="xl" isOpen={this.state.toggleOrderModel} toggle={this.toggleOrderModal.bind(this)} >
                    <ModalBody>
                        <div >
                            {/* <CardHeader>Subscriptions</CardHeader> */}
                            <center><h2 class="mb-3">Choose Your Subscription</h2></center>
                            <div>
                                <Form className="form-horizontal">
                                    <Row >
                                        {this.state.ListSubcription.map((variant, idx) => (

                                          
                                            // card-trial, card-basic, card-standard, card-gold, card-premium, card-super
                                            // header-trial, header-basic, header-standard, header-gold, header-premium, header-super
                                            // card-element-hiddens-trial, card-element-hiddens-basic, card-element-hiddens-standard, card-element-hiddens-gold, card-element-hiddens-premium, card-element-hiddens-super
                                            // btn-trial, btn-basic, btn-standard, btn-gold, btn-premium, btn-super


                                            <Col xs="12" md="4">

                                                <div class="col-md-12 ">
                                                    <div class="card-trial">
                                                        <div class="card-headers header-trial">
                                                        <h3 class="card-titles">{variant.packageName}</h3>
                                                        </div>
                                                        <div class="card-bodys">
                                                        <h2 class="mb-2">₹ {variant.amount} /-</h2>
                                                        <div class="card-element-hiddens-trial">
                                                            <ul class="card-element-containers">
                                                                <li class="card-elements"><b>{variant.validityInDays}</b> Days Validity</li>
                                                                <li class="card-elements"><b>{variant.caseCount}</b> No. of Cases *</li>
                                                                <li class="card-elements"><b>1</b> Logins *</li>
                                                                <li class="card-elements">Include <b>All</b> Modules *</li>
                                                            </ul>
                                                            <Button className="btns btn-trial" onClick={() => this.OnBuyClick(variant)}>Buy Now</Button>
                                                        </div>
                                                        </div>
                                                    </div>
                                                </div>


                                                {/* <Row >
                                                    <div class="col-md-12">
                                                        <div class="orange-moon" >
                                                            <h3 class="pcknm">{variant.packageName}</h3>

                                                            <div class="text-center">
                                                                <i class="fa fa-rupee pckrp" > </i> <span class="pckvl">{variant.amount} /-</span>
                                                            </div>

                                                            <Label className="pcklbl"> <i class="fa fa-check-circle chkcrl"></i> Case Count : {variant.caseCount} </Label>

                                                            <Label className="pcklbl"> <i class="fa fa-check-circle chkcrl"></i> Validation : {variant.validityInDays} Days</Label>

                                                            <div class="text-center">
                                                                <Button className='pckbtn' size="lg" onClick={() => this.OnBuyClick(variant)}> BUY NOW </Button>
                                                            </div>
                                                        </div>
                                                    </div>

                                                </Row> */}
                                            </Col>

                                        ))}
                                    </Row>
                                </Form>

                            </div>
                            {/* <CardFooter>
                                <Row>
                                    <Col xs="12" md="6">

                                    </Col>
                                    <Col xs="12" md="6" style={{ textAlign: "right" }}>

                                    </Col>
                                </Row>
                            </CardFooter> */}
                        </div>
                    </ModalBody>
                </Modal>
                <Modal size="lg" isOpen={this.state.isLastFiveDaysRemaining} toggle={this.toggleSubscriptionEndAlertModal.bind(this)} >
                    <ModalBody>
                        <Card >
                            <CardHeader>Subscriptions</CardHeader>
                            <CardBody>
                                5 Days Remain for expairation
                            </CardBody>
                            <CardFooter>
                                <Row>
                                    <Col xs="12" md="6">

                                    </Col>
                                    <Col xs="12" md="6" style={{ textAlign: "right" }}>

                                    </Col>
                                </Row>
                            </CardFooter>
                        </Card>
                    </ModalBody>
                </Modal>
            </div>
        )
    }
    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }
    handleDateChange = (value, formattedDate) => {
        this.setState({ Appdate: value, formattedDate: formattedDate }, () => {
            this.GetAllCases();
            this.GetAllCount();
        });
    }

    handleDoctorChange(e) {
        this.setState({
            DoctorId: e.target.value
        })
    }
    async GetDoctor() {
        var userId = localStorage.getItem("UserId");
        var result = await CommonServices.getDataById(userId, `/mastersAPI/GetDoctorDetails`);
        this.setState({
            doctorList: result,
        });
    }

    GetAllCases() {
        var patient = {
            UserId: localStorage.getItem("UserId"),
            AppointmentDate: (this.state.Appdate.getFullYear() + "-" + (this.state.Appdate.getMonth() + 1) + "-" + this.state.Appdate.getDate()),
        };

        console.log(patient);
        CommonServices.postData(patient, `/doctorDashBoard`).then((result) => {
            this.setState({
                patientList: result.data,


            })

        });

    }

    GetAllCount() {
        var patient = {
            UserId: localStorage.getItem("UserId"),
            AppointmentDate: (this.state.Appdate.getFullYear() + "-" + (this.state.Appdate.getMonth() + 1) + "-" + this.state.Appdate.getDate()),
        };
        CommonServices.postData(patient, `/doctorDashBoard/GetCountApp`).then((result) => {
            debugger;

            console.log('GetAllCount====>>>>>', result)

            this.setState({
                appointmentCount: result.data,
            })
        })
    }

    editPatientApp(patientAppId) {
        debugger;
        CommonServices.getDataById(patientAppId, `/patientApp`).then((res) => {

            this.setState({
                patientAppId: res.patientAppId,
                PatientId: res.patientId,
                DoctorId: res.doctorID,
                AppointmentDate: res.appointmentDate,
                AppointmentTime: res.appointmentTime,
                Status: res.status,
                DeleteStatus: false
            })
        });
    }

};

const mapStateToProps = (state) => ({
    // patient: state.patient.patient,
    // state: state.rubrics,
});

const mapDispatchToProps = {
    enqueueSnackbarAction,
    getIntensities,
    closeSnackbar
}

export default connect(mapStateToProps, mapDispatchToProps)(DoctorDashboard)