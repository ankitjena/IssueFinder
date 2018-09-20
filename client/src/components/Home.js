import React, {Component} from 'react';
import ReactDOM from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Menu } from 'semantic-ui-react'

import Layout from './Layout';

class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      problems : []
    }
  }

  componentDidMount() {
    axios.get('http://localhost:8000/api/problems', {
      headers : {
        'Content-Type' : 'application/json'
      }
    }).then(res => {
      console.log(res);
      return res.json()
    })
  }

  render() {
    return(
      <Layout>
        <p>Feed</p>
      </Layout>
    )
  }
}

export default Home;
