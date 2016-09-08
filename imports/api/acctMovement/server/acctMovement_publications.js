import { Meteor } from 'meteor/meteor';

import { AcctMovement } from '/imports/api/acctMovement/acctMovement_collection.js';
import { Acct } from '/imports/api/acct/acct_collection.js';

import { constructQuery } from '/imports/modules/utils';
import { apiName, searchFieldNames } from './acctMovement_methods';

import { getCurrentUserRootDomain } from '/imports/api/general/server/general_server_functions';

// now all publications for admistrators
Meteor.publishComposite(apiName.admAcctMovementDetail, function admAcctMovementDetail(acctMovementId) {
  try{
    check(acctMovementId, Match._id);

    if(!this.userId)
      throw new Meteor.Error(401, 'You must be logged in.');

    if( !Roles.userIsInRole(this.userId,'Admin',getCurrentUserRootDomain(this.connection)) )
      throw new Meteor.Error(444, 'Not enough Right');

    return {
      find() {
        
        const query = {
          _id: acctMovementId,
        };

        const options = {

        };

        return AcctMovement.find(query, options);
      },

      children: [{
        find(acctMovement) {
          let arrayIds = [];
          arrayIds.push(acctMovement.senderAcctId);
          arrayIds.push(acctMovement.receiverAcctId);
          return Acct.find({ _id: { $in: arrayIds } });
        },
      }],
    };
  }catch(exception){
    console.log('PUBLISH EXCEPTION - '+apiName.admAcctMovementDetail+' - userId: '+this.userId, exception);
    return this.ready();
  }
});


Meteor.publishComposite(apiName.admAcctMovementList, function admAcctMovementList(searchText, limit) {
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
        return AcctMovement.find(query,options);
      },
      children: [{
        find(acctMovement) {
          let arrayIds = [];
          arrayIds.push(acctMovement.senderAcctId);
          arrayIds.push(acctMovement.receiverAcctId);
          return Acct.find({ _id: { $in: arrayIds } });
        },
      }],
    };
  }catch(exception){
    console.log('PUBLISH EXCEPTION - '+apiName.admAcctMovementList+' - userId: '+this.userId, exception);
    return this.ready();
  }
});

