import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

import Navbar from '../components/Navbar';
import DetailPage from '../pages/DetailPage';
import HomePage from '../pages/HomePage';
import RegisterPage from '../pages/RegisterPage';
import ProfilePage from '../pages/ProfilePage';
import LoginPage from '../pages/LoginPage';

const AppRouter = () => {
    return (
      <Router>
        <Navbar />
        <Switch>
          <Route path="/" component={HomePage} exact />
          <Route path="/detail" component={DetailPage} />
          <Route path="/register" component={RegisterPage} />
          <Route path="/login" component={LoginPage} />
          <Route path="/profile" component={ProfilePage} />
        </Switch>
        {/* <FootBar /> */}
      </Router>
    );
  };
  
  export default AppRouter;