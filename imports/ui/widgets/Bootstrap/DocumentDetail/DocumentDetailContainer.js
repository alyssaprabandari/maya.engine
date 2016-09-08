import { Meteor } from 'meteor/meteor';
import { composeWithTracker } from 'react-komposer';
import { Loading } from '../Loading/Loading.js';

import { DocumentDetail } from './DocumentDetail.js';

import { Document } from '/imports/api/document/document_collection';

const composer = (params, onData) => {
	const subscription = Meteor.subscribe('detailDocument', params.params.docId);
	if (subscription.ready()) {
		const document = Document.findOne();
		onData(null, { document: document });
	}
};

export default composeWithTracker(composer, Loading)(DocumentDetail);
