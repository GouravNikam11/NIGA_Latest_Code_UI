import React, { Component, Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import * as router from 'react-router-dom';
import { Alert, Container } from 'reactstrap';
import DefaultAside from './DefaultAside';
import DefaultFooter from './DefaultFooter';
import DefaultHeader from './DefaultHeader';
import { SnackbarProvider } from 'notistack';
import { connect, useDispatch } from 'react-redux';
import store from '../../store';
import { setIds } from '../../store/actions/Patient';
import {
  AppAside,
  AppFooter,
  AppHeader,
  AppSidebar,
  AppSidebarFooter,
  AppSidebarForm,
  AppSidebarHeader,
  AppSidebarMinimizer,
  AppBreadcrumb2 as AppBreadcrumb,
  AppSidebarNav2 as AppSidebarNav,
} from '@coreui/react';
// sidebar nav config
import { UserRoles } from '../../Constants/UserRoles'
import navigation1 from '../Navigation/AdminNavBar';
import navigation2 from '../Navigation/DoctorNavBar';
// routes config
import routes from '../../routes';
// const DefaultAside = React.lazy(() => import('./DefaultAside'));
// const DefaultFooter = React.lazy(() => import('./DefaultFooter'));
// const DefaultHeader = React.lazy(() => import('./DefaultHeader'));
class DefaultLayout extends Component {
  loading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>
  componentDidMount() {
    console.log('DefaultLayout====', this.props.Existance)
    /* { items: [...this.props.Existance] } */
  }
  signOut(e) {
    e.preventDefault()
    localStorage.clear();
    this.props.history.push('/login')
  }

  async itemClick(e) {
    debugger
    console.log('itemClick e =', e.target);
    let url = e.target.href;
    let array = url.split('/');
    debugger
    console.log('len 1 = ', array.length)
    console.log('len 2 = ', array[array.length - 1])
    console.log('len 3 = ', array[array.length - 2])
    if (array.length == 10) {
      var value = await this.props.existance.findIndex((item) => item.ID === parseInt(array[array.length - 2]));
      console.log('value = ', value);
      await store.dispatch({ type: 'SET_PARENT_OPTION', payload: this.props.existance[value] });
      var childObject = await this.props.existance[value].children.find((item) => item.ID === parseInt(array[array.length - 1]));
      console.log('childObject = ', childObject);
      await store.dispatch({ type: 'SET_CHILD_OPTION', payload: childObject });
      this.props.setIds(array[array.length - 2], array[array.length - 1], 0, 0)
    }
  }

  render() {
    return (
      <div className="app">
        <AppHeader fixed>
          <Suspense fallback={this.loading()}>
            <DefaultHeader onLogout={e => this.signOut(e)} />
          </Suspense>
        </AppHeader>
        <div className="app-body">
          <AppSidebar fixed display="lg">
            <AppSidebarHeader />
            <AppSidebarForm />
            {(localStorage.getItem("RoleName") == UserRoles.Admin) && (
              <Suspense>
                <AppSidebarNav navConfig={navigation1} {...this.props} router={router} />
              </Suspense>
            )}
            {(localStorage.getItem("RoleName") == UserRoles.Doctor) && (this.props.existance.length > 0) && (
              <Suspense>
                <AppSidebarNav onClick={(e) => this.itemClick(e)}
                  navConfig={{ items: [...this.props.existance] }} {...this.props} router={router} />
              </Suspense>
            )}
            <AppSidebarFooter />
            <AppSidebarMinimizer />
          </AppSidebar>
          <main className="main">
            {/* <AppBreadcrumb appRoutes={routes} router={router} /> */}
            <Container fluid>
              <SnackbarProvider maxSnack={3}>
                <Switch>
                  {routes.map((route, idx) => {
                    return route.component ? (
                      <Route
                        key={idx}
                        path={route.path}
                        exact={route.exact}
                        name={route.name}
                        render={props => (
                          <route.component {...props} />
                        )} />
                    ) : (null);
                  })}
                  <Redirect from="/" to="/login" />
                </Switch>
              </SnackbarProvider>
            </Container>
          </main>
          <AppAside fixed>
            <Suspense fallback={this.loading()}>
              <DefaultAside />
            </Suspense>
          </AppAside>
        </div>
        {/* <AppFooter>
          <Suspense fallback={this.loading()}>
            <DefaultFooter />
          </Suspense>
        </AppFooter> */}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  existance: state.patient.existance,

});
const mapDispatchToProps = {
  setIds,
}

export default connect(mapStateToProps, mapDispatchToProps)(DefaultLayout);
