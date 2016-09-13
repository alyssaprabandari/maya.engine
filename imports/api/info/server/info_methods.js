import { Meteor } from 'meteor/meteor';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { rateLimit } from '/imports/modules/rate-limit.js';

import { initAPIsToDB, isUserHasAccess } from '/imports/api/general/server/general_server_functions';

import { Info } from '/imports/api/info/info_collection.js';

const apiType = 'Info.Method';
const APIs = {
  insertInfo: {
    name: 'insertInfo',
    description: 'Insert new Info',
    type: apiType,
    status: 'Active',
  },
  updateInfo: {
    name: 'updateInfo',
    description: 'Update existing Info',
    type: apiType,
    status: 'Active',
  },
  removeInfo: {
    name: 'removeInfo',
    description: 'Remove existing Info',
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