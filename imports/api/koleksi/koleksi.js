import faker from 'faker';
import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { Factory } from 'meteor/dburles:factory';

export const Koleksi = new Mongo.Collection('Koleksi');

Koleksi.allow({
  insert: () => false,
  update: () => false,
  remove: () => false,
});

Koleksi.deny({
  insert: () => true,
  update: () => true,
  remove: () => true,
});

Koleksi.schema = new SimpleSchema({
  title: {
    type: String,
    label: 'The title of the koleksi.',
  },
});

Koleksi.attachSchema(Koleksi.schema);

Factory.define('koleksi', Koleksi, {
  title: () => faker.hacker.phrase(),
});
