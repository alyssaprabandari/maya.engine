import { Meteor } from 'meteor/meteor';

import { Feed } from '../feed_collection.js';

import { constructQuery } from '/imports/modules/utils';
import { apiName, searchFieldNames } from './feed_methods';

Meteor.publish(apiName.myFeedList, function myFeedList(searchText, limit) {  
  try{
    // now sanity check
    check(searchText, Match.Maybe(Match.textOnly));
    check(limit, Number);

    if(!this.userId)
      throw new Meteor.Error(401, 'You must be logged in.');

    //FIXME harus taruh ownerId di sini ke dalam query
    const query = constructQuery(searchFieldNames, searchText);
    const options = {
      limit: limit
    };
    return Feed.find(query,options);
  }catch(exception){
    console.log('PUBLISH EXCEPTION - '+apiName.myFeedList+' - userId: '+this.userId, exception);
    return this.ready();
  }
});