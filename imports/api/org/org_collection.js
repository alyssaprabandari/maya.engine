import faker from 'faker';
import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { Factory } from 'meteor/dburles:factory';

import { _ImageSchema, _GeneralSchema } from '/imports/api/general_schemas';

import { Tenant } from '/imports/api/tenant/tenant_collection.js';

class OrgCollection extends Mongo.Collection {
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
}

export const Org = new OrgCollection('org');

// Deny all client-side updates since we will be using methods to manage this collection
Org.deny({
  insert() { return true; },
  update() { return true; },
  remove() { return true; },
});

Org.schema = new SimpleSchema({
	name: {
		type: String,
		label: 'Organisation Name',
	},
  roles: {
    type: [ String ], //akan jadi role di <org>.<tenant>, misal accounting.maya: Member, Admin
  },
	type: {
		type: String,
		label: 'Organisation Type',
		allowedValues   : ['Group', 'Division', 'Department', 'Company', 'NGO', 'Shop'],
	},
	status: {
		type: String,
		label: 'Organisation Status',
		allowedValues   : ['Draft', 'Active', 'Suspended'],
		defaultValue    : 'Draft'
	},

  images: {
    type      : [ _ImageSchema ],
    optional  : true
  },

});

Org.attachSchema(Org.schema);
Org.attachSchema(_GeneralSchema);

Org.publicFields = {
  _id         : 1,
  name 			  : 1,
  type        : 1,
  status      : 1,
  images      : 1,
  description : 1,
};

Org.helpers({

});
