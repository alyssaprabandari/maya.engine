// import faker from 'faker';
import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { Factory } from 'meteor/dburles:factory';

import { _ImageSchema, _GeneralSchema } from '/imports/api/general_schemas';

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

  imgUrl: {
    type: SimpleSchema.RegEx.Url,
  },
  
  type: {
    type: String,
    allowedValues   : [ "Blog", "Headline.Article", "Headline.Product", "FAQ" ], 
  },
  status: {
    type: String,
    allowedValues   : ["Draft", "Active", "Expired"],
  },

});

Info.attachSchema(Info.schema);
Info.attachSchema(_GeneralSchema);

Info.publicFields = {
  title           : 1,  

  type            : 1,

  imgUrl          : 1,

  refs            : 1,
  lastModifiedAt  : 1,

  description     : 1,
  sequenceNr      : 1,

};

Info.helpers({

});
