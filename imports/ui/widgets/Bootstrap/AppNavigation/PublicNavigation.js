import React from 'react';
import { IndexLinkContainer, LinkContainer } from 'react-router-bootstrap';
import { Nav, NavItem } from 'react-bootstrap';

import { MenuNavItem } from './MenuNavItem';

export const PublicNavigation = ({menus}) => (
    <div>
      <Nav>
        <IndexLinkContainer to="/">
          <NavItem eventKey="home" href="/">Home</NavItem>
        </IndexLinkContainer>
        { menus.map((menu) => 
          <MenuNavItem key={ menu.path } menu={ menu } /> 
        )}
      </Nav>
      <Nav pullRight>
        <LinkContainer to="/signup">
          <NavItem eventKey={ 1 } href="/signup">Sign Up</NavItem>
        </LinkContainer>
        <LinkContainer to="/login">
          <NavItem eventKey={ 2 } href="/login">Log In</NavItem>
        </LinkContainer>
      </Nav>
    </div>
  );