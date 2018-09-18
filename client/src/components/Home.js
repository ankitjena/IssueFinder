import React from 'react';
import { Link } from 'react-router-dom';
import { Menu } from 'semantic-ui-react'

import Layout from './Layout';

const Home = () => {
  return (
    <Layout>
      <p>Hello World of React and Webpack!</p>
      <p>
        <Link to="/profile">Navigate to Dynamic Page</Link>
      </p>
      <p>
        <Link to="/submit">Login Page</Link>
      </p>
    </Layout>
  );
};

export default Home;
