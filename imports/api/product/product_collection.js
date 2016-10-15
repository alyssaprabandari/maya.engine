import faker from 'faker';
import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { Factory } from 'meteor/dburles:factory';

import { _ImageSchema, _GeneralSchema } from '/imports/api/general_schemas';

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
    allowedValues   : ["Draft", "Active", "Expired"],
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
  
  unitPrice     : 1,
  currency      : 1,
  uom           : 1,

  images        : 1,

  brand					: 1,
  brandType			: 1,
  sku           : 1,
  barcode       : 1,
  
  tags					: 1,

  type          : 1,
  status        : 1,

  description   : 1,
  sequenceNr    : 1,
};

Product.helpers({

});

