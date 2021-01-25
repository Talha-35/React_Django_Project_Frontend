import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

import DetailPage from '../pages/DetailPage';
import HomePage from '../pages/HomePage';
import Navbar from '../components/Navbar';

const AppRouter = () => {
    return (
      <Router>
        <Navbar />
        <Switch>
          <Route path="/home" component={HomePage} exact />
          <Route path="/detail" component={DetailPage} />
        </Switch>
        {/* <FootBar /> */}
      </Router>
    );
  };
  
  export default AppRouter;