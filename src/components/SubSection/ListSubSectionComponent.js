import React, { Component } from 'react';
import { FormLabel, Table, Col, Button, Form, Row, Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import CommonServices from '../../Services/CommonServices';
import { connect } from 'react-redux';
import Pagination from "react-js-pagination";
import Select from "react-select";
import AsyncPaginate from "react-select-async-paginate";

import {
    enqueueSnackbar as enqueueSnackbarAction,
    closeSnackbar
} from '../../store/actions/notification';
import { Input } from 'reactstrap';

export class ListSubSectionComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            subsectionId: 0,
            SectionId: 0,
            ParentSubSectionId: 0,
            SubSectionName: '',
            SubSectionNameAlias: '',
            Description: '',
            SubSectionList: [],
            SectionList: [],
            EnteredBy: 'Admin',
            DeleteStatus: false,
            isLoading: true,
            isddlSearchLoading: true,
            searchSectionId: 0,
            currentPage: 1,
            pageSize: 25,
            searchQuery: '',
            parentsubSectionsList: [],
            selectedparentsubsectionOptions: [],
            //selectedOptionsBySubsection: {},  // Store selected options by each subSectionId
            selectedparentsubsectionId: 0
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleChangeforsearch = this.handleChangeforsearch.bind(this);
    }



    renderSectionList = () => {
        if (this.state.SectionList == undefined) {
            return null;
        }
        return this.state.SectionList.map((section, index) => {
            return <option key={index} value={section.sectionId}>{section.sectionName}</option>
        })
    }

    // renderSubsectionTable = () => {
    //     let subsectionList = this.state.SubSectionList;
    //     const { currentPage, pageSize } = this.state;
    //     const currentPageRecords = subsectionList.slice(((currentPage-1) * pageSize), (currentPage) * pageSize);
    //     if(currentPageRecords.length==0){
    //         return (
    //             <tr >
    //             <td colSpan={7} style={{ textAlign: 'center' }}>
    //                 <Row>
    //                     <Col>
    //                        <label>Please Select Section</label>
    //                     </Col>
    //                 </Row>
    //             </td>
    //         </tr>
    //         )
    //     }
    //     return currentPageRecords.map((s, index) => {
    //         return <tr key={index}>
    //             <td className='fcol'>{s.subSectionId}</td>
    //             <td>{s.subSectionName}</td>
    //             <td>{s.subSectionNameAlias}</td>
    //             <td>{s.description}</td>
    //             <td>{s.sectionId}</td>
    //             <td>{s.parentSubSectionId}</td>
    //             <td className='lcol'>
    //                 <Link to={"/EditSubSection/" + s.subSectionId}>
    //                     <Button onClick={() => this.editSubSection(s.subSectionId)} ><i className="fa fa-pencil"></i> </Button> 
    //                 </Link>
    //                 <Button style={{marginLeft:8}} variant="danger" onClick={() => this.deleteSubSection(s.subSectionId)} ><i className="fa fa-trash"></i></Button>
    //             </td>
    //         </tr>
    //     })
    // }


    loadSymptomsOptions = (search, prevOptions) => {
        const options = [];
        var subsectionList = this.state.parentsubSectionsList;
        subsectionList.map(x => options.push({ value: x.subSectionId, label: x.subSectionName }));
        let filteredOptions;
        if (!search) {
            filteredOptions = options;
        }
        else {
            const searchLower = search.toLowerCase();
            filteredOptions = options.filter(({ label }) =>
                label.toLowerCase().includes(searchLower)
            );
        }
        const hasMore = filteredOptions.length > prevOptions.length + 10;
        const slicedOptions = filteredOptions.slice(
            prevOptions.length,
            prevOptions.length + 10
        );
        return {
            options: slicedOptions,
            hasMore
        };
    }


    renderSubsectionTable = () => {
        debugger
        const counterDiagnosisSymptoms = this.state.selectedparentsubsectionId;
        if (this.state.SubSectionList.resultObject?.length === 0) {
            return (
                <tr>
                    <td colSpan={8} style={{ textAlign: 'center' }}>
                        <Row>
                            <Col>
                                <label>No matching subsections found.</label>
                            </Col>
                        </Row>
                    </td>
                </tr>
            );
        }



        return this.state.SubSectionList?.resultObject?.map((updateditem, index) => {
            //let updateditem = { ...s, aliesvalue: {} }
            return (
                <tr key={index}>
                    <td className='fcol'>{updateditem.subSectionId}</td>
                    <td>{updateditem.subSectionName}</td>
                    {/* <td>{s.subSectionNameAlias}</td> */}
                    {/* <td >  <Select
                    options={this.state.parentsubSectionsList}
                    placeholder="Select Parent SunSection:"
                    value={this.state.selectedparentsubsectionOptions}
                    onChange={(item) => this.handleSelect(item, s)}
                    isSearchable={true}

                /></td>
               */}
                    <td><AsyncPaginate isClearable
                        placeholder="Select one or more subsection"
                        key={counterDiagnosisSymptoms}
                        cacheOptions={counterDiagnosisSymptoms}
                        closeMenuOnSelect={false}
                        value={updateditem.aliesvalue}
                        loadOptions={this.loadSymptomsOptions.bind(this)}
                        onChange={(item) => this.handleSelect(item, updateditem)}
                    /></td>
                    {/* <td>{s.description}</td> */}
                    <td>{updateditem.sectionId}</td>
                    <td>{updateditem.parentSubSectionId}</td>
                    <td>Parent Sub Section Name</td>
                    <td className='lcol'>
                        <Link to={"/EditSubSection/" + updateditem.subSectionId}>
                            <Button onClick={() => this.editSubSection(updateditem.subSectionId)}>
                                <i className="fa fa-pencil"></i>
                            </Button>
                        </Link>
                        <Button
                            style={{ marginLeft: 8 }}
                            variant="danger"
                            onClick={() => this.deleteSubSection(updateditem.subSectionId)}
                        >
                            <i className="fa fa-trash"></i>
                        </Button>

                        <Button style={{ marginLeft: 8 }} variant="dark">
                            <i className="fa fa-arrow-right"></i>
                        </Button>
                    </td>
                </tr>
            )
        })


        // return this.state.SubSectionList?.resultObject?.map((s, index) => (

        //     <tr key={index}>
        //         <td className='fcol'>{s.subSectionId}</td>
        //         <td>{s.subSectionName}</td>
        //         {/* <td>{s.subSectionNameAlias}</td> */}
        //         {/* <td >  <Select
        //             options={this.state.parentsubSectionsList}
        //             placeholder="Select Parent SunSection:"
        //             value={this.state.selectedparentsubsectionOptions}
        //             onChange={(item) => this.handleSelect(item, s)}
        //             isSearchable={true}

        //         /></td>
        //        */}
        //         <td><AsyncPaginate isClearable
        //             placeholder="Select one or more subsection"
        //             key={counterDiagnosisSymptoms}
        //             cacheOptions={counterDiagnosisSymptoms}
        //             closeMenuOnSelect={false}
        //             value={this.state.selectedparentsubsectionOptions}
        //             loadOptions={this.loadSymptomsOptions.bind(this)}
        //             onChange={(item) => this.handleSelect(item, s)}
        //         /></td>
        //         {/* <td>{s.description}</td> */}
        //         <td>{s.sectionId}</td>
        //         <td>{s.parentSubSectionId}</td>
        //         <td>Parent Sub Section Name</td>
        //         <td className='lcol'>
        //             <Link to={"/EditSubSection/" + s.subSectionId}>
        //                 <Button onClick={() => this.editSubSection(s.subSectionId)}>
        //                     <i className="fa fa-pencil"></i>
        //                 </Button>
        //             </Link>
        //             <Button
        //                 style={{ marginLeft: 8 }}
        //                 variant="danger"
        //                 onClick={() => this.deleteSubSection(s.subSectionId)}
        //             >
        //                 <i className="fa fa-trash"></i>
        //             </Button>

        //             <Button style={{ marginLeft: 8 }} variant="dark">
        //                 <i className="fa fa-arrow-right"></i>
        //             </Button>
        //         </td>
        //     </tr>

        // ));
    }


    renderPagination = () => {
        const totalRecords = (this.state.SubSectionList?.totalCount);
        return (
            (totalRecords > 9) &&
            <Pagination
                itemClass="page-item" // add it for bootstrap 4
                linkClass="page-link" // add it for bootstrap 4
                activePage={this.state.currentPage}
                itemsCountPerPage={this.state.pageSize}
                totalItemsCount={totalRecords}
                // pageRangeDisplayed={this.state.pageSize}
                pageRangeDisplayed={20}
                // onChange={this.getSubSection(pageNumber)}
                onChange={(pageNumber) => { this.getSubSection(pageNumber, this.state.searchQuery) }}
            />
        )
    }


    GetParentSubsections(sectionId) {
        CommonServices.getDataById(sectionId, `/DropdownList/GetSubsectionBySection`).then((res) => {
            debugger;
            console.log("res", res)
            // var copyTableData = res;
            // let array = []
            // copyTableData.forEach(element => {
            //     //console.log("printed====>>>>", element)
            //     //debugger;
            //     let obj = {
            //         value: element.subSectionId,
            //         label: element.subSectionName
            //     }
            //     array.push(obj)
            // });
            this.setState({
                parentsubSectionsList: res
            })
        });

    }

    handleSelect(data, s) {
        debugger
        const updatedList = this.state.SubSectionList.resultObject.map(item => {
            if (item.subSectionId === s.subSectionId) {
                // Update the aliesvalue for the selected item
                return { ...item, aliesvalue: data };
            }
            return item; // Return unchanged items
        });

        // Update state to trigger a re-render
        this.setState((prevState) => ({
            SubSectionList: {
                ...prevState.SubSectionList,
                resultObject: updatedList
            },
            selectedparentsubsectionOptions: data,
            selectedparentsubsectionId: data.value
        }), () => {
            // Callback function to check updated state
            debugger
            console.log('Updated SubSectionList:', this.state.SubSectionList);
        });
        console.log(this.state.SubSectionList)
        debugger
        let Obj = {
            "subSectionId": s.subSectionId,
            "sectionId": this.state.searchSectionId,
            "parentSubSectionId": data.value,
            "subSectionName": s.subSectionName,
            "subSectionNameAlias": s.subSectionNameAlias,
            "description": s.description,
            "enteredBy": localStorage.getItem("UserId"),
            "changedBy": localStorage.getItem("UserId"),
            "deleteStatus": false,
            "referencerubric": [],
            "subSectionLanguageDetails": []
        }
        console.log('Obj==', Obj)
        debugger
        CommonServices.postData([Obj], `/subsection`).then((responseMessage) => {
            debugger
            console.log('responseMessage==', responseMessage)
            this.props.enqueueSnackbarAction(responseMessage.data);
            const updatedList = this.state.SubSectionList.resultObject.map(item => {
                if (item.subSectionId === s.subSectionId) {
                    // Update the aliesvalue for the selected item
                    return { ...item, parentSubSectionId: data.value, aliesvalue: {} };
                }
                return item; // Return unchanged items
            });
            this.setState((prevState) => ({
                SubSectionList: {
                    ...prevState.SubSectionList,
                    resultObject: updatedList
                },
            }), () => {
                // Callback function to check updated state
                debugger
                console.log('Updated SubSectionList:', this.state.SubSectionList);
            });
            // alert(responseMessage.data);
            //this.props.history.push('/ListSubSection');
        });

    }


    render() {
        debugger
        const { isLoading } = this.state;
        return (
            <div>
                <Row>
                    <Col sm={9} >
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


                            <Col sm="5">
                                <Input type="search"
                                    placeholder="Search by LowerCase or UpperCase "
                                    name='searchQuery'
                                    value={this.state.SearchText}
                                    onChange={this.handleChangeforsearch} />
                            </Col>
                        </Row>
                    </Col>

                    <Col sm={3} >
                        <Link to={'/AddSubSection'} className="nav-link lnkbtn1" >
                            <Button color="primary"
                                style={{ textTransform: "uppercase" }}
                            > <i className="fa fa-plus"></i> &nbsp;
                                Add SubSection
                            </Button>
                        </Link>
                    </Col>
                </Row>

                <Row>
                    <Col sm={9} >
                    </Col>
                    <Col sm={3} style={{ disply: 'flex', justifyContent: 'right' }}>
                        {

                        }
                    </Col>

                </Row>



                <Row style={{ marginTop: "10px" }}>
                    <Table bordered hover>
                        <thead>
                            <tr>
                                <th className='fcol'>#</th>
                                <th>Sub Section Name</th>
                                <th style={{ width: "16%" }}>Sub Section Name Alias</th>
                                {/* <th>Description</th> */}
                                <th>Section Id</th>
                                <th>Parent Sub Section Id</th>
                                <th>Parent Sub Section</th>
                                <th className='lcol'>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                isLoading ?
                                    <tr >
                                        <td colSpan={8} style={{ textAlign: 'center' }}>
                                            <Row>
                                                <Col>
                                                    <Spinner
                                                        animation="grow"
                                                        variant="info"
                                                        size="lg"
                                                        aria-hidden="true"
                                                        style={{ margin: "10px" }}

                                                    >
                                                    </Spinner>
                                                </Col>
                                            </Row>
                                        </td>
                                    </tr>
                                    :
                                    this.renderSubsectionTable()

                            }

                        </tbody>
                    </Table>
                    <div responsive="true" className='pgdiv'>
                        {this.renderPagination()}
                    </div>
                </Row>
            </div >
        )
    }

    async componentDidMount() {
        await this.getSections();


    }

    getSubSection(pageNumber, searchQuery) {

        if (pageNumber != undefined && this.state.searchSectionId != 0) {
            this.state.currentPage = pageNumber

            CommonServices.getData(`/Pagination/GetSubSectionBySectionIdAndQueryString?sectionId=${this.state.searchSectionId}${searchQuery ? `&queryString=${searchQuery}` : ''}&PageNumber=${pageNumber}&PageSize=${this.state.pageSize}`).then((temp) => {
                console.log("new GetSubSectionsWithPagination", temp)
                debugger
                const updatedArray = {
                    ...temp,
                    resultObject: temp.resultObject.map(item => ({
                        ...item,
                        aliesvalue: {}
                    }))
                };
                this.setState({
                    SubSectionList: updatedArray,
                    isLoading: false
                })
            });
        }
    }

    editSubSection(subsectionId) {
        CommonServices.getDataById(subsectionId, `/subsection`).then((res) => {
            this.setState({
                subsectionId: res.subsectionId,
                SubSectionName: res.subSectionName,
                SubSectionNameAlias: res.subSectionNameAlias,
                Description: res.description,
                SectionId: res.sectionId,
                ParentSubSectionId: res.parentSubSectionId,
                EnteredBy: 'Admin',
                DeleteStatus: false
            })
        });

    }

    deleteSubSection(id) {

        this.setState({
            subSectionId: id,
            SubSectionName: "jdjdcj",
            SubSectionNameAlias: "jsjdj",
            Description: "mcmcm",
            SectionId: 3,
            ParentSubSectionId: 2,
            EnteredBy: 'Admin',
            DeleteStatus: true
        }, function () {
            console.log(this.state)

            CommonServices.postData(this.state, `/subsection/DeleteSubSection`).then((res) => {
                this.props.enqueueSnackbarAction(res.data, "warning");
                this.getSubSection(this.state.currentPage);

                this.setState({
                    subSectionId: id,
                    SubSectionName: "",
                    SubSectionNameAlias: "",
                    Description: "",
                    SectionId: "",
                    ParentSubSectionId: "",
                    EnteredBy: 'Admin',
                    DeleteStatus: true
                })
            });
        });
    }

    getSections() {
        CommonServices.getData(`/mastersAPI/GetSections`).then((temp) => {
            this.setState({
                SectionList: temp,
                isddlSearchLoading: false
            })
        })
    }




    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value,
            isLoading: true
        }, () => {
            debugger
            this.getSubSection(1, this.state.searchQuery)
            this.GetParentSubsections(this.state.searchSectionId)


        })
    }

    handleChangeforsearch(e) {
        // console.log('handleChangeforsearch===',e.target.value)
        // this.setState({
        //     [e.target.name]: e.target.value,
        // }, () => {
        // })


        const { name, value } = e.target;

        // Split the input value by spaces
        const words = value.split(' ');

        // Join the words with the desired pattern
        const formattedValue = words.join(' - ');

        debugger
        this.setState({
            searchQuery: formattedValue,
            SubSectionList: []
        })

        this.getSubSection(1, formattedValue)
    }
}
export default connect(null, { enqueueSnackbarAction, closeSnackbar })(ListSubSectionComponent)
