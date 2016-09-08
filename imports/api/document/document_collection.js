import faker from 'faker';
import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { Factory } from 'meteor/dburles:factory';

export const Document = new Mongo.Collection('document');

Document.allow({
  insert: () => false,
  update: () => false,
  remove: () => false,
});

Document.deny({
  insert: () => true,
  update: () => true,
  remove: () => true,
});

Document.schema = new SimpleSchema({
  title: {
    type: String,
    label: 'The title of the document.',
  },


});

Document.attachSchema(Document.schema);

Factory.define('document', Document, {
  title: () => faker.hacker.phrase(),
});
