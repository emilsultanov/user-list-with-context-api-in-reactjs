import React, { Component } from 'react';
import UserConsumer from '../context';
import { Form, Col, Container, Button, Card, Row, Breadcrumb } from 'react-bootstrap';
import axios from 'axios';

// var uniqid = require('uniqid');


class AddUser extends Component {

   state = {
      name: '',
      salary: '',
      department: '',
   }

   getNewUserData = (e) => {
      this.setState({
         [e.target.name]: e.target.value
      });
   }

   addUser = async (dispatch, event) => {
      event.preventDefault();

      const { name, salary, department } = this.state;

      if (name !== '' && salary !== '' && department !== '') {

         const newUser = {
            name: name,
            salary: salary,
            department: department,
         };

         this.setState({
            name: '',
            salary: '',
            department: '',
         });

         const response = await axios.post('http://localhost:3000/users', newUser);
         dispatch({ type: 'ADD_USER', payload: response.data });
         this.props.history.push('/');
      }
   }


   render() {
      const { name, salary, department } = this.state;
      return (
         <UserConsumer>
            {
               (value) => {
                  const { dispatch } = value;
                  return (
                     <div className='my-3'>
                        <Container>
                           <Row>
                              <Col>
                                 <Breadcrumb>
                                    <Breadcrumb.Item href="#">Home</Breadcrumb.Item>
                                    <Breadcrumb.Item href="https://getbootstrap.com/docs/4.0/components/breadcrumb/">
                                       Library
                                    </Breadcrumb.Item>
                                    <Breadcrumb.Item active>Data</Breadcrumb.Item>
                                 </Breadcrumb>
                              </Col>
                           </Row>
                           <Row>
                              <Col>
                                 <Card bg="dark" text="white" className='h-100'>
                                    <Card.Header onClick={this.toggleVisible}>
                                       <h5>name: {name}</h5>
                                    </Card.Header>
                                    <Card.Body>
                                       <Card.Title>salary: {salary}</Card.Title>
                                       <Card.Text>department: {department}</Card.Text>
                                    </Card.Body>
                                 </Card>
                              </Col>
                              <Col>
                                 <Form onSubmit={(e) => this.addUser(dispatch, e)}>
                                    <Form.Row>
                                       <Col xl={12} className='mb-3'>
                                          <Form.Control
                                             placeholder="Name"
                                             name='name'
                                             value={name}
                                             onChange={this.getNewUserData}
                                          />
                                       </Col>
                                       <Col xl={12} className='mb-3'>
                                          <Form.Control
                                             placeholder="Salary"
                                             name='salary'
                                             value={salary}
                                             onChange={this.getNewUserData}
                                          />
                                       </Col>
                                       <Col xl={12} className='mb-3'>
                                          <Form.Control
                                             placeholder="Department"
                                             name='department'
                                             value={department}
                                             onChange={this.getNewUserData}
                                          />
                                       </Col>
                                       <Col xl={12} >
                                          <Button variant="success" type="submit" className='w-100'>
                                             Add
                                    </Button>
                                       </Col>
                                    </Form.Row>
                                 </Form>
                              </Col>
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

export default AddUser;