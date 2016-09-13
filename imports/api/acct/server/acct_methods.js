import { Meteor } from 'meteor/meteor';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { rateLimit } from '/imports/modules/rate-limit.js';

import { initAPIsToDB, isUserHasAccess } from '/imports/api/general/server/general_server_functions';

import { Acct } from '/imports/api/acct/acct_collection';

const apiType = 'Acct.Method';
const APIs = {

};

initAPIsToDB(APIs, apiType);


rateLimit({
  methods: [

  ],
  limit: 5,
  timeRange: 1000,
});

