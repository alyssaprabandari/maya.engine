import { composeWithTracker } from 'react-komposer';
import { Meteor } from 'meteor/meteor';
import { AppNavigation } from './AppNavigation';

import { Tenant } from '/imports/api/tenant/tenant_collection.js';

const composer = (props, onData) => {
  onData(null, { hasUser: Meteor.user(), tenant: Tenant.findOne() });
};

export default composeWithTracker(composer, {}, {}, { pure: false })(AppNavigation);
