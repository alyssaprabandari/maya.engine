import { Meteor } from 'meteor/meteor';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { rateLimit } from '/imports/modules/rate-limit.js';

import { initAPIsToDB, isUserHasAccess } from '/imports/api/general/server/general_server_functions';

import { Api } from '/imports/api/api/api_collection';

const apiType = 'Api.Method';
const APIs = {
  updateApi: {
    name: 'updateApi',
    description: 'Update Api',
    type: apiType,
    status: 'Active',
  },
};

initAPIsToDB(APIs, apiType);

rateLimit({
  methods: [

  ],
  limit: 5,
  timeRange: 1000,
});