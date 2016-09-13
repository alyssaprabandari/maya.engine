import { Meteor } from 'meteor/meteor';

import { initAPIsToDB, isUserHasAccess } from '/imports/api/general/server/general_server_functions';

import { Acct } from '/imports/api/acct/acct_collection';

const apiType = 'Acct.Publication';
const APIs = {

};

initAPIsToDB(APIs, apiType);

