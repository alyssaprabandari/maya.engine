import faker from 'faker';
import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { Factory } from 'meteor/dburles:factory';

import { Member } from '../member/member_collection.js';
import { Org } from '../org/org_collection.js';

export const Article = new Mongo.Collection('article');

// Deny all client-side updates since we will be using methods to manage this collection
Article.deny({
  insert() { return true; },
  update() { return true; },
  remove() { return true; },
});

const _RefSchema = new SimpleSchema({
	refId: {
		type: String,
	},
	refType: {
		type: String,
	},
});

Article.schema = new SimpleSchema({
	title: {
		type: String,
		label: 'Article Title',
	},
	content: {
		type: String,
		label: 'Article Content'
	},
	fromDate: {
		type: Date,
		optional: true, //sementara
	},
	thruDate: {
		type: Date,
		optional: true, //sementara. kalau kosong berarti forever
	},
	ownerId: {
		type: SimpleSchema.RegEx.Id,
		label: 'ownerId of this Article'
	},
	ownerType: {
		type: String,
		allowedValues   : ['Member', 'Org'],
		defaultValue    : 'Member'
	},
	type: {
		type: String,
		label: 'Article Type',
		allowedValues   : ['FAQ','Blog','Announcement'],
		defaultValue 		: 'Blog'
	},
	status: {
		type: String,
		label: 'Article Status',
 		allowedValues   : ['Draft', 'Active', 'Expired'],
		defaultValue    : 'Draft'
	},
	refs: {
		type: [ _RefSchema ],
		optional: true
	},

	userId:{
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

Article.attachSchema(Article.schema);

Article.publicFields = {
  _id 			: 1,
  title 		: 1,
  content 	: 1,
  ownerId 	: 1,
  ownerType : 1,
  fromDate 	: 1,
  thruDate 	: 1,
  type  		: 1,
  status 		: 1,
};

Article.helpers({
	owner(){
		if(this.ownerType === 'Member')
			return Member.findOne(this.ownerId);
		if(this.ownerType === 'Org')
			return Org.findOne(this.ownerId);
	},
});

