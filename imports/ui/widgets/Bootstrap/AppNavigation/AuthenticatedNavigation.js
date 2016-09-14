import React from 'react';
import { browserHistory } from 'react-router';
import { IndexLinkContainer, LinkContainer } from 'react-router-bootstrap';
import { Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
import { Meteor } from 'meteor/meteor';

import { toggleNav, handleLogout } from '/imports/modules/utils';

import { MenuNavItem } from './MenuNavItem';

const userName = () => {
  return Meteor.user() && Meteor.user().profile ? Meteor.user().profile.fullname : '';
};

export const AuthenticatedNavigation = ({ menus }) => (
  <div>
    <Nav onClick={ toggleNav }>
      { menus.map((menu) => 
        <MenuNavItem key={ menu.path } menu={ menu } /> 
      )}
    </Nav>
    <Nav pullRight>
      <NavDropdown eventKey={ 3 } title={ userName() } id="basic-nav-dropdown">
        <MenuItem eventKey={ 3.1 } onClick={ handleLogout }>Logout</MenuItem>
      </NavDropdown>
    </Nav>
  </div>
);
