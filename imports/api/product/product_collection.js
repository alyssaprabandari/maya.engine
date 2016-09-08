import faker from 'faker';
import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { Factory } from 'meteor/dburles:factory';

import { _ImageSchema, _RefSchema } from '/imports/api/general_schemas';

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
    allowedValues   : ["IDR", "USD"],
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

Product.attachSchema(Product.schema);

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
	owner(){
		if(this.ownerType === 'Member')
			return Member.findOne(this.ownerId);
		if(this.ownerType === 'Org')
			return Org.findOne(this.ownerId);
	},
  logs(){
    return Log.find({refName:'Product',refId:this._id});
  },
});

