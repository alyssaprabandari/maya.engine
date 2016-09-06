import { Meteor } from 'meteor/meteor';
import { Documents } from '../documents';

Meteor.publish('documents', () => {
		// Meteor._sleepForMs(10000);
		return Documents.find();
	}
);
