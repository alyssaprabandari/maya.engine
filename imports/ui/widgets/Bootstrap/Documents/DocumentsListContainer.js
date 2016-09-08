import { composeWithTracker } from 'react-komposer';
import { Document } from '/imports/api/document/document_collection.js';
import { DocumentsList } from './DocumentsList.js';
import { Loading } from '../Loading/Loading.js';
import { Meteor } from 'meteor/meteor';

const composer = (params, onData) => {
  const subscription = Meteor.subscribe('listDocument');
  if (subscription.ready()) {
    const documents = Document.find().fetch();
    onData(null, { documents });
  }
};

export default composeWithTracker(composer, Loading)(DocumentsList);
