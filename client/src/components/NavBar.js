import React from 'react'
import { Menu } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

const NavBar = ({curr}) => {
  return (
      <Menu tabular>
        <Link to="/"><Menu.Item name='feed' active={curr === 'feed'}>Feed</Menu.Item></Link>
        <Link to="/profile"><Menu.Item name='profile' active={curr === 'profile'}>Profile</Menu.Item></Link>
        <Link to="/submit"><Menu.Item name='submit' active={curr === 'submit'}>Submit</Menu.Item></Link>
      </Menu>
  );
};

export default NavBar;
