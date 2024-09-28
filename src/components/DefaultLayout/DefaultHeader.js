import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Badge, UncontrolledDropdown, DropdownItem, DropdownMenu, DropdownToggle, Nav, NavItem } from 'reactstrap';
import PropTypes from 'prop-types';

import { AppAsideToggler, AppNavbarBrand, AppSidebarToggler } from '@coreui/react';
import logo from '../../assets/img/brand/logo.png'
import sygnet from '../../assets/img/brand/sygnet.png'
import { UserRoles } from '../../Constants/UserRoles'
import avtr from '../../assets/img/avatars/users.jpg'
import store from '../../store';
import { connect, useDispatch } from 'react-redux';
const propTypes = {
  children: PropTypes.node,
};

const defaultProps = {};

class DefaultHeader extends Component {
  

 
  handleSidebarToggle() {
    console.log('Sidebar toggler clicked!',this.props);
   // store.dispatch({ type: 'HIDE_SHOW_SIDE_BAR', payload: !this.props.ishideshowsidebar });
    // Add your custom logic here, e.g., toggle sidebar visibility
  }

  render() {
    debugger

    // eslint-disable-next-line
    const { children, ...attributes } = this.props;
    const isDoctor = localStorage.getItem("RoleName") === UserRoles.Doctor;
    return (
      <React.Fragment>

        <AppSidebarToggler className="d-lg-none" display="md" mobile />

        <AppNavbarBrand
          full={{ src: logo, width: 185, height: 45, alt: 'Homeo Centrum Logo' }}
          minimized={{ src: sygnet, width: 50, height: 50, alt: 'Homeo Centrum Logo' }}
        />
<span class="d-md-down-none navbar-toggler" style={{marginTop:'-25px'}} onClick={()=> 
  {
    store.dispatch({ type: 'HIDE_SHOW_SIDE_BAR', payload: !this.props.ishideshowsidebar })}} >
      {
    (localStorage.getItem("RoleName") === UserRoles.Admin) ? (
      <AppSidebarToggler className="d-md-down-none" display="lg" />
    ) : null
  }
{/* <AppSidebarToggler  display="lg" /> */}
</span>
       
{/* <AppSidebarToggler className="d-md-down-none" display="lg" /> */}
 

     
       <Nav className="d-md-down-none topmenus" navbar>
              {isDoctor ? (
                <>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  <NavItem className="px-3">
                    <NavLink to="/DoctorDashboard" className="nav-link nvlink"><i class="fa fa-home" aria-hidden="true"></i> Dashboard</NavLink>
                  </NavItem>
                  <NavItem className="px-3">
                    <NavLink to="/AddPatientAppointment" className="nav-link nvlink"><i class="fa fa-pencil-square" aria-hidden="true"></i> Appointments</NavLink>
                  </NavItem>
                  <NavItem className="px-3">
                    <NavLink to="/PatientEntry" className="nav-link nvlink"><i class="fa fa-user-plus" aria-hidden="true"></i> New Patient</NavLink>
                  </NavItem>
                  <NavItem className="px-3">
                    <NavLink to="/PatientList" className="nav-link nvlink"><i class="fa fa-users" aria-hidden="true"></i> Patient List</NavLink>
                  </NavItem>
                  <NavItem className="px-3">
                    <NavLink to="#" className="nav-link nvlink"><i class="fa fa-file-text" aria-hidden="true"></i> Billing</NavLink>
                  </NavItem>
                  <NavItem className="px-3">
                    <NavLink to="#" className="nav-link nvlink"><i class="fa fa-book" aria-hidden="true"></i> Reports</NavLink>
                  </NavItem>
                  <NavItem className="px-3">
                    <NavLink to="#" className="nav-link nvlink"><i class="fa fa-user-md" aria-hidden="true"></i> E-Consult</NavLink>
                  </NavItem>
                </>

                

              ) : (
                // Render other items for non-doctor users
                <>
                  
                </>
              )
              
              }

              {
                //builder.hide("primarySidebar", true)
              }
      </Nav>


        <Nav className="ml-autos" navbar>

          <NavItem className="d-md-down-none">
            <NavLink to="#" className="nav-link"><i className="icon-bell"></i><Badge pill color="danger">5</Badge></NavLink>
          </NavItem>

          &nbsp;&nbsp;

          <UncontrolledDropdown nav direction="down">
            <DropdownToggle nav>
              <img src={avtr} className="img-avatar" alt="img" />
            </DropdownToggle>
            <DropdownMenu right>
              <DropdownItem><i className="fa fa-user"></i> Profile</DropdownItem>
              <DropdownItem><i className="fa fa-wrench"></i> Settings</DropdownItem>
              <DropdownItem onClick={e => {  document.body.classList.remove('sidebar-lg-show');
                                    store.dispatch({ type: 'HIDE_SHOW_SIDE_BAR', payload: false })
                this.props.onLogout(e)}}><i className="fa fa-lock"></i> Logout</DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>

        </Nav>

        {/* <AppAsideToggler className="d-md-down-none" /> */}
        {/*<AppAsideToggler className="d-lg-none" mobile />*/}
      </React.Fragment>
    );
  }
}

DefaultHeader.propTypes = propTypes;
DefaultHeader.defaultProps = defaultProps;
const mapStateToProps = (state) => ({
 // existance: state.patient.existance,
  ishideshowsidebar:state.doctor.ishideshowsidebar

});

export default connect(mapStateToProps, null)(DefaultHeader); 
