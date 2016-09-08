import { Meteor } from 'meteor/meteor';

import { AcctMovement } from '/imports/api/acctMovement/acctMovement_collection.js';

import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { ValidatedMethod } from 'meteor/mdg:validated-method';

import { constructQuery } from '/imports/modules/utils';

import { getCurrentUserRootDomain } from '/imports/api/general/server/general_server_functions';

export const apiName = {
  admAcctMovementList        : 'adm.acctMovement.list',
  admAcctMovementListCount   : 'adm.acctMovement.list.count',
  admAcctMovementDetail      : 'adm.acctMovement.detail',
};

export const searchFieldNames = ['senderAcctId','receiverAcctId','amount','type','status','description','userId','timestamp','refs'];

export const admAcctMovementListCount = new ValidatedMethod({
  name: apiName.admAcctMovementListCount,
  validate: new SimpleSchema({
    searchText: { type: String, optional: true }
  }).validator(),

  run({searchText}) {
    try{
      check(searchText, Match.Maybe(Match.textOnly));

      if(!this.userId)
        throw new Meteor.Error(401, 'You must be logged in.');

      if( !Roles.userIsInRole(this.userId,'Admin',getCurrentUserRootDomain(this.connection)) )
        throw new Meteor.Error(444, 'Not enough Right');

      const query = constructQuery(searchFieldNames, searchText);
      return AcctMovement.find(query).count();

    }catch(exception){
      console.log('METHOD EXCEPTION - '+apiName.admAcctMovementListCount+' - userId: '+this.userId, exception);
      throw new Meteor.Error(400,'Internal Server Exception');
    }
  }
});
