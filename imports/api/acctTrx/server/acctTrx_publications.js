import { Meteor } from 'meteor/meteor';

import { AcctTrx } from '/imports/api/acctTrx/acctTrx_collection.js';
import { Acct } from '/imports/api/acct/acct_collection.js';
import { Member } from '/imports/api/member/member_collection.js';

import { constructQuery } from '/imports/modules/utils';
import { apiName, searchFieldNames } from './acctTrx_methods';

import { getCurrentUserRootDomain } from '/imports/api/general/server/general_server_functions';

// now all publications for admistrators
Meteor.publishComposite(apiName.admAcctTrxDetail, function admAcctTrxDetail(acctTrxId) {
  try{
    check(acctTrxId, Match._id);

    if(!this.userId)
      throw new Meteor.Error(401, 'You must be logged in.');

    if( !Roles.userIsInRole(this.userId,'Admin',getCurrentUserRootDomain(this.connection)) )
      throw new Meteor.Error(444, 'Not enough Right');

    return {
      find() {
        
        const query = {
          _id: acctTrxId,
        };

        const options = {

        };

        return AcctTrx.find(query, options);
      },

      children: [{
        find(acctTrx) {
          let arrayIds = [];
          arrayIds.push(acctTrx.senderAcctId);
          arrayIds.push(acctTrx.receiverAcctId);
          return Acct.find({ _id: { $in: arrayIds } });
        },
      }],
    };
  }catch(exception){
    console.log('PUBLISH EXCEPTION - '+apiName.admAcctTrxDetail+' - userId: '+this.userId, exception);
    return this.ready();
  }
});


Meteor.publishComposite(apiName.admAcctTrxList, function admAcctTrxList(searchText, limit) {
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
        return AcctTrx.find(query,options);
      },
      children: [{
        find(acctTrx) {
          let arrayIds = [];
          arrayIds.push(acctTrx.senderAcctId);
          arrayIds.push(acctTrx.receiverAcctId);
          return Acct.find({ _id: { $in: arrayIds } });
        },
      }],
    };
  }catch(exception){
    console.log('PUBLISH EXCEPTION - '+apiName.admAcctTrxList+' - userId: '+this.userId, exception);
    return this.ready();
  }
});

