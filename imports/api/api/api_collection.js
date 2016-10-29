// import faker from 'faker';
import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { Factory } from 'meteor/dburles:factory';

import { _GeneralSchema } from '/imports/api/general_schemas';

class ApiCollection extends Mongo.Collection {
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

export const Api = new ApiCollection('api');

// Deny all client-side updates since we will be using methods to manage this collection
Api.deny({
  insert() { return true; },
  update() { return true; },
  remove() { return true; },
});

Api.schema = new SimpleSchema({
	name: {
		type: String,
		label: 'Name of this API',
	},

	type: {
		type: String,
	},
	status: {
		type: String,
		allowedValues   : ["Draft", "Active", "Suspended"],
	},

});

Api.attachSchema(Api.schema);
Api.attachSchema(_GeneralSchema);

Api.publicFields = {
  _id 					: 1,
  name 					: 1,
  description 	: 1,

  type 					: 1,
  status 				: 1,
};
