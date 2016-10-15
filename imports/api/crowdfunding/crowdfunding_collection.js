import faker from 'faker';
import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { Factory } from 'meteor/dburles:factory';

import { _ImageSchema, _GeneralSchema } from '/imports/api/general_schemas';

class CrowdfundingCollection extends Mongo.Collection {
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

export const Crowdfunding = new CrowdfundingCollection('crowdfunding');

// Deny all client-side updates since we will be using methods to manage this collection
Crowdfunding.deny({
  insert() { return true; },
  update() { return true; },
  remove() { return true; },
});

const _SupporterSchema = new SimpleSchema({
  party: {
    type: _PartySchema,
  },
  acctId: {
    type: SimpleSchema.RegEx.Id,
  },
  fundAmount: {
    type: Number,
    decimal: true,
  },
  anonymous: {
    type: Boolean,
    defaultValue: false
  },
  timestamp: {
    type: Date,
    autoValue : function(){
      return new Date();
    },
  },
});

Crowdfunding.schema = new SimpleSchema({
  name: {
    type: String,
    label: 'Name of this Crowdfunding',
  },
  
  recipient: {
    type: _PartySchema
  },
  recipientAcctId: {
    type: SimpleSchema.RegEx.Id
  },
  supporters : {
    type: [ _SupporterSchema ],
  },

  fundMin: {
    type: Number,
    decimal: true,
    label: 'Minimum Amount a User can fund',
    defaultValue: 0
  },
  fundRaised: {
    type: Number,
    decimal: true,
    defaultValue: 0
  },
  fundTarget: {
    type: Number,
    decimal: true,
  },
  currency: {
    type: String,
    allowedValues   : ["IDR", "USD", "EUR"],
    defaultValue    : "IDR"
  },
  
  fromDate: {
    type: Date
  },
  thruDate: {
    type: Date,
    optional: true
  },

  images: {
    type      : [ _ImageSchema ],
    optional  : true
  },

  tags: {
    type: [ String ],
    optional: true,
  },  

  type: {
    type: String,
    allowedValues   : [ "Scholarship", "Kickstarter" ], // adjust with business process
  },
  status: {
    type: String,
    allowedValues   : ["Draft", "Active", "Expired"],
    defaultValue    : "Draft"
  },

});

Crowdfunding.attachSchema(Crowdfunding.schema);
Crowdfunding.attachSchema(_GeneralSchema);

Crowdfunding.publicFields = {
  _id           : 1,
  name          : 1,
  
  recipient     : 1,

  fundMin       : 1,
  fundRaised    : 1,
  fundTarget    : 1,
  currency      : 1,

  fromDate      : 1,
  thruDate      : 1,
  
  images        : 1,

  tags          : 1,

  type          : 1,
  status        : 1,

  description   : 1,
  sequenceNr    : 1,
};

Crowdfunding.helpers({

});


