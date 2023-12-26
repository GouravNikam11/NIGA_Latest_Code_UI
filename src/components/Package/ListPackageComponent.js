import React, { Component } from 'react';
import { Table, Col, Button, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import CommonServices from '../../Services/CommonServices';
import { connect } from 'react-redux';
import {
    enqueueSnackbar as enqueueSnackbarAction,
    closeSnackbar
} from '../../store/actions/notification';
import Pagination from 'react-js-pagination';
class ListPackageComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            packageId: 0,
            PackageName: '',
            CaseCount: '',
            ValidityInDays: '',
            Amount: '',
            PackageList: [],
            EnteredBy: 'Admin',
            DeleteStatus: false,
            currentPage: 1,
            pageSize: 10,
        }
    }


    renderpackageTable = () => {
        debugger
        let PackageList = this.state.PackageList;
        const { currentPage, pageSize } = this.state;
        const currentPageRecords = PackageList.slice(((currentPage-1) * pageSize), (currentPage) * pageSize);
       
        return currentPageRecords.map((p, index) => {
            return <tr key={index}>
                <td className='fcol'>{p.packageId}</td>
                <td>{p.packageName}</td>
                <td>{p.caseCount}</td>
                <td>{p.validityInDays}</td>
                <td>{p.amount}</td>
                <td  className='lcol'>
                    <Link to={"/EditPackage/" + p.packageId}>
                        <Button onClick={() => this.editPackage(p.packageId)} > <i className="fa fa-pencil"></i></Button> 
                    </Link>
                    <Button style={{marginLeft:8}} variant="danger" onClick={() => this.deletePackage(p.packageId)} ><i className="fa fa-trash"></i> </Button>
                </td>
            </tr>
        }) 
    }

    renderPagination = () => {
        debugger
        const totalRecords = (this.state.PackageList.length);
        return (
            (totalRecords>9)&&
            <Pagination
                itemClass="page-item" // add it for bootstrap 4
                linkClass="page-link" // add it for bootstrap 4
                activePage={this.state.currentPage}
                itemsCountPerPage={this.state.pageSize}
                totalItemsCount={totalRecords}
                pageRangeDisplayed={this.state.pageSize}
                onChange={(pageNumber)=>{
                    this.setState({
                        currentPage:pageNumber
                    })
                }}
            />
        )
    }



    render() {
        return (
            <div>

                <Link to={'/AddPackage'} className="nav-link lnkbtn" >
                    <Button color="primary"
                    style={{ textTransform: "uppercase" }}
                    > <i className="fa fa-plus"></i> &nbsp; 
                        Add Package
                    </Button>
                </Link>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th className='fcol'>#</th>
                            <th>Package Name</th>
                            <th>Case Count</th>
                            <th>Validity In Days</th>
                            <th>Amount</th>
                            <th className='lcol'>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.renderpackageTable()
                        }
                    </tbody>
                </Table>
                <div responsive="true" className='pgdiv'>
                    {this.renderPagination()}
                </div>
            </div >
        )
    }

    componentDidMount() {
        this.getPackage();
        console.log("**********API CALL**************")

    }

    getPackage() {
        CommonServices.getData(`/package`).then((temp) => {
            console.log(temp);
            debugger;
            this.setState({
                PackageList: temp,
            })
        });
    }

    editPackage(packageId) {
        CommonServices.getDataById(packageId, `/package`).then((res) => {
            this.setState({
                packageId: res.packageId,
                PackageName: res.intensityNo,
                CaseCount: res.caseCount,
                ValidityInDays: res.validityInDays,
                Amount: res.amount,
                EnteredBy: 'Admin',
                DeleteStatus: false
            })
        });
    }

    deletePackage(id) {
        debugger;
        this.setState({
            packageId: id,
            PackageName: "jdj",
            CaseCount: 6,
            ValidityInDays: 30,
            Amount: 8,
            EnteredBy: 'Admin',
            DeleteStatus: true
        }, function () {
            console.log(this.state)
            debugger;
            CommonServices.postData(this.state, `/package/DeletePackage`).then((res) => {
                this.props.enqueueSnackbarAction(res.data, "warning");
                this.getPackage();

                this.setState({
                    packageId: id,
                    PackageName: "",
                    CaseCount: "",
                    ValidityInDays: "",
                    Amount: "",
                    EnteredBy: 'Admin',
                    DeleteStatus: true
                })
            });
        });
    }
}
export default connect(null, { enqueueSnackbarAction, closeSnackbar })(ListPackageComponent)
