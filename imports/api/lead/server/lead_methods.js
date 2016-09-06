import { Meteor } from 'meteor/meteor';

import { Lead } from '../lead_collection.js';

import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { ValidatedMethod } from 'meteor/mdg:validated-method';

import { constructQuery } from '/imports/modules/utils';

import { getCurrentUserRootDomain } from '/imports/api/general/server/general_functions';

export const apiName = {
  admLeadList        : 'adm.lead.list',
  admLeadListCount   : 'adm.lead.list.count',
  admLeadDetail      : 'adm.lead.detail',
  admLeadFormInsert  : 'adm.lead.form.insert',
  admLeadFormUpdate  : 'adm.lead.form.update',
};

export const searchFieldNames = ['fullname','nickname','type','status'];

export const admLeadListCount = new ValidatedMethod({
  name: apiName.admLeadListCount,
  validate: new SimpleSchema({
    searchText: { type: String, optional: true }
  }).validator(),

  run({searchText}) {
    try{
      // now sanity check
      check(searchText, Match.Maybe(Match.textOnly));
    
      if(!this.userId)
        throw new Meteor.Error(401, 'You must be logged in.');

      if( !Roles.userIsInRole(this.userId,'Admin',getCurrentUserRootDomain(this.connection)) )
        throw new Meteor.Error(444, 'Not enough Right');

      const query = constructQuery(searchFieldNames, searchText);
      return Lead.find(query).count();

    }catch(exception){
      console.log('METHOD EXCEPTION - '+apiName.admLeadListCount+' - userId: '+this.userId, exception);
      throw new Meteor.Error(400,'Internal Server Exception');
    }
  }
});

export const admLeadFormInsert = new ValidatedMethod({
  name: apiName.admLeadFormInsert,
  validate: Lead.schema.pick(['fullname','nickname','email','dob','bio','type','status']).validator(),

  run(lead) {
    try{
      // now sanity check
      if(!this.userId)
        throw new Meteor.Error(401, 'You must be logged in.');

      if( !Roles.userIsInRole(this.userId,'Admin',getCurrentUserRootDomain(this.connection)) )
        throw new Meteor.Error(444, 'Not enough Right');

      return Lead.insert(lead);

    }catch(exception){
      console.log('METHOD EXCEPTION - '+apiName.admLeadFormInsert+' - userId: '+this.userId, exception);
      throw new Meteor.Error(400,'Internal Server Exception');
    }
  }
});

export const admLeadFormUpdate = new ValidatedMethod({
  name: apiName.admLeadFormUpdate,

  validate: new SimpleSchema([
    Lead.schema.pick(['fullname','nickname','email','dob','bio','type','status']),
    {
      _id: { 
        type: SimpleSchema.RegEx.Id,
      },
    }
  ]).validator(),

  run( lead ) {
    try{

      if( !this.userId )
        throw new Meteor.Error(401, 'You must be logged in.');
      
      if( !Roles.userIsInRole(this.userId,'Admin',getCurrentUserRootDomain(this.connection)) )
        throw new Meteor.Error(444, 'Not enough Right');

      Lead.update(lead._id, { $set: lead });

    }catch(exception){
      console.log('METHOD EXCEPTION - '+apiName.admLeadFormUpdate+' - userId: '+this.userId, exception);
      throw new Meteor.Error(400,'Internal Server Exception');
    }
  },
});

