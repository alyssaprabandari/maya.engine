import { composeWithTracker } from 'react-komposer';

import { App } from './App';

import { Loading } from '../Loading/Loading.js';
import { Meteor } from 'meteor/meteor';

const composer = (params, onData) => {
  if (Roles.subscription.ready()) {
    onData(null, {});
  }
};

export default composeWithTracker(composer, Loading)(App);
