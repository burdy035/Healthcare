import React from "react";
import ReactDOM from "react-dom";
import { ConnectedRouter } from "react-router-redux";
import { Provider } from "react-redux";

import Moment from "moment";
import momentLocalizer from "react-widgets-moment";

import { library } from "@fortawesome/fontawesome-svg-core";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStroopwafel } from "@fortawesome/free-solid-svg-icons";

import store, { history } from "./store/configureStore";

import "font-awesome/css/font-awesome.min.css";
import "react-widgets/dist/css/react-widgets.css";

import "react-datepicker/dist/react-datepicker.css";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/css/bootstrap-theme.min.css";

import "./styles/styles.css";

import App from "./App";
import registerServiceWorker from "./registerServiceWorker";

Moment.locale("en");
momentLocalizer();

library.add(faStroopwafel);

ReactDOM.render(
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <App />
        </ConnectedRouter>
    </Provider>,
    document.getElementById("root")
);
registerServiceWorker();
