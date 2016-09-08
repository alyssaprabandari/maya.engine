import { Meteor } from 'meteor/meteor';

import { Trx } from '/imports/api/trx/trx_collection.js';
import { Member } from '/imports/api/member/member_collection.js';
import { Org } from '/imports/api/org/org_collection.js';

import { constructQuery } from '/imports/modules/utils';
import { apiName, searchFieldNames } from './trx_methods';

import { getCurrentUserRootDomain } from '/imports/api/general/server/general_server_functions';

//all publications for own account
Meteor.publish(apiName.myTrxList, function myTrxList(){
  try{
    
    if(!this.userId)
      throw new Meteor.Error(401, 'You must be logged in.');
  
    return Trx.find({ ownerId: this.userId }, { fields: Trx.publicFields });
  
  }catch(exception){
    console.log('PUBLISH EXCEPTION - '+apiName.myTrxList+' - userId: '+this.userId, exception);
    return this.ready();
  }
});

Meteor.publish(apiName.myTrxDetail, function myTrxDetail(trxId){
  try{
    check(trxId, Match._id);

    if(!this.userId)
      throw new Meteor.Error(401, 'You must be logged in.');

    return Trx.find({ _id: trxId, ownerId: this.userId }, { fields: Trx.publicFields });
  
  }catch(exception){
    console.log('PUBLISH EXCEPTION - '+apiName.myTrxDetail+' - userId: '+this.userId, exception);
    return this.ready();
  }
});


// now all publications for admistrators
Meteor.publishComposite(apiName.admTrxDetail, function admTrxDetail(trxId) {
  try{
    check(trxId, Match._id);

    if(!this.userId)
      throw new Meteor.Error(401, 'You must be logged in.');

    if( !Roles.userIsInRole(this.userId,'Admin',getCurrentUserRootDomain(this.connection)) )
      throw new Meteor.Error(444, 'Not enough Right');

    return {
      find() {
        
        const query = {
          _id: trxId,
        };

        const options = {

        };

        return Trx.find(query, options);
      },

      children: [{
        find(trx) {
          if(trx.ownerType === "Member")
            return Member.find({ _id: trx.ownerId });
          if(trx.ownerType === "Org")
            return Org.find({ _id: trx.ownerId });
        },
      }],
    };

  }catch(exception){
    console.log('PUBLISH EXCEPTION - '+apiName.admTrxDetail+' - userId: '+this.userId, exception);
    return this.ready();
  }
});

Meteor.publishComposite(apiName.admTrxList, function admTrxList(searchText, limit) {
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
        return Trx.find(query,options);
      },

      children: [{
        find(trx) {
          if(trx.ownerType === "Member")
            return Member.find({ _id: trx.ownerId });
          if(trx.ownerType === "Org")
            return Org.find({ _id: trx.ownerId });
        },
      }],
    };
  }catch(exception){
    console.log('PUBLISH EXCEPTION - '+apiName.admTrxList+' - userId: '+this.userId, exception);
    return this.ready();
  }  
});

