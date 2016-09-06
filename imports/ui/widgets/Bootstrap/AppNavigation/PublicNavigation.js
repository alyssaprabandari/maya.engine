import React from 'react';
import { IndexLinkContainer, LinkContainer } from 'react-router-bootstrap';
import { Nav, NavItem } from 'react-bootstrap';

export const PublicNavigation = () => (
  <div>
    <Nav>
      <IndexLinkContainer to="/">
        <NavItem eventKey="home" href="/">Home</NavItem>
      </IndexLinkContainer>
      <LinkContainer to="/scholars">
        <NavItem eventKey="scholars" href="/scholars">Scholar List</NavItem>
      </LinkContainer>
      <LinkContainer to="/faq">
        <NavItem eventKey="faqs" href="/faq">FAQs</NavItem>
      </LinkContainer>
      <LinkContainer to="/about">
        <NavItem eventKey="about" href="/about">About Us</NavItem>
      </LinkContainer>
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
