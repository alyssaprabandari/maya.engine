import React from 'react';
import { Navbar } from 'react-bootstrap';
import { Link } from 'react-router';
import { PublicNavigation } from './PublicNavigation';
import { AuthenticatedNavigation } from './AuthenticatedNavigation';

import { toggleNav } from '/imports/modules/utils';

export class AppNavigation extends React.Component {
  renderNavigation(hasUser, tenant) {
    
    const allMenus = _.filter(tenant.pages, function(page){ 
      if(page.menuNr && page.menuNr > 0)
        return page.path;
    });
    
    let authMenus = _.filter(allMenus, function(menu){ 
      if(menu.roles && Roles.userIsInRole(Meteor.userId(), menu.roles, tenant.domain))
        return menu;
    });
    authMenus = _.sortBy(authMenus, function(doc) { return doc.menuNr; })

    let publicMenus = _.filter(allMenus, function(menu){ 
      if( !menu.roles || menu.roles.length === 0 )
        return menu;
    });
    publicMenus = _.sortBy(publicMenus, function(doc) { return doc.menuNr; })    

    if(!!tenant.isPublicMenuInAuthNav)
      authMenus = publicMenus.concat(authMenus);

    return hasUser ? <AuthenticatedNavigation menus={ authMenus }/> : <PublicNavigation menus={ publicMenus }/>;
  }

  render() {
    return <Navbar>
      <Navbar.Header>
        <Navbar.Brand>
          <Link to="/" onClick={ toggleNav } >{ this.props.tenant.name }</Link>
        </Navbar.Brand>
        <Navbar.Toggle />
      </Navbar.Header>
      <Navbar.Collapse>
        { this.renderNavigation(this.props.hasUser, this.props.tenant) }
      </Navbar.Collapse>
    </Navbar>;
  }
}

AppNavigation.propTypes = {
  hasUser : React.PropTypes.object,
  tenant  : React.PropTypes.object,
};
