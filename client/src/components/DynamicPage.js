import React, {Component} from 'react';
import { Header, Button } from 'semantic-ui-react';
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

  componentDidMount() {
    axios.get('http://localhost:8000/user', {
      headers : {
        'Content-Type' : 'application/json'
      }
    }).then(user => {
      this.setState({
        file_name : ((user.data)[0]).filename,
        bio: ((user.data)[0]).bio
      });
      console.log(((user.data)[0]).filename);
    })
    .catch(error => {
      console.log(error);
      console.log("user not there");
    })
  }

  render() {
    if (this.props.loggedIn == true){

      return (
        <div>
        <Layout>
          <NavBar curr="profile" />
          <img src={`http://localhost:8000/user/image/${this.state.file_name}`} size="small" rounded />
          <Header as="h2">Dynamic Page</Header>
          <Header as="h1">Welcome!!! </Header>
          <Header as="h1">{this.props.username}</Header>
          <Header as="h4">{this.state.bio}</Header>
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
