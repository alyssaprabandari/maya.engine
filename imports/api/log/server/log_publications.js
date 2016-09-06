import { Meteor } from 'meteor/meteor';

import { Log } from '../log_collection.js';

import { constructQuery } from '/imports/modules/utils';
import { apiName, searchFieldNames } from './log_methods';

import { getCurrentUserRootDomain } from '/imports/api/general/server/general_functions';

Meteor.publish(apiName.admLogList, function admLogList(searchText, limit) {  
  try{
    // now sanity check
    check(searchText, Match.Maybe(Match.textOnly));
    check(limit, Number);

    if(!this.userId)
      throw new Meteor.Error(401, 'You must be logged in.');

    if( !Roles.userIsInRole(this.userId,'Admin',getCurrentUserRootDomain(this.connection)) )
      throw new Meteor.Error(444, 'Roles NOT sufficient');

    const query = constructQuery(searchFieldNames, searchText);
    const options = {
      limit: limit,
      sort: {timestamp: -1}
    };
    return Log.find(query,options);
  }catch(exception){
    console.log('EXCEPTION - '+apiName.admLogList+' - userId: '+this.userId, exception);
    return this.ready();
  }
});