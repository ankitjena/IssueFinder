import React, {Component} from 'react';
import axios from 'axios';

import { Header, Image, Divider, Label, Icon} from 'semantic-ui-react';

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
          <Icon name="thumbs up outline" size="large"/>
          <Icon name="thumbs down outline" size="large"/>
          <Icon name="comment outline" size="large"/>
          <Divider />
        </div>
    )
  }
}

export default Feed;
