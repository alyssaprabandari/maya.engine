import { Meteor } from 'meteor/meteor';

import { Trx } from '/imports/api/trx/trx_collection.js';

import { Member } from '/imports/api/member/member_collection.js';
import { Org } from '/imports/api/org/org_collection.js';

import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { ValidatedMethod } from 'meteor/mdg:validated-method';

import { getCurrentUserRootDomain } from '/imports/api/general/server/general_functions';

import { constructQuery } from '/imports/modules/utils';

export const apiName = {
  myTrxList         : 'my.trx.list',
  myTrxDetail       : 'my.trx.detail',
  admTrxList        : 'adm.trx.list',
  admTrxListCount   : 'adm.trx.list.count',
  admTrxDetail      : 'adm.trx.detail',
  admTrxFormInsert  : 'adm.trx.form.insert',
  admTrxFormUpdate  : 'adm.trx.form.update',
};

export const searchFieldNames = ['name','ownerId','ownerType','trxItems','total','currency','description','type','status'];

export const admTrxListCount = new ValidatedMethod({
  name: apiName.admTrxListCount,
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
      return Trx.find(query).count();

    }catch(exception){
      console.log('METHOD EXCEPTION - '+apiName.admTrxListCount+' - userId: '+this.userId, exception);
      throw new Meteor.Error(400,'Internal Server Exception');
    }
  }
});

export const admTrxFormInsert = new ValidatedMethod({
  name: apiName.admTrxFormInsert,
  validate: Trx.schema.pick(['name','coaNr','ownerId','ownerType','total','currency','description','type','status']).validator(),

  run(trx) {
    try{
      // now sanity check
      if(!this.userId)
        throw new Meteor.Error(401, 'You must be logged in.');

      if( !Roles.userIsInRole(this.userId,'Admin',getCurrentUserRootDomain(this.connection)) )
        throw new Meteor.Error(444, 'Not enough Right');

      let owner;
      switch(trx.ownerType){
        case 'Org'  : 
          owner = Org.findOne({_id: trx.ownerId});
          break;
        case 'Member'   : 
          owner = Member.findOne({_id: trx.ownerId});
          break;
      };

      if(!owner)
        throw new Meteor.Error(449,'Owner not Found');

      return Trx.insert(trx);

    }catch(exception){
      console.log('METHOD EXCEPTION - '+apiName.admTrxFormInsert+' - userId: '+this.userId, exception);
      throw new Meteor.Error(400,'Internal Server Exception');
    }
  }
});

export const admTrxFormUpdate = new ValidatedMethod({
  name: apiName.admTrxFormUpdate,

  validate: new SimpleSchema([
    Trx.schema.pick(['name','coaNr','ownerId','ownerType','total','currency','description','type','status']),
    {
      _id: { 
        type: SimpleSchema.RegEx.Id,
      },
    }
  ]).validator(),

  run( trx ) {
    try{

      if( !this.userId )
        throw new Meteor.Error(401, 'You must be logged in.');
      
      if( !Roles.userIsInRole(this.userId,'Admin',getCurrentUserRootDomain(this.connection)) )
        throw new Meteor.Error(444, 'Not enough Right');

      let owner;
      switch(trx.ownerType){
        case 'Org'  : 
          owner = Org.findOne({_id: trx.ownerId});
          break;
        case 'Member'   : 
          owner = Member.findOne({_id: trx.ownerId});
          break;
      };

      if(!owner)
        throw new Meteor.Error(449,'Owner not Found');

      Trx.update(trx._id, { $set: trx });

    }catch(exception){
      console.log('METHOD EXCEPTION - '+apiName.admTrxFormUpdate+' - userId: '+this.userId, exception);
      throw new Meteor.Error(400,'Internal Server Exception');
    }
  },
});

