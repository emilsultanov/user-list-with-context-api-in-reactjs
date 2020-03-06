import React, { Component } from 'react';
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import UserConsumer from '../context';
import axios from 'axios';
import { Link } from 'react-router-dom';

class User extends Component {

   state = {
      isVisible: true,
   };

   remove = async (dispatch, event) => {
      const { id } = this.props;
      await axios.delete(`http://localhost:3000/users/${id}`);
      dispatch({ type: 'DELETE_USER', payload: id });
   }

   toggleVisible = () => {
      this.setState({
         isVisible: !this.state.isVisible
      });
   }

   render() {
      const { id, user } = this.props;
      return (
         <UserConsumer>
            {
               (value) => {
                  const { dispatch } = value;
                  return (
                     <Col xs={12} md={6} lg={4} className='my-2'>
                        <Card bg="dark" text="white" >
                           <Card.Header onClick={this.toggleVisible}>
                              <h5>{user.name}</h5>
                           </Card.Header>
                           <Card.Body style={this.state.isVisible ? { display: 'block' } : { display: 'none' }}>
                              <Card.Title>salary: {user.salary}</Card.Title>
                              <Card.Text>department: {user.department}</Card.Text>
                           </Card.Body>
                           <Card.Footer className='d-flex justify-content-between' >
                              <Link to={`edit/${id}`} className='btn btn-warning'>UpdateUser</Link>
                              <Button
                                 variant="danger" onClick={(e) => this.remove(dispatch)} >Delete</Button>
                           </Card.Footer>
                        </Card>
                     </Col >
                  );
               }
            }
         </UserConsumer>
      );
   }
}
export default User;
