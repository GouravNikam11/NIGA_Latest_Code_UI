import React, { Component } from 'react';
import { Col, Row, Form, FormLabel } from 'react-bootstrap';
import { Card, CardBody, CardHeader, Input, FormGroup } from 'reactstrap';
import styles from './MateriamedicaRemediesDetails.module.css';
import '../../components/CommanStyle.css';
import ReactHtmlParser from 'react-html-parser';
import {
  enqueueSnackbar as enqueueSnackbarAction,
  closeSnackbar
} from '../../store/actions/notification';
import CommonServices from '../../Services/CommonServices';
import { connect } from 'react-redux';
import { Label } from 'reactstrap';


export class MateriamedicaRemediesDetails extends Component {
  constructor(props) {
    super(props)

    this.state = {
      materiaMedicaHeadId: 0,
      materiaMedicaDetail1: '',
      remedyId: 0,
      RemedyName: '',
      remedyAlias:'',
      authorId: 0,
      authourList: [],
      lstRemedy: [],
      materiaMedicaHeadName:'',
      isLstRemedyLoad: false

    }
    this.handleChange = this.handleChange.bind(this);
  }

  async componentDidMount() {
    debugger
    var Id = this.props.match.params.id;
    var name = this.props.match.params.remedyname;
    var remedyAlias=this.props.match.params.remedyAlias;
    this.setState({
      remedyId: Id,
      RemedyName: name,
      remedyAlias:remedyAlias

    
    })
    //this.getRemedyname(this.props.match.params.id);
    this.getauthor();

  }


  getRemedyname(remedyId) {
    debugger;
    if (remedyId != undefined) {
      CommonServices.getDataById(remedyId, `/remedy`).then((res) => {
        debugger;
        this.setState({
          remedyId: res.remedyId,
          RemedyName: res.remedyName,
          remedyAlias:res.remedyAlias


        })
      });
    }
  }

  /**
      * handleSectionChanges
      */
  handleSectionChanges(e) {
    this.setState({
      authorId: e.target.value,
      isLstRemedyLoad: false
    })
    this.getMateriaMedicaRemediesDetails(this.state.remedyId, e.target.value);
  }

  renderauthorList = () => {
    if (this.state.authourList == undefined) {
      return null;
    }
    return this.state.authourList.map((author, index) => {
      return <option key={index} value={author.authorId}>{author.authorName}</option>
    })
  }

  // renderMateriaMedicaRemediesDetails = () => {
  //   if (this.state.lstRemedy == undefined) {
  //     return null;
  //   }
  //   return this.state.lstRemedy.map((list, index) => {
  //     return <option key={index} value={list.materiaMedicaHeadId}>{list.materiaMedicaDetail1}</option>
  //   })
  // }








  render() {
    return (
      <div className={styles.MateriamedicaRemediesDetails}>
        <Row>
          <Col xs="12" md="12">
            <Card>
              <CardHeader style={{ padding: 8 }}>
                <Row>
                  <Col md="6">
                    <Row>
                      <Col md="2">
                        <FormLabel className='frm-lbl'>Remedy: </FormLabel>
                      </Col>
                      <Col md="4">
                        <FormLabel className='frm-lbl' name="RemedyName"
                        > {this.state.RemedyName}</FormLabel>
                      </Col>

                      <Col md="4">
                        <FormLabel className='frm-lbl'>Remedy Alias :</FormLabel>
                      </Col>
                      <Col md="2">
                        <FormLabel className='frm-lbl' name="remedyAlias"
                        > {this.state.remedyAlias}</FormLabel>
                      </Col>

                    </Row>
                  </Col>
                  <Col md="6">

                    <Row>
                      <Col md="4" className='tright'>
                      <FormLabel className='frm-lbl'><i className="fa fa-user"></i> | Author : </FormLabel>
                      </Col>
                      <Col md="8">
                        <Form.Control as="select"
                          name="authorId"
                          onChange={this.handleSectionChanges.bind(this)}
                          value={this.state.authorId}>
                          <option value="0">
                            Select Author
                          </option>
                          {
                            this.renderauthorList()
                          }
                        </Form.Control>
                      </Col>
                    </Row>
                  </Col>

                </Row>
              </CardHeader>

              <CardBody  >
                {this.state.authorId !== 0 && this.state.isLstRemedyLoad ?
                  <Row>
                    <Col sm="12" className='medica'>
                      {
                        this.state.lstRemedy.map((r, index) => {
                          return <Row key={index}>
                            <Col> 
                           {ReactHtmlParser(r.materiaMedicaDetail1)}</Col>

                          
                          </Row>

                        })
                        
                      }

                    </Col>
                  </Row> :
                  <Row>
                    <Col sm="12" className='medica'>
                      Please Select Author
                    </Col>
                  </Row>
                }



              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>



    )
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value })
  }

  getauthor() {
    CommonServices.getData(`/Author`).then((temp) => {
      this.setState({
        authourList: temp
      })
    })
  }

  getMateriaMedicaRemediesDetails(remedyId, authorId) {
    debugger
    CommonServices.getData(`/MateriaMedicaRemediesDetails/GetMateriaMedicaRemediesDetails?remedyId=` + remedyId + `&authorId=` + authorId).then((temp) => {
      console.log(temp)
      this.setState({
        lstRemedy: temp.lstRemedy,
        isLstRemedyLoad: true,
      })
    })
  }




}
MateriamedicaRemediesDetails.propTypes = {};

MateriamedicaRemediesDetails.defaultProps = {};

export default connect(null, { enqueueSnackbarAction, closeSnackbar })(MateriamedicaRemediesDetails)














