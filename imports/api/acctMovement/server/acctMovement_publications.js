import { Meteor } from 'meteor/meteor';

import { initAPIsToDB, isUserHasAccess } from '/imports/api/general/server/general_server_functions';

import { AcctMovement } from '/imports/api/acctMovement/acctMovement_collection.js';

const apiType = 'AcctMovement.Publication';
const APIs = {

};

initAPIsToDB(APIs, apiType);

