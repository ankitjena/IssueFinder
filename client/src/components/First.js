import React from 'react';
import { Link } from 'react-router-dom';
import { Header, Container, Divider } from 'semantic-ui-react';



import { pullRight, h1 } from './layout.css';

const First = ({ children }) => {
  return (
    <Container>
      <Link to="/login">
        <Header as="h1" className={h1}>
          LogIn!
        </Header>
      </Link>
      <Link to="/signup">
        <Header as="h1" className={h1}>
          SignUp!
        </Header>
      </Link>
      {children}
      <Divider />
    </Container>
  );
};

export default First;
