import React from 'react';
import {
    Card,
    TabPane,
    CardBody,
    CardHeader,
    Input,
    Label,
    CardText,
    Button,
    Alert
} from 'reactstrap';
import { Table, Col, FormGroup, Form, Row } from 'react-bootstrap';

import AsyncPaginate from "react-select-async-paginate";
import CommonServices from '../../../Services/CommonServices';
import { connect } from "react-redux";

class AdverseEffectComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchText: "",
            allopathicDrugId: 0,
            drugGroupId: 0,
            drugGroupName: "",
            allopathicDrugName: "",
            drugSystemId: 0,
            drugSystemName: null,
            adverseReactionModelList: [],
            otherSideEffectModelList: [],
            seriousSideEffectModelList: [],
            allopathicDrugIds:[],
            GetAllopathicDrugList:[]
        }
    }

    componentDidMount() {
this.GetAllopathicDrug();
    }
    GetAllopathicDrug() {
        CommonServices.getData(`/AllopathicDrug/GetAllopathicDrugfordropdown`).then((temp) => {
            this.setState({
                GetAllopathicDrugList: temp
            })
        })
    }
    loadAllopathicDrugIdOptions = async (search, prevOptions) => {
        const options = [];
        // var subsectionList 
        // await this.GetParentSubsections(this.state.sectionId).then((result) => {
        //     subsectionList = result;
        // })
        this.state.GetAllopathicDrugList.map(x => options.push({ value: x.allopathicDrugId, label: x.allopathicDrugName }));
        let filteredOptions;
        if (!search) {
            filteredOptions = options;
        } else {
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
    
    handleChange = (e) => {
        console.log('res===', e.target.value)
        this.setState({ [e.target.name]: e.target.value });
        if (e.target.value !== undefined) {
            CommonServices.getDataById(e.target.value, `/AllopathicDrug/GetAllopathicDrugByName`).then((res) => {
                console.log('res===', res)
                if(res!==undefined){
                    this.setState({
                        "allopathicDrugId": res.allopathicDrugId,
                        "drugGroupId": res.drugGroupId,
                        "drugGroupName": res.drugGroupName,
                        "allopathicDrugName": res.allopathicDrugName,
                        "drugSystemId": res.drugSystemId,
                        "drugSystemName": res.drugSystemName,
                        "adverseReactionModelList": res.adverseReactionModelList,
                        "otherSideEffectModelList": res.otherSideEffectModelList,
                        "seriousSideEffectModelList": res.seriousSideEffectModelList,
                    });
                }
                else{
                    this.setState({
                        "allopathicDrugId": 0,
                        "drugGroupId": 0,
                        "drugGroupName": '',
                        "allopathicDrugName": '',
                        "drugSystemId": 0,
                        "drugSystemName": null,
                        "adverseReactionModelList": [],
                        "otherSideEffectModelList": [],
                        "seriousSideEffectModelList": [],
                    });

                }
               
            });
        }
    }

    AllopathicDrugChanged(e) {
        console.log("e====", e)
        if (e != null) {
            this.setState({
                allopathicDrugIds: e,
            }, () => {
            })
        }

        if(e!==null)
        {
            CommonServices.getDataById(e.value, `/AllopathicDrug/GetAllopathicDrugById`).then((res) => {
                debugger
                console.log('API res===', res)
                if (res !== undefined) {
                    this.setState({
                        allopathicDrugName:res.allopathicDrugName,
                        drugGroupName:res.drugGroupName,
                        drugSystemName:res.drugSystemName,
                        seriousSideEffectModelList:res.seriousSideEffectModelList,
                        otherSideEffectModelList:res.otherSideEffectModelList,
                        adverseReactionModelList:res.adverseReactionModelList
                    })
                   
                }
                else {
    
                }
            });
        }
        else{

        }
        
       
    }
    render() {
        return (
            <TabPane tabId={7}>
  

                <Row >
                    <Col>
                            <Row>
                                    <Col sm="12" md="4">
                                        <AsyncPaginate isClearable
                                            labelKey="value"
                                            labelValue="allopathicDrugId"
                                            placeholder="Type Diagnosis Name"
                                            value={this.state.allopathicDrugIds}
                                            loadOptions={this.loadAllopathicDrugIdOptions}
                                            onChange={this.AllopathicDrugChanged.bind(this)}
                                        />
                                    </Col>
                                    <Col sm="12" md="4">
                                        <Label className="label mtext mt-1" >{this.state.allopathicDrugName === null ? '' : this.state.allopathicDrugName}</Label>
                                        <Label className="label stext mt-1" >{this.state.drugSystemName === null ? '' : '[' + this.state.drugSystemName + ']' }</Label>
                                    </Col>
                                    <Col sm="12" md="4">
                                        <Label className="label ltext mt-1" htmlFor="">{this.state.drugGroupName === null ? '' : this.state.drugGroupName}</Label>
                                    </Col>
                                    
                            </Row>
                                {/* <Row className="mt-2">
                                    <Col sm="12" md="12">
                                        <Row>
                                            <Col xs="12" md="8" className="text-left mt-2">
                                                    
                                                    
                                            </Col>
                                            <Col xs="12" md="4" className="text-right mt-2">
                                                   
                                            </Col>
                                        </Row>
                                    </Col>
                                </Row> */}

                                <Row className="mt-2">
                                    <Col sm="4" md="4" className="fdiv">
                                        <Table responsive="sm" >
                                            <thead>
                                                <tr>
                                                    <th className='thhead'>Serious Effects</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td className="tbl tblr vertop" style={{ width: "33.33%" }}>
                                                        <div className='tblht'>
                                                            <Table responsive="sm" className='table-borderless table-striped '>
                                                            
                                                                <tbody >
                                                                    {
                                                                        this.state.seriousSideEffectModelList.map((s, index) => {
                                                                            return <tr key={index}>
                                                                                <td> <i class="fa fa-angle-double-right text-success fa-lg mr-1" aria-hidden="true"></i> {s.seriousSideEffectName}</td>

                                                                            </tr>
                                                                        })
                                                                    }
                                                                </tbody>
                                                            </Table>
                                                        </div>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </Table>
                                    </Col>

                                    <Col sm="4" md="4" className="sdiv">
                                        <Table responsive="sm" >
                                            <thead>
                                                <tr>
                                                    <th className='thhead'>Other Effects</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td className="tbl tblr vertop" style={{ width: "33.33%" }}>
                                                        <div className='tblht'>
                                                            <Table responsive="sm" className='table-borderless table-striped '>
                                                            
                                                                <tbody>
                                                                    {
                                                                        this.state.otherSideEffectModelList.map((s, index) => {
                                                                            return <tr key={index}>
                                                                                <td><i class="fa fa-angle-double-right text-success fa-lg mr-1" aria-hidden="true"></i> {s.otherSideEffectName}</td>
                                                                            </tr>
                                                                        })
                                                                    }
                                                                </tbody>
                                                            </Table>
                                                        </div>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </Table>
                                    </Col>

                                    <Col sm="4" md="4" className="tdiv">
                                        <Table responsive="sm" >
                                            <thead>
                                                <tr>
                                                    <th className='thhead'>Adverse Effects</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td className="tbl tblr vertop" style={{ width: "33.33%" }}>
                                                        <div className='tblht'>
                                                            <Table responsive="sm" className='table-borderless table-striped '>
                                                            
                                                                <tbody>
                                                                    {
                                                                        this.state.adverseReactionModelList.map((s, index) => {
                                                                            return <tr key={index}>
                                                                                <td><i class="fa fa-angle-double-right text-success fa-lg mr-1" aria-hidden="true"></i> {s.adverseReactionName}</td>
                                                                            </tr>
                                                                        })
                                                                    }
                                                                </tbody>
                                                            </Table>
                                                        </div>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </Table>
                                    </Col>


                                    
                                </Row>
                          
                       
                    </Col>
                </Row>
            </TabPane>
        )
    }




}
const mapStateToProps = (state) => ({

});


const mapDispatchToProps = {
}


export default connect(mapStateToProps, mapDispatchToProps)(AdverseEffectComponent)