import React from 'react';
import { browserHistory } from 'react-router';
import { IndexLinkContainer, LinkContainer } from 'react-router-bootstrap';
import { Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
import { Meteor } from 'meteor/meteor';

const handleLogout = () => Meteor.logout(() => browserHistory.push('/login'));

const userName = () => {
  return Meteor.user() && Meteor.user().profile ? Meteor.user().profile.fullname : '';
};

export const AuthenticatedNavigation = () => (
  <div>
    <Nav>
      <IndexLinkContainer to="/">
        <NavItem eventKey={ 1 } href="/">Index</NavItem>
      </IndexLinkContainer>
      <LinkContainer to="/documents">
        <NavItem eventKey={ 2 } href="/documents">Documents</NavItem>
      </LinkContainer>
      <LinkContainer to="/page/halamanCoba/123/sikat">
        <NavItem eventKey={ 3 } href="/page/halamanCoba/123/sikat">page dynamic</NavItem>
      </LinkContainer>
      <LinkContainer to="/faq">
        <NavItem eventKey={ 4 } href="/faq">faq</NavItem>
      </LinkContainer>
      <LinkContainer to="/welcome">
        <NavItem eventKey={ 5 } href="/welcome">Welcome</NavItem>
      </LinkContainer>
    </Nav>
    <Nav pullRight>
      <NavDropdown eventKey={ 3 } title={ userName() } id="basic-nav-dropdown">
        <MenuItem eventKey={ 3.1 } onClick={ handleLogout }>Logout</MenuItem>
      </NavDropdown>
    </Nav>
  </div>
);
