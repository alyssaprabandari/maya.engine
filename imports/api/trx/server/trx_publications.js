import { Meteor } from 'meteor/meteor';

import { initAPIsToDB, isUserHasAccess } from '/imports/api/general/server/general_server_functions';

import { Trx } from '/imports/api/trx/trx_collection.js';

const apiType = 'Acct.Publication';
const APIs = {

};

initAPIsToDB(APIs, apiType);

