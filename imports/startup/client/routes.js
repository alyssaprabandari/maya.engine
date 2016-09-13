import React from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { Meteor } from 'meteor/meteor';

import { ErrorPage } from '/imports/ui/widgets/default/ErrorPage';

import { widgetImporter } from '/imports/modules/widgetImporter';

import { Tenant } from '/imports/api/tenant/tenant_collection.js';

let tenant;

const requireAuth = (nextState, replace) => {
  if (!Meteor.loggingIn() && !Meteor.userId()) {
    replace({
      pathname: '/login',
      state: { nextPathname: nextState.location.pathname },
    });
  }else{
    const page = _.findWhere(tenant.pages, {path:nextState.routes[1].path});
    if( !Roles.userIsInRole(Meteor.userId(), page.roles, tenant.domain) ){
      Bert.alert('Your User Right is not Enough', 'danger');
      replace({
        pathname: '/error'
      });
    };   
  };
};

const renderIndexRoute = () => {
  let components = {};
  let indexWidget = 1;

  tenant.index.widgets.forEach( (widget)=>{
    components['widget'+widget+'_'+indexWidget] = widgetImporter(widget);
    indexWidget++;
  });
                
  if(tenant.index.roles && tenant.index.roles.length > 0)
    return <IndexRoute name="index" key={ tenant.index.title } components={ components } onEnter={ requireAuth } />;
  else
    return <IndexRoute name="index" key={ tenant.index.title } components={ components } />;
};

const renderDynamicRoute = (page) => {
  let components = {};
  let indexWidget = 1;
  page.widgets.forEach( (widget)=>{
    components['widget'+widget+'_'+indexWidget] = widgetImporter(widget);
    indexWidget++;
  });

  if(page.roles && page.roles.length > 0)
    return <Route key={ page.title } path={ page.path } components={ components } onEnter={ requireAuth } />;
  else
    return <Route key={ page.title } path={ page.path } components={ components } />;
};

Meteor.startup(() => {
  Meteor.subscribe("getTenantInfo", {
    onReady: function(){
      // Tracker.autorun(function () {
        try{
          tenant = Tenant.findOne();
          if(tenant){
            Meteor.settings.public.tenant = tenant.domain;

            //FIXME temporarily manual import n only bootstrap right now
            if(tenant.layout.framework === 'Bootstrap')
              import 'bootstrap/dist/css/bootstrap.min.css';

            document.title = tenant.name + ' - ' + tenant.description;
            if(tenant.layout.cssUrl){
              const link = document.createElement('link');
              link.type = 'text/css';
              link.rel = 'stylesheet';
              link.href = tenant.layout.cssUrl;
              document.head.appendChild(link);
            };

            //FIXME please not directly re-render but gives alert so user can click to reload
            document.getElementById('react-root').innerHTML="";
            render(
              <Router history={ browserHistory }>
                <Route path="/" component={ widgetImporter(tenant.layout.appWidget) } >
                  { renderIndexRoute() }
                  { tenant.pages.map((page) => ( renderDynamicRoute(page) ) ) }
                  <Route path="/error" components={ {widgetErrorPage:ErrorPage} } />
                  <Route path="*" components={ {widgetErrorPage:ErrorPage} } />
                </Route>
              </Router>,
              document.getElementById('react-root')
            );
          }else{
            document.getElementById('react-root').innerHTML="";
            Bert.alert('Domain Error', 'danger');
          }
        }catch(exception){
          console.log(exception);
          Bert.alert('Configuration Error', 'danger');
        }
      // });
    }
  });

});
