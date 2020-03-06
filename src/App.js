import React, { Component } from 'react';
import Users from './components/Users';
import Header from './components/Header';
import AddUser from './components/AddUser';
import NotFound from './components/NotFound';
import UpdateUser from './components/UpdateUser';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
   BrowserRouter as Router,
   Switch,
   Route,
} from "react-router-dom";



class App extends Component {
   render() {
      return (
         <Router>
            <div className='app'>
               <Header name='User App' />
               <Switch>
                  <Route exact path='/' component={Users} />
                  <Route exact path='/addUser' component={AddUser} />
                  <Route exact path='/edit/:id' component={UpdateUser} />
                  <Route component={NotFound} />
               </Switch>
            </div>
         </Router>
      );
   }
}
export default App;


