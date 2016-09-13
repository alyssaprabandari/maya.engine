import faker from 'faker';
import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { Factory } from 'meteor/dburles:factory';

import { _RefSchema } from '/imports/api/general_schemas';

import { Acct } from '/imports/api/acct/acct_collection.js';

class AcctTrxCollection extends Mongo.Collection {
  insert(doc, callback) {
    return super.insert(doc, callback);
  }
  update(selector, modifier) {
    throw new Meteor.Error(481, 'Account Transaction may not be updated');
  }
  remove(selector) {
		throw new Meteor.Error(482, 'Account Transaction may not be deleted');
	}
};

export const AcctTrx = new AcctTrxCollection('acctTrx');

// Deny all client-side updates since we will be using methods to manage this collection
AcctTrx.deny({
  insert() { return true; },
  update() { return true; },
  remove() { return true; },
});


AcctTrx.schema = new SimpleSchema({
	senderAcctId: {
		type: SimpleSchema.RegEx.Id,
	},
	receiverAcctId: {
		type: SimpleSchema.RegEx.Id,
	},
	amount: {
		type: Number, // always positive here
		decimal: true,
	},
	type: {
		type: String,
		allowedValues   : ["Transfer", "Payment"], //"Remittance"
		defaultValue 	: "Transfer",
	},
	status: {
		type: String,
		allowedValues   : ["Normal", "Adjustment"],
		defaultValue 	: "Normal",
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

AcctTrx.attachSchema(AcctTrx.schema);

AcctTrx.publicFields = {
  _id 						: 1,
  senderAcctId 		: 1,
  receiverAcctId 	: 1,

  amount 					: 1,

  type 						: 1,
  status 					: 1,
  description 		: 1,

  timestamp 			: 1,
};

AcctTrx.helpers({
	getSenderAcct() {
		return Acct.findOne(this.senderAcctId);
	},
	getReceiverAcct() {
		return Acct.findOne(this.receiverAcctId);
	},
});

