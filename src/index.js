/*!

=========================================================
* Light Bootstrap Dashboard React - v1.3.0
=========================================================

* Product Page: https://www.creative-tim.com/product/light-bootstrap-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/light-bootstrap-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
import ReactDOM from "react-dom";

import { Router, BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/css/animate.min.css";
import "./assets/sass/light-bootstrap-dashboard-react.scss?v=1.3.0";
import "./assets/css/demo.css";
import "./assets/css/pe-icon-7-stroke.css";

import AdminLayout from "layouts/Admin.jsx";
import SignInSide from "layouts/SignInSide.jsx";
import SignUpSide from "layouts/SignUpSide.jsx";
import AdminNavbarLinks from "components/Navbars/AdminNavbarLinks";
import { Provider } from "react-redux";
import { LandingPage } from "layouts/NewLogin";
//import store from "./store";
import {ProtectedRoute} from "protected.route";



ReactDOM.render(

  

 
  <BrowserRouter>
    
   
      {/* <Route path="/login"> <SignInSide/> </Route> */}
      
      <Switch>
        <Route exact path="/" render={props => <SignInSide {...props} />}/> 
        <Route exact path="/signup" render={props => <SignUpSide {...props} />}/> 
        {/* <Route exact path="/hap"  render={props => <AdminNavbarLinks {...props} />}/> */}
        {/* <Route exact path="/"> <SignInSide/> </Route> */}
        <Route path="/admin/dashboard" render={props => <AdminLayout {...props} />} />
        {/* <ProtectedRoute path="/admin/dashboard" render={props => <AdminLayout/>} /> */}
        {/* <Redirect from="/" to="/login" /> */}
        {/* <Redirect from="/" to="/admin/dashboard" /> */}
      {/* <Route path="*" component={() => "404 Not found"}/> */}
      </Switch>
    </BrowserRouter>,
  document.getElementById("root")
);
