import React, { Component } from 'react'
import { Menu } from 'semantic-ui-react'
import { Redirect } from 'react-router-dom'
import { Route, Link } from 'react-router-dom'
import axios from 'axios'

// const NavBar = ({curr}) => {
//   return (
//       <Menu tabular>
//         <Link to="/"><Menu.Item name='feed' active={curr === 'feed'}>Feed</Menu.Item></Link>
//         <Link to="/profile"><Menu.Item name='profile' active={curr === 'profile'}>Profile</Menu.Item></Link>
//         <Link to="/submit"><Menu.Item name='submit' active={curr === 'submit'}>Submit</Menu.Item></Link>
//       </Menu>
//   );
// };

class NavBar extends Component {
  constructor(props){
    super(props)
    this.state = {
      activeItem : "feed"
    }
    this.logout = this.logout.bind(this)
  }

  componentDidMount() {
    this.setState( {activeItem : this.props.active});
  }

  logout(event) {
    event.preventDefault()
    console.log('logging out')
    axios.post('http://localhost:8000/user/logout').then(response => {
      console.log(response.data)
      if (response.status === 200) {
        this.props.updateUser({
          loggedIn: false,
          username: null
        })
      }
    }).catch(error => {
        console.log('Logout error')
    })
  }

  render() {
    const loggedIn = this.props.loggedIn;
    if(loggedIn) {
      return(
        <Menu tabular>
          <Link to="/home"><Menu.Item name='feed' active={this.state.activeItem === 'feed'}>Feed</Menu.Item></Link>
          <Link to="/profile"><Menu.Item name='profile' active={this.state.activeItem === 'profile'}>Profile</Menu.Item></Link>
          <Link to="/submit"><Menu.Item name='submit' active={this.state.activeItem === 'submit'}>Submit</Menu.Item></Link>
          <Link to="#" onClick = {this.logout} ><Menu.Item name='logout' active={this.state.activeItem === 'submit'}>Logout</Menu.Item></Link>
        </Menu>
      )
    }
    else {
    return(
      <div>
      <h1> Issue Finder </h1>
      </div>
    );
  }
}
}

export default NavBar;
