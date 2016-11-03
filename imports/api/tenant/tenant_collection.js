// import faker from 'faker';
import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { Factory } from 'meteor/dburles:factory';

import { _ImageSchema, _RefSchema, _PartySchema, _PageSchema, _LayoutSchema, _ApiSchema } from '/imports/api/general_schemas';

class TenantCollection extends Mongo.Collection {
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
  description: {
    type      : String,
    label     : "Description"
  },

  email: {
    type: SimpleSchema.RegEx.Email
  },
  layout: {
    type      : _LayoutSchema,
  },
  images: {
    type      : [ _ImageSchema ],
    optional  : true
  },

  index: {
    type: _PageSchema,
  },

  pages: {
    type: [ _PageSchema ]
  },

  isPublicMenuInAuthNav: {
    type: Boolean
  },

  roles: {
    type: [ String ],
  },
  standardRole: {
    type: String,
  },

  APIs: {
    type: [ _ApiSchema ],
  },

  currency: {
    type: String,
    allowedValues: ["IDR","USD","EUR"],
  },
  
  type: {
    type: String, // e.g. eCommerce, crowdfunding, etc
  },
  status: {
    type: String,
    allowedValues   : ["Active", "Suspended"],
    defaultValue    : "Active"
  },

  // owners: {
  //   type: [ _PartySchema ],
  //   optional: true,
  // },
  
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
  domain                : 1,
  name 					        : 1,
  description           : 1,

  email                 : 1,
  layout                : 1,
  images                : 1,
  
  index                 : 1,
  pages                 : 1,
  isPublicMenuInAuthNav : 1,
  
};

Tenant.helpers({

});

