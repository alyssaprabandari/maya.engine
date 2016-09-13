import { Meteor } from 'meteor/meteor';

import { initAPIsToDB, isUserHasAccess } from '/imports/api/general/server/general_server_functions';

import { AcctTrx } from '/imports/api/acctTrx/acctTrx_collection';

const apiType = 'AcctTrx.Publication';
const APIs = {

};

initAPIsToDB(APIs, apiType);


