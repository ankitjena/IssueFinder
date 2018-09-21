import React, {Component} from 'react';
import axios from 'axios';

class Feed extends Component {
  constructor(props) {
    super(props)
    this.state = {
      upvotes : '',
      downvotes : '',
      comments : []
    }
  }

  componentDidMount() {
    console.log(this.props.problem)
    this.setState ({
      upvotes : this.props.problem.upvotes,
      downvotes : this.props.problem.downvotes,
      comments : this.props.problem.comments
    })
  }

  render() {
    return(
      <div>
      <p> {this.props.problem.subject} </p>
      </div>
    )
  }
}

export default Feed;
