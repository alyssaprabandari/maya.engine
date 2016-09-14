import React from 'react';
import ReactDOM from 'react-dom';
import { browserHistory } from 'react-router';

//FIXME this is bootstrap specific, should be NOT
export const toggleNav = () => {
  if($('.navbar-toggle.collapsed').length == 0)
    $('.navbar-toggle').click();
};

export const handleLogout = () => Meteor.logout(() => browserHistory.push('/'));

export const resetInputValue = (component) => {
	ReactDOM.findDOMNode(component).blur()
	ReactDOM.findDOMNode(component).value= '';
};

export const resendVerificationEmail = () => {
  Meteor.call('sendVerificationEmail');
  Bert.alert('Verification Email resend...', 'success');
};

export const goLink = (path) => browserHistory.push(path);

export const resetQueryLimit = () => {
  Session.set('queryLimit', 25);
  if(Meteor.settings.public.queryLimit)
    Session.set('queryLimit', Meteor.settings.public.queryLimit);

  Session.set('queryStep', 25);
  if(Meteor.settings.public.queryStep)
    Session.set('queryStep', Meteor.settings.public.queryStep);
};

export const nextQueryLimit = () => {
	const nextQueryLimit = Session.get('queryLimit')+Session.get('queryStep');
	Session.set('queryLimit', nextQueryLimit < Session.get('queryMax') ? nextQueryLimit : Session.get('queryMax'));
};

export const infiniteScroll = () => {
  $(window).scroll(
    _.throttle(function() {
      if(
      	Session.get('queryInfinite') && 
      	!Session.get('queryProcess') && 
      	($(window).scrollTop() + $(window).height() > $(document).height() - 100)
      ){
      	nextQueryLimit();
      }
    }, 500)
  );
};

export const initInfiniteScroll = (methodCountName, searchText) => {
	resetQueryLimit();
	Session.set('methodCountName', methodCountName);
	Meteor.call(methodCountName, {searchText:searchText}, function(error, result){
		if(error){
			Bert.alert(error.message,'danger');
		}else{
			Session.set('queryMax', result);	
			if(Session.get('queryLimit') < Session.get('queryMax')){
				Session.set('queryInfinite', true);
				infiniteScroll();
			}else{
				Session.set('queryLimit', result);
			};
		};
	});
};
	

