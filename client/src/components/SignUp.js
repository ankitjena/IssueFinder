import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import axios from 'axios'
import { Button, Form, Select, TextArea } from 'semantic-ui-react';
import Layout from './Layout';

class Signup extends Component {
	constructor() {
		super()
		this.state = {
			username: '',
			password: '',
			confirmPassword: '',

		}
		this.handleSubmit = this.handleSubmit.bind(this)
		this.handleChange = this.handleChange.bind(this)
	}
	handleChange(event) {
		this.setState({
			[event.target.name]: event.target.value
		})
	}
	handleSubmit(event) {
		console.log('sign-up handleSubmit, username: ')
		console.log(this.state.username)
		event.preventDefault()

		//request to server to add a new username/password
		axios.post('http://localhost:8000/user/signup', {
			username: this.state.username,
			password: this.state.password
		})
			.then(response => {
				console.log(response)
				if (!response.data.errmsg) {
					console.log('successful signup')
					this.setState({ //redirect to login page
						redirectTo: '/login'
					})
				} else {
					console.log('username already taken')
				}
			}).catch(error => {
				console.log('signup error: ')
				console.log(error)

			})
	}

render() {
	if (this.state.redirectTo) {
		return <Redirect to = {{ pathname: this.state.redirectTo }} />
	}
	else {
  return (
    <Layout>
      <h1> SignUp </h1>
      <Form id="loginform" onSubmit={this.handleSubmit}>
        <Form.Field>
          <label>UserName</label>
          <input name="username" placeholder="username" value = {this.state.username} onChange={this.handleChange}/>
        </Form.Field>
        <Form.Field>
          <label>Password</label>
          <input name="password" type="password" placeholder="password" value={this.state.password} onChange={this.handleChange}/>
        </Form.Field>
        <Form.Field>
          <label>Confirm Password</label>
          <input name="password" type="password" placeholder="confirm password" value={this.state.password} onChange={this.handleChange}/>
        </Form.Field>

        <Button type='submit'>SignUp</Button>
      </Form>
    </Layout>
  )
}
}

}

export default Signup
