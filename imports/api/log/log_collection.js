import faker from 'faker';
import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { Factory } from 'meteor/dburles:factory';

export const Log = new Mongo.Collection('log');

// Deny all client-side updates since we will be using methods to manage this collection
Log.deny({
  insert() { return true; },
  update() { return true; },
  remove() { return true; },
});

Log.schema = new SimpleSchema({
	refName: {
		type: String,
	},
	refId: {
		type: SimpleSchema.RegEx.Id,
	},
	refDoc: {
		type: String,
	},
	type: {
		type: String,
	},
	result: {
		type: String,
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

Log.attachSchema(Log.schema);
