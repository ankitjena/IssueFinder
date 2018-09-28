import React, {Component} from 'react';
import { Header, Button, Image } from 'semantic-ui-react';
import axios from 'axios';

import Layout from './Layout';
import NavBar from './NavBar';
import First from './First';

class DynamicPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      file_name: '',
      bio: ''
    }
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
        <div>
        <Layout>
          <NavBar curr="profile" />
          <Image src={`http://localhost:8000/user/image/${this.props.userdata.filename}`} size="medium" rounded />
          <Header as="h2">Dynamic Page</Header>
          <Header as="h1">Welcome!!! </Header>
          <Header as="h1">{this.props.userdata.username}</Header>
          <Header as="h4">{this.props.userdata.bio}</Header>
          <p>This page was loaded asynchronously!!!</p>
          <Button color="red" onClick={this.logout}>LogOut</Button>
        </Layout>
      </div>
      );
  }
else {
  return ( <First />);
}
}
};

export default DynamicPage;
