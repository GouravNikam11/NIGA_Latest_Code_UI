import React, { Component } from 'react';
import { Table, Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Card, CardBody, Input, } from 'reactstrap';
import PropTypes from 'prop-types';
import styles from './materiamedicaremedies.module.css';
import CommonServices from '../../Services/CommonServices';
import {
  enqueueSnackbar as enqueueSnackbarAction,
  closeSnackbar
} from '../../store/actions/notification';
import { connect } from 'react-redux';
import Pagination from 'react-js-pagination';

let listItems

class Materiamedicaremedies extends Component {
  constructor(props) {
    super(props)

    this.state = {
      characters: ['All', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'],
      remedyId: 0,
      RemedyName: '',
      RemedyAlias: '',
      Description: '',
      RemedyList: [],
      filterlist:[],
      SearchText:'',
      currentPage: 1,
      pageSize: 10
    }
  }

  
  componentDidMount() {
    this.renderListItem();
    this.getRemedy();
  }

  renderListItem() {
    return (
      this.state.characters.map((characters) =>
        <li className='lilist'>{characters}</li>
      )
    )
  }
  getRemedy() {
    CommonServices.getData(`/remedy/GetRemedies`).then((temp) => {
      console.log(temp);
      debugger;
      this.setState({
        RemedyList: temp,
      })
    });
  }
  handleChange=(e)=> {
    console.log('demo============++++',  {[e.target.name]: e.target.value})
    this.setState({
        [e.target.name]: e.target.value
    });
  }

  renderTable = () => {
    debugger;
    const searchTerm = this.state.SearchText;
    var RemedyListfortable;
    if (searchTerm != "" && searchTerm != undefined) {
      RemedyListfortable = this.state.RemedyList.filter((value) => {
            if (value.remedyName.toLowerCase().indexOf(searchTerm) !== -1) {
                return value;
            } 
            else if (value.remedyName.toUpperCase().indexOf(searchTerm) !== -1) {
              return value;
          } 
        });
    }
    else {
      RemedyListfortable = this.state.RemedyList;
    }

    debugger
    // let RemedyListfortable = this.state.RemedyList;
    const { currentPage, pageSize } = this.state;
    const currentPageRecords = RemedyListfortable.slice(((currentPage - 1) * pageSize), (currentPage) * pageSize);
    return currentPageRecords.map((r, index) => {
      return <tr key={index}>
        <td className='fcol'>{r.remedyId}</td>
        <td><Link to={"/MateriamedicaRemediesDetails/" + r.remedyId + "/" + r.remedyName + "/" + r.remedyAlias}>{r.remedyName} </Link></td>
      </tr>
    })
   
  }

  renderPagination = () => {
    debugger

    const totalRecords = (this.state.RemedyList.length);
    return (
      (totalRecords > 9) &&
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



  render() {
    // const searchTerm = this.state.SearchText;
    // console.log('RemedyList=================================',this.state.RemedyList)
    // var Remedy;
    // if (searchTerm != "" && searchTerm != undefined) {
    //   Remedy = this.state.RemedyList.filter((value) => {
    //     if (value.remedyName.toLowerCase().indexOf(searchTerm) !== -1) {
    //       return value;
    //     } 
    //     console.log('value>>>>>===>>>', value)
    //   });
    // }
    // else {
    //   Remedy = this.state.RemedyList;
    //   console.log('Remedy>>>>>===>>>', Remedy)


    // }
    return (
      <div className={styles.Materiamedicaremedies}>

        <Row>
          <Col xs="12" md="12">
            <Card>
              <CardBody>
                <Row>
                  {/* <Col sm="9">
                    <ul className='ullist'>Sort : {this.renderListItem()}</ul>
                  </Col> */}
                  <Col sm="3">
                    <Input type="search"
                      placeholder="Search by LowerCase or UpperCase "
                      name='SearchText'
                      value={this.state.SearchText}
                      onChange={this.handleChange} />
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>
        </Row>

        <Table striped bordered hover>
          <thead>
            <tr>
              <th className='fcol'>#</th>
              <th>Remedy List</th>
            </tr>
          </thead>
          <tbody>

            {
              this.renderTable()
            }



          </tbody>
        </Table>
        <div responsive="true" className='pgdiv'>
            {this.renderPagination()}
        </div>
      </div>

    );
  }
}




Materiamedicaremedies.propTypes = {};

Materiamedicaremedies.defaultProps = {};

export default connect(null, { enqueueSnackbarAction, closeSnackbar })(Materiamedicaremedies)