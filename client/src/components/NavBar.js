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
        <Link to="/"><Menu.Item name='feed' active={activeItem === 'feed'} onClick={this.handleItemClick}>Feed</Menu.Item></Link>
        <Link to="/profile"><Menu.Item name='profile' active={activeItem === 'profile'} onClick={this.handleItemClick}>Profile</Menu.Item></Link>
        <Link to="/submit"><Menu.Item name='submit' active={activeItem === 'submit'} onClick={this.handleItemClick}>Submit</Menu.Item></Link>
      </Menu>
    )
  }
}
