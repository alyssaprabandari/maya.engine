import faker from 'faker';
import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { Factory } from 'meteor/dburles:factory';

import { _PartySchema, _RefSchema } from '/imports/api/general_schemas';

class InfoCollection extends Mongo.Collection {
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

export const Info = new InfoCollection('info');

// Deny all client-side updates since we will be using methods to manage this collection
Info.deny({
  insert() { return true; },
  update() { return true; },
  remove() { return true; },
});

Info.schema = new SimpleSchema({
	title: {
		type: String,
		label: 'Info Title',
	},
  description: {
    type: String,
    label: 'Description',
  },

  sequenceNr: {
    type: Number,
    defaultValue: 0
  },

  imgUrl: {
    type: SimpleSchema.RegEx.Url,
  },

  type: {
    type: String,
    allowedValues   : [ "Headline", "Headline.Article", "Headline.Product", "FAQ" ], 
  },
  status: {
    type: String,
    allowedValues   : ["Draft", "Active", "Expired"],
  },

  tenantId: {
    type: SimpleSchema.RegEx.Id,
  },

  owners: {
    type: [ _PartySchema ],
    optional: true,
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

Info.attachSchema(Info.schema);

Info.publicFields = {
  title         : 1,  
  description 	: 1,
  sequenceNr    : 1,

  imgUrl        : 1,
  type          : 1,

  refs          : 1,
  timestamp     : 1,
};

Info.helpers({

});
