import React, {Component} from 'react';
import axios from 'axios';

class Feed extends Component {
  constructor(props) {
    super(props)
    this.state = {
      category: '',
      subject: '',
      description: '',
      author : '',
      upvotes : '',
      downvotes : '',
      comments : [],
      filename : ''
      // image: '',
      // file: null
    }
  }

  componentDidMount() {
    console.log(this.props.problem)
    this.setState ({
      category : this.props.problem.category,
      subject : this.props.problem.subject,
      description : this.props.problem.description,
      author : this.props.problem.author,
      upvotes : this.props.problem.upvotes,
      downvotes : this.props.problem.downvotes,
      comments : this.props.problem.comments,
      filename : this.props.problem.filename
      // image : this
      // file :
    })

    axios.get('http://localhost:8000/api/image/:{this.state.filename}', {})


  }

  render() {
    return(
      <div>
      <p> hello </p>
      </div>
    )
  }
}

export default Feed;
