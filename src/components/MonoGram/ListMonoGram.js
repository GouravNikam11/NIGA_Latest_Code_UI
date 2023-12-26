import React, { Component } from 'react'
import { Table, Col, Button, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import CommonServices from '../../Services/CommonServices';
import { connect } from 'react-redux';
import {
    enqueueSnackbar as enqueueSnackbarAction,
    closeSnackbar
} from '../../store/actions/notification';
import Pagination from 'react-js-pagination';
class ListMonoGram extends Component {
    constructor(props) {
        super(props)

        this.state = {
            ListMonogram: [],
            monogramId: 0,
            monogram1: '',
            keywords: '',
            enteredBy: '',
            modelEx: [],
            isActive: true,
            currentPage: 1,
            pageSize: 10
        }
    }


    rendermonogramTable = () => {
        debugger
        let ListMonogram = this.state.ListMonogram;
        const { currentPage, pageSize } = this.state;
        const currentPageRecords = ListMonogram.slice(((currentPage-1) * pageSize), (currentPage) * pageSize);
       
        return currentPageRecords.map((s, index) => {
            return <tr key={index}>
                <td className='fcol'>{s.monogramId}</td>
                <td>{s.monogram1}</td>
                <td>{s.keywords}</td>
                <td className='lcol'>
                    <Link to={"/EditMonoGram/" + s.monogramId}>
                        <Button onClick={() => this.editAuthor(s.monogramId)} ><i className="fa fa-pencil"></i></Button>
                    </Link>
                    <Button style={{ marginLeft: 8 }} variant="danger" onClick={() => this.deleteMonogram(s.monogramId)} ><i className="fa fa-trash"></i></Button>
                </td>
            </tr>
        })
    }

    renderPagination = () => {
        debugger
        const totalRecords = (this.state.ListMonogram.length);
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

                <Link to={'/AddMonoGram'} className="nav-link lnkbtn" >
                    <Button color="primary"
                        style={{ textTransform: "uppercase" }}
                    > <i className="fa fa-plus"></i> &nbsp;
                        Add Monogram
                    </Button>
                </Link>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th className='fcol'>Sr.No</th>
                            {/* <th className='fcol'>#</th> */}
                            <th>Monogram </th>
                            <th>Keywords</th>
                            <th className='lcol'>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.rendermonogramTable()
                        }
                    </tbody>
                </Table>
                <div responsive="true" className='pgdiv'>
                    {this.renderPagination()}
                </div>
            </div>
        );
    }

    componentDidMount() {
        this.getListMonoGram();

    }
    getListMonoGram() {
        CommonServices.getData(`/Monogram/GetallMonogram`).then((temp) => {
            console.log(temp);
            debugger;
            this.setState({
                ListMonogram: temp,
            })
        });
    }

    editAuthor(monogramId) {
        debugger;
        CommonServices.getDataByIdmonogram(monogramId, `/Monogram/MonogramById?MonogramId=`).then((res) => {
            debugger;
            this.setState({
                monogramId: res.monogramId,
                monogram1: res.monogram1,
                keywords: res.keywords,
            })
        });

    }

    deleteMonogram(id) {

        let obj = {
            isDelete: true
        }
        var tempArr = [];
        tempArr.push(obj);
        this.setState({ modelEx: tempArr });

        var questiongroupModel = {
            monogramId: id,
            isActive: false,
            modelEx: this.state.modelEx
        };

        console.log('questiongroupModel=========>>>>>>>', questiongroupModel)




        debugger;
        CommonServices.postData(questiongroupModel, `/Monogram/DeleteMonogram`).then((res) => {
            debugger;
            this.props.enqueueSnackbarAction("Record deleted successfully.", "warning");
            this.getListMonoGram();

            this.setState({
                monogramId: id,
                monogram1: "",
                keywords: "",
                EnteredBy: 'Admin',
                isActive: false
            })
        });

    }
}

export default connect(null, { enqueueSnackbarAction, closeSnackbar })(ListMonoGram)
