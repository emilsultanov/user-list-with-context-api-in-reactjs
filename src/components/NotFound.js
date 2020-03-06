import React from 'react';
import { Container, Jumbotron } from 'react-bootstrap';

function NotFound() {
   return (
      <div className='text-center'>
         <Container>
            <Jumbotron fluid>
               <Container>
                  <h1>404 Error</h1>
                  <p>
                     This page is not found.
                  </p>
               </Container>
            </Jumbotron>
         </Container>
      </div>
   )
}
export default NotFound;