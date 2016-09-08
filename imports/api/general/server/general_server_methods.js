import { Meteor } from 'meteor/meteor';

import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { ValidatedMethod } from 'meteor/mdg:validated-method';

import { Tenant } from '/imports/api/tenant/tenant_collection.js';

import { getCurrentUserRootDomain } from '/imports/api/general/server/general_server_functions';

// TODO implement this APIs
// sendTestEmail             : 'sendTestEmail',
// sendVerificationEmail     : 'sendVerificationEmail',
// checkResetPasswordToken   : 'checkResetPasswordToken',
