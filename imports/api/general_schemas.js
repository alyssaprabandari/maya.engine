import { SimpleSchema } from 'meteor/aldeed:simple-schema';

export const _LayoutSchema = new SimpleSchema({
  framework: {
    type: String,
    allowedValues: ["Bootstrap","MaterialUI"],
  },
  appWidget: {
    type: String,
  },
  cssUrl: {
    type: SimpleSchema.RegEx.Url,
    optional: true,
  },
});

export const _PageSchema = new SimpleSchema({
  title: {
    type: String,
  },
  path: {
    type: String,
  },
  roles: {
    type: [ String ],
    optional: true,
  },
  widgets: {
    type: [ String ],
  },
  menuNr:{
    type: Number,
    optional: true,
  }
});

export const _OwnerSchema = new SimpleSchema({
  ownerId: {
    type: SimpleSchema.RegEx.Id,
  },
  ownerType: {
    type: String,
    allowedValues   : ["Member", "Org"],
    defaultValue    : "Member"
  },
});

export const _TenantSchema = new SimpleSchema({
  tenantId: {
    type: SimpleSchema.RegEx.Id,
  },
  roles: {
    type: [ String ],
  },
  status: {
    type: String,
    allowedValues   : ['Active', 'Suspended', 'Out'],
    defaultValue    : 'Active'
  },
});

export const _OrgSchema = new SimpleSchema({
  orgId: {
    type: SimpleSchema.RegEx.Id,
  },
  positions: {
    type: [ String ],
    optional: true
  },
  roles: {
    type: [ String ], //samakan dengan role di <org>.<tenant>, misal accounting.maya
  },
});

export const _ImageSchema = new SimpleSchema({
  imgUrl: {
    type: SimpleSchema.RegEx.Url,
  },
  imgType: {
    type: String,
    allowedValues   : ["Thumbnail", "Detail"],
  },
});

export const _RefSchema = new SimpleSchema({
	refId: {
		type: String,
	},
	refType: {
		type: String,
	},
	description: {
		type: String,
    optional: true,
	},
});


// const _PartySchema = new SimpleSchema({
//   userId: {
//     type: SimpleSchema.RegEx.Id,
//   },
//   acctId: {
//     type: SimpleSchema.RegEx.Id,
//   },
//   saldoBefore: {
//     type: Number,
//   },
//   saldoAfter: {
//     type: Number,
//   },
// });

// export const _LogSchema = new SimpleSchema({
//   userId:{
//     type: SimpleSchema.RegEx.Id,
//     autoValue : function(){
//       return this.userId;
//     },
//   },
//   timestamp: {
//     type: Date,
//     label: 'Latest Timestamp',
//     autoValue : function(){
//       return new Date();
//     },
//   },
//   type:{
//     type: String,
//   },
//   doc: {
//     type: Object,
//     blackbox: true,
//   },
// });
