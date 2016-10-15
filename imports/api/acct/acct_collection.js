import faker from 'faker';
import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { Factory } from 'meteor/dburles:factory';

import { _GeneralSchema } from '/imports/api/general_schemas';

import { AcctMovement } from '/imports/api/acctMovement/acctMovement_collection';

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

	type: {
		type: String,
 		allowedValues   : ["Account.Current", "External"],
	},
	status: {
		type: String,
		allowedValues   : ["Active", "Suspended"],
	},

});

Acct.attachSchema(Acct.schema);
Acct.attachSchema(_GeneralSchema);

Acct.publicFields = {
  _id 					: 1,
  name 					: 1,
  
  saldo 				: 1,
	currency 			: 1,

  type 					: 1,
  status 				: 1,

  description   : 1,
  lastModifiedAt: 1,

};

Acct.helpers({
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
});

