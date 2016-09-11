import { Meteor } from 'meteor/meteor';

import { Info } from '../info_collection.js';

import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { ValidatedMethod } from 'meteor/mdg:validated-method';

import { initAPIsToDB, isUserHasAccess } from '/imports/api/general/server/general_server_functions';

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
    status: 'Draft',
  },
  removeInfo: {
    name: 'removeInfo',
    description: 'Remove existing Info',
    type: apiType,
    status: 'Draft',
  },
};

initAPIsToDB(APIs, apiType);
