import { Meteor } from 'meteor/meteor';
import { Koleksi } from '../koleksi';

Meteor.publish('koleksi', () => Koleksi.find());
