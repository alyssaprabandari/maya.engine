import { Meteor } from 'meteor/meteor';

import { Log } from '../log_collection.js';

import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { ValidatedMethod } from 'meteor/mdg:validated-method';

import { constructQuery } from '/imports/modules/utils';

import { getCurrentUserRootDomain } from '/imports/api/general/server/general_functions';

export const apiName = {
  admLogList        : 'adm.log.list',
  admLogListCount   : 'adm.log.list.count',
  admLogDetail      : 'adm.log.detail',
};

export const searchFieldNames = ['_id','refName','refId', 'refObject', 'type'];

export const admLogListCount = new ValidatedMethod({
  name: apiName.admLogListCount,
  validate: new SimpleSchema({
    searchText: { type: String, optional: true }
  }).validator(),

  run({searchText}) {
    try{
      // now sanity check
      check(searchText, Match.Maybe(Match.textOnly));

      if( !Roles.userIsInRole(this.userId,'Admin',getCurrentUserRootDomain(this.connection)) )
        throw new Meteor.Error(444, 'Not enough Right');

      const query = constructQuery(searchFieldNames, searchText);
      return Log.find(query).count();

    }catch(exception){
      console.log('EXCEPTION - '+apiName.admLogListCount+' - userId: '+this.userId, exception);
      throw new Meteor.Error(400,'Internal Server Exception');
    }
  }
});
