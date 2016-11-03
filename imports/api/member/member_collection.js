// import faker from 'faker';
import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { Factory } from 'meteor/dburles:factory';

import { _ImageSchema, _OrgSchema, _TenantSchema, _GeneralSchema } from '/imports/api/general_schemas';

import { Acct } from '../acct/acct_collection'
import { Org } from '../org/org_collection'

class MemberCollection extends Mongo.Collection {
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

export const Member = new MemberCollection('member');

// Deny all client-side updates since we will be using methods to manage this collection
Member.deny({
  insert() { return true; },
  update() { return true; },
  remove() { return true; },
});

Member.schema = new SimpleSchema({
	fullname: {
		type: String,
		label: 'Member FullName',
	},
	nickname: {
		type: String,
		label: 'Member NickName',
	},
	dob: {
		type: Date,
		label: 'Member Date of Birth',
		optional: true
	},

  images: {
    type      : [ _ImageSchema ],
    optional  : true
  },

  tenants: {
    type: [ _TenantSchema ],
  },
  orgs: {
    type: [ _OrgSchema ],
    optional: true
  },
  
});

Member.attachSchema(Member.schema);
Member.attachSchema(_GeneralSchema);

Member.publicFields = {
  _id           : 1,
  fullname 			: 1,
  nickname 			: 1,
  
  description 	: 1,
  images        : 1,
  orgs          : 1,
};

Member.helpers({

});
