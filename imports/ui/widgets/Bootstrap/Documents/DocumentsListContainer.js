import { composeWithTracker } from 'react-komposer';
import { Documents } from '/imports/api/documents/documents.js';
import { DocumentsList } from './DocumentsList.js';
import { Loading } from '../Loading/Loading.js';
import { Meteor } from 'meteor/meteor';

const composer = (params, onData) => {
  const subscription = Meteor.subscribe('documents');
  if (subscription.ready()) {
    const documents = Documents.find().fetch();
    onData(null, { documents });
  }
};

export default composeWithTracker(composer, Loading)(DocumentsList);
