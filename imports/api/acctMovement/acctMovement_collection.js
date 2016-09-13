import faker from 'faker';
import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { Factory } from 'meteor/dburles:factory';

import { _RefSchema } from '/imports/api/general_schemas';

import { AcctTrx } from '/imports/api/acctTrx/acctTrx_collection';

class AcctMovementCollection extends Mongo.Collection {
  insert(doc, callback) {
    return super.insert(doc, callback);
  }
  update(selector, modifier) {
    throw new Meteor.Error(483, 'Account Movement may not be updated');
  }
  remove(selector) {
    throw new Meteor.Error(484, 'Account Movement may not be deleted');
  }
};

export const AcctMovement = new AcctMovementCollection('acctMovement');

// Deny all client-side updates since we will be using methods to manage this collection
AcctMovement.deny({
  insert() { return true; },
  update() { return true; },
  remove() { return true; },
});

AcctMovement.schema = new SimpleSchema({
	acctId: {
		type: SimpleSchema.RegEx.Id,
	},

  otherPartyAcctId: {
    type: SimpleSchema.RegEx.Id, // purposely redundanz
  },
  otherPartyAcctName: {
    type: String, // purposely redundanz
  },

  acctTrxId: {
    type: SimpleSchema.RegEx.Id,
  },

  saldoBefore: {
    type: Number,
    decimal: true,
    label: 'Saldo Before',
  },
  amount: {
    type: Number, // // purposely redundanz, can minus or positive
    decimal: true,
  },
  saldoAfter: {
    type: Number,
    decimal: true,
    label: 'Saldo After',
  },

	type: {
		type: String,
    allowedValues   : ["Transfer.In", "Transfer.Out", "Payment.In", "Payment.Out"] // "Remittance",
	},
	status: {
		type: String,
		allowedValues   : ["Normal", "Adjustment"],
	},
  description: {
    type: String,
    optional: true,
  },

	refs: {
		type: [ _RefSchema ],
		optional: true
	},

  userId: {
    type: SimpleSchema.RegEx.Id,
    autoValue : function(){
      return this.userId;
    },
  },
  timestamp: {
    type: Date,
    label: 'Latest Timestamp',
    autoValue : function(){
      return new Date();
    },
  },

});

AcctMovement.attachSchema(AcctMovement.schema);

AcctMovement.publicFields = {
  _id 					      : 1,
  acctId              : 1,
  otherPartyAcctName  : 1,
  
  saldoBefore       : 1,
  amount            : 1,
  saldoAfter        : 1,

  type 					    : 1,
  status            : 1,
  description       : 1,

  timestamp         : 1,
};

AcctMovement.helpers({
});

