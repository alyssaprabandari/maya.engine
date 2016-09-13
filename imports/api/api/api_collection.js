import faker from 'faker';
import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { Factory } from 'meteor/dburles:factory';

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

  description: {
    type      : String,
    label     : "Description",
    optional  : true
  },

	type: {
		type: String,
	},
	status: {
		type: String,
		allowedValues   : ["Draft", "Active", "Suspended"],
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

Api.attachSchema(Api.schema);

Api.publicFields = {
  _id 					: 1,
  name 					: 1,
  description 	: 1,

  type 					: 1,
  status 				: 1,

  timestamp 		: 1,
};
