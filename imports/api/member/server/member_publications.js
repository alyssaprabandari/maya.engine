import { Meteor } from 'meteor/meteor';

import { initAPIsToDB, isUserHasAccess } from '/imports/api/general/server/general_server_functions';

import { Member } from '/imports/api/member/member_collection';

const apiType = 'Member.Publication';
const APIs = {

};

initAPIsToDB(APIs, apiType);

