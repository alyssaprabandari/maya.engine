import faker from 'faker';
import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { Factory } from 'meteor/dburles:factory';

import { _ImageSchema, _RefSchema, _OwnerSchema, _PageSchema, _LayoutSchema } from '/imports/api/general_schemas';

import { Log } from '/imports/api/log/log_collection';

class TenantCollection extends Mongo.Collection {
  insert(doc, callback) {
    const result = super.insert(doc, callback);    
    Log.insert({
      refName			: 'Tenant',
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
      refName			: 'Tenant',
      refId 			: selector,
      refDoc 			: JSON.stringify(modifier),
      type 				: 'update',
      result 			: result
    });
    return result;
  }
  
  remove(selector) {
    const refDoc = Tenant.findOne(selector);
    const result = super.remove(selector);
    Log.insert({
      refName			: 'Tenant',
      refId 			: selector,
      refDoc      : JSON.stringify(refDoc),
      type 				: 'remove',
      result 			: result
    });
    return result;
  }
};

export const Tenant = new TenantCollection('tenant');

// Deny all client-side updates since we will be using methods to manage this collection
Tenant.deny({
  insert() { return true; },
  update() { return true; },
  remove() { return true; },
});

Tenant.schema = new SimpleSchema({
  domain: {
    type: SimpleSchema.RegEx.WeakDomain,
    label: 'Root Domain of this Tenant',
  },
  name: {
    type: String,
    label: 'Name of this Tenant',
  },

  cs: {
    type: SimpleSchema.RegEx.Email
  },

  layout: {
    type      : _LayoutSchema,
  },

  description: {
    type      : String,
    label     : "Description"
  },

  index: {
    type: _PageSchema,
  },

  pages: {
    type: [ _PageSchema ]
  },

  roles: {
    type: [ String ],
  },
  standardRole: {
    type: String,
  },

  currency: {
    type: String,
    allowedValues: ["IDR","USD","EUR"],
  },
  
  type: {
    type: String, // e.g. ecommerce, crowdfunding, etc
  },
  status: {
    type: String,
    allowedValues   : ["Active", "Suspended"],
    defaultValue    : "Active"
  },

  images: {
    type      : [ _ImageSchema ],
    optional  : true
  },

  owners: {
    type: [ _OwnerSchema ],
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

Tenant.attachSchema(Tenant.schema);

Tenant.publicFields = {
  domain        : 1,
  name 					: 1,
  layout        : 1,
  description 	: 1,
  index         : 1,
  pages         : 1,
  type          : 1,
  status        : 1,
};

Tenant.helpers({
	getLogs(){
    return Log.find({refName:'Tenant',refId:this._id});
  },
});

