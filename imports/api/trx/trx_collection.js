import faker from 'faker';
import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { Factory } from 'meteor/dburles:factory';

import { _RefSchema, _PartySchema } from '/imports/api/general_schemas';

class TrxCollection extends Mongo.Collection {
	insert(doc, callback) {
    const result = super.insert(doc, callback);
    return result;
  }  
  update(selector, modifier) {
    const result = super.update(selector, modifier);
    return result;
  }
  remove(selector) {
    const result = super.remove(selector);
    return result;
  }
};

export const Trx = new TrxCollection('trx');

// Deny all client-side updates since we will be using methods to manage this collection
Trx.deny({
  insert() { return true; },
  update() { return true; },
  remove() { return true; },
});


const _TrxItemSchema = new SimpleSchema({
	trxItemNr:{
		type: Number,
	},
	productId:{
		type: SimpleSchema.RegEx.Id,
	},
	name: {
    type: String,
    label: 'Name of this Product',
  },
  unitPrice: {
    type: Number,
    decimal: true,
    label: 'Unit Price of this Product',
  },
  currency: {
    type: String,
    allowedValues   : ["IDR", "USD", "EUR"],
    defaultValue    : "IDR"
  },
  uom: {
    type: String,
  },
  qty: {
		type: Number,
    decimal: true,
    label: 'Quantity',
  },
  subTotal: {
		type: Number,
    decimal: true,
    label: 'SubTotal = unitPrice * qty',
  },
  refs: {
		type: [ _RefSchema ],
		optional: true
	},
  description: {
    type      : String,
    optional  : true
  },
  type: {
    type: String, // samakan dengan product type
  },
});


Trx.schema = new SimpleSchema({
	name: {
		type: String,
		label: 'Name of this Transaction',
	},
	coaNr: {
		type: String,
		label: 'Chart of Account Number, if needed',
		optional: true,
	},
	trxNr: {
		type: String,
		label: 'Custom Numbering of Transaction, if needed',
		optional: true,
	},
	
  owners: {
    type: [ _PartySchema ],
    optional: true,
  },
	
	trxItems: {
		type: [ _TrxItemSchema ],
		label: 'Transaction Items',
		optional: true,
	},
	total: {
		type: Number,
		decimal: true,
		label: 'Total Amount of this Transaction',
	},
	currency: {
		type: String,
		allowedValues   : ['IDR', 'USD', 'EUR'],
	},
  description: {
    type      : String,
    optional 	: true
  },
	type: {
		type: String,
 		allowedValues   : ['Sales', 'Sales.Refund', 'Inventory', 'Inventory.Retur', 'Crowdfunding', 'Crowdfunding.Refund'],
	},
	status: {
		type: String,
		allowedValues   : ['Open', 'Paid', 'Cancel', 'Void', 'Closed'], //Cancel is by client and no refund, void is by us and must refund
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

Trx.attachSchema(Trx.schema);

Trx.publicFields = {
  _id 				: 1,
  name 				: 1,
  trxItems 		: 1,
  total 			: 1,
  currency		: 1,
  description : 1,
  refs 				: 1,
  type 				: 1,
  status 			: 1,
};

Trx.helpers({

});


