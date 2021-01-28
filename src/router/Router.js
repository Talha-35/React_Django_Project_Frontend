import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import React from "react";

import Navbar from '../components/Navbar';
import DetailPage from '../pages/DetailPage';
import HomePage from '../pages/HomePage';
import RegisterPage from '../pages/RegisterPage';
import ProfilePage from '../pages/ProfilePage';
import LoginPage from '../pages/LoginPage';
import PostPage from '../pages/PostPage';
import UpdatePage from '../pages/UpdatePage';

import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";


function AppRouter(params) {
  const {isLoggedIn, currentUser} = useContext(AuthContext);
  console.log(isLoggedIn)
  console.log(currentUser ? 'var':'yok')
  console.log(localStorage.getItem("Token"))
  return (
      <Router>
          <Navbar/>
          <Switch>
          <Route exact path="/" component={HomePage} />
                {
                    !localStorage.getItem("Token")
                    
                    ?
                    <>
                        <Route exact path="/register" component={RegisterPage} />
                        <Route exact path="/login" component={LoginPage} />
                    </>
                    :
                    <> 
          <Route exact path="/:slug/detail" component={localStorage.getItem("Token") ? DetailPage: LoginPage} />
          <Route exact path="/profile" component={localStorage.getItem("Token") ? ProfilePage: LoginPage} />
          <Route exact path="/post" component={localStorage.getItem("Token") ? PostPage: LoginPage} />
          <Route exact path="/update" component={localStorage.getItem("Token") ? UpdatePage:LoginPage} />
          </>
                }
        </Switch>
        {/* <FootBar /> */}
      </Router>
    );
  };
  
  export default AppRouter;

  

                      