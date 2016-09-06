import { Meteor } from 'meteor/meteor';

import { Feed } from '../feed_collection.js';

import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { ValidatedMethod } from 'meteor/mdg:validated-method';

import { constructQuery } from '/imports/modules/utils';

export const apiName = {
  myFeedList        : 'my.feed.list',
  myFeedListCount   : 'my.feed.list.count',
  myFeedDetail      : 'my.feed.detail',
};

export const searchFieldNames = ['title','type','status'];

export const myFeedListCount = new ValidatedMethod({
  name: apiName.myFeedListCount,
  validate: new SimpleSchema({
    searchText: { type: String, optional: true }
  }).validator(),

  run({searchText}) {
    try{
      // now sanity check
      check(searchText, Match.Maybe(Match.textOnly));

      if(!this.userId)
        throw new Meteor.Error(401, 'You must be logged in.');

      //FIXME harus taruh ownerId di sini
      const query = constructQuery(searchFieldNames, searchText);
      return Feed.find(query).count();

    }catch(exception){
      console.log('METHOD EXCEPTION - '+apiName.myFeedListCount+' - userId: '+this.userId, exception);
      throw new Meteor.Error(400,'Internal Server Exception');
    }
  }
});
