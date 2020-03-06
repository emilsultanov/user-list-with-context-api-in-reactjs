import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import UserConsumer from '../context';
import {
   Container,
   Navbar,
   Form,
   Nav,
   FormControl
} from 'react-bootstrap'



class Header extends Component {


   constructor(props) {
      super(props);
      this.state = {
         searchedUser: ''
      }
   }


   findUser = (dispatch, event) => {

      let searchedUser = event.target.value;
      this.setState({
         searchedUser: searchedUser,
      });



      dispatch({ type: 'FIND_USER', payload: searchedUser.toLowerCase().replace(/\s/g, '') });


   }


   render() {
      const { searchedUser } = this.state;


      return (
         <UserConsumer>
            {
               (value) => {
                  const { dispatch } = value;
                  return (
                     <div >
                        <Container className='my-3'>
                           <Navbar bg="dark" variant="dark" className='rounded'>
                              <Navbar.Brand>{this.props.name}</Navbar.Brand>
                              <Nav activeKey="/home" onSelect={selectedKey => alert(`selected ${selectedKey}`)}>
                                 <Nav.Item className='mr-2'>
                                    <Link to='/' className='nav-link'>Home</Link>
                                 </Nav.Item>
                                 <Nav.Item>
                                    <Link to='/addUser' className='nav-link'>Add user</Link>
                                 </Nav.Item>
                              </Nav>
                              <Form inline className="ml-auto">
                                 <FormControl
                                    type="text"
                                    placeholder="Search"
                                    className="mr-sm-2"
                                    value={searchedUser}
                                    onChange={(e) => this.findUser(dispatch, e)}
                                 />
                              </Form>
                           </Navbar>
                        </Container>
                     </div>
                  );
               }
            }
         </UserConsumer>
      );
   }
}

export default Header;