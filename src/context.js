import React, { Component } from 'react';
import axios from 'axios';

const UserContext = React.createContext();
// Provider, Consumer


const reducer = (state, action) => {

   if (action.type === 'DELETE_USER') {
      return {
         ...state,
         users: state.users.filter((user) => { return action.payload !== user.id })
      }
   }

   else if (action.type === 'ADD_USER') {
      return {
         ...state,
         users: [...state.users, action.payload]
      }
   }

   else if (action.type === 'UPDATE_USER') {
      return {
         ...state,
         users: state.users.map((user) => { return user.id === action.payload.id ? action.payload : user })
      }
   }

   else if (action.type === 'FIND_USER') {
      const searchedUser = action.payload;
      return {
         ...state,
         searchedUser: searchedUser
      }
   }

}




export class UserProvider extends Component {

   state = {
      users: [],
      searchedUser: '',

      dispatch: (action) => {
         this.setState((state) => { return reducer(state, action) });
      }
   }

   componentDidMount = async () => {
      const response = await axios.get('http://localhost:3000/users');
      this.setState({ users: response.data });
   }

   render() {
      return (
         <UserContext.Provider value={this.state}>
            {this.props.children}
         </UserContext.Provider>
      );
   }
}

const UserConsumer = UserContext.Consumer;
export default UserConsumer;