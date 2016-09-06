import faker from 'faker';
import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { Factory } from 'meteor/dburles:factory';

import { Log } from '/imports/api/log/log_collection.js';

import { Acct } from '../acct/acct_collection'
import { Org } from '../org/org_collection'

class LeadCollection extends Mongo.Collection {
  insert(doc, callback) {
    const result = super.insert(doc, callback);
    Log.insert({
      refName			: 'lead',
      type 				: 'insert',
      refId 			: result,
      refObject 	: JSON.stringify(doc),
      result 			: result
    });
    return result;
  }
  update(selector, modifier) {
    const result = super.update(selector, modifier);
    Log.insert({
      refName			: 'lead',
      type 				: 'update',
      refId 			: selector,
      refObject 	: JSON.stringify(modifier),
      result 			: result
    });
    return result;
  }
  remove(selector) {
    const result = super.remove(selector);
    Log.insert({
      refName			: 'lead',
      type 				: 'remove',
      refId 			: selector,
      result 			: result
    });
    return result;
  }
}

export const Lead = new LeadCollection('lead');

// Deny all client-side updates since we will be using methods to manage this collection
Lead.deny({
  insert() { return true; },
  update() { return true; },
  remove() { return true; },
});

const _OrgSchema = new SimpleSchema({
	orgId: {
		type: SimpleSchema.RegEx.Id,
	},
	position: {
		type: String,
		optional: true
	},
});

Lead.schema = new SimpleSchema({
	fullname: {
		type: String,
		label: 'FullName',
	},
	nickname: {
		type: String,
		label: 'NickName',
	},
	email: {
		type: SimpleSchema.RegEx.Email,
	},
	dob: {
		type: Date,
		label: 'Date of Birth',
		optional: true
	},
	bio: {
		type: String,
		label: 'Short Biografy',
		optional: true
	},
	imgUrl: {
		type: String,
		defaultValue: '/images/64x64.png'
	},
	orgs: {
		type: [ _OrgSchema ],
		optional: true
	},
	type: {
		type: String,
		allowedValues   : ['Internal', 'Member'], //type of lead that create this lead
		defaultValue    : 'Member'
	},
	status: {
		type: String,
		allowedValues   : ['New', 'Invitation.Sent', 'Registered'],
		defaultValue    : 'New'
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

Lead.attachSchema(Lead.schema);

Lead.publicFields = {
  _id 			: 1,
  fullname 	: 1,
  nickname 	: 1,
  bio 			: 1,
  imgUrl 		: 1,
  status 		: 1,
};


Lead.helpers({
	orgs(){
		let orgs = [];
		if(this.orgs)
			orgs = _.uniq(_.pluck(this.orgs, 'orgId'));
		return Org.find({_id: {$in: orgs}});
	},
});
