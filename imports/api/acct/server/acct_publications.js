import { Meteor } from 'meteor/meteor';

import { Acct } from '/imports/api/acct/acct_collection.js';

import { AcctMovement } from '/imports/api/acctMovement/acctMovement_collection.js';

import { Tenant } from '/imports/api/tenant/tenant_collection.js';
import { Member } from '/imports/api/member/member_collection.js';
import { Org } from '/imports/api/org/org_collection.js';

import { constructQuery } from '/imports/modules/utils';
import { apiName, searchFieldNames } from './acct_methods';

import { getCurrentUserRootDomain } from '/imports/api/general/server/general_server_functions';

//all publications for own account
Meteor.publish(apiName.myAcctList, function myAcctList(){
  try{
    
    if(!this.userId)
      throw new Meteor.Error(401, 'You must be logged in.');
  
    return Acct.find({ ownerId: this.userId }, { fields: Acct.publicFields });
  
  }catch(exception){
    console.log('PUBLISH EXCEPTION - '+apiName.myAcctList+' - userId: '+this.userId, exception);
    return this.ready();
  }
});

Meteor.publishComposite(apiName.myAcctDetail, function myAcctDetail(acctId) {
  try{
    check(acctId, Match._id);

    if(!this.userId)
      throw new Meteor.Error(401, 'You must be logged in.');

    return {
      find() {
        
        let arrayIds = [];
        arrayIds.push(this.userId);

        const query = {
          _id       : acctId,
          ownerId   : { $in: arrayIds },
        };
        
        const options = {
          fields: Acct.publicFields,
        };

        return Acct.find(query, options);
      },

      children: [{
        find(acct) {
          if(acct.ownerType === "Member")
            return Member.find({ _id: acct.ownerId });
          if(acct.ownerType === "Org")
            return Org.find({ _id: acct.ownerId });
        },
      },{
        find(acct) {
          const query = {
            acctId: acct._id
          };
          
          //FIXME considering limiting record sent
          const options = {
            fields: AcctMovement.publicFields,
            sort: {timestamp: -1}
          };

          return AcctMovement.find(query,options);
        },
      }],
    };

  }catch(exception){
    console.log('PUBLISH EXCEPTION - '+apiName.admAcctDetail+' - userId: '+this.userId, exception);
    return this.ready();
  }
});


// now all publications for admistrators
Meteor.publishComposite(apiName.admAcctDetail, function admAcctDetail(acctId) {
  try{
    check(acctId, Match._id);

    if(!this.userId)
      throw new Meteor.Error(401, 'You must be logged in.');

    if( !Roles.userIsInRole(this.userId,'Admin',getCurrentUserRootDomain(this.connection)) )
      throw new Meteor.Error(444, 'Not enough Right');

    return {
      find() {
        
        const query = {
          _id: acctId,
        };
        
        const options = {

        };

        return Acct.find(query, options);
      },

      children: [{
        find(acct) {
          if(acct.ownerType === "Member")
            return Member.find({ _id: acct.ownerId });
          if(acct.ownerType === "Org")
            return Org.find({ _id: acct.ownerId });
        },
      },{
        find(acct) {
          return Tenant.find({_id:acct.tenantId});
        },
      },{
        find(acct) {
          return Log.find({refName:'Acct',refId:acct._id},{sort: {timestamp: -1}});
        },
      }],
    };

  }catch(exception){
    console.log('PUBLISH EXCEPTION - '+apiName.admAcctDetail+' - userId: '+this.userId, exception);
    return this.ready();
  }
});

Meteor.publishComposite(apiName.admAcctList, function admAcctList(searchText, limit) {
  try{
    check(searchText, Match.Maybe(Match.textOnly));
    check(limit, Number);

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
        return Acct.find(query,options);
      },

      children: [{
        find(acct) {
          if(acct.ownerType === "Member")
            return Member.find({ _id: acct.ownerId });
          if(acct.ownerType === "Org")
            return Org.find({ _id: acct.ownerId });
        },
      },{
        find(acct) {
          return Tenant.find({_id:acct.tenantId});
        },
      }],
    };
  }catch(exception){
    console.log('PUBLISH EXCEPTION - '+apiName.admAcctList+' - userId: '+this.userId, exception);
    return this.ready();
  }  
});

