import { Meteor } from 'meteor/meteor';

import { Org } from '/imports/api/org/org_collection.js';
import { Tenant } from '/imports/api/tenant/tenant_collection.js';

import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { ValidatedMethod } from 'meteor/mdg:validated-method';

import { constructQuery } from '/imports/modules/utils';

import { getCurrentUserRootDomain } from '/imports/api/general/server/general_server_functions';

export const apiName = {
  admOrgList        : 'adm.org.list',
  admOrgListCount   : 'adm.org.list.count',
  admOrgDetail      : 'adm.org.detail',
  admOrgFormInsert  : 'adm.org.form.insert',
  admOrgFormUpdate  : 'adm.org.form.update',
};

export const searchFieldNames = ['name','tenantId','description','roles','type','status'];

export const admOrgListCount = new ValidatedMethod({
  name: apiName.admOrgListCount,
  validate: new SimpleSchema({
    searchText: { type: String, optional: true }
  }).validator(),

  run({searchText}) {
    try{
      // now sanity check
      if(searchText)
        check(searchText, Match.textOnly);

      if(!this.userId)
        throw new Meteor.Error(401, 'You must be logged in.');

      if( !Roles.userIsInRole(this.userId,'Admin',getCurrentUserRootDomain(this.connection)) )
        throw new Meteor.Error(444, 'Not enough Right');

      const query = constructQuery(searchFieldNames, searchText);
      return Org.find(query).count();

    }catch(exception){
      console.log('METHOD EXCEPTION - '+apiName.admOrgListCount+' - userId: '+this.userId, exception);
      throw new Meteor.Error(400,'Internal Server Exception');
    }
  }
});

export const admOrgFormInsert = new ValidatedMethod({
  name: apiName.admOrgFormInsert,

  validate: Org.schema.pick([
    'name','tenantId','description','roles','roles.$','type','status',
    'images','images.$','images.$.imgUrl','images.$.imgType',
    'refs','refs.$','refs.$.refId','refs.$.refType','refs.$.description',
    ]).validator(),

  run(org) {
    try{
      // now sanity check
      if(!this.userId)
        throw new Meteor.Error(401, 'You must be logged in.');

      if( !Roles.userIsInRole(this.userId,'Admin',getCurrentUserRootDomain(this.connection)) )
        throw new Meteor.Error(444, 'Not enough Right');

      const tenant = Tenant.findOne(org.tenantId);
      if(!tenant)
        throw new Meteor.Error(445,'Tenant not Found');

      return Org.insert(org);

    }catch(exception){
      console.log('METHOD EXCEPTION - '+apiName.admOrgFormInsert+' - userId: '+this.userId, exception);
      throw new Meteor.Error(400,'Internal Server Exception');
    }
  }
});

export const admOrgFormUpdate = new ValidatedMethod({
  name: apiName.admOrgFormUpdate,

  validate: new SimpleSchema([
    Org.schema.pick([
      'name','tenantId','description','roles','roles.$','type','status',
      'images','images.$','images.$.imgUrl','images.$.imgType',
      'refs','refs.$','refs.$.refId','refs.$.refType','refs.$.description',
    ]),{
      _id: { 
        type: SimpleSchema.RegEx.Id,
      },
    }
  ]).validator(),

  run( org ) {
    try{

      if( !this.userId )
        throw new Meteor.Error(401, 'You must be logged in.');
      
      if( !Roles.userIsInRole(this.userId,'Admin',getCurrentUserRootDomain(this.connection)) )
        throw new Meteor.Error(444, 'Not enough Right');

      const tenant = Tenant.findOne(org.tenantId);
      if(!tenant)
        throw new Meteor.Error(445,'Tenant not Found');

      Org.update(org._id, { $set: org });

    }catch(exception){
      console.log('METHOD EXCEPTION - '+apiName.admOrgFormUpdate+' - userId: '+this.userId, exception);
      throw new Meteor.Error(400,'Internal Server Exception');
    }
  },
});
