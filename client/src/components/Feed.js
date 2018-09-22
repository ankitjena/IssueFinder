import React, {Component} from 'react';
import axios from 'axios';

import { Header, Image, Divider, Label, Icon} from 'semantic-ui-react';

import CommentBox from './CommentBox';

class Feed extends Component {
  constructor(props) {
    super(props)
    this.state = {
      upvotes : '',
      downvotes : '',
      comments : [],
      display: false
    }
    this.showCommentBox = this.showCommentBox.bind(this);
    this.addDownVote = this.addDownVote.bind(this);
    this.addUpVote = this.addUpVote.bind(this);
  }

  showCommentBox() {
    this.setState({
      display: this.state.display==true?false:true
    })
    console.log(this.state);
  }

  addUpVote() {
    this.setState({
      upvotes: this.state.upvotes + 1
    })
    let url = 'http://localhost:8000/api/problems/upvote/' + this.props.problem._id;
    axios.post(url)
    .then(res => {
      console.log(res.data);
    })
    .catch(err => {
      console.log(err);
      this.setState({
        upvotes: this.state.upvotes - 1
      })
    })
  }

  addDownVote() {
    this.setState({
      downvotes: this.state.downvotes + 1
    })
    let url = 'http://localhost:8000/api/problems/downvote/' + this.props.problem._id;
    axios.post(url)
    .then(res => {
      console.log(res.data);
    })
    .catch(err => {
      console.log(err);
      this.setState({
        downvotes: this.state.downvotes - 1
      })
    })
  }

  componentDidMount() {
    this.setState ({
      upvotes : this.props.problem.upvotes,
      downvotes : this.props.problem.downvotes,
      comments : this.props.problem.comments
    })
  }

  render() {
    const src = "http://localhost:8000/api/image/" + this.props.problem.filename;
    return(
        <div>
          <Image src={src} size="large" rounded />
          <Header as='h5'>by {this.props.problem.author}</Header>
          <Label>
            <Icon name="setting"/>{this.props.problem.category}
          </Label>
          <br />
          <b>{this.props.problem.subject}</b>
          <p>{this.props.problem.description}</p>
          <Icon name="thumbs up outline" size="large" onClick={this.addUpVote}/>
          <Icon name="thumbs down outline" size="large" onClick={this.addDownVote}/>
          <Icon name="comment outline" size="large" onClick={this.showCommentBox}/>
          <Header as='h6'>{this.props.problem.timestamp}</Header>
          <p>{this.state.upvotes} upvotes {this.state.downvotes} downvotes</p>
          {this.state.display ? (<CommentBox id={this.props.problem._id} comments={this.props.problem.comments}/>):''}
          <Divider />
        </div>
    )
  }
}

export default Feed;
