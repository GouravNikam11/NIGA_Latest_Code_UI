import React, { useEffect, useState, } from 'react';
import { Modal, Table, Button, Col, Row, Collapse, FormLabel, Form } from 'react-bootstrap';
import CommonServices from '../../Services/CommonServices';
import { Link } from 'react-router-dom';
import Pagination from "react-js-pagination";
import { ClipLoader } from "react-spinners";
import { styles } from './rubricstyle.css'
import { Input } from 'reactstrap';


export const RubricList = (props) => {





    const [rubricList, setRubricList] = useState();
    const [isFetching, setIsFetching] = useState(false);
    const [show, setShow] = useState(false);
    const [gradeDetails, setSelectedSubSection] = useState([]);
    const [selectedGradeId, setSelectedGradeId] = useState(null);
    const [currentPage, setcurrentPage] = useState(1);
    const [pageSize, setpageSize] = useState(10)
    const [isLoading, setIsLoading] = useState(false);


    const [searchTerm, setSearchTerm] = useState('');
   



    const [SectionList, setSectionList] = useState([0]);
    const [searchSectionId, setsearchSectionId] = useState('');
    const [sectionId, setsectionId] = useState();


    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    useEffect(() => {
        // getData();
        getSection();
    }, [])


    const getData = async (pageNumber, searchQuery,NewSId) => {
        debugger
        /*  let rubricList = await CommonServices.getData(`/RubricRemedy/GetRubricList?SectionId=${sectionId}`);
 
         if (rubricList.length > 0) {
             setRubricList(rubricList);
             setIsFetching(false);
             setIsLoading(true);
         } */

        // console.log(`/RubricRemedy/GetRubricList?SectionId=${sectionId}`)
        // CommonServices.getData(`/RubricRemedy/GetRubricList?SectionId=${sectionId}`).then((subSections) => {

            CommonServices.getData(`/Pagination/GetSubSectionForRubric?sectionId=${NewSId}${searchQuery ? `&queryString=${searchQuery}` : ''}&PageNumber=${pageNumber}&PageSize=${pageSize}`).then((subSections) => {
                        // this.state.currentPage = pageNumber
                        setcurrentPage(pageNumber)


            setRubricList(subSections);
            setIsFetching(false);
            setIsLoading(true);
        });
    }


    const getSection = async () => {
        debugger;
        // let SectionList = CommonServices.getData(`/section`);
        // if (SectionList.length > 0) {
        //     setSectionList(SectionList);
        //     setIsFetching(false);
        //     setIsLoading(true);
        // }
        CommonServices.getData(`/mastersAPI/GetSections`).then((temp) => {
            setSectionList(temp);
        })
    }


    const handleChangeforsearch = (e) => {
        // setIsFetching(true)
        setSearchTerm(e.target.value)
        getData(1, e.target.value, searchSectionId)

    }

    const handleChange = (e) => {
        debugger
        setIsFetching(true)
       setsearchSectionId(e.target.value)
        // getData(e.target.value);
        // this.setState({
        //     [e.target.name]: e.target.value,
        //     // isLoading: true
        // }, () => {
        // })
        getData(1, searchTerm,e.target.value)
    }




    const renderSectionList = () => {
        if (SectionList == undefined) {
            return null;
        }
        return SectionList.map((section, index) => {
            return <option key={index} value={section.sectionId}>{section.sectionName}</option>
        })
    }


    const getGrades = async (subSectionId) => {
        debugger
        let gradeDetails = await CommonServices.getData(`/RubricRemedy/GetGradeDetails/${subSectionId}`);
        debugger
        if (gradeDetails.length > 0) {
            setSelectedSubSection(gradeDetails)
        }
    }


    /* Gourav Added 19/10/2022*/

    // const renderSubsectionTable = () => {
    //     const currentPageRecords = rubricList.slice(((currentPage - 1) * pageSize), (currentPage) * pageSize);
    //     if (currentPageRecords.length == 0) {
    //         return (
    //             <tr >
    //                 <td colSpan={7} style={{ textAlign: 'center' }}>
    //                     <Row>
    //                         <Col>
    //                             <label>Records not found.</label>
    //                         </Col>
    //                     </Row>
    //                 </td>
    //             </tr>
    //         )
    //     }
    //     return currentPageRecords.map((item, index) => {
    //         console.log('item====',item)
    //         console.log('index====',index)
    //         return (
    //             <tr key={index}>
    //                 <td>{item.subSectionId}</td>
    //                 <td><Link to="#" onClick={() => remedyDetailsOnClick(item)}> {item.subSectionName}</Link>
    //                 </td>
    //                 <td className='lcol'>
    //                     <Button style={{ marginLeft: 8 }} variant="danger" ><i className="fa fa-trash"></i></Button>
    //                 </td>
    //             </tr>
    //         )
    //     })
    // }

   
    
    const renderSubsectionTable = () => {
        // const filteredRecords = rubricList.filter(item => 
        //     item.subSectionName.toLowerCase().includes(searchTerm.toLowerCase())
        // );
        // const currentPageRecords = rubricList.slice(((currentPage - 1) * pageSize), (currentPage) * pageSize);
        if (rubricList?.resultObject?.length === 0) {
            return (
                <tr>
                    <td colSpan={3} style={{ textAlign: 'center' }}>
                        <p>Records not found.</p>
                    </td>
                </tr>
            );
        }

        return rubricList?.resultObject?.map((item, index) => (
            <tr key={index}>
                <td>{item.subSectionId}</td>
                <td>
                    <Link to="#" onClick={() => remedyDetailsOnClick(item)}>
                        {item.subSectionName}
                    </Link>
                </td>
                <td className='lcol'>
                    <Button style={{ marginLeft: 8 }} variant="danger">
                        <i className="fa fa-trash"></i>
                    </Button>
                </td>
            </tr>
        ));
    };

    

    const renderPagination = () => {
        console.log('rubricList =', rubricList)
        const totalRecords = (rubricList?.totalCount);
        return (
            (totalRecords > 9) &&
            <Pagination
                itemClass="page-item" // add it for bootstrap 4
                linkClass="page-link" // add it for bootstrap 4
                activePage={currentPage}
                itemsCountPerPage={pageSize}
                totalItemsCount={totalRecords}
                pageRangeDisplayed={pageSize}
                // onChange={(pageNumber) => {
                //     setcurrentPage(pageNumber)
                // }}
                onChange={(pageNumber) => { getData(pageNumber, searchTerm, searchSectionId) }}

            />
        )
    }



    const remedyDetailsOnClick = async ({ subSectionId }) => {
        debugger
        await getGrades(subSectionId)
        setShow(true);
    }

    const remdedyDetailsModal = () => {
        return (
            <Modal size="lg" aria-labelledby="contained-modal-title-vcenter" show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Remedy Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Table striped bordered hover >
                        <thead>
                            <tr>
                                <th>Grade</th>
                            </tr>

                        </thead>
                        <tbody>
                            {
                                renderRemedyDetails(gradeDetails)
                            }
                        </tbody>
                    </Table>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        )
    }

    const renderGradeRemedies = ({ remediesModels, gradeId }) => {
        console.log('gradeId==========>>', gradeId)
       
        return remediesModels.map(remedy => {
            return (
                <tr key={remedy.remedyId} >
                    <td className={gradeId == 5 ? 'grade1css' : gradeId == 2 ? 'grade2css' : gradeId == 3 ? 'grade3css' : gradeId == 4 && 'grade4css'}>
                        {remedy.remedyName}
                    </td>

                    
                   
                    
                </tr>
            )
        });

    }

    const renderRemedyDetails = (gradeDetails) => {
        debugger;
        if (gradeDetails?.length == 0) {
            return (
                <tr>
                    <td colSpan={1}>No Data found</td>
                </tr>
            )
        }

        return (
            gradeDetails?.map((item, index) => {
                return (
                    <tr key={index}>
                        <td>
                            <Button
                                onClick={() => setSelectedGradeId(item.gradeId)}
                                aria-controls="example-collapse-text"
                                aria-expanded={setSelectedGradeId}
                                
                            >
                                {item.gradeNo}

                            </Button>

                            <Link to={`/EditRubrics/${item.subSectionId}/${item.gradeId}`}>
                               <Button style={{float: 'right'}}><i className="fa fa-pencil" ></i></Button>
                            </Link>

                       
                            <Collapse in={item.gradeId === selectedGradeId}>
                                <div id="example-collapse-text">
                                    <Table striped bordered hover style={{ marginTop: "0.5rem" }}>
                                        <thead>
                                            <tr>
                                                <th>Remedy Name</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                renderGradeRemedies(item, item.gradeId)
                                            }
                                        </tbody>
                                    </Table>
                                </div>
                            </Collapse>
                        </td>
                    </tr>
                )
            })
        )
    }

    return (
        <>
            <Row>
                <Col sm={9} >
                    <Row>
                        <FormLabel column sm="2">Select Section :</FormLabel>
                        <Col sm="5">
                            <Form.Control as="select"
                                name="searchSectionId"
                                value={searchSectionId}
                                onChange={(e) => handleChange(e)}
                            >
                                <option value="0">
                                    Select
                                </option>
                                {
                                    renderSectionList()
                                }
                            </Form.Control>
                        </Col>

                        <Col sm="5">
                             <Input type="search"
                               placeholder="Search by Lower Case or Upper Case "
                               name='searchQuery'
                              onChange={(e) => handleChangeforsearch(e)}
                              value={searchTerm}
                            //   onChange={e => setSearchTerm(e.target.value)}
                               />
                            </Col>
                    </Row>
                </Col>



                <Col sm={3}>
                    <Link to={'/AddRubrics'} className="nav-link lnkbtn" >
                        <Button color="primary"
                            style={{ textTransform: "uppercase" }}
                        > <i className="fa fa-plus"></i> &nbsp;
                            Add Rubric
                        </Button>
                    </Link>
                </Col>
            </Row>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th className='fcol'>#</th>
                        <th>Sub Section Name</th>
                        <th className='lcol'>Action</th>
                    </tr>
                </thead>

            </Table>

            {isLoading ?
                <>
                    <Table striped bordered hover>
                        <tbody>
                            {
                                isFetching ? <tr>
                                    <td colSpan={4}></td>
                                </tr> : renderSubsectionTable()
                            }
                        </tbody>
                        {remdedyDetailsModal()}
                    </Table>
                    {renderPagination()}
                    
                </> :
                <>
                    <Table striped bordered hover>
                        <tr >
                            <td colSpan={7} style={{ textAlign: 'center' }}>
                                <Row>
                                    <Col>
                                        <label>Please Select Section</label>
                                    </Col>
                                </Row>
                            </td>
                        </tr>
                    </Table>

                </>
            }
            {
                isFetching &&
                <div style={{
                    display: 'flex',

                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '80vh',
                }}>
                    <ClipLoader
                        color="#2d292a"
                        size={80}
                    />
                </div>}
        </>

    )
}

export default RubricList;