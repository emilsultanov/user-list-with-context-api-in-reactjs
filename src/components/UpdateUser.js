import React, { Component } from 'react';
import UserConsumer from '../context';
import { Form, Col, Container, Button, Card, Row, Breadcrumb } from 'react-bootstrap';
import axios from 'axios';



class UpdateUser extends Component {


   state = {
      userPrevData: {
         prevName: '',
         prevSalary: '',
         prevDepartment: '',
      },

      userNewData: {
         newName: '',
         newSalary: '',
         newDepartment: '',
      },

   }


   componentDidMount = async () => {

      const { id } = this.props.match.params;
      const response = await axios.get(`http://localhost:3000/users/${id}`);
      const { name, salary, department } = response.data;

      this.setState({
         userPrevData: {
            prevName: name,
            prevSalary: salary,
            prevDepartment: department
         }
      });
   }


   // Update Selected User's Data
   changeUserData = (e) => {
      const { userNewData } = { ...this.state };
      userNewData[e.target.name] = e.target.value;
      this.setState({
         userNewData: userNewData
      });
   }




   updateUser = async (dispatch, event) => {
      event.preventDefault();

      const { id } = this.props.match.params;
      const { newName, newSalary, newDepartment } = this.state.userNewData;


      if (newName !== '' && newSalary !== '' && newDepartment !== '') {

         const newUser = {
            name: newName,
            salary: newSalary,
            department: newDepartment,
         };

         this.setState({
            userNewData: {
               newName: '',
               newSalary: '',
               newDepartment: '',
            },

            userPrevData: {
               prevName: '',
               prevSalary: '',
               prevDepartment: '',
            }
         });


         const response = await axios.put(`http://localhost:3000/users/${id}`, newUser);
         dispatch({ type: 'UPDATE_USER', payload: response.data });
         this.props.history.push('/');
      }
   }




   render() {
      const { prevName, prevSalary, prevDepartment } = this.state.userPrevData;
      const { newName, newSalary, newDepartment } = this.state.userNewData;

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
                                    <Card.Header>
                                       <h5>{prevName}</h5>
                                    </Card.Header>
                                    <Card.Body>
                                       <Card.Title>salary: {prevSalary}</Card.Title>
                                       <Card.Text>department: {prevDepartment} </Card.Text>
                                    </Card.Body>
                                 </Card>
                              </Col>
                              <Col>
                                 <Card bg="warning" text="dark" className='h-100'>
                                    <Card.Header>
                                       <h5>name: {newName}</h5>
                                    </Card.Header>
                                    <Card.Body>
                                       <Card.Title>salary: {newSalary}</Card.Title>
                                       <Card.Text>department: {newDepartment}</Card.Text>
                                    </Card.Body>
                                 </Card>
                              </Col>
                              <Col>
                                 <Form onSubmit={(e) => this.updateUser(dispatch, e)}>
                                    <Form.Row>
                                       <Col xl={12} className='mb-3'>
                                          <Form.Control
                                             placeholder="Name"
                                             name='newName'
                                             value={newName}
                                             onChange={this.changeUserData}
                                          />
                                       </Col>
                                       <Col xl={12} className='mb-3'>
                                          <Form.Control
                                             type='number'
                                             placeholder="Salary"
                                             name='newSalary'
                                             value={newSalary}
                                             onChange={this.changeUserData}
                                          />
                                       </Col>
                                       <Col xl={12} className='mb-3'>
                                          <Form.Control
                                             placeholder="Department"
                                             name='newDepartment'
                                             value={newDepartment}
                                             onChange={this.changeUserData}
                                          />
                                       </Col>
                                       <Col xl={12}>
                                          <Button variant="success" type="submit" className='w-100'>
                                             Update
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
export default UpdateUser;