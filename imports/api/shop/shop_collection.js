import faker from 'faker';
import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { Factory } from 'meteor/dburles:factory';

import { _ImageSchema, _GeneralSchema } from '/imports/api/general_schemas';

class ShopCollection extends Mongo.Collection {
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

export const Shop = new ShopCollection('shop');

// Deny all client-side updates since we will be using methods to manage this collection
Shop.deny({
  insert() { return true; },
  update() { return true; },
  remove() { return true; },
});

Shop.schema = new SimpleSchema({
	name: {
		type: String,
		label: 'Name of this Shop',
	},

  city: {
    type    : String,
    label   : "City Name",
  },
  area: {
    type      : String,
    label     : "Area or slankname of the location", // e.g. Mega Kuningan, Kuningan, etc
  },
  address: {
    type      : String,
    label     : "Address of the Shop",
  },
  country: {
    type      : String, // e.g. Indonesia
  },

  latitude: {
    type: Number,
    decimal: true,
    optional: true
  },
  longitude: {
    type: Number,
    decimal: true,
    optional: true
  },
  geometry: {
    type: Object,
    blackbox: true,
    optional: true
  },

  images: {
    type      : [ _ImageSchema ],
    optional  : true
  },

  tags: {
    type: [ String ], // e.g. "Clothing", "Shoe", Shop Type, Shop Categories, etc
    optional: true,
  },  

  type: {
    type: String,
    allowedValues   : ["Physical", "eCommerce"], // adjust with business process
  },
  status: {
    type: String,
    allowedValues   : ["Draft", "Active", "Expired"],
    defaultValue    : "Draft"
  },

});

Shop.attachSchema(Shop.schema);
Shop.attachSchema(_GeneralSchema);

Shop.publicFields = {
  _id           : 1,
  name          : 1,

  city          : 1,
  area          : 1,
  address       : 1,
  country       : 1,

  latitude      : 1,
  longitude     : 1,
  geometry      : 1,
  
  images        : 1,

  tags					: 1,

  type          : 1,
  status        : 1,

  description   : 1,
  sequenceNr    : 1,
};

Shop.helpers({

});

