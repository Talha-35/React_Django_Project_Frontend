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


const AppRouter = () => {
    return (
      <Router>
        <Navbar />
        <Switch>
          <Route path="/" component={HomePage} exact />
          <Route path="/:slug/detail" component={DetailPage} />
          <Route path="/register" component={RegisterPage} />
          <Route path="/login" component={LoginPage} />
          <Route path="/profile" component={ProfilePage} />
          <Route path="/post" component={PostPage} />
          <Route path="/update" component={UpdatePage} />
        </Switch>
        {/* <FootBar /> */}
      </Router>
    );
  };
  
  export default AppRouter;