import React, {Component} from 'react';
import { Button, Form, Select, TextArea } from 'semantic-ui-react';

import Layout from './Layout';

class Submit extends Component {
  constructor(props) {
    super(props)
    this.state = {
      category: '',
      subject: '',
      description: '',
      filename: '',
      image: '',
      file: null
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSelect = this.handleSelect.bind(this)
    this.handleFileChange = this.handleFileChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSelect(event, value) {
    this.setState({
      category: value.value
    })
  }

  handleChange(event) {
    console.log(event.target);
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleFileChange(event) {
    console.log(event.target.files[0].name);
    this.setState({
      file: URL.createObjectURL(event.target.files[0]),
      filename: event.target.files[0].name,
      image: event.target.files[0]
    })
  }

  handleSubmit(event) {
    console.log(this.state);
    let formData = new FormData();
    Object.assign(formData, {
      category: this.state.category,
      subject: this.state.subject,
      description: this.state.subject,
      filename: this.state.filename,
      file: this.state.image
    });
    console.log(formData);
  }

  render() {
    const options = [{key: 'hc', value: 'Healthcare', text:'Healthcare'},
                      {key: 'rs', value: 'Road Safety', text:'Road Safety'},
                    {key: 'el', value: 'Electricity', text:'Electricity'}]
    return (
      <Layout>
        <Form onSubmit={this.handleSubmit}>
          <Form.Field>
            <label>Image:</label>
            <input type="file" onChange={this.handleFileChange}/>
            <img src={this.state.file} height="500" width="500"/>
          </Form.Field>
          <Form.Field inline>
            <label>Category</label>
            <Select name="category" placeholder="Select the category" options={options} onChange={this.handleSelect}/>
          </Form.Field>
          <Form.Field>
            <label>Subject</label>
            <input name="subject" placeholder="subject" onChange={this.handleChange}/>
          </Form.Field>
          <Form.Field>
            <label>Description</label>
            <TextArea name="description" placeholder="Tell us more" onChange={this.handleChange}/>
          </Form.Field>

          <Button type='submit'>Submit</Button>
        </Form>
      </Layout>
    )
  }
}

export default Submit;
