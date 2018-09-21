import React, {Component} from 'react';
import ReactDOM from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Menu } from 'semantic-ui-react'
import Feed from './Feed';
import Layout from './Layout';
import NavBar from './NavBar';

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
    }).then(problems => {
      this.setState({problems : problems.data});
      console.log(this.state.problems[0])
    })
    .catch(error => {
      console.log(error);
    })
  }

  render() {
    return(
      <Layout>
        <NavBar curr="feed" />
        <p>Feed</p>
        {this.state.problems.map(problem => (
          <Feed problem={problem} key={problem._id}/>
        ))}
      </Layout>
    )
  }
}

export default Home;
