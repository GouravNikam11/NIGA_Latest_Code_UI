import React, { Component } from 'react';
import { Table, Col, Button, Form, Row, FormLabel } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import CommonServices from '../../Services/CommonServices';
import { connect } from 'react-redux';
import {
    enqueueSnackbar as enqueueSnackbarAction,
    closeSnackbar
} from '../../store/actions/notification';
import Pagination from "react-js-pagination";


export class ListBodyPartComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            bodyPartId: 0,
            SectionId: '',
            BodyPartName: '',
            Description: '',
            bodyPartList: [],
            EnteredBy: 'Admin',
            DeleteStatus: false,
            currentPage: 1,
            pageSize: 10,
            SectionList: [],
            searchSectionId:''
        }
        this.handleChange = this.handleChange.bind(this);
    }

    // renderbodypartTable = () => {
        
    //     let bodyPartList = this.state.bodyPartList;
    //     const { currentPage, pageSize } = this.state;
    //     const currentPageRecords = bodyPartList.slice(((currentPage - 1) * pageSize), (currentPage) * pageSize);

    //     return currentPageRecords.map((b, index) => {
    //         return <tr key={index}>
    //             <td className='fcol'>{b.bodyPartId}</td>
    //             <td>{b.bodyPartName}</td>
    //             <td>{b.description}</td>
    //             <td>{b.sectionId}</td>
    //             <td className='lcol'>
    //                 <Link to={"/EditBodyPart/" + b.bodyPartId}>
    //                     <Button onClick={() => this.editBodyPart(b.bodyPartId)} ><i className="fa fa-pencil"></i></Button>
    //                 </Link>
    //                 <Button style={{ marginLeft: 8 }} variant="danger" onClick={() => this.deleteBodyPart(b.bodyPartId)} ><i className="fa fa-trash"></i></Button>
    //             </td>
    //         </tr>
    //     })
    // }


    renderbodypartTable = () => {
    //     const { bodyPartList, currentPage, pageSize, searchSectionId } = this.state;
    //   debugger
    //     // Filter the bodyPartList based on the searchSectionId
    //     // const filteredBodyPartList = searchSectionId
    //     //   ? bodyPartList.filter(b => b.sectionId === parseInt(searchSectionId))
    //     //   : bodyPartList;

    //     const filteredBodyPartList = parseInt(searchSectionId) !== 0
    // ? bodyPartList.filter(b => b.sectionId === parseInt(searchSectionId))
    // : bodyPartList;

      
    //     const currentPageRecords = filteredBodyPartList.slice(
    //       (currentPage - 1) * pageSize,
    //       currentPage * pageSize
    //     );
      
        return this.state.bodyPartList?.resultObject?.map((b, index) => {
          return (
            <tr key={index}>
              <td className="fcol">{b.bodyPartId}</td>
              <td>{b.bodyPartName}</td>
              <td>{b.description}</td>
              <td>{b.sectionId}</td>
              <td className="lcol">
                <Link to={"/EditBodyPart/" + b.bodyPartId}>
                  <Button onClick={() => this.editBodyPart(b.bodyPartId)}>
                    <i className="fa fa-pencil"></i>
                  </Button>
                </Link>
                <Button
                  style={{ marginLeft: 8 }}
                  variant="danger"
                  onClick={() => this.deleteBodyPart(b.bodyPartId)}
                >
                  <i className="fa fa-trash"></i>
                </Button>
              </td>
            </tr>
          );
        });
      };
      

    renderPagination = () => {
        const totalRecords = (this.state.bodyPartList?.totalCount);
        return (
            (totalRecords > 9) &&
            <Pagination
                itemClass="page-item" // add it for bootstrap 4
                linkClass="page-link" // add it for bootstrap 4
                activePage={this.state.currentPage}
                itemsCountPerPage={this.state.pageSize}
                totalItemsCount={totalRecords}
                pageRangeDisplayed={this.state.pageSize}
                // onChange={(pageNumber) => {
                //     this.setState({
                //         currentPage: pageNumber
                //     })
                // }}
                onChange={(pageNumber) => { this.getBodyPart(pageNumber, this.state.searchSectionId) }}

            />
        )
    }

    getSections() {
        debugger;
        CommonServices.getData(`/mastersAPI/GetSections`).then((temp) => {
            this.setState({
                SectionList: temp,

            })
        })
    }

    renderSectionList = () => {
        // if (this.state.SectionList == undefined) {
        //     return null;
        // }
        return this.state.SectionList.map((section, index) => {
            return <option key={index} value={section.sectionId}>{section.sectionName}</option>
        })
    }

   

    handleChange(e) {
        debugger
        // console.log(e.target.value)
        this.setState({ 
            searchSectionId: e.target.value,
            bodyPartList:[]
         })
            this.getBodyPart(1,e.target.value);
    }


    render() {
        return (
            <div>
                <Link to={'/AddBodyPart'} className="nav-link lnkbtn" >
                    <Button color="primary"
                        style={{ textTransform: "uppercase" }}
                    > <i className="fa fa-plus"></i> &nbsp;
                        Add Body Part
                    </Button>
                </Link>
                <Row>
                    <FormLabel column sm="2">Select Section :</FormLabel>
                    <Col sm="5">
                        <Form.Control as="select"
                            name="searchSectionId"
                            value={this.state.searchSectionId}
                            onChange={this.handleChange}
                        >
                            <option value="0">
                                Select
                            </option>
                            {
                                this.renderSectionList()
                            }
                        </Form.Control>
                    </Col>
                </Row>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th className='fcol'>#</th>
                            <th >Body Part Name</th>
                            <th>Description</th>
                            <th>SectionId</th>
                            <th className='lcol'>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.renderbodypartTable()
                        }
                    </tbody>
                </Table>
                <div responsive="true" className='pgdiv'>
                    {this.renderPagination()}
                </div>
            </div >
        );
    }

    componentDidMount() {
       this.getSections();
        this.getBodyPart(1,this.state.searchSectionId);
    }

    getBodyPart(pageNumber,searchSectionId) {
        // CommonServices.getData(`/bodypart`).then((temp) => {
            CommonServices.getData(`/Pagination/GetBodyParts?${searchSectionId ? `sectionId=${searchSectionId}&` :''}PageNumber=${pageNumber}&PageSize=${this.state.pageSize}`).then((temp) => {
                this.state.currentPage = pageNumber
            console.log(temp);
            debugger;
            this.setState({
                bodyPartList: temp,
            })
        });
    }

    editBodyPart(bodyPartId) {
        CommonServices.getDataById(bodyPartId, `/bodypart/GetBodyPartById`).then((res) => {
            this.setState({
                bodyPartId: res.bodyPartId,
                BodyPartName: res.bodyPartName,
                Description: res.description,
                SectionId: res.sectionId,
                EnteredBy: 'Admin',
                DeleteStatus: false
            })
        });
    }
    deleteBodyPart(id) {
        this.setState({
            bodyPartId: id,
            BodyPartName: "jddj",
            Description: "mcmcm",
            SectionId: "1",
            EnteredBy: 'Admin',
            DeleteStatus: true
        }, function () {
            console.log(this.state)
            debugger;
            CommonServices.postData(this.state, `/bodypart/DeleteBodyPart`).then((res) => {
                this.props.enqueueSnackbarAction(res.data, "warning");
                this.getBodyPart(this.state.currentPage);

                this.setState({
                    bodyPartId: id,
                    BodyPartName: "",
                    Description: "",
                    SectionId: "",
                    EnteredBy: 'Admin',
                    DeleteStatus: true
                })
            });
        });
    }
}
export default connect(null, { enqueueSnackbarAction, closeSnackbar })(ListBodyPartComponent)
