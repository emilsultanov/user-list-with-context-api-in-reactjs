import React, { Component } from 'react';
import User from './User';
import { Container, Row, Jumbotron, Col } from 'react-bootstrap';

import UserConsumer from '../context'


class Users extends Component {

   render() {
      return (
         <UserConsumer>
            {
               (value) => {

                  const { users, searchedUser } = value;
                  let allUsers = users.filter((user) => {
                     return user.name.toLowerCase().replace(/\s/g, '').search(searchedUser) > -1
                  });

                  return (
                     <div className='users'>
                        <Container>
                           <Row>
                              <Col>
                                 <Jumbotron className='rounded text-center bg-dark text-white' fluid style={allUsers.length === 0 ? { display: 'block' } : { display: 'none' }}>
                                    <Container>
                                       <h1>Not Found</h1>
                                       <p>
                                          User not found for "{searchedUser}".
                                       </p>
                                    </Container>
                                 </Jumbotron>
                              </Col>
                           </Row>
                           <Row>
                              {
                                 allUsers.map((user) => {
                                    return (
                                       <User
                                          key={user.id}
                                          user={user}
                                          id={user.id}
                                          removeUser={this.props.removeUser}
                                       />
                                    );
                                 })
                              }
                           </Row>
                        </Container>
                     </div>
                  );
               }
            }
         </UserConsumer>
      );
   }
}
export default Users;