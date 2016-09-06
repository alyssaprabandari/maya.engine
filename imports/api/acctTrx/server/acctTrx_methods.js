import { Meteor } from 'meteor/meteor';

import { AcctTrx } from '/imports/api/acctTrx/acctTrx_collection.js';

import { Acct } from '/imports/api/acct/acct_collection.js';
import { AcctMovement } from '/imports/api/acctMovement/acctMovement_collection.js';

import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { ValidatedMethod } from 'meteor/mdg:validated-method';

import { constructQuery } from '/imports/modules/utils';

import { getCurrentUserRootDomain } from '/imports/api/general/server/general_functions';

export const apiName = {
  memberAcctTrxInsert   : 'member.acctTrx.insert',
  admAcctTrxList        : 'adm.acctTrx.list',
  admAcctTrxListCount   : 'adm.acctTrx.list.count',
  admAcctTrxDetail      : 'adm.acctTrx.detail',
};

export const searchFieldNames = ['senderAcctId','receiverAcctId','amount','type','status','description','userId','timestamp','refs'];

export const admAcctTrxListCount = new ValidatedMethod({
  name: apiName.admAcctTrxListCount,
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

      const query = constructQuery(searchFieldNames, searchText);
      return AcctTrx.find(query).count();

    }catch(exception){
      console.log('METHOD EXCEPTION - '+apiName.admAcctTrxListCount+' - userId: '+this.userId, exception);
      throw new Meteor.Error(400,'Internal Server Exception');
    }
  }
});

export const memberAcctTrxInsert = new ValidatedMethod({
  name: apiName.memberAcctTrxInsert,
  validate: AcctTrx.schema.pick(['senderAcctId','receiverAcctId','amount','description']).validator(),

  run(acctTrx) {
    let acctTrxId, senderAcctMovementId, receiverAcctMovementId, senderAcctUpdate, receiverAcctUpdate;

    try{
      // now sanity check
      if(!this.userId)
        throw new Meteor.Error(401, 'You must be logged in.');

      if(acctTrx.amount <= 0)
        throw new Meteor.Error(488, 'Transfer Amount must greater than 0');

      const senderAcct = Acct.findOne({_id:acctTrx.senderAcctId});
      if(!senderAcct)
        throw new Meteor.Error(485,'Sender Account not Found');

      //FIXME only handle member ownertype right now, please extend to support org ownerType
      if(senderAcct.ownerId !== this.userId)
        throw new Meteor.Error(486,'Not the Owner of the Sender Account');

      const receiverAcct = Acct.findOne({_id:acctTrx.receiverAcctId});
      if(!receiverAcct)
        throw new Meteor.Error(487,'Receiver Account not Found');

      if(senderAcct.saldo - acctTrx.amount < 0)
        throw new Meteor.Error(489,'Saldo not sufficient');


      acctTrxId = AcctTrx.insert(acctTrx);
      const acctTrxCreated = AcctTrx.findOne(acctTrxId);

      const senderAcctSaldoAfter = senderAcct.saldo - acctTrx.amount;
      const senderAcctMovement = {
        acctId              : senderAcct._id,
        otherPartyAcctId    : receiverAcct._id,
        otherPartyAcctName  : receiverAcct.name,
        acctTrxId           : acctTrxId,
        saldoBefore         : senderAcct.saldo,
        amount              : acctTrx.amount * -1,
        saldoAfter          : senderAcctSaldoAfter,
        type                : 'Transfer.Out',
        status              : 'Normal',
        description         : acctTrxCreated.description,
        userId              : acctTrxCreated.userId,
        timestamp           : acctTrxCreated.timestamp
      };
      
      const receiverAcctSaldoAfter = receiverAcct.saldo + acctTrx.amount;
      const receiverAcctMovement = {
        acctId              : receiverAcct._id,
        otherPartyAcctId    : senderAcct._id,
        otherPartyAcctName  : senderAcct.name,
        acctTrxId           : acctTrxId,
        saldoBefore         : receiverAcct.saldo,
        amount              : acctTrx.amount,
        saldoAfter          : receiverAcctSaldoAfter,
        type                : 'Transfer.In',
        status              : 'Normal',
        description         : acctTrxCreated.description,
        userId              : acctTrxCreated.userId,
        timestamp           : acctTrxCreated.timestamp
      };
      
      senderAcctMovementId = AcctMovement.insert(senderAcctMovement);
      receiverAcctMovementId = AcctMovement.insert(receiverAcctMovement);

      senderAcctUpdate = Acct.update({_id:senderAcct._id},{$set:{saldo:senderAcctSaldoAfter}});
      receiverAcctUpdate = Acct.update({_id:receiverAcct._id},{$set:{saldo:receiverAcctSaldoAfter}});

      return acctTrxId;

    }catch(exception){
      console.log('METHOD EXCEPTION - '+apiName.memberAcctTrxInsert+' - userId: '+this.userId, exception);
      console.log('acctTrxId',acctTrxId);
      console.log('senderAcctMovementId',senderAcctMovementId);
      console.log('receiverAcctMovementId',receiverAcctMovementId);
      console.log('senderAcctUpdate',senderAcctUpdate);
      console.log('receiverAcctUpdate',receiverAcctUpdate);
      throw new Meteor.Error(400,'Internal Server Exception');
    }
  }
});

