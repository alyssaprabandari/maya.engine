import { Meteor } from 'meteor/meteor';

import { Tenant } from '/imports/api/tenant/tenant_collection.js';

import { Log } from '/imports/api/log/log_collection.js';
// import { Member } from '/imports/api/member/member_collection.js';
// import { Org } from '/imports/api/org/org_collection.js';

import { constructQuery } from '/imports/modules/utils';
import { apiName, searchFieldNames } from './tenant_methods';

import { getCurrentUserRootDomain } from '/imports/api/general/server/general_functions';


Meteor.publish(apiName.getTenantInfo, function getTenantWidgets(pageName){
  try{
    const query = {
      domain: getCurrentUserRootDomain(this.connection),
      status: 'Active',
    };
      
    const options = {
      fields: Tenant.publicFields
    };

    return Tenant.find(query,options);

  }catch(exception){
    console.log('PUBLISH EXCEPTION - '+apiName.getTenantInfo+' - userId: '+this.userId, exception);
    throw new Meteor.Error(400,'Internal Server Exception');
  }
});


//all publications for own account
// Meteor.publish(apiName.myTenantList, function myTenantList(){
//   try{
    
//     if(!this.userId)
//       throw new Meteor.Error(401, 'You must be logged in.');
  
//     return Tenant.find({ ownerId: this.userId }, { fields: Tenant.publicFields });
  
//   }catch(exception){
//     console.log('PUBLISH EXCEPTION - '+apiName.myTenantList+' - userId: '+this.userId, exception);
//     return this.ready();
//   }
// });

// Meteor.publish(apiName.myTenantDetail, function myTenantDetail(tenantId){
//   try{
//     check(tenantId, Match._id);

//     if(!this.userId)
//       throw new Meteor.Error(401, 'You must be logged in.');

//     return Tenant.find({ _id: tenantId, ownerId: this.userId }, { fields: Tenant.publicFields });
  
//   }catch(exception){
//     console.log('PUBLISH EXCEPTION - '+apiName.myTenantDetail+' - userId: '+this.userId, exception);
//     return this.ready();
//   }
// });


// now all publications for admistrators
Meteor.publishComposite(apiName.admTenantDetail, function admTenantDetail(tenantId) {
  try{
    check(tenantId, Match._id);

    if(!this.userId)
      throw new Meteor.Error(401, 'You must be logged in.');

    if( !Roles.userIsInRole(this.userId,'Admin',getCurrentUserRootDomain(this.connection)) )
      throw new Meteor.Error(444, 'Not enough Right');

    return {
      find() {
        
        const query = {
          _id: tenantId,
        };
        
        const options = {

        };

        return Tenant.find(query, options);
      },

      children: [{
        find(tenant) {
          return Log.find({refName:'Tenant',refId:tenant._id});
        },
      }],
    };

  }catch(exception){
    console.log('PUBLISH EXCEPTION - '+apiName.admTenantDetail+' - userId: '+this.userId, exception);
    return this.ready();
  }
});

Meteor.publishComposite(apiName.admTenantList, function admTenantList(searchText, limit) {
  try{
    check(searchText, Match.Maybe(String));
    check(limit, Number);

    if(searchText)
      check(searchText, Match.textOnly);

    if(!this.userId)
      throw new Meteor.Error(401, 'You must be logged in.');

    if( !Roles.userIsInRole(this.userId,'Admin',getCurrentUserRootDomain(this.connection)) )
      throw new Meteor.Error(444, 'Not enough Right');

    return {
      find() {
        const query = constructQuery(searchFieldNames,searchText);
        const options = {
          limit: limit
        };
        return Tenant.find(query,options);
      },

      children: [],
    };
  }catch(exception){
    console.log('PUBLISH EXCEPTION - '+apiName.admTenantList+' - userId: '+this.userId, exception);
    return this.ready();
  }  
});

