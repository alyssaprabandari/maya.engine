import faker from 'faker';
import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { Factory } from 'meteor/dburles:factory';

import { _ImageSchema, _RefSchema, _OrgSchema, _TenantSchema } from '/imports/api/general_schemas';

import { Log } from '/imports/api/log/log_collection.js';

import { Acct } from '../acct/acct_collection'
import { Org } from '../org/org_collection'

class MemberCollection extends Mongo.Collection {
  insert(doc, callback) {
    const result = super.insert(doc, callback);
    Log.insert({
      refName			: 'Member',
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
      refName			: 'Member',
      refId 			: selector,
      refDoc 			: JSON.stringify(modifier),
      type 				: 'update',
      result 			: result
    });
    return result;
  }
  remove(selector) {
  	const refDoc = Member.findOne(selector);
    const result = super.remove(selector);
    Log.insert({
      refName			: 'Member',
      refId 			: selector,
      refDoc 			: JSON.stringify(refDoc),
      type 				: 'remove',
      result 			: result
    });
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

  description: {
    type: String,
    label: 'Description',
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

Member.attachSchema(Member.schema);

Member.publicFields = {
  _id           : 1,
  fullname 			: 1,
  nickname 			: 1,
  
  description 	: 1,
  images        : 1,
  orgs          : 1,
};

Member.helpers({
	getTenants(){
    let tenantIds = [];
    if(this.tenants)
      tenantIds = _.uniq(_.pluck(this.tenants, 'tenantId'));
    return Tenant.find({_id: {$in: tenantIds}});
  },
  getOrgs(){
    let orgIds = [];
    if(this.orgs)
      orgIds = _.uniq(_.pluck(this.orgs, 'orgId'));
    return Org.find({_id: {$in: orgIds}});
  },
  getAccts(){
		let orgIds = [];
		if(this.orgs)
			orgIds = _.uniq(_.pluck(this.orgs, 'orgId'));

    //FIXME please check user right/role in the org
    return Acct.find({
      $or:[
        {ownerId: this._id},
        {ownerId: {$in: orgIds}},
      ]
    });
	},
  getLogs(){
    return Log.find({refName:'Member',refId:this._id},{sort: {timestamp: -1}});
  },
});
