import React, { Component } from "react";
import { BrowserRouter } from "react-router-dom";
import { Route, Switch } from "react-router-dom";

import { connect } from "react-redux";

import Error from "./containers/Error";
import Login from "./containers/Login";
// import Dashboard from "./containers/DashBoard";
import Patients from "./containers/Patients";
import PatientTracking from "./containers/PatientTracking";
import Devices from "./containers/Devices";
// import DeviceTypes from "./containers/DeviceTypes";
import Settings from "./containers/Settings";
import Rooms from "./containers/Rooms";
import Documents from "./containers/PatientDocuments";
import Users from "./containers/Users";
import UserDetail from "./containers/UserDetail";
import Home from "./containers/Home";
import Duty from "./containers/Duty";
import PatientReport from "./containers/PatientReport";
import Logout from "./containers/Logout";
import Warning from "./containers/Warning";
import Cont from "./containers/Cont";
import Auth from "./services/auth";

import { checkUserAuthentication } from "./actions";

const auth = new Auth();

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    componentDidMount() {
        this.props.dispatch(checkUserAuthentication());
    }

    render() {
        return (
            <BrowserRouter>
                <div
                    className="main"
                    style={{ width: "100%", height: "100vh" }}
                >
                    <Switch>
                        <Route
                            path="/login"
                            component={props => (
                                <Login auth={auth} {...props} />
                            )}
                        />
                        <Route
                            path="/logout"
                            component={props => (
                                <Logout auth={auth} {...props} />
                            )}
                        />
                        <Cont>
                            <Warning />
                            <Route
                                component={({ match }) => (
                                    <div>
                                        <Route
                                            path="/"
                                            component={props => (
                                                <Home auth={auth} {...props} />
                                            )}
                                            exact
                                        />

                                        <Route
                                            path="/home"
                                            component={props => (
                                                <Home auth={auth} {...props} />
                                            )}
                                        />
                                        <Route
                                            path="/add-duty"
                                            component={props => (
                                                <Duty auth={auth} {...props} />
                                            )}
                                        />
                                        <Route
                                            path="/users"
                                            component={props => (
                                                <Users auth={auth} {...props} />
                                            )}
                                        />
                                        <Route
                                            path="/user/:name"
                                            component={props => (
                                                <UserDetail
                                                    auth={auth}
                                                    {...props}
                                                />
                                            )}
                                        />
                                        <Route
                                            path="/patients"
                                            component={props => (
                                                <Patients
                                                    auth={auth}
                                                    {...props}
                                                />
                                            )}
                                        />

                                        <Route
                                            path="/patient-report/:name"
                                            component={props => (
                                                <PatientReport
                                                    auth={auth}
                                                    {...props}
                                                />
                                            )}
                                        />

                                        <Route
                                            path="/devices"
                                            component={props => (
                                                <Devices
                                                    auth={auth}
                                                    {...props}
                                                />
                                            )}
                                        />

                                        <Route
                                            path="/settings"
                                            component={props => (
                                                <Settings
                                                    auth={auth}
                                                    {...props}
                                                />
                                            )}
                                        />
                                        <Route
                                            path="/rooms"
                                            component={props => (
                                                <Rooms auth={auth} {...props} />
                                            )}
                                        />
                                        <Route
                                            path="/documents"
                                            component={props => (
                                                <Documents
                                                    auth={auth}
                                                    {...props}
                                                />
                                            )}
                                        />
                                        <Route
                                            path="/patient-tracking/:name"
                                            component={props => (
                                                <PatientTracking
                                                    auth={auth}
                                                    {...props}
                                                />
                                            )}
                                        />
                                        {/* <Route path="**" component={Error} /> */}
                                    </div>
                                )}
                            />
                        </Cont>
                    </Switch>
                </div>
            </BrowserRouter>
        );
    }
}

const mapStateToProps = ({ auth }) => {
    return {
        user: auth.user,
        loginSuccess: auth.loginSuccess
    };
};

export default connect(mapStateToProps)(App);
