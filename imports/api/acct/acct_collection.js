import faker from 'faker';
import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { Factory } from 'meteor/dburles:factory';

import { _RefSchema, _TenantSchema, _PartySchema } from '/imports/api/general_schemas';

import { AcctMovement } from '/imports/api/acctMovement/acctMovement_collection.js';

class AcctCollection extends Mongo.Collection {
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

export const Acct = new AcctCollection('acct');

// Deny all client-side updates since we will be using methods to manage this collection
Acct.deny({
  insert() { return true; },
  update() { return true; },
  remove() { return true; },
});

Acct.schema = new SimpleSchema({
	name: {
		type: String,
		label: 'Name of this Account',
	},
	coaNr: {
		type: String,
		label: 'Number of Chart of Account',
		optional: true
	},
	saldo: {
		type: Number,
		decimal: true,
		label: 'Saldo of this Account',
	},
	currency: {
		type: String,
		allowedValues   : ["IDR", "USD", "EUR"],
	},

  description: {
    type      : String,
    label     : "Description",
    optional  : true
  },

	type: {
		type: String,
 		allowedValues   : ["Account.Current", "External"],
	},
	status: {
		type: String,
		allowedValues   : ["Active", "Suspended"],
	},

  tenantId: {
    type: SimpleSchema.RegEx.Id,
  },
  ownerId: {
    type: SimpleSchema.RegEx.Id,
  },
  ownerType: {
    type: String,
    allowedValues   : ["Member", "Org"],
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

Acct.attachSchema(Acct.schema);

Acct.publicFields = {
  _id 					: 1,
  name 					: 1,
  
  saldo 				: 1,
	currency 			: 1,

  description 	: 1,

  type 					: 1,
  status 				: 1,

  ownerId       : 1,
  ownerType     : 1,
};

Acct.helpers({
	getTenant() {
    return Tenant.findOne(this.tenantId);
  },
  getOwner() {
    if(this.ownerType === 'Member')
      return Member.findOne(this.ownerId);
    if(this.ownerType === 'Org')
      return Org.findOne(this.ownerId);
  },
  getAcctMovements() {
    const query = {
      acctId: this._id
    };
    
    const options = {
      fields: AcctMovement.publicFields,
      sort: {timestamp: -1}
    };
    return AcctMovement.find(query,options);
  },
  getLogs(){
    return Log.find({refName:'Acct',refId:this._id});
  },
});

