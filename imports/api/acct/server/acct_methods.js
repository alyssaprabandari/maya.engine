import { Meteor } from 'meteor/meteor';

import { Acct } from '/imports/api/acct/acct_collection.js';

import { Member } from '/imports/api/member/member_collection.js';
import { Org } from '/imports/api/org/org_collection.js';

import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { ValidatedMethod } from 'meteor/mdg:validated-method';

import { constructQuery } from '/imports/modules/utils';

import { getCurrentUserRootDomain } from '/imports/api/general/server/general_functions';

export const apiName = {
  myAcctList         : 'my.acct.list',
  myAcctDetail       : 'my.acct.detail',
  admAcctList        : 'adm.acct.list',
  admAcctListCount   : 'adm.acct.list.count',
  admAcctDetail      : 'adm.acct.detail',
  admAcctFormInsert  : 'adm.acct.form.insert',
  admAcctFormUpdate  : 'adm.acct.form.update',
};

export const searchFieldNames = ['name','coaNr','ownerId','ownerType','saldo','currency','description','type','status','refs'];

export const admAcctListCount = new ValidatedMethod({
  name: apiName.admAcctListCount,
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

      const query = constructQuery(searchFieldNames,searchText);
      return Acct.find(query).count();

    }catch(exception){
      console.log('METHOD EXCEPTION - '+apiName.admAcctListCount+' - userId: '+this.userId, exception);
      throw new Meteor.Error(400,'Internal Server Exception');
    }
  }
});

export const admAcctFormInsert = new ValidatedMethod({
  name: apiName.admAcctFormInsert,
  validate: Acct.schema.pick(['name','coaNr','ownerId','ownerType','saldo','currency','description','type','status']).validator(),

  run(acct) {
    try{
      // now sanity check
      if(!this.userId)
        throw new Meteor.Error(401, 'You must be logged in.');

      if( !Roles.userIsInRole(this.userId,'Admin',getCurrentUserRootDomain(this.connection)) )
        throw new Meteor.Error(444, 'Not enough Right');

      let owner;
      switch(acct.ownerType){
        case 'Org'  : 
          owner = Org.findOne({_id: acct.ownerId});
          break;
        case 'Member'   : 
          owner = Member.findOne({_id: acct.ownerId});
          break;
      };

      if(!owner)
        throw new Meteor.Error(449,'Owner not Found');

      return Acct.insert(acct);

    }catch(exception){
      console.log('METHOD EXCEPTION - '+apiName.admAcctFormInsert+' - userId: '+this.userId, exception);
      throw new Meteor.Error(400,'Internal Server Exception');
    }
  }
});

export const admAcctFormUpdate = new ValidatedMethod({
  name: apiName.admAcctFormUpdate,

  validate: new SimpleSchema([
    Acct.schema.pick(['name','coaNr','ownerId','ownerType','saldo','currency','description','type','status']),
    {
      _id: { 
        type: SimpleSchema.RegEx.Id,
      },
    }
  ]).validator(),

  run( acct ) {
    try{

      if( !this.userId )
        throw new Meteor.Error(401, 'You must be logged in.');
      
      if( !Roles.userIsInRole(this.userId,'Admin',getCurrentUserRootDomain(this.connection)) )
        throw new Meteor.Error(444, 'Not enough Right');

      let owner;
      switch(acct.ownerType){
        case 'Org'  : 
          owner = Org.findOne({_id: acct.ownerId});
          break;
        case 'Member'   : 
          owner = Member.findOne({_id: acct.ownerId});
          break;
      };

      if(!owner)
        throw new Meteor.Error(449,'Owner not Found');

      Acct.update(acct._id, { $set: acct });

    }catch(exception){
      console.log('METHOD EXCEPTION - '+apiName.admAcctFormUpdate+' - userId: '+this.userId, exception);
      throw new Meteor.Error(400,'Internal Server Exception');
    }
  },
});

