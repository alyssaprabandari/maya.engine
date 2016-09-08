import { Meteor } from 'meteor/meteor';

import { Tenant } from '/imports/api/tenant/tenant_collection.js';

import { Member } from '/imports/api/member/member_collection.js';
import { Org } from '/imports/api/org/org_collection.js';

import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { ValidatedMethod } from 'meteor/mdg:validated-method';

import { constructQuery } from '/imports/modules/utils';

import { checkOwner, getCurrentUserRootDomain } from '/imports/api/general/server/general_server_functions';

export const apiName = {
  getTenantInfo        : 'getTenantInfo',
  // getTenantWidgets     : 'getTenantWidgets',
  myTenantList         : 'my.tenant.list',
  myTenantDetail       : 'my.tenant.detail',
  admTenantList        : 'adm.tenant.list',
  admTenantListCount   : 'adm.tenant.list.count',
  admTenantDetail      : 'adm.tenant.detail',
  admTenantFormInsert  : 'adm.tenant.form.insert',
  admTenantFormUpdate  : 'adm.tenant.form.update',
};

export const searchFieldNames = ['name','roles','description','type','status','owners.ownerId','refs.refId'];

// export const getTenantInfo = new ValidatedMethod({
//   name: apiName.getTenantInfo,
//   validate: null,
//   // validate: new SimpleSchema({
//   //   domain: { type: SimpleSchema.RegEx.WeakDomain }
//   // }).validator(),

//   run() {
//     try{      
//       const query = {
//         domain: getCurrentUserRootDomain(this.connection),
//         status: 'Active',
//       };
        
//       const options = {
//         fields: Tenant.publicFields
//       };

//       const tenant = Tenant.findOne(query,options);
//       if(!tenant)
//         throw new Meteor.Error(445,'Tenant not Found');

//       return tenant;

//     }catch(exception){
//       console.log('METHOD EXCEPTION - '+apiName.getTenantInfo+' - userId: '+this.userId, exception);
//       throw new Meteor.Error(400,'Internal Server Exception');
//     }
//   }
// });

// export const getTenantWidgets = new ValidatedMethod({
//   name: apiName.getTenantInfo,
//   validate: new SimpleSchema({
//     page: { type: String }
//   }).validator(),

//   run({page}) {
//     try{
//       check(page, Match.textOnly);

//       const query = {
//         domain: getCurrentUserRootDomain(this.connection),
//         status: 'Active',
//       };
        
//       const options = {
//         fields: {pages:1}
//       };

//       const tenant = Tenant.findOne(query,options);
//       if(!tenant)
//         throw new Meteor.Error(445,'Tenant not Found');

      

//       return ;

//     }catch(exception){
//       console.log('METHOD EXCEPTION - '+apiName.getTenantWidgets+' - userId: '+this.userId, exception);
//       throw new Meteor.Error(400,'Internal Server Exception');
//     }
//   }
// });


export const admTenantListCount = new ValidatedMethod({
  name: apiName.admTenantListCount,
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

      const query = constructQuery(searchFieldNames,searchText);
      return Tenant.find(query).count();

    }catch(exception){
      console.log('METHOD EXCEPTION - '+apiName.admTenantListCount+' - userId: '+this.userId, exception);
      throw new Meteor.Error(400,'Internal Server Exception');
    }
  }
});

export const admTenantFormInsert = new ValidatedMethod({
  name: apiName.admTenantFormInsert,
  validate: Tenant.schema.pick([
    'name','description','type','status',
    'roles','roles.$',
    'images','images.$','images.$.imgUrl','images.$.imgType',
    'owners','owners.$','owners.$.ownerId','owners.$.ownerType', 
    'refs','refs.$','refs.$.refId','refs.$.refType','refs.$.description'
  ]).validator(),

  run(tenant) {
    try{
      // now sanity check
      if(!this.userId)
        throw new Meteor.Error(401, 'You must be logged in.');

      if( !Roles.userIsInRole(this.userId,'Admin',getCurrentUserRootDomain(this.connection)) )
        throw new Meteor.Error(444, 'Not enough Right');

      if(tenant.owners)
        tenant.owners.forEach((owner) => {
          checkOwner(owner);
        });

      return Tenant.insert(tenant);

    }catch(exception){
      console.log('METHOD EXCEPTION - '+apiName.admTenantFormInsert+' - userId: '+this.userId, exception);
      throw new Meteor.Error(400,'Internal Server Exception');
    }
  }
});

export const admTenantFormUpdate = new ValidatedMethod({
  name: apiName.admTenantFormUpdate,
  validate: new SimpleSchema([
    Tenant.schema.pick([
      'name','description','type','status',
      'roles','roles.$',
      'images','images.$','images.$.imgUrl','images.$.imgType',
      'owners','owners.$','owners.$.ownerId','owners.$.ownerType', 
      'refs','refs.$','refs.$.refId','refs.$.refType','refs.$.description'
    ]),{
      _id: { 
        type: SimpleSchema.RegEx.Id,
      },
    }
  ]).validator(),

  run( tenant ) {
    try{

      if( !this.userId )
        throw new Meteor.Error(401, 'You must be logged in.');
      
      if( !Roles.userIsInRole(this.userId,'Admin',getCurrentUserRootDomain(this.connection)) )
        throw new Meteor.Error(444, 'Not enough Right');

      if(tenant.owners)
        tenant.owners.forEach((owner) => {
          checkOwner(owner);
        });

      Tenant.update(tenant._id, { $set: tenant });

    }catch(exception){
      console.log('METHOD EXCEPTION - '+apiName.admTenantFormUpdate+' - userId: '+this.userId, exception);
      throw new Meteor.Error(400,'Internal Server Exception');
    }
  },
});

