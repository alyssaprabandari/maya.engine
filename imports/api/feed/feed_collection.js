import faker from 'faker';
import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { Factory } from 'meteor/dburles:factory';

export const Feed = new Mongo.Collection('feed');

// Deny all client-side updates since we will be using methods to manage this collection
Feed.deny({
  insert() { return true; },
  update() { return true; },
  remove() { return true; },
});
