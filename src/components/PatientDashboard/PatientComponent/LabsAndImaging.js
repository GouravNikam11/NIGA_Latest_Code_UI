import React from 'react';
import { connect } from 'react-redux';
import { getLabs, saveLabOrder, saveLabEntry } from '../../../store/actions/LabActions';
import { enqueueSnackbar } from '../../../store/actions/notification';
import { Table } from 'react-bootstrap';
import Select from "react-select";
import Pagination from "react-js-pagination";
import AsyncPaginate from "react-select-async-paginate";
import CommonServices from '../../../Services/CommonServices';
import '../../../components/CommanStyle.css';
import {
    enqueueSnackbar as enqueueSnackbarAction,
    closeSnackbar
} from '../../../store/actions/notification';
import { getPatient } from '../../../store/actions/Patient';

import {
    Col,
    Row,
    TabPane,
    Card,
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Form,
    Label,
    Input,
    FormGroup

} from 'reactstrap';
import DatePicker from "reactstrap-date-picker";
require('../styles.css');
class LabsAndImaging extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            toggleOrderModel: false,
            toggleLabEntryModal: false,
            isLoading: false,
            testName: "",
            testName2: "",
            patientLabTestId: 0,
            testId2: "",
            orderDate: null,
            formattedDate: "",
            labName: "",
            patientId: "",
            labEnteryTestId: "",
            labDate: null,
            parameterName: "",
            parameterValue: "",
            errors: {},
            GetLabTest: [],
            ORDEREDLABSANDIMAGINGList: [],
            LABSANDIMAGINGRESULTList: [],
            description: "",
            description2: "",
            patientOrderedTestId: 0,
            currentPage: 1,
            pageSize: 5,
            currentPage2: 1,
            pageSize2: 5,
        }
    }

    async componentDidMount() {
        this.setState({
            ORDEREDLABSANDIMAGINGList: [],
            LABSANDIMAGINGRESULTList: [],
        });
        await this.GetListingORDEREDLABSANDIMAGING(this.props.patientId);
        await this.GetListingLABSANDIMAGINGRESULT(this.props.patientId);
        this.GetLabTest();
    }

    // async componentDidUpdate(prevProps) {
    //     debugger
    //     const { patientID } = this.props.notification.notification.patient;
    //     if (patientID !== prevProps.notification.notification.patient.patientID) {
    //         this.setState({
    //             ORDEREDLABSANDIMAGINGList: [],
    //             LABSANDIMAGINGRESULTList: [],
    //         });
    //         await this.GetListingORDEREDLABSANDIMAGING(patientID);
    //         await this.GetListingLABSANDIMAGINGRESULT(patientID);
    //     }
    // }

    /**
     * Render functions
     */
    renderTest() {
        const { labTests } = this.props.labOrderEntry;
        if (!labTests.length) {
            return null;
        }
        return labTests.map((test, index) => {
            return (
                <option key={index} value={test.patientLabTestId}>{test.labTestName}</option>
            )
        })
    }

    render() {
        return (
            <TabPane tabId={6} >
                <div className="order-imagimg">
                    <Row>
                        <Col md="6" sm="12" xs="12">
                            <h5 className='txUp'>
                                <p className="no">{this.state.ORDEREDLABSANDIMAGINGList?.length || 0}</p>
                                Ordered labs and imaging
                            </h5>
                        </Col>
                        <Col md="6" sm="12" xs="12"  >
                            <span className="add-lab-order pull-right">
                                <Button
                                    onClick={this.toggleOrderModal.bind(this)}
                                    className="addButton"
                                    style={{ backgroundColor: "#11b3ea" }}
                                    type="button"
                                    size="sm" color="primary">
                                    <i className="fa fa-plus" color="#FFF"></i> &nbsp; ORDER
                                </Button>
                            </span>
                        </Col>
                    </Row>
                    {/* <Row style={{ marginTop: 10 }}>
                        <Col md="12">
                            <Card body>
                                No ordered lab history
                            </Card>
                        </Col>
                        <Col md="6">
                        </Col>
                        <Col md="6" xs="12" sm="12">
                            <div className="display-links pull-right">
                                <a href="#" >Show more</a> &nbsp;&nbsp;
                                <a href="#" style={{ paddingLeft: 10 }}>Show less</a> &nbsp;&nbsp;
                                <a href="#" style={{ paddingLeft: 10 }}>Show resolved</a>
                            </div>
                        </Col>
                    </Row> */}
                    <Row>
                        <Col sm="12" md="12">
                            <Table hover>
                                <thead>
                                    <tr>
                                        <th style={{width: '33.33%'}}>Test Name</th>
                                        <th style={{width: '33.33%'}}>Test Date</th>
                                        <th style={{width: '33.33%'}}>Lab</th>
                                    </tr>
                                </thead>
                                <tbody className='twht'>
                                    {this.renderListingORDEREDLABSANDIMAGING()}
                                    {/* <tr>
                                        <td>Data</td>
                                        <td>Data</td>
                                        <td>Data</td>
                                    </tr> */}
                                </tbody>
                            </Table>

                            <div responsive="true" className='pgdiv mt-1'>
                                {this.renderPaginationOrder()}
                            </div>
                            

                        </Col>
                    </Row>
                </div>
                <hr />
                <br />
                <div className="labs-imagimg">
                    <Row>
                        <Col md="6" sm="12" xs="12">
                            <h5 className='txUp'>
                                <p className="no">{this.state.LABSANDIMAGINGRESULTList?.length || 0}</p>
                                Labs and Imaging Result
                            </h5>
                        </Col>
                        <Col md="6" sm="12" xs="12"  >
                            <span className="add-lab-order pull-right">
                                <Button
                                    className="addButton"
                                    style={{ backgroundColor: "#11b3ea", marginLeft: 10 }}
                                    onClick={this.toggleLabEntry.bind(this)}
                                    type="button"
                                    size="sm" color="primary">
                                    <i className="fa fa-plus" color="#FFF"></i> &nbsp; ENTER LABS
                                </Button>
                            </span>
                        </Col>
                    </Row>
                    {/* <Row style={{ marginTop: 10 }}>
                        <Col md="12">
                            <Card body>
                                No lab history
                            </Card>
                        </Col>
                        <Col md="6">
                        </Col>
                        <Col md="6" xs="12" sm="12">
                            <div className="display-links pull-right">
                                <a href="#" >Show more</a> &nbsp;&nbsp;
                                <a href="#" style={{ paddingLeft: 10 }}>Show less</a> &nbsp;&nbsp;
                                <a href="#" style={{ paddingLeft: 10 }}>Show resolved</a>
                            </div>
                        </Col>
                    </Row> */}
                    <Row>
                        <Col sm="12" md="12">
                            <Table  hover>
                                <thead>
                                    <tr>
                                        <th style={{width: '25%'}}>Test Name</th>
                                        <th style={{width: '25%'}}>Test Date</th>
                                        <th style={{width: '25%'}}>Parameter Name</th>
                                        <th style={{width: '25%'}}>Parameter Value</th>
                                    </tr>
                                </thead>
                                <tbody className='twht'>
                                    {this.renderListingLABSANDIMAGINGRESULT()}
                                </tbody>
                            </Table>
                            
                            <div responsive="true" className='pgdiv mt-1'>
                                {this.renderPaginationOrder2()}
                            </div>
                            
                        </Col>
                    </Row>
                </div>


                <hr />
                <Modal isOpen={this.state.toggleOrderModel} toggle={this.toggleOrderModal.bind(this)} size="md" keyboard={false} backdrop="static">
                    <ModalHeader toggle={this.toggleOrderModal.bind(this)}>Order Labs</ModalHeader>

                    <ModalBody>
                        <Row>
                            <Col md="12" >
                                <FormGroup >
                                    <Label className="label" htmlFor="patientLabTestId">Test Name  <span className="required">*</span> :</Label>

                                    {/* <Select
                                        options={this.state.GetLabTest}
                                        placeholder="Type or Select Test"
                                        // name="labTestName"
                                        // value={this.state.patientLabTestId}
                                        value={this.state.GetLabTest?.find(option => option.value === this.state.patientLabTestId)}
                                        onChange={(e) => this.handleTestChange1(e)}
                                        isSearchable={true}
                                        getOptionLabel={(option) => option.labTestName} /> */}

                                    <Select
                                        options={this.state.GetLabTest}
                                        placeholder="Type or Select Test"
                                        // value={this.state.patientLabTestId}
                                        // Label={this.state.labTestName}
                                        onChange={(e) => this.handleTestChange1(e)}
                                        isSearchable={true}
                                    />

                                    <span className="error">{this.state.errors["patientLabTestId"]}</span>
                                </FormGroup>
                            </Col>

                            <Col md="12">
                                <FormGroup >
                                    <Label className="label" htmlFor="">Description :</Label>

                                    <textarea placeholder="  Description"
                                        name="description" disabled={true}
                                        value={this.state.description === null ? '' : this.state.description} >
                                    </textarea>
                                    {/* <span className="error">{this.state.errors["description"]}</span> */}

                                </FormGroup>
                            </Col>

                            <Col md="12" >
                                <FormGroup >
                                    <Label className="label" htmlFor="orderDate">Test Date <span className="required">*</span> :</Label>
                                    <DatePicker autoComplete="off"
                                        readOnly={true}
                                        dateFormat="DD-MM-YYYY"
                                        name="orderDate"
                                        value={this.state.orderDate}
                                        onChange={this.handleDateChange.bind(this)}
                                    />
                                    <span className="error">{this.state.errors["orderDate"]}</span>

                                </FormGroup>
                            </Col>
                            <Col md="12" >
                                <FormGroup >
                                    <Label className="label" htmlFor="labName">Lab <span className="required">*</span> :</Label>
                                    <Input type="text"
                                        autoComplete="off"
                                        // maxLength="10"
                                        id="labName"
                                        name="labName"
                                        value={this.state.labName}
                                        onChange={this.handleChange.bind(this)}
                                    >
                                    </Input>
                                    <span className="error">{this.state.errors["labName"]}</span>

                                </FormGroup>
                            </Col>
                        </Row>
                    </ModalBody>
                    <ModalFooter>
                        <Button
                            color="primary"
                            onClick={this.handleLabOrder.bind(this)}>
                            <i className="fa fa-save"></i> Save</Button>
                        <Button
                            color="danger"
                            onClick={this.toggleOrderModal.bind(this)}>
                            <i className="fa fa-ban"></i> Cancel</Button>
                    </ModalFooter>
                </Modal>

                <Modal isOpen={this.state.toggleLabEntryModal} toggle={this.toggleLabEntry.bind(this)} size="md" keyboard={false} backdrop="static">
                    <ModalHeader toggle={this.toggleLabEntry.bind(this)}>Enter Labs</ModalHeader>

                    <ModalBody>
                        <Row>
                            <Col md="12" >
                                <FormGroup >
                                    <Label className="label" htmlFor="labEnteryTestId">Test Name  <span className="required">*</span> :</Label>

                                    {/* <Select
                                        options={this.state.GetLabTest}
                                        placeholder="Type or Select Test"
                                        // name="labTestName"
                                        // value={this.state.patientLabTestId}
                                        value={this.state.GetLabTest?.find(option => option.value === this.state.patientLabTestId)}
                                        onChange={(e) => this.handleTestChange1(e)}
                                        isSearchable={true}
                                        getOptionLabel={(option) => option.labTestName}
                                    /> */}

                                    <Select
                                        options={this.state.GetLabTest}
                                        placeholder="Type or Select Test"
                                        // value={this.state.patientLabTestId}
                                        // Label={this.state.labTestName}
                                        onChange={(e) => this.handleTestChange1(e)}
                                        isSearchable={true}
                                    />

                                    <span className="error">{this.state.errors["patientLabTestId"]}</span>
                                </FormGroup>
                            </Col>
                            <Col md="12">
                                <FormGroup >
                                    <Label className="label" htmlFor="">Description :</Label>

                                    <textarea
                                    placeholder="  Description"
                                        name="description" disabled={true}
                                        value={this.state.description === null ? '' : this.state.description}
                                    >
                                    </textarea>
                                </FormGroup>
                            </Col>
                            <Col md="12" >
                                <FormGroup >
                                    <Label className="label" htmlFor="labDate">Test Date <span className="required">*</span> :</Label>
                                    <DatePicker autoComplete="off"
                                        readOnly={true}
                                        dateFormat="DD-MM-YYYY"
                                        name="labDate"
                                        value={this.state.labDate}
                                        onChange={this.handleLabEntryDateChange.bind(this)}
                                    />
                                    <span className="error">{this.state.errors["labDate"]}</span>

                                </FormGroup>
                            </Col>
                            <Col md="12" >
                                <FormGroup >
                                    <Label className="label" htmlFor="parameterName">Parameter Name <span className="required">*</span> :</Label>
                                    <Input type="text"
                                        autoComplete="off"

                                        id="parameterName"
                                        name="parameterName"
                                        value={this.state.parameterName}
                                        onChange={this.handleChange.bind(this)}
                                    >
                                    </Input>
                                    <span className="error">{this.state.errors["parameterName"]}</span>

                                </FormGroup>
                            </Col>
                            <Col md="12" >
                                <FormGroup >
                                    <Label className="label" htmlFor="parameterValue">Parameter Value <span className="required">*</span> :</Label>
                                    <Input type="text"
                                        autoComplete="off"

                                        id="parameterValue"
                                        name="parameterValue"
                                        value={this.state.parameterValue}
                                        onChange={this.handleChange.bind(this)}
                                    >
                                    </Input>
                                    <span className="error">{this.state.errors["parameterValue"]}</span>

                                </FormGroup>
                            </Col>
                        </Row>
                    </ModalBody>
                    <ModalFooter>
                        <Button
                            color="primary"
                            onClick={this.handleLabEntrySave.bind(this)}
                        >
                            <i className="fa fa-save"></i> Save</Button>
                        <Button
                            color="danger"
                            onClick={this.toggleLabEntry.bind(this)}>
                            <i className="fa fa-ban"></i> Cancel</Button>
                    </ModalFooter>
                </Modal>

            </TabPane >
        )
    }

    handleDateChange = (value, formattedDate) => {
        this.setState({ orderDate: value, formattedDate: formattedDate });
    }
    handleLabEntryDateChange = (value, formattedDate) => {
        this.setState({ labDate: value, formattedDate: formattedDate });
    }

    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value });

    }

    handleLabOrder = async () => {
        debugger
        if (this.validateForm()) {
            // const labOrder = {
            //     patientId: this.props.patientId,
            //     patientLabTestId: this.state.patientLabTestId,
            //     orderDate: this.state.orderDate,
            //     labName: this.state.labName,
            //     enteredBy: localStorage.getItem("UserName")
            // }

            const labOrder = {
                patientOrderedTestId: this.state.patientOrderedTestId,
                patientId: this.props.patientId,
                patientLabTestId: this.state.patientLabTestId,
                orderDate: this.state.orderDate,
                labName: this.state.labName,
                userId: localStorage.getItem("UserId")
            }
            CommonServices.postData(labOrder, `/PatientLab/SavePatientLabOrder`).then((res) => {
                this.props.enqueueSnackbarAction("Order Labs saved successfully.");
                this.clearState();
                this.setState({
                    toggleOrderModel: false
                })
                this.GetListingORDEREDLABSANDIMAGING(this.props.patientId);
            });
        }
    }

    toggleOrderModal = () => {
        this.clearState();

        this.setState({
            toggleOrderModel: !this.state.toggleOrderModel
        })
    };

    toggleLabEntry = () => {
        this.clearState();

        this.setState({
            toggleLabEntryModal: !this.state.toggleLabEntryModal
        })
    }

    validateForm() {
        let fields = this.state;
        let errors = {};
        let isFormValid = true;
        if (fields.patientLabTestId == "") {
            isFormValid = false;
            errors["patientLabTestId"] = "Please select Test Name";
        }
        if (fields.orderDate == null) {
            isFormValid = false;
            errors["orderDate"] = "Please select Test Date";
        }
        if (fields.labName == "") {
            isFormValid = false;
            errors["labName"] = "Please enter Lab";
        }
        this.setState({ errors });
        return isFormValid;
    }

    handleLabEntrySave = async () => {
        debugger;
        if (this.validateLabEntryModal()) {

            const labEntry = {
                patientId: this.props.patientId,
                patientLabTestId: this.state.patientLabTestId,
                labDate: this.state.labDate,
                parameterName: this.state.parameterName,
                parameterValue: this.state.parameterValue,
                enteredBy: localStorage.getItem("UserId")
            }

            CommonServices.postData(labEntry, `/PatientLab/SavePatientLabEntry`).then((res) => {
                this.props.enqueueSnackbarAction("Enter Labs saved successfully.");
                console.log("labentry", res)
                this.clearState();
                this.setState({
                    toggleLabEntryModal: false
                })
                this.GetListingLABSANDIMAGINGRESULT(this.props.patientId);
            });
        }

    }

    validateLabEntryModal() {
        let fields = this.state;
        let errors = {};
        let isFormValid = true;
        if (fields.patientLabTestId == "") {
            isFormValid = false;
            errors["patientLabTestId"] = "Please select Test Name";
        }
        if (fields.labDate == null) {
            isFormValid = false;
            errors["labDate"] = "Please select Test Date";
        }
        if (fields.parameterName == "") {
            isFormValid = false;
            errors["parameterName"] = "Please enter Parameter Name";
        }
        if (fields.parameterValue == "") {
            isFormValid = false;
            errors["parameterValue"] = "Please enter Parameter Value";
        }
        this.setState({ errors });
        return isFormValid;
    }

    clearState = () => {
        this.setState({
            toggleOrderModel: false,
            toggleLabEntryModal: false,
            isLoading: false,
            testName: "",
            patientLabTestId: "",
            orderDate: null,
            formattedDate: "",
            labName: "",
            patientId: "",
            labEnteryTestId: "",
            labDate: null,
            parameterName: "",
            parameterValue: "",
            errors: {},
            description: ""
        })
    }

    GetLabTest() {
        CommonServices.getData(`/DropdownList/GetPatientLabTestDDL`).then((res) => {
            // var copyTableData = res;
            let array = []
            res.forEach(element => {
                let obj = {
                    value: element.patientLabTestId,
                    label: element.labTestName,
                    description: element.description
                }
                array.push(obj)
            });
            this.setState({
                GetLabTest: array,
            });
        })
    }

    renderTestList = () => {
        if (this.state.GetLabTest == undefined) {
            return null;
        }
        return this.state.GetLabTest.map((test, index) => {
            return <option key={index} value={test.patientLabTestId}>{test.labTestName}</option>
        })
    }


    handleChangesTestSelect(e) {
        this.setState({
            patientLabTestId: e.target.value,
        })

    }

    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value })
    }

    GetListingORDEREDLABSANDIMAGING(patientId) {
        CommonServices.getDataById(patientId, `/PatientLab/GetPatientLabOrder`).then((res) => {
            this.setState({
                ORDEREDLABSANDIMAGINGList: res,
            });
        });
    }

    renderListingORDEREDLABSANDIMAGING = () => {
        let ORDEREDLABSANDIMAGINGList = this.state.ORDEREDLABSANDIMAGINGList;
        const { currentPage, pageSize } = this.state;
        const currentPageRecords = ORDEREDLABSANDIMAGINGList?.slice(((currentPage - 1) * pageSize), (currentPage) * pageSize);
        return currentPageRecords?.map((order, index) => {
            return <tr key={index}>
                <td >{order.patientLabTestName}</td>
                <td>{order.orderDate ? new Date(order.orderDate).toLocaleDateString('en-GB') : ''}</td>
                <td >{order.labName}</td>
            </tr>
        })
    }

    //list2
    GetListingLABSANDIMAGINGRESULT(patientId) {
        CommonServices.getDataById(patientId, `/PatientLab/GetPatientLabEntry`).then((res) => {
            this.setState({
                LABSANDIMAGINGRESULTList: res,
            });
        });
    }

    renderListingLABSANDIMAGINGRESULT = () => {
        let LABSANDIMAGINGRESULTList = this.state.LABSANDIMAGINGRESULTList;
        const { currentPage2, pageSize2 } = this.state;
        const currentPageRecords = LABSANDIMAGINGRESULTList?.slice(((currentPage2 - 1) * pageSize2), (currentPage2) * pageSize2);
        return currentPageRecords?.map((order, index) => {
            return <tr key={index}>
                <td >{order.patientLabTestName}</td>
                <td>{order.labDate ? new Date(order.labDate).toLocaleDateString('en-GB') : ''}</td>
                <td >{order.parameterName}</td>
                <td >{order.parameterValue}</td>
            </tr>
        })
    }

    handleTestChange1 = (Test) => {
        debugger
        this.setState({
            patientLabTestId: Test.value,
            description: Test.description
        })
    }

    //pagination
    renderPaginationOrder = () => {
        const totalRecords = (this.state.ORDEREDLABSANDIMAGINGList?.length);
        return (
            (totalRecords > 4) &&
            <Pagination
                itemClass="page-item" // add it for bootstrap 4
                linkClass="page-link" // add it for bootstrap 4
                activePage={this.state.currentPage}
                itemsCountPerPage={this.state.pageSize}
                totalItemsCount={totalRecords}
                pageRangeDisplayed={this.state.pageSize}
                onChange={(pageNumber) => {
                    this.setState({
                        currentPage: pageNumber
                    })
                }}
            />
        )
    }

    renderPaginationOrder2 = () => {
        const totalRecords = (this.state.LABSANDIMAGINGRESULTList?.length);
        return (
            (totalRecords > 4) &&
            <Pagination
                itemClass="page-item" // add it for bootstrap 4
                linkClass="page-link" // add it for bootstrap 4
                activePage={this.state.currentPage2}
                itemsCountPerPage={this.state.pageSize2}
                totalItemsCount={totalRecords}
                pageRangeDisplayed={this.state.pageSize2}
                onChange={(pageNumber2) => {
                    this.setState({
                        currentPage2: pageNumber2
                    })
                }}
            />
        )
    }
}

const mapStateToProps = (state) => ({
    labOrderEntry: state.labOrderEntry,
    patient: state.patient.patient,
})

const mapDispatchToProps = {
    getLabs,
    saveLabOrder,
    // enqueueSnackbar,
    saveLabEntry,
    getPatient,
    enqueueSnackbarAction
}

export default connect(mapStateToProps, mapDispatchToProps)(LabsAndImaging);
