import faker from 'faker';
import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { Factory } from 'meteor/dburles:factory';

import { Log } from '/imports/api/log/log_collection.js';

class TrxCollection extends Mongo.Collection {
  insert(doc, callback) {

  	const stringDoc = JSON.stringify(doc);

    doc.logs = [{
    	type 	:'insert',
    	doc 	: JSON.parse(stringDoc),
    }];
    
    const result = super.insert(doc, callback);    
    Log.insert({
      refName			: 'Trx',
      refId 			: result,
      refDoc 			: doc,
      type 				: 'insert',
      result 			: result
    });

    return result;
  }
  
  update(selector, modifier) {
    //FIXME modifier harus diinject doc.logs

    const result = super.update(selector, modifier);
    
		Log.insert({
      refName			: 'Trx',
      refId 			: selector,
      refDoc 			: modifier,
      type 				: 'update',
      result 			: result
    });
    
    return result;
  }
  
  remove(selector) {
  	//FIXME consider NOT remove but only updating status to DELETED

    const result = super.remove(selector);
    Log.insert({
      refName			: 'Trx',
      refId 			: selector,
      type 				: 'remove',
      result 			: result
    });
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

const _RefSchema = new SimpleSchema({
	refId: {
		type: String,
	},
	refType: {
		type: String,
	},
	description: {
		type: String,
	},
});

const _LogSchema = new SimpleSchema({
	userId:{
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
	type:{
		type: String,
	},
	doc: {
		type: Object,
		blackbox: true,
	},
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
	ownerId: {
		type: SimpleSchema.RegEx.Id,
	},
	ownerType: {
		type: String, // Member or Org
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
	logs: {
		type: [ _LogSchema ],
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
	owner() {
		if(this.ownerType === 'Member')
			return Member.findOne(this.ownerId);
		if(this.ownerType === 'Org')
			return Org.findOne(this.ownerId);
	},
});


