import faker from 'faker';
import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { Factory } from 'meteor/dburles:factory';

import { _RefSchema } from '/imports/api/general_schemas';

import { Log } from '/imports/api/log/log_collection.js';

class HeadlineCollection extends Mongo.Collection {
  insert(doc, callback) {
    const result = super.insert(doc, callback);
    Log.insert({
      refName			: 'Headline',
      refId 			: result,
      refDoc 			: JSON.stringify(doc),
      type 				: 'insert',
      result 			: result
    });
    return result;
  }
  update(selector, modifier) {
    const result = super.update(selector, modifier);
		Log.insert({
      refName			: 'Headline',
      refId 			: selector,
      refDoc 			: JSON.stringify(modifier),
      type 				: 'update',
      result 			: result
    });
    return result;
  }
  remove(selector) {
  	const refDoc = Headline.findOne(selector);
    const result = super.remove(selector);
    Log.insert({
      refName			: 'Headline',
      refId 			: selector,
      refDoc 			: JSON.stringify(refDoc),
      type 				: 'remove',
      result 			: result
    });
    return result;
	}
};

export const Headline = new HeadlineCollection('headline');

// Deny all client-side updates since we will be using methods to manage this collection
Headline.deny({
  insert() { return true; },
  update() { return true; },
  remove() { return true; },
});

Headline.schema = new SimpleSchema({
	title: {
		type: String,
		label: 'Headline Title',
	},
  description: {
    type: String,
    label: 'Description',
  },
  imgUrl: {
    type: SimpleSchema.RegEx.Url,
  },
  
  type: {
    type: String,
    allowedValues   : ["Announcement","Article","Product"],
  },
  status: {
    type: String,
    allowedValues   : ["Draft", "Active", "Expired"],
  },

  tenantId: {
    type: SimpleSchema.RegEx.Id,
  },
  ownerId: {
    type: SimpleSchema.RegEx.Id,
  },
  ownerType: {
    type: String,
    allowedValues   : ["Member", "Org"],
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

Headline.attachSchema(Headline.schema);

Headline.publicFields = {
  title         : 1,  
  description 	: 1,
  imgUrl        : 1,
  type          : 1,
  status        : 1,
  refs          : 1,
};

Headline.helpers({
  getTenant() {
    return Tenant.findOne(this.tenantId);
  },
  getOwner() {
    if(this.ownerType === 'Member')
      return Member.findOne(this.ownerId);
    if(this.ownerType === 'Org')
      return Org.findOne(this.ownerId);
  },
  getLogs(){
    return Log.find({refName:'Headline',refId:this._id},{sort: {timestamp: -1}});
  },
});
