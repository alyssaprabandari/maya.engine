import React from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { NavItem } from 'react-bootstrap';

export const MenuNavItem = ({ menu }) => (
  <LinkContainer key={ menu.path } to={ menu.path }>
    <NavItem eventKey={ menu.menuNr } href={ menu.path }>{ menu.title }</NavItem>
  </LinkContainer>
);
