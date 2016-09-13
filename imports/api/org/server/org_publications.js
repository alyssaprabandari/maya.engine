import { Meteor } from 'meteor/meteor';

import { initAPIsToDB, isUserHasAccess } from '/imports/api/general/server/general_server_functions';

import { Org } from '/imports/api/org/org_collection';

const apiType = 'Org.Publication';
const APIs = {

};

initAPIsToDB(APIs, apiType);

