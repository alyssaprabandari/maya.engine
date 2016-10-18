import { SimpleSchema } from 'meteor/aldeed:simple-schema';

export const _ApiSchema = new SimpleSchema({
  name: {
    type: String,
  },
  roles: {
    type: [ String ],
    optional: true
  },
  type:{
    type: String
  }
});

export const _LayoutSchema = new SimpleSchema({
  framework: {
    type: String,
    allowedValues: [ "Bootstrap", "MaterialUI" ],
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

export const _PartySchema = new SimpleSchema({
  partyId: {
    type: SimpleSchema.RegEx.Id,
  },
  partyType: {
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
  createdAt: {
    type: Date  //FIXME please be more specific
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

export const _GeneralSchema = new SimpleSchema({
  tenantId: {
    type: SimpleSchema.RegEx.Id,
    label: 'tenantId of this document', // special for member, this indicate the first tenant that the member joined
  },

  description: {
    type      : String,
    label     : "Description",
    optional  : true
  },

  sequenceNr: {
    type: Number,
    defaultValue: 0
  },
  
  owners: {
    type: [ _PartySchema ], // useful for marketplace type of ecommerce
    optional: true, //FIXME by default must be one record
  },
  refs: {
    type: [ _RefSchema ],
    optional: true
  },

  createdBy: {
    type      : SimpleSchema.RegEx.Id,
    label     : "Creator of this document",
    autoValue   : function(){
      if (this.isInsert){
          return this.userId;
        } else if (this.isUpsert) {
          return {$setOnInsert: this.userId};
        } else {
          this.unset();
        }
    }
  },
  createdAt: {
    type: Date,
    autoValue: function() {
      if (this.isInsert) {
        return new Date();
      } else if (this.isUpsert) {
        return {$setOnInsert: new Date()};
      } else {
        this.unset();  // Prevent user from supplying their own value
      }
    }
  },

  lastModifiedBy: {
    type: SimpleSchema.RegEx.Id,
    autoValue : function(){
      return this.userId;
    },
  },
  lastModifiedAt: {
    type: Date,
    label: 'Latest Timestamp',
    autoValue : function(){
      return new Date();
    },
  },

  updateHistories: {
    type: Array,
    optional: true,
    autoValue: function() {
      if (this.isInsert) {
        return [{
          userId    : this.userId,
          timestamp : this.field("createdAt").value,
        }];
      } else {
        return {
          $push: {
            userId    : this.userId,
            timestamp : this.field("lastModifiedAt").value,
          }
        };
      }
    }
  },
  'updateHistories.$': {
    type: Object,
  },
  'updateHistories.$.userId': {
    type: SimpleSchema.RegEx.Id,
  },
  'updateHistories.$.timestamp': {
    type: Date,
  },
})
