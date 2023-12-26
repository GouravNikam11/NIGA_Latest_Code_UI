import React, { Component } from 'react';
import AstroService from '../../Services/AstroService';
import {
    Button,
    Card,
    CardBody,
    CardHeader,
    Col,
    FormGroup,
    Input,
    Label,
    Row,
} from 'reactstrap';
import { FormLabel, Table } from 'react-bootstrap';
import { connect } from "react-redux";
export class GetAstrologyComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            astroBasicList: [],
            astrodetailsList: [],
            astroCurrentVdashaList: [],
            numerotableList: [],
            day: '',
            month: '',
            year: '',
            hour: '',
            min: '',
            lat: '',
            lon: '',
            tzone: '' ,
            astrodata:this.props.history.location.state
        }
    }
    componentDidMount() {
        this.planetBasic();
       this.astrodetail();
      this.subChardasha();
       this.numerotable();
    }
    
    render() {
        return (

            <div>
                <div style={{ overflowY: 'scroll', maxHeight: '270px' }}>
                    <p>Basic Planet</p>
                    <CardBody>
                        <Table hover bordered striped responsive>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Name</th>
                                    <th>Full Degree</th>
                                    <th>Norm Degree</th>
                                    <th>Speed</th>
                                    <th>Is Retro</th>
                                    <th>Sign</th>
                                    <th>Sign Lord</th>
                                    <th>Nakshatra</th>
                                    <th>Nakshatra Lord</th>
                                    <th>Nakshatra_pad</th>
                                    <th>House</th>
                                    <th>Planet_awastha</th>
                                    <th>Is_planet_set</th>

                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.astroBasicList ?
                                        this.state.astroBasicList.map((value, index) => {
                                            return (
                                                <tr key={index}>
                                                    <td>{value.id}</td>
                                                    <td>{value.name}</td>
                                                    <td>{value.fullDegree}</td>
                                                    <td>{value.normDegree}</td>
                                                    <td>{value.speed}</td>
                                                    <td>{value.isRetro}</td>
                                                    <td>{value.sign}</td>
                                                    <td>{value.signLord}</td>
                                                    <td>{value.nakshatra}</td>
                                                    <td>{value.nakshatraLord}</td>
                                                    <td>{value.nakshatra_pad}</td>
                                                    <td>{value.house}</td>
                                                    <td>{value.planet_awastha}</td>
                                                    <td>{value.is_planet_set}</td>

                                                </tr>
                                            )
                                        }) : null
                                }
                            </tbody>
                        </Table>
                    </CardBody>
                </div>
                <div style={{ overflowY: 'scroll', maxHeight: '270px' }}>
                    <p>Basic Astro</p>
                    <CardBody>
                        <Table hover bordered striped responsive>
                            <thead>
                                <tr>
                                    <th>ascendant</th>
                                    <th>ascendant_lord</th>
                                    <th>Varna</th>
                                    <th>Vashya</th>
                                    <th>Yoni</th>
                                    <th>Gan</th>
                                    <th>Nadi</th>
                                    <th>SignLord</th>
                                    <th>sign</th>
                                    <th>Naksahtra</th>
                                    <th>NaksahtraLord</th>
                                    <th>Charan</th>
                                    <th>yog</th>
                                    <th>Karan</th>
                                    <th>Tithi</th>
                                    <th>yunja</th>
                                    <th>tatva</th>
                                    <th>name_alphabet</th>
                                    <th>paya</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.astroBasicList ?
                                        <tr >
                                                    <td>{this.state.astrodetailsList.ascendant}</td>
                                                    <td>{this.state.astrodetailsList.ascendant_lord}</td>
                                                    <td>{this.state.astrodetailsList.Varna}</td>
                                                    <td>{this.state.astrodetailsList.Vashya}</td>
                                                    <td>{this.state.astrodetailsList.Yoni}</td>
                                                    <td>{this.state.astrodetailsList.Gan}</td>
                                                    <td>{this.state.astrodetailsList.Nadi}</td>
                                                    <td>{this.state.astrodetailsList.SignLord}</td>
                                                    <td>{this.state.astrodetailsList.sign}</td>
                                                    <td>{this.state.astrodetailsList.Naksahtra}</td>
                                                    <td>{this.state.astrodetailsList.NaksahtraLord}</td>
                                                    <td>{this.state.astrodetailsList.Charan}</td>
                                                    <td>{this.state.astrodetailsList.yog}</td>
                                                    <td>{this.state.astrodetailsList.Karan}</td>
                                                    <td>{this.state.astrodetailsList.Tithi}</td>
                                                    <td>{this.state.astrodetailsList.yunja}</td>
                                                    <td>{this.state.astrodetailsList.tatva}</td>
                                                    <td>{this.state.astrodetailsList.name_alphabet}</td>
                                                    <td>{this.state.astrodetailsList.paya}</td>
                                                </tr>
                                            :null
                                }
                            </tbody>
                        </Table>
                    </CardBody>
                </div>
                 <div style={{ overflowY: 'scroll', maxHeight: '270px' }}>
                    <p>Sub  Chardasha Astro</p>
                    <CardBody>
                        <Table hover bordered striped responsive>
                            <thead>
                                <tr>
                                    <th></th>
                                    <th></th>
                                    
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.astroCurrentVdashaList ?
                                    
                                     <tr >
                                                    <td>major</td>
                                                    
                                                    <td>
                                                        <table>
                                                            <thead>
                                                                <tr>
                                                                    <th>Planet_id</th>
                                                                    <th>Planet</th>
                                                                    <th>Start</th>
                                                                    <th>End</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                <td>{this.state.astroCurrentVdashaList.major && this.state.astroCurrentVdashaList.major.planet_id }</td>
                                                                 <td>{this.state.astroCurrentVdashaList.major && this.state.astroCurrentVdashaList.major.planet}</td>
                                                                <td>{ this.state.astroCurrentVdashaList.major && this.state.astroCurrentVdashaList.major.start}</td>
                                                                <td>{ this.state.astroCurrentVdashaList.major &&this.state.astroCurrentVdashaList.major.end}</td> 
                                                            </tbody>
                                                        </table>
                                                    </td>
                                              </tr>  
                                               
                                          : null 
                                         
                                     
                                }
                            </tbody>
                            <tbody>
                                {
                                    this.state.astroCurrentVdashaList ?
                                    
                                     <tr >
                                                    <td>minor</td>
                                                    
                                                    <td>
                                                        <table>
                                                            <thead>
                                                                <tr>
                                                                    <th>Planet_id</th>
                                                                    <th>Planet</th>
                                                                    <th>Start</th>
                                                                    <th>End</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                <td>{this.state.astroCurrentVdashaList.minor && this.state.astroCurrentVdashaList.minor.planet_id }</td>
                                                                 <td>{this.state.astroCurrentVdashaList.minor && this.state.astroCurrentVdashaList.minor.planet}</td>
                                                                <td>{ this.state.astroCurrentVdashaList.minor && this.state.astroCurrentVdashaList.minor.start}</td>
                                                                <td>{ this.state.astroCurrentVdashaList.minor &&this.state.astroCurrentVdashaList.major.end}</td> 
                                                            </tbody>
                                                        </table>
                                                    </td>
                                              </tr>  
                                               
                                          : null 
                                         
                                     
                                }
                            </tbody>
                            <tbody>
                                {
                                    this.state.astroCurrentVdashaList ?
                                    
                                     <tr >
                                                    <td>sub_minor</td>
                                                    
                                                    <td>
                                                        <table>
                                                            <thead>
                                                                <tr>
                                                                    <th>Planet_id</th>
                                                                    <th>Planet</th>
                                                                    <th>Start</th>
                                                                    <th>End</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                <td>{this.state.astroCurrentVdashaList.sub_minor && this.state.astroCurrentVdashaList.sub_minor.planet_id }</td>
                                                                 <td>{this.state.astroCurrentVdashaList.sub_minor && this.state.astroCurrentVdashaList.sub_minor.planet}</td>
                                                                <td>{ this.state.astroCurrentVdashaList.sub_minor && this.state.astroCurrentVdashaList.sub_minor.start}</td>
                                                                <td>{ this.state.astroCurrentVdashaList.sub_minor &&this.state.astroCurrentVdashaList.sub_minor.end}</td> 
                                                            </tbody>
                                                        </table>
                                                    </td>
                                              </tr>  
                                               
                                          : null 
                                         
                                     
                                }
                            </tbody>
                            <tbody>
                                {
                                    this.state.astroCurrentVdashaList ?
                                    
                                     <tr >
                                                    <td>sub_sub_minor</td>
                                                    
                                                    <td>
                                                        <table>
                                                            <thead>
                                                                <tr>
                                                                    <th>Planet_id</th>
                                                                    <th>Planet</th>
                                                                    <th>Start</th>
                                                                    <th>End</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                <td>{this.state.astroCurrentVdashaList.sub_sub_minor && this.state.astroCurrentVdashaList.sub_sub_minor.planet_id }</td>
                                                                 <td>{this.state.astroCurrentVdashaList.sub_sub_minor && this.state.astroCurrentVdashaList.sub_sub_minor.planet}</td>
                                                                <td>{ this.state.astroCurrentVdashaList.sub_sub_minor && this.state.astroCurrentVdashaList.sub_sub_minor.start}</td>
                                                                <td>{ this.state.astroCurrentVdashaList.sub_sub_minor &&this.state.astroCurrentVdashaList.sub_sub_minor.end}</td> 
                                                            </tbody>
                                                        </table>
                                                    </td>
                                              </tr>  
                                               
                                          : null 
                                         
                                     
                                }
                            </tbody>
                        </Table>
                    </CardBody>
                </div> 
                <div style={{ overflowY: 'scroll', maxHeight: '270px' }}>
                    <p>numero table</p>
                    <CardBody>
                    <Table hover bordered striped responsive>
                            <thead>
                                <tr>
                                    <th>name</th>
                                    <th>date</th>
                                    <th>destiny_number</th>
                                    <th>radical_number</th>
                                    <th>name_number</th>
                                    <th>evil_num</th>
                                    <th>fav_color</th>
                                    <th>fav_day</th>
                                    <th>fav_god</th>
                                    <th>fav_mantra</th>
                                    <th>fav_metal</th>
                                    <th>fav_stone</th>
                                    <th>fav_substone</th>
                                    <th>friendly_num</th>
                                    <th>neutral_num</th>
                                    <th>radical_num</th>
                                    <th>radical_ruler</th>
                                  
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.numerotableList ?
                                        <tr >
                                                    <td>{this.state.numerotableList.name}</td>
                                                    <td>{this.state.numerotableList.date}</td>
                                                    <td>{this.state.numerotableList.destiny_number}</td>
                                                    <td>{this.state.numerotableList.radical_number}</td>
                                                    <td>{this.state.numerotableList.name_number}</td>
                                                    <td>{this.state.numerotableList.evil_num}</td>
                                                    <td>{this.state.numerotableList.fav_color}</td>
                                                    <td>{this.state.numerotableList.fav_day}</td>
                                                    <td>{this.state.numerotableList.fav_god}</td>
                                                    <td>{this.state.numerotableList.fav_mantra}</td>
                                                    <td>{this.state.numerotableList.fav_metal}</td>
                                                    <td>{this.state.numerotableList.fav_stone}</td>
                                                    <td>{this.state.numerotableList.fav_substone}</td>
                                                    <td>{this.state.numerotableList.friendly_num}</td>
                                                    <td>{this.state.numerotableList.neutral_num}</td>
                                                    <td>{this.state.numerotableList.radical_num}</td>
                                                    <td>{this.state.numerotableList.radical_ruler}</td>
                                                   
                                                </tr>
                                            :null
                                }
                            </tbody>
                        </Table>
                    </CardBody>
                </div>
            </div>
        );
    }

    planetBasic() {
        debugger;
        
        var astro = {
            day: 1,
            month: 3,
            year: 1992,
            hour: 2,
            min: 23,
            lat: 19.132,
            lon: 72.342,
            tzone: 5.5
        };
        AstroService.postData(this.state.astrodata, `/planets`).then((responseMessage) => {
            console.log(responseMessage);
            this.setState({
                astroBasicList: responseMessage.data,
            })
        });
    }
    astrodetail() {
        var astro = {
            day: 12,
            month: 3,
            year: 1992,
            hour: 2,
            min: 23,
            lat: 19.132,
            lon: 72.342,
            tzone: 5.5
        };
        AstroService.postData(this.state.astrodata, `/astro_details/`).then((responseMessage) => {
            console.log(responseMessage);
            debugger;
            this.setState({
                astrodetailsList: responseMessage.data,
            })
        });
    }
    subChardasha() {
        var astro = {
            day: 12,
            month: 3,
            year: 1992,
            hour: 2,
            min: 23,
            lat: 19.132,
            lon: 72.342,
            tzone: 5.5
        };
        AstroService.postData(this.state.astrodata, `/current_vdasha/`).then((responseMessage) => {
            console.log(responseMessage);
            debugger;
            this.setState({
                astroCurrentVdashaList: responseMessage.data,
            })
        });
    }
    numerotable() {
        var astro = {
            day: 12,
            month: 3,
            year: 1992,
            hour: 2,
            min: 23,
            lat: 19.132,
            lon: 72.342,
            tzone: 5.5
        };
        AstroService.postData(this.state.astrodata, `/numero_table/`).then((responseMessage) => {
            console.log(responseMessage);
            this.setState({
                numerotableList: responseMessage.data,
            })
        });
    }
}

export default GetAstrologyComponent