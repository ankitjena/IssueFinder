import React, {Component} from 'react';
import { Header, Button } from 'semantic-ui-react';
import axios from 'axios';

import Layout from './Layout';
import NavBar from './NavBar';
import First from './First';

class DynamicPage extends Component {
  constructor(props) {
    super(props);
    this.logout = this.logout.bind(this);
  }
  logout(event) {
    event.preventDefault();
    localStorage.removeItem('jwtToken');
    axios.post('http://localhost:8000/user/logout').then(response => {
      console.log(response.data)
      if (response.status === 200) {
        this.props.updateUser({
          loggedIn: false,
          username: null
        })
      }
    }).catch(error => {
        console.log('Logout error')
    })
  }
  render() {
    if (this.props.loggedIn == true){
      return (
        <Layout>
          <NavBar curr="profile" />
          <Header as="h2">Dynamic Page</Header>
          <p>This page was loaded asynchronously!!!</p>
          <Button color="red" onClick={this.logout}>LogOut</Button>
        </Layout>
      );
  }
else {
  return ( <First />);
}
}
};

export default DynamicPage;
