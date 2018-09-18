import React, { Component } from 'react'
import { Menu } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

export default class NavBar extends Component {
  state = { activeItem: 'feed' }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {
    const { activeItem } = this.state

    return (
      <Menu tabular>
        <Menu.Item name='feed' active={activeItem === 'feed'} onClick={this.handleItemClick}><Link to="/">Feed</Link></Menu.Item>
        <Menu.Item name='profile' active={activeItem === 'profile'} onClick={this.handleItemClick}><Link to="/profile">Profile</Link></Menu.Item>
        <Menu.Item name='submit' active={activeItem === 'submit'} onClick={this.handleItemClick}><Link to="/submit">Submit</Link></Menu.Item>
      </Menu>
    )
  }
}
