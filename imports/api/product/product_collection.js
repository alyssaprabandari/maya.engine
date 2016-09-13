import faker from 'faker';
import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { Factory } from 'meteor/dburles:factory';

import { _ImageSchema, _PartySchema, _RefSchema } from '/imports/api/general_schemas';

import { Member } from '/imports/api/member/member_collection';
import { Org } from '/imports/api/org/org_collection';


class ProductCollection extends Mongo.Collection {
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

export const Product = new ProductCollection('product');

// Deny all client-side updates since we will be using methods to manage this collection
Product.deny({
  insert() { return true; },
  update() { return true; },
  remove() { return true; },
});

Product.schema = new SimpleSchema({
	name: {
		type: String,
		label: 'Name of this Product',
	},
  tenantId: {
    type: SimpleSchema.RegEx.Id,
    label: 'tenantId of this Product'
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

  images: {
    type      : [ _ImageSchema ],
    optional  : true
  },
  description: {
    type      : String,
    label     : "External Description",
    optional  : true
  },

  type: {
    type: String,
    allowedValues   : ["Physical", "Virtual", "Subscription", "Crowdfunding"], // adjust with business process
  },
  status: {
    type: String,
    allowedValues   : ["Draft", "Active", "Expired"],
    defaultValue    : "Draft"
  },

  owners: {
    type: [ _PartySchema ],
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

const _SupporterSchema = new SimpleSchema({
  party: {
    type: _PartySchema,
  },
  acctId: {
    type: SimpleSchema.RegEx.Id,
  },
  fundAmount: {
    type: Number,
    decimal: true,
  },
  anonymous: {
    type: Boolean,
    defaultValue: false
  },
  timestamp: {
    type: Date,
    autoValue : function(){
      return new Date();
    },
  },
});


const _CrowdfundingSchema = new SimpleSchema({
  recipient: {
    type: _PartySchema
  },
  recipientAcctId: {
    type: SimpleSchema.RegEx.Id
  },
  supporters : {
    type: [ _SupporterSchema ],
  },
  fundRaised: {
    type: Number,
  },
  fundTarget: {
    type: Number,
  },
  fromDate: {
    type: Date
  },
  thruDate: {
    type: Date,
    optional: true
  },
  categories: {
    type: [ String ], // e.g. "Scholarship", "Education", "Medical", "Incubator"
  }
});

const _PhysicalSchema = new SimpleSchema({
  brand: {
    type: String
  },
  categories: {
    type: [ String ], // e.g. "Clothing", "Shoe", etc
  },
  
  // persiapan aja biar gak lupa
  // inventories: {
  //   type: [ _InventorySchema ]
  // }
});


Product.attachSchema(Product.schema);
Product.attachSchema(_CrowdfundingSchema, {selector: {type: "Crowdfunding"}});
Product.attachSchema(_PhysicalSchema, {selector: {type: "Physical"}});

Product.publicFields = {
  _id           : 1,
  name          : 1,
  
  unitPrice     : 1,
  currency      : 1,
  uom           : 1,

  images        : 1,
  description   : 1,

  type          : 1,
  status        : 1,
};

Product.helpers({

});

