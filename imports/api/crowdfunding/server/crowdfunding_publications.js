import { Meteor } from 'meteor/meteor';

import { initAPIsToDB, isUserHasAccess } from '/imports/api/general/server/general_server_functions';

import { Crowdfunding } from '/imports/api/crowdfunding/crowdfunding_collection.js';

const apiType = 'Crowdfunding.Publication';
const APIs = {

};

initAPIsToDB(APIs, apiType);

