import React from 'react';
import { Header } from 'semantic-ui-react';

import Layout from './Layout';
import NavBar from './NavBar';
import First from './First';

const DynamicPage = (loggedIn) => {
  if (loggedIn == true){
  return (
    <Layout>
      <Header as="h2">Dynamic Page</Header>
      <p>This page was loaded asynchronously!!!</p>
    </Layout>
  );
}
else {
  return ( <First />);
}
};

export default DynamicPage;
