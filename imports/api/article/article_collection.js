import faker from 'faker';
import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { Factory } from 'meteor/dburles:factory';

import { _ImageSchema, _GeneralSchema } from '/imports/api/general_schemas';

class ArticleCollection extends Mongo.Collection {
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

export const Article = new ArticleCollection('article');

// Deny all client-side updates since we will be using methods to manage this collection
Article.deny({
  insert() { return true; },
  update() { return true; },
  remove() { return true; },
});

Article.schema = new SimpleSchema({
  title: {
    type: String,
    label: 'Article Title',
  },

  images: {
    type      : [ _ImageSchema ],
    optional  : true
  },
  
  type: {
    type: String,
    allowedValues   : [ "Profile.Member", "Profile.Shop" ], 
  },
  status: {
    type: String,
    allowedValues   : ["Draft", "Active", "Expired"],
  },

});

Article.attachSchema(Article.schema);
Article.attachSchema(_GeneralSchema);

Article.publicFields = {
  title           : 1,  

  type            : 1,

  images          : 1,

  refs            : 1,
  lastModifiedAt  : 1,

  description     : 1,
  sequenceNr      : 1,

};

Article.helpers({

});
