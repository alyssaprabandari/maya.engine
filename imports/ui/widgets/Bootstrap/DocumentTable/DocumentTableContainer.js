import { Meteor } from 'meteor/meteor';
import { composeWithTracker } from 'react-komposer';
import { Loading } from '../Loading/Loading.js';

import { DocumentTable } from './DocumentTable';

import { Document } from '/imports/api/document/document_collection.js';

const composer = (params, onData) => {
  const subscription = Meteor.subscribe('listDocument');
  if (subscription.ready()) {
    const documents = Document.find().fetch();
    onData(null, { documents });
  }
};

export default composeWithTracker(composer, Loading)(DocumentTable);
