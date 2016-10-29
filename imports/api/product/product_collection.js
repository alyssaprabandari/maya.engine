// import faker from 'faker';
import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { Factory } from 'meteor/dburles:factory';

import { _ImageSchema, _GeneralSchema } from '/imports/api/general_schemas';

import { Shop } from '/imports/api/shop/shop_collection.js';

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

  shopId: {
    type: SimpleSchema.RegEx.Id,
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

  minQty: {
    type: Number,
    decimal: true,
    defaultValue: 1
  },
  eloRating: {
    type: Number,
    defaultValue: 1000
  },

  viewCount: {
    type: Number,
    defaultValue: 0
  },
  userCount: {
    type: Number,
    defaultValue: 0
  },
  trxCount: {
    type: Number,
    defaultValue: 0
  },
  qtyCount: {
    type: Number,
    defaultValue: 0
  },
  amountCount: {
    type: Number,
    defaultValue: 0
  },

  images: {
    type      : [ _ImageSchema ],
    optional  : true
  },

  brand: {
    type: String,
    optional: true,
  },
  brandType: {
    type: String,
    optional: true,
  },

  sku: {
    type: String,
    optional: true,
  },
  barcode: {
    type: String,
    optional: true,
  },

  latency: {
    type: Number, // adjust to business process, e.g. in Hours or Days
    optional: true,
  },

  tags: {
    type: [ String ], // e.g. "Clothing", "Shoe", Product Type, Product Categories, etc
    optional: true,
  },  
  // inventories: {
  //   type: [ _InventorySchema ]
  // },

  type: {
    type: String,
    allowedValues   : ["Physical", "Virtual", "Rental", "Subscription"], // adjust with business process
  },
  status: {
    type: String,
    allowedValues   : ["Draft", "Active", "Suspended"],
    defaultValue    : "Draft"
  },

});

// Product.attachSchema(_PhysicalProductSchema, {selector: {type: "Physical"}});
// Product.attachSchema(_VirtualProductSchema, {selector: {type: "Virtual"}});
// Product.attachSchema(_SubscriptionProductSchema, {selector: {type: "Subscription"}});

Product.attachSchema(Product.schema);
Product.attachSchema(_GeneralSchema);

Product.publicFields = {
  _id           : 1,
  name          : 1,
  
  shopId        : 1,
  
  unitPrice     : 1,
  currency      : 1,
  uom           : 1,

  minQty        : 1,
  eloRating     : 1,
  viewCount     : 1,
  userCount     : 1,
  trxCount      : 1,
  qtyCount      : 1,
  amountCount   : 1,

  images        : 1,

  brand 				: 1,
  brandType 		: 1,
  
  sku           : 1,
  barcode       : 1,
  
  latency       : 1,

  tags 					: 1,

  type          : 1,
  status        : 1,

  description   : 1,
  sequenceNr    : 1,
};

Product.helpers({
  shop() {
    return Shop.findOne(this.shopId);
  },
});

