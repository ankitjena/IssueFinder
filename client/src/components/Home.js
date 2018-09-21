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
      Problems : []
    }
    this.showFeed = this.showFeed.bind(this)
  }

  componentDidMount() {
    axios.get('http://localhost:8000/api/problems', {
      headers : {
        'Content-Type' : 'application/json'
      }
    }).then(res => {
      // console.log(res);
      return res;
    }).then(Problems => {
      // console.log(this.state)
      // console.log(problems);
      this.setState({Problems : Problems.data});
      // console.log(this.state)
    })
    .catch(error => {
      console.log(error);
    })
  }

  showFeed(problem) {
    console.log("hihi");
    // console.log(problem);
    <Feed problem={problem} />
  }

  render() {
    return(
      <Layout>
        <NavBar curr="feed" />
        <p>Feed</p>
        <div>
        {this.state.Problems.map(problem=> {
          // console.log(problem)
           {this.showFeed(problem)}
        }
      )}
        </div>
      </Layout>
    )
  }
}

export default Home;
